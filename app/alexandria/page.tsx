import type { Metadata } from "next";
import { AlexandriaLibrary } from "@/components/alexandria-library";

export const metadata: Metadata = {
  title: "Alexandria",
};

export default function AlexandriaPage() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h1 className="text-6xl font-medium tracking-tight md:text-8xl">Alexandria</h1>
        <AlexandriaLibrary />
      </div>
    </main>
  );
}
