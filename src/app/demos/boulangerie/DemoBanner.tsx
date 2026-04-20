"use client";

import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import { useLocale } from "./LocaleProvider";

/**
 * Bannière de démo Codalyx.
 *
 * Client Component car le texte « Site de démonstration créé par… »
 * est localisé via useLocale. Le sélecteur de langue est dans la
 * barre de navigation « Maison Farine » (plus en contexte boulangerie).
 */
export default function DemoBanner() {
  const { t } = useLocale();

  return (
    <div className="w-full bg-[#0A0A0A] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:text-sm">
        <span className="flex items-center gap-2 text-center sm:text-left">
          <Sparkles className="size-4 shrink-0 text-[#F4B942]" />
          <span>
            {t.demoBanner.notice}{" "}
            <strong className="font-semibold">{t.demoBanner.by}</strong>{" "}
            {t.demoBanner.suffix}
          </span>
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#E63946] px-3 py-1 font-medium text-white transition-colors hover:bg-[#c5303c]"
        >
          {t.demoBanner.back}
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}
