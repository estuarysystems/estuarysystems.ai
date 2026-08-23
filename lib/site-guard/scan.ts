import { crawlSite, stripPageHtml } from "./crawl";
import { runDetectors } from "./detectors";
import type { CrawlResult } from "./types";
import { FOOTER_DISCLAIMER } from "./wording";

export async function scanUrl(input: string): Promise<CrawlResult> {
  const crawled = await crawlSite(input);
  if (crawled.systemFlags?.some((flag) => flag.id === "could-not-fetch")) {
    return stripPageHtml({
      ...crawled,
      flags: [],
      disclaimer: FOOTER_DISCLAIMER,
    });
  }
  const flags = runDetectors(crawled);
  return stripPageHtml({
    ...crawled,
    flags,
    disclaimer: FOOTER_DISCLAIMER,
  });
}
