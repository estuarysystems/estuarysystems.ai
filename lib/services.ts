export const servicesPage = {
  title: "Services",
  description:
    "Estuary Systems helps a law firm answer calls, collect intake data, follow up with leads, and prepare documents.",
} as const;

export const services = [
  {
    id: "ai-receptionist",
    title: "AI receptionist",
    line: "An AI receptionist answers each inbound call, 24 hours each day.",
    paragraphs: [
      "An AI receptionist answers each inbound call.",
      "It answers 24 hours each day.",
      "It answers on every day of the week.",
      "It answers when staff are busy or when the office is closed.",
      "It tells the caller that it is an AI.",
      "It does not give legal advice.",
      "It does not use a phone menu that says press 1 or press 2.",
      "It routes the call from the words of the caller.",
    ],
  },
  {
    id: "intake-data",
    title: "Intake data",
    line: "The receptionist collects the facts the firm needs from the call.",
    paragraphs: [
      "The receptionist collects intake data on the call.",
      "The data includes the name, the phone or email, the matter type, and the date.",
      "For a personal injury matter, it asks about injuries and insurance.",
      "It asks how urgent the matter is.",
      "It asks which language the caller prefers.",
      "It gives the intake record to staff.",
      "A person at the firm reviews the record.",
    ],
  },
  {
    id: "intake-portal",
    title: "Intake portal",
    line: "A secure form starts with the data from the call.",
    paragraphs: [
      "The intake portal is a secure form.",
      "Only the lead and the firm can open the form for that lead.",
      "The AI receptionist puts the call data into the form before the lead opens it.",
      "The lead checks the data and can correct it.",
      "The lead can upload photos, a police report, and medical bills.",
      "The firm can show a plain status, such as received or in review.",
      "The completed record goes to the case management system.",
    ],
  },
  {
    id: "follow-up",
    title: "Follow-up",
    line: "The firm contacts a lead who does not sign on the first call.",
    paragraphs: [
      "Some leads do not sign on the first call.",
      "Follow-up is the set of contacts after that call.",
      "The firm sends the portal link, then a reminder, then a later message.",
      "The firm stops when the lead says no.",
      "The firm stops when the lead does not reply after the last message.",
      "A person writes any message that gives a legal opinion.",
    ],
  },
  {
    id: "documents",
    title: "Document work",
    line: "The firm prepares documents from the intake record. A person reviews them.",
    paragraphs: [
      "Document work starts from the intake record and a template.",
      "The system can prepare a draft.",
      "A person at the firm reviews the draft before the firm uses it.",
      "The AI receptionist does not decide conflicts, fees, or whether the firm takes the case.",
    ],
  },
] as const;
