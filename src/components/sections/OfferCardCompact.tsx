"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Clock, Wallet, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Offer } from "@/lib/offers";

interface OfferCardCompactProps {
  offer: Offer;
  /** Nombre de points clés à afficher avant l'ouverture du modal. */
  previewCount?: number;
}

/**
 * Carte « tarifs » compacte : nom, prix, délai et 4 points-clés.
 * Le détail complet (inclus / non inclus / cible / pitch / paiement)
 * s'ouvre dans un modal accessible via « En savoir plus ».
 */
export default function OfferCardCompact({
  offer,
  previewCount = 4,
}: OfferCardCompactProps) {
  const [open, setOpen] = useState(false);

  const preview = offer.included.slice(0, previewCount);
  const hiddenCount = Math.max(0, offer.included.length - previewCount);

  return (
    <article
      className={`relative flex flex-col rounded-3xl bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] ${
        offer.featured
          ? "border-2 border-[#FF6B2C] lg:-mt-4 lg:mb-4"
          : "border border-[#E4E4E7]"
      }`}
    >
      {offer.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-[#FF6B2C] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Le plus choisi
        </span>
      )}

      <header>
        <h2 className="font-heading text-2xl font-semibold text-[#0A0A0A]">
          {offer.name}
        </h2>
        <p className="mt-2 text-sm text-[#71717A]">{offer.tagline}</p>
      </header>

      <div className="mt-6 border-t border-[#E4E4E7] pt-6">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-5xl font-bold text-[#0A0A0A]">
            {offer.priceFormatted}
          </span>
          <span className="text-xl text-[#0A0A0A]">&euro;</span>
        </div>
        <p className="mt-1 text-xs text-[#71717A]">
          Net de TVA · prix fixe, pas de surcoût
        </p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-4 shrink-0 text-[#FF6B2C]" />
            <span className="text-[#52525B]">{offer.delay}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Wallet className="mt-0.5 size-4 shrink-0 text-[#FF6B2C]" />
            <span className="text-[#52525B]">Acompte 50 % · solde à la livraison</span>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex-1 border-t border-[#E4E4E7] pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
          L&apos;essentiel
        </p>
        <ul className="mt-3 space-y-2.5">
          {preview.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-[#0A0A0A]" />
              <span className="text-[#0A0A0A] leading-snug">{item}</span>
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <p className="mt-3 text-xs text-[#71717A]">
            + {hiddenCount} autres prestations incluses
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-2.5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <button
                type="button"
                className={`inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-6 text-sm font-semibold transition-all active:scale-[0.98] ${
                  offer.featured
                    ? "bg-[#FF6B2C] text-white hover:bg-[#E55A1F]"
                    : "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
                }`}
              />
            }
          >
            En savoir plus
            <ArrowRight className="size-4" />
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#E4E4E7] bg-white p-0 sm:max-w-2xl">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* En-tête modal */}
                  <div className="border-b border-[#E4E4E7] bg-[#FAFAFA] p-6 pr-14 sm:p-8">
                    <span className="inline-block rounded-full bg-[#FF6B2C]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#FF6B2C]">
                      {offer.name}
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-[#0A0A0A] md:text-3xl">
                      {offer.tagline}
                    </h3>
                    <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="font-heading text-2xl font-bold text-[#0A0A0A]">
                          {offer.priceFormatted}&nbsp;&euro;
                        </div>
                        <p className="text-[11px] text-[#71717A]">Net de TVA</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-[#0A0A0A]">
                          <Clock className="size-3.5 text-[#FF6B2C]" />
                          {offer.delay}
                        </div>
                        <p className="text-[11px] text-[#71717A]">Délai garanti</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-[#0A0A0A]">
                          <Wallet className="size-3.5 text-[#FF6B2C]" />
                          50 % / 50 %
                        </div>
                        <p className="text-[11px] text-[#71717A]">{offer.payment}</p>
                      </div>
                    </div>
                  </div>

                  {/* Inclus / Non inclus */}
                  <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                        Ce qui est inclus
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {offer.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-[#FF6B2C]" />
                            <span className="text-[#0A0A0A] leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                        Non inclus
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {offer.excluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm"
                          >
                            <X className="mt-0.5 size-3.5 shrink-0 text-[#A1A1AA]" />
                            <span className="text-[#52525B] leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cible + pitch */}
                  <div className="border-t border-[#E4E4E7] bg-[#FAFAFA] p-6 sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                      Pour qui
                    </p>
                    <p className="mt-2 text-sm text-[#0A0A0A] leading-relaxed">
                      {offer.ideal}
                    </p>
                    <p className="mt-1.5 text-xs text-[#71717A] italic">
                      Ex&nbsp;: {offer.examples}
                    </p>

                    <blockquote className="mt-5 border-l-2 border-[#FF6B2C] pl-4 text-sm italic text-[#0A0A0A] leading-relaxed">
                      « {offer.pitch} »
                    </blockquote>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 border-t border-[#E4E4E7] p-6 sm:flex-row sm:p-8">
                    <Link
                      href="/contact"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#FF6B2C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
                    >
                      Demander un devis
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      href={`/offres/${offer.slug}`}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-[#0A0A0A] px-6 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
                    >
                      Page dédiée
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>

        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full text-sm font-medium text-[#71717A] hover:text-[#0A0A0A]"
        >
          Demander un devis →
        </Link>
      </div>
    </article>
  );
}
