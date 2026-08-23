import { allPagesHtml, loadHtml } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

const CLAIM = /made in(?: the)? usa|american made|made in america/i;

export const detectMadeInUsa: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    $("img[alt]").each((_, el) => {
      if (flags.length >= 4) return;
      const alt = el.attribs.alt || "";
      if (CLAIM.test(alt)) {
        flags.push(makeFlag("made-in-usa", `${page.url} img alt: review context`));
      }
    });
    const text = $("body").text();
    if (CLAIM.test(text)) {
      flags.push(makeFlag("made-in-usa", `${page.url} visible text — review context`));
    }
  }
  const seen = new Set<string>();
  return flags.filter((flag) => {
    if (seen.has(flag.evidence)) return false;
    seen.add(flag.evidence);
    return true;
  });
};
