import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { delaysSummary, maintenances } from "@/lib/offers";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour créer mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Le délai dépend de la formule : ${delaysSummary}.`,
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que je suis propriétaire de mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, à 100 %. Le code source, le contenu et les accès Vercel/GitHub vous sont transférés après paiement intégral.",
      },
    },
    {
      "@type": "Question",
      name: "La maintenance est-elle obligatoire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Non. La ${maintenances[0].name} (${maintenances[0].priceFormatted} €/mois) et la ${maintenances[1].name} (${maintenances[1].priceFormatted} €/mois) sont optionnelles, sans engagement, résiliables avec 30 jours de préavis.`,
      },
    },
  ],
};

export const metadata: Metadata = {
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
