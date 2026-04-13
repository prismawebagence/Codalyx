"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OfferCardProps {
  tier: "essentiel" | "pro" | "premium";
  name: string;
  price: string;
  monthly: string;
  tagline: string;
  features: string[];
  featured?: boolean;
  href: string;
}

export default function OfferCard({
  name,
  price,
  monthly,
  tagline,
  features,
  featured = false,
  href,
}: OfferCardProps) {
  return (
    <motion.div
      className={`relative flex h-full flex-col rounded-2xl bg-white p-8 ${
        featured
          ? "border-2 border-[#FF6B2C] shadow-lg shadow-[#FF6B2C]/10 lg:scale-105"
          : "border border-[#E4E4E7]"
      }`}
      whileHover={{
        scale: featured ? 1.07 : 1.03,
        rotateY: 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 1000 }}
    >
      {/* Popular badge */}
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6B2C] px-4 py-1 text-xs font-semibold text-white">
          Populaire
        </span>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-semibold text-[#0A0A0A]">
          {name}
        </h3>
        <p className="mt-1 text-sm text-[#71717A]">{tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading text-4xl font-bold text-[#0A0A0A]">
            {price}&nbsp;&euro;
          </span>
          <span className="text-sm text-[#71717A]">cr&eacute;ation</span>
        </div>
        <p className="mt-1 text-sm text-[#71717A]">
          + {monthly}&nbsp;&euro;/mois
        </p>
      </div>

      {/* Features */}
      <ul className="mb-10 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-[#0A0A0A]" />
            <span className="text-[#0A0A0A]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={href}
        className={`mt-auto inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors ${
          featured
            ? "bg-[#FF6B2C] text-white hover:bg-[#E55A1F]"
            : "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
        }`}
      >
        D&eacute;couvrir l&apos;offre {name}
      </Link>
    </motion.div>
  );
}
