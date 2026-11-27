"use client";

import { useState } from "react";
import { hillLoss, nextHillPosition } from "./math";

const start = -0.9;

function point(position: number) {
  return {
    x: 160 + position * 105,
    y: 156 - position * position * 72,
  };
}

export function Hill({
  slug,
  color,
}: {
  slug: "loss" | "gradient-descent" | "learning-rate";
  color: string;
}) {
  const [position, setPosition] = useState(start);
  const [stepSize, setStepSize] = useState(slug === "learning-rate" ? 0.8 : 0.25);
  const ball = point(position);
  const loss = hillLoss(position);
  const caption =
    slug === "loss"
      ? "The height of the ball is the loss."
      : slug === "learning-rate"
        ? "The step size changes the move."
        : "Each step moves the ball down.";
  const status = loss < 0.01 ? "The ball is at the bottom." : caption;
  const curve = Array.from({ length: 41 }, (_, index) => {
    const t = -1.2 + (index / 40) * 2.4;
    const spot = point(t);
    return `${spot.x},${spot.y}`;
  }).join(" ");

  return (
    <div className="widget" data-widget="hill" style={{ "--accent": color } as React.CSSProperties}>
      <p className="widget-note">{status}</p>
      <svg className="hill-chart" viewBox="0 0 320 180" aria-hidden="true">
        <polygon points={`16,172 ${curve} 304,172`} fill="#f7efe0" stroke="#1a1612" strokeWidth="2" />
        <polyline points={curve} fill="none" stroke="#1a1612" strokeWidth="2.5" />
        <circle className="hill-ball" r="11" cx={ball.x} cy={ball.y} fill={color} stroke="#1a1612" strokeWidth="2" />
      </svg>
      <p className="widget-label">
        Loss <span data-loss>{loss.toFixed(2)}</span>
      </p>
      <label className="slider-label">
        Step size
        <input
          className="slider"
          type="range"
          min={0.05}
          max={1.2}
          step={0.05}
          value={stepSize}
          data-step-size
          aria-valuetext={stepSize.toFixed(2)}
          onChange={(event) => setStepSize(Number(event.target.value))}
        />
        <span>{stepSize.toFixed(2)}</span>
      </label>
      <div className="widget-actions">
        <button
          type="button"
          className="control"
          data-step
          onClick={() => setPosition(nextHillPosition(position, stepSize))}
        >
          Step
        </button>
        <button type="button" className="control" onClick={() => setPosition(start)}>
          Start again
        </button>
      </div>
    </div>
  );
}
