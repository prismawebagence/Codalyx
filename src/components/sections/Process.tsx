"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { MessageSquare, Palette, Code2, Rocket } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

const steps = [
  {
    icon: MessageSquare,
    title: "Brief & \u00e9change",
    description:
      "Un appel de 20 minutes pour comprendre votre activit\u00e9, vos objectifs et vos clients. On parle humain, pas jargon.",
    timeline: "\u00c9tape 1",
  },
  {
    icon: Palette,
    title: "Maquette & validation",
    description:
      "Nous concevons une maquette fid\u00e8le \u00e0 votre image. Vous validez avant qu\u2019une seule ligne de code ne soit \u00e9crite.",
    timeline: "\u00c9tape 2",
  },
  {
    icon: Code2,
    title: "D\u00e9veloppement",
    description:
      "Votre site prend vie : responsive, rapide, optimis\u00e9 SEO. On vous tient inform\u00e9 \u00e0 chaque \u00e9tape.",
    timeline: "\u00c9tape 3",
  },
  {
    icon: Rocket,
    title: "Mise en ligne",
    description:
      "H\u00e9bergement, domaine, SSL : on s\u2019occupe de tout. Votre site est en ligne et vous \u00eates form\u00e9 pour l\u2019utiliser.",
    timeline: "\u00c9tape 4",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="methode" className="bg-[#FAFAFA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={"NOTRE MÉTHODE"}
          title={"4 étapes, zéro prise de tête"}
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mt-16"
        >
          {/* Dashed connector line */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-[calc(12.5%+20px)] hidden h-px w-[calc(75%-40px)] border-t-2 border-dashed border-[#E4E4E7] md:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-10 left-1/2 block h-[calc(100%-40px)] w-px -translate-x-1/2 border-l-2 border-dashed border-[#E4E4E7] md:hidden"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={stepVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number circle */}
                  <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-[#0A0A0A] shadow-lg">
                    <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-[#FF6B2C] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <Icon className="size-8 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 font-heading text-xl font-semibold text-[#0A0A0A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#71717A]">
                    {step.description}
                  </p>

                  {/* Timeline label */}
                  <span className="mt-4 inline-block rounded-full bg-[#FF6B2C]/10 px-4 py-1.5 text-sm font-semibold text-[#FF6B2C]">
                    {step.timeline}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom note */}
        <p className="mt-16 text-center text-sm text-[#71717A]">
          D&eacute;lai : 5-7 jours pour le Pack Vitrine, 10-14 jours pour le Business, 21-30 jours pour le Pro
        </p>
      </div>
    </section>
  );
}
