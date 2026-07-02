import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";
import { OG_IMAGE, buildBreadcrumbJsonLd } from "@/lib/seo";

const offer = getOffer("business")!;

export const metadata: Metadata = {
  title: `${offer.name} — Site CMS à Strasbourg | PrismaWeb`,
  description:
    "Site jusqu’à 8 pages avec CMS Sanity : gérez textes et photos depuis votre téléphone. Optimisé SEO local à Strasbourg, livré en 10 à 14 jours. 1 490 € net.",
  alternates: { canonical: "/offres/business" },
  openGraph: {
    title: "Site Business avec CMS à Strasbourg — 1 490 € net | PrismaWeb",
    description:
      "Site jusqu’à 8 pages avec CMS Sanity intégré : modifiez vos contenus depuis votre téléphone. Livré en 10 à 14 jours. 1 490 € net.",
    url: "https://prismaweb.fr/offres/business",
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

export default function BusinessPage() {
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
