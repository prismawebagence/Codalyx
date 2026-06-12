import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProject, img } from "../../data";
import { Reveal, SectionLabel } from "../../shared";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/demos/architecte/projets/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Projet introuvable · Atelier Vauban" };
  return {
    title: `${project.name} — ${project.category} · Atelier Vauban (Démo PrismaWeb)`,
    description: project.summary,
    robots: { index: false, follow: false },
  };
}

export default async function ProjetDetailPage(
  props: PageProps<"/demos/architecte/projets/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <>
      {/* Fil d'Ariane + titre */}
      <section className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
        <Reveal>
          <Link
            href="/demos/architecte/projets"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#71747A] hover:text-[#34405A]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Tous les projets
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-archi-mono)] text-xs text-[#71747A]">
            <span className="rounded-full bg-[#17181C] px-3 py-1 font-semibold text-[#E8E9E6]">
              {project.category}
            </span>
            <span>{project.year}</span>
            <span className="size-1 rounded-full bg-[#34405A]" />
            <span>{project.location}</span>
            <span className="size-1 rounded-full bg-[#34405A]" />
            <span>{project.status}</span>
          </div>
          <h1
            className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-[#17181C] sm:text-7xl"
            style={{ fontFamily: "var(--font-archi-display)" }}
          >
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#71747A]">
            {project.summary}
          </p>
        </Reveal>
      </section>

      {/* Image de couverture */}
      <section className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-none bg-[#D1D2CE]">
            <Image
              src={img(project.coverSeed, 1600, 900, true)}
              alt={`${project.name} — vue principale`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Corps : texte + fiche technique */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <SectionLabel index="01">Le projet</SectionLabel>
            <div className="mt-7 space-y-6">
              {project.body.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-[#17181C]/85 ${
                    i === 0 ? "text-xl sm:text-2xl" : "text-base text-[#71747A]"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-none border border-[#17181C]/12 bg-[#DCDDD9] p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#34405A]">
                Fiche technique
              </span>
              <dl className="mt-6 divide-y divide-[#17181C]/10">
                {project.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-[#71747A]">{fact.label}</dt>
                    <dd
                      className="text-right text-sm font-semibold text-[#17181C]"
                      style={{ fontFamily: "var(--font-archi-display)" }}
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-[#71747A]">Maîtrise d&apos;ouvrage</dt>
                  <dd className="text-right text-sm font-semibold text-[#17181C]">
                    {project.client}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-[#71747A]">Mission</dt>
                  <dd className="max-w-[60%] text-right text-sm font-semibold text-[#17181C]">
                    {project.mission}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galerie */}
      <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {project.gallerySeeds.map((seed, i) => (
            <Reveal key={seed} delay={i * 0.05}>
              <div
                className={`relative overflow-hidden rounded-none bg-[#D1D2CE] ${
                  i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img(seed, 1200, 800, true)}
                  alt={`${project.name} — vue ${i + 1}`}
                  fill
                  sizes={i === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projet suivant */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <Reveal>
          <Link
            href={`/demos/architecte/projets/${next.slug}`}
            className="group flex flex-col gap-6 rounded-none border border-[#17181C]/12 bg-[#17181C] p-8 text-[#E8E9E6] transition-colors hover:bg-[#34405A] sm:flex-row sm:items-center sm:justify-between sm:p-12"
          >
            <div>
              <span className="font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-widest text-[#E8E9E6]/60">
                Projet suivant
              </span>
              <h2
                className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                {next.name}
              </h2>
              <p className="mt-2 text-sm text-[#E8E9E6]/70">
                {next.category} · {next.location}
              </p>
            </div>
            <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full border border-[#E8E9E6]/30 transition-transform group-hover:scale-110">
              <ArrowRight className="size-6" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <Link
              href="/demos/architecte/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#17181C] underline-offset-4 hover:text-[#34405A] hover:underline"
            >
              Un projet similaire ? Parlons-en
              <ArrowUpRight className="size-4 text-[#34405A]" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
