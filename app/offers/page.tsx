import type { Metadata } from "next";
import { ConversationCta } from "@/components/conversation-cta";
import { offers, site } from "@/lib/content";

export const metadata: Metadata = {
  title: offers.title,
  description: `${offers.heading}. ${offers.price}. ${offers.cadence}.`,
};

export default function OffersPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">
          {offers.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{offers.lede}</p>

        <section className="mt-16 max-w-2xl" aria-labelledby="offer-heading">
          <h2
            id="offer-heading"
            className="text-4xl font-medium tracking-tight md:text-5xl"
          >
            {offers.heading}
          </h2>
          <p className="mt-8 text-2xl font-medium tracking-tight">{offers.price}</p>
          <p className="mt-2 text-lg text-muted">{offers.cadence}</p>
          <div className="mt-10 space-y-6">
            {offers.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <ConversationCta className="mt-12" />
          <p className="mt-6 text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
