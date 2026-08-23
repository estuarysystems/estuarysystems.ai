import { allPagesHtml, loadHtml, pageText } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

const SOFTWARE = /saas|software|api documentation|developer|cloud workspace|login to your account/i;
const PHYSICAL = /add to cart|add-to-cart|buy now|sku|product schema|"@type"\s*:\s*"product"|in stock|shipping/i;
const WARNING = /warning:|proposition 65|prop\.?\s*65|p65warnings/i;

export const detectProp65Warning: Detector = (result) => {
  let sawPhysical = false;
  let missingOn: string | null = null;
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    const text = `${pageText($)} ${html.slice(0, 4000)}`;
    if (SOFTWARE.test(text) && !PHYSICAL.test(text)) continue;
    if (!PHYSICAL.test(text)) continue;
    sawPhysical = true;
    if (!WARNING.test(text)) {
      missingOn = page.url;
    }
  }
  if (!sawPhysical) return [];
  if (!missingOn) return [];
  return [makeFlag("prop65-warning", `${missingOn} looks like a product/cart page without Prop 65 warning language`)];
};
