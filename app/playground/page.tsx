import type { Metadata } from "next";
import { PlaygroundGrid } from "@/components/playground-grid";
import { site } from "@/lib/content";
import { playgroundPage } from "@/lib/playground";

export const metadata: Metadata = {
  title: playgroundPage.title,
  description: playgroundPage.description,
  openGraph: {
    title: `${playgroundPage.title} · ${site.wordmark}`,
    description: playgroundPage.description,
    url: "/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-7xl">{playgroundPage.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">{playgroundPage.description}</p>
        <PlaygroundGrid />
      </div>
    </main>
  );
}
