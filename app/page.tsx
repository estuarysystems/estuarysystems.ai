import { FillInSlot } from "@/components/fill-in-slot";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ScheduleCta } from "@/components/schedule-cta";
import {
  fallbackLabels,
  locked,
  photos,
  processTeaser,
  site,
  slots,
} from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main">
      <section className="bg-hero text-hero-ink">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:py-24">
          <PhotoPlaceholder
            label={photos.hero}
            className="min-h-80 bg-[#8a8983] text-[#1c1c19]"
          />
          <div className="flex flex-col items-start gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                {site.wordmark}
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-hero-ink/85">
                {site.tagline}
              </p>
            </div>
            <ScheduleCta href="#schedule" variant="circle" />
            <Link
              href="/capabilities"
              className="text-sm text-hero-ink/80 underline decoration-hero-ink/30 underline-offset-4 hover:text-hero-ink hover:decoration-hero-ink"
            >
              {site.exploreCapabilities}
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 border-b border-line"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="space-y-6">
            <h2 id="about-heading" className="text-3xl font-medium tracking-tight">
              Who I am
            </h2>
            <FillInSlot label={slots.bio} className="min-h-40" />
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              {fallbackLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            <p className="text-base leading-relaxed">{locked.afterYouBook}</p>
          </div>
          <PhotoPlaceholder label={photos.about} className="min-h-80" />
        </div>
      </section>

      <section className="border-b border-line" aria-labelledby="process-teaser-heading">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
          <h2
            id="process-teaser-heading"
            className="mb-6 text-3xl font-medium tracking-tight"
          >
            How we work
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{processTeaser}</p>
        </div>
      </section>

      <section className="border-b border-line" aria-labelledby="stances-heading">
        <div className="mx-auto max-w-5xl space-y-8 px-5 py-20 md:py-28">
          <h2 id="stances-heading" className="text-3xl font-medium tracking-tight">
            How I work in public
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">{locked.stanceTeaser}</p>
          <FillInSlot label={slots.stances} className="max-w-2xl min-h-32" />
        </div>
      </section>

      <section
        id="schedule"
        className="scroll-mt-24"
        aria-labelledby="schedule-heading"
      >
        <div className="mx-auto max-w-5xl space-y-6 px-5 py-20 md:py-28">
          <h2 id="schedule-heading" className="text-3xl font-medium tracking-tight">
            {site.scheduleLabel}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">{locked.bookASlot}</p>
          <p className="text-muted">{locked.bookingComing}</p>
          <FillInSlot label={slots.bookingUrl} className="max-w-xl" />
        </div>
      </section>
    </main>
  );
}
