import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Codalyx",
  description:
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO.",
  url: "https://codalyx.fr",
  telephone: "+33 7 71 65 75 28",
  email: "contact@codalyx.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 Rue Relinde",
    addressLocality: "Strasbourg",
    postalCode: "67200",
    addressRegion: "Grand Est",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.5834,
    longitude: 7.7521,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/codalyx",
    "https://www.instagram.com/codalyx",
  ],
  image: "https://codalyx.fr/og-image.jpg",
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
