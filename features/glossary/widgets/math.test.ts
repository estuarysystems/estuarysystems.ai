import assert from "node:assert/strict";
import test from "node:test";
import {
  applyTemperature,
  hillLoss,
  keepTopK,
  keepTopP,
  nearestWord,
  nextHillPosition,
  nextWords,
  pickWord,
  stepStudent,
  studentStart,
  teacherScores,
} from "./math";

test("temperature 1 keeps the draft scores", () => {
  const scores = applyTemperature(
    nextWords.map((item) => item.score),
    1,
  );
  assert.ok(Math.abs(scores[0] - 0.6) < 0.0001);
  assert.ok(Math.abs(scores[1] - 0.3) < 0.0001);
  assert.ok(Math.abs(scores[2] - 0.1) < 0.0001);
});

test("temperature sharpens and flattens the bars", () => {
  const base = nextWords.map((item) => item.score);
  const sharp = applyTemperature(base, 0.5);
  const flat = applyTemperature(base, 2);
  assert.ok(sharp[0] > 0.6);
  assert.ok(flat[0] < 0.6);
  assert.ok(flat[2] > 0.1);
});

test("top-p and top-k hide low bars", () => {
  const items = nextWords.map((item) => ({ word: item.word, score: item.score }));
  assert.deepEqual(
    keepTopP(items, 0.6).map((item) => item.word),
    ["mat"],
  );
  assert.deepEqual(
    keepTopP(items, 0.9).map((item) => item.word),
    ["mat", "ledge"],
  );
  assert.deepEqual(
    keepTopP(items, 1).map((item) => item.word),
    ["mat", "ledge", "chair"],
  );
  assert.deepEqual(
    keepTopK(items, 2).map((item) => item.word),
    ["mat", "ledge"],
  );
});

test("sampling follows the score weights", () => {
  const items = nextWords.map((item) => ({ word: item.word, score: item.score }));
  assert.equal(pickWord(items, 0.1), "mat");
  assert.equal(pickWord(items, 0.7), "ledge");
  assert.equal(pickWord(items, 0.95), "chair");
});

test("a student step moves toward the teacher", () => {
  const next = stepStudent(studentStart);
  assert.ok(Math.abs(next[0] - teacherScores[0]) < Math.abs(studentStart[0] - teacherScores[0]));
  const total = next.reduce((sum, score) => sum + score, 0);
  assert.ok(Math.abs(total - 1) < 0.0001);
});

test("the ball steps downhill and can pass the bottom", () => {
  const small = nextHillPosition(-0.8, 0.2);
  assert.ok(small < 0);
  assert.ok(Math.abs(small) < 0.8);
  assert.ok(hillLoss(small) < hillLoss(-0.8));
  const large = nextHillPosition(-0.8, 1.2);
  assert.ok(large > 0);
});

test("near words stay near and far words stay far", () => {
  assert.equal(nearestWord("cat")?.word, "kitten");
  assert.equal(nearestWord("cat")?.relation, "near");
  assert.equal(nearestWord("car")?.relation, "far");
});
