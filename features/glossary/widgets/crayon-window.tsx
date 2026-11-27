"use client";

import { useState } from "react";

const palette = [
  { name: "red", color: "#e15b4a" },
  { name: "blue", color: "#3d7ec9" },
  { name: "green", color: "#3e9a62" },
  { name: "yellow", color: "#f0c14a" },
  { name: "orange", color: "#ef8a32" },
  { name: "purple", color: "#7d5bb5" },
];

export function CrayonWindow({ color }: { color: string }) {
  const [crayons, setCrayons] = useState(["red", "blue", "green", "yellow"]);
  const [note, setNote] = useState("The hand holds 4 crayons.");
  const [chosen, setChosen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function addCrayon(button: HTMLButtonElement) {
    if (busy) {
      return;
    }
    const oldest = button.closest("[data-widget]")?.querySelector("[data-oldest='true']");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => {
      setCrayons((current) => {
        const last = current[current.length - 1];
        const index = palette.findIndex((item) => item.name === last);
        const next = palette[(index + 1) % palette.length].name;
        return [...current.slice(1), next];
      });
      setNote("The oldest crayon leaves.");
      setChosen(null);
      setBusy(false);
    };
    if (oldest instanceof HTMLElement && !reduced) {
      setBusy(true);
      oldest.animate(
        [
          { transform: "translateY(0)", opacity: 1 },
          { transform: "translateY(36px)", opacity: 0 },
        ],
        { duration: 260, easing: "ease-in" },
      ).finished.then(apply, apply);
      return;
    }
    apply();
  }

  return (
    <div className="widget" data-widget="window" style={{ "--accent": color } as React.CSSProperties}>
      <p className="widget-note" data-crayon-note>
        {chosen ? `This crayon is ${chosen}.` : note}
      </p>
      <div className="crayon-stage">
        <div className="crayon-row">
          {crayons.map((name, index) => {
            const swatch = palette.find((item) => item.name === name);
            return (
              <button
                key={`${name}-${index}`}
                type="button"
                className="crayon"
                data-oldest={index === 0 ? "true" : "false"}
                style={{ background: swatch?.color ?? color }}
                aria-pressed={chosen === name}
                onClick={() => setChosen(name)}
              >
                <span className="crayon-name">{name}</span>
              </button>
            );
          })}
        </div>
        <div className="crayon-palm" aria-hidden="true" />
      </div>
      <div className="widget-actions">
        <button type="button" className="control" data-add-crayon onClick={(event) => addCrayon(event.currentTarget)}>
          Add
        </button>
      </div>
    </div>
  );
}
