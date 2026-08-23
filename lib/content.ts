export const site = {
  wordmark: "Estuary Systems",
  legalName: "Estuary Systems LLC",
  domain: "estuarysystems.ai",
  tagline:
    "Connecting businesses with technology so people can focus on being people.",
  scheduleLabel: "Schedule time to chat with George",
  scheduleHref: "/connect",
  calEmbedSrc: "https://cal.com/george-lu-ouzdmq/15min?embed=true&theme=light",
  workWithMe: "Work with me",
  ctaLabel: "Start a conversation",
  ctaHint: "Show us where you’re stuck.",
} as const;

export const bio =
  "Hi, I’m George. I work at the intersection of business and engineering to bring execution to you and your team. Let me review your systems with you and see how I can help.";

export const aboutAgency =
  "George Lu runs Estuary Systems LLC in Palo Alto. We are an AI integration and consulting agency. We help businesses put AI into operations so people can stay on the work only people should do.";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/alexandria", label: "Alexandria" },
  { href: "/connect", label: "Connect" },
] as const;

export const walk = [
  {
    title: "Discover",
    line: "We sit with how the work runs today, before anyone changes it.",
  },
  {
    title: "Design",
    line: "We pick one process and write what done looks like.",
  },
  {
    title: "Build",
    line: "We make the smallest version that can actually run.",
  },
  {
    title: "Eval",
    line: "You review the output. We keep it, change it, or stop.",
  },
] as const;

export const firstTwoWeeks = {
  heading: "First two weeks",
  intro:
    "What the first two weeks look like. This is a story, not an offer. Not a product. Not priced. No buy button.",
  days: [
    "Day 1. We walk the current process with you.",
    "Day 2. We write down the steps and who touches each one.",
    "Day 3. We name the one process we will try first.",
    "Day 4. We write the target: inputs, output, who checks it.",
    "Day 5. We cut anything that should not exist.",
    "Day 6. We agree the smallest version we can run.",
    "Day 7. We stand up a test lane. It does not touch live work.",
    "Day 8. We wire the first handoff.",
    "Day 9. We put a person on the output before it goes anywhere.",
    "Day 10. We run it on a handful of real examples you already have.",
    "Day 11. We fix what broke.",
    "Day 12. You read the outputs.",
    "Day 13. We compare them to the old way on the same examples.",
    "Day 14. We decide: keep, change, or stop.",
  ],
} as const;

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
  tools: "Site Guard",
} as const;

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

export const toolsPlaceholder = "Site Guard is listed on /tools.";

export const blogPlaceholder = "Posts will be listed here.";

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
      paragraphs: ["Estuary Systems LLC is an AI agency in the Bay Area."],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "We collect what you type and what Cal.com/hosting need to book a chat and run the site.",
      ],
    },
    {
      heading: "What we don't",
      paragraphs: [
        "We do not sell personal information.",
        "We do not use confidential materials you send us to train models.",
      ],
    },
    {
      heading: "Who sees it",
      paragraphs: ["Cal.com is a processor for booking. The host runs the site."],
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
      heading: "Site is not a contract",
      paragraphs: ["Prices can change. A listed price is not an offer."],
    },
    {
      heading: "Booking is not engagement",
      paragraphs: [
        "A Cal.com chat is not a client relationship. Work starts when both sides sign.",
      ],
    },
    {
      heading: "IP",
      paragraphs: [
        "Site content is ours. Your materials stay yours until a signed SOW says otherwise.",
      ],
    },
    {
      heading: "AI can be wrong",
      paragraphs: ["AI output can be wrong. You verify before you use it."],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Liability capped at fees you actually paid us. If you paid zero, that's the cap.",
      ],
    },
    {
      heading: "California",
      paragraphs: ["California law. Bay Area venue."],
    },
  ],
} as const;
