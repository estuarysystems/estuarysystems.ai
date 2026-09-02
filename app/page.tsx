import { ConversationCta } from "@/components/conversation-cta";
import { site } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="main">
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-32">
          <h1 className="max-w-5xl text-4xl font-medium tracking-tight text-pretty sm:text-5xl md:text-6xl lg:text-7xl">
            {site.wordmark}
          </h1>
          <p className="mt-8 text-lg text-muted">{site.tagline}</p>
          <p className="mt-4 max-w-2xl text-lg text-muted">{site.oneLiner}</p>
          <ConversationCta className="mt-10" />
        </div>
      </section>
    </main>
  );
}
