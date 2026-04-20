import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Codalyx",
  description: "Conditions générales de vente de Codalyx, agence web à Strasbourg.",
};

export default function CGV() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
          Conditions Générales de Vente
        </h1>
        <p className="mt-4 text-sm text-[#6B7280]">Dernière mise à jour : janvier 2025</p>

        {[
          {
            title: "Article 1 — Objet",
            content:
              "Les présentes conditions générales de vente régissent les relations contractuelles entre Codalyx (ci-après « le Prestataire ») et ses clients (ci-après « le Client ») dans le cadre de prestations de création de sites internet, de maintenance et de services associés.",
          },
          {
            title: "Article 2 — Prix et modalités de paiement",
            content:
              "Les prix sont indiqués en euros TTC. Le paiement s\u2019effectue en deux temps : 30% à la commande (acompte non remboursable), et 70% à la livraison du site. L\u2019abonnement mensuel est prélevé par prélèvement automatique le 1er de chaque mois. Tout retard de paiement entraîne l\u2019application de pénalités de retard au taux légal en vigueur.",
          },
          {
            title: "Article 3 — Délais de livraison",
            content:
              "Les délais de livraison sont donnés à titre indicatif : environ 2 semaines pour l\u2019offre Essentiel, 3 semaines pour l\u2019offre Pro et 4 à 5 semaines pour l\u2019offre Premium. Ces délais courent à compter de la réception de l\u2019acompte et de l\u2019ensemble des éléments nécessaires (textes, images, logo). Tout retard imputable au Client dans la fourniture des éléments prolonge d\u2019autant le délai de livraison.",
          },
          {
            title: "Article 4 — Propriété intellectuelle",
            content:
              "À compter du paiement intégral de la prestation, le Client devient propriétaire du code source, du contenu et du nom de domaine de son site. Le Prestataire se réserve le droit de mentionner la réalisation du site dans son portfolio, sauf demande contraire écrite du Client.",
          },
          {
            title: "Article 5 — Abonnement mensuel",
            content:
              "L\u2019abonnement mensuel couvre l\u2019hébergement, le nom de domaine, le certificat SSL, les sauvegardes automatiques et la maintenance technique. Les prestations spécifiques à chaque formule (SEO, gestion Google My Business, rapport de performance) sont détaillées dans la description de l\u2019offre souscrite.",
          },
          {
            title: "Article 6 — Résiliation",
            content:
              "L\u2019abonnement mensuel est sans engagement de durée. Le Client peut résilier à tout moment par e-mail avec un préavis de 30 jours. En cas de résiliation, le Prestataire fournit au Client l\u2019ensemble des fichiers sources et facilite la migration vers un autre hébergeur si nécessaire.",
          },
          {
            title: "Article 7 — Responsabilité",
            content:
              "Le Prestataire s\u2019engage à mettre en \u0153uvre tous les moyens nécessaires pour assurer la qualité et la disponibilité du site. Toutefois, sa responsabilité ne saurait être engagée en cas de force majeure, de fait d\u2019un tiers ou de faute du Client. Le Prestataire ne saurait être tenu responsable des contenus publiés par le Client sur son site.",
          },
          {
            title: "Article 8 — Droit applicable et juridiction",
            content:
              "Les présentes conditions sont régies par le droit français. En cas de litige, les parties s\u2019engagent à rechercher une solution amiable. À défaut, le Tribunal de Grande Instance de Strasbourg sera seul compétent.",
          },
        ].map((article) => (
          <div key={article.title} className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
              {article.title}
            </h2>
            <p className="mt-3 text-[#6B7280] leading-relaxed">
              {article.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
