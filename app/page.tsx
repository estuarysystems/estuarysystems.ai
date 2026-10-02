import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { UseCaseReel } from "@/components/use-case-reel";
import { homePage, site } from "@/lib/content";

export const metadata: Metadata = {
  description: homePage.description,
  openGraph: {
    description: homePage.description,
  },
};

export default function HomePage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:pb-14 md:pt-24 lg:pr-36">
        <h1 className="max-w-5xl text-5xl font-medium tracking-[-0.045em] text-pretty md:text-7xl lg:text-8xl">
          {site.wordmark}
        </h1>
        <p className="mt-5 max-w-4xl text-2xl font-medium tracking-tight text-pretty md:mt-6 md:text-4xl">
          Power Your Business with Superintelligence
        </p>
      </div>

      <UseCaseReel />

      <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <section className="border border-line bg-slot" aria-labelledby="intro-call-heading">
          <div className="border-b border-line px-5 py-4">
            <h2 id="intro-call-heading" className="text-base font-medium">
              Schedule intro call
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                {site.email}
              </a>
            </p>
          </div>
          <CalEmbed title="Schedule intro call" />
        </section>
      </div>
    </main>
  );
}
