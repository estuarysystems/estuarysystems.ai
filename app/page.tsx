import { ConversationCta } from "@/components/conversation-cta";
import { home, site } from "@/lib/content";

function StorySection({
  headingId,
  heading,
  paragraphs,
}: {
  headingId: string;
  heading: string;
  paragraphs: readonly string[];
}) {
  return (
    <section className="border-t border-line" aria-labelledby={headingId}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2
          id={headingId}
          className="max-w-3xl text-4xl font-medium tracking-tight text-pretty md:text-5xl"
        >
          {heading}
        </h2>
        <div className="mt-10 max-w-2xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="main">
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-32">
          <h1 className="max-w-5xl text-4xl font-medium tracking-tight text-pretty sm:text-5xl md:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted">{site.oneLiner}</p>
          <p className="mt-4 max-w-2xl text-lg text-muted">{home.opening}</p>
          <ConversationCta className="mt-10" />
        </div>
      </section>

      <StorySection
        headingId="tenure-heading"
        heading={home.tenure.heading}
        paragraphs={home.tenure.paragraphs}
      />
      <StorySection
        headingId="partners-heading"
        heading={home.partners.heading}
        paragraphs={home.partners.paragraphs}
      />
      <StorySection
        headingId="offer-heading"
        heading={home.offer.heading}
        paragraphs={home.offer.paragraphs}
      />

      <section className="border-t border-line" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 md:py-28">
          <h2
            id="cta-heading"
            className="max-w-3xl text-4xl font-medium tracking-tight text-pretty md:text-5xl"
          >
            {home.close.heading}
          </h2>
          <ConversationCta />
        </div>
      </section>
    </main>
  );
}
