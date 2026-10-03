import type { Metadata } from "next";
import { IndustryCatalog } from "@/components/industry-catalog";
import { industriesPage } from "@/lib/industries";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: industriesPage.title,
  description: industriesPage.description,
  openGraph: {
    title: `${industriesPage.title} · ${site.wordmark}`,
    description: industriesPage.description,
    url: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-7xl">{industriesPage.title}</h1>
        <IndustryCatalog />
      </div>
    </main>
  );
}
