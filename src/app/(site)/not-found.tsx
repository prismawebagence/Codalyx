import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-heading text-8xl font-bold text-[#0A0A0A] md:text-9xl">
        404
      </span>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-[#0A0A0A] md:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-[#6B7280]">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF6B2C] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/offres"
          className="text-sm font-medium text-[#0A0A0A] underline underline-offset-4 hover:text-[#FF6B2C]"
        >
          Voir nos offres
        </Link>
      </div>
    </div>
  );
}
