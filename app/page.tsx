import { ScheduleCta } from "@/components/schedule-cta";
import {
  bio,
  fallbackLabels,
  locked,
  photos,
  processTeaser,
  site,
} from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main">
      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.hero.src}
            alt={photos.hero.alt}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="flex flex-col items-start gap-10">
            <h1 className="max-w-xl text-6xl font-medium tracking-tight md:text-8xl">
              {site.wordmark}
            </h1>
            <p className="max-w-md text-lg text-muted">{site.tagline}</p>
            <ScheduleCta variant="button" />
            <Link
              href="/capabilities"
              className="text-sm text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              {site.exploreCapabilities}
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24" aria-labelledby="about-heading">
        <div className="mx-auto grid max-w-6xl gap-12 border-t border-line px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="space-y-8">
            <h2 id="about-heading" className="text-5xl font-medium tracking-tight md:text-6xl">
              Who I am
            </h2>
            <p className="max-w-2xl text-lg text-muted">{bio}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              {fallbackLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.about.src}
            alt={photos.about.alt}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="process-teaser-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2
            id="process-teaser-heading"
            className="mb-8 text-5xl font-medium tracking-tight md:text-6xl"
          >
            How we work
          </h2>
          <p className="max-w-2xl text-lg text-muted">{processTeaser}</p>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="stances-heading">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-20 md:py-28">
          <h2 id="stances-heading" className="text-5xl font-medium tracking-tight md:text-6xl">
            How I work in public
          </h2>
          <p className="max-w-2xl text-lg">{locked.stanceTeaser}</p>
        </div>
      </section>

      <section
        id="schedule"
        className="scroll-mt-24 border-t border-line"
        aria-labelledby="schedule-heading"
      >
        <div className="mx-auto max-w-6xl space-y-6 px-5 py-20 md:py-28">
          <h2 id="schedule-heading" className="text-5xl font-medium tracking-tight md:text-6xl">
            {site.scheduleLabel}
          </h2>
          <ScheduleCta variant="button" />
        </div>
      </section>
    </main>
  );
}
