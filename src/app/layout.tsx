import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webcraft-studio.fr"),
  title: "Agence Web Strasbourg | Création de Sites Internet | WebCraft Studio",
  description:
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO. WebCraft Studio accompagne les entreprises en Alsace dans leur transformation digitale.",
  keywords: [
    "création site internet Strasbourg",
    "agence web Alsace",
    "développement web Strasbourg",
    "agence digitale Strasbourg",
    "site vitrine Strasbourg",
    "SEO Strasbourg",
  ],
  openGraph: {
    title: "Agence Web Strasbourg | WebCraft Studio",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO et stratégie digitale pour les entreprises en Alsace.",
    url: "https://webcraft-studio.fr",
    siteName: "WebCraft Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WebCraft Studio — Agence Web Strasbourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Web Strasbourg | WebCraft Studio",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO et stratégie digitale pour les entreprises en Alsace.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "WebCraft Studio",
  description:
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO.",
  url: "https://webcraft-studio.fr",
  telephone: "+33 3 88 00 00 00",
  email: "contact@webcraft-studio.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 Place Kléber",
    addressLocality: "Strasbourg",
    postalCode: "67000",
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
    "https://www.linkedin.com/company/webcraft-studio",
    "https://www.instagram.com/webcraftstudio",
  ],
  image: "https://webcraft-studio.fr/og-image.jpg",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 grid-bg">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
