import type { Metadata } from "next";
import { GlossaryHome } from "@/features/glossary/glossary-home";
import { site } from "@/lib/content";

const title = "AI Glossary";
const description = "Read a short meaning for each AI word. Each word has two examples.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · ${site.wordmark}`,
    description,
    url: "/glossary",
  },
};

export default function GlossaryPage() {
  return (
    <main id="main">
      <GlossaryHome />
    </main>
  );
}
