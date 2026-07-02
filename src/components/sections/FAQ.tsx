"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faq";

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
