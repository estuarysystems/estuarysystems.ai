import type { Metadata } from "next";
import { capabilities, capabilitiesIntro, howWeWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
};

export default function CapabilitiesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <header className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-medium tracking-tight">Capabilities</h1>
          <p className="text-lg leading-relaxed text-muted">{capabilitiesIntro}</p>
        </header>

        <ol className="mt-16 max-w-3xl space-y-10">
          {capabilities.map((item) => (
            <li key={item.title}>
              <h2 className="text-lg font-medium tracking-tight">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.line}</p>
            </li>
          ))}
        </ol>

        <section className="mt-20 max-w-3xl border-t border-line pt-16" aria-labelledby="how-we-work">
          <h2 id="how-we-work" className="text-3xl font-medium tracking-tight">
            How we work
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{howWeWork}</p>
        </section>
      </div>
    </main>
  );
}
