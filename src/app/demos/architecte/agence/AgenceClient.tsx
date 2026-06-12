"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STUDIO, TEAM, PROCESS, STATS, img } from "../data";
import {
  Reveal,
  SectionLabel,
  staggerParent,
  staggerChild,
} from "../shared";

export default function AgenceClient() {
  return (
    <>
      {/* En-tête */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 pb-12 sm:px-6 lg:px-10 lg:pt-20">
        <Reveal>
          <SectionLabel index="01">L&apos;atelier</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-[#17181C] sm:text-7xl lg:text-[5rem]"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Une architecture du <span className="text-[#34405A]">juste</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#71747A]">
            {STUDIO.baseline} Fondé en {STUDIO.foundedYear} à {STUDIO.city},
            l&apos;Atelier Vauban réunit une dizaine d&apos;architectes autour
            d&apos;une même idée : un bâtiment réussi est un bâtiment qui vieillit bien.
          </p>
        </Reveal>
      </section>

      {/* Image large */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#D1D2CE]">
            <Image
              src={img("agence-studio", 1600, 900)}
              alt="L'atelier de l'agence à Strasbourg"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Manifeste en deux colonnes */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel index="02">Ce qui nous guide</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-xl leading-relaxed text-[#17181C]/85 sm:text-2xl">
              <p>
                Nous refusons l&apos;architecture spectaculaire qui se démode en
                dix ans. Notre travail cherche la justesse : la bonne épaisseur de
                mur, la bonne orientation, le matériau qui durera.
              </p>
              <p className="text-base leading-relaxed text-[#71747A] sm:text-lg">
                Chaque projet commence par une marche sur le terrain et beaucoup
                d&apos;écoute. Nous construisons en bois, en terre, en brique — des
                matières qui vieillissent en beauté. Et nous préférons toujours
                transformer l&apos;existant plutôt que d&apos;effacer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chiffres */}
      <section className="border-y border-[#17181C]/10 bg-[#DCDDD9] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
          {STATS.map((stat) => (
            <Reveal key={stat.label}>
              <div className="flex flex-col gap-2 border-l border-[#34405A]/40 pl-5">
                <span
                  className="text-5xl font-bold tracking-tight text-[#17181C] sm:text-6xl"
                  style={{ fontFamily: "var(--font-archi-display)" }}
                >
                  {stat.value}
                  <span className="text-[#34405A]">{stat.suffix}</span>
                </span>
                <span className="text-sm leading-snug text-[#71747A]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Équipe */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
        <Reveal>
          <SectionLabel index="03">L&apos;équipe</SectionLabel>
          <h2
            className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-[#17181C] sm:text-5xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Les visages derrière les plans
          </h2>
        </Reveal>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={staggerChild} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-[#D1D2CE]">
                <Image
                  src={img(member.photoSeed, 600, 800, true)}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
              <h3
                className="mt-5 text-xl font-semibold tracking-tight text-[#17181C]"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#34405A]">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#71747A]">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Démarche */}
      <section className="border-t border-[#17181C]/10 bg-[#17181C] py-20 text-[#E8E9E6] sm:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionLabel index="04">Notre démarche</SectionLabel>
            <h2
              className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-[#E8E9E6] sm:text-5xl"
              style={{ fontFamily: "var(--font-archi-display)" }}
            >
              Quatre temps, du terrain à la livraison
            </h2>
          </Reveal>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 divide-y divide-[#E8E9E6]/15 border-y border-[#E8E9E6]/15"
          >
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                variants={staggerChild}
                className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_1.4fr] sm:items-baseline sm:gap-10"
              >
                <span className="font-[family-name:var(--font-archi-mono)] text-sm text-[#34405A]">0{i + 1}</span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8E9E6]/50">
                    {p.step}
                  </span>
                  <h3
                    className="mt-1 text-2xl font-semibold tracking-tight text-[#E8E9E6] sm:text-3xl"
                    style={{ fontFamily: "var(--font-archi-display)" }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-[#E8E9E6]/65">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-none border border-[#17181C]/12 bg-[#DCDDD9] p-8 sm:flex-row sm:items-center sm:p-12">
            <h2
              className="max-w-md text-3xl font-bold tracking-tight text-[#17181C] sm:text-4xl"
              style={{ fontFamily: "var(--font-archi-display)" }}
            >
              Envie de travailler ensemble ?
            </h2>
            <Link
              href="/demos/architecte/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#17181C] px-7 py-3.5 text-sm font-semibold text-[#E8E9E6] transition-colors hover:bg-[#34405A]"
            >
              Prendre rendez-vous
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
