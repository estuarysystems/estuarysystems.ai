import { site } from "@/lib/content";

type ScheduleCtaProps = {
  href?: string;
  variant?: "circle" | "text";
  className?: string;
};

export function ScheduleCta({
  href = "/#schedule",
  variant = "text",
  className = "",
}: ScheduleCtaProps) {
  if (variant === "circle") {
    return (
      <a
        href={href}
        className={`inline-flex size-40 shrink-0 items-center justify-center rounded-full bg-white px-5 text-center text-sm font-medium leading-snug text-ink no-underline ring-1 ring-ink/20 transition hover:bg-paper focus-visible:outline-offset-4 ${className}`}
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
