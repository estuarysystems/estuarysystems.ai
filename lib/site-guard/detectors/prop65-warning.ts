import { allPagesHtml, loadHtml, pageText } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

const SOFTWARE = /saas|software|api documentation|developer|cloud workspace|login to your account/i;
const ADD_TO_CART = /add to cart|add-to-cart|add_to_cart|addtocart/i;
const PRODUCT_SCHEMA = /"@type"\s*:\s*"product"|itemtype=["'][^"']*\/product/i;
const SKU_FIELD = /\bsku\b|data-sku|product-sku|item-sku/i;
const PRICE = /\$\s?\d|price|usd/i;
const WARNING = /warning:|proposition 65|prop\.?\s*65|p65warnings/i;
const PRODUCT_PATH = /\/(product|products|cart|checkout|bag|shop|store)(\/|$)/i;

function isPhysicalGoodsPage(url: string, text: string, html: string): boolean {
  const hay = `${text} ${html.slice(0, 8000)}`;
  if (SOFTWARE.test(hay) && !ADD_TO_CART.test(hay) && !PRODUCT_SCHEMA.test(html)) {
    return false;
  }
  if (ADD_TO_CART.test(hay)) return true;
  if (PRODUCT_SCHEMA.test(html) && (PRICE.test(hay) || SKU_FIELD.test(hay))) return true;
  try {
    const path = new URL(url).pathname;
    if (PRODUCT_PATH.test(path) && PRICE.test(hay) && SKU_FIELD.test(hay)) return true;
  } catch {
    // skip
  }
  return false;
}

export const detectProp65Warning: Detector = (result) => {
  let sawPhysical = false;
  let missingOn: string | null = null;
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    const text = pageText($);
    if (!isPhysicalGoodsPage(page.url, text, html)) continue;
    sawPhysical = true;
    if (!WARNING.test(`${text} ${html}`)) {
      missingOn = page.url;
    }
  }
  if (!sawPhysical || !missingOn) return [];
  return [makeFlag("prop65-warning", `${missingOn} looks like a product/cart page without Prop 65 warning language`)];
};
