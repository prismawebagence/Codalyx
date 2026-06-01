import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import DemoBanner from "./DemoBanner";

const fraunces = Fraunces({
  variable: "--font-osteo-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-osteo-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Méridien — Ostéopathie à Lyon · Démo PrismaWeb",
  description:
    "Site de démonstration créé par PrismaWeb. Cabinet d'ostéopathie fictif à vocation illustrative.",
  robots: { index: false, follow: false },
};

export default function OsteopatheDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} flex min-h-full flex-col bg-[#F5F1EA] text-[#1A1F1B]`}
      style={{ fontFamily: "var(--font-osteo-body)" }}
    >
      <DemoBanner />
      {children}
    </div>
  );
}
