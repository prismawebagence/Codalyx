import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("pro")!;

export const metadata: Metadata = {
  title: `${offer.name} — 2 490€ net | Site premium + SEO | PrismaWeb`,
  description:
    "Site jusqu’à 15 pages, blog SEO, animations, performance Lighthouse > 90. Le niveau d’une agence parisienne pour 2 490€ net.",
};

const jsonLd = buildOfferJsonLd(offer);

export default function ProPage() {
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
