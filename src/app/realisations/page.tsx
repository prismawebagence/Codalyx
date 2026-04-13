import type { Metadata } from "next";
import Portfolio from "@/components/sections/Portfolio";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Réalisations | Portfolio de sites web | WebCraft Studio",
  description:
    "Découvrez nos réalisations : sites vitrines, e-commerce et portfolios créés pour des artisans et PME à Strasbourg et en Alsace.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
            PORTFOLIO
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            Nos réalisations
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
            Chaque projet est unique, chaque client a son histoire. Découvrez comment nous avons aidé des entreprises alsaciennes à se démarquer en ligne.
          </p>
        </div>
      </section>
      <Portfolio />
      <FinalCTA />
    </>
  );
}
