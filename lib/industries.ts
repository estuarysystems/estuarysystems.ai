export const industriesPage = {
  title: "Industries",
  description: "Sections for specific kinds of businesses. Retail shop is the first.",
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
];

const retailShop = industrySections.find((section) => section.id === "retail-shop");

if (industrySections.length !== 1 || retailShop?.items.length !== 4) {
  throw new Error("Expected a Retail shop section with 4 items");
}
