import Link from "next/link";
import { site } from "@/lib/content";

type ConversationCtaProps = {
  className?: string;
};

export function ConversationCta({ className = "" }: ConversationCtaProps) {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`.trim()}>
      <Link
        href={site.scheduleHref}
        className="inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink no-underline hover:bg-ink hover:text-paper"
      >
        {site.ctaLabel}
      </Link>
      <p className="text-sm text-muted">{site.ctaHint}</p>
    </div>
  );
}
