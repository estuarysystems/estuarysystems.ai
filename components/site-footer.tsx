import { site } from "@/lib/content";
import { ScheduleCta } from "@/components/schedule-cta";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-10 text-sm text-muted">
        <p className="text-ink">{site.legalName}</p>
        <p>{site.domain}</p>
        <p>
          <ScheduleCta />
        </p>
      </div>
    </footer>
  );
}
