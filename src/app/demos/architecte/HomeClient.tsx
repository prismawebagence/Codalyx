"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { STUDIO, PROJECTS, EXPERTISES, STATS, JOURNAL, img } from "./data";
import {
  Curtain,
  ZoomImage,
  HorizontalGallery,
  SectionLabel,
  staggerParent,
  staggerChild,
  curtainGroup,
  curtainItem,
} from "./shared";

export default function HomeClient({
  heroSrc,
  ctaSrc,
}: {
  heroSrc?: string;
  ctaSrc?: string;
}) {
  return (
    <>
      <Hero src={heroSrc} />
      <Statement />
      <ProjectsGallery />
      <Expertises />
      <Reperes />
      <JournalRow />
      <ContactCTA src={ctaSrc} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — image pleine largeur, titre en surimpression (galerie)       */
/* ------------------------------------------------------------------ */

function Hero({ src }: { src?: string }) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <ZoomImage
        src={src || img("hero-vauban", 2000, 2200)}
        alt="Façade contemporaine d'un projet de l'Atelier Vauban"
        priority
        from={1.12}
        sizes="100vw"
        unoptimized={!!src}
        className="absolute inset-0 h-full w-full"
      />
      {/* Tint global très léger : l'image (ciel + villa) reste pleinement visible */}
      <div className="absolute inset-0 bg-[#0C0D10]/12" />
      {/* Dégradé bas : ancre le titre, le haut de l'image reste dégagé */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D10]/95 via-[#0C0D10]/50 via-42% to-transparent to-80%" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-10">
        {/* Bandeau mono */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-7 flex items-center justify-between font-[family-name:var(--font-archi-mono)] text-[11px] uppercase tracking-[0.25em] text-[#E8E9E6]/75"
        >
          <span>{STUDIO.city} · Grand Est</span>
          <span className="hidden sm:inline">Depuis {STUDIO.foundedYear}</span>
          <span>N° 84 / 84</span>
        </motion.div>

        {/* Titre */}
        <div className="max-w-4xl">
          <h1
            className="text-[3.5rem] font-extrabold leading-[0.9] tracking-tight text-[#E8E9E6] sm:text-8xl lg:text-[8.5rem]"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            {["Architecture", "& Territoire"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.12,
                  }}
                  className="block will-change-transform"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p
              className="max-w-md text-lg italic leading-relaxed text-[#E8E9E6]/85"
              style={{ fontFamily: "var(--font-archi-body)" }}
            >
              {STUDIO.baseline}
            </p>
            <Link
              href="/demos/architecte/projets"
              className="group inline-flex w-fit items-center gap-3 border border-[#E8E9E6]/40 px-6 py-3.5 text-sm font-semibold text-[#E8E9E6] transition-colors hover:bg-[#E8E9E6] hover:text-[#17181C]"
            >
              Parcourir les projets
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Statement — manifeste éditorial en serif                            */
/* ------------------------------------------------------------------ */

function Statement() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-36 lg:px-10">
      <Curtain>
        <SectionLabel index="01">Manifeste</SectionLabel>
      </Curtain>
      <Curtain delay={0.1}>
        <p
          className="mt-10 text-3xl font-light leading-[1.3] tracking-tight text-[#17181C] sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-archi-body)" }}
        >
          Nous concevons des lieux{" "}
          <span className="italic text-[#34405A]">qui durent</span>{" "}— en
          transformant l&apos;existant plutôt qu&apos;en le démolissant, en
          choisissant des matériaux justes, et en donnant à chaque espace la{" "}
          <span className="italic text-[#34405A]">lumière</span>{" "}qu&apos;il
          mérite.
        </p>
      </Curtain>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projets — galerie à défilement horizontal (desktop) / pile (mobile) */
/* ------------------------------------------------------------------ */

function ProjectFrame({
  project,
  index,
  variant = "h",
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  variant?: "h" | "v";
}) {
  return (
    <Link
      href={`/demos/architecte/projets/${project.slug}`}
      className={
        variant === "h"
          ? "group block w-[78vw] shrink-0 sm:w-[52vw] lg:w-[40vw]"
          : "group block"
      }
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#D1D2CE]">
        <Image
          src={img(project.coverSeed, 1000, 1250, true)}
          alt={`${project.name} — ${project.location}`}
          fill
          sizes={variant === "h" ? "52vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        <span className="absolute left-4 top-4 font-[family-name:var(--font-archi-mono)] text-[11px] uppercase tracking-widest text-[#E8E9E6] mix-blend-difference">
          N° {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-[#17181C]/15 pt-4">
        <div>
          <h3
            className="text-2xl font-bold tracking-tight text-[#17181C] transition-colors group-hover:text-[#34405A] sm:text-3xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            {project.name}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-wider text-[#71747A]">
            {project.category} · {project.location}
          </p>
        </div>
        <span className="font-[family-name:var(--font-archi-mono)] text-sm text-[#71747A]">
          {project.year}
        </span>
      </div>
    </Link>
  );
}

function ProjectsGallery() {
  return (
    <section className="border-t border-[#17181C]/12">
      {/* En-tête */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Curtain>
            <SectionLabel index="02">Projets sélectionnés</SectionLabel>
            <h2
              className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-[#17181C] sm:text-6xl"
              style={{ fontFamily: "var(--font-archi-display)" }}
            >
              Une sélection de lieux
            </h2>
          </Curtain>
          <Curtain delay={0.1}>
            <Link
              href="/demos/architecte/projets"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-widest text-[#17181C] hover:text-[#34405A]"
            >
              Tout voir
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Curtain>
        </div>
      </div>

      {/* Desktop : scroll horizontal épinglé */}
      <div className="hidden lg:block">
        <HorizontalGallery>
          <div className="flex items-stretch gap-10 px-[6vw]">
            {PROJECTS.map((project, i) => (
              <ProjectFrame key={project.slug} project={project} index={i} variant="h" />
            ))}
            <div className="flex w-[32vw] shrink-0 items-center">
              <Link
                href="/demos/architecte/projets"
                className="group flex flex-col gap-4"
              >
                <span
                  className="text-4xl font-bold tracking-tight text-[#17181C]"
                  style={{ fontFamily: "var(--font-archi-display)" }}
                >
                  Voir les 6 projets
                </span>
                <span className="inline-flex size-16 items-center justify-center border border-[#17181C]/30 transition-colors group-hover:bg-[#17181C] group-hover:text-[#E8E9E6]">
                  <ArrowRight className="size-6" />
                </span>
              </Link>
            </div>
          </div>
        </HorizontalGallery>
      </div>

      {/* Mobile / tablette : pile verticale (stagger fiable, un seul observer) */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:hidden"
      >
        {PROJECTS.map((project, i) => (
          <motion.div key={project.slug} variants={staggerChild}>
            <ProjectFrame project={project} index={i} variant="v" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Expertises — index éditorial, révélation rideau                     */
/* ------------------------------------------------------------------ */

function Expertises() {
  return (
    <section className="border-t border-[#17181C]/12 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Curtain>
          <SectionLabel index="03">Champs d&apos;intervention</SectionLabel>
        </Curtain>

        <motion.div
          variants={curtainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#17181C]/15"
        >
          {EXPERTISES.map((exp) => (
            <motion.div
              key={exp.index}
              variants={curtainItem}
              className="group grid gap-4 border-b border-[#17181C]/15 py-8 transition-colors hover:bg-[#DCDDD9] sm:grid-cols-[5rem_1fr_1.3fr] sm:items-baseline sm:gap-10 sm:px-2"
            >
              <span className="font-[family-name:var(--font-archi-mono)] text-sm text-[#34405A]">
                {exp.index}
              </span>
              <h3
                className="text-2xl font-bold tracking-tight text-[#17181C] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {exp.title}
              </h3>
              <p
                className="max-w-lg text-base leading-relaxed text-[#71747A]"
                style={{ fontFamily: "var(--font-archi-body)" }}
              >
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Repères — chiffres statiques (pas de compteur), révélation rideau   */
/* ------------------------------------------------------------------ */

function Reperes() {
  return (
    <section className="border-t border-[#17181C]/12 bg-[#17181C] py-20 text-[#E8E9E6] sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Curtain>
          <span className="font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-[0.25em] text-[#E8E9E6]/50">
            04 — Repères
          </span>
        </Curtain>
        <motion.div
          variants={curtainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 gap-y-12 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={curtainItem} className="border-l border-[#E8E9E6]/25 pl-5">
              <div
                className="text-5xl font-extrabold tracking-tight sm:text-7xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {stat.value}
                <span className="text-[#7C8BA8]">{stat.suffix}</span>
              </div>
              <p className="mt-3 text-sm leading-snug text-[#E8E9E6]/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

function JournalRow() {
  const latest = JOURNAL.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Curtain>
          <SectionLabel index="05">Journal</SectionLabel>
          <h2
            className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-[#17181C] sm:text-6xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Notes d&apos;atelier
          </h2>
        </Curtain>
        <Curtain delay={0.1}>
          <Link
            href="/demos/architecte/journal"
            className="group inline-flex items-center gap-2 font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-widest text-[#17181C] hover:text-[#34405A]"
          >
            Tous les articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Curtain>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-10 md:grid-cols-3"
      >
        {latest.map((article) => (
          <motion.article key={article.slug} variants={staggerChild}>
            <Link href={`/demos/architecte/journal/${article.slug}`} className="group block">
              <ZoomImage
                src={img(article.coverSeed, 800, 600)}
                alt={article.title}
                sizes="(max-width: 768px) 100vw, 33vw"
                from={1.2}
                className="relative aspect-[4/3]"
              />
              <div className="mt-5 flex items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
                <span className="font-semibold text-[#34405A]">{article.category}</span>
                <span className="size-1 rounded-full bg-[#71747A]" />
                <span>{article.readingTime}</span>
              </div>
              <h3
                className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#17181C] transition-colors group-hover:text-[#34405A]"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {article.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[#71747A]"
                style={{ fontFamily: "var(--font-archi-body)" }}
              >
                {article.excerpt}
              </p>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA — plein cadre                                                   */
/* ------------------------------------------------------------------ */

function ContactCTA({ src }: { src?: string }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden border-t border-[#17181C]/12">
      <ZoomImage
        src={src || img("cta-atelier", 2000, 1300)}
        alt=""
        from={1.12}
        sizes="100vw"
        unoptimized={!!src}
        className="absolute inset-0 h-full w-full"
      />
      {/* Voile latéral : sombre à gauche (texte), l'image respire à droite */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0D10]/85 via-[#0C0D10]/45 to-[#0C0D10]/20" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col items-start justify-center px-4 py-20 sm:px-6 lg:px-10">
        <Curtain>
          <h2
            className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight text-[#E8E9E6] sm:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Un lieu à faire naître ?
          </h2>
        </Curtain>
        <p
          className="mt-7 max-w-md text-lg italic leading-relaxed text-[#E8E9E6]/85"
          style={{ fontFamily: "var(--font-archi-body)" }}
        >
          Le premier rendez-vous se prend autour d&apos;un café à l&apos;atelier,
          sans engagement.
        </p>
        <Link
          href="/demos/architecte/contact"
          className="group mt-9 inline-flex items-center gap-3 bg-[#E8E9E6] px-8 py-4 text-sm font-semibold text-[#17181C] transition-colors hover:bg-[#34405A] hover:text-[#E8E9E6]"
        >
          Prendre rendez-vous
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </section>
  );
}
