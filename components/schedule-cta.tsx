import { site } from "@/lib/content";

type ScheduleCtaProps = {
  href?: string;
  variant?: "button" | "text";
  className?: string;
};

export function ScheduleCta({
  href = "/#schedule",
  variant = "text",
  className = "",
}: ScheduleCtaProps) {
  if (variant === "button") {
    return (
      <a
        href={href}
        className={`inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink no-underline hover:bg-ink hover:text-paper ${className}`}
      >
        {site.scheduleLabel}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`inline-block text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink ${className}`}
    >
      {site.scheduleLabel}
    </a>
  );
}
