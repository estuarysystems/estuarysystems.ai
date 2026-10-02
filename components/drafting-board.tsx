const MAJOR_EVERY = 3;
const TICK = 46;
const TICK_COUNT = 16;

function edgeTicks(axis: "x" | "y") {
  return Array.from({ length: TICK_COUNT }, (_, index) => {
    const at = 36 + index * TICK;
    const major = index % MAJOR_EVERY === 0;
    const label = `${index * 15}°`;
    if (axis === "x") {
      return (
        <g key={`x-${index}`}>
          <line
            x1={at}
            y1={0}
            x2={at}
            y2={major ? 16 : 8}
            stroke="currentColor"
            strokeWidth={major ? 1 : 0.6}
          />
          {major ? (
            <text x={at + 4} y={28} fill="currentColor" fontSize="9">
              {label}
            </text>
          ) : null}
        </g>
      );
    }
    return (
      <g key={`y-${index}`}>
        <line
          x1={0}
          y1={at}
          x2={major ? 16 : 8}
          y2={at}
          stroke="currentColor"
          strokeWidth={major ? 1 : 0.6}
        />
        {major ? (
          <text x={20} y={at + 3} fill="currentColor" fontSize="9">
            {label}
          </text>
        ) : null}
      </g>
    );
  });
}

export function DraftingBoard() {
  return (
    <div className="drafting-board" aria-hidden="true">
      <svg
        className="drafting-board-sheet"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMinYMin meet"
      >
        <g className="drafting-board-ticks">{edgeTicks("x")}</g>
        <g className="drafting-board-ticks">{edgeTicks("y")}</g>
      </svg>
      <svg className="drafting-board-arc" viewBox="0 0 220 220">
        <circle cx="188" cy="28" r="108" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="188" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="28" x2="220" y2="28" stroke="currentColor" strokeWidth="0.6" />
        <line x1="188" y1="0" x2="188" y2="156" stroke="currentColor" strokeWidth="0.6" />
        <line x1="188" y1="28" x2="112" y2="104" stroke="var(--signal)" strokeWidth="1.25" />
        <circle cx="112" cy="104" r="3.5" fill="var(--signal)" />
        <text x="96" y="128" fill="currentColor" fontSize="11">
          y = ax + b
        </text>
      </svg>
    </div>
  );
}
