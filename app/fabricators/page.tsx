import type { Metadata } from "next";
import { FabricatorsSection } from "@/components/fabricators-section";
import { fabricatorsPage } from "@/lib/fabricators";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: fabricatorsPage.title,
  description: fabricatorsPage.description,
  openGraph: {
    title: `${fabricatorsPage.title} · ${site.wordmark}`,
    description: fabricatorsPage.description,
    url: "/fabricators",
  },
};

export default function FabricatorsPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-7xl">{fabricatorsPage.title}</h1>
        <FabricatorsSection />
      </div>
    </main>
  );
}
