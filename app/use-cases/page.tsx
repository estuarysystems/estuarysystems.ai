import type { Metadata } from "next";
import { ConversationCta } from "@/components/conversation-cta";
import { UseCaseCatalog } from "@/components/use-case-catalog";
import { site } from "@/lib/content";
import { useCasesPage } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: useCasesPage.title,
  description: useCasesPage.description,
  openGraph: {
    title: useCasesPage.title,
    description: useCasesPage.description,
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">
          {useCasesPage.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{useCasesPage.lede}</p>

        <UseCaseCatalog />

        <div className="mt-20">
          <ConversationCta />
          <p className="mt-6 text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
