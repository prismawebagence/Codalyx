export type OfferTier = "vitrine" | "business" | "pro";

export type Offer = {
  tier: OfferTier;
  slug: string;
  name: string;
  price: number;
  priceFormatted: string;
  delay: string;
  payment: string;
  tagline: string;
  description: string;
  ideal: string;
  examples: string;
  pitch: string;
  featured: boolean;
  href: string;
  included: string[];
  excluded: string[];
};

export const offers: Offer[] = [
  {
    tier: "vitrine",
    slug: "vitrine",
    name: "Pack Vitrine",
    price: 790,
    priceFormatted: "790",
    delay: "5 à 7 jours ouvrés",
    payment: "50% à la signature (395€) — 50% à la livraison (395€)",
    tagline: "Le site qui vous met sur la carte.",
    description:
      "Un site professionnel opérationnel en moins d’une semaine, à trois fois moins cher qu’une agence.",
    ideal: "Artisan, indépendant, commerçant local qui veut exister sur Google sans complexité.",
    examples: "Coiffeur, plombier, photographe, coach, fleuriste.",
    pitch: "Un site professionnel opérationnel en moins d’une semaine, à 3x moins cher qu’une agence.",
    featured: false,
    href: "/offres/vitrine",
    included: [
      "Site HTML/CSS responsive (mobile, tablette, ordinateur)",
      "3 à 5 pages : Accueil, Services, À propos, Contact + 1 au choix",
      "Formulaire de contact fonctionnel (envoi email)",
      "SEO de base : balises, meta description, sitemap, soumission Google",
      "Hébergement sur Vercel inclus à vie",
      "Configuration du nom de domaine (si fourni par le client)",
      "2 révisions incluses en phase de développement",
      "Livraison avec accès complets (Vercel + GitHub)",
    ],
    excluded: [
      "Système de réservation ou prise de RDV en ligne",
      "Blog ou espace de publication d’articles",
      "Espace client ou espace membre",
      "Boutique en ligne ou paiement",
      "Création de textes, photos ou vidéos",
      "Modifications après livraison (Maintenance Contenu)",
      "Achat du nom de domaine (≈ 10–15€/an, à la charge du client)",
    ],
  },
  {
    tier: "business",
    slug: "business",
    name: "Pack Business",
    price: 1490,
    priceFormatted: "1 490",
    delay: "10 à 14 jours ouvrés",
    payment: "50% à la signature (745€) — 50% à la livraison (745€)",
    tagline: "Le site que vous pilotez vous-même.",
    description:
      "Un site que vous modifiez vous-même en deux minutes, sans appeler personne.",
    ideal: "PME, profession de santé, artisan confirmé qui veut autonomie et professionnalisme.",
    examples: "Kinésithérapeute, restaurant, agence immobilière indé, architecte d’intérieur.",
    pitch: "Un site que vous pouvez mettre à jour vous-même en 2 minutes, sans appeler personne.",
    featured: true,
    href: "/offres/business",
    included: [
      "Tout ce qui est dans le Pack Vitrine",
      "Jusqu’à 8 pages",
      "CMS Sanity intégré : modifiez textes et images depuis votre téléphone",
      "Galerie photos avec catégories",
      "Google Maps intégré",
      "Formulaire de réservation ou prise de contact avancée",
      "SEO avancé : structure sémantique, mots-clés, vitesse optimisée",
      "4 révisions incluses",
      "Formation CMS d’1 heure",
      "Rapport de mise en ligne",
    ],
    excluded: [
      "Boutique e-commerce ou paiement en ligne",
      "Espace membre ou accès sécurisé",
      "Intégrations complexes (ERP, CRM, logiciel métier)",
      "Création de textes, photos ou vidéos",
      "Modifications de code après livraison (Maintenance Technique)",
    ],
  },
  {
    tier: "pro",
    slug: "pro",
    name: "Pack Pro",
    price: 2490,
    priceFormatted: "2 490",
    delay: "21 à 30 jours ouvrés",
    payment: "50% à la signature (1 245€) — 50% à la livraison (1 245€)",
    tagline: "Le niveau d’une agence parisienne.",
    description:
      "Le niveau d’une agence parisienne, livré à Strasbourg en 3 semaines pour 2 490 € au lieu de 8 000 €.",
    ideal: "Entreprise établie qui veut un site premium et une présence SEO sérieuse.",
    examples: "Cabinet d’avocats, architecte, agence de communication, clinique.",
    pitch: "Le niveau d’une agence parisienne, livré à Strasbourg en 3 semaines pour 2 490€ au lieu de 8 000€.",
    featured: false,
    href: "/offres/pro",
    included: [
      "Tout ce qui est dans le Pack Business",
      "Jusqu’à 15 pages",
      "Blog avec CMS (publication d’articles SEO)",
      "Système de réservation avancé (Calendly ou sur mesure simple)",
      "Animations et micro-interactions (transitions, effets au scroll)",
      "Optimisation performance : Lighthouse > 90/100",
      "Rapport SEO initial avec recommandations de mots-clés",
      "6 révisions incluses",
      "Support prioritaire 1 mois après livraison (réponse < 24h)",
      "Formation CMS complète (1h30)",
    ],
    excluded: [
      "Application mobile native (iOS / Android)",
      "Développement sur mesure complexe (devis séparé)",
      "Rédaction de contenu SEO (articles de blog, fiches produits)",
      "Maintenance technique après le mois de support offert",
    ],
  },
];

