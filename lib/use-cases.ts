export const useCasesPage = {
  title: "Use cases",
  description: "Modules for intake, records, drafting, delivery, and monitoring.",
} as const;

export type UseCaseModule = {
  title: string;
  description: string;
};

export type UseCaseSection = {
  id: string;
  name: string;
  modules: readonly UseCaseModule[];
};

export function moduleId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const useCaseSections: readonly UseCaseSection[] = [
  {
    id: "intake",
    name: "Intake",
    modules: [
      {
        title: "Intake Automation",
        description: "Collect and organize incoming information for processing.",
      },
      {
        title: "Filename Routing",
        description: "Route files using established naming rules.",
      },
      {
        title: "Content-Based Routing",
        description: "Categorize and route documents based on their content.",
      },
      {
        title: "Records Management",
        description: "Maintain organized records and related information.",
      },
    ],
  },
  {
    id: "document-drafting",
    name: "Document drafting",
    modules: [
      {
        title: "Draft Preparation",
        description: "Gather and organize source materials for document creation.",
      },
      {
        title: "Document Drafting",
        description:
          "Create draft documents using structured templates and source information.",
      },
      {
        title: "Document Review",
        description:
          "Review documents for consistency, completeness, and alignment with source materials.",
      },
      {
        title: "Review Coordination",
        description: "Route documents to the appropriate reviewers.",
      },
    ],
  },
  {
    id: "platform",
    name: "Platform",
    modules: [
      {
        title: "Team Information Exchange",
        description: "Coordinate information requests across teams and systems.",
      },
    ],
  },
  {
    id: "delivery",
    name: "Delivery",
    modules: [
      {
        title: "Product Development",
        description: "Coordinate work from initial planning through delivery.",
      },
      {
        title: "Delivery Standards",
        description: "Apply consistent processes across development and delivery activities.",
      },
      {
        title: "Technology Risk Management",
        description: "Identify and assess risks across technology initiatives.",
      },
    ],
  },
  {
    id: "email-intake",
    name: "Email intake",
    modules: [
      {
        title: "Email Intake",
        description: "Organize incoming messages and route them for appropriate action.",
      },
    ],
  },
  {
    id: "visibility",
    name: "Visibility",
    modules: [
      {
        title: "Project Dashboard",
        description: "Provide a consolidated view of project activity and progress.",
      },
      {
        title: "Cost Tracking",
        description: "Track operational costs to support oversight and planning.",
      },
    ],
  },
  {
    id: "standalone",
    name: "Standalone",
    modules: [
      {
        title: "Training Content",
        description: "Create instructional content to support learning and adoption.",
      },
      {
        title: "Price Monitoring",
        description: "Monitor pricing changes to support informed decisions.",
      },
      {
        title: "Website Monitoring",
        description: "Track website updates and surface relevant changes.",
      },
    ],
  },
];

export const useCaseModules: readonly UseCaseModule[] = useCaseSections.flatMap(
  (section) => section.modules,
);

if (useCaseModules.length !== 18) {
  throw new Error(`Expected 18 use cases, found ${useCaseModules.length}`);
}
