import Link from "next/link";
import { nav } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5">
        <Link
          href="/"
          className="min-w-0 text-sm leading-tight tracking-tight text-balance text-ink max-[360px]:text-[11px]"
        >
          Your Superintelligence Deployment Platform
        </Link>
        <nav aria-label="Main" className="flex min-w-0 flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
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
