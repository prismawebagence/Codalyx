"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle";

type Project = {
  name: string;
  type: string;
  description: string;
  gradient: string;
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    name: "Boulangerie du Pont Saint-Martin",
    type: "Site vitrine",
    description:
      "Démo en ligne : site d\u2019artisan boulanger fictif avec hero, carte des produits, histoire et horaires — palette chaleureuse sur-mesure.",
    gradient: "from-[#3D2817] to-[#8B5A2B]",
    image: "/previews/boulangerie.webp",
    href: "/demos/boulangerie",
  },
  {
    name: "Studio M\u00e9ridien \u2014 Ost\u00e9opathie",
    type: "Site + R\u00e9servation en ligne",
    description:
      "D\u00e9mo en ligne : cabinet d\u2019ost\u00e9opathie fictif \u00e0 Lyon avec prise de rendez-vous int\u00e9gr\u00e9e \u2014 choix de la prestation, calendrier interactif, cr\u00e9neaux et confirmation.",
    gradient: "from-[#2F4A34] to-[#8FA68E]",
    image: "/previews/osteopathe.webp",
    href: "/demos/osteopathe",
  },
  {
    name: "Atelier Vauban — Cabinet d’architecture",
    type: "Pack Pro · Multi-pages, blog & RDV",
    description:
      "Démo en ligne : cabinet d’architecture fictif à Strasbourg — projets filtrables, fiches détaillées, journal (blog) et prise de rendez-vous en ligne. Le niveau d’une agence parisienne.",
    gradient: "from-[#1A1815] to-[#A23E22]",
    image: "/previews/architecte.webp",
    href: "/demos/architecte",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="realisations" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={"NOS RÉALISATIONS"}
          title={"Trois démos pour illustrer notre savoir-faire"}
          description={"PrismaWeb démarre son activité en 2026. Voici trois projets de démonstration représentatifs des types de sites que nous créons."}
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const domain = `prismaweb.fr${project.href ?? ""}`;
            const CardInner = (
              <>
                {/* Mockup navigateur — le screenshot reste net, sans voile */}
                <div className="border-b border-slate-200/70">
                  {/* Barre du navigateur */}
                  <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="size-2.5 rounded-full bg-[#28C840]" />
                    </span>
                    <span className="ml-1 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-center text-[11px] font-medium text-slate-500">
                      {domain}
                    </span>
                  </div>

                  {/* Screenshot */}
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}
                  >
                    <Image
                      src={project.image}
                      alt={`Aperçu du site ${project.name} créé par PrismaWeb`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {project.href && (
                      <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0A0A0A] shadow-sm">
                        <span className="size-1.5 rounded-full bg-[#28C840]" />
                        Démo en ligne
                      </span>
                    )}
                  </div>
                </div>

                {/* Légende — infos posées proprement sous le mockup */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#FF6B2C]">
                    {project.type}
                  </span>
                  <h3 className="mt-1.5 font-heading text-lg font-semibold text-[#0A0A0A]">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {project.description}
                  </p>
                  {project.href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B2C]">
                      Voir la démo
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <motion.div
                key={project.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_28px_52px_-20px_rgba(0,0,0,0.24)]"
              >
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full cursor-pointer flex-col"
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col">{CardInner}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A] px-6 py-3 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
          >
            Discuter de votre projet
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
