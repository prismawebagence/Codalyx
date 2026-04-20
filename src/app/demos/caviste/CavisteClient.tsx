"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Star } from "lucide-react";
import { PRODUCTS, EVENTS } from "./data";
import { useCart } from "./CartContext";

const SplineBackground = dynamic(() => import("./SplineBottle"), {
  ssr: false,
  loading: () => null,
});

/* ================================================================
   HOME PAGE
   ================================================================ */
export default function CavisteClient() {
  const { addToCart } = useCart();
  const featured = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[8]]; // Riesling, Gevrey, Salon
  const upcomingEvents = EVENTS.slice(0, 2);

  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <FeaturedSection products={featured} onAdd={addToCart} />
      <EventsPreview events={upcomingEvents} />
    </>
  );
}


/* ================================================================
   HERO SECTION
   ================================================================ */
function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0D0D0D]">
      {/* ── Spline 3D fullscreen background ── */}
      <SplineBackground />

      {/* Dark vignette overlay so text stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.15) 100%), linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 40%)",
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-5 py-24 lg:px-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#C9A84C]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
              Caviste · Strasbourg · depuis 1987
            </span>
          </motion.div>

          <h1
            className="text-[3rem] font-bold leading-none tracking-tighter text-[#F5F0E8] sm:text-6xl lg:text-[5.5rem]"
            style={{ fontFamily: "var(--font-caviste-display)" }}
          >
            {["Vins", "d'Exception", "à", "Strasbourg"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-3 sm:mr-5"
              >
                {i === 1 ? <span className="italic text-[#C9A84C]">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="mt-7 max-w-md text-base leading-relaxed text-[#F5F0E8]/65 sm:text-lg"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            Sélection rigoureuse de 500 références — Alsace, Bourgogne, Bordeaux, Champagne.
            Livraison à Strasbourg sous 24 h.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/demos/caviste/catalogue"
              className="group flex items-center gap-2 rounded-full bg-[#C9A84C] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#0D0D0D] transition-all hover:bg-[#d4b55c] active:scale-[0.98] active:-translate-y-[1px]"
            >
              Explorer la cave
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demos/caviste/evenements"
              className="flex items-center gap-2 rounded-full border border-[#F5F0E8]/20 px-7 py-3.5 text-sm text-[#F5F0E8]/70 transition-all hover:border-[#C9A84C]/50 hover:text-[#C9A84C] active:scale-[0.98]"
            >
              Dégustations
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-14 flex gap-10 border-t border-[#F5F0E8]/8 pt-8"
          >
            {[
              { n: "37 ans", label: "d'expertise" },
              { n: "500+", label: "références" },
              { n: "12", label: "appellations" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                  {n}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-[#F5F0E8]/45">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#F5F0E8]/30">Défiler</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-4 w-px bg-gradient-to-b from-[#C9A84C]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ================================================================
   MARQUEE BAND
   ================================================================ */
function MarqueeBand() {
  const text = "ALSACE · BORDEAUX · BOURGOGNE · CHAMPAGNE · RIESLING · PINOT NOIR · CHARDONNAY · MILLÉSIMES · ";
  return (
    <div
      className="relative overflow-hidden border-y border-[#C9A84C]/20 bg-[#1A0A0A] py-3.5"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div className="caviste-marquee flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-[0.35em] text-[#C9A84C]/55">
            {text + text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   FEATURED WINES (home preview)
   ================================================================ */
const REGION_COLORS: Record<string, string> = {
  alsace: "from-[#3D2A08] to-[#8B6914]",
  bourgogne: "from-[#1A0A0F] to-[#722F37]",
  bordeaux: "from-[#0A0A1A] to-[#2F2F5A]",
  champagne: "from-[#1A1208] to-[#5C4A1A]",
};

function FeaturedCardLarge({ product: p, onAdd }: { product: typeof PRODUCTS[0]; onAdd: (p: typeof PRODUCTS[0]) => void }) {
  return (
    <div className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#C9A84C]/10 bg-[#140a0a] transition-all hover:border-[#C9A84C]/30">
      <div className={`relative flex-1 bg-gradient-to-br ${REGION_COLORS[p.region] ?? "from-[#1A0A0A] to-[#722F37]"}`}>
        {p.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#C9A84C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]">
            {p.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 z-10 rounded-full border border-[#C9A84C]/30 bg-[#0D0D0D]/60 px-2 py-0.5 font-mono text-[11px] text-[#C9A84C] backdrop-blur-sm">
          {p.millesime}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0a] via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]/60">{p.appellation}</div>
        <h3 className="mt-1 text-xl font-bold leading-tight text-[#F5F0E8]" style={{ fontFamily: "var(--font-caviste-display)" }}>
          {p.nom}
        </h3>
        <div className="mt-0.5 text-xs text-[#F5F0E8]/40">{p.domaine}</div>
        <div className="mt-3 flex items-center gap-1">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className={`size-3 ${s <= Math.round(p.notation) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#F5F0E8]/20"}`} />
          ))}
          <span className="ml-1 text-[11px] text-[#F5F0E8]/40">{p.notation.toFixed(1)}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>{p.prix} €</div>
          <button type="button" onClick={() => onAdd(p)} className="flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-5 py-2 text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] active:scale-[0.96]">
            + Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedCardSmall({ product: p, onAdd }: { product: typeof PRODUCTS[0]; onAdd: (p: typeof PRODUCTS[0]) => void }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#C9A84C]/10 bg-[#140a0a] transition-all hover:border-[#C9A84C]/30">
      <div className={`relative h-36 bg-gradient-to-br ${REGION_COLORS[p.region] ?? "from-[#1A0A0A] to-[#722F37]"}`}>
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#C9A84C] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]">
            {p.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-[#C9A84C]/30 bg-[#0D0D0D]/60 px-2 py-0.5 font-mono text-[11px] text-[#C9A84C] backdrop-blur-sm">
          {p.millesime}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0a] via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]/60">{p.appellation}</div>
        <h3 className="mt-0.5 text-sm font-semibold leading-tight text-[#F5F0E8]" style={{ fontFamily: "var(--font-caviste-display)" }}>
          {p.nom}
        </h3>
        <div className="mt-0.5 text-xs text-[#F5F0E8]/35">{p.domaine}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>{p.prix} €</div>
          <button type="button" onClick={() => onAdd(p)} className="flex items-center gap-1 rounded-full bg-[#C9A84C]/10 px-3.5 py-1.5 text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] active:scale-[0.96]">
            + Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedSection({
  products,
  onAdd,
}: {
  products: typeof PRODUCTS;
  onAdd: (p: typeof PRODUCTS[0]) => void;
}) {
  return (
    <section className="bg-[#0D0D0D] px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">— Coups de cœur</span>
            <h2
              className="mt-2 text-3xl font-bold leading-none tracking-tighter text-[#F5F0E8] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-caviste-display)" }}
            >
              Sélection du moment
            </h2>
          </div>
          <Link
            href="/demos/caviste/catalogue"
            className="group flex items-center gap-2 text-sm text-[#F5F0E8]/50 transition-colors hover:text-[#C9A84C]"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            Voir les 9 bouteilles <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Asymmetric layout: big card left + 2 stacked right */}
        <div className="mt-10 grid gap-5 md:grid-cols-[1.35fr_1fr]">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="md:row-span-2"
          >
            <FeaturedCardLarge product={products[0]} onAdd={onAdd} />
          </motion.div>
          {/* Two stacked cards */}
          {[products[1], products[2]].map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.12 + i * 0.1 }}
            >
              <FeaturedCardSmall product={p} onAdd={onAdd} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   EVENTS PREVIEW (home)
   ================================================================ */
function EventsPreview({ events }: { events: typeof EVENTS }) {
  return (
    <section className="bg-[#1A0A0A] px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">— Prochainement</span>
            <h2
              className="mt-2 text-3xl font-bold text-[#F5F0E8] sm:text-4xl"
              style={{ fontFamily: "var(--font-caviste-display)" }}
            >
              Dégustations & ateliers
            </h2>
          </div>
          <Link
            href="/demos/caviste/evenements"
            className="group flex items-center gap-2 text-sm text-[#F5F0E8]/50 transition-colors hover:text-[#C9A84C]"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            Voir tous les événements <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#C9A84C]/10 bg-[#0D0D0D] p-6 transition-all hover:border-[#C9A84C]/30"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#C9A84C]">{event.date}</div>
              <h3
                className="mt-2 text-xl font-semibold text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-caviste-display)" }}
              >
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F0E8]/50" style={{ fontFamily: "var(--font-caviste-body)" }}>
                {event.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[#F5F0E8]/40">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> {event.duree}</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="size-3 text-[#C9A84C]" />
                    {event.places <= 4 ? (
                      <span className="flex items-center gap-1.5 text-[#722F37]">
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          className="inline-block size-1.5 rounded-full bg-[#722F37]"
                        />
                        {event.places} places
                      </span>
                    ) : (
                      <span>{event.places} places</span>
                    )}
                  </span>
                </div>
                <div className="text-lg font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                  {event.prix} €
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
