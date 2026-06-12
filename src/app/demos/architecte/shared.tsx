"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Révélation au scroll, réutilisée partout. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Mouvement réduit activé : on affiche le contenu directement (pas d'entrée
  // animée → jamais bloqué invisible). Respecte la préférence d'accessibilité.
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Conteneur + enfants en cascade (staggerChildren). */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Cascade « rideau » : un SEUL observer sur le parent (whileInView), les
 * enfants se dévoilent en clip-path décalé. Fiable pour les listes/grilles —
 * contrairement à un `Curtain` par enfant, qui laissait des items bloqués.
 */
export const curtainGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

export const curtainItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Étiquette de section : un index mono + un titre court. */
export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-[family-name:var(--font-archi-mono)] text-xs font-semibold tracking-widest text-[#34405A]">
        {index}
      </span>
      <span className="h-px w-8 bg-[#34405A]/40" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#71747A]">
        {children}
      </span>
    </div>
  );
}

/** Compteur qui s'incrémente une fois visible. */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/** Bouton magnétique — attire légèrement vers le curseur (hors cycle React). */
export function MagneticLink({
  href,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Premium : révélation en masque                                      */
/* ------------------------------------------------------------------ */

/**
 * Le texte se dévoile par le bas depuis un masque (overflow-hidden).
 * Signature des sites d'agence — plus raffiné qu'une simple translation.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  as = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const Outer = as === "div" ? "div" : "span";
  return (
    <Outer className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </Outer>
  );
}

/* ------------------------------------------------------------------ */
/* Premium : barre de progression de scroll                            */
/* ------------------------------------------------------------------ */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#34405A]"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Premium : grain de film (texture globale)                           */
/* ------------------------------------------------------------------ */

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/** Grain fixe, pointer-events-none — jamais sur un conteneur qui scrolle. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-multiply"
      style={{ backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: "180px 180px" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Premium : spotlight qui suit le curseur                             */
/* ------------------------------------------------------------------ */

/**
 * Renvoie un handler + un style de fond à appliquer sur une section
 * `relative overflow-hidden`. Le halo suit le curseur via des motion values
 * (hors cycle de rendu React — aucun re-render).
 */
export function useSpotlight(
  color = "rgba(162,62,34,0.22)",
  size = 460,
) {
  const mx = useMotionValue(-size);
  const my = useMotionValue(-size);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  const onMouseLeave = () => {
    mx.set(-size);
    my.set(-size);
  };

  return { onMouseMove, onMouseLeave, style: { background } };
}

/* ------------------------------------------------------------------ */
/* Premium : bande cinétique (marquee)                                 */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  duration = 26,
}: {
  items: string[];
  duration?: number;
}) {
  const sequence = [...items, ...items];
  return (
    <div className="flex overflow-hidden border-y border-[#17181C]/10 py-6 select-none">
      <motion.div
        className="flex min-w-max items-center gap-8 pr-8 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`text-3xl font-bold uppercase tracking-tight sm:text-5xl ${
                i % 2 === 0
                  ? "text-[#17181C]"
                  : "text-transparent [-webkit-text-stroke:1px_#17181C]"
              }`}
              style={{ fontFamily: "var(--font-archi-display)" }}
            >
              {item}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-4 shrink-0 text-[#34405A]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/* GALERIE — vocabulaire de motion propre à l'édition « scrollytelling » */
/* ================================================================== */

/**
 * Révélation au scroll : montée + fondu. (Anciennement un balayage clip-path,
 * abandonné car framer-motion l'animait de façon non fiable ici.)
 */
export function Curtain({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // Révélation par opacité + montée. Filet de sécurité : si l'observer ne
  // répond pas, on révèle après un court délai — contenu jamais bloqué.
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forced, setForced] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setForced(true), 1400);
    return () => clearTimeout(t);
  }, []);
  // Mouvement réduit activé : contenu affiché directement (accessibilité).
  if (reduce) return <div className={className}>{children}</div>;
  const revealed = inView || forced;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image en zoom-parallaxe : se dézoome doucement en traversant le viewport.
 * Le cadre reste fixe (overflow-hidden), seule l'image respire — effet musée.
 */
export function ZoomImage({
  src,
  alt,
  sizes,
  priority,
  className,
  from = 1.28,
  unoptimized,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  from?: number;
  /** Charge l'image en direct (sans l'optimiseur Next). Indispensable pour
   *  les sources que le serveur ne peut pas récupérer (ex. Pexels via proxy). */
  unoptimized?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  // Pas de `relative` ici : certains usages passent `absolute inset-0` (fond
  // plein cadre). On laisse l'appelant fixer le `position` via className —
  // les usages « cadre » ajoutent `relative` eux-mêmes.
  return (
    <div ref={ref} className={`overflow-hidden bg-[#D1D2CE] ${className ?? ""}`}>
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

/**
 * Galerie à défilement horizontal (scroll hijack). Le scroll vertical fait
 * panoramiquer la piste sur l'axe X tant que la section est épinglée.
 * Réservé au desktop — sur mobile, on rend une pile verticale classique.
 */
export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [children]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
