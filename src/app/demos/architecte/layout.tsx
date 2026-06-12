import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, Space_Mono } from "next/font/google";
import DemoBanner from "./DemoBanner";
import AtelierShell from "./AtelierShell";

const bricolage = Bricolage_Grotesque({
  variable: "--font-archi-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-archi-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-archi-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Vauban — Architecture & Territoire à Strasbourg · Démo PrismaWeb",
  description:
    "Cabinet d'architecture fictif à Strasbourg. Site de démonstration créé par PrismaWeb pour illustrer l'offre Pack Pro : multi-pages, journal, prise de rendez-vous et animations.",
  robots: { index: false, follow: false },
};

export default function ArchitecteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`architecte-rm ${bricolage.variable} ${newsreader.variable} ${spaceMono.variable} flex min-h-full flex-col bg-[#E8E9E6] text-[#17181C]`}
      style={{ fontFamily: "var(--font-archi-body)" }}
    >
      {/* Accessibilité + robustesse : si l'utilisateur a activé « mouvement
          réduit », framer-motion n'anime pas les entrées et le contenu resterait
          bloqué à opacity:0. Cette règle force toute entrée masquée à redevenir
          visible (override de la valeur inline de framer). */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .architecte-rm [style*="opacity"] {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <DemoBanner />
      <AtelierShell>{children}</AtelierShell>
    </div>
  );
}
