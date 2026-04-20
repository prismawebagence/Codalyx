"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Sparkles, Clock } from "lucide-react";

const signals = [
  { icon: MapPin, label: "Bas\u00e9 \u00e0 Strasbourg" },
  { icon: Sparkles, label: "Nouvelle agence alsacienne" },
  { icon: Clock, label: "R\u00e9ponse sous 24h" },
];

const slideIn: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

export default function TrustBar() {
  return (
    <section className="border-t border-b border-[#E4E4E7] bg-[#FAFAFA]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-6 py-5 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[#E4E4E7]">
        {signals.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2.5 sm:px-8"
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={i}
          >
            <Icon className="size-5 shrink-0 text-[#FF6B2C]" />
            <span className="text-sm font-medium text-[#0A0A0A]">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
