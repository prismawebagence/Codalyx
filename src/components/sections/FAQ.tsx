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
      "Le d\u00e9lai d\u00e9pend de la formule choisie : environ 2 semaines pour l\u2019Essentiel, 3 semaines pour le Pro et 4 \u00e0 5 semaines pour le Premium. Ces d\u00e9lais incluent les phases de maquette, validation et d\u00e9veloppement.",
  },
  {
    question: "Est-ce que je suis propri\u00e9taire de mon site ?",
    answer:
      "Oui, \u00e0 100\u00a0%. Le code source, le contenu et le nom de domaine vous appartiennent. Si vous d\u00e9cidez de partir, nous vous transf\u00e9rons l\u2019int\u00e9gralit\u00e9 de vos fichiers.",
  },
  {
    question: "Puis-je r\u00e9silier l\u2019abonnement mensuel ?",
    answer:
      "Oui, l\u2019abonnement est sans engagement. Vous pouvez r\u00e9silier \u00e0 tout moment avec un pr\u00e9avis de 30 jours. Votre site reste le v\u00f4tre, seuls l\u2019h\u00e9bergement et la maintenance s\u2019arr\u00eatent.",
  },
  {
    question: "Combien de modifications puis-je demander ?",
    answer:
      "L\u2019offre Premium inclut 2 modifications par mois. Pour les offres Essentiel et Pro, les modifications sont factur\u00e9es \u00e0 l\u2019heure (60\u00a0\u20ac/h). Les corrections de bugs sont toujours gratuites.",
  },
  {
    question: "L\u2019h\u00e9bergement est-il inclus ?",
    answer:
      "Oui, l\u2019h\u00e9bergement haute performance, le nom de domaine, le certificat SSL et les sauvegardes automatiques sont inclus dans l\u2019abonnement mensuel de chaque formule.",
  },
  {
    question: "Le site sera-t-il bien r\u00e9f\u00e9renc\u00e9 sur Google ?",
    answer:
      "Chaque site est construit avec les bonnes pratiques SEO : structure technique optimis\u00e9e, vitesse de chargement, balises m\u00e9ta, et donn\u00e9es structur\u00e9es. Les offres Pro et Premium incluent un travail de r\u00e9f\u00e9rencement local approfondi.",
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
