"use client";

import { useMemo, useState } from "react";
import { alexandriaCards, type AlexandriaCard } from "@/lib/alexandria-cards";
import { alexandriaShelves } from "@/lib/content";

export function AlexandriaLibrary() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalized) {
      return alexandriaCards;
    }

    return alexandriaCards.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.credit.toLowerCase().includes(normalized),
    );
  }, [normalized]);

  return (
    <div className="mt-16 space-y-16">
      <label className="block">
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-full border border-line bg-paper px-4 py-3 text-lg text-ink placeholder:text-muted"
        />
      </label>

      {alexandriaShelves.map((shelf) => {
        const cards = matches.filter((item) => item.shelf === shelf);

        return (
          <section key={shelf} aria-labelledby={`shelf-${shelf.toLowerCase()}`}>
            <h2
              id={`shelf-${shelf.toLowerCase()}`}
              className="text-4xl font-medium tracking-tight md:text-5xl"
            >
              {shelf}
            </h2>
            {cards.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-6">
                {cards.map((card) => (
                  <li key={card.title}>
                    <AlexandriaPromptCard card={card} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function AlexandriaPromptCard({ card }: { card: AlexandriaCard }) {
  return (
    <article className="border border-line bg-paper px-5 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-2xl font-medium tracking-tight">{card.title}</h3>
        <CopyPromptButton prompt={card.prompt} />
      </div>

      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-sm text-muted">Inputs</dt>
          <dd className="mt-1 text-base leading-relaxed">{card.inputs}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Output</dt>
          <dd className="mt-1 text-base leading-relaxed">{card.output}</dd>
        </div>
      </dl>

      {card.truncated ? (
        <p className="mt-6 text-sm text-muted">
          Source body appears truncated — re-fetch from credit link
        </p>
      ) : null}

      <pre className="mt-6 overflow-x-auto whitespace-pre-wrap border border-line bg-slot px-4 py-4 font-mono text-sm leading-relaxed text-slot-ink">
        {card.prompt}
      </pre>

      <p className="mt-6 text-sm text-muted">
        Credit{" "}
        <a
          href={card.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
        >
          {card.credit}
        </a>
      </p>
      <p className="mt-1 text-sm text-muted">Last verified {card.lastVerified}</p>
    </article>
  );
}

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyPrompt}
      className="inline-flex min-h-12 shrink-0 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-paper"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
