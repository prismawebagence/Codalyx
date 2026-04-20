"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";

type Project = {
  name: string;
  type: string;
  description: string;
  gradient: string;
  href?: string;
};

const projects: Project[] = [
  {
    name: "Boulangerie du Pont Saint-Martin",
    type: "Site vitrine",
    description:
      "Démo en ligne : site d\u2019artisan boulanger fictif avec hero, carte des produits, histoire et horaires — palette chaleureuse sur-mesure.",
    gradient: "from-[#3D2817] to-[#8B5A2B]",
    href: "/demos/boulangerie",
  },
  {
    name: "Studio M\u00e9ridien \u2014 Ost\u00e9opathie",
    type: "Site + R\u00e9servation en ligne",
    description:
      "D\u00e9mo en ligne : cabinet d\u2019ost\u00e9opathie fictif \u00e0 Lyon avec prise de rendez-vous int\u00e9gr\u00e9e \u2014 choix de la prestation, calendrier interactif, cr\u00e9neaux et confirmation.",
    gradient: "from-[#2F4A34] to-[#8FA68E]",
    href: "/demos/osteopathe",
  },
  {
    name: "La Cave du Sommelier — Caviste Premium",
    type: "E-commerce · Catalogue & Panier",
    description:
      "Démo en ligne : caviste fictif à Strasbourg avec catalogue de 9 vins d'exception, filtres par région, cards 3D, panier interactif et fiche produit détaillée.",
    gradient: "from-[#1A0A0A] to-[#722F37]",
    href: "/demos/caviste",
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
          description={"Codalyx démarre son activité en 2026. Voici trois projets de démonstration représentatifs des types de sites que nous créons."}
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const CardInner = (
              <>
                {/* Gradient background simulating project image */}
                <div
                  className={`aspect-video w-full bg-gradient-to-br ${project.gradient}`}
                />

                {/* Demo badge */}
                <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
                  {project.href ? "Démo en ligne" : "Bientôt"}
                </span>

                {/* Default overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 transition-all duration-500 ease-out group-hover:bg-black/60 sm:p-6">
                  <div className="translate-y-2 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <span className="mb-1 inline-block text-xs font-medium tracking-wider text-[#FF6B2C] uppercase">
                      {project.type}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
                      {project.description}
                    </p>
                  </div>
                  {project.href && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#FF6B2C] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                      Voir la démo
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <motion.div
                key={project.name}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    {CardInner}
                  </Link>
                ) : (
                  CardInner
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
