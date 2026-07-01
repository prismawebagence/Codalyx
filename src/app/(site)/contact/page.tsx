import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact | PrismaWeb — Agence Web à Strasbourg",
  description:
    "Contactez PrismaWeb pour votre projet de création de site internet à Strasbourg. Devis gratuit sous 24h, échange sans engagement. Strasbourg et toute l'Alsace.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — PrismaWeb, agence web à Strasbourg",
    description:
      "Parlons de votre projet de site internet. Devis gratuit sous 24h, sans engagement. PrismaWeb, Strasbourg et toute l'Alsace.",
    url: "https://prismaweb.fr/contact",
    type: "website",
  },
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "3 Rue Relinde\n67200 Strasbourg",
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

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
            CONTACT
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#6B7280]">
            Remplissez le formulaire ou contactez-nous directement. Nous vous répondons sous 24h.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-8 rounded-2xl border border-[#E4E4E7] bg-white p-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex gap-4">
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
                          className="text-sm text-[#6B7280] hover:text-[#FF6B2C] whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#6B7280] whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
