import type { Flag, FlagId } from "./types";

export const FOOTER_DISCLAIMER =
  "This tool flags publicly visible website patterns that have been associated with US demand letters, private suits, or agency actions. It is not legal advice, not a finding that you have violated any law, and not a prediction that you will be sued. It is not a law firm. Accessibility findings describe possible barriers that can also be genuine access problems for people with disabilities. Consult a licensed attorney about your facts.";

export const NOT_LEGAL_ADVICE =
  "This is not legal advice. Estuary Systems LLC is not a law firm. Findings are risk signals to review.";

export const EMPTY_FLAGS_MESSAGE = "no v1 signals on crawled pages";

export const SITE_GUARD_NAME = "Site Guard";

export const SITE_GUARD_ONE_LINE =
  "Paste a public website URL and get a punch list of risk signals to review.";

export const CATALOG: Record<
  FlagId,
  { title: string; catalog_ref: number; why: string; guard: string }
> = {
  "alt-missing": {
    title: "Missing image alternative text",
    catalog_ref: 1,
    why: "A screen-reader visitor cannot understand images, buttons, or linked graphics with no text alternative.",
    guard:
      "Every meaningful <img> has a short, accurate alt. Decorative images use empty alt=\"\". Linked images and icon buttons describe the destination or action. Re-check after CMS and marketing uploads.",
  },
  contrast: {
    title: "Insufficient color contrast",
    catalog_ref: 3,
    why: "Low-vision visitors cannot read prices, labels, errors, or links when foreground/background contrast is too low.",
    guard:
      "Body and UI text meets WCAG 2.1 AA contrast. Do not use placeholder text as the only label. Check hover, disabled, and error states, not just default CSS.",
  },
  "unlabeled-field": {
    title: "Unlabeled form fields and checkout errors",
    catalog_ref: 4,
    why: "Screen-reader users cannot tell what a field is asking for or complete an order, booking, or lead form independently.",
    guard:
      "Every input has a visible <label> (or equivalent aria-labelledby). Errors are text, not color-only, and are tied to the field. Required fields are identified in text.",
  },
  overlay: {
    title: "Accessibility overlay / “compliance widget”",
    catalog_ref: 7,
    why: "Overlays are trivial to detect, do not produce WCAG conformance by themselves, and can interfere with screen readers. An overlay is not a safe harbor.",
    guard:
      "Do not treat a widget as compliance. Remediate the underlying HTML/CSS/JS. If a widget is present, test with actual assistive technology; remove it if it conflicts with screen readers. Do not advertise the site as “ADA compliant” based on a widget.",
  },
  "privacy-missing": {
    title: "Missing or hidden privacy policy",
    catalog_ref: 20,
    why: "A commercial site that collects personal information from California residents is expected to conspicuously post a privacy policy.",
    guard:
      "Footer link whose visible text includes “Privacy.” Policy lists categories collected, third parties, effective date, and how it is updated.",
  },
  gpc: {
    title: "Missing “Do Not Sell or Share” / ignored GPC",
    catalog_ref: 21,
    why: "Covered businesses that sell or share personal information for cross-context ads are expected to offer an opt-out link and honor Global Privacy Control.",
    guard:
      "If you sell/share PI (including many ad-pixel setups), put the required link in the header or footer and honor GPC as an opt-out. Confirm whether you meet CCPA “business” thresholds before claiming an exemption.",
  },
  "trackers-before-consent": {
    title: "Consent banner that does not block tracking",
    catalog_ref: 22,
    why: "A banner that appears after pixels already fired is treated as no consent.",
    guard:
      "A real consent manager that blocks marketing and replay scripts until opt-in (or until GPC/opt-out is processed). Reject must stick. Re-test in a clean browser.",
  },
  "ad-pixel": {
    title: "Ad pixels",
    catalog_ref: 15,
    why: "Advertising pixels that record IP, device identifiers, and routing data are the stack used in website-tracking demand letters.",
    guard:
      "Inventory pixels. Obtain consent before pixels fire. Honor Global Privacy Control. Minimize identifiers sent to ad platforms.",
  },
  "session-replay": {
    title: "Session-replay tools",
    catalog_ref: 13,
    why: "Tools that record clicks, mouse moves, keystrokes, or page content and send a reconstructable session to a vendor are the stack used in session-replay letters.",
    guard:
      "Inventory replay tools. Do not load them until the visitor consents. Suppress keystroke capture on forms. Do not rely on a footer privacy policy clicked after recording starts.",
  },
  "third-party-chat": {
    title: "Third-party chat",
    catalog_ref: 14,
    why: "A third-party live-chat or chatbot vendor can intercept messages in real time without notice before the first keystroke.",
    guard:
      "Show a consent/notice before the chat loads or the first keystroke is sent. Disclose the vendor by name. Offer a first-party email form as an alternative.",
  },
  "video-pixel": {
    title: "Video plus ad pixel",
    catalog_ref: 16,
    why: "Sending a persistent ad ID plus a video title or URL is the fact pattern used in VPPA pixel letters.",
    guard:
      "On pages that play prerecorded video, do not fire ad pixels that include video title, URL, or watch events plus a persistent ID. Use a separate video path without marketing pixels, or gate pixels behind specific consent.",
  },
  "tcpa-phone": {
    title: "TCPA phone-field gap",
    catalog_ref: 42,
    why: "Lead forms that collect a number and then send marketing calls or texts are a frequent TCPA fact pattern when consent is hidden or missing.",
    guard:
      "Unchecked checkbox. Full TCPA language above the submit button, in readable type, naming the seller(s). Consent not required to get the content.",
  },
  "auto-renew": {
    title: "Auto-renew / trial checkout copy",
    catalog_ref: 34,
    why: "Subscription and free-trial checkouts that hide renewal price or cancel path are a recurring consumer-protection pattern.",
    guard:
      "Renewal terms in visual proximity to the consent button. No pre-checked “subscribe.” Post-purchase email with terms and cancel instructions is off-scan; on-page, keep price-after-trial and cancel language next to submit.",
  },
  "captionless-video": {
    title: "Videos without accurate captions",
    catalog_ref: 6,
    why: "A deaf or hard-of-hearing visitor cannot use product or how-to video that has no working captions.",
    guard:
      "Every prerecorded video that carries information has human-reviewed closed captions. The CC control works. Do not show a CC badge unless captions exist.",
  },
  webfont: {
    title: "Commercial @font-face",
    catalog_ref: 29,
    why: "Font software embedded via @font-face under a desktop license (or past a pageview cap) is a known audit/demand-letter pattern.",
    guard:
      "Inventory every custom font. Confirm a web license that covers the domain and traffic. Prefer open-licensed fonts or a foundry web subscription. Do not copy .woff files from another site.",
  },
  "pdf-link": {
    title: "Inaccessible PDFs and downloadable documents",
    catalog_ref: 5,
    why: "Untagged PDFs posted as the real menu, application, or product sheet can be unreadable to screen readers.",
    guard:
      "Prefer HTML for anything a customer must read to transact. If a PDF stays up, tag it and offer an accessible HTML alternative next to the download.",
  },
  "prop65-warning": {
    title: "Missing Proposition 65 web warning",
    catalog_ref: 44,
    why: "Products sold to California through a site may need a clear warning on the product page before purchase when a listed chemical is involved.",
    guard:
      "If you sell physical goods into California, put the safe-harbor warning on the product page before add-to-cart, not only in a sitewide footer.",
  },
  "made-in-usa": {
    title: "Unqualified “Made in USA” claims",
    catalog_ref: 46,
    why: "Unqualified “Made in USA” claims on product pages are an advertising-claim pattern when the product is not all or virtually all made in the United States.",
    guard:
      "Use “Made in USA” only when you can substantiate all-or-virtually-all. Otherwise qualify (“Assembled in USA with imported parts”).",
  },
};

export function makeFlag(id: FlagId, evidence: string): Flag {
  const item = CATALOG[id];
  return {
    id,
    title: item.title,
    severity: "signal",
    evidence,
    guard: item.guard,
    catalog_ref: item.catalog_ref,
  };
}

const FORBIDDEN = [
  /you will be sued/i,
  /\bliable\b/i,
  /\bviolation\b/i,
  /\bnon-compliant\b/i,
  /liability score/i,
  /\$\d/,
];

export function isPublicSafe(text: string): boolean {
  return !FORBIDDEN.some((pattern) => pattern.test(text));
}
