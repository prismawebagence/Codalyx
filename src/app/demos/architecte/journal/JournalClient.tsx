"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { JOURNAL, img } from "../data";
import { Reveal, SectionLabel, staggerParent, staggerChild } from "../shared";

export default function JournalClient() {
  const [lead, ...rest] = JOURNAL;

  return (
    <>
      {/* En-tête */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 pb-10 sm:px-6 lg:px-10 lg:pt-20">
        <Reveal>
          <SectionLabel index="01">Le journal</SectionLabel>
          <h1
            className="mt-6 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-[#17181C] sm:text-7xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Notes d&apos;atelier
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#71747A]">
            Nos réflexions sur les matériaux, la réhabilitation et la fabrique de
            la ville. Écrites entre deux chantiers.
          </p>
        </Reveal>
      </section>

      {/* Article à la une */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Link
            href={`/demos/architecte/journal/${lead.slug}`}
            className="group grid items-center gap-8 rounded-none border border-[#17181C]/12 bg-[#DCDDD9] p-5 lg:grid-cols-2 lg:p-8"
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-none bg-[#D1D2CE]">
              <Image
                src={img(lead.coverSeed, 1200, 825)}
                alt={lead.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#34405A] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E8E9E6]">
                À la une
              </span>
            </div>
            <div className="lg:pr-8">
              <div className="flex items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
                <span className="font-semibold text-[#34405A]">{lead.category}</span>
                <span className="size-1 rounded-full bg-[#71747A]" />
                <span>{lead.dateDisplay}</span>
                <span className="size-1 rounded-full bg-[#71747A]" />
                <span>{lead.readingTime}</span>
              </div>
              <h2
                className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#17181C] transition-colors group-hover:text-[#34405A] sm:text-4xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {lead.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#71747A]">
                {lead.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17181C]">
                Lire l&apos;article
                <ArrowUpRight className="size-4 text-[#34405A] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Grille des autres articles */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-10 md:grid-cols-3"
        >
          {rest.map((article) => (
            <motion.article key={article.slug} variants={staggerChild}>
              <Link
                href={`/demos/architecte/journal/${article.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-[#D1D2CE]">
                  <Image
                    src={img(article.coverSeed, 800, 600)}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
                  <span className="font-semibold text-[#34405A]">
                    {article.category}
                  </span>
                  <span className="size-1 rounded-full bg-[#71747A]" />
                  <span>{article.dateDisplay}</span>
                </div>
                <h3
                  className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#17181C] transition-colors group-hover:text-[#34405A]"
                  style={{ fontFamily: "var(--font-archi-display)" }}
                >
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#71747A]">
                  {article.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </>
  );
}
