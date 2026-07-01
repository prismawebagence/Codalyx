import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";

const offer = getOffer("vitrine")!;

export const metadata: Metadata = {
  title: `${offer.name} — 790€ net | Site vitrine Strasbourg | PrismaWeb`,
  description:
    "Site vitrine professionnel 3 à 5 pages, responsive et optimisé SEO local, livré en 5 à 7 jours. Idéal artisans et commerçants de Strasbourg. Hébergement inclus. 790€ net de TVA.",
  alternates: { canonical: "/offres/vitrine" },
  openGraph: {
    title: "Site vitrine à Strasbourg — 790€ net | PrismaWeb",
    description:
      "Site vitrine professionnel 3 à 5 pages, responsive, optimisé SEO local, livré en 5 à 7 jours. Hébergement inclus. 790€ net de TVA.",
    url: "https://prismaweb.fr/offres/vitrine",
    type: "website",
  },
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
