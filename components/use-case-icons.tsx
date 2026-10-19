import type { ReactNode } from "react";

type IconProps = {
  title: string;
};

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const phone = (
  <Glyph>
    <path d="M8 4.5h2.2l1.2 3-1.6 1a11 11 0 0 0 5 5l1-1.6 3 1.2V15a2 2 0 0 1-2.2 2A13.2 13.2 0 0 1 6 6.7 2 2 0 0 1 8 4.5Z" />
  </Glyph>
);

const glyphs: Record<string, ReactNode> = {
  "AI receptionist": phone,
  "Call routing": (
    <Glyph>
      <path d="M5 7h8" />
      <path d="M10.5 4.5 13 7l-2.5 2.5" />
      <path d="M19 17H11" />
      <path d="M13.5 14.5 11 17l2.5 2.5" />
    </Glyph>
  ),
  "Staff handoff": (
    <Glyph>
      <path d="M8 11a2.4 2.4 0 1 0 0-4.8A2.4 2.4 0 0 0 8 11Z" />
      <path d="M16.2 10.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M3.8 18.2v-1.1a3.2 3.2 0 0 1 3.2-3.2h2.1a3.2 3.2 0 0 1 3.2 3.2v1.1" />
      <path d="M13.2 14.2h1.2a2.8 2.8 0 0 1 2.8 2.8v1.2" />
    </Glyph>
  ),
  "Intake data": (
    <Glyph>
      <path d="M7 6.5h10" />
      <path d="M6 10.5h12" />
      <path d="M5 14.5h14" />
      <path d="M8 18.5h8" />
    </Glyph>
  ),
  "Intake portal": (
    <Glyph>
      <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M4 8l8 6 8-6" />
    </Glyph>
  ),
  "Document intake": (
    <Glyph>
      <path d="M6 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M13 3.5V9h5" />
      <path d="M8 14h8" />
      <path d="M8 17h5" />
    </Glyph>
  ),
  "Lead follow-up": (
    <Glyph>
      <path d="M4 7.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <path d="M4 7.5 12 13l8-5.5" />
    </Glyph>
  ),
  "Consult booking": (
    <Glyph>
      <rect x="4" y="5.5" width="16" height="14" rx="1.5" />
      <path d="M4 9.5h16" />
      <path d="M8 3.8v3" />
      <path d="M16 3.8v3" />
    </Glyph>
  ),
  "Email intake": (
    <Glyph>
      <path d="M4 7.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <path d="M4 7.5 12 13l8-5.5" />
      <path d="M15 16.5h4" />
    </Glyph>
  ),
  "Document draft": (
    <Glyph>
      <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8 13h5" />
      <path d="M8 16.5h3" />
    </Glyph>
  ),
  "Human review": (
    <Glyph>
      <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 14.2 10.6 16.3 15.2 11.5" />
    </Glyph>
  ),
  "Case record": (
    <Glyph>
      <path d="M4 7.5h16v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5Z" />
      <path d="M4 7.5 6.2 4.5h11.6L20 7.5" />
      <path d="M9 12.5h6" />
    </Glyph>
  ),
};

export function UseCaseIcon({ title }: IconProps) {
  return (
    glyphs[title] ?? (
      <Glyph>
        <rect x="5" y="5" width="14" height="14" rx="2" />
      </Glyph>
    )
  );
}
