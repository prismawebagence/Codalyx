import type { Metadata } from "next";
import { Target, Heart, Shield, MapPin } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "À propos | PrismaWeb — Agence Web à Strasbourg",
  description:
    "Découvrez PrismaWeb, agence web basée à Strasbourg fondée par Enzo Galle. Notre mission : rendre le web accessible aux artisans, commerçants et PME d'Alsace.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — PrismaWeb, agence web à Strasbourg",
    description:
      "PrismaWeb rend le web accessible aux artisans, commerçants et PME d'Alsace : sites performants, prix transparents, accompagnement de proximité.",
    url: "https://prismaweb.fr/a-propos",
    type: "website",
  },
};

const values = [
  {
    icon: Target,
    title: "Performance",
    description:
      "Chaque site est optimisé pour la vitesse, le référencement et la conversion. Pas de fioritures, que du résultat.",
  },
  {
    icon: Heart,
    title: "Proximité",
    description:
      "Basés à Strasbourg, nous connaissons le tissu économique local. Nous accompagnons nos clients comme des partenaires.",
  },
  {
    icon: Shield,
    title: "Transparence",
    description:
      "Prix clairs, délais respectés, propriété totale de votre site. Pas de mauvaise surprise, jamais.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
              NOTRE HISTOIRE
            </span>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
              Le web, au service des entrepreneurs
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#6B7280]">
              PrismaWeb est née d&apos;un constat simple : trop d&apos;artisans, de
              commerçants et de professions libérales en Alsace n&apos;ont pas de
              présence en ligne digne de leur savoir-faire. Notre mission est de
              changer ça.
            </p>
          </div>

          {/* Story */}
          <div className="mx-auto mt-16 max-w-3xl space-y-6 text-[#0A0A0A]">
            <p className="leading-relaxed">
              PrismaWeb est une jeune agence web fondée à Strasbourg en 2026. Notre
              ambition : proposer aux entreprises locales une alternative aux
              templates génériques et aux grosses structures impersonnelles.
              Chaque site est pensé pour <strong>un métier</strong>, <strong>un territoire</strong> et <strong>des clients précis</strong>.
            </p>
            <p className="leading-relaxed">
              Nous croyons qu&apos;un bon site web ne se mesure pas au nombre
              d&apos;animations ou à la complexité du design, mais au nombre de
              clients qu&apos;il vous apporte. C&apos;est pourquoi nous construisons
              chaque projet autour de la performance, du référencement local et
              de la conversion.
            </p>
            <p className="leading-relaxed">
              Notre positionnement transfrontalier est un atout : situés au
              carrefour de la France et de l&apos;Allemagne, nous comprenons les
              enjeux d&apos;une clientèle bilingue et multiculturelle.
            </p>
          </div>

          {/* Values */}
          <div className="mt-24">
            <h2 className="text-center font-heading text-2xl font-semibold text-[#0A0A0A] md:text-3xl">
              Nos valeurs
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-[#E4E4E7] bg-white p-8 text-center"
                  >
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#FF6B2C]/10">
                      <Icon className="size-6 text-[#FF6B2C]" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-[#0A0A0A]">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="mt-24 rounded-2xl bg-[#FAFAFA] p-8 md:p-12 text-center">
            <MapPin className="mx-auto size-8 text-[#FF6B2C]" />
            <h2 className="mt-4 font-heading text-2xl font-semibold text-[#0A0A0A]">
              Ancrés à Strasbourg
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
              Notre bureau est situé au 3 Rue Relinde, à Strasbourg. Nous intervenons dans toute l&apos;Alsace et le Grand Est,
              et travaillons également à distance avec des clients dans toute la
              France.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
