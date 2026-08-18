import Link from "next/link";
import type { ReactNode } from "react";

type PricingCardProps = {
  name: string;
  description: string;
  price?: ReactNode;
  rateLine?: string;
  buttonLabel: string;
  buttonHref: string;
};

export function PricingCard({
  name,
  description,
  price,
  rateLine,
  buttonLabel,
  buttonHref,
}: PricingCardProps) {
  return (
    <article className="flex h-full flex-col border border-line px-6 py-8 md:px-7 md:py-10">
      <h2 className="text-4xl font-medium tracking-tight md:text-5xl">{name}</h2>
      <p className="mt-5 text-base text-muted">{description}</p>
      {price ? <div className="mt-8 text-2xl font-medium tracking-tight">{price}</div> : null}
      {rateLine ? <p className="mt-3 text-xs text-muted">{rateLine}</p> : null}
      <Link
        href={buttonHref}
        className="mt-auto pt-10 inline-flex min-h-12 items-center justify-center border border-ink px-4 py-3 text-center text-sm font-medium text-ink no-underline hover:bg-ink hover:text-paper"
      >
        {buttonLabel}
      </Link>
    </article>
  );
}
