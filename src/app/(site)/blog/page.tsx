import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Conseils web & SEO pour entreprises | Codalyx",
  description:
    "Articles et conseils sur la création de site internet, le SEO local et la stratégie digitale pour les entreprises à Strasbourg et en Alsace.",
};

const posts = [
  {
    title: "5 raisons pour lesquelles votre entreprise a besoin d\u2019un site web en 2025",
    excerpt:
      "Encore aujourd\u2019hui, de nombreux artisans et commerçants n\u2019ont pas de site internet. Voici pourquoi c\u2019est une erreur qui vous coûte des clients chaque jour.",
    date: "15 mars 2025",
    category: "Stratégie",
    slug: "#",
  },
  {
    title: "SEO local : comment apparaître en premier sur Google à Strasbourg",
    excerpt:
      "Google My Business, mots-clés locaux, avis clients... Guide complet pour dominer les résultats de recherche dans votre ville.",
    date: "8 mars 2025",
    category: "SEO",
    slug: "#",
  },
  {
    title: "Site vitrine vs site e-commerce : lequel choisir ?",
    excerpt:
      "Vous hésitez entre un simple site vitrine et une boutique en ligne ? On vous aide à faire le bon choix selon votre activité et vos objectifs.",
    date: "1 mars 2025",
    category: "Conseil",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
            BLOG
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-5xl">
            Ressources & conseils
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#6B7280]">
            Nos articles pour vous aider à comprendre le web et développer votre activité en ligne.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-[#FF6B2C]/10 px-3 py-0.5 text-xs font-medium text-[#FF6B2C]">
                {post.category}
              </span>
              <h2 className="mt-4 font-heading text-lg font-semibold text-[#0A0A0A] leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">{post.date}</span>
                <Link
                  href={post.slug}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#0A0A0A] hover:text-[#FF6B2C]"
                >
                  Lire
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
