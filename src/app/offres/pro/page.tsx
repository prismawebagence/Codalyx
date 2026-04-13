import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Offre Pro — 1 290€ | Site professionnel + SEO | WebCraft Studio",
  description:
    "Site professionnel 8 à 10 pages, blog intégré, SEO local optimisé, prise de RDV en ligne. Pour coachs, kinés, restaurants à Strasbourg. 1 290€.",
};

const features = [
  "Toute l\u2019offre Essentiel incluse",
  "8 à 10 pages sur-mesure",
  "Blog intégré avec CMS simple",
  "SEO local optimisé sur 3 mots-clés stratégiques",
  "Prise de rendez-vous en ligne intégrée",
  "Gestion mensuelle de la page Google My Business",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Offre Pro — Création de site professionnel + SEO",
  provider: { "@type": "LocalBusiness", name: "WebCraft Studio" },
  description:
    "Site professionnel 8 à 10 pages, blog, SEO local, prise de RDV en ligne.",
  offers: { "@type": "Offer", price: "1290", priceCurrency: "EUR" },
};

export default function ProPage() {
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

          <div className="mt-8 rounded-2xl border-2 border-[#0A0A0A] bg-white p-8 md:p-12">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-full bg-[#0A0A0A] px-4 py-1 text-sm font-medium text-white">
                Pro
              </span>
              <span className="rounded-full bg-[#FF6B2C] px-3 py-0.5 text-xs font-semibold text-white">
                Populaire
              </span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
              Le site qui vous fait sonner le téléphone
            </h1>
            <p className="mt-3 text-lg text-[#6B7280]">
              Pour les coachs, kinés, ostéopathes, restaurants et agences immobilières qui veulent convertir leurs visiteurs en clients.
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold text-[#0A0A0A]">
                1&nbsp;290&nbsp;&euro;
              </span>
              <span className="text-[#6B7280]">création</span>
            </div>
            <p className="mt-1 text-[#6B7280]">
              + 69&nbsp;&euro;/mois (hébergement, domaine, SEO, maintenance)
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
