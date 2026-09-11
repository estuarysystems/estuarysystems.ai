import { CalEmbed } from "@/components/cal-embed";
import { homeQuestion, site } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h1 className="text-3xl font-medium tracking-tight text-pretty md:text-4xl">
          {homeQuestion}
        </h1>

        <section
          className="mt-12 border border-line"
          aria-labelledby="contact-heading"
        >
          <div className="border-b border-line px-5 py-4">
            <h2 id="contact-heading" className="text-base font-medium">
              Contact me
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
