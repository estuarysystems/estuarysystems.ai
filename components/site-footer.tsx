import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 font-mono text-xs tracking-wide text-muted">
        <p>
          <Link
            href="/guides"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Guides
          </Link>
          {" | "}
          <Link
            href="/privacy"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Privacy
          </Link>
          {" | "}
          <Link
            href="/terms"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Terms
          </Link>
        </p>
        <p className="mt-3">Copyright 2026 {site.legalName}</p>
      </div>
    </footer>
  );
}
