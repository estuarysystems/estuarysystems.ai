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

const glyphs: Record<string, ReactNode> = {
  "Intake Automation": (
    <Glyph>
      <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M4 8l8 6 8-6" />
      <path d="M12 3v5" />
      <path d="M9.5 6.5 12 8.5 14.5 6.5" />
    </Glyph>
  ),
  "Filename Routing": (
    <Glyph>
      <path d="M6 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M13 3.5V9h5" />
      <path d="M8 14h5" />
      <path d="M11 12.5 13.5 14 11 15.5" />
    </Glyph>
  ),
  "Content-Based Routing": (
    <Glyph>
      <path d="M5 5h5v5H5z" />
      <path d="M14 14h5v5h-5z" />
      <path d="M10 7.5h3.5a3 3 0 0 1 3 3V14" />
      <path d="M15 12.2 17.5 14 15 15.8" />
    </Glyph>
  ),
  "Records Management": (
    <Glyph>
      <path d="M4 7.5h16v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5Z" />
      <path d="M4 7.5 6.2 4.5h11.6L20 7.5" />
      <path d="M9 12.5h6" />
    </Glyph>
  ),
  "Draft Preparation": (
    <Glyph>
      <path d="M7 6.5h10" />
      <path d="M6 10.5h12" />
      <path d="M5 14.5h14" />
      <path d="M8 18.5h8" />
    </Glyph>
  ),
  "Document Drafting": (
    <Glyph>
      <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8 13h5" />
      <path d="M8 16.5h3" />
      <path d="M14.5 15.5 16.2 19l1.8-4.5" />
    </Glyph>
  ),
  "Document Review": (
    <Glyph>
      <path d="M6 3.5h8l4 4V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 14.2 10.6 16.3 15.2 11.5" />
    </Glyph>
  ),
  "Review Coordination": (
    <Glyph>
      <path d="M8 11a2.4 2.4 0 1 0 0-4.8A2.4 2.4 0 0 0 8 11Z" />
      <path d="M16.2 10.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M3.8 18.2v-1.1a3.2 3.2 0 0 1 3.2-3.2h2.1a3.2 3.2 0 0 1 3.2 3.2v1.1" />
      <path d="M13.2 14.2h1.2a2.8 2.8 0 0 1 2.8 2.8v1.2" />
    </Glyph>
  ),
  "Team Information Exchange": (
    <Glyph>
      <path d="M7 7h10" />
      <path d="M14.5 4.5 17 7l-2.5 2.5" />
      <path d="M17 17H7" />
      <path d="M9.5 14.5 7 17l2.5 2.5" />
    </Glyph>
  ),
  "Product Development": (
    <Glyph>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8Z" />
      <path d="M12 12 20 8" />
      <path d="M12 12v8.5" />
      <path d="M12 12 4 8" />
    </Glyph>
  ),
  "Delivery Standards": (
    <Glyph>
      <path d="M8 6.5h11" />
      <path d="M8 12h11" />
      <path d="M8 17.5h11" />
      <path d="M4.5 6.5h.01" />
      <path d="M4.5 12h.01" />
      <path d="M4.5 17.5h.01" />
    </Glyph>
  ),
  "Technology Risk Management": (
    <Glyph>
      <path d="M12 3.5 19 6.2v5.4c0 4.2-2.8 7.2-7 8.9-4.2-1.7-7-4.7-7-8.9V6.2Z" />
      <path d="M12 8.5v4" />
      <path d="M12 15.2h.01" />
    </Glyph>
  ),
  "Email Intake": (
    <Glyph>
      <path d="M4 7.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
      <path d="M4 7.5 12 13l8-5.5" />
    </Glyph>
  ),
  "Project Dashboard": (
    <Glyph>
      <path d="M4 19.5h16" />
      <path d="M7 19.5V12" />
      <path d="M12 19.5V7.5" />
      <path d="M17 19.5v-4" />
    </Glyph>
  ),
  "Cost Tracking": (
    <Glyph>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v8" />
      <path d="M14.4 9.6c-.4-.7-1.2-1.1-2.4-1.1-1.5 0-2.5.8-2.5 1.9s1 1.7 2.6 2 2.6.8 2.6 2-1.1 2-2.7 2-2.2-.5-2.6-1.3" />
    </Glyph>
  ),
  "Training Content": (
    <Glyph>
      <path d="M4 6.5 12 4l8 2.5V18L12 20.5 4 18Z" />
      <path d="M12 4v16.5" />
    </Glyph>
  ),
  "Price Monitoring": (
    <Glyph>
      <path d="M4 12.5 12.2 4.3h6.2v6.2L10.5 18.4a1.6 1.6 0 0 1-2.3 0L4 14.2a1.2 1.2 0 0 1 0-1.7Z" />
      <path d="M16.2 7.8h.01" />
    </Glyph>
  ),
  "Website Monitoring": (
    <Glyph>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4Z" />
    </Glyph>
  ),
  "Email and calendar check": (
    <Glyph>
      <rect x="4" y="5.5" width="16" height="14" rx="1.5" />
      <path d="M4 9.5h16" />
      <path d="M8 3.8v3" />
      <path d="M16 3.8v3" />
    </Glyph>
  ),
  "Automated phone response": (
    <Glyph>
      <path d="M8 4.5h2.2l1.2 3-1.6 1a11 11 0 0 0 5 5l1-1.6 3 1.2V15a2 2 0 0 1-2.2 2A13.2 13.2 0 0 1 6 6.7 2 2 0 0 1 8 4.5Z" />
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
