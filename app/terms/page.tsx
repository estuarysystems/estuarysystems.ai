import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { terms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return <LegalPage title={terms.title} sections={terms.sections} />;
}
