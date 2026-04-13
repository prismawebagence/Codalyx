"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import ContactForm from "@/components/shared/ContactForm";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "15 Place Kléber, 67000 Strasbourg",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "03 88 00 00 00",
    href: "tel:+33388000000",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@webcraft-studio.fr",
    href: "mailto:contact@webcraft-studio.fr",
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

            {/* Google Maps */}
            <motion.div
              className="mt-6 aspect-video overflow-hidden rounded-2xl border border-[#E4E4E7]"
              variants={itemVariants}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.5!2d7.7456!3d48.5834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDM1JzAwLjQiTiA3wrA0NCc0NC4yIkU!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WebCraft Studio — 15 Place Kléber, Strasbourg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
