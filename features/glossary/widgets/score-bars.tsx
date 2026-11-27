"use client";

import { useState } from "react";
import {
  applyTemperature,
  formatScore,
  keepTopK,
  keepTopP,
  nextWords,
  pickWord,
  stepStudent,
  studentStart,
  teacherScores,
} from "./math";

type ScoreMode = "teacher" | "temperature" | "sample" | "topp" | "topk";

function Bars({
  scores,
  hidden,
  color,
}: {
  scores: readonly number[];
  hidden: readonly string[];
  color: string;
}) {
  return (
    <div className="bar-list">
      {nextWords.map((item, index) => {
        const isHidden = hidden.includes(item.word);
        return (
          <div
            className={isHidden ? "bar-row is-hidden" : "bar-row"}
            key={item.word}
            data-score-word={item.word}
            hidden={isHidden}
          >
            <span className="bar-word">{item.word}</span>
            <span className="bar-track">
              <span
                className="bar-fill"
                style={{ width: `${Math.round(Math.max(0, scores[index]) * 1000) / 10}%`, background: color }}
              />
            </span>
            <span className="bar-score">{formatScore(scores[index])}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ScoreBars({ mode, color }: { mode: ScoreMode; color: string }) {
  const [temperature, setTemperature] = useState(1);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(2);
  const [student, setStudent] = useState<number[]>([...studentStart]);
  const [picked, setPicked] = useState<string | null>(null);
  const base = nextWords.map((item) => item.score);
  const tempered = applyTemperature(base, temperature);
  const scores = mode === "temperature" ? tempered : base;
  const items = nextWords.map((item, index) => ({ word: item.word, score: scores[index] }));
  const hidden =
    mode === "topp"
      ? nextWords
          .map((item) => item.word)
          .filter((word) => !keepTopP(items, topP).some((item) => item.word === word))
      : mode === "topk"
        ? nextWords
            .map((item) => item.word)
            .filter((word) => !keepTopK(items, topK).some((item) => item.word === word))
        : [];
  const shown = nextWords.map((item) => item.word).filter((word) => !hidden.includes(word));

  return (
    <div className="widget" data-widget={mode} style={{ "--accent": color } as React.CSSProperties}>
      <p className="widget-line">The cat sat on the ___</p>
      {mode === "teacher" ? (
        <div className="score-pair">
          <div>
            <p className="widget-label">Teacher</p>
            <Bars scores={teacherScores} hidden={[]} color={color} />
          </div>
          <div>
            <p className="widget-label">Student</p>
            <Bars scores={student} hidden={[]} color={color} />
          </div>
        </div>
      ) : (
        <Bars scores={scores} hidden={hidden} color={color} />
      )}
      {mode === "temperature" ? (
        <label className="slider-label">
          Temperature
          <input
            className="slider"
            type="range"
            min={0.4}
            max={2}
            step={0.1}
            value={temperature}
            data-temperature
            aria-valuetext={temperature.toFixed(1)}
            onChange={(event) => setTemperature(Number(event.target.value))}
          />
          <span>{temperature.toFixed(1)}</span>
        </label>
      ) : null}
      {mode === "topp" ? (
        <label className="slider-label">
          Top-p
          <input
            className="slider"
            type="range"
            min={0.6}
            max={1}
            step={0.05}
            value={topP}
            data-top-p
            aria-valuetext={formatScore(topP)}
            onChange={(event) => setTopP(Number(event.target.value))}
          />
          <span>{formatScore(topP)}</span>
        </label>
      ) : null}
      {mode === "topk" ? (
        <label className="slider-label">
          Top-k
          <input
            className="slider"
            type="range"
            min={1}
            max={3}
            step={1}
            value={topK}
            data-top-k
            aria-valuetext={String(topK)}
            onChange={(event) => setTopK(Number(event.target.value))}
          />
          <span>{topK}</span>
        </label>
      ) : null}
      {mode === "topp" || mode === "topk" ? <p className="widget-note">Shown: {shown.join(", ")}.</p> : null}
      {mode === "sample" ? (
        <div className="widget-actions">
          <button
            type="button"
            className="control"
            data-pick
            onClick={() => setPicked(pickWord(items, Math.random()))}
          >
            Pick
          </button>
          <p className="picked-word" data-picked>
            {picked ? `Picked word: ${picked}` : "Pick a word."}
          </p>
        </div>
      ) : null}
      {mode === "teacher" ? (
        <div className="widget-actions">
          <button type="button" className="control" data-step onClick={() => setStudent(stepStudent(student))}>
            Step
          </button>
          <button type="button" className="control" onClick={() => setStudent([...studentStart])}>
            Start again
          </button>
        </div>
      ) : null}
    </div>
  );
}
