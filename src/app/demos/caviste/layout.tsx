import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import DemoBanner from "./DemoBanner";
import { CartProvider } from "./CartContext";
import CavisteShell from "./CavisteShell";

const playfair = Playfair_Display({
  variable: "--font-caviste-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-caviste-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Cave du Sommelier — Vins d'Exception à Strasbourg · Démo PrismaWeb",
  description:
    "Caviste premium fictif à Strasbourg. Site de démonstration créé par PrismaWeb pour illustrer la création de boutiques e-commerce de luxe.",
  robots: { index: false, follow: false },
};

export default function CavisteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${cormorant.variable} min-h-full bg-[#0D0D0D] text-[#F5F0E8]`}
    >
      <DemoBanner />
      <CartProvider>
        <CavisteShell>{children}</CavisteShell>
      </CartProvider>
    </div>
  );
}
