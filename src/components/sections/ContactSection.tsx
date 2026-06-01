"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import ContactForm from "@/components/shared/ContactForm";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "3 Rue Relinde, 67200 Strasbourg",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "07 71 65 75 28",
    href: "tel:+33771657528",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@prismaweb.fr",
    href: "mailto:contact@prismaweb.fr",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun — Ven, 9h — 18h",
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={"CONTACT"}
          title={"Parlons de votre projet"}
          description={"Remplissez le formulaire ou contactez-nous directement. Nous vous répondons sous 24h."}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Formulaire */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <ContactForm />
          </motion.div>

          {/* Infos de contact */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="space-y-6 rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    className="flex gap-4"
                    variants={itemVariants}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                      <Icon className="size-5 text-[#FF6B2C]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-[#71717A] transition-colors hover:text-[#FF6B2C]"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#71717A]">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
