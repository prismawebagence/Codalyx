import type { Metadata } from "next";
import OffersGrid from "@/components/sections/OffersGrid";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Nos offres | Création de site internet | Codalyx",
  description:
    "Découvrez nos 3 formules de création de site internet à Strasbourg : Essentiel (690€), Pro (1 290€) et Premium (2 290€). Sites sur-mesure livrés clé en main.",
  alternates: { canonical: "/offres" },
};

export default function OffresPage() {
  return (
    <>
      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
            TARIFS TRANSPARENTS
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl lg:text-6xl">
            Choisissez votre formule
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
            Trois offres claires, sans surprise. Chaque site est livré clé en main avec hébergement, domaine et maintenance inclus.
          </p>
        </div>
      </section>
      <OffersGrid />
      <FAQ />
      <FinalCTA />
    </>
  );
}
