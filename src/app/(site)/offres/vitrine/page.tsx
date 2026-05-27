import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("vitrine")!;

export const metadata: Metadata = {
  title: `${offer.name} — 790€ net | Site vitrine Strasbourg | Codalyx`,
  description:
    "Site vitrine professionnel 3 à 5 pages, responsive, livré en 5 à 7 jours. Hébergement Vercel inclus à vie. 790€ net de TVA.",
};

const jsonLd = buildOfferJsonLd(offer);

export default function VitrinePage() {
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
