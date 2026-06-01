import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
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
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO. PrismaWeb accompagne les entreprises en Alsace dans leur transformation digitale.",
  keywords: [
    "création site internet Strasbourg",
    "agence web Alsace",
    "développement web Strasbourg",
    "agence digitale Strasbourg",
    "site vitrine Strasbourg",
    "SEO Strasbourg",
  ],
  openGraph: {
    title: "Agence Web Strasbourg | PrismaWeb",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO et stratégie digitale pour les entreprises en Alsace.",
    url: "https://prismaweb.fr",
    siteName: "PrismaWeb",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PrismaWeb — Agence Web Strasbourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Web Strasbourg | PrismaWeb",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO et stratégie digitale pour les entreprises en Alsace.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
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
