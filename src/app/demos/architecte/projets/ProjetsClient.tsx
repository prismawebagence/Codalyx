"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  img,
  type ProjectCategory,
} from "../data";
import { Reveal, SectionLabel } from "../shared";

type Filter = "Tous" | ProjectCategory;
const FILTERS: Filter[] = ["Tous", ...PROJECT_CATEGORIES];

export default function ProjetsClient() {
  const [filter, setFilter] = useState<Filter>("Tous");

  const visible =
    filter === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* En-tête */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 pb-10 sm:px-6 lg:px-10 lg:pt-20">
        <Reveal>
          <SectionLabel index="01">Nos réalisations</SectionLabel>
          <h1
            className="mt-6 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-[#17181C] sm:text-7xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Projets
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#71747A]">
            Du logement individuel à l&apos;équipement public, chaque projet part
            d&apos;une écoute attentive du lieu et d&apos;une intention forte.
          </p>
        </Reveal>
      </section>

      {/* Filtres */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap gap-2 border-y border-[#17181C]/10 py-5">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-[#E8E9E6]" : "text-[#17181C] hover:text-[#34405A]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="projets-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#17181C]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grille */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <LayoutGroup>
          <motion.div layout className="grid gap-8 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={i % 3 === 0 ? "sm:col-span-2" : ""}
                >
                  <Link
                    href={`/demos/architecte/projets/${project.slug}`}
                    className="group block"
                  >
                    <div
                      className={`relative overflow-hidden rounded-none bg-[#D1D2CE] ${
                        i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={img(project.coverSeed, 1200, 800, true)}
                        alt={`Projet ${project.name} — ${project.location}`}
                        fill
                        sizes={
                          i % 3 === 0
                            ? "(max-width: 640px) 100vw, 90vw"
                            : "(max-width: 640px) 100vw, 45vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#E8E9E6]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#17181C] backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-[#17181C]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E8E9E6] backdrop-blur-sm">
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
                          <span>{project.year}</span>
                          <span className="size-1 rounded-full bg-[#34405A]" />
                          <span>{project.location}</span>
                        </div>
                        <h2
                          className="mt-2 text-2xl font-semibold tracking-tight text-[#17181C] transition-colors group-hover:text-[#34405A] sm:text-3xl"
                          style={{ fontFamily: "var(--font-archi-display)" }}
                        >
                          {project.name}
                        </h2>
                      </div>
                      <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#34405A] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#71747A]">
                      {project.summary}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>
    </>
  );
}
