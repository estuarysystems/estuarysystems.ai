import type { ReactNode } from "react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-nunito",
});

export default function GlossaryLayout({ children }: { children: ReactNode }) {
  return <div className={nunito.variable}>{children}</div>;
}
