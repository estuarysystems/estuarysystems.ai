import type { Metadata } from "next";
import Link from "next/link";
import { UseCaseCatalog } from "@/components/use-case-catalog";
import { site } from "@/lib/content";
import { useCasePackages, useCasesPage } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: useCasesPage.title,
  description: useCasesPage.description,
  openGraph: {
    title: `${useCasesPage.title} · ${site.wordmark}`,
    description: useCasesPage.description,
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  const moduleCount = useCasePackages.reduce((total, pkg) => total + pkg.modules.length, 0);

  return (
    <main id="main" className="use-cases">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <header className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--uc-signal)]">
              SI
            </p>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.04em] md:text-7xl">
              {useCasesPage.title}
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--uc-ash)]">
              {moduleCount} modules
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--uc-ash)]">
              {useCasesPage.lede}
            </p>
          </div>
        </header>

        <UseCaseCatalog />

        <div className="grid border-t border-[var(--uc-line)] pt-12 md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            <Link
              href={site.scheduleHref}
              className="use-cases-cta inline-flex min-h-12 items-center justify-center px-6 py-3 text-sm font-medium tracking-tight no-underline"
            >
              {site.ctaLabel}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--uc-ash)]">
              {site.ctaHint}
            </p>
            <p className="mt-4 font-mono text-xs">
              <a
                href={`mailto:${site.email}`}
                className="text-[var(--uc-ash)] underline decoration-[var(--uc-graphite)] underline-offset-4 hover:text-[var(--uc-bone)]"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
