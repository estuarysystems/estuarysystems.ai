import { CHAT_HOSTS, hostsFromList } from "../hosts";
import { combinedHosts } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

export const detectThirdPartyChat: Detector = (result) => {
  const hosts = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    CHAT_HOSTS,
  );
  return hosts.slice(0, 6).map((host) => makeFlag("third-party-chat", host));
};
