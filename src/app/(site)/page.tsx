import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { OG_IMAGE } from "@/lib/seo";
import { faqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Création de site internet à Strasbourg | Agence web PrismaWeb",
  description:
    "Sites internet rapides et optimisés SEO pour artisans, commerçants et PME de Strasbourg et d'Alsace. Vitrine ou sur-mesure, clé en main dès 790 €.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Création de site internet à Strasbourg | PrismaWeb",
    description:
      "Sites internet performants et optimisés SEO pour les entreprises de Strasbourg et d'Alsace. Livraison rapide, prix transparents dès 790 €.",
    url: "https://prismaweb.fr",
    type: "website",
    images: OG_IMAGE,
  },
  other: {
    "script:ld+json": JSON.stringify(faqJsonLd),
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problems />
      <Process />
      <Portfolio />
      <FAQ />
      <FinalCTA />
    </>
  );
}
