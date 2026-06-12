"use client";

import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { STUDIO } from "../data";
import { Reveal, SectionLabel } from "../shared";
import BookingModule from "./BookingModule";

const INFOS = [
  {
    icon: MapPin,
    label: "L'atelier",
    value: STUDIO.address,
    href: "https://maps.google.com/?q=14+quai+des+Bateliers+Strasbourg",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: STUDIO.email,
    href: `mailto:${STUDIO.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: STUDIO.phoneDisplay,
    href: `tel:${STUDIO.phone}`,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun – Ven · 9h00 – 18h00",
  },
] as const;

export default function ContactClient() {
  return (
    <>
      {/* En-tête */}
      <section className="mx-auto max-w-[1400px] px-4 pt-14 pb-10 sm:px-6 lg:px-10 lg:pt-20">
        <Reveal>
          <SectionLabel index="01">Contact</SectionLabel>
          <h1
            className="mt-6 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-[#17181C] sm:text-7xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            Parlons de votre <span className="text-[#34405A]">projet</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#71747A]">
            Réservez un premier rendez-vous en quelques clics. Gratuit, sans
            engagement — l&apos;occasion de poser votre idée sur la table.
          </p>
        </Reveal>
      </section>

      {/* Coordonnées + réservation */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Colonne infos */}
          <Reveal className="min-w-0">
            <div className="lg:sticky lg:top-28">
              <div className="grid gap-px overflow-hidden rounded-none border border-[#17181C]/12 bg-[#17181C]/12">
                {INFOS.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 bg-[#E8E9E6] p-6 transition-colors group-hover:bg-[#DCDDD9]">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#34405A]/10 text-[#34405A]">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#71747A]">
                          {info.label}
                        </div>
                        <div className="mt-1 font-medium text-[#17181C]">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  );
                  return "href" in info && info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.label} className="group">
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Carte (placeholder stylé) */}
              <div className="relative mt-6 h-56 overflow-hidden rounded-none border border-[#17181C]/12 bg-[#DCDDD9]">
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(#17181C 1px, transparent 1px), linear-gradient(90deg, #17181C 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-[#34405A] text-[#E8E9E6] shadow-lg">
                    <MapPin className="size-6" />
                  </span>
                  <span className="text-sm font-semibold text-[#17181C]">
                    Quai des Bateliers
                  </span>
                  <span className="text-xs text-[#71747A]">
                    Krutenau · {STUDIO.city}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Colonne réservation */}
          <Reveal delay={0.1} className="min-w-0">
            <BookingModule />
          </Reveal>
        </div>
      </section>
    </>
  );
}
