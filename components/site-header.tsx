import Link from "next/link";
import { site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-5 py-5">
        <Link href="/" className="shrink-0 text-sm tracking-tight text-ink">
          {site.wordmark}
        </Link>
      </div>
    </header>
  );
}
