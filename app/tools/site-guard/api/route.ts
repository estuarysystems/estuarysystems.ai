import { NextResponse } from "next/server";
import { validateStartUrl } from "@/lib/site-guard/crawl";
import { scanUrl } from "@/lib/site-guard/scan";
import { FOOTER_DISCLAIMER } from "@/lib/site-guard/wording";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send JSON: { \"url\": \"https://example.com\" }", disclaimer: FOOTER_DISCLAIMER },
      { status: 400 },
    );
  }

  const url = typeof body === "object" && body && "url" in body ? String((body as { url: unknown }).url) : "";
  const checked = validateStartUrl(url);
  if (!checked.ok) {
    return NextResponse.json(
      {
        url,
        crawled: [],
        pages: [],
        systemFlags: [{ id: "could-not-fetch", message: checked.error }],
        flags: [],
        disclaimer: FOOTER_DISCLAIMER,
      },
      { status: 400 },
    );
  }

  const result = await scanUrl(checked.url.href);
  return NextResponse.json(result);
}
