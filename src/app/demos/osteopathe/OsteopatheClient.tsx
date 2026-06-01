"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Quote,
  Train,
  X,
} from "lucide-react";
import type { PexelsPhoto } from "@/lib/pexels";
import BookingModule from "./BookingModule";

/* ============================================================
   DATA
   ============================================================ */

const SECTIONS = [
  { id: "reserver", label: "Réserver" },
  { id: "approche", label: "L'approche" },
  { id: "praticien", label: "Le praticien" },
  { id: "cabinet", label: "Le cabinet" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const ZONES = [
  {
    id: "cranien",
    label: "Crâne & cervicales",
    pilier: "Crânien",
    description:
      "Techniques fines sur la boîte crânienne et la charnière cervicale. Indiquées pour migraines, acouphènes, troubles du sommeil, suites de traumatisme.",
    x: 50,
    y: 18,
    r: 4,
  },
  {
    id: "epaules",
    label: "Épaules & dorsales",
    pilier: "Structurel",
    description:
      "Mobilisation des ceintures scapulaires et de la colonne dorsale. Pour les douleurs de bureau, capsulites, tensions du haut du corps.",
    x: 50,
    y: 45,
    r: 4,
  },
  {
    id: "visceral",
    label: "Abdomen & diaphragme",
    pilier: "Viscéral",
    description:
      "Travail doux sur les organes internes, le diaphragme et les fascias. Reflux, ballonnements, suites de chirurgie abdominale.",
    x: 50,
    y: 75,
    r: 4,
  },
  {
    id: "lombaires",
    label: "Lombaires & bassin",
    pilier: "Structurel",
    description:
      "Décompression du bas du dos, rééquilibrage du bassin. Lombalgies, sciatiques, suivi de grossesse et post-partum.",
    x: 50,
    y: 100,
    r: 4,
  },
  {
    id: "hanches",
    label: "Hanches",
    pilier: "Structurel",
    description:
      "Libération des articulations coxo-fémorales. Douleurs de hanche, blocages, préparation et récupération du sportif.",
    x: 50,
    y: 120,
    r: 4,
  },
  {
    id: "genoux",
    label: "Genoux & chevilles",
    pilier: "Structurel",
    description:
      "Chaînes descendantes, entorses anciennes, tendinopathies du coureur. Travail en lien avec le bassin et la posture globale.",
    x: 50,
    y: 175,
    r: 3.5,
  },
] as const;

type ZoneId = (typeof ZONES)[number]["id"];

const HORAIRES = [
  { day: "Lun", hours: "9h — 19h" },
  { day: "Mar", hours: "9h — 19h" },
  { day: "Mer", hours: "9h — 13h" },
  { day: "Jeu", hours: "9h — 19h" },
  { day: "Ven", hours: "9h — 19h" },
  { day: "Sam", hours: "9h — 13h" },
  { day: "Dim", hours: "Fermé" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Après deux séances, mes lombalgies post-accouchement ont vraiment reculé. Écoute rare et gestes très précis.",
    author: "Sophie R.",
    context: "Grossesse",
  },
  {
    quote:
      "Cabinet calme, praticienne qui prend le temps d'expliquer. Je viens maintenant en entretien tous les six mois.",
    author: "Julien M.",
    context: "Entretien",
  },
  {
    quote:
      "Mon fils de trois mois dormait mal, le travail crânien a tout changé en une séance. Merci.",
    author: "Inès B.",
    context: "Nourrisson",
  },
] as const;

/* ============================================================
   COMPONENT
   ============================================================ */

export interface OsteopatheClientProps {
  praticienImage: PexelsPhoto;
  cabinetGallery: PexelsPhoto[];
}

export default function OsteopatheClient({
  praticienImage,
  cabinetGallery,
}: OsteopatheClientProps) {
  const scrollRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("reserver");
  const [activeZone, setActiveZone] = useState<ZoneId>("lombaires");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Scroll-spy : on observe chaque section dans la colonne de droite.
  useEffect(() => {
    const main = scrollRef.current;
    if (!main) return;

    const sections = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Desktop : scroll interne dans <main>. Mobile : scroll viewport.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const root = isDesktop ? main : null;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        root,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setDrawerOpen(false);
  };

  const currentZone = useMemo(
    () => ZONES.find((z) => z.id === activeZone) ?? ZONES[3],
    [activeZone],
  );

  return (
    <>
      {/* -------- MOBILE TOP BAR -------- */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#2F4A34]/15 bg-[#F5F1EA]/95 px-5 py-3 backdrop-blur-xl lg:hidden">
        <Link href="#reserver" className="flex items-baseline gap-2">
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-osteo-display)" }}
          >
            Studio Méridien
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="tel:+33472000000"
            aria-label="Appeler le cabinet"
            className="flex size-10 items-center justify-center rounded-full border border-[#2F4A34]/20 text-[#2F4A34]"
          >
            <Phone className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full bg-[#2F4A34] px-4 text-xs font-semibold uppercase tracking-wider text-white"
          >
            Sommaire
          </button>
        </div>
      </div>

      {/* -------- MOBILE DRAWER -------- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-[#1A1F1B]/70 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              key="panel"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col gap-4 bg-[#2F4A34] px-6 pb-8 pt-6 text-white"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xl font-semibold"
                  style={{ fontFamily: "var(--font-osteo-display)" }}
                >
                  Studio Méridien
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fermer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/25"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-4 flex flex-col">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToSection(s.id)}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4 text-left transition-colors hover:text-[#F5C9B9]"
                  >
                    <span
                      className="flex-1 text-3xl font-semibold tracking-tight"
                      style={{ fontFamily: "var(--font-osteo-display)" }}
                    >
                      {s.label}
                    </span>
                    <ArrowUpRight className="size-5 text-[#F5C9B9]" />
                  </button>
                ))}
              </nav>
              <a
                href="tel:+33472000000"
                className="mt-4 flex h-14 items-center justify-center gap-2 rounded-full bg-[#C06B4E] text-sm font-semibold uppercase tracking-wider"
              >
                <Phone className="size-4" />
                04 72 00 00 00
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------- SPLIT LAYOUT -------- */}
      <div className="lg:grid lg:h-screen lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
        {/* ============ LEFT STICKY PANEL ============ */}
        <aside className="relative flex flex-col justify-between overflow-hidden bg-[#2F4A34] px-8 py-10 text-[#F5F1EA] lg:h-screen lg:px-12 lg:py-14">
          {/* Subtle anatomical curve in background */}
          <svg
            aria-hidden
            viewBox="0 0 400 600"
            className="pointer-events-none absolute -right-24 -top-12 h-[140%] w-auto opacity-[0.07]"
          >
            <path
              d="M 200 40 C 180 100, 130 130, 120 210 S 180 340, 200 420 S 260 500, 200 580"
              fill="none"
              stroke="#F5C9B9"
              strokeWidth="2"
            />
            <path
              d="M 200 40 C 220 100, 270 130, 280 210 S 220 340, 200 420 S 140 500, 200 580"
              fill="none"
              stroke="#F5C9B9"
              strokeWidth="2"
            />
          </svg>

          {/* Brand */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#F5C9B9]">
                Cabinet d&apos;ostéopathie · Lyon 6
              </span>
              <h1
                className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Studio
                <br />
                <span
                  className="italic text-[#F5C9B9]"
                  style={{ fontVariationSettings: "'SOFT' 100" }}
                >
                  Méridien
                </span>
              </h1>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/75">
                Une pratique lente, patiente — centrée sur l&apos;écoute du corps.
                Prise de rendez-vous en ligne, règlement sur place.
              </p>
            </motion.div>
          </div>

          {/* Vertical scroll-spy nav */}
          <nav className="relative mt-10 hidden lg:block">
            <ul>
              {SECTIONS.map((s) => {
                const active = s.id === activeSection;
                return (
                  <li key={s.id} className="relative">
                    <button
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      className="group flex w-full items-baseline gap-5 py-3 text-left"
                    >
                      <span
                        className={`relative flex-1 text-2xl font-semibold tracking-tight transition-all duration-500 ${
                          active
                            ? "translate-x-2 text-white"
                            : "text-white/50 group-hover:translate-x-1 group-hover:text-white/80"
                        }`}
                        style={{ fontFamily: "var(--font-osteo-display)" }}
                      >
                        {s.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-px bg-[#F5C9B9] transition-all duration-700 ease-out ${
                            active ? "w-10" : "w-0"
                          }`}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Praticien mini card + phone */}
          <div className="relative mt-10 flex items-center gap-4">
            <div
              className="size-14 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5"
              style={{ backgroundColor: praticienImage.avgColor || "#1A1F1B" }}
            >
              {praticienImage.src && (
                 
                <img
                  src={praticienImage.src}
                  alt={praticienImage.alt || "Camille Verdier"}
                  className="size-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F5C9B9]">
                Ostéopathe D.O.
              </div>
              <div
                className="truncate text-base font-semibold"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Camille Verdier
              </div>
            </div>
            <a
              href="tel:+33472000000"
              className="hidden shrink-0 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#F5C9B9] hover:text-[#F5C9B9] sm:inline-flex"
            >
              <Phone className="size-3.5" />
              04 72 00 00 00
            </a>
          </div>

          {/* Agency credit */}
          <div className="relative mt-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
            <span>Démo — 2026</span>
            <Link href="/" className="hover:text-[#F5C9B9]">
              par PrismaWeb →
            </Link>
          </div>
        </aside>

        {/* ============ RIGHT SCROLL-SNAP PANEL ============ */}
        <main
          ref={scrollRef}
          className="bg-[#F5F1EA] lg:h-screen lg:snap-y lg:snap-mandatory lg:overflow-y-auto"
        >
          {/* ------------ 01 · RÉSERVER (hero) ------------ */}
          <section
            id="reserver"
            className="relative flex min-h-screen flex-col justify-center px-6 py-16 sm:px-10 lg:snap-start lg:px-14 lg:py-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2F4A34]/20 bg-white px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#2F4A34]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-[#C06B4E] opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#C06B4E]" />
                </span>
                Cabinet ouvert aujourd&apos;hui
              </span>
              <h2
                className="mt-5 text-4xl font-semibold leading-[1] tracking-[-0.02em] text-[#1A1F1B] sm:text-5xl lg:text-[3.25rem]"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Prenez rendez-vous
                <br />
                <span
                  className="italic text-[#C06B4E]"
                  style={{ fontVariationSettings: "'SOFT' 100" }}
                >
                  en trois minutes.
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#1A1F1B]/70">
                Choisissez la prestation, la date et un créneau libre. Une
                confirmation arrive dans votre boîte mail — le règlement se fait
                sur place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8"
            >
              <BookingModule />
            </motion.div>
          </section>

          {/* ------------ 02 · APPROCHE (body map) ------------ */}
          <section
            id="approche"
            className="relative flex min-h-screen flex-col justify-center bg-white px-6 py-16 sm:px-10 lg:snap-start lg:px-14 lg:py-14"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C06B4E]">
                  l&apos;approche
                </span>
                <h2
                  className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.02em] text-[#1A1F1B] sm:text-5xl lg:text-[3.25rem]"
                  style={{ fontFamily: "var(--font-osteo-display)" }}
                >
                  Le corps comme
                  <br />
                  <span
                    className="italic text-[#2F4A34]"
                    style={{ fontVariationSettings: "'SOFT' 100" }}
                  >
                    un système entier.
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#1A1F1B]/70">
                  Cliquez sur une zone du corps pour voir l&apos;angle thérapeutique
                  qui lui correspond. Aucune manipulation brusque — uniquement
                  des gestes mesurés, adaptés à votre état du jour.
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentZone.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 rounded-2xl border border-[#2F4A34]/15 bg-[#F5F1EA] p-5"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C06B4E]">
                      {currentZone.pilier}
                    </span>
                    <h3
                      className="mt-1 text-2xl font-semibold tracking-tight text-[#1A1F1B]"
                      style={{ fontFamily: "var(--font-osteo-display)" }}
                    >
                      {currentZone.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#1A1F1B]/70">
                      {currentZone.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Body map SVG */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex h-[460px] w-full max-w-[280px] items-center justify-center sm:h-[560px] sm:max-w-[340px] lg:h-[640px] lg:max-w-[360px]"
              >
                <BodyMap active={activeZone} onSelect={setActiveZone} />
              </motion.div>
            </div>
          </section>

          {/* ------------ 03 · PRATICIEN ------------ */}
          <section
            id="praticien"
            className="relative flex min-h-screen flex-col justify-center bg-[#F5F1EA] px-6 py-16 sm:px-10 lg:snap-start lg:px-14 lg:py-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C06B4E]">
                le praticien
              </span>
              <h2
                className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.02em] text-[#1A1F1B] sm:text-5xl lg:text-[3.25rem]"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Douze ans
                <br />
                <span
                  className="italic text-[#2F4A34]"
                  style={{ fontVariationSettings: "'SOFT' 100" }}
                >
                  à écouter les corps.
                </span>
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#2F4A34]/15"
                style={{
                  backgroundColor: praticienImage.avgColor || "#2F4A34",
                }}
              >
                {praticienImage.src && (
                   
                  <img
                    src={praticienImage.src}
                    alt={praticienImage.alt || "Portrait de Camille Verdier"}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 p-3 text-[#1A1F1B] backdrop-blur-md">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C06B4E]">
                    Ostéopathe D.O.
                  </div>
                  <div
                    className="mt-0.5 text-lg font-semibold tracking-tight"
                    style={{ fontFamily: "var(--font-osteo-display)" }}
                  >
                    Camille Verdier
                  </div>
                  <div className="text-[11px] text-[#1A1F1B]/60">
                    N° ADELI 69 01 2345 6
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30%" }}
                transition={{
                  delay: 0.15,
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-6"
              >
                <div className="space-y-4 text-[15px] leading-relaxed text-[#1A1F1B]/75">
                  <p>
                    Diplômée de l&apos;École Supérieure d&apos;Ostéopathie en 2013, Camille
                    a d&apos;abord exercé trois ans en cabinet partagé avant d&apos;ouvrir
                    Studio Méridien en 2018.
                  </p>
                  <p>
                    Formation continue chaque année, spécialisation en pédiatrie
                    puis en ostéopathie du sport. Un réseau de confrères
                    kinésithérapeutes, médecins et sages-femmes pour un suivi
                    pluridisciplinaire.
                  </p>
                </div>

                {/* Testimonials — full width of text column for readability */}
                <ul className="flex flex-col gap-3">
                  {TESTIMONIALS.map((t, i) => (
                    <motion.li
                      key={t.author}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{
                        delay: 0.3 + i * 0.12,
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex gap-4 rounded-2xl border border-[#2F4A34]/15 bg-white p-5"
                    >
                      <Quote
                        className="size-5 shrink-0 text-[#C06B4E]"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] leading-relaxed text-[#1A1F1B]/80">
                          {t.quote}
                        </p>
                        <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-[#2F4A34]/10 pt-3 text-[11px]">
                          <span className="font-semibold text-[#1A1F1B]">
                            {t.author}
                          </span>
                          <span className="font-mono uppercase tracking-wider text-[#C06B4E]">
                            {t.context}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ------------ 04 · CABINET ------------ */}
          <section
            id="cabinet"
            className="relative flex min-h-screen flex-col justify-center bg-[#1A1F1B] px-6 py-16 text-[#F5F1EA] sm:px-10 lg:snap-start lg:px-14 lg:py-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#F5C9B9]">
                le cabinet
              </span>
              <h2
                className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Au calme,
                <br />
                <span
                  className="italic text-[#F5C9B9]"
                  style={{ fontVariationSettings: "'SOFT' 100" }}
                >
                  au cœur du 6ème.
                </span>
              </h2>
            </motion.div>

            {/* Gallery strip */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cabinetGallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative overflow-hidden rounded-sm border border-white/10 ${
                    i === 0
                      ? "col-span-2 row-span-2 aspect-[4/5]"
                      : "aspect-square"
                  }`}
                  style={{ backgroundColor: img.avgColor || "#2F4A34" }}
                >
                  {img.src && (
                     
                    <img
                      src={img.src}
                      alt={img.alt || "Cabinet"}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Infos + horaires */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{
                delay: 0.3,
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-10"
            >
              {/* Adresse */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C06B4E]/20 text-[#F5C9B9]">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                    Adresse
                  </div>
                  <a
                    href="https://maps.google.com/?q=42+rue+Boileau+69006+Lyon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm leading-relaxed text-white/90 hover:text-[#F5C9B9]"
                  >
                    42 rue Boileau
                    <br />
                    69006 Lyon
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C06B4E]/20 text-[#F5C9B9]">
                  <Phone className="size-4" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                      Contact
                    </div>
                    <a
                      href="tel:+33472000000"
                      className="mt-1 block text-sm text-white/90 hover:text-[#F5C9B9]"
                    >
                      04 72 00 00 00
                    </a>
                    <a
                      href="mailto:contact@studio-meridien.fr"
                      className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-[#F5C9B9]"
                    >
                      <Mail className="size-3" />
                      contact@studio-meridien.fr
                    </a>
                  </div>
                </div>
              </div>

              {/* Accès */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C06B4E]/20 text-[#F5C9B9]">
                  <Train className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                    Accès
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-white/90">
                    Métro A · Foch
                    <br />
                    Vélo&apos;v à 30 m · PMR
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Horaires strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{
                delay: 0.4,
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 border-t border-white/10 pt-6"
            >
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-[#F5C9B9]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                  Horaires d&apos;ouverture
                </span>
              </div>
              <ul className="mt-4 grid grid-cols-4 gap-x-4 gap-y-2 sm:grid-cols-7">
                {HORAIRES.map((h) => (
                  <li key={h.day} className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                      {h.day}
                    </span>
                    <span className="mt-0.5 text-xs font-semibold">
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Footer mention */}
            <div className="mt-auto flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 sm:flex-row sm:items-center">
              <span>© {new Date().getFullYear()} Studio Méridien — démo fictive</span>
              <Link href="/" className="hover:text-[#F5C9B9]">
                créé par PrismaWeb →
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

/* ============================================================
   BODY MAP (SVG)
   ============================================================ */

function BodyMap({
  active,
  onSelect,
}: {
  active: ZoneId;
  onSelect: (id: ZoneId) => void;
}) {
  return (
    <svg
      viewBox="0 0 100 220"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-label="Silhouette du corps humain avec zones de traitement"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0CFB8" />
          <stop offset="100%" stopColor="#B89878" />
        </linearGradient>
      </defs>

      {/* Silhouette anatomique */}
      <g
        fill="url(#bodyGrad)"
        stroke="#2F4A34"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Tête */}
        <ellipse cx="50" cy="16" rx="9" ry="11" />

        {/* Cou */}
        <path d="M 45 26 Q 45 30 44 32.5 L 56 32.5 Q 55 30 55 26 Z" />

        {/* Torse (épaules → taille → hanches) */}
        <path
          d="
            M 38 33
            Q 42 32 50 31.5
            Q 58 32 62 33
            C 67 34, 70 37, 71 41
            L 72 55
            C 72 60, 70 64, 68 66
            L 66 98
            C 65 106, 66 114, 68 122
            L 32 122
            C 34 114, 35 106, 34 98
            L 32 66
            C 30 64, 28 60, 28 55
            L 29 41
            C 30 37, 33 34, 38 33
            Z
          "
        />

        {/* Bras gauche (du point de vue spectateur : droit de la silhouette) */}
        <path
          d="
            M 28 42
            C 25 44, 23 48, 22 54
            L 20 95
            C 20 99, 21 102, 22 105
            L 22 115
            C 22 117, 23 118, 24 118
            L 28 118
            C 29.5 118, 30.5 117, 30.5 115
            L 30.5 107
            C 31 103, 31.5 99, 31 95
            L 31 60
            C 31 54, 31.5 50, 32 46
            Z
          "
        />

        {/* Bras droit (miroir) */}
        <path
          d="
            M 72 42
            C 75 44, 77 48, 78 54
            L 80 95
            C 80 99, 79 102, 78 105
            L 78 115
            C 78 117, 77 118, 76 118
            L 72 118
            C 70.5 118, 69.5 117, 69.5 115
            L 69.5 107
            C 69 103, 68.5 99, 69 95
            L 69 60
            C 69 54, 68.5 50, 68 46
            Z
          "
        />

        {/* Jambe gauche */}
        <path
          d="
            M 33 122
            Q 34 128, 34 135
            L 33 170
            L 32 205
            C 32 210, 33 212, 35 212
            L 44 212
            C 45 212, 45.5 211, 45.5 209
            L 46 170
            L 47.5 135
            Q 47.5 128, 48 122
            Z
          "
        />

        {/* Jambe droite */}
        <path
          d="
            M 52 122
            Q 52.5 128, 52.5 135
            L 54 170
            L 54.5 209
            C 54.5 211, 55 212, 56 212
            L 65 212
            C 67 212, 68 210, 68 205
            L 67 170
            L 66 135
            Q 66 128, 67 122
            Z
          "
        />
      </g>

      {/* Ligne médiane discrète */}
      <line
        x1="50"
        y1="29"
        x2="50"
        y2="210"
        stroke="#C06B4E"
        strokeWidth="0.25"
        strokeDasharray="1.2 1.2"
        opacity="0.35"
      />

      {/* Hotspots */}
      {ZONES.map((z) => {
        const isActive = z.id === active;
        return (
          <g
            key={z.id}
            className="cursor-pointer"
            onClick={() => onSelect(z.id)}
          >
            {/* Pulse ring (actif uniquement) */}
            {isActive && (
              <circle
                cx={z.x}
                cy={z.y}
                r={z.r}
                fill="none"
                stroke="#C06B4E"
                strokeWidth="0.35"
                opacity="0.7"
              >
                <animate
                  attributeName="r"
                  from={z.r}
                  to={z.r * 2.6}
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.7"
                  to="0"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Hit area étendue pour faciliter le clic */}
            <circle cx={z.x} cy={z.y} r={z.r * 2.2} fill="transparent">
              <title>{z.label}</title>
            </circle>

            {/* Point visible */}
            <circle
              cx={z.x}
              cy={z.y}
              r={isActive ? z.r : z.r * 0.75}
              fill={isActive ? "#C06B4E" : "#2F4A34"}
              stroke="#F5F1EA"
              strokeWidth="0.7"
              style={{ transition: "r 0.4s ease, fill 0.4s ease" }}
            />

            {/* Point central blanc (actif) */}
            {isActive && (
              <circle
                cx={z.x}
                cy={z.y}
                r={z.r * 0.3}
                fill="#F5F1EA"
              />
            )}
          </g>
        );
      })}

      {/* Label de la zone active */}
      {ZONES.filter((z) => z.id === active).map((z) => (
        <g key={`label-${z.id}`}>
          {/* Trait de connexion */}
          <line
            x1={z.x + z.r + 0.5}
            y1={z.y}
            x2={z.x + 18}
            y2={z.y}
            stroke="#C06B4E"
            strokeWidth="0.3"
          />
          <circle cx={z.x + 18} cy={z.y} r="0.8" fill="#C06B4E" />
          <text
            x={z.x + 20}
            y={z.y + 0.8}
            fontSize="3.2"
            fontFamily="var(--font-osteo-body), sans-serif"
            fontWeight="600"
            fill="#1A1F1B"
          >
            {z.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
