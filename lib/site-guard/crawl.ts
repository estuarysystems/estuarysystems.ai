import type { CrawledPage, CrawlResult, SystemFlag } from "./types";
import { extractHosts, loadHtml } from "./html";
import { FOOTER_DISCLAIMER } from "./wording";

export const PAGE_TIMEOUT_MS = 20_000;
export const RUN_TIMEOUT_MS = 60_000;
const MAX_PAGES = 8;
const FETCH_UA =
  "EstuarySiteGuard/1.0 (+https://estuarysystems.ai/tools/site-guard; risk-signal scanner)";

const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
  "metadata.goog",
]);

export function validateStartUrl(input: string): { ok: true; url: URL } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Paste an https URL." };
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("file:") || lower.startsWith("javascript:")) {
    return { ok: false, error: "Only public https URLs can be scanned." };
  }
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { ok: false, error: "That does not look like a URL." };
  }
  if (parsed.protocol !== "https:") {
    return { ok: false, error: "Only public https URLs can be scanned." };
  }
  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith(".localhost") || host.endsWith(".local")) {
    return { ok: false, error: "That host cannot be scanned." };
  }
  if (isPrivateHostname(host)) {
    return { ok: false, error: "That host cannot be scanned." };
  }
  return { ok: true, url: parsed };
}

function isPrivateHostname(host: string): boolean {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    const [a, b] = host.split(".").map(Number);
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }
  return false;
}

export function registrableHost(hostname: string): string {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  const parts = host.split(".");
  if (parts.length <= 2) return host;
  const lastTwo = parts.slice(-2).join(".");
  const multi = new Set([
    "co.uk",
    "org.uk",
    "ac.uk",
    "gov.uk",
    "com.au",
    "net.au",
    "org.au",
    "co.jp",
    "com.br",
    "com.mx",
    "co.nz",
    "co.za",
  ]);
  if (multi.has(lastTwo)) return parts.slice(-3).join(".");
  return lastTwo;
}

function sameSite(a: URL, b: URL): boolean {
  return registrableHost(a.hostname) === registrableHost(b.hostname);
}

type RobotsRules = { disallowed: string[] };

async function loadRobots(origin: string, signal: AbortSignal): Promise<RobotsRules> {
  try {
    const res = await fetch(new URL("/robots.txt", origin), {
      headers: { "user-agent": FETCH_UA, accept: "text/plain" },
      redirect: "follow",
      signal,
    });
    if (!res.ok) return { disallowed: [] };
    const text = await res.text();
    return parseRobots(text);
  } catch {
    return { disallowed: [] };
  }
}

function parseRobots(text: string): RobotsRules {
  const disallowed: string[] = [];
  let applies = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.split("#")[0].trim();
    if (!line) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (/^user-agent$/i.test(key)) {
      applies = value === "*" || /site.?guard/i.test(value);
    } else if (applies && /^disallow$/i.test(key) && value) {
      disallowed.push(value);
    }
  }
  return { disallowed };
}

function isDisallowed(pathname: string, rules: RobotsRules): boolean {
  return rules.disallowed.some((rule) => {
    if (rule === "/") return true;
    return pathname.startsWith(rule);
  });
}

async function fetchPage(
  url: string,
  remainingMs: number,
  extraHeaders: Record<string, string> = {},
): Promise<{ page: CrawledPage; finalUrl: string }> {
  const timeout = Math.max(1_000, Math.min(PAGE_TIMEOUT_MS, remainingMs));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": FETCH_UA,
        accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        ...extraHeaders,
      },
      redirect: "follow",
      signal: controller.signal,
    });
    const contentType = res.headers.get("content-type") || "";
    const html = contentType.includes("html") || contentType.includes("xml") || contentType === ""
      ? await res.text()
      : "";
    const finalUrl = res.url || url;
    const hosts = html ? extractHosts(html, finalUrl) : { scriptHosts: [], networkHosts: [] };
    return {
      finalUrl,
      page: {
        url,
        html,
        status: res.status,
        scriptHosts: hosts.scriptHosts,
        networkHosts: hosts.networkHosts,
      },
    };
  } finally {
    clearTimeout(timer);
  }
}

