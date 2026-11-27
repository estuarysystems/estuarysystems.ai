import { CrayonWindow } from "./widgets/crayon-window";
import { Hill } from "./widgets/hill";
import { ScoreBars } from "./widgets/score-bars";
import { WordSpace } from "./widgets/word-space";

const hillSlugs = ["loss", "gradient-descent", "learning-rate"] as const;

export function hasWidget(slug: string) {
  return (
    slug === "distillation" ||
    slug === "temperature" ||
    slug === "sampling" ||
    slug === "top-p" ||
    slug === "top-k" ||
    slug === "embedding" ||
    slug === "vector" ||
    slug === "context-window" ||
    hillSlugs.some((item) => item === slug)
  );
}

export function WidgetForTerm({ slug, color }: { slug: string; color: string }) {
  if (slug === "distillation") {
    return <ScoreBars mode="teacher" color={color} />;
  }
  if (slug === "temperature") {
    return <ScoreBars mode="temperature" color={color} />;
  }
  if (slug === "sampling") {
    return <ScoreBars mode="sample" color={color} />;
  }
  if (slug === "top-p") {
    return <ScoreBars mode="topp" color={color} />;
  }
  if (slug === "top-k") {
    return <ScoreBars mode="topk" color={color} />;
  }
  if (slug === "loss" || slug === "gradient-descent" || slug === "learning-rate") {
    return <Hill slug={slug} color={color} />;
  }
  if (slug === "embedding" || slug === "vector") {
    return <WordSpace color={color} />;
  }
  if (slug === "context-window") {
    return <CrayonWindow color={color} />;
  }
  return null;
}
