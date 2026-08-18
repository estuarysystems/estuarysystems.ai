import type { Metadata } from "next";
import { FillInSlot } from "@/components/fill-in-slot";
import { ScheduleCta } from "@/components/schedule-cta";
import { slots } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-5xl space-y-10 px-5 py-16 md:py-24">
        <h1 className="text-4xl font-medium tracking-tight">Pricing</h1>
        <FillInSlot label={slots.pricing} className="max-w-2xl min-h-40" />
        <p>
          <ScheduleCta variant="circle" />
        </p>
      </div>
    </main>
  );
}
