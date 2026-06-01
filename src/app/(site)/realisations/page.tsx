import type { Metadata } from "next";
import Portfolio from "@/components/sections/Portfolio";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Réalisations & démos | PrismaWeb — Agence Web Strasbourg",
  description:
    "Découvrez nos projets de démonstration : sites vitrines, sites avec réservation en ligne et e-commerce pensés pour les entreprises alsaciennes.",
  alternates: { canonical: "/realisations" },
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
            Nos démos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
            PrismaWeb démarre son activité en 2026. En attendant nos premières réalisations clients, voici trois projets de démonstration qui illustrent concrètement ce que nous savons construire.
          </p>
        </div>
      </section>
      <Portfolio />
      <FinalCTA />
    </>
  );
}
