import type { Metadata } from "next";
import Link from "next/link";
import { AuditCalculator } from "@/components/audit-calculator";
import { AUDIT_INTRO, AUDIT_TITLE } from "@/lib/audit";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: AUDIT_TITLE,
  description: AUDIT_INTRO,
  openGraph: {
    title: `${AUDIT_TITLE} · ${site.wordmark}`,
    description: AUDIT_INTRO,
    url: "/audit",
  },
};

export default function AuditPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-28 md:pt-24 lg:pb-24">
        <h1 className="max-w-4xl text-5xl font-medium tracking-[-0.04em] text-pretty md:text-7xl">
          {AUDIT_TITLE}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">{AUDIT_INTRO}</p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty">
          This page adds the time you enter. Section 2 of the{" "}
          <Link
            href="/guides/converting-inbound-into-cases#section-2"
            className="underline decoration-ink/20 underline-offset-4 hover:text-signal"
          >
            guide
          </Link>{" "}
          lists the numbers to collect.
        </p>
        <AuditCalculator scheduleHref={site.scheduleHref} />
      </div>
    </main>
  );
}
