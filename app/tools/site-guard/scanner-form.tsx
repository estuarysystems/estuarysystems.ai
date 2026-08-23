"use client";

import { useState } from "react";
import type { CrawlResult, Flag } from "@/lib/site-guard/types";
import {
  CATALOG,
  EMPTY_FLAGS_MESSAGE,
  FOOTER_DISCLAIMER,
  NOT_LEGAL_ADVICE,
} from "@/lib/site-guard/wording";

export function ScannerForm() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CrawlResult | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/tools/site-guard/api", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await response.json()) as CrawlResult & { error?: string };
      if (!response.ok && !data.flags && !data.systemFlags) {
        setError(data.error || "Scan could not start.");
        return;
      }
      setResult(data);
    } catch {
      setError("Scan could not start.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10">
      <p className="max-w-2xl text-sm text-muted">{NOT_LEGAL_ADVICE}</p>

      <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
        <label htmlFor="site-url" className="block text-sm font-medium">
          Public https URL
        </label>
        <input
          id="site-url"
          name="url"
          type="url"
          inputMode="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="w-full border border-line bg-paper px-4 py-3 text-base text-ink"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {busy ? "Scanning…" : "Scan"}
        </button>
      </form>

      {error ? <p className="max-w-2xl text-sm text-muted">{error}</p> : null}

      {result ? <Results result={result} /> : null}

      <p className="max-w-3xl text-sm leading-relaxed text-muted">{FOOTER_DISCLAIMER}</p>
    </div>
  );
}

function Results({ result }: { result: CrawlResult }) {
  return (
    <section className="space-y-8" aria-live="polite">
      {result.systemFlags?.length ? (
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tight">System notes</h2>
          <ul className="max-w-2xl space-y-2 text-sm text-muted">
            {result.systemFlags.map((flag) => (
              <li key={`${flag.id}-${flag.message}`}>{flag.message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">Crawled URLs</h2>
        {result.crawled.length === 0 ? (
          <p className="text-sm text-muted">None.</p>
        ) : (
          <ul className="max-w-2xl space-y-1 text-sm text-muted">
            {result.crawled.map((href) => (
              <li key={href} className="break-all">
                {href}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-medium tracking-tight">Punch list</h2>
        {result.flags.length === 0 ? (
          <p className="max-w-2xl text-lg text-muted">{EMPTY_FLAGS_MESSAGE}</p>
        ) : (
          <ol className="space-y-4">
            {result.flags.map((flag, index) => (
              <PunchRow key={`${flag.id}-${flag.evidence}-${index}`} flag={flag} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function PunchRow({ flag }: { flag: Flag }) {
  const why = CATALOG[flag.id]?.why;
  return (
    <li className="border border-line bg-paper px-5 py-6">
      <p className="text-xs uppercase tracking-wide text-muted">signal</p>
      <h3 className="mt-1 text-xl font-medium tracking-tight">{flag.title}</h3>
      {why ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <span className="text-ink">Why. </span>
          {why}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        <span className="text-ink">Guard. </span>
        {flag.guard}
      </p>
      <p className="mt-3 break-all font-mono text-xs text-slot-ink">
        <span className="text-ink">Evidence. </span>
        {flag.evidence}
      </p>
    </li>
  );
}
