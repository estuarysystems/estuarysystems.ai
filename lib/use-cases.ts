export const useCasesPage = {
  title: "Use cases",
  description: "Use cases for law firm intake: calls, intake data, follow-up, and documents.",
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
    id: "calls",
    name: "Calls",
    modules: [
      {
        title: "AI receptionist",
        description: "Answers each inbound call, 24 hours each day, including when staff are busy.",
      },
      {
        title: "Call routing",
        description: "Routes the call from the words of the caller. It does not use a menu that says press 1.",
      },
      {
        title: "Staff handoff",
        description: "Gives the intake record to staff so a person can review it.",
      },
    ],
  },
  {
    id: "intake",
    name: "Intake",
    modules: [
      {
        title: "Intake data",
        description:
          "Collects the name, phone or email, matter, date, injuries, insurance, urgency, and language.",
      },
      {
        title: "Intake portal",
        description: "Opens a secure form that starts with the data from the call.",
      },
      {
        title: "Document intake",
        description: "Accepts photos, a police report, and medical bills from the lead.",
      },
    ],
  },
  {
    id: "follow-up",
    name: "Follow-up",
    modules: [
      {
        title: "Lead follow-up",
        description: "Contacts a lead who does not sign on the first call.",
      },
      {
        title: "Consult booking",
        description: "Helps the lead book a consult with the firm.",
      },
      {
        title: "Email intake",
        description: "Puts the facts from an email by a new lead into the intake record.",
      },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    modules: [
      {
        title: "Document draft",
        description: "Prepares a draft from the intake record and a template.",
      },
      {
        title: "Human review",
        description: "A person reads the draft before the firm uses it.",
      },
      {
        title: "Case record",
        description: "Sends the intake record to the case management system.",
      },
    ],
  },
];

export const useCaseModules: readonly UseCaseModule[] = useCaseSections.flatMap(
  (section) => section.modules,
);

if (useCaseModules.length !== 12) {
  throw new Error(`Expected 12 use cases, found ${useCaseModules.length}`);
}
