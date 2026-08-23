import { registrableHost } from "../crawl";
import { loadHtml } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

function privacyAnchors(html: string, pageUrl: string): { href: string; text: string }[] {
  const $ = loadHtml(html);
  const found: { href: string; text: string }[] = [];
  $("a[href]").each((_, el) => {
    const text = $(el).text().trim();
    const href = el.attribs.href || "";
    if (!/privacy/i.test(`${text} ${href}`)) return;
    if (/cookie settings|cookie preferences|manage cookies/i.test(text)) return;
    try {
      found.push({ href: new URL(href, pageUrl).href, text });
    } catch {
      // skip
    }
  });
  return found;
}

export const detectPrivacyMissing: Detector = (result) => {
  const home = result.pages[0];
  if (!home?.html) {
    return [makeFlag("privacy-missing", "homepage HTML was not available")];
  }
  const anchors = privacyAnchors(home.html, home.url);
  if (anchors.length === 0) {
    return [makeFlag("privacy-missing", "no homepage or footer anchor whose visible text includes Privacy")];
  }

  const flags: Flag[] = [];
  for (const anchor of anchors.slice(0, 3)) {
    const crawled = result.pages.find((page) => page.url === anchor.href || page.url.replace(/\/$/, "") === anchor.href.replace(/\/$/, ""));
    if (crawled?.status && crawled.status >= 400) {
      flags.push(makeFlag("privacy-missing", `${anchor.href} returned ${crawled.status}`));
      continue;
    }
    try {
      const startHost = new URL(result.url).hostname;
      const targetHost = new URL(anchor.href).hostname;
      if (registrableHost(startHost) !== registrableHost(targetHost)) {
        flags.push(makeFlag("privacy-missing", `${anchor.href} (not first-party / review)`));
      }
    } catch {
      // skip
    }
  }
  return flags;
};
