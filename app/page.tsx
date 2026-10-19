import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { PhoneCta } from "@/components/phone-cta";
import { UseCaseReel } from "@/components/use-case-reel";
import Link from "next/link";
import { homePage, site } from "@/lib/content";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  description: homePage.description,
  openGraph: {
    description: homePage.description,
    url: "/",
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
          {homePage.kicker}
        </p>
        <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-pretty">
          {homePage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4">
          <PhoneCta />
          <Link
            href={site.scheduleHref}
            className="inline-flex min-h-12 items-center justify-center bg-signal px-6 py-3 text-sm font-medium text-paper no-underline hover:bg-ink"
          >
            {site.ctaLabel}
          </Link>
        </div>
      </div>

      <UseCaseReel />

      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
            Services
          </h2>
          <ul className="mt-6 max-w-2xl space-y-5">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/offers#${service.id}`}
                  className="text-lg underline decoration-ink/20 underline-offset-4 hover:text-signal"
                >
                  {service.title}
                </Link>
                <p className="mt-1 text-base leading-relaxed text-muted">{service.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 max-w-2xl" aria-labelledby="guide-heading">
          <h2 id="guide-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
            Guide
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Read the method. You can use it without a sales call.
          </p>
          <p className="mt-4">
            <Link
              href="/guides/converting-inbound-into-cases"
              className="text-lg underline decoration-ink/20 underline-offset-4 hover:text-signal"
            >
              Converting inbound calls into signed cases with AI
            </Link>
          </p>
        </section>

        <section
          className="mt-14 max-w-3xl border border-line bg-slot"
          aria-labelledby="intro-call-heading"
        >
          <div className="border-b border-line px-5 py-4">
            <h2 id="intro-call-heading" className="text-base font-medium">
              Book a call
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty">
              Book a call about intake at your firm.
            </p>
            <p className="mt-3 font-mono text-xs text-muted">
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                {site.email}
              </a>
              {" · "}
              <Link
                href={site.scheduleHref}
                className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                {site.scheduleHref}
              </Link>
            </p>
            <PhoneCta className="mt-1" />
          </div>
          <CalEmbed title="Book a call" />
        </section>
      </div>
    </main>
  );
}
