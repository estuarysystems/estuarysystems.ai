import Link from "next/link";
import { TermIcon } from "./icons";
import { DotGrid, LevelBadge, TermCard } from "./term-card";
import { groupById, type Term } from "./terms";
import { hasWidget, WidgetForTerm } from "./widget-for-term";
import "./glossary.css";

export function TermView({
  term,
  related,
  previous,
  next,
}: {
  term: Term;
  related: readonly Term[];
  previous: Term;
  next: Term;
}) {
  const group = groupById(term.group);
  return (
    <div className="glossary" data-glossary-root>
      <a className="skip" href="#meaning">
        Skip to the meaning
      </a>
      <article className="glossary-wrap term-wrap">
        <Link className="control back-link" href="/glossary" data-back>
          Back to the list
        </Link>
        <p className="group-kicker">
          <span className="swatch" style={{ background: group.color }} aria-hidden="true" />
          {group.name}
          <LevelBadge level={term.level} />
        </p>
        <header className="term-header">
          <DotGrid />
          <h1>{term.name}</h1>
          <TermIcon slug={term.slug} color={group.color} />
        </header>
        <p id="meaning" className="definition">
          {term.definition}
        </p>
        <h2>Examples</h2>
        <ol className="examples">
          {term.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ol>
        {hasWidget(term.slug) ? (
          <section className="try-block" aria-label="Try this">
            <h2>Try this</h2>
            <WidgetForTerm slug={term.slug} color={group.color} />
          </section>
        ) : null}
        <h2>Related terms</h2>
        <div className="term-grid">
          {related.map((item) => (
            <TermCard key={item.slug} term={item} compact />
          ))}
        </div>
        <nav className="term-nav" aria-label="More terms">
          <Link className="control term-nav-link" href={`/glossary/${previous.slug}`} data-prev-term>
            <span>Previous term</span>
            <strong>{previous.name}</strong>
          </Link>
          <Link className="control term-nav-link" href={`/glossary/${next.slug}`} data-next-term>
            <span>Next term</span>
            <strong>{next.name}</strong>
          </Link>
        </nav>
      </article>
    </div>
  );
}
