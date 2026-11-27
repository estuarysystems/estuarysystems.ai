import assert from "node:assert/strict";
import test from "node:test";
import { countLabel, filterTerms, firstSentence, relatedTerms } from "./select";
import { groups, terms } from "./terms";
import { iconKeyFor } from "./icons";

test("the glossary has 197 technical terms and 61 theory terms", () => {
  assert.equal(terms.length, 258);
  assert.deepEqual(
    groups.map((group) => group.name),
    ["Basics", "Training", "Models", "Using AI", "Safety and limits", "Theory"],
  );
  const slugs = new Set(terms.map((term) => term.slug));
  assert.equal(slugs.size, 258);
  assert.equal(terms.filter((term) => term.side === "technical").length, 197);
  assert.equal(terms.filter((term) => term.side === "theory").length, 61);
  const levels = { 1: 0, 2: 0, 3: 0 };
  for (const term of terms) {
    assert.ok(term.definition.endsWith("."));
    assert.equal(term.examples.length, 2);
    assert.ok(term.examples[0].length > 0);
    assert.ok(term.examples[1].length > 0);
    assert.ok(groups.some((group) => group.id === term.group));
    assert.ok(term.level === 1 || term.level === 2 || term.level === 3);
    levels[term.level] += 1;
  }
  assert.equal(levels[1] + levels[2] + levels[3], 258);
});

test("first sentence stops at the first period", () => {
  const model = terms.find((term) => term.slug === "model");
  assert.ok(model);
  assert.equal(
    firstSentence(model.definition),
    "A model is a computer program that makes guesses.",
  );
});

test("search, group, and level filters keep the term text", () => {
  const found = filterTerms("is two tokens", "all");
  assert.equal(found.length, 1);
  assert.equal(found[0].slug, "token");
  const training = filterTerms("", "training");
  assert.ok(training.every((term) => term.group === "training"));
  assert.equal(filterTerms("not-a-term-zz", "all").length, 0);
  const level1 = filterTerms("", "all", 1);
  assert.ok(level1.length > 0);
  assert.ok(level1.every((term) => term.level === 1));
  const level2 = filterTerms("", "all", 2);
  assert.ok(level2.every((term) => term.level === 2));
  const level3 = filterTerms("", "all", 3);
  assert.ok(level3.every((term) => term.level === 3));
  assert.equal(level1.length + level2.length + level3.length, 197);
  assert.equal(countLabel(0), "0 terms.");
  assert.equal(countLabel(1), "1 term.");
  assert.equal(countLabel(197), "197 terms.");
});

test("related terms stay in the same group", () => {
  const model = terms.find((term) => term.slug === "model");
  assert.ok(model);
  const related = relatedTerms(model);
  assert.equal(related.length, 3);
  assert.ok(related.every((term) => term.group === "basics"));
  assert.ok(related.every((term) => term.slug !== "model"));
});

test("approved first 53 slugs stay the same", () => {
  const expected = [
    "model",
    "token",
    "parameter",
    "weight",
    "dataset",
    "label",
    "vector",
    "embedding",
    "utility",
    "usage",
    "train",
    "training",
    "loss",
    "gradient-descent",
    "learning-rate",
    "epoch",
    "overfitting",
    "fine-tuning",
    "distillation",
    "supervised-learning",
    "unsupervised-learning",
    "reinforcement-learning",
    "reward",
    "rlhf",
    "neural-network",
    "layer",
    "activation",
    "bias-number",
    "bias-unfair",
    "attention",
    "transformer",
    "large-language-model",
    "multimodal",
    "diffusion-model",
    "classification",
    "regression",
    "quantization",
    "inference",
    "prompt",
    "system-prompt",
    "context-window",
    "temperature",
    "sampling",
    "top-p",
    "latency",
    "gpu",
    "agent",
    "tool-use",
    "rag",
    "benchmark",
    "hallucination",
    "alignment",
    "guardrails",
  ];
  for (const slug of expected) {
    assert.ok(terms.some((term) => term.slug === slug), slug);
  }
  assert.equal(expected.length, 53);
});

test("every term has a simple picture", () => {
  for (const term of terms) {
    assert.ok(iconKeyFor(term.slug), term.slug);
  }
});

test("the theory side has 61 terms and keeps slugs off the technical list", () => {
  const theory = filterTerms("", "all", "all", "theory");
  assert.equal(theory.length, 61);
  assert.ok(theory.every((term) => term.side === "theory"));
  assert.ok(theory.every((term) => term.group === "theory"));
  assert.equal(theory.filter((term) => term.level === 1).length, 12);
  assert.equal(theory.filter((term) => term.level === 2).length, 24);
  assert.equal(theory.filter((term) => term.level === 3).length, 25);
  const shoggoth = terms.find((term) => term.slug === "shoggoth");
  assert.ok(shoggoth);
  assert.equal(shoggoth.name, "Shoggoth");
  assert.equal(shoggoth.side, "theory");
  assert.equal(filterTerms("smiley-face mask", "all", "all", "theory").length, 1);
  assert.equal(countLabel(61), "61 terms.");
  for (const term of theory) {
    assert.equal(term.examples.length, 2);
    assert.ok(!term.definition.includes("http"));
    assert.ok(!term.examples[0].includes("http"));
    assert.ok(!term.examples[1].includes("http"));
    assert.ok(!term.definition.includes("Source (review"));
  }
});

test("level 3 examples give a short scene with context", () => {
  const level3 = terms.filter((term) => term.level === 3);
  assert.equal(level3.filter((term) => term.side === "technical").length, 50);
  assert.equal(level3.filter((term) => term.side === "theory").length, 25);
  for (const term of level3) {
    for (const example of term.examples) {
      const sentences = example.match(/.+?[.!?]+(?=\s+|$)/g) ?? [];
      assert.ok(sentences.length >= 3, term.slug);
      assert.ok(sentences.length <= 5, term.slug);
      assert.ok(!example.includes("http"));
    }
  }
});
