import type { Metadata } from "next";
import { ConversationCta } from "@/components/conversation-cta";
import { offers, site, type Offer } from "@/lib/content";

export const metadata: Metadata = {
  title: offers.title,
  description: offers.description,
};

function mailtoHref(offer: Offer) {
  const subject = offer.mailtoSubject
    ? `?subject=${encodeURIComponent(offer.mailtoSubject)}`
    : "";
  return `mailto:${site.email}${subject}`;
}

export default function OffersPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">
          {offers.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{offers.lede}</p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {offers.items.map((offer) => {
            const steps = "steps" in offer ? offer.steps : undefined;
            const include = "include" in offer ? offer.include : undefined;

            return (
              <section
                key={offer.id}
                className="flex flex-col border border-line px-6 py-8 md:px-8 md:py-10"
                aria-labelledby={`${offer.id}-heading`}
              >
                <h2
                  id={`${offer.id}-heading`}
                  className="text-4xl font-medium tracking-tight"
                >
                  {offer.heading}
                </h2>
                <p className="mt-6 text-lg text-muted">{offer.lede}</p>
                <p className="mt-8 text-2xl font-medium tracking-tight">
                  {offer.price}
                </p>
                <p className="mt-2 text-lg text-muted">{offer.cadence}</p>
                <div className="mt-10 space-y-6">
                  {offer.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lg leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {steps ? (
                  <ol className="mt-10 space-y-3 text-lg text-muted">
                    {steps.map((step, index) => (
                      <li key={step} className="leading-relaxed">
                        <span className="text-ink">{index + 1}. </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                ) : null}
                <div className="mt-auto">
                  <ConversationCta className="mt-12" />
                  {include ? (
                    <p className="mt-6 text-sm text-muted">{include}</p>
                  ) : null}
                  <p className={`text-sm text-muted ${include ? "mt-2" : "mt-6"}`}>
                    <a
                      href={mailtoHref(offer)}
                      className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
                    >
                      {site.email}
                    </a>
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
