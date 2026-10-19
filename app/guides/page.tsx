import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

const title = "Guides";
const description =
  "Methods for law firm intake. You can read a guide and use the method without a sales call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: `${title} · ${site.wordmark}`,
    description,
    url: "/guides",
    type: "website",
  },
};

const guides = [
  {
    href: "/guides/converting-inbound-into-cases",
    title: "Converting inbound calls into signed cases with AI",
    line: "How a small law firm can answer each call, collect intake data, and follow up.",
  },
] as const;

export default function GuidesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-5xl font-medium tracking-tight text-pretty md:text-7xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty">{description}</p>
        <ul className="mt-12 max-w-3xl space-y-4">
          {guides.map((guide) => (
            <li key={guide.href} className="border border-line bg-slot px-5 py-6">
              <h2 className="text-2xl font-medium tracking-tight text-pretty">
                <Link
                  href={guide.href}
                  className="underline decoration-ink/20 underline-offset-4 hover:text-signal"
                >
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{guide.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
