export const site = {
  wordmark: "Estuary Systems",
  legalName: "Estuary Systems LLC",
  domain: "estuarysystems.ai",
  tagline: "AI for law firm intake.",
  oneLiner:
    "Estuary Systems helps law firms answer calls, collect intake data, and follow up.",
  scheduleLabel: "Book a call with George",
  scheduleHref: "/connect",
  calEmbedSrc: "https://cal.com/george-lu-ouzdmq/15min?embed=true&theme=light",
  workWithMe: "Book a call",
  ctaLabel: "Book a call",
  ctaHint: "Bring the way your firm answers calls today.",
  email: "george@estuarysystems.ai",
  // Phone line answered by the Estuary Systems voice agent. E.164, for example "+14155550100".
  // The phone link shows ONLY when voiceNumber is valid E.164 AND voiceVerified is true
  // (set it true only after a real inbound test call reached the agent). /connect always shows.
  voiceNumber: "+16506292311",
  voiceVerified: true,
  voiceLabel: "Call our automated line",
} as const;

export const homePage = {
  description:
    "Estuary Systems is an AI firm for law firms. We help small firms answer each call, collect intake data, and follow up. We do personal injury and immigration work first.",
  kicker: "AI for law firm intake",
  paragraphs: [
    "Estuary Systems is an AI firm.",
    "We help law firms.",
    "We help small law firms.",
    "We do personal injury and immigration work first.",
    "An AI receptionist answers each call.",
    "The receptionist collects intake data.",
    "Follow-up keeps contact with a lead until the lead signs or says no.",
  ],
} as const;

export const bio =
  "I am George. I help law firms with intake and documents.";

export const aboutAgency =
  "George Lu runs Estuary Systems LLC in Palo Alto. Estuary Systems is an AI firm. We help small law firms with intake and documents. We do personal injury and immigration work first.";

export const connectTrust = [
  "George Lu runs Estuary Systems LLC in the Bay Area.",
  "Estuary Systems is an AI firm.",
  "We help law firms with intake and documents.",
  "We work with a law firm on its intake.",
  "Bring the way your firm answers calls today.",
] as const;

export const nav = [
  { href: "/offers", label: "Services" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/industries", label: "Law firms" },
  { href: "/guides", label: "Guides" },
  { href: "/audit", label: "Intake time" },
] as const;

export const photos = {
  hero: {
    src: "/george-hero.jpg",
    alt: "George Lu",
  },
  about: {
    src: "/george-about.jpg",
    alt: "George Lu",
  },
} as const;

export const primaryCapabilities = [
  {
    title: "AI receptionist",
    line: "Answer inbound calls and collect intake data.",
  },
  {
    title: "Intake portal",
    line: "Open a secure form that starts with the call data.",
  },
  {
    title: "Document work",
    line: "Prepare a draft from the intake record. A person reviews it.",
  },
] as const;

export const capabilities = [
  {
    title: "Call routing",
    line: "Route a call from the words of the caller. Do not use a menu that says press 1.",
  },
  {
    title: "Follow-up",
    line: "Contact a lead who does not sign on the first call.",
  },
  {
    title: "Human review",
    line: "A person reads the output before the firm uses it.",
  },
  {
    title: "Conflict check",
    line: "A person checks conflicts. The AI receptionist does not.",
  },
  {
    title: "Case record",
    line: "Send the intake record to the case management system.",
  },
  {
    title: "No legal advice",
    line: "The AI receptionist says that it cannot give legal advice.",
  },
] as const;

export const blogPlaceholder = "There are no posts on this page.";

export const alexandriaShelves = [
  "Operations",
  "Writing",
  "Code",
  "Research",
] as const;

export const privacy = {
  title: "Privacy",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Estuary Systems LLC helps law firms. The office is in the Bay Area.",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "We collect the words you type on this site.",
        "We collect the data that Cal.com and the host need to book a call and to run the site.",
      ],
    },
    {
      heading: "What we do not do",
      paragraphs: [
        "We do not sell personal information.",
        "We do not use your confidential documents to train models.",
      ],
    },
    {
      heading: "Who sees it",
      paragraphs: ["Cal.com processes booking data. The host runs the site."],
    },
    {
      heading: "Phone demo",
      paragraphs: [
        "Our automated phone demo uses Twilio to connect calls and ElevenLabs to generate spoken responses. Calls are transcribed, and conversation data is available to us for operating and improving the demo. Please avoid sharing sensitive personal information. You can also contact us by email or use the booking page.",
      ],
    },
    {
      heading: "How to reach us",
      paragraphs: ["george@estuarysystems.ai"],
    },
  ],
} as const;

export const terms = {
  title: "Terms",
  sections: [
    {
      heading: "Not a law firm",
      paragraphs: [
        "Estuary Systems LLC builds software. We are not a law firm. Nothing on this site is legal advice.",
      ],
    },
    {
      heading: "This site is not a contract",
      paragraphs: ["A page on this site is not an offer. Work terms are in a signed agreement."],
    },
    {
      heading: "A booking is not a client relationship",
      paragraphs: [
        "A call that you book on Cal.com is not a client relationship. Work starts when both sides sign.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The content of this site belongs to Estuary Systems LLC.",
        "Your documents stay yours until a signed agreement says otherwise.",
      ],
    },
    {
      heading: "AI can be wrong",
      paragraphs: ["AI output can be wrong. You check it before you use it."],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Our liability is not more than the fees you paid to us.",
        "If you paid no fees, the limit is zero.",
      ],
    },
    {
      heading: "California",
      paragraphs: ["California law applies. The venue is the Bay Area."],
    },
  ],
} as const;
