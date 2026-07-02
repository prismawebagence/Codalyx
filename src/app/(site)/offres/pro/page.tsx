import type { Metadata } from "next";
import OfferDetail from "@/components/sections/OfferDetail";
import { buildOfferJsonLd, getOffer } from "@/lib/offers";
import { OG_IMAGE, buildBreadcrumbJsonLd } from "@/lib/seo";

const offer = getOffer("pro")!;

export const metadata: Metadata = {
  title: `${offer.name} — Site premium + SEO à Strasbourg | PrismaWeb`,
  description:
    "Site premium jusqu’à 15 pages, blog SEO, animations et performance Lighthouse > 90. Le niveau d’une agence parisienne, à Strasbourg, pour 2 490 € net.",
  alternates: { canonical: "/offres/pro" },
  openGraph: {
    title: "Site Pro premium + SEO à Strasbourg — 2 490 € net | PrismaWeb",
    description:
      "Site jusqu’à 15 pages, blog SEO, animations, performance Lighthouse > 90. Le niveau d’une agence parisienne pour 2 490 € net.",
    url: "https://prismaweb.fr/offres/pro",
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

export default function ProPage() {
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
