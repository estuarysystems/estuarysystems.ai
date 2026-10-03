export const industriesPage = {
  title: "Industries",
  description: "Sections for specific kinds of businesses.",
} as const;

export type IndustryItem = {
  title: string;
  description: string;
};

export type IndustrySection = {
  id: string;
  name: string;
  items: readonly IndustryItem[];
};

export const industrySections: readonly IndustrySection[] = [
  {
    id: "retail-shop",
    name: "Retail shop",
    items: [
      {
        title: "Shift scheduling",
        description: "Build weekly schedules from staff availability.",
      },
      {
        title: "Invoice monitor",
        description: "Track incoming invoices and flag items that need action.",
      },
      {
        title: "Sales tally",
        description: "Summarize sales for review.",
      },
      {
        title: "Accounting",
        description: "Organize transactions for bookkeeping and reporting.",
      },
    ],
  },
  {
    id: "legal-firm",
    name: "Legal firm",
    items: [
      {
        title: "Document intake routing",
        description: "Collect incoming documents and route them by type.",
      },
      {
        title: "Records management",
        description: "Keep matter records and related files organized.",
      },
      {
        title: "Review coordination",
        description: "Route documents to the right reviewers.",
      },
      {
        title: "Email intake",
        description: "Organize incoming messages and route them for action.",
      },
    ],
  },
];

const retailShop = industrySections.find((section) => section.id === "retail-shop");
const legalFirm = industrySections.find((section) => section.id === "legal-firm");

if (industrySections.length !== 2 || retailShop?.items.length !== 4 || legalFirm?.items.length !== 4) {
  throw new Error("Expected Retail shop and Legal firm sections, each with 4 items");
}
