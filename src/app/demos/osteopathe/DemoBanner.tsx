import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";

/**
 * Bannière de démo PrismaWeb (FR uniquement pour cette démo).
 */
export default function DemoBanner() {
  return (
    <div className="w-full bg-[#1A1F1B] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:text-sm">
        <span className="flex items-center gap-2 text-center sm:text-left">
          <Sparkles className="size-4 shrink-0 text-[#C06B4E]" />
          <span>
            Site de démonstration créé par{" "}
            <strong className="font-semibold">PrismaWeb</strong>. Entreprise
            fictive à vocation illustrative.
          </span>
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#C06B4E] px-3 py-1 font-medium text-white transition-colors hover:bg-[#a4573e]"
        >
          Retour au site PrismaWeb
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}
