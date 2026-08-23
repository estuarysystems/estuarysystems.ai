import { COMMERCIAL_FONT_FAMILIES, LICENSED_FONT_CDNS, hostMatches } from "../hosts";
import { allPagesHtml, hostFromHref } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

const FONT_FACE = /@font-face\s*\{([\s\S]*?)\}/gi;

function isCommercial(family: string): string | null {
  const lower = family.toLowerCase().replace(/['"]/g, "");
  return COMMERCIAL_FONT_FAMILIES.find((name) => lower.includes(name.trim())) ?? null;
}

export const detectWebfont: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { page, html } of allPagesHtml(result.pages)) {
    for (const block of html.matchAll(FONT_FACE)) {
      if (flags.length >= 6) break;
      const body = block[1];
      const family = body.match(/font-family\s*:\s*([^;]+)/i)?.[1] ?? "";
      const src = body.match(/src\s*:\s*([^;]+)/i)?.[1] ?? "";
      const commercial = isCommercial(family);
      if (!commercial) continue;
      const urls = [...src.matchAll(/url\(\s*['"]?([^'")\s]+)/gi)].map((m) => m[1]);
      const hostedOnCdn = urls.some((url) => {
        const host = hostFromHref(url, page.url);
        return host ? Boolean(hostMatches(host, LICENSED_FONT_CDNS)) : false;
      });
      if (hostedOnCdn) continue;
      const firstPartyWoff = urls.some((url) => /\.woff2?(\?|$)/i.test(url));
      if (firstPartyWoff || urls.length === 0) {
        flags.push(makeFlag("webfont", `${family.trim()} via @font-face (license validity is manual)`));
      }
    }
  }
  return flags;
};
