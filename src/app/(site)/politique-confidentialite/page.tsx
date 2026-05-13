import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Codalyx",
  description: "Politique de confidentialité et protection des données personnelles de Codalyx.",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-4 text-sm text-[#6B7280]">Dernière mise à jour : janvier 2025</p>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Données collectées
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Dans le cadre de l&apos;utilisation de notre site, nous pouvons être amenés à collecter les données personnelles suivantes : nom, adresse e-mail, numéro de téléphone et message, uniquement via le formulaire de contact. Ces données sont collectées avec votre consentement explicite lors de la soumission du formulaire.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Finalités du traitement
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Les données collectées sont utilisées exclusivement pour : répondre à vos demandes de contact et de devis, vous fournir des informations sur nos services, et assurer le suivi de la relation commerciale. Aucune donnée n&apos;est utilisée à des fins de profilage ou de marketing automatisé.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Durée de conservation
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Vos données personnelles sont conservées pendant une durée de 3 ans à compter du dernier contact. Au-delà de cette période, elles sont supprimées de manière définitive.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Vos droits
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Conformément au RGPD, vous disposez des droits suivants : droit d&apos;accès, de rectification, d&apos;effacement, de limitation du traitement, de portabilité des données et d&apos;opposition. Pour exercer ces droits, contactez-nous par e-mail à contact@codalyx.fr ou par courrier à l&apos;adresse : Codalyx, 3 Rue Relinde, 67200 Strasbourg.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Cookies
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Ce site n&apos;utilise aucun cookie de suivi publicitaire ou analytique tiers. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés. Vous pouvez configurer votre navigateur pour refuser les cookies.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
            Contact DPO
          </h2>
          <p className="mt-3 text-[#6B7280] leading-relaxed">
            Pour toute question relative à la protection de vos données personnelles, vous pouvez contacter notre délégué à la protection des données à l&apos;adresse : dpo@codalyx.fr. Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés).
          </p>
        </div>
      </div>
    </section>
  );
}
