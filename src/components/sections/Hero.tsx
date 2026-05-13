"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { Calendar } from "lucide-react";
import BookingCTA from "@/components/shared/BookingCTA";

const titleWords = ["Votre", "site", "web,", "votre", "meilleur", "commercial"];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7 + i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  const range = prefersReduced ? [0, 0] : [0, 500];
  const floatY1 = useTransform(scrollY, range, prefersReduced ? [0, 0] : [0, -60]);
  const floatY2 = useTransform(scrollY, range, prefersReduced ? [0, 0] : [0, 40]);
  const floatY3 = useTransform(scrollY, range, prefersReduced ? [0, 0] : [0, -30]);
  const floatRotate1 = useTransform(scrollY, range, prefersReduced ? [0, 0] : [0, 45]);
  const floatRotate2 = useTransform(scrollY, range, prefersReduced ? [0, 0] : [0, -30]);

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pb-28">
      {/* Floating geometric shapes */}
      <motion.div
        className="pointer-events-none absolute top-40 left-[10%] size-4 rounded-sm bg-[#FF6B2C]/20"
        style={{ y: floatY1, rotate: floatRotate1 }}
      />
      <motion.div
        className="pointer-events-none absolute top-60 right-[15%] size-6 rounded-full border-2 border-[#0A0A0A]/15"
        style={{ y: floatY2, rotate: floatRotate2 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-32 left-[20%] size-3 rounded-sm bg-[#FF6B2C]/15"
        style={{ y: floatY3, rotate: floatRotate1 }}
      />
      <motion.div
        className="pointer-events-none absolute top-32 right-[30%] size-5 rounded-full bg-[#0A0A0A]/10"
        style={{ y: floatY2 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-48 right-[10%] size-4 rotate-45 bg-[#FF6B2C]/10"
        style={{ y: floatY1, rotate: floatRotate2 }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <h1 className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.3em] inline-block"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                  {i === 2 && <br />}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-[#52525B]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Nous créons des sites internet performants pour les artisans,
              commerçants et professions libérales de Strasbourg et d&apos;Alsace.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Link
                href="/offres"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E55A1F]"
              >
                Voir les offres
              </Link>

              <BookingCTA className="h-12 rounded-full border border-[#0A0A0A] bg-transparent px-8 text-sm font-semibold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">
                <Calendar className="size-4" aria-hidden="true" />
                Réserver un appel
              </BookingCTA>
            </motion.div>
          </div>

          {/* Browser mockup */}
          <motion.div
            className="relative"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            role="img"
            aria-label="Aperçu illustratif d'un site web créé par Codalyx"
          >
            <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-2xl shadow-black/5">
              {/* Browser toolbar */}
              <div className="flex items-center gap-2 border-b border-[#E4E4E7] bg-[#FAFAFA] px-4 py-3">
                <span className="size-3 rounded-full bg-[#EF4444]" />
                <span className="size-3 rounded-full bg-[#F59E0B]" />
                <span className="size-3 rounded-full bg-[#22C55E]" />
                <div className="ml-4 flex-1 rounded-md bg-white px-4 py-1.5 text-xs text-[#71717A]">
                  www.votre-site.fr
                </div>
              </div>

              {/* Placeholder website content */}
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#FF6B2C]/80 p-8">
                {/* Fake nav */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-white/20" />
                  <div className="flex gap-3">
                    <div className="h-3 w-12 rounded bg-white/15" />
                    <div className="h-3 w-12 rounded bg-white/15" />
                    <div className="h-3 w-12 rounded bg-white/15" />
                  </div>
                </div>

                {/* Fake hero text */}
                <div className="mt-12 space-y-3">
                  <div className="h-6 w-3/4 rounded bg-white/25" />
                  <div className="h-6 w-1/2 rounded bg-white/25" />
                  <div className="mt-4 h-3 w-2/3 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                </div>

                {/* Fake CTA */}
                <div className="mt-8 flex gap-3">
                  <div className="h-10 w-32 rounded-full bg-[#FF6B2C]/80" />
                  <div className="h-10 w-28 rounded-full border border-white/30" />
                </div>

                {/* Fake cards row */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-lg bg-white/10" />
                  <div className="h-20 rounded-lg bg-white/10" />
                  <div className="h-20 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>

            {/* Decorative blur blobs */}
            <div className="pointer-events-none absolute -top-8 -right-8 size-40 rounded-full bg-[#FF6B2C]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 size-40 rounded-full bg-[#0A0A0A]/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
