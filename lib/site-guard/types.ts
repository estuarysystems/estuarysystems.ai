export type FlagSeverity = "signal";

export type FlagId =
  | "alt-missing"
  | "contrast"
  | "unlabeled-field"
  | "overlay"
  | "privacy-missing"
  | "gpc"
  | "trackers-before-consent"
  | "ad-pixel"
  | "session-replay"
  | "third-party-chat"
  | "video-pixel"
  | "tcpa-phone"
  | "auto-renew"
  | "captionless-video"
  | "webfont"
  | "pdf-link"
  | "prop65-warning"
  | "made-in-usa";

export type Flag = {
  id: FlagId;
  title: string;
  severity: FlagSeverity;
  evidence: string;
  guard: string;
  catalog_ref: number;
};

export type CrawledPage = {
  url: string;
  html?: string;
  status?: number;
  scriptHosts?: string[];
  networkHosts?: string[];
  gpcNetworkHosts?: string[];
};

export type SystemFlag = {
  id: string;
  message: string;
};

export type CrawlResult = {
  url: string;
  crawled: string[];
  pages: CrawledPage[];
  systemFlags?: SystemFlag[];
  flags: Flag[];
  disclaimer: string;
};

export type Detector = (result: CrawlResult) => Flag[];
