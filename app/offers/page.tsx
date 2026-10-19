import type { Metadata } from "next";
import Link from "next/link";
import { PhoneCta } from "@/components/phone-cta";
import { site } from "@/lib/content";
import { services, servicesPage } from "@/lib/services";

export const metadata: Metadata = {
  title: servicesPage.title,
  description: servicesPage.description,
  openGraph: {
    title: `${servicesPage.title} · ${site.wordmark}`,
    description: servicesPage.description,
    url: "/offers",
  },
};

export default function OffersPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-5xl font-medium tracking-tight text-pretty md:text-7xl">
          {servicesPage.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty">
          {servicesPage.description}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty">
          We help small law firms. We do personal injury and immigration work first.
        </p>

        <div className="mt-12 max-w-3xl space-y-4">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 border border-line bg-slot px-5 py-6 md:px-6"
            >
              <h2 className="text-2xl font-medium tracking-tight">{service.title}</h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 max-w-2xl" aria-labelledby="services-next-heading">
          <h2 id="services-next-heading" className="text-2xl font-medium tracking-tight">
            Next step
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Read the method in the guide, or book a call.
          </p>
          <p className="mt-4">
            <Link
              href="/guides/converting-inbound-into-cases"
              className="underline decoration-ink/20 underline-offset-4 hover:text-signal"
            >
              Converting inbound calls into signed cases with AI
            </Link>
          </p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              href={site.scheduleHref}
              className="inline-flex min-h-12 items-center justify-center bg-signal px-6 py-3 text-sm font-medium text-paper no-underline hover:bg-ink"
            >
              {site.ctaLabel}
            </Link>
            <PhoneCta />
          </div>
        </section>
      </div>
    </main>
  );
}
