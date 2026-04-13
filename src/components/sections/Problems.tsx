"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Globe, AlertTriangle, SearchX } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

const problems = [
  {
    icon: Globe,
    title: "Pas de site web",
    description:
      "Vos clients potentiels cherchent sur Google\u2026 et trouvent vos concurrents. 70\u00a0% des consommateurs recherchent un commerce local en ligne avant de s\u2019y rendre.",
  },
  {
    icon: AlertTriangle,
    title: "Un site obsol\u00e8te",
    description:
      "Votre site date de 2015, il n\u2019est pas responsive et charge en 8 secondes. Il fait fuir plus qu\u2019il n\u2019attire.",
  },
  {
    icon: SearchX,
    title: "Invisible sur Google",
    description:
      "Vous existez en ligne, mais personne ne vous trouve. Sans r\u00e9f\u00e9rencement local, c\u2019est comme avoir une boutique sans enseigne.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
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

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 800,
      }}
      onMouseMove={(e) => {
        handleMouse(e);
        setIsHovered(true);
      }}
      onMouseLeave={handleLeave}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export default function Problems() {
  return (
    <section className="bg-[#FAFAFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle tag="LE CONSTAT" title="Vous vous reconnaissez ?" />

        <motion.div
          className="mt-16 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {problems.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={cardVariants} className="h-full">
              <TiltCard className="h-full">
                <div className="group flex h-full flex-col rounded-xl border border-[#E4E4E7] bg-white p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#FF6B2C]/5">
                  <div className="mb-5 inline-flex size-12 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                    <Icon className="size-6 text-[#FF6B2C]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#0A0A0A]">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#71717A]">
                    {description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-14 max-w-2xl text-center text-lg italic text-[#0A0A0A]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          Chaque jour sans site performant, ce sont des clients qui choisissent
          un concurrent.
        </motion.p>
      </div>
    </section>
  );
}
