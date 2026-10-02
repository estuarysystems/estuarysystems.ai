import type { Metadata } from "next";
import Link from "next/link";
import { CalEmbed } from "@/components/cal-embed";
import { ConversationCta } from "@/components/conversation-cta";
import { bio, home, homePage, site, walk } from "@/lib/content";
import { flagshipModules, moduleId, useCasesPage } from "@/lib/use-cases";

export const metadata: Metadata = {
  description: homePage.description,
  openGraph: {
    description: homePage.description,
  },
};

function partnerLines(paragraph: string) {
  const cut = "You have the customers.";
  const at = paragraph.indexOf(cut);
  if (at === -1) return { icp: paragraph, rest: "" };
  const end = at + cut.length;
  return { icp: paragraph.slice(0, end), rest: paragraph.slice(end).trim() };
}

export default function HomePage() {
  const partners = partnerLines(home.partners.paragraphs[0]);

  return (
    <main id="main">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {site.wordmark}
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-pretty md:text-4xl">
          {partners.icp}
        </h1>
        {partners.rest ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{partners.rest}</p>
        ) : null}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {useCasesPage.lede}
        </p>
        <section className="mt-12" aria-labelledby="offer-heading">
          <h2 id="offer-heading" className="text-base font-medium">
            {home.offer.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            {home.offer.paragraphs[0]}
          </p>
          <ul aria-label="Flagship modules" className="mt-8 flex flex-wrap gap-2">
            {flagshipModules.map((title) => (
              <li key={title}>
                <Link
                  href={`/use-cases#${moduleId(title)}`}
                  className="inline-flex min-h-10 items-center border border-line px-3 py-2 text-sm text-ink no-underline hover:border-ink"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {walk.map((step) => (
              <li key={step.title}>
                <h3 className="text-sm font-medium">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.line}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-12 text-sm text-muted">{homePage.identity}</p>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">{bio}</p>

        <section className="mt-12" aria-labelledby="close-heading">
          <h2 id="close-heading" className="text-base font-medium">
            {home.close.heading}
          </h2>
          <ConversationCta className="mt-6" />
        </section>

        <section
          className="mt-16 border border-line"
          aria-labelledby="contact-heading"
        >
          <div className="border-b border-line px-5 py-4">
            <h2 id="contact-heading" className="text-base font-medium">
              {site.scheduleLabel}
            </h2>
            <p className="mt-1 text-sm text-muted">
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                {site.email}
              </a>
            </p>
          </div>
          <CalEmbed />
        </section>
      </div>
    </main>
  );
}
