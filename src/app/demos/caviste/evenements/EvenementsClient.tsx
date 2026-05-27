"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Users, Calendar, Wine, Mail } from "lucide-react";
import { EVENTS } from "../data";

export default function EvenementsClient() {
  return (
    <section className="min-h-screen bg-[#0D0D0D] px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header — left-aligned asymmetric */}
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
              — Prochainement
            </span>
            <h1
              className="mt-3 text-4xl font-bold leading-none tracking-tighter text-[#F5F0E8] lg:text-5xl"
              style={{ fontFamily: "var(--font-caviste-display)" }}
            >
              Dégustations<br />
              <span className="italic text-[#C9A84C]">& ateliers</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
            className="max-w-xs text-sm leading-relaxed text-[#F5F0E8]/50 lg:text-right"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            Chaque mois, nous réunissons amateurs éclairés et vignerons passionnés autour d&apos;une thématique.
            Places limitées, réservation indispensable.
          </motion.p>
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 20, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-[#C9A84C]/10 bg-[#1A0A0A] transition-all hover:border-[#C9A84C]/30"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#C9A84C]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                {/* Date block */}
                <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-center sm:text-center">
                  <div
                    className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border border-[#C9A84C]/25 bg-[#C9A84C]/8"
                  >
                    <Calendar className="size-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9A84C]">
                      {event.date.split(" ")[0]}
                    </div>
                    <div
                      className="text-lg font-bold text-[#F5F0E8]"
                      style={{ fontFamily: "var(--font-caviste-display)" }}
                    >
                      {event.date.split(" ").slice(1).join(" ")}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden h-20 w-px bg-[#C9A84C]/10 sm:block" />

                {/* Content */}
                <div className="flex-1">
                  <h2
                    className="text-xl font-semibold text-[#F5F0E8] sm:text-2xl"
                    style={{ fontFamily: "var(--font-caviste-display)" }}
                  >
                    {event.title}
                  </h2>
                  <p
                    className="mt-2 text-sm leading-relaxed text-[#F5F0E8]/55"
                    style={{ fontFamily: "var(--font-caviste-body)" }}
                  >
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#F5F0E8]/40">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {event.duree}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" />
                      {event.places <= 4 ? (
                        <span className="flex items-center gap-1.5 font-semibold text-[#722F37]">
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            className="inline-block size-1.5 rounded-full bg-[#722F37]"
                          />
                          {event.places} places restantes
                        </span>
                      ) : (
                        <span>{event.places} places disponibles</span>
                      )}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-[#C9A84C]" /> Dégustation commentée
                    </span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex shrink-0 flex-row items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
                  <div
                    className="text-3xl font-bold text-[#C9A84C]"
                    style={{ fontFamily: "var(--font-caviste-display)" }}
                  >
                    {event.prix} €
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[#C9A84C]/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] active:scale-[0.98] active:-translate-y-[1px]"
                  >
                    Réserver
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
          className="mt-12 rounded-2xl border border-[#C9A84C]/10 bg-[#1A0A0A] p-7"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Wine, title: "Petits groupes", desc: "Maximum 15 personnes pour des échanges de qualité." },
              { Icon: Users, title: "Vignerons présents", desc: "Rencontrez les producteurs qui façonnent ces terroirs." },
              { Icon: Mail, title: "Sur liste d&apos;attente", desc: "Les événements complets ont une liste. Contactez-nous." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/8">
                  <Icon className="size-4 text-[#C9A84C]" />
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-[#F5F0E8]"
                    style={{ fontFamily: "var(--font-caviste-display)" }}
                  >
                    {title}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#F5F0E8]/45" style={{ fontFamily: "var(--font-caviste-body)" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
