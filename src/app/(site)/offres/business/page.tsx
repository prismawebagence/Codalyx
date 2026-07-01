import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("business")!;

export const metadata: Metadata = {
  title: `${offer.name} — 1 490€ net | Site CMS à Strasbourg | PrismaWeb`,
  description:
    "Site jusqu’à 8 pages avec CMS Sanity : gérez vos textes et photos depuis votre téléphone. Optimisé SEO local, livré en 10 à 14 jours à Strasbourg. 1 490€ net de TVA.",
  alternates: { canonical: "/offres/business" },
  openGraph: {
    title: "Site Business avec CMS à Strasbourg — 1 490€ net | PrismaWeb",
    description:
      "Site jusqu’à 8 pages avec CMS Sanity intégré : modifiez vos contenus depuis votre téléphone. Livré en 10 à 14 jours. 1 490€ net.",
    url: "https://prismaweb.fr/offres/business",
    type: "website",
  },
};

const jsonLd = buildOfferJsonLd(offer);

export default function BusinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OfferDetail offer={offer} />
    </>
  );
}
