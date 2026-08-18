export const site = {
  wordmark: "Estuary Systems",
  legalName: "Estuary Systems LLC",
  domain: "estuarysystems.ai",
  tagline: "An AI agency. We execute with current tools.",
  scheduleLabel: "Schedule time to chat with George",
  exploreCapabilities: "Explore capabilities",
} as const;

export const nav = [
  { href: "/", label: "Me" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
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

export const slots = {
  bio: "[BIO FROM GEORGE]",
  stances: "[STANCES FROM GEORGE]",
  bookingUrl: "[BOOKING URL]",
  price: "[PRICE]",
  tools: "[TOOLS FROM GEORGE]",
} as const;

export const fallbackLabels = [
  "George Lu",
  "Estuary Systems LLC",
  "Bay Area",
  "AI agency",
] as const;

export const locked = {
  stanceTeaser: "I do not use AI to make pictures.",
  bookingComing: "Booking link coming",
  bookASlot: "Book a slot. George will call you.",
} as const;

export const processTeaser =
  "Map the work. Send the model only the fields the job needs. A person reads it before it sends or files.";

export const capabilitiesIntro =
  "Estuary is an AI agency at the intersection of business and engineering. We focus on execution: using current AI tools to get work out the door, and staying current so the work stays efficient.";

export const primaryCapabilities = [
  {
    title: "System conversion",
    line: "Convert systems from how they run with people to an AI-run process.",
  },
  {
    title: "Process mapping",
    line: "Figure out exactly how each process in the business runs, then judge whether AI can and should replace it.",
  },
  {
    title: "Local installation",
    line: "Local model and agent installation.",
  },
] as const;

export const capabilities = [
  {
    title: "Process workflows",
    line: "A messy, repeated operations process becomes a working AI workflow your team can run.",
  },
  {
    title: "Work mapping",
    line: "We document how the work actually happens before anyone automates it.",
  },
  {
    title: "Document intake",
    line: "Incoming PDFs, photos, and email become structured fields you can file, route, or scan as a table.",
  },
  {
    title: "Data minimization",
    line: "Only the fields the form needs leave the office. The rest stays put.",
  },
  {
    title: "Human review",
    line: "A person reads the output before it sends or files.",
  },
  {
    title: "Audit trail",
    line: "A log of who did what, and when.",
  },
  {
    title: "System of record",
    line: "Chat is a nudge. The real record is what happened.",
  },
  {
    title: "Test versus live",
    line: "Experiments run in a test lane. They do not touch live work.",
  },
  {
    title: "Cited answers",
    line: "Answers show the official source they came from.",
  },
  {
    title: "Quality checks",
    line: "A set of real examples so you can see if a change made drafts worse.",
  },
  {
    title: "Work-moving bots",
    line: "Slack bots and local operators that file, draft, or hand off a task. Not chat for chat's sake.",
  },
  {
    title: "Secrets handling",
    line: "Credentials stay out of prompts, logs, and anything a client can see.",
  },
  {
    title: "Web tools",
    line: "Landing pages and internal tools when a site is the product.",
  },
  {
    title: "Later",
    line: "Restaurant-station training built from real layouts.",
  },
] as const;

export const howWeWork =
  "AI can be wrong. Review is part of the design. If a process is repeated and costly, we can usually turn it into a system. If it should stay manual, we say so.";

export const toolsPlaceholder = "Tools and products will be listed here.";

export const blogPlaceholder = "Posts will be listed here.";

export const pricing = {
  heading: "Pricing",
  scheduleHref: "/#schedule",
  rateLine: "$188/hr base, extra $235/hr",
  tools: {
    name: "Tools",
    description: "Buy a tool.",
    buttonLabel: "View tools",
    buttonHref: "/tools",
  },
  medium: {
    name: "Medium",
    description: "16 hours / month",
    price: "$3,008 / month",
  },
  heavy: {
    name: "Heavy",
    description: "40 hours / month",
    price: "$7,520 / month",
  },
  custom: {
    name: "Custom",
    description: "TBD",
  },
} as const;
