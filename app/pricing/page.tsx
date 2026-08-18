import type { Metadata } from "next";
import { FillInSlot } from "@/components/fill-in-slot";
import { PricingCard } from "@/components/pricing-card";
import { pricing, site, slots } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">{pricing.heading}</h1>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          <div className="bg-paper">
            <PricingCard
              name={pricing.tools.name}
              description={pricing.tools.description}
              price={<FillInSlot label={slots.price} className="px-3 py-3" />}
              buttonLabel={pricing.tools.buttonLabel}
              buttonHref={pricing.tools.buttonHref}
            />
          </div>
          <div className="bg-paper">
            <PricingCard
              name={pricing.medium.name}
              description={pricing.medium.description}
              price={pricing.medium.price}
              rateLine={pricing.rateLine}
              buttonLabel={site.scheduleLabel}
              buttonHref={pricing.scheduleHref}
            />
          </div>
          <div className="bg-paper">
            <PricingCard
              name={pricing.heavy.name}
              description={pricing.heavy.description}
              price={pricing.heavy.price}
              rateLine={pricing.rateLine}
              buttonLabel={site.scheduleLabel}
              buttonHref={pricing.scheduleHref}
            />
          </div>
          <div className="bg-paper">
            <PricingCard
              name={pricing.custom.name}
              description={pricing.custom.description}
              buttonLabel={site.scheduleLabel}
              buttonHref={pricing.scheduleHref}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
