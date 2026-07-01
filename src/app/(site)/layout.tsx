import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { offers } from "@/lib/offers";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://prismaweb.fr/#business",
  name: "PrismaWeb",
  legalName: "Enzo Galle (PrismaWeb)",
  slogan: "Des sites internet clairs et rapides pour les entreprises d'Alsace.",
  description:
    "Agence web à Strasbourg spécialisée dans la création de sites internet, le développement web et le référencement SEO local pour les artisans, commerçants et PME d'Alsace.",
  url: "https://prismaweb.fr",
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    name: "Enzo Galle",
  },
  telephone: "+33771657528",
  email: "contact@prismaweb.fr",
  // Adresse non publique (activité exercée à domicile) — on déclare la ville
  // et la zone d'intervention plutôt qu'une rue précise.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Strasbourg",
    postalCode: "67000",
    addressRegion: "Grand Est",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Strasbourg" },
    { "@type": "AdministrativeArea", name: "Bas-Rhin" },
    { "@type": "AdministrativeArea", name: "Alsace" },
    { "@type": "Country", name: "France" },
  ],
  knowsAbout: [
    "Création de site internet",
    "Développement web",
    "Référencement SEO local",
    "Site vitrine",
    "Site avec gestion de contenu",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  image: "https://prismaweb.fr/opengraph-image",
  logo: "https://prismaweb.fr/icon.svg",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Virement bancaire, prélèvement SEPA",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Offres de création de site internet",
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.pitch,
      price: offer.price,
      priceCurrency: "EUR",
      url: `https://prismaweb.fr${offer.href}`,
      category: "Création de site internet",
    })),
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 grid-bg">{children}</main>
      <Footer />
    </>
  );
}
