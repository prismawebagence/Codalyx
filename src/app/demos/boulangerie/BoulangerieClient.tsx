"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Clock,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import type { PexelsPhoto } from "@/lib/pexels";
import { useLocale } from "./LocaleProvider";
import { BCP47 } from "./translations";
import LanguageSwitcher from "./LanguageSwitcher";

/* ============================================================
   DATA LOCALE-AGNOSTIC (poids, prix, accents — identiques en FR/DE/EN)
   ============================================================ */

const NAV_HREFS = ["#fournee", "#carte", "#rituel", "#gramme", "#trouver"] as const;

const PAIN_NUMERIC = [
  { weight: "400 g", price: "3,20" },
  { weight: "250 g", price: "1,80" },
  { weight: "500 g", price: "4,50" },
  { weight: "600 g", price: "12,00" },
  { weight: "450 g", price: "4,20" },
  { weight: "350 g", price: "6,50" },
] as const;

const PROCESS_ACCENTS = ["#E63946", "#F4B942", "#2F4A34", "#0A0A0A"] as const;

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const letterStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.2 },
  },
};

const letter: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const drawerBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const drawerPanel: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 320, damping: 34 },
  },
  exit: { x: "100%", transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } },
};

/* ============================================================
   HELPERS
   ============================================================ */

