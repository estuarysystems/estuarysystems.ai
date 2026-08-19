import Link from "next/link";
import { site } from "@/lib/content";
import { ScheduleCta } from "@/components/schedule-cta";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-muted">
        <p className="text-ink">{site.legalName}</p>
        <p>{site.domain}</p>
        <p>
          <ScheduleCta />
        </p>
        <p>
          © 2026 {site.legalName} ·{" "}
          <Link
            href="/privacy"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Privacy
          </Link>{" "}
          ·{" "}
          <Link
            href="/terms"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
