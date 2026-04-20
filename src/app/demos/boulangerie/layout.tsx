import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import DemoBanner from "./DemoBanner";
import { LocaleProvider } from "./LocaleProvider";

const syne = Syne({
  variable: "--font-demo-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-demo-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Farine — Démo Codalyx",
  description:
    "Site de démonstration créé par Codalyx. Entreprise fictive à vocation illustrative.",
  robots: { index: false, follow: false },
};

export default function BoulangerieDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <div
        className={`${syne.variable} ${spaceGrotesk.variable} flex min-h-full flex-col bg-[#F4F1EC] text-[#0A0A0A]`}
        style={{ fontFamily: "var(--font-demo-body)" }}
      >
        <DemoBanner />
        {children}
      </div>
    </LocaleProvider>
  );
}
