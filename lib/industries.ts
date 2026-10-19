export const industriesPage = {
  title: "Law firms",
  description:
    "Estuary Systems helps small law firms. We do personal injury and immigration work first.",
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
    id: "small-firms",
    name: "Small law firms",
    items: [
      {
        title: "Answer each call",
        description: "An AI receptionist answers when staff cannot.",
      },
      {
        title: "Intake record",
        description: "The firm keeps the intake data from the call.",
      },
      {
        title: "Lead follow-up",
        description: "The firm contacts a lead who does not sign.",
      },
      {
        title: "Document work",
        description: "The firm prepares documents from the intake record. A person reviews them.",
      },
    ],
  },
  {
    id: "personal-injury",
    name: "Personal injury",
    items: [
      {
        title: "Incident facts",
        description: "Collect the date, the type of incident, and where it happened.",
      },
      {
        title: "Injuries",
        description: "Collect the injury and the care the person has received.",
      },
      {
        title: "Insurance",
        description: "Collect the insurance facts the caller knows.",
      },
      {
        title: "Injury documents",
        description: "Accept photos, a police report, and medical bills.",
      },
    ],
  },
  {
    id: "immigration",
    name: "Immigration",
    items: [
      {
        title: "Matter type",
        description: "Collect the type of immigration matter. Do not tell the caller which form to file.",
      },
      {
        title: "Dates and deadlines",
        description: "Collect a deadline if the caller knows it.",
      },
      {
        title: "Preferred language",
        description: "Collect the language the caller prefers.",
      },
      {
        title: "Immigration documents",
        description: "Accept the documents the caller already has. A person reviews them.",
      },
    ],
  },
];

const smallFirms = industrySections.find((section) => section.id === "small-firms");
const personalInjury = industrySections.find((section) => section.id === "personal-injury");
const immigration = industrySections.find((section) => section.id === "immigration");

if (
  industrySections.length !== 3 ||
  smallFirms?.items.length !== 4 ||
  personalInjury?.items.length !== 4 ||
  immigration?.items.length !== 4 ||
  industrySections.some((section) => section.id === "retail-shop")
) {
  throw new Error("Expected small law firms, personal injury, and immigration, each with 4 items");
}
