import { ConversationCta } from "@/components/conversation-cta";
import { firstTwoWeeks, site, walk } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="main">
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-32">
          <h1 className="max-w-5xl text-4xl font-medium tracking-tight text-pretty sm:text-5xl md:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-8 text-lg text-muted">{site.wordmark}</p>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="walk-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2
            id="walk-heading"
            className="text-4xl font-medium tracking-tight md:text-5xl"
          >
            The walk
          </h2>
          <ol className="mt-16 grid max-w-3xl gap-12">
            {walk.map((step) => (
              <li key={step.title} className="space-y-3">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-lg text-muted">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="weeks-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2
            id="weeks-heading"
            className="text-4xl font-medium tracking-tight md:text-5xl"
          >
            {firstTwoWeeks.heading}
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-muted">{firstTwoWeeks.intro}</p>
          <ol className="mt-16 max-w-2xl space-y-5">
            {firstTwoWeeks.days.map((day) => (
              <li key={day} className="text-lg leading-relaxed">
                {day}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 md:py-28">
          <h2 id="cta-heading" className="sr-only">
            {site.ctaLabel}
          </h2>
          <ConversationCta />
        </div>
      </section>
    </main>
  );
}
