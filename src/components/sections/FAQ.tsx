"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Combien de temps faut-il pour cr\u00e9er mon site ?",
    answer:
      "Le d\u00e9lai d\u00e9pend de la formule : 5 \u00e0 7 jours ouvr\u00e9s pour le Pack Vitrine, 10 \u00e0 14 jours pour le Pack Business, 21 \u00e0 30 jours pour le Pack Pro. Ces d\u00e9lais incluent les phases de maquette, validation et d\u00e9veloppement.",
  },
  {
    question: "Est-ce que je suis propri\u00e9taire de mon site ?",
    answer:
      "Oui, \u00e0 100\u00a0%. Le code source, le contenu et le nom de domaine vous appartiennent. Si vous d\u00e9cidez de partir, nous vous transf\u00e9rons l\u2019int\u00e9gralit\u00e9 de vos fichiers.",
  },
  {
    question: "La maintenance est-elle obligatoire ?",
    answer:
      "Non. La Maintenance Contenu (99 \u20ac/mois, pour le Pack Vitrine) et la Maintenance Technique (69 \u20ac/mois, pour les Packs Business et Pro) sont optionnelles, sans engagement, r\u00e9siliables avec un pr\u00e9avis de 30 jours par email.",
  },
  {
    question: "Combien co\u00fbte une modification apr\u00e8s livraison ?",
    answer:
      "Avec un Pack Business ou Pro, vous modifiez vous-m\u00eame textes et images via le CMS Sanity. Pour les modifications de code (nouvelle section, design) ou pour les clients Vitrine, comptez 65 \u20ac/h hors forfait, ou utilisez la maintenance qui inclut un quota mensuel.",
  },
  {
    question: "L\u2019h\u00e9bergement est-il inclus ?",
    answer:
      "Oui, l\u2019h\u00e9bergement Vercel est inclus \u00e0 vie dans le prix de cr\u00e9ation. Le nom de domaine (~10\u201315 \u20ac/an) reste \u00e0 la charge du client.",
  },
  {
    question: "Le site sera-t-il bien r\u00e9f\u00e9renc\u00e9 sur Google ?",
    answer:
      "Chaque site applique les bonnes pratiques SEO : structure technique optimis\u00e9e, vitesse, balises m\u00e9ta, donn\u00e9es structur\u00e9es. Le Pack Business inclut un SEO avanc\u00e9, et le Pack Pro un rapport SEO initial avec recommandations de mots-cl\u00e9s.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="FAQ" title={"Vos questions, nos r\u00e9ponses"} />

        <Accordion className="mt-12">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium text-[#0A0A0A] hover:text-[#FF6B2C]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#71717A]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
