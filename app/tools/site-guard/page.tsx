import type { Metadata } from "next";
import {
  FOOTER_DISCLAIMER,
  NOT_LEGAL_ADVICE,
  SITE_GUARD_NAME,
  SITE_GUARD_ONE_LINE,
} from "@/lib/site-guard/wording";
import { ScannerForm } from "./scanner-form";

export const metadata: Metadata = {
  title: SITE_GUARD_NAME,
  description: `${SITE_GUARD_ONE_LINE} ${NOT_LEGAL_ADVICE}`,
};

export default function SiteGuardPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">{SITE_GUARD_NAME}</h1>
        <p className="max-w-2xl text-lg text-muted">{SITE_GUARD_ONE_LINE}</p>
        <p className="max-w-2xl text-sm text-muted">{NOT_LEGAL_ADVICE}</p>
        <ScannerForm />
        <p className="max-w-2xl text-sm text-muted">{FOOTER_DISCLAIMER}</p>
      </div>
    </main>
  );
}
