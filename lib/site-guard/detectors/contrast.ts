import type { Detector, Flag } from "../types";
import { allPagesHtml } from "../html";
import { makeFlag } from "../wording";

type Rgb = { r: number; g: number; b: number };

const NAMED: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  gray: "#808080",
  grey: "#808080",
  silver: "#c0c0c0",
  navy: "#000080",
  blue: "#0000ff",
};

function parseColor(value: string | undefined): Rgb | null {
  if (!value) return null;
  const raw = value.trim().toLowerCase();
  if (raw === "transparent" || raw === "inherit" || raw === "currentcolor") return null;
  const hex = NAMED[raw] || raw;
  const short = hex.match(/^#([0-9a-f]{3})$/i);
  if (short) {
    const [r, g, b] = short[1].split("").map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }
  const long = hex.match(/^#([0-9a-f]{6})$/i);
  if (long) {
    return {
      r: parseInt(long[1].slice(0, 2), 16),
      g: parseInt(long[1].slice(2, 4), 16),
      b: parseInt(long[1].slice(4, 6), 16),
    };
  }
  const rgb = raw.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgb) {
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
  }
  return null;
}

function luminance({ r, g, b }: Rgb): number {
  const toLin = (c: number) => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function declarations(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of block.split(";")) {
    const [prop, ...rest] = part.split(":");
    if (!prop || rest.length === 0) continue;
    out[prop.trim().toLowerCase()] = rest.join(":").trim();
  }
  return out;
}

function backgroundColor(style: Record<string, string>): string | undefined {
  if (style["background-color"]) return style["background-color"];
  const bg = style.background;
  if (!bg) return undefined;
  const color = bg.split(",")[0]?.trim().split(/\s+/)[0];
  return color;
}

export const detectContrast: Detector = (result) => {
  const flags: Flag[] = [];
  for (const { html } of allPagesHtml(result.pages)) {
    const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);
    for (const css of styleBlocks) {
      const rules = css.matchAll(/([^{}]+)\{([^{}]+)\}/g);
      for (const rule of rules) {
        if (flags.length >= 6) break;
        const selector = rule[1].trim();
        if (/:disabled|\bdisabled\b/i.test(selector)) continue;
        const style = declarations(rule[2]);
        const fg = parseColor(style.color);
        const bg = parseColor(backgroundColor(style));
        if (!fg || !bg) continue;
        const ratio = contrastRatio(fg, bg);
        const large = /h1|h2|\.title|\.hero|18px|1\.125rem|bold/.test(selector);
        const min = large ? 3 : 4.5;
        if (ratio + 1e-6 < min) {
          flags.push(
            makeFlag(
              "contrast",
              `computed contrast — human check: ${selector.slice(0, 80)} ${style.color} on ${backgroundColor(style)} (${ratio.toFixed(2)}:1)`,
            ),
          );
        }
      }
    }

    const inlines = html.matchAll(/style=["']([^"']+)["']/gi);
    for (const match of inlines) {
      if (flags.length >= 8) break;
      const style = declarations(match[1]);
      const fg = parseColor(style.color);
      const bg = parseColor(backgroundColor(style));
      if (!fg || !bg) continue;
      const ratio = contrastRatio(fg, bg);
      if (ratio + 1e-6 < 4.5) {
        flags.push(
          makeFlag(
            "contrast",
            `computed contrast — human check: inline ${style.color} on ${backgroundColor(style)} (${ratio.toFixed(2)}:1)`,
          ),
        );
      }
    }
  }
  return flags;
};
