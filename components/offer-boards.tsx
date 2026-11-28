import { ConversationCta } from "@/components/conversation-cta";
import { site } from "@/lib/content";
import { oneTimeOffers } from "@/lib/offers";

export function OfferBoards() {
  return (
    <div className="mt-12">
      <ul className="grid items-stretch gap-6 md:grid-cols-3">
        {oneTimeOffers.map((offer) => (
          <li key={offer.id} className="border border-line bg-slot px-6 py-8 md:px-8 md:py-10">
            <h2 className="text-2xl font-medium tracking-tight">{offer.heading}</h2>
            <p className="mt-4 text-lg leading-relaxed">{offer.line}</p>
          </li>
        ))}
      </ul>
      <ConversationCta className="mt-10" showHint={false} />
      <p className="mt-4 font-mono text-xs">
        <a
          href={`mailto:${site.email}`}
          className="text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
        >
          {site.email}
        </a>
      </p>
    </div>
  );
}
