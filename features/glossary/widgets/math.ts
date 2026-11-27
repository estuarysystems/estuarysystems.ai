export const nextWords = [
  { word: "mat", score: 0.6 },
  { word: "ledge", score: 0.3 },
  { word: "chair", score: 0.1 },
] as const;

export const teacherScores = [0.6, 0.3, 0.1] as const;
export const studentStart = [0.45, 0.35, 0.2] as const;

export function formatScore(score: number) {
  return score.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
}

export function applyTemperature(scores: readonly number[], temperature: number) {
  const safe = Math.max(temperature, 0.05);
  const weights = scores.map((score) => Math.exp(Math.log(score) / safe));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return weights.map((weight) => weight / total);
}

export function keepTopP(items: readonly { word: string; score: number }[], topP: number) {
  const sorted = [...items].sort((left, right) => right.score - left.score);
  const kept: { word: string; score: number }[] = [];
  let total = 0;
  for (const item of sorted) {
    kept.push(item);
    total += item.score;
    if (total >= topP - 1e-6) {
      break;
    }
  }
  return kept;
}

export function keepTopK(items: readonly { word: string; score: number }[], topK: number) {
  return [...items].sort((left, right) => right.score - left.score).slice(0, topK);
}

export function stepStudent(current: readonly number[]) {
  const next = current.map((score, index) => score + 0.45 * (teacherScores[index] - score));
  const total = next.reduce((sum, score) => sum + score, 0);
  return next.map((score) => score / total);
}

export function hillLoss(position: number) {
  return position * position;
}

export function nextHillPosition(position: number, stepSize: number) {
  const gradient = 2 * position;
  const next = position - stepSize * gradient;
  return Math.max(-1.35, Math.min(1.35, next));
}

export const spaceWords = [
  { word: "cat", x: 140, y: 100 },
  { word: "kitten", x: 168, y: 78 },
  { word: "dog", x: 112, y: 128 },
  { word: "car", x: 270, y: 160 },
  { word: "crayon", x: 36, y: 36 },
] as const;

export function nearestWord(word: string) {
  const origin = spaceWords.find((item) => item.word === word);
  if (!origin) {
    return null;
  }
  const ranked = spaceWords
    .filter((item) => item.word !== word)
    .map((item) => {
      const distance = Math.hypot(item.x - origin.x, item.y - origin.y);
      return { word: item.word, distance };
    })
    .sort((left, right) => left.distance - right.distance);
  const nearest = ranked[0];
  return {
    word: nearest.word,
    relation: nearest.distance < 80 ? "near" : "far",
  };
}

export function pickWord(scores: readonly { word: string; score: number }[], roll: number) {
  let total = 0;
  for (const item of scores) {
    total += item.score;
    if (roll < total) {
      return item.word;
    }
  }
  return scores[scores.length - 1].word;
}
