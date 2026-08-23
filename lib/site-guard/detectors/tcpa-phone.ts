import { allPagesHtml, loadHtml, selectorFor } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

const PHONE_NAME = /phone|tel|mobile|cell/i;
const CONSENT = /consent|agree|autodial|auto-dial|prerecorded|sms|text message|calls or texts|tcp[a]|marketing (calls|messages)|by providing/i;

function isPhoneField(el: { attribs: Record<string, string> }): boolean {
  const type = (el.attribs.type || "").toLowerCase();
  if (type === "tel") return true;
  const hay = [el.attribs.name, el.attribs.id, el.attribs.placeholder, el.attribs["aria-label"], el.attribs.autocomplete]
    .filter(Boolean)
    .join(" ");
  return PHONE_NAME.test(hay);
}

export const detectTcpaPhone: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    $("input, textarea").each((_, el) => {
      if (flags.length >= 6) return;
      if (!isPhoneField(el)) return;
      const form = $(el).closest("form");
      const context = (form.length ? form.text() : $(el).parent().text()).replace(/\s+/g, " ");
      if (CONSENT.test(context)) return;
      flags.push(makeFlag("tcpa-phone", `${selectorFor(el)} (no adjacent consent heuristic)`));
    });
  }
  return flags;
};
