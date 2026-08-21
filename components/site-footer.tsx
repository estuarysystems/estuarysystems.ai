import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
        <p>
          Copyright 2026 {site.legalName} |{" "}
          <Link
            href="/privacy"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Privacy
          </Link>{" "}
          |{" "}
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
