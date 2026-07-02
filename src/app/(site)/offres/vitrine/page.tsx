import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";
import { OG_IMAGE, buildBreadcrumbJsonLd } from "@/lib/seo";

const offer = getOffer("vitrine")!;

export const metadata: Metadata = {
  title: `${offer.name} — Site vitrine à Strasbourg | PrismaWeb`,
  description:
    "Site vitrine pro 3 à 5 pages, responsive et optimisé SEO local à Strasbourg, livré en 5 à 7 jours. Hébergement inclus. 790 € net de TVA.",
  alternates: { canonical: "/offres/vitrine" },
  openGraph: {
    title: "Site vitrine à Strasbourg — 790 € net | PrismaWeb",
    description:
      "Site vitrine professionnel 3 à 5 pages, responsive, optimisé SEO local, livré en 5 à 7 jours. Hébergement inclus. 790 € net de TVA.",
    url: "https://prismaweb.fr/offres/vitrine",
    type: "website",
    images: OG_IMAGE,
  },
};

const jsonLd = buildOfferJsonLd(offer);
const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Accueil", url: "/" },
  { name: "Offres", url: "/offres" },
  { name: offer.name, url: offer.href },
]);

export default function VitrinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OfferDetail offer={offer} />
    </>
  );
}
