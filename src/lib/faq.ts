// Source unique des questions/réponses : alimente à la fois l'affichage
// (composant FAQ) et le schéma JSON-LD FAQPage (pages Accueil et Offres).
// Garder l'UI et le schéma synchronisés évite tout écart pénalisé par Google.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Combien de temps faut-il pour créer mon site ?",
    answer:
      "Le délai dépend de la formule : 5 à 7 jours ouvrés pour le Pack Vitrine, 10 à 14 jours pour le Pack Business, 21 à 30 jours pour le Pack Pro. Ces délais incluent les phases de maquette, validation et développement.",
  },
  {
    question: "Est-ce que je suis propriétaire de mon site ?",
    answer:
      "Oui, à 100 %. Le code source, le contenu et le nom de domaine vous appartiennent. Si vous décidez de partir, nous vous transférons l’intégralité de vos fichiers.",
  },
  {
    question: "La maintenance est-elle obligatoire ?",
    answer:
      "Non. La Maintenance Contenu (99 €/mois, pour le Pack Vitrine) et la Maintenance Technique (69 €/mois, pour les Packs Business et Pro) sont optionnelles, sans engagement, résiliables avec un préavis de 30 jours par email.",
  },
  {
    question: "Combien coûte une modification après livraison ?",
    answer:
      "Avec un Pack Business ou Pro, vous modifiez vous-même textes et images via le CMS Sanity. Pour les modifications de code (nouvelle section, design) ou pour les clients Vitrine, comptez 65 €/h hors forfait, ou utilisez la maintenance qui inclut un quota mensuel.",
  },
  {
    question: "L’hébergement est-il inclus ?",
    answer:
      "Oui, l’hébergement Vercel est inclus à vie dans le prix de création. Le nom de domaine (~10–15 €/an) reste à la charge du client.",
  },
  {
    question: "Le site sera-t-il bien référencé sur Google ?",
    answer:
      "Chaque site applique les bonnes pratiques SEO : structure technique optimisée, vitesse, balises méta, données structurées. Le Pack Business inclut un SEO avancé, et le Pack Pro un rapport SEO initial avec recommandations de mots-clés.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
