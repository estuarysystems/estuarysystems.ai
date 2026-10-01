import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DraftingBoard } from "@/components/drafting-board";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homeQuestion, site } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.wordmark,
    template: `%s · ${site.wordmark}`,
  },
  description: homeQuestion,
  metadataBase: new URL("https://estuarysystems.ai"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-paper text-ink">
        <DraftingBoard />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
