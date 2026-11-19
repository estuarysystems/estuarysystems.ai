import Link from "next/link";
import { playgroundItems } from "@/lib/playground";

export function PlaygroundGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-2 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
      {playgroundItems.map((item) => (
        <Link key={item.href} href={item.href} className="use-case-card no-underline">
          <span className="use-case-card-fill" aria-hidden="true" />
          <div className="use-case-card-body">
            <div className="use-case-card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V6l10-2v12" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="16.5" cy="16" r="2.5" />
              </svg>
            </div>
            <div className="use-case-card-copy">
              <h2 className="text-lg font-medium tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
