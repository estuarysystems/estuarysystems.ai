import type { Metadata } from "next";
import { ConversationCta } from "@/components/conversation-cta";
import { UseCaseCatalog } from "@/components/use-case-catalog";
import { site } from "@/lib/content";
import { useCasesPage } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: useCasesPage.title,
  description: useCasesPage.description,
  openGraph: {
    title: `${useCasesPage.title} · ${site.wordmark}`,
    description: useCasesPage.description,
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="text-5xl font-medium tracking-[-0.04em] md:text-7xl">{useCasesPage.title}</h1>

        <UseCaseCatalog />

        <div className="border-t border-line pt-8">
          <ConversationCta showHint={false} />
          <p className="mt-4 font-mono text-xs">
            <a
              href={`mailto:${site.email}`}
              className="text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
