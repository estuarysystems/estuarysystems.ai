import { site } from "@/lib/content";

export function CalEmbed() {
  return (
    <iframe
      src={site.calEmbedSrc}
      title={site.scheduleLabel}
      className="h-[780px] w-full border-0 bg-paper md:h-[860px]"
    />
  );
}
