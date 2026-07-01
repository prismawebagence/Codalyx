import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("pro")!;

export const metadata: Metadata = {
  title: `${offer.name} — 2 490€ net | Site premium + SEO à Strasbourg | PrismaWeb`,
  description:
    "Site premium jusqu’à 15 pages, blog SEO, animations et performance Lighthouse > 90. Le niveau d’une agence parisienne, à Strasbourg, pour 2 490€ net de TVA.",
  alternates: { canonical: "/offres/pro" },
  openGraph: {
    title: "Site Pro premium + SEO à Strasbourg — 2 490€ net | PrismaWeb",
    description:
      "Site jusqu’à 15 pages, blog SEO, animations, performance Lighthouse > 90. Le niveau d’une agence parisienne pour 2 490€ net.",
    url: "https://prismaweb.fr/offres/pro",
    type: "website",
  },
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
