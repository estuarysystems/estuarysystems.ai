"use client";

import { useState, type CSSProperties } from "react";
import { ConversationCta } from "@/components/conversation-cta";
import { site } from "@/lib/content";
import {
  RECURRING_MAX,
  formatUsd,
  oneTimeOffers,
  recurringStop,
} from "@/lib/offers";

function mailtoHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

function Range({
  label,
  max,
  value,
  valueText,
  onChange,
}: {
  label: string;
  max: number;
  value: number;
  valueText: string;
  onChange: (value: number) => void;
}) {
  const fill = max === 0 ? "0%" : `${(value / max) * 100}%`;

  return (
    <input
      className="offer-range"
      type="range"
      min={0}
      max={max}
      step={1}
      value={value}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      style={{ "--fill": fill } as CSSProperties}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}

export function OfferBoards() {
  const [recurringIndex, setRecurringIndex] = useState(0);
  const [oneTimeIndex, setOneTimeIndex] = useState(0);
  const recurring = recurringStop(recurringIndex);
  const oneTime = oneTimeOffers[oneTimeIndex];

  return (
    <div className="mt-12 grid items-stretch gap-6 md:mt-16 md:grid-cols-2">
      <section
        className="flex flex-col border border-line bg-slot px-6 py-8 md:px-8 md:py-10"
        aria-labelledby="recurring-heading"
      >
        <h2 id="recurring-heading" className="text-4xl font-medium tracking-tight">
          Recurring
        </h2>
        <p className="mt-8 text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
          {formatUsd(recurring.monthly)}
          <span className="ml-2 align-baseline text-xl font-normal text-muted md:text-2xl">
            / month
          </span>
        </p>
        <p className="mt-4 text-lg">{recurring.label}</p>
        <p className="mt-1 text-lg text-muted">{recurring.detail}</p>
        <p className="mt-1 min-h-7 font-mono text-sm text-muted">
          {recurring.blended ?? ""}
        </p>

        <div className="mt-auto pt-10">
          <Range
            label="Recurring engagement"
            max={RECURRING_MAX}
            value={recurringIndex}
            valueText={recurring.valueText}
            onChange={setRecurringIndex}
          />
          <div
            className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
            aria-hidden="true"
          >
            <span>Advisory</span>
            <span>20 hr/wk</span>
          </div>
          <ConversationCta className="mt-8" showHint={false} />
          <p className="mt-4 font-mono text-xs">
            <a
              href={mailtoHref(recurring.mailtoSubject)}
              className="text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </div>
      </section>

      <section
        className="flex flex-col border border-line bg-slot px-6 py-8 md:px-8 md:py-10"
        aria-labelledby="one-time-heading"
      >
        <h2 id="one-time-heading" className="text-4xl font-medium tracking-tight">
          One-time
        </h2>
        <p className="mt-8 text-5xl font-medium tracking-tight md:text-6xl">Custom quote</p>
        <p className="mt-4 text-lg">{oneTime.heading}</p>
        <p className="mt-1 min-h-14 text-lg text-muted">{oneTime.line}</p>

        <div className="mt-auto pt-10">
          <Range
            label="One-time engagement"
            max={oneTimeOffers.length - 1}
            value={oneTimeIndex}
            valueText={`${oneTime.heading}. ${oneTime.line} Custom quote.`}
            onChange={setOneTimeIndex}
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {oneTimeOffers.map((offer, index) => (
              <button
                key={offer.id}
                type="button"
                aria-pressed={index === oneTimeIndex}
                onClick={() => setOneTimeIndex(index)}
                className={`text-left font-mono text-[10px] uppercase leading-snug tracking-[0.12em] ${
                  index === oneTimeIndex ? "text-signal" : "text-muted"
                } ${index === 1 ? "text-center" : ""} ${index === 2 ? "text-right" : ""}`}
              >
                {offer.heading}
              </button>
            ))}
          </div>
          <ConversationCta className="mt-8" showHint={false} />
          <p className="mt-4 font-mono text-xs">
            <a
              href={mailtoHref(oneTime.mailtoSubject)}
              className="text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
