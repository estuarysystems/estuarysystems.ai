import type { Metadata } from "next";
import Link from "next/link";
import { NOT_LEGAL_ADVICE, SITE_GUARD_NAME, SITE_GUARD_ONE_LINE } from "@/lib/site-guard/wording";

export const metadata: Metadata = {
  title: "Tools",
};

export default function ToolsPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">Tools</h1>
        <p className="max-w-2xl text-lg text-muted">
          Free tools from Estuary Systems. {NOT_LEGAL_ADVICE}
        </p>
        <article className="max-w-2xl border border-line px-5 py-8">
          <h2 className="text-2xl font-medium tracking-tight">{SITE_GUARD_NAME}</h2>
          <p className="mt-3 text-lg text-muted">{SITE_GUARD_ONE_LINE}</p>
          <Link
            href="/tools/site-guard"
            className="mt-6 inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink no-underline hover:bg-ink hover:text-paper"
          >
            Open Site Guard
          </Link>
        </article>
      </div>
    </main>
  );
}
