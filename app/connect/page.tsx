import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Connect",
};

export default function ConnectPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">Connect</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{site.scheduleLabel}</p>
        <div className="mt-16">
          <CalEmbed />
        </div>
      </div>
    </main>
  );
}
