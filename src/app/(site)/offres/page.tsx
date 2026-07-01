import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { offers, maintenances } from "@/lib/offers";
import OfferCardCompact from "@/components/sections/OfferCardCompact";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Offres & tarifs | Création de site internet à Strasbourg | PrismaWeb",
  description:
    "Trois packs transparents pour votre site internet à Strasbourg : Vitrine 790€, Business 1 490€, Pro 2 490€. Maintenance 69€ ou 99€/mois, sans engagement. Net de TVA, sans surprise.",
  alternates: { canonical: "/offres" },
  openGraph: {
    title: "Offres & tarifs — Création de site internet à Strasbourg | PrismaWeb",
    description:
      "Trois packs transparents : Vitrine 790€, Business 1 490€, Pro 2 490€. Prix nets, délais annoncés, propriété totale de votre site.",
    url: "https://prismaweb.fr/offres",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: offers.map((offer, i) => ({
    "@type": "Service",
    position: i + 1,
    name: offer.name,
    description: offer.pitch,
    provider: { "@type": "LocalBusiness", name: "PrismaWeb" },
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "EUR",
    },
  })),
};

export default function OffresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#FF6B2C]">
            Offres & tarifs
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-6xl">
            Des prix nets, sans surprise.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#52525B] leading-relaxed">
            Trois packs pour la création, deux maintenances au choix. Chaque montant est&nbsp;
            <span className="text-[#0A0A0A] font-medium">net de TVA</span>, et chaque délai est tenu.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-4 py-1.5 text-xs text-[#71717A]">
            <Sparkles className="size-3.5 text-[#FF6B2C]" />
            TVA non applicable — article 293 B du CGI
          </div>
        </div>
      </section>

      {/* PACKS — 3 cartes asymétriques */}
      <section id="packs" className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCardCompact key={offer.slug} offer={offer} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[#71717A]">
            Cliquez sur « En savoir plus » pour voir le détail complet de chaque pack (inclus, non inclus, profil idéal).
          </p>
        </div>
      </section>

      {/* MAINTENANCES */}
      <section id="maintenance" className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#FF6B2C]">
              Maintenance
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl">
              Une fois en ligne, deux façons d’être tranquille.
            </h2>
            <p className="mt-3 text-[#52525B] leading-relaxed">
              Optionnelle, sans engagement, résiliable avec 30 jours de préavis. Vous choisissez celle adaptée à votre pack.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {maintenances.map((m) => (
              <article
                key={m.slug}
                className="flex flex-col rounded-3xl border border-[#E4E4E7] bg-white p-8"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#71717A]">{m.target}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-heading text-3xl font-bold text-[#0A0A0A]">
                      {m.priceFormatted}<span className="text-lg">&nbsp;€</span>
                    </div>
                    <p className="text-[11px] text-[#71717A]">net / mois</p>
                  </div>
                </header>

                <p className="mt-4 text-xs text-[#71717A]">{m.description}</p>

                <ul className="mt-5 space-y-2.5 border-t border-[#E4E4E7] pt-5">
                  {m.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#0A0A0A]" />
                      <span className="text-[#0A0A0A] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-[#FAFAFA] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                    Pourquoi c’est utile
                  </p>
                  <p className="mt-1.5 text-xs text-[#52525B] leading-relaxed">{m.why}</p>
                </div>

                <p className="mt-4 text-[11px] text-[#71717A] italic">
                  Dépassement&nbsp;: {m.overflow}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TABLEAU RECAP */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#FF6B2C]">
              Récapitulatif
            </span>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl">
              Tous les prix en une vue.
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#E4E4E7]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#0A0A0A] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Offre</th>
                  <th className="px-5 py-4 font-semibold text-right font-mono">Prix</th>
                  <th className="hidden px-5 py-4 font-semibold sm:table-cell">Délai</th>
                  <th className="hidden px-5 py-4 font-semibold md:table-cell">Pour qui</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E7] bg-white">
                {offers.map((o) => (
                  <tr key={o.slug}>
                    <td className="px-5 py-4 font-medium text-[#0A0A0A]">{o.name}</td>
                    <td className="px-5 py-4 text-right font-mono text-[#0A0A0A]">{o.priceFormatted} €</td>
                    <td className="hidden px-5 py-4 text-[#52525B] sm:table-cell">{o.delay}</td>
                    <td className="hidden px-5 py-4 text-[#71717A] md:table-cell">{o.examples}</td>
                  </tr>
                ))}
                {maintenances.map((m) => (
                  <tr key={m.slug} className="bg-[#FAFAFA]">
                    <td className="px-5 py-4 font-medium text-[#0A0A0A]">{m.name}</td>
                    <td className="px-5 py-4 text-right font-mono text-[#0A0A0A]">{m.priceFormatted} €/mois</td>
                    <td className="hidden px-5 py-4 text-[#52525B] sm:table-cell">—</td>
                    <td className="hidden px-5 py-4 text-[#71717A] md:table-cell">{m.target.replace("Pour les clients ", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-xs text-[#71717A]">
            Tous les prix sont exprimés en euros, nets de TVA. TVA non applicable — article 293 B du Code Général des Impôts.
          </p>
        </div>
      </section>

      {/* REGLES COMMERCIALES */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#FF6B2C]">
                Règles
              </span>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                Règles commerciales, claires dès le départ.
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Pas d’astérisque, pas de petite ligne. Ce qui est écrit ici s’applique à tous les packs.
              </p>
            </div>

            <ul className="space-y-5">
              {[
                "Paiement : 50% d’acompte à la signature, 50% à la livraison avant mise en ligne.",
                "Acompte non remboursable après démarrage des travaux.",
                "Révisions supplémentaires hors forfait : 65 €/h.",
                "Devis valable 30 jours.",
                "Transfert des accès complets sous 48h après paiement intégral.",
                "Propriété intellectuelle transférée au client après paiement intégral.",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#FF6B2C]" />
                  <span className="text-white/85">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
