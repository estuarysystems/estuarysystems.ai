import Link from "next/link";
import { site } from "@/lib/content";

type ScheduleCtaProps = {
  href?: string;
  variant?: "button" | "text";
  className?: string;
};

export function ScheduleCta({
  href = site.scheduleHref,
  variant = "text",
  className = "",
}: ScheduleCtaProps) {
  const classes =
    variant === "button"
      ? `inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink no-underline hover:bg-ink hover:text-paper ${className}`
      : `inline-block text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink ${className}`;

  return (
    <Link href={href} className={classes}>
      {site.scheduleLabel}
    </Link>
  );
}
