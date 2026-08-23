import type { Detector, Flag } from "../types";
import { OVERLAY_HOSTS, hostsFromList } from "../hosts";
import { allPagesHtml, combinedHosts, loadHtml } from "../html";
import { makeFlag } from "../wording";

const WIDGET_SELECTORS = [
  "#userwayAccessibilityIcon",
  "#userway",
  ".acsb-trigger",
  "[class*='acsb-']",
  "#INDmenu-btn",
  "#audioeye_submit",
  "#audioeye_help",
  "[id*='accessibe' i]",
  "[class*='accessibe' i]",
  "[id*='equalweb' i]",
  "[id*='maxaccess' i]",
];

export const detectOverlay: Detector = (result) => {
  const flags: Flag[] = [];
  const hosts = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    OVERLAY_HOSTS,
  );
  for (const host of hosts.slice(0, 6)) {
    flags.push(makeFlag("overlay", host));
  }
  for (const { html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    for (const sel of WIDGET_SELECTORS) {
      if (flags.length >= 8) break;
      if ($(sel).length > 0) {
        flags.push(makeFlag("overlay", `floating widget ${sel}`));
      }
    }
  }
  return flags;
};
