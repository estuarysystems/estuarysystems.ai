import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermView } from "@/features/glossary/term-view";
import { firstSentence, neighborTerms, relatedTerms } from "@/features/glossary/select";
import { terms } from "@/features/glossary/terms";
import { site } from "@/lib/content";

export function generateStaticParams() {
  return terms.map((term) => ({ slug: term.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = terms.find((item) => item.slug === slug);
  if (!term) {
    return { title: "Missing term" };
  }
  const description = firstSentence(term.definition);
  return {
    title: term.name,
    description,
    openGraph: {
      title: `${term.name} · ${site.wordmark}`,
      description,
      url: `/glossary/${term.slug}`,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = terms.find((item) => item.slug === slug);
  if (!term) {
    notFound();
  }
  const { previous, next } = neighborTerms(term);
  return (
    <main id="main">
      <TermView term={term} related={relatedTerms(term)} previous={previous} next={next} />
    </main>
  );
}
