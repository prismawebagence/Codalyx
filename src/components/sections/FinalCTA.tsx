"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BookingCTA from "@/components/shared/BookingCTA";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          Discutons de votre projet
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          Un appel d&eacute;couverte de 20 minutes, gratuit et sans engagement, pour
          d&eacute;finir ensemble la meilleure strat&eacute;gie pour votre pr&eacute;sence en ligne.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <BookingCTA className="h-12 cursor-pointer rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-white hover:bg-[#E55A1F]">
            R&eacute;server un appel gratuit
          </BookingCTA>

          <Link
            href="/offres"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Voir les offres
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
