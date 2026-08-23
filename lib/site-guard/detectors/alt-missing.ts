import type { Detector, Flag } from "../types";
import { GENERIC_ALT, allPagesHtml, isDecorativeImage, isTrackingPixel, loadHtml, selectorFor } from "../html";
import { makeFlag } from "../wording";

export const detectAltMissing: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    $("img").each((_, el) => {
      if (flags.length >= 8) return;
      if (isTrackingPixel(el)) return;
      const alt = el.attribs.alt;
      const decorative = isDecorativeImage(el);
      const linked = Boolean($(el).parents("a").length);
      const button = (el.attribs.role || "").toLowerCase() === "button";
      if (alt === undefined) {
        flags.push(makeFlag("alt-missing", `${selectorFor(el)} (missing alt)`));
        return;
      }
      if (alt.trim() === "") {
        if (!decorative) {
          flags.push(makeFlag("alt-missing", `${selectorFor(el)} (empty alt; not marked decorative)`));
        }
        return;
      }
      if (GENERIC_ALT.test(alt.trim()) && (linked || button)) {
        flags.push(makeFlag("alt-missing", `${selectorFor(el)} (generic alt "${alt.trim()}")`));
      }
    });
    $("a img, button img, [role='button'] img").each((_, el) => {
      if (flags.length >= 8) return;
      if (isTrackingPixel(el) || isDecorativeImage(el)) return;
      const alt = (el.attribs.alt || "").trim();
      if (!alt || GENERIC_ALT.test(alt)) {
        flags.push(makeFlag("alt-missing", `${selectorFor(el)} (linked or icon image)`));
      }
    });
  }
  return unique(flags);
};

function unique(flags: Flag[]): Flag[] {
  const seen = new Set<string>();
  return flags.filter((flag) => {
    if (seen.has(flag.evidence)) return false;
    seen.add(flag.evidence);
    return true;
  });
}
