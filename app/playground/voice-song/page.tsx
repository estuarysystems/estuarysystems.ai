import type { Metadata } from "next";
import Link from "next/link";
import { VoiceSongMaker } from "@/components/voice-song-maker";
import { site } from "@/lib/content";

const title = "Voice Song Maker";
const description = "Record one note at a time. Play a song with your notes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} · ${site.wordmark}`,
    description,
    url: "/playground/voice-song",
  },
};

const POST = "https://x.com/aj_dev_smith/status/2122538394710687871";

export default function VoiceSongPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
          <Link href="/playground" className="text-muted no-underline hover:text-ink">
            Playground
          </Link>
        </p>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] text-pretty md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">{description}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Your voice stays in this browser. This page does not upload it.
        </p>

        <VoiceSongMaker />

        <section className="mt-16 border-t border-line pt-10" aria-labelledby="diy-heading">
          <h2 id="diy-heading" className="text-3xl font-medium tracking-tight md:text-4xl">
            Do it yourself
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">You can build this page with an AI coding tool.</p>
          <ol className="mt-6 max-w-2xl list-decimal space-y-4 pl-5 text-base leading-relaxed">
            <li>Open an AI coding tool, such as Claude or Cursor.</li>
            <li>Tell it to build a browser page that uses the microphone.</li>
            <li>
              Tell it how the recorder works. The page plays a tone for each note in a range. It shows the note name,
              the Hz, and a pitch meter. It records a short clip. You can keep the clip, record it again, or skip the
              note.
            </li>
            <li>
              Tell it how the player works. The page plays a song with those clips only. If a note is missing, it
              shifts the nearest clip. Add a tempo control. Add a WAV download.
            </li>
            <li>
              Tell it to keep the clips in the browser. The page must not upload the voice. The page must not ask for
              a sign-in.
            </li>
            <li>Run the page. Record a few notes. Play a song.</li>
          </ol>

          <div className="mt-8 max-w-2xl border border-line bg-slot px-5 py-5 md:px-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Source of the idea</h3>
            <p className="mt-3 text-sm leading-relaxed">
              A.J. showed this idea in a post on X. He recorded 64 sung or whistled notes. A tool played songs from
              those notes. He built the tool with Claude Fable 5.2. The code is not public.
            </p>
            <p className="mt-3 text-sm">
              <a
                href={POST}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Read the post on X
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
