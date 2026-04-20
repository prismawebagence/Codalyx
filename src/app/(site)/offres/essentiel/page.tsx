import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Offre Essentiel — 690€ | Site vitrine Strasbourg | Codalyx",
  description:
    "Site vitrine professionnel 3 à 5 pages, responsive, hébergement inclus. Idéal pour artisans et petits commerces à Strasbourg. À partir de 690€.",
};

const features = [
  "Site vitrine 3 à 5 pages",
  "Design professionnel responsive (mobile-first)",
  "Formulaire de contact sécurisé",
  "Intégration Google Maps + avis Google",
  "Fiche Google Business optimisée",
  "Hébergement, nom de domaine, certificat SSL inclus",
  "Maintenance technique & sécurité",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Offre Essentiel — Création de site vitrine",
  provider: { "@type": "LocalBusiness", name: "Codalyx" },
  description:
    "Site vitrine professionnel 3 à 5 pages, responsive, hébergement inclus.",
  offers: {
    "@type": "Offer",
    price: "690",
    priceCurrency: "EUR",
  },
};

export default function EssentielPage() {
  return (
    <>
      {/* JSON-LD handled via metadata */}
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/offres"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0A0A0A]"
          >
            <ArrowLeft className="size-4" />
            Toutes les offres
          </Link>

          <div className="mt-8 rounded-2xl border border-[#E4E4E7] bg-white p-8 md:p-12">
            <span className="inline-block rounded-full bg-[#FF6B2C]/10 px-4 py-1 text-sm font-medium text-[#FF6B2C]">
              Essentiel
            </span>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
              Le site qui vous rend visible
            </h1>
            <p className="mt-3 text-lg text-[#6B7280]">
              La solution idéale pour les artisans, petits commerces et professions libérales qui souhaitent être présents en ligne avec un site professionnel et efficace.
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold text-[#0A0A0A]">
                690&nbsp;&euro;
              </span>
              <span className="text-[#6B7280]">création</span>
            </div>
            <p className="mt-1 text-[#6B7280]">
              + 39&nbsp;&euro;/mois (hébergement, domaine, maintenance)
            </p>

            <div className="mt-10 border-t border-[#E4E4E7] pt-10">
              <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                Ce qui est inclus
              </h2>
              <ul className="mt-6 space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#FF6B2C]" />
                    <span className="text-[#0A0A0A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
