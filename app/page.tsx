import Link from "next/link";
import { CalEmbed } from "@/components/cal-embed";
import { homeQuestion, site } from "@/lib/content";
import { useCasesPage } from "@/lib/use-cases";

export default function HomePage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h1 className="text-3xl font-medium tracking-tight text-pretty md:text-4xl">
          {homeQuestion}
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
          {useCasesPage.lede}{" "}
          <Link
            href="/use-cases"
            className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
          >
            Use cases
          </Link>
          {" · "}
          <Link
            href="/offers"
            className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
          >
            Offers
          </Link>
        </p>

        <section
          className="mt-12 border border-line bg-slot"
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
