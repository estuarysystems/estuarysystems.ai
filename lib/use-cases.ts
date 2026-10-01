export const useCasesPage = {
  title: "Use cases",
  description:
    "Systems intelligence for intake, drafting, filing, and the work around them.",
  lede: "Systems intelligence for intake, drafting, filing, and the work around them.",
  draftingLine: "One flow, in order.",
} as const;

export type UseCaseModule = {
  title: string;
  example: string;
  whatItDoes: string;
  badge?: string;
  /** Consecutive modules with the same pair sit side by side. */
  pair?: string;
  /** The costlier half of a pair. Rendered in the signal accent. */
  mark?: "signal";
};

export type UseCasePackage = {
  id: string;
  name: string;
  /** Muted sheet-family color for the package bar and chip. */
  accent: string;
  presentation: "cards" | "flow";
  density?: "tight";
  line?: string;
  modules: readonly UseCaseModule[];
};

export const useCasePackages: readonly UseCasePackage[] = [
  {
    id: "intake",
    name: "Intake",
    accent: "#8AADD4",
    presentation: "cards",
    modules: [
      {
        title: "Intake Automation",
        example: "Law firm pulls client PDFs from Drive",
        whatItDoes: "Pulls, stores, and routes incoming files.",
      },
      {
        title: "Filename Routing",
        example: "Files named INV-2024.pdf go to Invoices",
        whatItDoes: "Cheap. No PDF read.",
        pair: "routing",
      },
      {
        title: "File Content Routing",
        example: "Blank-named PDFs sorted by reading them",
        whatItDoes: "Reads the PDF. Costlier.",
        pair: "routing",
        mark: "signal",
      },
      {
        title: "Case Database",
        example: "Private DB for cases and contacts",
        whatItDoes: "Cases, contacts, and files in one place.",
      },
    ],
  },
  {
    id: "work-routing",
    name: "Work routing",
    accent: "#A394B8",
    presentation: "cards",
    modules: [
      {
        title: "SI Work Orchestration",
        example: "Queue next step to one SI bot",
        whatItDoes: "Packages work and assigns one worker.",
      },
    ],
  },
  {
    id: "document-drafting",
    name: "Document drafting",
    accent: "#8FB89A",
    presentation: "flow",
    line: useCasesPage.draftingLine,
    modules: [
      {
        title: "Drafting Packet Preparation",
        example: "Build packet before drafting a letter",
        whatItDoes: "Template + instructions + facts together.",
      },
      {
        title: "Document Drafting Automation",
        example: "Fill a demand letter template",
        whatItDoes: "Fills placeholders. Draft for review.",
      },
      {
        title: "Automated Document Review",
        example: "Check draft vs source facts",
        whatItDoes: "Pass/fail vs source for a human.",
      },
      {
        title: "Document-Type Worker Routing",
        example: "Send discovery docs to the discovery bot",
        whatItDoes: "Right worker per document type.",
      },
      {
        title: "Smart Template Selection",
        example: "Pick singular vs plural template",
        whatItDoes: "Chooses the right template.",
      },
      {
        title: "Human Review Handoff",
        example: "Attorney reviews finished draft",
        whatItDoes: "Draft + notes to a person.",
      },
    ],
  },
  {
    id: "filing",
    name: "Filing",
    accent: "#3D8F68",
    presentation: "cards",
    modules: [
      {
        title: "Delegated Filing Handoff",
        example: "Upload final doc and tag owner",
        whatItDoes: "Upload, status, tag owner.",
      },
    ],
  },
  {
    id: "platform",
    name: "Platform",
    accent: "#C48A62",
    presentation: "cards",
    modules: [
      {
        title: "Team Messaging Automation",
        example: "Bots hand off work in Slack",
        whatItDoes: "Assistants talk over Slack.",
      },
      {
        title: "Safe System Updates",
        example: "Safe deploy of bot tooling",
        whatItDoes: "Backups, pins, health checks.",
      },
    ],
  },
  {
    id: "delivery",
    name: "Delivery",
    accent: "#D4C48A",
    presentation: "cards",
    modules: [
      {
        title: "Product Development Workflow",
        example: "Idea → shipped feature",
        whatItDoes: "Spec → build → verify → release.",
      },
      {
        title: "Software Delivery Standards",
        example: "One delivery checklist for the team",
        whatItDoes: "Plan through monitor lifecycle.",
      },
      {
        title: "Technology Risk Management",
        example: "Risk check before a release",
        whatItDoes: "Risk checks beside delivery.",
      },
    ],
  },
  {
    id: "email-intake",
    name: "Email intake",
    accent: "#C4A15A",
    presentation: "cards",
    modules: [
      {
        title: "Documentation Email Intake",
        example: "Forward docs@ → database row",
        whatItDoes: "Inbox writes the database.",
        badge: "Time saved 5 min/task",
      },
    ],
  },
  {
    id: "visibility",
    name: "Visibility",
    accent: "#D4A0AE",
    presentation: "cards",
    modules: [
      {
        title: "Project Dashboard",
        example: "See hours saved this week",
        whatItDoes: "Hours saved, bottlenecks, human vs bot.",
      },
      {
        title: "Cost Log",
        example: "Log daily model spend",
        whatItDoes: "Daily cost log for models and tools.",
      },
    ],
  },
  {
    id: "standalone",
    name: "Standalone",
    accent: "#A39E96",
    presentation: "cards",
    density: "tight",
    modules: [
      {
        title: "Client Intake Form",
        example: "New client fill-out form",
        whatItDoes: "Form → clean summary + missing info.",
      },
      {
        title: "Training Video Pipeline",
        example: "SOP row → training video script",
        whatItDoes: "Sheet row → brief, script, shot list.",
      },
      {
        title: "Price Watch",
        example: "Flag cards underpriced by $5+",
        whatItDoes: "Watches prices; flags buy/sell gaps.",
      },
      {
        title: "Website Risk Scan",
        example: "Scan a company site for lawsuit risk",
        whatItDoes: "Scans a site against common risk patterns.",
      },
    ],
  },
];
