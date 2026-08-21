"use client";

import { useMemo, useState } from "react";
import { alexandriaShelves } from "@/lib/content";

const publishedPrompts: readonly { shelf: (typeof alexandriaShelves)[number]; title: string }[] =
  [];

export function AlexandriaLibrary() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalized) {
      return publishedPrompts;
    }

    return publishedPrompts.filter((item) => item.title.toLowerCase().includes(normalized));
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
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cards.map((card) => (
                  <li key={card.title} className="border border-line px-5 py-6 text-base">
                    {card.title}
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
