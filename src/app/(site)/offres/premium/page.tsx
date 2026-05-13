import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Offre Premium — 2 290€ | E-commerce & Multilingue | Codalyx",
  description:
    "Site premium e-commerce ou réservation avancée, multilingue FR/DE, rapport mensuel de performance. Pour commerces ambitieux à Strasbourg. 2 290€.",
  alternates: { canonical: "/offres/premium" },
};

const features = [
  "Toute l’offre Pro incluse",
  "E-commerce léger (jusqu’à 30 produits) ou réservation avancée",
  "Site multilingue FR / DE (atout transfrontalier Strasbourg)",
  "2 modifications par mois incluses",
  "Rapport mensuel de performance (trafic, conversions, SEO)",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Offre Premium — Site e-commerce et multilingue",
  provider: { "@type": "LocalBusiness", name: "Codalyx" },
  description:
    "Site premium avec e-commerce, multilingue FR/DE, rapport mensuel.",
  offers: { "@type": "Offer", price: "2290", priceCurrency: "EUR" },
};

export default function PremiumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/offres"
            className="inline-flex items-center gap-1.5 text-sm text-[#52525B] hover:text-[#0A0A0A]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Toutes les offres
          </Link>

          <div className="mt-8 rounded-2xl border border-[#E4E4E7] bg-white p-8 md:p-12">
            <span className="inline-block rounded-full bg-[#FF6B2C] px-4 py-1 text-sm font-semibold text-[#0A0A0A]">
              Premium
            </span>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-[#0A0A0A] md:text-4xl">
              Le site qui devient votre meilleur commercial
            </h1>
            <p className="mt-3 text-lg text-[#52525B]">
              Pour les commerces ambitieux, professions à clientèle CH/DE et marques locales premium qui veulent maximiser leur présence en ligne.
            </p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold text-[#0A0A0A]">
                2&nbsp;290&nbsp;€
              </span>
              <span className="text-[#52525B]">création</span>
            </div>
            <p className="mt-1 text-[#52525B]">
              + 119&nbsp;€/mois (hébergement, domaine, SEO, e-commerce, rapport)
            </p>

            <div className="mt-10 border-t border-[#E4E4E7] pt-10">
              <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                Ce qui est inclus
              </h2>
              <ul className="mt-6 space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#FF6B2C]" aria-hidden="true" />
                    <span className="text-[#0A0A0A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E55A1F]"
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
