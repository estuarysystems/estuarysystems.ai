import type { Detector, Flag } from "../types";
import { allPagesHtml, hasAccessibleName, loadHtml, selectorFor, visibleFields } from "../html";
import { makeFlag } from "../wording";

export const detectUnlabeledField: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    for (const el of visibleFields($)) {
      if (flags.length >= 8) break;
      if (hasAccessibleName($, el)) continue;
      const placeholderOnly = Boolean(el.attribs.placeholder?.trim());
      flags.push(
        makeFlag(
          "unlabeled-field",
          placeholderOnly
            ? `${selectorFor(el)} (placeholder-only)`
            : `${selectorFor(el)} (no label / aria-label / aria-labelledby)`,
        ),
      );
    }
  }
  return flags;
};
