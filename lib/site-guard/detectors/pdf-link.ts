import { allPagesHtml, loadHtml } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

export const detectPdfLink: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    $("a[href]").each((_, el) => {
      if (flags.length >= 6) return;
      const href = el.attribs.href || "";
      if (!/\.pdf(\?|#|$)/i.test(href)) return;
      try {
        const abs = new URL(href, page.url).href;
        flags.push(makeFlag("pdf-link", `${abs} — PDF present — human check`));
      } catch {
        flags.push(makeFlag("pdf-link", `${href} — PDF present — human check`));
      }
    });
  }
  return flags;
};
