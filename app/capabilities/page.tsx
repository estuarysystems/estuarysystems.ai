import type { Metadata } from "next";
import { ExpandCard } from "@/components/expand-card";
import { capabilities, primaryCapabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
};

export default function CapabilitiesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">Capabilities</h1>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {primaryCapabilities.map((item) => (
            <ExpandCard key={item.title} title={item.title} line={item.line} size="large" />
          ))}
        </div>

        <section className="mt-24" aria-labelledby="more-heading">
          <h2
            id="more-heading"
            className="text-4xl font-medium tracking-tight md:text-5xl"
          >
            And much more
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <ExpandCard key={item.title} title={item.title} line={item.line} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
