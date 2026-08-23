export const OVERLAY_HOSTS = [
  "accessibe.com",
  "acsbapp.com",
  "userway.org",
  "cdn.userway.org",
  "audioeye.com",
  "ws.audioeye.com",
  "equalweb.com",
  "nagich.com",
  "nagich.co.il",
  "maxaccess.io",
  "maxaccess.com",
  "user1st.info",
  "accessi.be",
];

export const AD_PIXEL_HOSTS = [
  "connect.facebook.net",
  "facebook.net",
  "facebook.com",
  "fbcdn.net",
  "analytics.tiktok.com",
  "ads.tiktok.com",
  "sc-static.net",
  "tr.snapchat.com",
  "sc-static.net",
  "snap.licdn.com",
  "px.ads.linkedin.com",
  "googleadservices.com",
  "googlesyndication.com",
  "doubleclick.net",
  "googleads.g.doubleclick.net",
  "pagead2.googlesyndication.com",
  "adservice.google.com",
  "triplelift.com",
  "adsrvr.org",
  "insight.adsrvr.org",
  "bat.bing.com",
  "ads-twitter.com",
  "static.ads-twitter.com",
  "pinterest.com",
  "ct.pinterest.com",
  "pinimg.com",
  "taboola.com",
  "outbrain.com",
  "criteo.com",
  "criteo.net",
];

export const REPLAY_HOSTS = [
  "fullstory.com",
  "edge.fullstory.com",
  "rs.fullstory.com",
  "hotjar.com",
  "static.hotjar.com",
  "script.hotjar.com",
  "clarity.ms",
  "www.clarity.ms",
  "scripts.clarity.ms",
  "contentsquare.net",
  "t.contentsquare.net",
  "luckyorange.com",
  "tools.luckyorange.com",
  "mouseflow.com",
  "cdn.mouseflow.com",
  "inspectlet.com",
  "cdn.inspectlet.com",
  "smartlook.com",
  "rec.smartlook.com",
  "logrocket.com",
  "cdn.lr-ingest.io",
  "lr-ingest.io",
];

export const CHAT_HOSTS = [
  "widget.intercom.io",
  "js.intercomcdn.com",
  "intercom.io",
  "js.driftt.com",
  "driftt.com",
  "static.zdassets.com",
  "ekr.zdassets.com",
  "zendesk.com",
  "lptag.liveperson.net",
  "lpsnmedia.net",
  "liveperson.net",
  "c.la1-c2-iaq.salesforceliveagent.com",
  "service.force.com",
  "kasistatic.com",
  "kustomerapp.com",
  "gorgias.chat",
  "config.gorgias.chat",
  "code.tidio.co",
  "tidio.co",
  "client.crisp.chat",
  "crisp.chat",
  "embed.tawk.to",
  "tawk.to",
  "js.hs-scripts.com",
  "js.hscollectedforms.net",
  "js.hubspot.com",
];

export const MARKETING_HOSTS = [
  ...AD_PIXEL_HOSTS,
  ...REPLAY_HOSTS,
  "googletagmanager.com",
  "www.googletagmanager.com",
  "google-analytics.com",
  "www.google-analytics.com",
  "analytics.google.com",
  "stats.g.doubleclick.net",
  "adsystem.com",
  "amazon-adsystem.com",
  "scorecardresearch.com",
  "quantserve.com",
  "segment.io",
  "cdn.segment.com",
  "api.segment.io",
  "cdn.mxpnl.com",
  "api.mixpanel.com",
  "cdn.heapanalytics.com",
  "heapanalytics.com",
];

export const LICENSED_FONT_CDNS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "use.typekit.net",
  "use.typekit.com",
  "p.typekit.net",
  "fast.fonts.net",
  "fast.fonts.com",
  "use.fontawesome.com",
  "kit.fontawesome.com",
  "ka-f.fontawesome.com",
  "fonts.adobe.com",
];

export const COMMERCIAL_FONT_FAMILIES = [
  "helvetica",
  "helvetica neue",
  "gotham",
  "gotham bold",
  "proxima",
  "proxima nova",
  "avenir",
  "avenir next",
  "futura",
  "gill sans",
  "frutiger",
  "univers",
  "brandon",
  "brandon grotesque",
  "circular",
  "neue haas",
  "trade gothic",
  "franklin gothic",
  "myriad",
  "minion",
  "adobe garamond",
  "neutraface",
  "museo",
  "din ",
  "din-",
  "itc ",
];

export function hostMatches(host: string, list: readonly string[]): string | null {
  const lower = host.toLowerCase();
  for (const item of list) {
    if (lower === item || lower.endsWith(`.${item}`)) {
      return item;
    }
  }
  return null;
}

export function hostsFromList(
  hosts: Iterable<string> | undefined,
  list: readonly string[],
): string[] {
  const found = new Set<string>();
  for (const host of hosts ?? []) {
    const match = hostMatches(host, list);
    if (match) found.add(host);
  }
  return [...found];
}
