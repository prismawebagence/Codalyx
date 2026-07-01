import type { Metadata } from "next";
import { Sparkles, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Conseils web & SEO local pour entreprises | PrismaWeb",
  description:
    "Articles et conseils sur la création de site internet, le SEO local et la présence en ligne pour les artisans, commerçants et PME de Strasbourg et d'Alsace.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Conseils web & SEO local | PrismaWeb",
    description:
      "Conseils concrets sur la création de site internet et le référencement local pour les entreprises de Strasbourg et d'Alsace.",
    url: "https://prismaweb.fr/blog",
    type: "website",
  },
};

const upcoming = [
  {
    title: "5 raisons pour lesquelles votre entreprise a besoin d’un site web",
    excerpt:
      "Encore aujourd’hui, de nombreux artisans et commerçants n’ont pas de site internet. On expliquera pourquoi c’est une erreur qui coûte des clients chaque semaine.",
    category: "Stratégie",
  },
  {
    title: "SEO local : comment apparaître en premier sur Google à Strasbourg",
    excerpt:
      "Google Business Profile, mots-clés locaux, avis clients : un guide concret pour dominer les résultats de recherche dans votre ville.",
    category: "SEO",
  },
  {
    title: "Site vitrine ou site avec CMS : lequel choisir ?",
    excerpt:
      "Vous hésitez entre un site statique et un site éditable depuis votre téléphone ? On compare les deux selon votre activité et vos contraintes.",
    category: "Conseil",
  },
];

export default function BlogPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#FF6B2C]">
            Blog
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            Ressources & conseils
          </h1>
          <p className="mt-5 text-lg text-[#52525B] leading-relaxed">
            Le blog ouvre bientôt. Des articles concrets, sans charabia marketing, pour
            comprendre le web et faire grandir votre activité en ligne.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6B2C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
            >
              <Mail className="size-4" />
              Être prévenu du premier article
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717A]">
            <Sparkles className="mr-1 inline size-3 text-[#FF6B2C]" />
            Articles en préparation
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {upcoming.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-[#E4E4E7] bg-white p-6"
              >
                <span className="inline-block rounded-full bg-[#FF6B2C]/10 px-3 py-0.5 text-xs font-medium text-[#FF6B2C]">
                  {post.category}
                </span>
                <h2 className="mt-4 font-heading text-lg font-semibold text-[#0A0A0A] leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-block rounded-full border border-[#E4E4E7] px-3 py-0.5 text-[11px] font-medium text-[#71717A]">
                  Bientôt
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