function footerHrefs(html: string, pageUrl: string): string[] {
  const $ = loadHtml(html);
  let scope = $("footer, [role='contentinfo']");
  if (scope.length === 0) {
    scope = $("nav").last();
  }
  if (scope.length === 0) {
    scope = $("body > :last-child");
  }
  const hrefs: string[] = [];
  scope.find("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href) hrefs.push(href);
  });
  const start = new URL(pageUrl);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const href of hrefs) {
    try {
      const next = new URL(href, pageUrl);
      if (next.protocol !== "https:") continue;
      if (!sameSite(start, next)) continue;
      next.hash = "";
      const key = next.href;
      if (seen.has(key) || key === start.href) continue;
      seen.add(key);
      out.push(key);
    } catch {
      // skip bad href
    }
  }
  return out;
}

export async function crawlSite(inputUrl: string): Promise<CrawlResult> {
  const started = Date.now();
  const remaining = () => RUN_TIMEOUT_MS - (Date.now() - started);
  const systemFlags: SystemFlag[] = [];
  const empty = (url: string, message: string): CrawlResult => ({
    url,
    crawled: [],
    pages: [],
    systemFlags: [{ id: "could-not-fetch", message }],
    flags: [],
    disclaimer: FOOTER_DISCLAIMER,
  });

  const checked = validateStartUrl(inputUrl);
  if (!checked.ok) return empty(inputUrl, checked.error);

  const start = checked.url;
  start.hash = "";

  if (remaining() < 2_000) return empty(start.href, "could not fetch");

  const robots = await loadRobots(start.origin, AbortSignal.timeout(Math.min(8_000, remaining())));
  if (isDisallowed(start.pathname || "/", robots)) {
    return empty(start.href, "could not fetch");
  }

  let home: { page: CrawledPage; finalUrl: string };
  try {
    home = await fetchPage(start.href, remaining());
  } catch {
    return empty(start.href, "could not fetch");
  }

  if (!home.page.status || home.page.status >= 400 || !home.page.html) {
    return empty(start.href, "could not fetch");
  }

  const pages: CrawledPage[] = [home.page];
  const crawled = [start.href];

  if (remaining() > 8_000) {
    try {
      const gpc = await fetchPage(start.href, remaining(), { "Sec-GPC": "1" });
      home.page.gpcNetworkHosts = gpc.page.networkHosts;
    } catch {
      systemFlags.push({
        id: "gpc-fetch-skipped",
        message: "A second fetch with Sec-GPC: 1 was not completed.",
      });
    }
  }

  const targets = footerHrefs(home.page.html ?? "", home.finalUrl || start.href)
    .filter((href) => {
      try {
        return !isDisallowed(new URL(href).pathname, robots);
      } catch {
        return false;
      }
    })
    .slice(0, MAX_PAGES - 1);

  for (const href of targets) {
    if (remaining() < 3_000) {
      systemFlags.push({
        id: "time-budget",
        message: "Scan stopped at the time budget. Leftover pages were not fetched.",
      });
      break;
    }
    try {
      const next = await fetchPage(href, remaining());
      pages.push(next.page);
      crawled.push(href);
    } catch {
      pages.push({ url: href, status: 0, scriptHosts: [], networkHosts: [] });
      crawled.push(href);
    }
  }

  return {
    url: start.href,
    crawled,
    pages,
    systemFlags: systemFlags.length ? systemFlags : undefined,
    flags: [],
    disclaimer: FOOTER_DISCLAIMER,
  };
}

export function stripPageHtml(result: CrawlResult): CrawlResult {
  return {
    ...result,
    pages: result.pages.map((page) => {
      const rest = { ...page };
      delete rest.html;
      return rest;
    }),
  };
}
