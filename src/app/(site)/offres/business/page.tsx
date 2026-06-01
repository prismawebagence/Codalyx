import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("business")!;

export const metadata: Metadata = {
  title: `${offer.name} — 1 490€ net | Site CMS Sanity | PrismaWeb`,
  description:
    "Site jusqu’à 8 pages avec CMS Sanity intégré : vous gérez vos textes et photos depuis votre téléphone. Livré en 10 à 14 jours. 1 490€ net.",
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
