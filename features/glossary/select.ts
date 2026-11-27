import { groupById, groups, terms, type GroupId, type LevelId, type Side, type Term } from "./terms";

export function firstSentence(definition: string) {
  const match = definition.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : definition;
}

export function getTerm(slug: string) {
  return terms.find((term) => term.slug === slug);
}

export function filterTerms(
  query: string,
  groupId: GroupId | "all",
  levelId: LevelId | "all" = "all",
  side: Side = "technical",
) {
  const needle = query.trim().toLowerCase();
  return terms.filter((term) => {
    if (term.side !== side) {
      return false;
    }
    if (groupId !== "all" && term.group !== groupId) {
      return false;
    }
    if (levelId !== "all" && term.level !== levelId) {
      return false;
    }
    if (!needle) {
      return true;
    }
    const groupName = groupById(term.group).name;
    const haystack = [term.name, term.definition, term.examples[0], term.examples[1], groupName]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function sectionsFor(visible: readonly Term[]) {
  return groups
    .map((group) => ({
      group,
      terms: visible.filter((term) => term.group === group.id),
    }))
    .filter((section) => section.terms.length > 0);
}

export function relatedTerms(term: Term, count = 3) {
  const groupTerms = terms.filter((item) => item.group === term.group && item.side === term.side);
  const index = groupTerms.findIndex((item) => item.slug === term.slug);
  const picks: Term[] = [];
  for (let step = 1; picks.length < count && step < groupTerms.length; step += 1) {
    picks.push(groupTerms[(index + step) % groupTerms.length]);
  }
  return picks;
}

export function neighborTerms(term: Term) {
  const sideTerms = terms.filter((item) => item.side === term.side);
  const index = sideTerms.findIndex((item) => item.slug === term.slug);
  const previous = sideTerms[(index - 1 + sideTerms.length) % sideTerms.length];
  const next = sideTerms[(index + 1) % sideTerms.length];
  return { previous, next };
}

export function countLabel(count: number) {
  if (count === 0) {
    return "0 terms.";
  }
  if (count === 1) {
    return "1 term.";
  }
  return `${count} terms.`;
}
