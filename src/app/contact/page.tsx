import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact | WebCraft Studio — Agence Web Strasbourg",
  description:
    "Contactez WebCraft Studio pour votre projet de création de site internet à Strasbourg. Devis gratuit sous 24h. 15 Place Kléber, 67000 Strasbourg.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "15 Place Kléber\n67000 Strasbourg",
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

            {/* Map placeholder */}
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
