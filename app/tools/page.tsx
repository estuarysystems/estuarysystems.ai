import type { Metadata } from "next";
import { FillInSlot } from "@/components/fill-in-slot";
import { slots, toolsPlaceholder } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools",
};

export default function ToolsPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-5xl space-y-8 px-5 py-16 md:py-24">
        <h1 className="text-4xl font-medium tracking-tight">Tools and products</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{toolsPlaceholder}</p>
        <FillInSlot label={slots.tools} className="max-w-2xl min-h-40" />
      </div>
    </main>
  );
}
