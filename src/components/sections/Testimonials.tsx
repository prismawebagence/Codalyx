"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

const testimonials = [
  {
    quote:
      "Depuis la refonte de notre site, les appels ont doubl\u00e9 en 3 mois. L\u2019\u00e9quipe a parfaitement compris notre m\u00e9tier et nos clients.",
    name: "Marc D.",
    role: "Artisan plombier",
    city: "Strasbourg",
    initial: "M",
  },
  {
    quote:
      "Un site professionnel livr\u00e9 en 10 jours, sans stress. Le SEO local a port\u00e9 ses fruits d\u00e8s le premier mois.",
    name: "Sophie L.",
    role: "Ost\u00e9opathe",
    city: "Illkirch",
    initial: "S",
  },
  {
    quote:
      "Notre boutique en ligne tourne parfaitement. Le rapport mensuel nous permet de suivre notre croissance sereinement.",
    name: "Thomas R.",
    role: "Caviste",
    city: "Colmar",
    initial: "T",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
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

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#FAFAFA] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle tag={"TÉMOIGNAGES"} title="Ils nous font confiance" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl border border-[#E4E4E7] bg-white p-8"
            >
              {/* Decorative quote */}
              <span className="pointer-events-none absolute top-4 right-6 font-heading text-7xl leading-none text-[#FF6B2C]/10">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-[#FF6B2C] text-[#FF6B2C]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="relative z-10 text-sm leading-relaxed text-[#0A0A0A]">
                {t.quote}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#0A0A0A] text-sm font-semibold text-white">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#71717A]">
                    {t.role}, {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
