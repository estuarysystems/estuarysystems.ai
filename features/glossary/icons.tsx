import type { ReactNode } from "react";

const ink = "#1a1612";
const paper = "#fbf6ec";

type Draw = (color: string) => ReactNode;

function S({
  color = ink,
  width = 2.2,
}: {
  color?: string;
  width?: number;
} = {}) {
  return {
    stroke: color,
    strokeWidth: width,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };
}

const iconDraw: Record<string, Draw> = {
  "artificial-intelligence": (color) => (
    <>
      <rect x="8" y="8" width="32" height="28" rx="8" fill={color} stroke={ink} strokeWidth="2.2" />
      <circle cx="18" cy="20" r="2.2" fill={paper} />
      <circle cx="30" cy="20" r="2.2" fill={paper} />
      <path d="M18 28c2.2 2.4 9.8 2.4 12 0" {...S({ color: paper, width: 2.4 })} />
    </>
  ),
  model: (color) => (
    <>
      <rect x="6" y="7" width="36" height="24" rx="3" fill={color} stroke={ink} strokeWidth="2.2" />
      <rect x="10" y="11" width="28" height="16" rx="1.5" fill="#241c18" />
      <rect x="13" y="14" width="10" height="6" rx="1" fill={paper} />
      <path d="M24 31v5M16 38h16" {...S()} />
    </>
  ),
  data: (color) => (
    <>
      <rect x="10" y="8" width="28" height="8" rx="2" fill={color} stroke={ink} strokeWidth="2.2" />
      <rect x="10" y="20" width="28" height="8" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <rect x="10" y="32" width="28" height="8" rx="2" fill={color} stroke={ink} strokeWidth="2.2" />
    </>
  ),
  dataset: (color) => (
    <>
      <path d="M8 18h32v20H8z" fill={color} stroke={ink} strokeWidth="2.2" />
      <rect x="14" y="8" width="10" height="12" rx="1" fill={paper} stroke={ink} strokeWidth="2" />
      <rect x="24" y="6" width="10" height="14" rx="1" fill="#f0c14a" stroke={ink} strokeWidth="2" />
      <circle cx="29" cy="11" r="1.4" fill={ink} />
      <path d="M16 16l2.2-2 2 2 2.4-3" {...S({ width: 1.6 })} />
    </>
  ),
  example: (color) => (
    <>
      <rect x="12" y="8" width="24" height="30" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="20" cy="16" r="2" fill={color} />
      <path d="M16 30l6-7 4 4 3-3 3 6H16z" fill={color} stroke={ink} strokeWidth="1.6" />
    </>
  ),
  label: (color) => (
    <>
      <path d="M8 16h20l12 8-12 8H8z" fill={color} stroke={ink} strokeWidth="2.2" />
      <circle cx="16" cy="24" r="2.4" fill={paper} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  pattern: (color) => (
    <>
      <circle cx="10" cy="24" r="5" fill={color} stroke={ink} strokeWidth="2" />
      <rect x="19" y="19" width="10" height="10" rx="1" fill={paper} stroke={ink} strokeWidth="2" />
      <path d="M36 18l6 12h-12z" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  token: () => (
    <>
      <circle cx="24" cy="24" r="15" fill="#f0c14a" stroke={ink} strokeWidth="2.2" />
      <circle cx="24" cy="24" r="10.5" fill="none" stroke="#b8862a" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#b8862a" />
      <path d="M16 16c2.4-2.2 6.2-2.6 9-.4" {...S({ color: "#fff4cc", width: 2 })} />
    </>
  ),
  prompt: (color) => (
    <>
      <rect x="7" y="8" width="34" height="24" rx="6" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M16 32l-2 8 10-8" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M14 16h16M14 22h10" {...S({ color: paper })} />
    </>
  ),
  input: (color) => (
    <>
      <rect x="20" y="10" width="20" height="28" rx="3" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M6 24h12M12 18l6 6-6 6" {...S({ color })} />
    </>
  ),
  output: (color) => (
    <>
      <rect x="8" y="10" width="20" height="28" rx="3" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M30 24h10M34 18l6 6-6 6" {...S()} />
    </>
  ),
  training: (color) => (
    <>
      <rect x="8" y="12" width="20" height="24" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M12 20h12M12 26h8" {...S({ width: 1.8 })} />
      <path d="M28 28l10-14 3 2-10 14-4 1z" fill={color} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  loss: (color) => (
    <>
      <circle cx="22" cy="24" r="14" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="22" cy="24" r="8" fill={color} stroke={ink} strokeWidth="2" />
      <circle cx="22" cy="24" r="3" fill={paper} />
      <path d="M34 10l-6 10M36 8l2 4" {...S({ color: "#e15b4a", width: 2.4 })} />
    </>
  ),
  "gradient-descent": (color) => (
    <>
      <path d="M6 34c8-16 12-18 18-18s8 10 18 4" {...S()} />
      <circle cx="16" cy="20" r="5" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  "learning-rate": (color) => (
    <>
      <path d="M8 36h8l4-8h8l6-14h8" {...S()} />
      <circle cx="16" cy="30" r="3" fill={color} stroke={ink} strokeWidth="1.8" />
      <circle cx="36" cy="12" r="3.4" fill={color} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  epoch: (color) => (
    <>
      <path d="M14 10h16a2 2 0 0 1 2 2v24H16a4 4 0 0 0-4 4V14a4 4 0 0 1 4-4z" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M16 10v26" {...S()} />
      <path d="M30 30a8 8 0 1 0-2-4" {...S({ color })} />
      <path d="M28 22l4 2-1 4" {...S({ color })} />
    </>
  ),
  batch: (color) => (
    <>
      <rect x="8" y="14" width="14" height="18" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      <rect x="17" y="10" width="14" height="18" rx="2" fill={color} stroke={ink} strokeWidth="2" />
      <rect x="26" y="16" width="14" height="18" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
    </>
  ),
  weight: (color) => (
    <>
      <circle cx="24" cy="24" r="12" fill={color} stroke={ink} strokeWidth="2.2" />
      <circle cx="24" cy="24" r="4" fill={paper} stroke={ink} strokeWidth="2" />
      <path d="M24 8v6" {...S()} />
    </>
  ),
  overfitting: (color) => (
    <>
      <path d="M8 28c2-10 8-14 16-14 6 0 8 4 10 4 4 0 6 6 6 8H8z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M14 28v6h20v-6" {...S()} />
    </>
  ),
  validation: (color) => (
    <>
      <rect x="10" y="8" width="28" height="32" rx="3" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M16 24l6 6 12-14" {...S({ color, width: 3 })} />
    </>
  ),
  "fine-tuning": (color) => (
    <>
      <circle cx="16" cy="30" r="6" fill={color} stroke={ink} strokeWidth="2" />
      <path d="M20 26l16-16 4 4L24 30" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M32 10l4 4" {...S()} />
    </>
  ),
  distillation: (color) => (
    <>
      <path d="M10 10h16l-2 10a6 6 0 0 1-12 0z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M28 26h12l-1.4 8a4 4 0 0 1-9.2 0z" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M24 20c4 2 4 4 6 6" {...S()} />
    </>
  ),
  "neural-network": (color) => (
    <>
      <circle cx="10" cy="14" r="3.2" fill={color} stroke={ink} strokeWidth="1.8" />
      <circle cx="10" cy="34" r="3.2" fill={color} stroke={ink} strokeWidth="1.8" />
      <circle cx="24" cy="24" r="3.2" fill={paper} stroke={ink} strokeWidth="1.8" />
      <circle cx="38" cy="16" r="3.2" fill={color} stroke={ink} strokeWidth="1.8" />
      <circle cx="38" cy="32" r="3.2" fill={color} stroke={ink} strokeWidth="1.8" />
      <path d="M13 15l8 7M13 33l8-7M27 23l8-6M27 25l8 6" {...S({ width: 1.6 })} />
    </>
  ),
  layer: (color) => (
    <>
      <path d="M8 14l16-6 16 6-16 6z" fill={color} stroke={ink} strokeWidth="2" />
      <path d="M8 24l16-6 16 6-16 6z" fill={paper} stroke={ink} strokeWidth="2" />
      <path d="M8 34l16-6 16 6-16 6z" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  neuron: (color) => (
    <>
      <circle cx="28" cy="24" r="8" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M6 14h12M6 24h14M6 34h12" {...S()} />
    </>
  ),
  embedding: (color) => (
    <>
      <circle cx="16" cy="26" r="5" fill={color} stroke={ink} strokeWidth="2" />
      <circle cx="26" cy="18" r="4" fill={color} stroke={ink} strokeWidth="2" />
      <circle cx="38" cy="34" r="4" fill={paper} stroke={ink} strokeWidth="2" />
    </>
  ),
  vector: (color) => (
    <>
      <path d="M8 36L34 12" {...S({ color, width: 3 })} />
      <path d="M26 10h12v12" {...S({ width: 3 })} />
    </>
  ),
  transformer: (color) => (
    <>
      <rect x="6" y="16" width="10" height="16" rx="2" fill={color} stroke={ink} strokeWidth="2" />
      <rect x="19" y="16" width="10" height="16" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      <rect x="32" y="16" width="10" height="16" rx="2" fill={color} stroke={ink} strokeWidth="2" />
      <path d="M16 24h3M29 24h3" {...S()} />
    </>
  ),
  attention: (color) => (
    <>
      <path d="M6 24c6-8 10-10 18-10s12 2 18 10c-6 8-10 10-18 10S12 32 6 24z" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="24" cy="24" r="5" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  "large-language-model": (color) => (
    <>
      <path d="M10 12h22a4 4 0 0 1 4 4v22H16a6 6 0 0 0-6 6V12z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M16 12v26" {...S()} />
      <path d="M20 20h10M20 26h8" {...S({ color: paper })} />
    </>
  ),
  weights: (color) => (
    <>
      <circle cx="12" cy="24" r="6" fill={color} stroke={ink} strokeWidth="2" />
      <circle cx="24" cy="24" r="6" fill={paper} stroke={ink} strokeWidth="2" />
      <circle cx="36" cy="24" r="6" fill={color} stroke={ink} strokeWidth="2" />
      <path d="M12 14v4M24 14v4M36 14v4" {...S({ width: 1.8 })} />
    </>
  ),
  gpu: (color) => (
    <>
      <rect x="12" y="12" width="24" height="24" rx="3" fill={color} stroke={ink} strokeWidth="2.2" />
      <rect x="18" y="18" width="12" height="12" rx="1" fill={paper} stroke={ink} strokeWidth="1.8" />
      <path d="M16 8v4M24 8v4M32 8v4M16 36v4M24 36v4M32 36v4M8 16h4M8 24h4M8 32h4M36 16h4M36 24h4M36 32h4" {...S({ width: 1.8 })} />
    </>
  ),
  inference: (color) => (
    <>
      <rect x="6" y="12" width="16" height="22" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      <path d="M10 20h8M10 26h5" {...S({ width: 1.6 })} />
      <path d="M24 23h8" {...S({ color })} />
      <path d="M30 18l6 5-6 5" {...S({ color })} />
      <circle cx="40" cy="23" r="5" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  generation: (color) => (
    <>
      <path d="M8 36h20" {...S()} />
      <path d="M10 30h14" {...S({ width: 1.8 })} />
      <path d="M26 30l12-18 4 3-12 18-5 1z" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  "context-window": (color) => (
    <>
      <path d="M8 30c2 8 8 12 16 12s14-4 16-12" {...S()} />
      <path d="M14 30c0 6 4 8 10 8s10-2 10-8" fill={paper} stroke={ink} strokeWidth="2" />
      <rect x="14" y="10" width="4" height="18" rx="1" fill="#e15b4a" stroke={ink} strokeWidth="1.4" />
      <rect x="20" y="8" width="4" height="20" rx="1" fill={color} stroke={ink} strokeWidth="1.4" />
      <rect x="26" y="12" width="4" height="16" rx="1" fill="#f0c14a" stroke={ink} strokeWidth="1.4" />
      <rect x="32" y="14" width="4" height="14" rx="1" fill="#3d7ec9" stroke={ink} strokeWidth="1.4" />
    </>
  ),
  temperature: (color) => (
    <>
      <rect x="20" y="6" width="8" height="24" rx="4" fill={paper} stroke={ink} strokeWidth="2.2" />
      <rect x="22" y="16" width="4" height="12" rx="2" fill={color} />
      <circle cx="24" cy="34" r="7" fill={color} stroke={ink} strokeWidth="2.2" />
    </>
  ),
  sampling: (color) => (
    <>
      <rect x="10" y="10" width="28" height="28" rx="4" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="18" cy="18" r="2.2" fill={color} />
      <circle cx="30" cy="20" r="2.2" fill={ink} />
      <circle cx="20" cy="30" r="2.2" fill={ink} />
      <circle cx="31" cy="30" r="2.2" fill={color} />
    </>
  ),
  "top-p": (color) => (
    <>
      <path d="M10 36V14M18 36V22M26 36V28" {...S({ color, width: 4 })} />
      <path d="M34 36v-2" {...S({ width: 4 })} />
      <path d="M6 20h36" {...S({ width: 1.6 })} />
    </>
  ),
  "top-k": (color) => (
    <>
      <rect x="8" y="16" width="8" height="20" rx="1" fill={color} stroke={ink} strokeWidth="1.8" />
      <rect x="20" y="22" width="8" height="14" rx="1" fill={color} stroke={ink} strokeWidth="1.8" />
      <rect x="32" y="30" width="8" height="6" rx="1" fill={paper} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  "system-prompt": (color) => (
    <>
      <rect x="10" y="12" width="28" height="26" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M16 22h16M16 28h10" {...S({ width: 1.8 })} />
      <circle cx="24" cy="10" r="4" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  retrieval: (color) => (
    <>
      <rect x="6" y="10" width="20" height="26" rx="2" fill={paper} stroke={ink} strokeWidth="2" />
      <circle cx="30" cy="28" r="8" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M36 34l6 6" {...S({ width: 2.6 })} />
    </>
  ),
  "tool-use": (color) => (
    <>
      <path d="M10 34l16-16 4 4L14 38z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M28 12l8 8-4 2-8-8z" fill={paper} stroke={ink} strokeWidth="2" />
    </>
  ),
  chat: (color) => (
    <>
      <rect x="6" y="8" width="24" height="16" rx="4" fill={color} stroke={ink} strokeWidth="2" />
      <rect x="18" y="22" width="24" height="16" rx="4" fill={paper} stroke={ink} strokeWidth="2" />
    </>
  ),
  hallucination: (color) => (
    <>
      <path d="M12 30a8 8 0 0 1 2-14 8 8 0 0 1 15-2 7 7 0 0 1 7 8 6 6 0 0 1-4 10z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M22 18v8" {...S({ color: paper, width: 2.4 })} />
      <circle cx="22" cy="30" r="1.4" fill={paper} />
    </>
  ),
  bias: (color) => (
    <>
      <path d="M8 20h32" {...S()} />
      <path d="M24 20v14" {...S()} />
      <path d="M16 34h16" {...S()} />
      <path d="M8 20l8 6H8z" fill={color} stroke={ink} strokeWidth="1.8" />
      <path d="M40 20l-4-8h8z" fill={paper} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  guardrails: (color) => (
    <>
      <path d="M8 38h32" {...S({ width: 2 })} />
      <path d="M12 38V14M24 38V14M36 38V14" {...S()} />
      <path d="M12 20h24M12 28h24" {...S({ color })} />
    </>
  ),
  privacy: (color) => (
    <>
      <rect x="12" y="20" width="24" height="18" rx="3" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M17 20v-4a7 7 0 0 1 14 0v4" {...S()} />
      <circle cx="24" cy="29" r="2" fill={paper} />
    </>
  ),
  "prompt-injection": (color) => (
    <>
      <path d="M8 14h22v24H12a4 4 0 0 1-4-4z" fill={paper} stroke={ink} strokeWidth="2.2" />
      <path d="M22 10l16 6-8 18-6-2" fill={color} stroke={ink} strokeWidth="2" />
    </>
  ),
  refusal: (color) => (
    <>
      <path d="M16 6h16l10 10v16l-10 10H16L6 32V16z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M18 18l12 12M30 18L18 30" {...S({ color: paper, width: 2.6 })} />
    </>
  ),
  confidence: (color) => (
    <>
      <path d="M8 34a16 16 0 0 1 32 0" {...S()} />
      <path d="M24 34l10-12" {...S({ color, width: 3 })} />
      <circle cx="24" cy="34" r="3" fill={color} stroke={ink} strokeWidth="1.8" />
    </>
  ),
  copyright: (color) => (
    <>
      <rect x="10" y="8" width="28" height="32" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="24" cy="24" r="7" fill={color} stroke={ink} strokeWidth="1.8" />
      <path d="M26 20a4 4 0 1 0 0 8" {...S({ color: paper, width: 1.8 })} />
    </>
  ),
  alignment: (color) => (
    <>
      <path d="M8 16h22" {...S({ color, width: 3 })} />
      <path d="M24 10l8 6-8 6" {...S({ color, width: 3 })} />
      <path d="M8 32h22" {...S({ width: 3 })} />
      <path d="M24 26l8 6-8 6" {...S({ width: 3 })} />
    </>
  ),
  limit: (color) => (
    <>
      <path d="M8 36h18" {...S()} />
      <path d="M30 12v26M38 12v26" {...S()} />
      <path d="M30 18h8M30 26h8" {...S({ color })} />
      <circle cx="16" cy="30" r="3" fill={color} stroke={ink} strokeWidth="1.6" />
    </>
  ),

  slop: (color) => (
    <>
      <rect x="10" y="16" width="22" height="18" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" />
      <rect x="14" y="12" width="22" height="18" rx="2" fill={color} stroke={ink} strokeWidth="2.2" />
      <rect x="18" y="10" width="20" height="16" rx="2" fill={paper} stroke={ink} strokeWidth="2.2" transform="rotate(8 28 18)" />
      <path d="M22 18h10M22 23h8" {...S({ width: 1.6 })} />
    </>
  ),
  "paperclip-maximizer": (color) => (
    <>
      <path
        d="M18 28V16a6 6 0 0 1 12 0v16a8 8 0 0 1-16 0V18a4 4 0 0 1 8 0v12"
        stroke={color}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M18 28V16a6 6 0 0 1 12 0v16a8 8 0 0 1-16 0V18a4 4 0 0 1 8 0v12"
        stroke={ink}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  shoggoth: (color) => (
    <>
      <path
        d="M9 28c1-10 9-16 18-14 5 1 10 5 12 11 3 2 3 8-2 10-3 7-22 8-27 1-2-3-3-5-1-8z"
        fill={color}
        stroke={ink}
        strokeWidth="2.2"
      />
      <circle cx="22" cy="24" r="3.4" fill={paper} stroke={ink} strokeWidth="1.6" />
      <circle cx="31" cy="24" r="3.4" fill={paper} stroke={ink} strokeWidth="1.6" />
      <circle cx="22.4" cy="24.4" r="1.1" fill={ink} />
      <circle cx="31.4" cy="24.4" r="1.1" fill={ink} />
      <path d="M23 31c2.2 2 7.2 2 9 0" {...S({ color: paper, width: 2.2 })} />
    </>
  ),
  foom: (color) => (
    <>
      <path d="M10 36c6-4 8-14 10-22 2 6 3 10 6 14 2-8 6-16 12-20-2 10-2 18 0 28H10z" fill={color} stroke={ink} strokeWidth="2.2" />
      <path d="M24 20l3-8 1 7 6-3-4 6" fill={paper} stroke={ink} strokeWidth="1.6" />
    </>
  ),
  "rokos-basilisk": (color) => (
    <>
      <path d="M6 24c6-10 12-14 18-14s12 4 18 14c-6 10-12 14-18 14S12 34 6 24z" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="24" cy="24" r="7" fill={color} stroke={ink} strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill={ink} />
    </>
  ),
  "sharp-left-turn": (color) => (
    <>
      <path d="M10 36h16c2 0 4-2 4-4V16" {...S({ width: 3 })} />
      <path d="M24 10l6 6-6 6" {...S({ color, width: 3 })} />
      <circle cx="30" cy="16" r="3" fill={color} stroke={ink} strokeWidth="1.6" />
    </>
  ),
};


const iconAlias: Record<string, string> = {
  "model": "model",
  "token": "token",
  "parameter": "weights",
  "weight": "weight",
  "dataset": "dataset",
  "label": "label",
  "vector": "vector",
  "embedding": "embedding",
  "utility": "model",
  "usage": "model",
  "ai": "artificial-intelligence",
  "machine-learning": "artificial-intelligence",
  "deep-learning": "artificial-intelligence",
  "language-model": "large-language-model",
  "tokenizer": "token",
  "tokenization": "token",
  "vocabulary": "token",
  "probability": "confidence",
  "feature": "pattern",
  "hyperparameter": "weights",
  "accuracy": "validation",
  "ground-truth": "label",
  "corpus": "dataset",
  "open-source-model": "model",
  "cosine-similarity": "retrieval",
  "train": "training",
  "training": "training",
  "loss": "loss",
  "gradient-descent": "gradient-descent",
  "learning-rate": "learning-rate",
  "epoch": "epoch",
  "overfitting": "overfitting",
  "fine-tuning": "fine-tuning",
  "distillation": "distillation",
  "supervised-learning": "training",
  "unsupervised-learning": "training",
  "reinforcement-learning": "training",
  "reward": "training",
  "rlhf": "alignment",
  "backpropagation": "gradient-descent",
  "gradient": "gradient-descent",
  "optimizer": "gradient-descent",
  "adam": "gradient-descent",
  "learning-rate-schedule": "learning-rate",
  "warmup": "learning-rate",
  "weight-decay": "learning-rate",
  "dropout": "overfitting",
  "regularization": "overfitting",
  "underfitting": "overfitting",
  "pretraining": "training",
  "sft": "alignment",
  "instruction-tuning": "prompt",
  "dpo": "alignment",
  "reward-model": "alignment",
  "ppo": "alignment",
  "constitutional-ai": "alignment",
  "curriculum-learning": "training",
  "synthetic-data": "dataset",
  "data-contamination": "dataset",
  "batch": "batch",
  "training-set": "training",
  "validation-set": "validation",
  "test-set": "validation",
  "generalization": "overfitting",
  "transfer-learning": "model",
  "self-supervised-learning": "training",
  "few-shot-learning": "prompt",
  "zero-shot": "prompt",
  "in-context-learning": "prompt",
  "catastrophic-forgetting": "model",
  "checkpoint": "weights",
  "data-augmentation": "dataset",
  "reward-hacking": "training",
  "lora": "fine-tuning",
  "qlora": "fine-tuning",
  "peft": "fine-tuning",
  "preference-data": "alignment",
  "data-poisoning": "dataset",
  "distributed-training": "training",
  "neural-network": "neural-network",
  "layer": "layer",
  "activation": "neuron",
  "bias-number": "bias",
  "bias-unfair": "artificial-intelligence",
  "attention": "attention",
  "transformer": "transformer",
  "large-language-model": "large-language-model",
  "multimodal": "example",
  "diffusion-model": "model",
  "classification": "model",
  "regression": "model",
  "quantization": "gpu",
  "self-attention": "attention",
  "multi-head-attention": "attention",
  "positional-encoding": "context-window",
  "rope": "retrieval",
  "layer-normalization": "layer",
  "residual-connection": "layer",
  "softmax": "neuron",
  "logits": "output",
  "moe": "model",
  "sparse-model": "model",
  "dense-model": "model",
  "query-key-and-value": "attention",
  "causal-attention": "attention",
  "cross-attention": "attention",
  "gqa": "attention",
  "cnn": "neural-network",
  "rnn": "neural-network",
  "vision-transformer": "transformer",
  "clip": "example",
  "vae": "transformer",
  "gan": "guardrails",
  "autoencoder": "transformer",
  "latent-space": "vector",
  "bpe": "token",
  "encoder": "transformer",
  "decoder": "inference",
  "foundation-model": "transformer",
  "base-model": "model",
  "instruction-tuned-model": "prompt",
  "architecture": "model",
  "hidden-state": "model",
  "autoregressive": "model",
  "pruning": "model",
  "flops": "model",
  "scaling-laws": "model",
  "compute-optimal-training": "training",
  "flash-attention": "attention",
  "vision-language-model": "large-language-model",
  "inference": "inference",
  "prompt": "prompt",
  "system-prompt": "system-prompt",
  "context-window": "context-window",
  "temperature": "temperature",
  "sampling": "sampling",
  "top-p": "top-p",
  "latency": "model",
  "gpu": "gpu",
  "agent": "tool-use",
  "tool-use": "tool-use",
  "rag": "retrieval",
  "benchmark": "validation",
  "beam-search": "generation",
  "greedy-decoding": "generation",
  "top-k": "top-k",
  "structured-output": "gpu",
  "function-calling": "tool-use",
  "react": "tool-use",
  "chain-of-thought": "prompt",
  "reasoning-model": "model",
  "test-time-compute": "model",
  "vector-database": "retrieval",
  "reranking": "model",
  "chunking": "retrieval",
  "mcp": "tool-use",
  "next-token-prediction": "output",
  "prompt-engineering": "prompt",
  "retrieval": "retrieval",
  "semantic-search": "model",
  "streaming": "model",
  "time-to-first-token": "model",
  "kv-cache": "inference",
  "speculative-decoding": "inference",
  "batching": "batch",
  "constrained-decoding": "generation",
  "best-of-n": "model",
  "self-consistency": "model",
  "grounding": "model",
  "multi-agent-system": "tool-use",
  "long-context": "context-window",
  "throughput": "model",
  "evals": "validation",
  "perplexity": "loss",
  "bleu": "validation",
  "api": "tool-use",
  "chatbot": "chat",
  "text-to-image": "example",
  "speech-to-text": "example",
  "text-to-speech": "example",
  "hallucination": "hallucination",
  "alignment": "alignment",
  "guardrails": "guardrails",
  "red-teaming": "guardrails",
  "jailbreak": "guardrails",
  "prompt-injection": "prompt-injection",
  "interpretability": "model",
  "mechanistic-interpretability": "model",
  "sparse-autoencoder": "transformer",
  "superposition": "context-window",
  "calibration": "confidence",
  "robustness": "model",
  "sycophancy": "model",
  "watermarking": "privacy",
  "pii": "privacy",
  "refusal": "refusal",
  "memorization": "privacy",
  "agi": "artificial-intelligence",
  "superintelligence": "artificial-intelligence",
  "turing-test": "chat",
  "technological-singularity": "learning-rate",
  "ai-winter": "epoch",
  "moores-law": "gpu",
  "slop": "slop",
  "vibe-coding": "prompt",
  "ai-safety": "guardrails",
  "deepfake": "example",
  "ai-effect": "pattern",
  "eliza-effect": "chat",
  "p-doom": "confidence",
  "doomer": "confidence",
  "accelerationism": "learning-rate",
  "e-acc": "learning-rate",
  "decel": "limit",
  "effective-altruism": "confidence",
  "longtermism": "epoch",
  "x-risk": "refusal",
  "asi": "artificial-intelligence",
  "paperclip-maximizer": "paperclip-maximizer",
  "alignment-problem": "alignment",
  "control-problem": "guardrails",
  "stochastic-parrot": "chat",
  "chinese-room": "example",
  "bitter-lesson": "training",
  "scaling-hypothesis": "weights",
  "ai-ethics": "bias",
  "pause-ai": "limit",
  "shoggoth": "shoggoth",
  "intelligence-explosion": "foom",
  "ai-arms-race": "learning-rate",
  "goodharts-law": "validation",
  "d-acc": "guardrails",
  "superalignment": "alignment",
  "foom": "foom",
  "hard-takeoff": "foom",
  "soft-takeoff": "gradient-descent",
  "orthogonality-thesis": "vector",
  "instrumental-convergence": "tool-use",
  "rokos-basilisk": "rokos-basilisk",
  "waluigi-effect": "bias",
  "compute-governance": "gpu",
  "overton-window": "context-window",
  "inner-alignment": "alignment",
  "outer-alignment": "alignment",
  "mesa-optimization": "layer",
  "deceptive-alignment": "hallucination",
  "treacherous-turn": "sharp-left-turn",
  "sharp-left-turn": "sharp-left-turn",
  "corrigibility": "guardrails",
  "ai-boxing": "privacy",
  "cev": "confidence",
  "s-risk": "refusal",
  "infohazard": "limit",
  "recursive-self-improvement": "neural-network",
  "specification-gaming": "validation",
  "goal-misgeneralization": "overfitting",
  "tescreal": "pattern",
  "situational-awareness": "attention",
};

export function iconKeyFor(slug: string) {
  const key = iconAlias[slug] ?? slug;
  return iconDraw[key] ? key : undefined;
}

export function TermIcon({ slug, color }: { slug: string; color: string }) {
  const key = iconKeyFor(slug);
  const draw = key ? iconDraw[key] : undefined;
  return (
    <svg className="term-icon" viewBox="0 0 48 48" aria-hidden="true">
      {draw ? draw(color) : <circle cx="24" cy="24" r="10" fill={color} />}
    </svg>
  );
}