export type Maintenance = {
  slug: "contenu" | "technique";
  name: string;
  price: number;
  priceFormatted: string;
  target: string;
  description: string;
  included: string[];
  overflow: string;
  why: string;
};

export const maintenances: Maintenance[] = [
  {
    slug: "contenu",
    name: "Maintenance Contenu",
    price: 99,
    priceFormatted: "99",
    target: "Pour les clients Pack Vitrine (sans CMS)",
    description: "Sans engagement — résiliation 30 jours par email.",
    included: [
      "Jusqu’à 1h de modifications par mois (textes, images, tarifs, horaires, ajout de section)",
      "Surveillance uptime 24/7 — alerte si le site tombe",
      "Corrections de bugs et anomalies d’affichage",
      "Mises à jour techniques (dépendances, sécurité)",
      "Rapport mensuel d’activité par email",
      "Réponse garantie sous 48h ouvrées",
    ],
    overflow: "Temps supplémentaire au-delà de l’heure incluse : 65 €/h, avec accord préalable.",
    why: "Sans CMS, chaque changement (nouveau tarif, nouvelle photo, horaire) passe par le développeur. La maintenance garantit un accès rapide à ces modifications pour un forfait prévisible.",
  },
  {
    slug: "technique",
    name: "Maintenance Technique",
    price: 69,
    priceFormatted: "69",
    target: "Pour les clients Pack Business et Pack Pro (avec CMS Sanity)",
    description: "Sans engagement — résiliation 30 jours par email.",
    included: [
      "Surveillance uptime 24/7",
      "Corrections de bugs et anomalies d’affichage",
      "Mises à jour techniques (dépendances, sécurité Sanity, Vercel)",
      "Support CMS : aide en cas de blocage sur Sanity",
      "30 minutes de modifications de code par mois",
      "Gestion du nom de domaine et des renouvellements",
      "Rapport mensuel d’activité",
      "Réponse garantie sous 48h ouvrées",
    ],
    overflow: "Temps supplémentaire au-delà des 30 minutes de code : 65 €/h, avec accord préalable.",
    why: "Le client Business / Pro gère son contenu seul via Sanity. La Maintenance Technique couvre tout ce qu’il ne peut pas faire seul : nouvelle section, refonte design, bug, sécurité.",
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}

export function buildOfferJsonLd(offer: Offer) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.name,
    provider: { "@type": "LocalBusiness", name: "Codalyx" },
    description: offer.pitch,
    offers: { "@type": "Offer", price: offer.price, priceCurrency: "EUR" },
  } as const;
}

/** Délais lisibles, dérivés de la source de vérité `offers`. */
export const delaysSummary = offers
  .map((o) => `${o.delay} pour le ${o.name}`)
  .join(", ");
