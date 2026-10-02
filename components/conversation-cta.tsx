import Link from "next/link";
import { site } from "@/lib/content";

type ConversationCtaProps = {
  className?: string;
  showHint?: boolean;
};

export function ConversationCta({ className = "", showHint = true }: ConversationCtaProps) {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`.trim()}>
      <Link
        href={site.scheduleHref}
        className="inline-flex min-h-12 items-center justify-center bg-signal px-6 py-3 text-sm font-medium text-paper no-underline hover:bg-ink"
      >
        {site.ctaLabel}
      </Link>
      {showHint ? <p className="text-sm text-muted">{site.ctaHint}</p> : null}
    </div>
  );
}
