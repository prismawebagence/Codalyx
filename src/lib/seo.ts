import type { Metadata } from "next";

/**
 * Image OG partagée (PNG généré par `src/app/opengraph-image.tsx`).
 *
 * Doit être référencée explicitement dans chaque `openGraph`. En effet, Next 16
 * fusionne les metadata de façon superficielle : dès qu'une page déclare son
 * propre objet `openGraph`, celui de la racine est entièrement écrasé — et
 * l'auto-détection du fichier `opengraph-image.tsx` n'injecte alors aucune
 * balise `og:image`. On répète donc l'image via cette constante partagée.
 *
 * L'URL relative est résolue en absolu grâce à `metadataBase` (layout racine).
 */
export const OG_IMAGE: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "PrismaWeb — Création de site internet à Strasbourg",
  },
];

/** Image pour les cartes Twitter/X (même visuel, format attendu par l'API). */
export const OG_IMAGE_TWITTER = ["/opengraph-image"];

const SITE_URL = "https://prismaweb.fr";

/**
 * Construit un JSON-LD `BreadcrumbList` (fil d'Ariane) à partir d'une liste
 * ordonnée { nom, chemin }. Les chemins relatifs sont préfixés du domaine.
 */
export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
