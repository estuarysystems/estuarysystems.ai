import type { Metadata } from "next";
import { blogPlaceholder } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI blog",
};

export default function BlogPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">AI blog</h1>
        <p className="max-w-2xl text-lg text-muted">{blogPlaceholder}</p>
      </div>
    </main>
  );
}
