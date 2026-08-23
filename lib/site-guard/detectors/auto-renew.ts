import { allPagesHtml, loadHtml, pageText } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

const OFFER = /free trial|\$1 trial|risk-free|automatically|renews|auto-renew|membership|subscribe/i;
const DISCLOSE = /cancel|renewal (price|rate)|after the trial|then \$|billed|how to cancel/i;

export const detectAutoRenew: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    const text = pageText($);
    if (!OFFER.test(text)) continue;
    const path = (() => {
      try {
        return new URL(page.url).pathname.toLowerCase();
      } catch {
        return page.url.toLowerCase();
      }
    })();
    const checkoutish = /cart|checkout|bag|membership|subscribe|pricing/.test(`${path} ${text.slice(0, 400)}`);
    if (DISCLOSE.test(text) && /cancel/i.test(text) && /\$|price|billed/i.test(text)) {
      continue;
    }
    flags.push(
      makeFlag(
        "auto-renew",
        `${page.url}${checkoutish ? " (cart/checkout/membership copy)" : " (trial or renewal copy)"}`,
      ),
    );
  }
  return flags.slice(0, 4);
};
