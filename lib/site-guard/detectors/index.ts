import type { CrawlResult, Detector, Flag } from "../types";
import { detectAdPixel } from "./ad-pixel";
import { detectAltMissing } from "./alt-missing";
import { detectAutoRenew } from "./auto-renew";
import { detectCaptionlessVideo } from "./captionless-video";
import { detectContrast } from "./contrast";
import { detectGpc } from "./gpc";
import { detectMadeInUsa } from "./made-in-usa";
import { detectOverlay } from "./overlay";
import { detectPdfLink } from "./pdf-link";
import { detectPrivacyMissing } from "./privacy-missing";
import { detectProp65Warning } from "./prop65-warning";
import { detectSessionReplay } from "./session-replay";
import { detectTcpaPhone } from "./tcpa-phone";
import { detectThirdPartyChat } from "./third-party-chat";
import { detectTrackersBeforeConsent } from "./trackers-before-consent";
import { detectUnlabeledField } from "./unlabeled-field";
import { detectVideoPixel } from "./video-pixel";
import { detectWebfont } from "./webfont";

export const DETECTORS: Detector[] = [
  detectAltMissing,
  detectContrast,
  detectUnlabeledField,
  detectOverlay,
  detectPrivacyMissing,
  detectGpc,
  detectTrackersBeforeConsent,
  detectAdPixel,
  detectSessionReplay,
  detectThirdPartyChat,
  detectVideoPixel,
  detectTcpaPhone,
  detectAutoRenew,
  detectCaptionlessVideo,
  detectWebfont,
  detectPdfLink,
  detectProp65Warning,
  detectMadeInUsa,
];

export function runDetectors(result: CrawlResult): Flag[] {
  return DETECTORS.flatMap((detect) => detect(result));
}
