import { REPLAY_HOSTS, hostsFromList } from "../hosts";
import { allPagesHtml, combinedHosts } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

const GLOBALS = /\b(FS|hj|clarity|Mouseflow|Inspectlet|LuckyOrange|cs_cfg|LogRocket)\s*[.=(]/;

export const detectSessionReplay: Detector = (result) => {
  const hosts = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    REPLAY_HOSTS,
  );
  const flags = hosts.slice(0, 6).map((host) => makeFlag("session-replay", host));
  if (flags.length > 0) return flags;
  for (const { html } of allPagesHtml(result.pages)) {
    if (GLOBALS.test(html)) {
      return [makeFlag("session-replay", "replay global in inline script")];
    }
  }
  return [];
};
