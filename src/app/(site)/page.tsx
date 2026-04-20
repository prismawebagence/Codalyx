import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problems from "@/components/sections/Problems";
import OffersGrid from "@/components/sections/OffersGrid";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import FAQ from "@/components/sections/FAQ";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Combien de temps faut-il pour créer mon site ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le délai dépend de la formule choisie : environ 2 semaines pour l'Essentiel, 3 semaines pour le Pro et 4 à 5 semaines pour le Premium.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce que je suis propriétaire de mon site ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, à 100%. Le code source, le contenu et le nom de domaine vous appartiennent.",
          },
        },
        {
          "@type": "Question",
          name: "Puis-je résilier l'abonnement mensuel ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, l'abonnement est sans engagement. Vous pouvez résilier à tout moment avec un préavis de 30 jours.",
          },
        },
      ],
    }),
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problems />
      <OffersGrid />
      <Process />
      <Portfolio />
      <FAQ />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
