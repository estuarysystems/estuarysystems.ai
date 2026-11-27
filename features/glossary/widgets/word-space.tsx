"use client";

import { useState } from "react";
import { nearestWord, spaceWords } from "./math";

export function WordSpace({ color }: { color: string }) {
  const [chosen, setChosen] = useState("cat");
  const nearest = nearestWord(chosen);
  const note = nearest
    ? `${nearest.word[0].toUpperCase()}${nearest.word.slice(1)} is ${nearest.relation}.`
    : "Choose a word.";

  return (
    <div className="widget" data-widget="space" style={{ "--accent": color } as React.CSSProperties}>
      <p className="widget-note" data-space-note>
        {note}
      </p>
      <svg className="space-chart" viewBox="0 0 320 210" aria-hidden="true">
        {spaceWords.map((item) => {
          const active = item.word === chosen;
          return (
            <g key={item.word} transform={`translate(${item.x} ${item.y})`}>
              <circle cy="-10" r={active ? 10 : 7} fill={active ? color : "#fbf6ec"} stroke="#1a1612" strokeWidth="2" />
              <text textAnchor="middle" y="14" fontSize="13" fontWeight="700" fill="#1a1612">
                {item.word}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="word-picks">
        {spaceWords.map((item) => (
          <button
            key={item.word}
            type="button"
            className="control"
            aria-pressed={item.word === chosen}
            data-space-word={item.word}
            onClick={() => setChosen(item.word)}
          >
            {item.word}
          </button>
        ))}
      </div>
    </div>
  );
}
