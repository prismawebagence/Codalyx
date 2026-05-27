import Link from "next/link";
import { ArrowLeft, Check, X, Clock, Wallet } from "lucide-react";
import type { Offer } from "@/lib/offers";
import { maintenances } from "@/lib/offers";

export default function OfferDetail({ offer }: { offer: Offer }) {
  const maintenance =
    offer.slug === "vitrine"
      ? maintenances.find((m) => m.slug === "contenu")!
      : maintenances.find((m) => m.slug === "technique")!;

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/offres"
          className="inline-flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#0A0A0A]"
        >
          <ArrowLeft className="size-4" />
          Toutes les offres
        </Link>

        <div
          className={`mt-8 rounded-3xl bg-white p-8 md:p-12 ${
            offer.featured
              ? "border-2 border-[#FF6B2C]"
              : "border border-[#E4E4E7]"
          }`}
        >
          <span className="inline-block rounded-full bg-[#FF6B2C]/10 px-4 py-1 text-sm font-medium text-[#FF6B2C]">
            Création de site internet
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            {offer.name}
          </h1>
          <p className="mt-4 font-heading text-xl text-[#0A0A0A] max-w-2xl">
            {offer.tagline}
          </p>
          <p className="mt-3 text-base text-[#52525B] leading-relaxed max-w-2xl">
            {offer.description}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-4 border-y border-[#E4E4E7] py-8">
            <div>
              <div className="font-heading text-4xl font-bold text-[#0A0A0A]">
                {offer.priceFormatted}&nbsp;&euro;
              </div>
              <p className="mt-1 text-xs text-[#71717A]">Net de TVA — prix fixe</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#0A0A0A]">
                <Clock className="size-4 text-[#FF6B2C]" />
                <span className="font-medium">{offer.delay}</span>
              </div>
              <p className="mt-1 text-xs text-[#71717A]">Délai garanti</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#0A0A0A]">
                <Wallet className="size-4 text-[#FF6B2C]" />
                <span className="font-medium">50% / 50%</span>
              </div>
              <p className="mt-1 text-xs text-[#71717A]">{offer.payment}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                Ce qui est inclus
              </h2>
              <ul className="mt-5 space-y-3">
                {offer.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#FF6B2C]" />
                    <span className="text-[#0A0A0A] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                Non inclus
              </h2>
              <ul className="mt-5 space-y-3">
                {offer.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <X className="mt-0.5 size-4 shrink-0 text-[#71717A]" />
                    <span className="text-[#52525B] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#FAFAFA] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
              Client idéal
            </p>
            <p className="mt-2 text-[#0A0A0A] leading-relaxed">{offer.ideal}</p>
            <p className="mt-1.5 text-sm text-[#71717A] italic">Ex&nbsp;: {offer.examples}</p>
          </div>

          <blockquote className="mt-8 border-l-2 border-[#FF6B2C] pl-5 font-heading text-xl italic text-[#0A0A0A] leading-relaxed">
            « {offer.pitch} »
          </blockquote>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F] active:scale-[0.98]"
            >
              Demander un devis gratuit
            </Link>
            <Link
              href="/offres"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#0A0A0A] px-8 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
            >
              Comparer les offres
            </Link>
          </div>
        </div>

        {/* Maintenance associée */}
        <aside className="mt-10 rounded-3xl border border-[#E4E4E7] bg-white p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF6B2C]">
                Maintenance recommandée
              </span>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[#0A0A0A]">
                {maintenance.name}
              </h3>
              <p className="mt-2 text-sm text-[#71717A]">{maintenance.target}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-heading text-3xl font-bold text-[#0A0A0A]">
                {maintenance.priceFormatted}<span className="text-lg">&nbsp;€</span>
              </div>
              <p className="text-[11px] text-[#71717A]">net / mois</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-[#52525B] leading-relaxed">{maintenance.why}</p>
        </aside>
      </div>
    </section>
  );
}
