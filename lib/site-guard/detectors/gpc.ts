import { AD_PIXEL_HOSTS, hostsFromList } from "../hosts";
import { combinedHosts, hasDoNotSellLink, loadHtml } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

export const detectGpc: Detector = (result) => {
  const adHosts = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    AD_PIXEL_HOSTS,
  );
  if (adHosts.length === 0) return [];

  const html = result.pages[0]?.html ?? "";
  const $ = loadHtml(html);
  const hasLink = hasDoNotSellLink($);
  const gpcHosts = hostsFromList(combinedHosts(result.pages, "gpcNetworkHosts"), AD_PIXEL_HOSTS);
  const flags = [];

  if (!hasLink) {
    flags.push(
      makeFlag(
        "gpc",
        `ad pixels present (${adHosts.slice(0, 3).join(", ")}) and no Do Not Sell/Share or Your Privacy Choices link`,
      ),
    );
  }

  // HTML-only second fetch cannot prove a pixel fired. Only flag when the
  // Sec-GPC response still lists ad hosts and the first-load HTML omitted them
  // (server-varied markup). Same script tags on both fetches are not a signal.
  const firstHosts = new Set(adHosts);
  const extraUnderGpc = gpcHosts.filter((host) => !firstHosts.has(host));
  if (extraUnderGpc.length > 0) {
    flags.push(
      makeFlag("gpc", `additional ad hosts listed under Sec-GPC: 1 (${extraUnderGpc.slice(0, 3).join(", ")})`),
    );
  }
  return flags;
};
