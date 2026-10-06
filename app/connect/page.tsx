import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { PhoneCta } from "@/components/phone-cta";
import { connectTrust, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Connect",
  description: connectTrust.join(" "),
  openGraph: {
    description: connectTrust.join(" "),
  },
};

export default function ConnectPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">Connect</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{site.scheduleLabel}</p>
        <ul className="mt-10 max-w-2xl space-y-3 text-lg leading-relaxed">
          {connectTrust.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          <a
            href={`mailto:${site.email}`}
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            {site.email}
          </a>
        </p>
        <PhoneCta className="mt-2" />
        <div className="mt-16 border border-line bg-slot">
          <CalEmbed />
        </div>
      </div>
    </main>
  );
}
