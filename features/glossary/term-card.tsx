import Link from "next/link";
import type { CSSProperties } from "react";
import { TermIcon } from "./icons";
import { firstSentence } from "./select";
import { groupById, type Term } from "./terms";

export function DotGrid() {
  return (
    <span className="dot-grid" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <span className="dot" key={index} />
      ))}
    </span>
  );
}

export function LevelBadge({ level }: { level: Term["level"] }) {
  return (
    <span className="level-badge" data-level-badge={level}>
      Level {level}
    </span>
  );
}

export function TermCard({ term, compact = false }: { term: Term; compact?: boolean }) {
  const group = groupById(term.group);
  return (
    <Link
      href={`/glossary/${term.slug}`}
      className={compact ? "term-card is-compact" : "term-card"}
      style={{ "--accent": group.color } as CSSProperties}
      data-term-card={term.slug}
      data-group={group.id}
      data-level={term.level}
      id={compact ? undefined : term.slug}
    >
      <span className="term-card-bar" />
      <span className="term-card-main">
        <DotGrid />
        <span className="term-card-copy">
          <span className="term-card-name-row">
            <span className="term-card-name">{term.name}</span>
            <LevelBadge level={term.level} />
          </span>
          {compact ? null : (
            <span className="term-card-slot">
              <span className="term-card-sentence">{firstSentence(term.definition)}</span>
              <span className="term-card-preview" aria-hidden="true">
                {term.examples[0]}
              </span>
            </span>
          )}
        </span>
        <TermIcon slug={term.slug} color={group.color} />
      </span>
    </Link>
  );
}
