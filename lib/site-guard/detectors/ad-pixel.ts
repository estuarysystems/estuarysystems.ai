import { AD_PIXEL_HOSTS, hostsFromList } from "../hosts";
import { combinedHosts } from "../html";
import type { Detector } from "../types";
import { makeFlag } from "../wording";

export const detectAdPixel: Detector = (result) => {
  const hosts = hostsFromList(
    [...combinedHosts(result.pages, "scriptHosts"), ...combinedHosts(result.pages, "networkHosts")],
    AD_PIXEL_HOSTS,
  );
  return hosts.slice(0, 8).map((host) => makeFlag("ad-pixel", host));
};
