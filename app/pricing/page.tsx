import type { Metadata } from "next";
import { FillInSlot } from "@/components/fill-in-slot";
import { PricingCard } from "@/components/pricing-card";
import { locked, pricing, retainerBullets, site, slots } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-4xl font-medium tracking-tight">{pricing.heading}</h1>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-4">
          <PricingCard
            name={pricing.tools.name}
            promise={pricing.tools.promise}
            bullets={pricing.tools.bullets}
            price={<FillInSlot label={slots.price} className="px-4 py-4" />}
            buttonLabel={pricing.tools.buttonLabel}
            buttonHref={pricing.tools.buttonHref}
          />

          {pricing.retainers.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              promise={pricing.retainerPromise}
              bullets={retainerBullets(plan.hours)}
              price={
                <p className="space-y-1">
                  <span className="block text-lg font-medium tracking-tight">
                    {pricing.baseRate}
                  </span>
                  <span className="block text-sm text-muted">{plan.monthly}</span>
                </p>
              }
              buttonLabel={site.scheduleLabel}
              buttonHref={pricing.retainerButtonHref}
            />
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-base leading-relaxed">{locked.afterYouBook}</p>
      </div>
    </main>
  );
}
