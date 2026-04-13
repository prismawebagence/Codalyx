"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/shared/SectionTitle";
import OfferCard from "@/components/sections/OfferCard";

const offers = [
  {
    tier: "essentiel" as const,
    name: "Essentiel",
    price: "690",
    monthly: "39",
    tagline: "Le site qui vous rend visible.",
    featured: false,
    href: "/offres/essentiel",
    features: [
      "Site vitrine 3 \u00e0 5 pages",
      "Design professionnel responsive",
      "Formulaire de contact s\u00e9curis\u00e9",
      "Google Maps + avis Google",
      "Fiche Google Business optimis\u00e9e",
      "H\u00e9bergement, domaine & SSL inclus",
      "Maintenance technique & s\u00e9curit\u00e9",
    ],
  },
  {
    tier: "pro" as const,
    name: "Pro",
    price: "1 290",
    monthly: "69",
    tagline: "Le site qui vous fait sonner le t\u00e9l\u00e9phone.",
    featured: true,
    href: "/offres/pro",
    features: [
      "Tout l\u2019Essentiel, plus :",
      "8 \u00e0 10 pages sur-mesure",
      "Blog int\u00e9gr\u00e9 (CMS simple)",
      "SEO local sur 3 mots-cl\u00e9s",
      "Prise de rendez-vous en ligne",
      "Gestion mensuelle Google My Business",
    ],
  },
  {
    tier: "premium" as const,
    name: "Premium",
    price: "2 290",
    monthly: "119",
    tagline: "Le site qui devient votre meilleur commercial.",
    featured: false,
    href: "/offres/premium",
    features: [
      "Tout le Pro, plus :",
      "E-commerce l\u00e9ger (30 produits) ou r\u00e9servation avanc\u00e9e",
      "Site multilingue FR / DE",
      "2 modifications par mois incluses",
      "Rapport mensuel de performance",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

export default function OffersGrid() {
  return (
    <section className="bg-[#FAFAFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          tag="NOS OFFRES"
          title="Une formule pour chaque ambition"
          description={"Pas de surprise, pas de jargon. Des sites professionnels livrés clé en main."}
        />

        <motion.div
          className="mt-16 grid items-stretch gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {offers.map((offer) => (
            <motion.div key={offer.tier} variants={itemVariants} className="h-full">
              <OfferCard {...offer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