function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      variants={letterStagger}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={letter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericOnly = /^[\d]+$/.test(value);
  const [display, setDisplay] = useState(() =>
    numericOnly ? value.replace(/\d/g, "0") : value,
  );

  useEffect(() => {
    if (!numericOnly) return; // valeurs non-numériques rendues directement, pas d'animation.
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value, 10);
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(String(Math.round(target * eased)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, numericOnly]);

  return <span ref={ref}>{numericOnly ? display : value}</span>;
}

/* ============================================================
   COMPONENT
   ============================================================ */

export interface BoulangerieClientProps {
  heroSideImage: PexelsPhoto;
  fourneeImage: PexelsPhoto;
  painImages: PexelsPhoto[];
  processImages: PexelsPhoto[];
  galleryImages: PexelsPhoto[];
}

export default function BoulangerieClient({
  heroSideImage,
  fourneeImage,
  painImages,
  processImages,
  galleryImages,
}: BoulangerieClientProps) {
  const { locale, t } = useLocale();

  const navLinks = [
    { href: NAV_HREFS[0], label: t.nav.fournee },
    { href: NAV_HREFS[1], label: t.nav.carte },
    { href: NAV_HREFS[2], label: t.nav.rituel },
    { href: NAV_HREFS[3], label: t.nav.instagram },
    { href: NAV_HREFS[4], label: t.nav.trouver },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Rotating word — l'intervalle borne l'index via modulo, donc même si la
  // langue change en cours de route l'index reste valide. Pas de reset explicite.
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % t.hero.rotatingWords.length),
      2200,
    );
    return () => clearInterval(id);
  }, [t.hero.rotatingWords.length]);

  // Rotating testimonial
  useEffect(() => {
    const id = setInterval(
      () => setActiveTestimonial((i) => (i + 1) % t.testimonials.length),
      5500,
    );
    return () => clearInterval(id);
  }, [t.testimonials.length]);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Horizontal scroll pinned section
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });
  // Distance à translater en pixels = largeur totale du track moins la viewport.
  // Recalculée au resize pour rester responsive (cartes 82vw mobile vs 460px desktop).
  const [trackEndX, setTrackEndX] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setTrackEndX(-Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);
  const hX = useTransform(hProgress, [0, 1], [0, trackEndX]);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroP, [0, 1], ["0%", "30%"]);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Mouse-follow accent blob in hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const blobY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleHeroMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const today = new Date().toLocaleDateString(BCP47[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Compose pains + process avec leur photo respective + textes traduits
  const pains = t.pains.map((p, i) => ({
    ...p,
    weight: PAIN_NUMERIC[i].weight,
    price: PAIN_NUMERIC[i].price,
    image: painImages[i],
  }));
  const process = t.rituel.steps.map((s, i) => ({
    ...s,
    num: String(i + 1).padStart(2, "0"),
    accent: PROCESS_ACCENTS[i],
    image: processImages[i],
  }));
  const rotatingWords = t.hero.rotatingWords;
  const stats = t.stats;
  const tickerItems = t.ticker;
  const testimonials = t.testimonials;
  const horaires = t.trouver.horaires;

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#E63946]"
        style={{ scaleX }}
      />

      {/* ---------- NAVBAR ---------- */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F4F1EC]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="#top" className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-full bg-[#0A0A0A] text-white">
              <span
                className="font-demo-display text-lg font-bold leading-none"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                M
              </span>
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#E63946]" />
            </div>
            <div className="leading-tight">
              <span
                className="block text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                Maison Farine
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-black/50">
                Strasbourg · EST. 1987
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative flex items-center gap-1.5 py-2 transition-colors hover:text-[#E63946]"
              >
                <span>{l.label}</span>
                <span className="absolute inset-x-2 -bottom-px h-px origin-left scale-x-0 bg-[#E63946] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="tel:+33388000000"
              className="hidden h-10 items-center gap-2 rounded-full border border-black/15 px-4 text-sm font-medium transition-colors hover:border-black md:inline-flex"
            >
              <Phone className="size-3.5" />
              03 88 00 00 00
            </a>
            <a
              href="#trouver"
              className="hidden h-10 items-center justify-center rounded-full bg-[#0A0A0A] px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E63946] md:inline-flex"
            >
              {t.nav.order}
              <ArrowUpRight className="ml-1.5 size-4" />
            </a>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={t.nav.openMenu}
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-transform active:scale-90 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MOBILE DRAWER ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            variants={drawerBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              key="panel"
              variants={drawerPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-md flex-col bg-[#0A0A0A] p-6 text-white sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono uppercase tracking-[0.3em] text-[#F4B942]"
                  style={{ fontFamily: "var(--font-demo-body)" }}
                >
                  {t.nav.menuTag}
                </span>
                <button
                  type="button"
                  aria-label={t.nav.closeMenu}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#E63946] hover:text-[#E63946]"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-14 flex flex-1 flex-col">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center justify-between border-b border-white/10 py-5 transition-colors hover:text-[#E63946]"
                  >
                    <span
                      className="text-3xl font-semibold sm:text-4xl"
                      style={{ fontFamily: "var(--font-demo-display)" }}
                    >
                      {l.label}
                    </span>
                    <ArrowUpRight className="size-6 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 space-y-4"
              >
                <a
                  href="tel:+33388000000"
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <Phone className="size-4 text-[#E63946]" />
                  03 88 00 00 00
                </a>
                <a
                  href="#trouver"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#E63946] text-base font-semibold text-white"
                >
                  {t.nav.orderToday}
                  <ArrowUpRight className="size-5" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- HERO ---------- */}
      <section
        id="top"
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        className="relative overflow-hidden"
      >
        {/* Follow blob */}
        <motion.div
          aria-hidden
          style={{ x: blobX, y: blobY, translateX: "-50%", translateY: "-50%" }}
          className="pointer-events-none absolute left-0 top-0 hidden size-[420px] rounded-full bg-[#E63946]/20 blur-[90px] lg:block"
        />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 pb-10 pt-12 sm:px-8 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-20">
          {/* Date chip */}
          <div className="lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.25em]"
            >
              <span className="inline-flex size-2 rounded-full bg-[#E63946]">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-[#E63946] opacity-75" />
              </span>
              <span>{t.hero.tagRunning} {today}</span>
              <span className="h-px w-8 bg-black/30" />
              <span>48°35′N · 07°44′E</span>
            </motion.div>
          </div>

          {/* Huge title with rotating word */}
          <div className="lg:col-span-8">
            <h1
              className="font-demo-display text-[11vw] font-bold leading-[0.9] tracking-[-0.04em] [hyphens:auto] [overflow-wrap:anywhere] sm:text-7xl sm:[overflow-wrap:normal] md:text-8xl lg:text-[9.5rem]"
              style={{ fontFamily: "var(--font-demo-display)" }}
            >
              <SplitText text={t.hero.title1} delay={0} className="block" />
              <span className="block">
                <SplitText text={`${t.hero.titleConnector} `} delay={0.3} className="inline" />
                <span className="relative inline-block pr-[0.1em] text-[#E63946]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: "0.35em", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-0.35em", opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block italic"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <SplitText text={t.hero.titleEnd} delay={0.6} className="block" />
            </h1>
          </div>

          {/* Side image + paragraph */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-black/10"
              style={{ backgroundColor: heroSideImage.avgColor }}
            >
              {heroSideImage.src && (
                <motion.img
                  src={heroSideImage.src}
                  alt={heroSideImage.alt || t.hero.sideBadge}
                  style={{ y: heroImageY }}
                  className="h-full w-full scale-110 object-cover"
                />
              )}
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                {t.hero.sideBadge}
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="max-w-sm text-sm leading-relaxed text-black/70"
            >
              {t.hero.paragraph}
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              href="#carte"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em]"
            >
              {t.hero.cta}
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-all group-hover:-rotate-45 group-hover:bg-[#E63946]">
                <ArrowUpRight className="size-4" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-y border-black/10 bg-[#0A0A0A] text-white">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="px-5 py-6 sm:px-8 sm:py-8"
              >
                <span
                  className="block text-4xl font-bold tracking-tight sm:text-5xl"
                  style={{ fontFamily: "var(--font-demo-display)" }}
                >
                  <Counter value={s.value} />
                </span>
                <span className="mt-2 block text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TICKER ---------- */}
      <section
        aria-hidden="true"
        className="overflow-hidden border-b border-black/10 bg-[#F4B942] py-4"
      >
        <motion.div
          className="flex gap-8 whitespace-nowrap text-2xl font-bold tracking-tight sm:text-3xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ fontFamily: "var(--font-demo-display)" }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="inline-block size-2 shrink-0 rounded-full bg-[#0A0A0A]" />
            </span>
          ))}
        </motion.div>
      </section>

      {/* ---------- FOURNEE DU JOUR ---------- */}
      <section id="fournee" className="bg-[#F4F1EC] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E63946]">
                {t.fournee.kicker}
              </span>
              <h2
                className="mt-3 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                {t.fournee.heading1}
                <br />
                {t.fournee.heading2}{" "}
                <span className="text-[#E63946]">{t.fournee.heading3Time}</span>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/60">
              {t.fournee.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-0 overflow-hidden rounded-sm border border-black/15 bg-white md:grid-cols-5"
          >
            <div className="relative md:col-span-3">
              <div
                className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:h-full"
                style={{ backgroundColor: fourneeImage.avgColor }}
              >
                {fourneeImage.src && (
                  <Image
                    src={fourneeImage.src}
                    alt={fourneeImage.alt || t.fournee.productName}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className="size-1.5 rounded-full bg-[#E63946]" />
                {t.fournee.badge}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10 border-t border-black/10 p-8 md:col-span-2 md:border-l md:border-t-0 md:p-10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/50">
                  {t.fournee.dayLabel} · {today}
                </span>
                <h3
                  className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl"
                  style={{ fontFamily: "var(--font-demo-display)" }}
                >
                  {t.fournee.productName}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-black/65">
                  {t.fournee.productDescription}
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between border-t border-dashed border-black/15 pt-5">
                  <span
                    className="text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-demo-display)" }}
                  >
                    4,80&nbsp;€
                  </span>
                  <span className="text-xs font-mono text-black/50">{t.fournee.priceUnit}</span>
                </div>
                <a
                  href="#trouver"
                  className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] text-sm font-semibold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-[#E63946]"
                >
                  {t.fournee.cta}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- CARTE — HORIZONTAL SCROLL PINNED ---------- */}
      <section id="carte" className="bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 sm:px-8 md:pt-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F4B942]">
                {t.carte.kicker}
              </span>
              <h2
                className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                {t.carte.heading1}
                <br />
                <span className="italic text-[#E63946]">{t.carte.heading2}</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              {t.carte.description}
            </p>
          </div>
        </div>

        <div ref={horizontalRef} className="relative h-[320vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x: hX }}
              className="flex gap-6 pl-5 pr-5 sm:pl-8 sm:pr-8"
            >
              {pains.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-200px" }}
                  transition={{ duration: 0.5 }}
                  className="group relative flex h-[72vh] w-[82vw] shrink-0 flex-col overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] sm:h-[75vh] sm:w-[460px]"
                >
                  <div
                    className="relative flex-1 overflow-hidden bg-white/5"
                    style={{ backgroundColor: p.image?.avgColor }}
                  >
                    {p.image?.src && (
                      <Image
                        src={p.image.src}
                        alt={p.image.alt || p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 82vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-widest backdrop-blur">
                      <span className="size-1 rounded-full bg-[#F4B942]" />
                      {p.tag}
                    </div>
                    <span
                      className="absolute right-5 top-5 text-6xl font-bold text-white/10"
                      style={{ fontFamily: "var(--font-demo-display)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-start gap-4 border-t border-white/10 p-6">
                    <div>
                      <h3
                        className="text-2xl font-bold leading-tight tracking-tight"
                        style={{ fontFamily: "var(--font-demo-display)" }}
                      >
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-white/40">
                        {p.weight}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/65">
                        {p.note}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className="block text-3xl font-bold tracking-tight text-[#F4B942]"
                        style={{ fontFamily: "var(--font-demo-display)" }}
                      >
                        {p.price}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                        {t.carte.currency}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}

              <div className="flex h-[72vh] w-[82vw] shrink-0 flex-col items-center justify-center gap-4 px-10 sm:h-[75vh] sm:w-[460px]">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                  {t.carte.endKicker}
                </span>
                <h3
                  className="text-center text-3xl font-bold tracking-tight text-white/80 sm:text-4xl"
                  style={{ fontFamily: "var(--font-demo-display)" }}
                >
                  {t.carte.endTitle1}
                  <br />
                  {t.carte.endTitle2}
                </h3>
                <a
                  href="#trouver"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E63946] px-6 py-3 text-sm font-semibold"
                >
                  {t.carte.endCta}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- RITUEL — Sticky stacking cards ---------- */}
      <section id="rituel" className="bg-[#F4F1EC] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-20 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E63946]">
              {t.rituel.kicker}
            </span>
            <h2
              className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-demo-display)" }}
            >
              {t.rituel.heading1}
              <br />
              <span className="italic">{t.rituel.heading2}</span>
            </h2>
          </div>

          <div className="relative">
            {process.map((step, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <div key={step.num} className="h-[110vh]">
                  <div className="sticky top-24">
                    <motion.article
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ margin: "-120px" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]"
                    >
                      <div className="grid md:grid-cols-2">
                        {/* Image */}
                        <div
                          className={`relative aspect-[4/3] overflow-hidden bg-black/5 md:aspect-auto md:min-h-[520px] ${
                            imageLeft ? "md:order-1" : "md:order-2"
                          }`}
                          style={{ backgroundColor: step.image?.avgColor }}
                        >
                          {step.image?.src && (
                            <Image
                              src={step.image.src}
                              alt={step.image.alt || step.title}
                              fill
                              sizes="(min-width: 1024px) 33vw, 80vw"
                              className="object-cover"
                            />
                          )}
                          <span
                            className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.25em]"
                            style={{ color: step.accent }}
                          >
                            <span
                              className="size-1.5 rounded-full"
                              style={{ backgroundColor: step.accent }}
                            />
                            {t.rituel.stepLabel} {step.num}
                          </span>
                        </div>

                        {/* Text */}
                        <div
                          className={`relative flex flex-col justify-center gap-6 p-8 md:p-12 ${
                            imageLeft ? "md:order-2" : "md:order-1"
                          }`}
                        >
                          <span
                            className="text-[7rem] font-bold leading-none tracking-tighter md:text-[9rem]"
                            style={{
                              fontFamily: "var(--font-demo-display)",
                              color: step.accent,
                              opacity: 0.14,
                            }}
                          >
                            {step.num}
                          </span>
                          <div>
                            <h3
                              className="text-4xl font-bold tracking-tight md:text-6xl"
                              style={{ fontFamily: "var(--font-demo-display)" }}
                            >
                              {step.title}
                            </h3>
                            <p className="mt-5 max-w-md text-base leading-relaxed text-black/70 md:text-lg">
                              {step.text}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-1 w-full"
                        style={{ backgroundColor: step.accent }}
                      />
                    </motion.article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="border-y border-black/10 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-14 flex items-end justify-between">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E63946]">
              {t.testimonialsSection.kicker}
            </span>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`${t.testimonialsSection.srLabel} ${i + 1}`}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeTestimonial ? "w-8 bg-[#E63946]" : "w-3 bg-black/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[260px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="flex gap-1 text-[#F4B942]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote
                  className="mt-6 text-2xl font-medium leading-[1.25] tracking-tight sm:text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-demo-display)" }}
                >
                  « {testimonials[activeTestimonial].quote} »
                </blockquote>
                <div className="mt-8 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#0A0A0A] text-white">
                    <span className="flex h-full w-full items-center justify-center text-sm font-bold">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="text-xs text-black/50">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------- INSTAGRAM MOSAIC ---------- */}
      <section id="gramme" className="bg-[#F4F1EC] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E63946]">
                {t.instagram.kicker}
              </span>
              <h2
                className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                {t.instagram.handle}
              </h2>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
            >
              <Camera className="size-4" />
              {t.instagram.follow}
              <ArrowUpRight className="size-4 transition-transform group-hover:-rotate-45" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {galleryImages.map((photo, i) => (
              <motion.a
                href="#"
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`group relative block overflow-hidden rounded-sm bg-black/5 ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                } ${i === 3 ? "md:col-span-2" : ""}`}
                style={{ backgroundColor: photo.avgColor }}
              >
                <div className="relative aspect-square">
                  {photo.src && (
                    <Image
                      src={photo.src}
                      alt={photo.alt || `Boulangerie ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[#E63946]/0 opacity-0 transition-all duration-300 group-hover:bg-[#E63946]/85 group-hover:opacity-100">
                  <Camera className="size-8 text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TROUVER ---------- */}
      <section id="trouver" className="bg-[#0A0A0A] py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F4B942]">
              {t.trouver.kicker}
            </span>
            <h2
              className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl"
              style={{ fontFamily: "var(--font-demo-display)" }}
            >
              {t.trouver.heading1}
              <br />
              <span className="italic text-[#E63946]">{t.trouver.heading2}</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[#E63946]/50"
            >
              <MapPin className="size-6 text-[#E63946]" />
              <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                {t.trouver.addressLabel}
              </p>
              <p
                className="mt-3 text-2xl font-bold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                {t.trouver.addressLine1}
                <br />
                {t.trouver.addressLine2}
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F4B942]"
              >
                {t.trouver.directions}
                <ArrowUpRight className="size-3.5" />
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[#E63946]/50"
            >
              <Phone className="size-6 text-[#E63946]" />
              <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                {t.trouver.phoneLabel}
              </p>
              <a
                href="tel:+33388000000"
                className="mt-3 block text-2xl font-bold tracking-tight hover:text-[#E63946]"
                style={{ fontFamily: "var(--font-demo-display)" }}
              >
                03 88 00 00 00
              </a>
              <p className="mt-2 text-sm text-white/60">
                {t.trouver.phoneHint}
              </p>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden rounded-sm bg-[#E63946] p-8"
            >
              <Clock className="size-6" />
              <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
                {t.trouver.hoursLabel}
              </p>
              <ul className="mt-3 divide-y divide-white/20">
                {horaires.map((h) => (
                  <li
                    key={h.jour}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <span className="text-white/80">{h.jour}</span>
                    <span className="font-semibold">{h.heures}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-[#0A0A0A] pb-10 pt-20 text-white/60">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="border-t border-white/10 pt-10">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span
                  className="text-5xl font-bold leading-none tracking-tighter text-white sm:text-7xl"
                  style={{ fontFamily: "var(--font-demo-display)" }}
                >
                  {t.footer.brand1}
                  <br />
                  <span className="text-[#E63946]">{t.footer.brand2}</span>
                </span>
                <p className="mt-6 max-w-sm text-sm">
                  {t.footer.disclaimerPrefix}{" "}
                  <Link
                    href="/"
                    className="text-[#F4B942] underline-offset-4 hover:underline"
                  >
                    PrismaWeb
                  </Link>
                  {t.footer.disclaimerSuffix}
                </p>
                <p className="mt-3 max-w-sm text-xs text-white/40">
                  {t.footer.photosBy}{" "}
                  <a
                    href="https://www.pexels.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#F4B942]"
                  >
                    Pexels
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-3 text-xs font-mono uppercase tracking-[0.2em]">
                <span>{t.footer.copyright}</span>
                <span>{t.footer.coords}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
