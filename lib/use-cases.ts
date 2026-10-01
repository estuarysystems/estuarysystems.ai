export const useCasesPage = {
  title: "Use cases",
  description:
    "Systems intelligence for intake, drafting, and the work around them.",
  lede: "Systems intelligence for intake, drafting, and the work around them.",
  draftingLine: "One flow, in order.",
} as const;

export type UseCaseModule = {
  title: string;
  example: string;
  badge?: string;
  /** Consecutive modules with the same pair sit side by side. */
  pair?: string;
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
        example: "A business pulls incoming PDFs from Drive",
      },
      {
        title: "Filename Routing",
        example: "Files named INV-2024.pdf go to Invoices",
        pair: "routing",
      },
      {
        title: "File Content Routing",
        example: "Blank-named PDFs sorted by reading them",
        pair: "routing",
      },
      {
        title: "Case Database",
        example: "A private database for records and contacts",
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
        example: "Assemble a packet before drafting a document",
      },
      {
        title: "Document Drafting Automation",
        example: "Generate a draft from a template",
      },
      {
        title: "Automated Document Review",
        example: "Flag a draft against the source",
      },
      {
        title: "Human Review Handoff",
        example: "Forwards the document to a human for review by message or email",
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
        example: "Bots for different employees message each other to retrieve info",
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
      },
      {
        title: "Software Delivery Standards",
        example: "One delivery checklist for the team",
      },
      {
        title: "Technology Risk Management",
        example: "Risk check before a release",
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
        example: "A bot sorts incoming email and acts, automatically or after approval",
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
      },
      {
        title: "Cost Log",
        example: "Log daily model spend",
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
        title: "Training Video",
        example: "A training video can be made for any topic",
      },
      {
        title: "Price Watch",
        example: "Flag cards underpriced by $5+",
      },
      {
        title: "Web Log",
        example: "A continual check on a competitor site, or any site",
      },
    ],
  },
];
