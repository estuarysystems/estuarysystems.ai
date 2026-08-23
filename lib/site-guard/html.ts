import * as cheerio from "cheerio";
import type { AnyNode, Element } from "domhandler";
import type { CrawledPage } from "./types";

export function loadHtml(html: string) {
  return cheerio.load(html);
}

export function hostFromHref(href: string | undefined, pageUrl: string): string | null {
  if (!href) return null;
  const trimmed = href.trim();
  if (
    !trimmed ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("#")
  ) {
    return null;
  }
  try {
    return new URL(trimmed, pageUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function extractHosts(html: string, pageUrl: string) {
  const $ = loadHtml(html);
  const scriptHosts = new Set<string>();
  const networkHosts = new Set<string>();

  $("script[src]").each((_, el) => {
    const host = hostFromHref($(el).attr("src"), pageUrl);
    if (host) {
      scriptHosts.add(host);
      networkHosts.add(host);
    }
  });
  $("link[href]").each((_, el) => {
    const host = hostFromHref($(el).attr("href"), pageUrl);
    if (host) networkHosts.add(host);
  });
  $("iframe[src]").each((_, el) => {
    const host = hostFromHref($(el).attr("src"), pageUrl);
    if (host) networkHosts.add(host);
  });
  $("script:not([src])").each((_, el) => {
    const text = $(el).text();
    for (const match of text.matchAll(/https?:\/\/[^\s"'<>\\]+/gi)) {
      const host = hostFromHref(match[0], pageUrl);
      if (host) networkHosts.add(host);
    }
  });

  return {
    scriptHosts: [...scriptHosts],
    networkHosts: [...networkHosts],
  };
}

export function pageText($: cheerio.CheerioAPI): string {
  $("script, style, noscript").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

export function selectorFor(el: Element): string {
  const id = el.attribs.id ? `#${el.attribs.id}` : "";
  const cls = el.attribs.class
    ? `.${el.attribs.class.trim().split(/\s+/).slice(0, 2).join(".")}`
    : "";
  const name = el.attribs.name ? `[name="${el.attribs.name}"]` : "";
  return `${el.tagName}${id}${cls}${name}` || el.tagName;
}

export function visibleFields($: cheerio.CheerioAPI) {
  return $("input, select, textarea").toArray().filter((el) => {
    const type = (el.attribs.type || "text").toLowerCase();
    if (["hidden", "submit", "button", "reset", "image"].includes(type)) return false;
    if (el.attribs.hidden !== undefined) return false;
    if ((el.attribs.style || "").includes("display:none")) return false;
    return true;
  });
}

export function hasAccessibleName($: cheerio.CheerioAPI, el: Element): boolean {
  if (el.attribs["aria-label"]?.trim()) return true;
  if (el.attribs["aria-labelledby"]?.trim()) return true;
  const id = el.attribs.id;
  if (id && $(`label[for="${cssEscape(id)}"]`).length > 0) return true;
  let parent: AnyNode | null = el.parent;
  while (parent && parent.type === "tag") {
    if ((parent as Element).tagName === "label") return true;
    parent = parent.parent;
  }
  return false;
}

function cssEscape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function allPagesHtml(pages: CrawledPage[]): { page: CrawledPage; html: string }[] {
  return pages
    .filter((page) => typeof page.html === "string")
    .map((page) => ({ page, html: page.html as string }));
}

export function combinedHosts(pages: CrawledPage[], key: "scriptHosts" | "networkHosts" | "gpcNetworkHosts") {
  const hosts = new Set<string>();
  for (const page of pages) {
    for (const host of page[key] ?? []) hosts.add(host);
  }
  return hosts;
}

export function looksLikeConsentBanner(html: string): boolean {
  const $ = loadHtml(html);
  const text = pageText($).toLowerCase();
  const bannerish =
    /cookie|consent|we use cookies|privacy choices|manage (your )?preferences|accept all|reject all/.test(
      text,
    );
  const nodes = $("[id*='cookie' i], [class*='cookie' i], [id*='consent' i], [class*='consent' i], [id*='onetrust' i], [class*='onetrust' i], [id*='cmp' i]");
  return bannerish && nodes.length > 0;
}

export function hasDoNotSellLink($: cheerio.CheerioAPI): boolean {
  const hay = `${$("a, button").text()} ${$("a[href], button").toArray().map((el) => `${el.attribs.href ?? ""} ${el.attribs["aria-label"] ?? ""}`).join(" ")}`;
  return /do not sell|do not share|your privacy choices|privacy choices|limit the use of my (sensitive )?personal|dnsmpi/i.test(
    hay,
  );
}

export function isDecorativeImage(el: Element): boolean {
  const role = (el.attribs.role || "").toLowerCase();
  const ariaHidden = (el.attribs["aria-hidden"] || "").toLowerCase();
  return role === "presentation" || role === "none" || ariaHidden === "true";
}

export function isTrackingPixel(el: Element): boolean {
  const w = Number(el.attribs.width);
  const h = Number(el.attribs.height);
  if (w === 1 && h === 1) return true;
  const src = (el.attribs.src || "").toLowerCase();
  return /pixel|spacer|1x1|tracking/.test(src);
}

export const GENERIC_ALT = /^(image|img|photo|picture|graphic|icon|logo|banner|click here|untitled)$/i;
