import { site } from "@/lib/content";

export function CalEmbed({ title = site.scheduleLabel }: { title?: string }) {
  return (
    <iframe
      src={site.calEmbedSrc}
      title={title}
      className="h-[780px] w-full border-0 bg-[#eee9df] md:h-[860px]"
    />
  );
}
