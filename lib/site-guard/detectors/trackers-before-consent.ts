import { MARKETING_HOSTS, hostsFromList } from "../hosts";
import { combinedHosts, looksLikeConsentBanner } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

export const detectTrackersBeforeConsent: Detector = (result) => {
  const marketing = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    MARKETING_HOSTS,
  );
  if (marketing.length === 0) return [];

  const homeHtml = result.pages[0]?.html ?? "";
  const banner = looksLikeConsentBanner(homeHtml);
  if (banner) {
    return [
      makeFlag(
        "trackers-before-consent",
        `marketing hosts on first load while a consent banner pattern is present (${marketing.slice(0, 3).join(", ")})`,
      ),
    ];
  }
  return [
    makeFlag(
      "trackers-before-consent",
      `marketing hosts present with no consent banner pattern (${marketing.slice(0, 3).join(", ")})`,
    ),
  ];
};
