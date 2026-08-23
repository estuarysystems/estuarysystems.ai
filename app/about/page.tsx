import type { Metadata } from "next";
import { ConversationCta } from "@/components/conversation-cta";
import { aboutAgency, bio, photos } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: aboutAgency,
};

export default function AboutPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.about.src}
            alt={photos.about.alt}
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div className="flex flex-col items-start gap-10">
            <h1 className="max-w-2xl text-3xl font-medium tracking-tight text-pretty md:text-4xl">
              {aboutAgency}
            </h1>
            <p className="max-w-2xl text-lg text-muted">{bio}</p>
            <ConversationCta />
          </div>
        </div>
      </div>
    </main>
  );
}
