import Link from "next/link";
import type { ReactNode } from "react";

type PricingCardProps = {
  name: string;
  promise: string;
  bullets: readonly string[];
  price: ReactNode;
  buttonLabel: string;
  buttonHref: string;
};

export function PricingCard({
  name,
  promise,
  bullets,
  price,
  buttonLabel,
  buttonHref,
}: PricingCardProps) {
  return (
    <article className="flex h-full flex-col border border-line bg-white p-6 md:p-8">
      <h2 className="text-xl font-medium tracking-tight">{name}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{promise}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm leading-relaxed text-ink">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="mt-8">{price}</div>
      <Link
        href={buttonHref}
        className="mt-8 inline-flex min-h-12 items-center justify-center bg-ink px-4 py-3 text-center text-sm font-medium text-paper no-underline hover:bg-hero"
      >
        {buttonLabel}
      </Link>
    </article>
  );
}
