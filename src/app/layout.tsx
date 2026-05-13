import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://codalyx.fr"),
  title: "Agence Web Strasbourg | Création de Sites Internet | Codalyx",
  description:
    "Agence web à Strasbourg spécialisée en création de site internet, développement web et SEO. Codalyx accompagne les entreprises en Alsace dans leur transformation digitale.",
  keywords: [
    "création site internet Strasbourg",
    "agence web Alsace",
    "développement web Strasbourg",
    "agence digitale Strasbourg",
    "site vitrine Strasbourg",
    "SEO Strasbourg",
  ],
  openGraph: {
    title: "Agence Web Strasbourg | Codalyx",
    description:
      "Création de sites internet sur-mesure à Strasbourg. Développement web, SEO et stratégie digitale pour les entreprises en Alsace.",
    url: "https://codalyx.fr",
    siteName: "Codalyx",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Codalyx — Agence Web Strasbourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Web Strasbourg | Codalyx",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
