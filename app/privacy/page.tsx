import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return <LegalPage title={privacy.title} sections={privacy.sections} />;
}
