import { AD_PIXEL_HOSTS, hostsFromList } from "../hosts";
import { allPagesHtml, loadHtml } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

export const detectVideoPixel: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { page, html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    const hasVideo =
      $("video").length > 0 ||
      $("iframe[src*='youtube' i], iframe[src*='youtu.be' i], iframe[src*='vimeo' i]").length > 0 ||
      /youtube\.com\/embed|player\.vimeo\.com|youtu\.be\//i.test(html);
    if (!hasVideo) continue;
    const pixels = hostsFromList(
      [...(page.scriptHosts ?? []), ...(page.networkHosts ?? [])],
      AD_PIXEL_HOSTS,
    );
    if (pixels.length === 0) continue;
    const events = /ViewContent|video_watch|watch_video|Subscribe/i.test(html);
    flags.push(
      makeFlag(
        "video-pixel",
        `${page.url} has video plus ${pixels.slice(0, 3).join(", ")}${events ? " (ViewContent / video_watch pattern)" : ""}`,
      ),
    );
  }
  return flags.slice(0, 6);
};
