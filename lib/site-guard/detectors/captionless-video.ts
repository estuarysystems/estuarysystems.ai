import { allPagesHtml, loadHtml, selectorFor } from "../html";
import type { Detector, Flag } from "../types";
import { makeFlag } from "../wording";

export const detectCaptionlessVideo: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { html } of allPagesHtml(result.pages)) {
    const $ = loadHtml(html);
    $("video").each((_, el) => {
      if (flags.length >= 6) return;
      const tracks = $(el).find("track[kind='captions'], track[kind='subtitles']");
      if (tracks.length === 0) {
        flags.push(
          makeFlag(
            "captionless-video",
            `${selectorFor(el)} (no captions/subtitles track — human check if the clip has speech)`,
          ),
        );
      }
    });
    $("iframe[src]").each((_, el) => {
      if (flags.length >= 6) return;
      const src = el.attribs.src || "";
      if (!/youtube|youtu\.be|vimeo/i.test(src)) return;
      const hasCc =
        /cc_load_policy=1/i.test(src) ||
        /cc=1/i.test(src) ||
        /texttrack/i.test(src);
      if (!hasCc) {
        flags.push(
          makeFlag(
            "captionless-video",
            `${src} (embed caption track not visible — human check if the clip has speech)`,
          ),
        );
      }
    });
  }
  return flags;
};
