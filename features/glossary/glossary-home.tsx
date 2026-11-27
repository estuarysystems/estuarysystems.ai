"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { countLabel, filterTerms, sectionsFor } from "./select";
import { TermCard } from "./term-card";
import { groupsFor, hasTheoryTerms, levels, type GroupId, type LevelId, type Side } from "./terms";
import "./glossary.css";

export function GlossaryHome() {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState<GroupId | "all">("all");
  const [levelId, setLevelId] = useState<LevelId | "all">("all");
  const [side, setSide] = useState<Side>("technical");
  const showSideSwitch = hasTheoryTerms();
  const visibleGroups = groupsFor(side);
  const visible = filterTerms(query, groupId, levelId, side);
  const sections = sectionsFor(visible);

  function clearFilters() {
    setQuery("");
    setGroupId("all");
    setLevelId("all");
  }

  return (
    <div className="glossary" data-glossary-root data-side={side}>
      <a className="skip" href="#terms">
        Skip to the terms
      </a>
      <div className="glossary-wrap">
        <header className="page-head">
          <p className="site-mark">Estuary Systems</p>
          <h1>AI Glossary</h1>
          <p>Read a short meaning for each AI word.</p>
          <p>Each word has two examples.</p>
          {showSideSwitch ? (
            <div className="side-switch" role="group" aria-label="Glossary side" data-side-switch>
              <button
                type="button"
                className="control chip"
                aria-pressed={side === "technical"}
                data-side-chip="technical"
                onClick={() => {
                  setSide("technical");
                  setGroupId("all");
                }}
              >
                Technical
              </button>
              <button
                type="button"
                className="control chip"
                aria-pressed={side === "theory"}
                data-side-chip="theory"
                onClick={() => {
                  setSide("theory");
                  setGroupId("all");
                }}
              >
                Theory
              </button>
            </div>
          ) : null}
          <ul className="legend">
            {visibleGroups.map((group) => (
              <li key={group.id}>
                <button
                  type="button"
                  className="legend-button"
                  style={{ "--accent": group.color } as CSSProperties}
                  aria-pressed={groupId === group.id}
                  data-legend-item={group.id}
                  onClick={() => setGroupId(group.id)}
                >
                  <span className="swatch" aria-hidden="true" />
                  {group.name}
                </button>
              </li>
            ))}
          </ul>
        </header>
        <div className="search-bar">
          <div className="search-row">
            <label className="search-label" htmlFor="glossary-search">
              Search
            </label>
            <input
              id="glossary-search"
              className="search"
              type="search"
              value={query}
              placeholder="Type a word"
              data-glossary-search
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setQuery("");
                }
              }}
            />
            {query ? (
              <button type="button" className="control" onClick={() => setQuery("")}>
                Clear
              </button>
            ) : null}
          </div>
          <div className="filter-rows">
            <div className="chip-row" role="group" aria-label="Groups">
              <button
                type="button"
                className="control chip"
                aria-pressed={groupId === "all"}
                data-group-chip="all"
                onClick={() => setGroupId("all")}
              >
                All
              </button>
              {visibleGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  className="control chip"
                  style={{ "--accent": group.color } as CSSProperties}
                  aria-pressed={groupId === group.id}
                  data-group-chip={group.id}
                  onClick={() => setGroupId(group.id)}
                >
                  <span className="swatch" aria-hidden="true" />
                  {group.name}
                </button>
              ))}
            </div>
            <div className="chip-row" role="group" aria-label="Levels">
              <button
                type="button"
                className="control chip"
                aria-pressed={levelId === "all"}
                data-level-chip="all"
                onClick={() => setLevelId("all")}
              >
                All
              </button>
              {levels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  className="control chip"
                  aria-pressed={levelId === level.id}
                  data-level-chip={level.id}
                  onClick={() => setLevelId(level.id)}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="count" aria-live="polite">
          {countLabel(visible.length)}
        </p>
        <div id="terms">
          {sections.length === 0 ? (
            <div className="empty">
              <p>No term matches.</p>
              <button type="button" className="control" onClick={clearFilters}>
                Clear the search.
              </button>
            </div>
          ) : (
            sections.map((section) => (
              <section
                key={section.group.id}
                className="group-section"
                data-group-section={section.group.id}
                id={section.group.id}
              >
                <h2>
                  <span className="swatch" style={{ background: section.group.color }} aria-hidden="true" />
                  {section.group.name}
                </h2>
                <div className="term-grid">
                  {section.terms.map((term) => (
                    <TermCard key={term.slug} term={term} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
        <footer className="site-foot">
          <p>Estuary Systems</p>
          <p>This list explains AI words for learners.</p>
        </footer>
      </div>
    </div>
  );
}
