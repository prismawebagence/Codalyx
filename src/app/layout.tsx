import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { OG_IMAGE, OG_IMAGE_TWITTER } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prismaweb.fr"),
  title: "Agence Web Strasbourg | Création de Sites Internet | PrismaWeb",
  description:
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO. PrismaWeb accompagne les artisans, commerçants et PME d'Alsace dans leur présence en ligne.",
  applicationName: "PrismaWeb",
  authors: [{ name: "Enzo Galle", url: "https://prismaweb.fr/a-propos" }],
  creator: "PrismaWeb",
  publisher: "PrismaWeb",
  category: "Agence web",
  keywords: [
    "création site internet Strasbourg",
    "agence web Strasbourg",
    "agence web Alsace",
    "développement web Strasbourg",
    "création site vitrine Strasbourg",
    "création site internet artisan",
    "site internet commerçant Strasbourg",
    "SEO local Strasbourg",
    "référencement Google Strasbourg",
  ],
  openGraph: {
    title: "Agence Web Strasbourg | PrismaWeb",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO local et présence en ligne pour les artisans, commerçants et PME d'Alsace.",
    url: "https://prismaweb.fr",
    siteName: "PrismaWeb",
    locale: "fr_FR",
    type: "website",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Web Strasbourg | PrismaWeb",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO local et présence en ligne pour les entreprises d'Alsace.",
    images: OG_IMAGE_TWITTER,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Signaux géographiques pour le SEO local (Strasbourg, Bas-Rhin).
  other: {
    "geo.region": "FR-67",
    "geo.placename": "Strasbourg",
    "geo.position": "48.5734;7.7521",
    ICBM: "48.5734, 7.7521",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${GeistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
