import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://prismaweb.fr/#business",
  name: "PrismaWeb",
  description:
    "Agence web à Strasbourg spécialisée dans la création de sites internet, le développement web et le référencement SEO local pour les artisans, commerçants et PME d'Alsace.",
  url: "https://prismaweb.fr",
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
    "Site e-commerce",
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
