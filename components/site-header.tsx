import Link from "next/link";
import { nav, site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5">
        <Link href="/" className="shrink-0 text-sm tracking-tight text-ink">
          {site.wordmark}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
