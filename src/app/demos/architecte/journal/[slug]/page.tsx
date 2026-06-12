import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JOURNAL, getArticle, img, STUDIO } from "../../data";
import { Reveal } from "../../shared";

export function generateStaticParams() {
  return JOURNAL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/demos/architecte/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return { title: "Article introuvable · Atelier Vauban" };
  return {
    title: `${article.title} · Journal de l'Atelier Vauban (Démo PrismaWeb)`,
    description: article.excerpt,
    robots: { index: false, follow: false },
  };
}

export default async function ArticlePage(
  props: PageProps<"/demos/architecte/journal/[slug]">,
) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const currentIndex = JOURNAL.findIndex((a) => a.slug === slug);
  const next = JOURNAL[(currentIndex + 1) % JOURNAL.length];

  return (
    <article>
      {/* En-tête */}
      <header className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:pt-16">
        <Reveal>
          <Link
            href="/demos/architecte/journal"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#71747A] hover:text-[#34405A]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Le journal
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
            <span className="rounded-full bg-[#34405A] px-3 py-1 font-semibold text-[#E8E9E6]">
              {article.category}
            </span>
            <span>{article.dateDisplay}</span>
            <span className="size-1 rounded-full bg-[#34405A]" />
            <span>{article.readingTime} de lecture</span>
          </div>
          <h1
            className="mt-6 text-4xl font-bold leading-[1.02] tracking-tight text-[#17181C] sm:text-6xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            {article.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-[#71747A]">
            {article.excerpt}
          </p>
        </Reveal>
      </header>

      {/* Couverture */}
      <div className="mx-auto mt-12 max-w-[1100px] px-4 sm:px-6">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#D1D2CE]">
            <Image
              src={img(article.coverSeed, 1400, 788)}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Corps */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="space-y-7">
            {article.body.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed text-[#17181C]/85 ${
                  i === 0
                    ? "text-2xl font-medium text-[#17181C]"
                    : "text-lg text-[#17181C]/80"
                }`}
                style={
                  i === 0 ? { fontFamily: "var(--font-archi-display)" } : undefined
                }
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-none border border-[#17181C]/12 bg-[#DCDDD9] p-7 text-sm text-[#71747A]">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#34405A]">
              Rédigé par l&apos;atelier
            </span>
            <p className="mt-3 leading-relaxed">
              {STUDIO.name} publie régulièrement ses réflexions de chantier. Pour
              échanger sur un projet,{" "}
              <Link
                href="/demos/architecte/contact"
                className="font-semibold text-[#17181C] underline underline-offset-2 hover:text-[#34405A]"
              >
                prenez rendez-vous
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>

      {/* Article suivant */}
      <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <Reveal>
          <Link
            href={`/demos/architecte/journal/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-none border border-[#17181C]/12 bg-[#17181C] p-7 text-[#E8E9E6] transition-colors hover:bg-[#34405A]"
          >
            <div>
              <span className="font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-widest text-[#E8E9E6]/60">
                Article suivant
              </span>
              <h2
                className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {next.title}
              </h2>
            </div>
            <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
