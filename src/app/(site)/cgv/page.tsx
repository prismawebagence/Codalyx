import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | PrismaWeb",
  description: "Conditions générales de vente de PrismaWeb, agence web à Strasbourg.",
  alternates: { canonical: "/cgv" },
  robots: { index: false, follow: true },
};

const articles: { title: string; content: string }[] = [
  {
    title: "Article 1 — Objet",
    content:
      "Les présentes conditions générales de vente (« CGV ») régissent les relations contractuelles entre PrismaWeb (ci-après « le Prestataire ») et ses clients, professionnels ou particuliers (ci-après « le Client »), dans le cadre de prestations de création de sites internet, de maintenance et de services associés. Toute commande implique l’acceptation sans réserve des présentes CGV.",
  },
  {
    title: "Article 2 — Prix et modalités de paiement",
    content:
      "Les prix sont indiqués en euros nets de TVA (TVA non applicable, article 293 B du Code Général des Impôts). Le paiement s’effectue en deux temps : 50 % d’acompte à la signature du devis (non remboursable après démarrage des travaux), 50 % à la livraison avant mise en ligne. Les abonnements de maintenance — Maintenance Contenu 99 €/mois et Maintenance Technique 69 €/mois — sont prélevés mensuellement par carte ou prélèvement SEPA. Tout retard de paiement entraîne l’application de pénalités au taux légal en vigueur, ainsi qu’une indemnité forfaitaire de 40 € pour frais de recouvrement (article L441-10 du Code de commerce).",
  },
  {
    title: "Article 3 — Délais de livraison",
    content:
      "Les délais de livraison sont indicatifs : 5 à 7 jours ouvrés pour le Pack Vitrine, 10 à 14 jours pour le Pack Business, 21 à 30 jours pour le Pack Pro. Ces délais courent à compter de la réception de l’acompte et de l’ensemble des éléments nécessaires (textes, images, logo, accès). Tout retard imputable au Client dans la fourniture des éléments prolonge d’autant le délai de livraison.",
  },
  {
    title: "Article 4 — Révisions et modifications",
    content:
      "Chaque pack inclut un nombre fixe de révisions pendant la phase de développement (2 pour le Vitrine, 4 pour le Business, 6 pour le Pro). Toute révision ou modification supplémentaire hors forfait est facturée 65 € net de l’heure, avec accord préalable du Client. Après livraison, les modifications sont couvertes par la formule de maintenance souscrite, ou facturées à l’heure.",
  },
  {
    title: "Article 5 — Hébergement et maintenance",
    content:
      "L’hébergement sur Vercel est inclus à vie dans le prix de création du site, dans la limite des plans gratuits Vercel. Le nom de domaine reste à la charge du Client (≈ 10–15 €/an chez le registrar de son choix). Les abonnements de maintenance sont optionnels et sans engagement. La Maintenance Contenu (99 €/mois) s’adresse aux clients Pack Vitrine et inclut jusqu’à 1 h de modifications par mois, surveillance uptime, corrections de bugs et mises à jour techniques. La Maintenance Technique (69 €/mois) s’adresse aux clients Pack Business et Pack Pro et inclut 30 minutes de modifications de code par mois, support CMS Sanity, surveillance et mises à jour. Le détail complet figure sur la page Offres.",
  },
  {
    title: "Article 6 — Résiliation",
    content:
      "Les abonnements de maintenance sont sans engagement de durée. Le Client peut résilier à tout moment par e-mail à contact@prismaweb.fr, avec un préavis de 30 jours. Aucune des prestations de création n’est remboursable une fois les travaux démarrés. En cas de résiliation, le Prestataire transfère au Client l’ensemble des accès (Vercel, GitHub, CMS) dans un délai maximum de 48 h après paiement intégral.",
  },
  {
    title: "Article 7 — Propriété intellectuelle",
    content:
      "À compter du paiement intégral de la prestation, le Client devient propriétaire du code source et du contenu de son site. Le nom de domaine, acquis par le Client, lui appartient intégralement. Le Prestataire se réserve le droit de mentionner la réalisation dans son portfolio (page Réalisations) et ses supports de communication, sauf demande contraire écrite du Client.",
  },
  {
    title: "Article 8 — Droit de rétractation",
    content:
      "Conformément aux articles L221-18 et suivants du Code de la consommation, le Client agissant en qualité de consommateur (non professionnel) dispose d’un délai de quatorze (14) jours à compter de la conclusion du contrat pour exercer son droit de rétractation, sans motif. Le Client renonce expressément à ce droit dès lors qu’il demande au Prestataire de commencer l’exécution avant la fin du délai de rétractation : dans ce cas, le Client est redevable du prix correspondant à la prestation effectivement réalisée. Le droit de rétractation s’exerce par e-mail à contact@prismaweb.fr. Ce droit ne s’applique pas aux Clients professionnels.",
  },
  {
    title: "Article 9 — Responsabilité",
    content:
      "Le Prestataire s’engage à mettre en œuvre tous les moyens nécessaires pour assurer la qualité et la disponibilité du site. Sa responsabilité ne saurait être engagée en cas de force majeure, de fait d’un tiers (notamment indisponibilité de Vercel, du registrar de domaine ou du CMS Sanity) ou de faute du Client. Le Prestataire n’est pas responsable des contenus publiés par le Client sur son site.",
  },
  {
    title: "Article 10 — Données personnelles",
    content:
      "Les données collectées via le formulaire de contact ne sont utilisées que pour répondre à la demande du Client. Elles ne sont ni revendues ni partagées. Pour le détail, voir la Politique de confidentialité.",
  },
  {
    title: "Article 11 — Médiation et juridiction",
    content:
      "En cas de litige, les parties s’engagent à rechercher une solution amiable. Conformément à l’article L612-1 du Code de la consommation, le Client consommateur peut recourir gratuitement à un médiateur de la consommation. À défaut de résolution amiable, et sauf disposition d’ordre public contraire, le Tribunal Judiciaire de Strasbourg sera seul compétent. Les présentes CGV sont régies par le droit français.",
  },
];

export default function CGV() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
          Conditions Générales de Vente
        </h1>
        <p className="mt-4 text-sm text-[#52525B]">Dernière mise à jour : mai 2026</p>

        {articles.map((article) => (
          <div key={article.title} className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
              {article.title}
            </h2>
            <p className="mt-3 text-[#52525B] leading-relaxed">{article.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
