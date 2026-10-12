import type { Metadata } from "next";
import { OfferBoards } from "@/components/offer-boards";
import { offersPage } from "@/lib/offers";

export const metadata: Metadata = {
  title: offersPage.title,
  description: offersPage.description,
  openGraph: {
    description: offersPage.description,
  },
};

export default function OffersPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">{offersPage.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty">{offersPage.minimumLine}</p>
        <OfferBoards />
      </div>
    </main>
  );
}
