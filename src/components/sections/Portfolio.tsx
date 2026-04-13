"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";

const projects = [
  {
    name: "Boulangerie Koenig",
    type: "Site vitrine",
    description:
      "Un site chaleureux qui met en valeur le savoir-faire artisanal et attire de nouveaux clients du quartier.",
    gradient: "from-[#0A0A0A] to-[#FF6B2C]/70",
  },
  {
    name: "Dr. Martin - Ost\u00e9opathe",
    type: "Site + R\u00e9servation",
    description:
      "Prise de rendez-vous en ligne int\u00e9gr\u00e9e et pr\u00e9sentation des sp\u00e9cialit\u00e9s pour rassurer les patients.",
    gradient: "from-[#FF6B2C] to-[#E55A1F]",
  },
  {
    name: "Cave \u00e0 Vins Petite France",
    type: "E-commerce",
    description:
      "Boutique en ligne avec gestion de stock et livraison locale pour ce caviste du centre historique.",
    gradient: "from-[#0A0A0A] to-[#333]",
  },
  {
    name: "Garage Auto Kleber",
    type: "Site vitrine",
    description:
      "Un site professionnel avec devis en ligne et galerie de r\u00e9alisations pour ce garage de confiance.",
    gradient: "from-[#1a1a1a] to-[#FF6B2C]/50",
  },
  {
    name: "Atelier C\u00e9ramique Mira",
    type: "Portfolio",
    description:
      "Portfolio visuel pour mettre en lumi\u00e8re les cr\u00e9ations uniques et les ateliers ouverts au public.",
    gradient: "from-[#FF6B2C]/80 to-[#E55A1F]/60",
  },
  {
    name: "Restaurant Le Strasbourgeois",
    type: "Site + Menu QR",
    description:
      "Menu digital accessible par QR code, r\u00e9servation en ligne et mise en avant de la carte saisonni\u00e8re.",
    gradient: "from-[#0A0A0A] to-[#1a1a1a]",
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
          title={"Des projets qui parlent d'eux-mêmes"}
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Gradient background simulating project image */}
              <div
                className={`aspect-video w-full bg-gradient-to-br ${project.gradient}`}
              />

              {/* Default overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 transition-all duration-500 ease-out group-hover:bg-black/60 sm:p-6">
                <div className="translate-y-2 transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <span className="mb-1 inline-block text-xs font-medium tracking-wider text-[#FF6B2C] uppercase">
                    {project.type}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                    {project.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-[#FF6B2C] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                  <span>Voir le projet</span>
                  <ExternalLink className="size-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A] px-6 py-3 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
          >
            Voir toutes nos r&eacute;alisations
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
