import Link from "next/link";
import { ExternalLink, Wine } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="w-full bg-[#1A0A0A] border-b border-[#C9A84C]/20 text-[#F5F0E8]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:text-sm">
        <span className="flex items-center gap-2 text-center sm:text-left">
          <Wine className="size-4 shrink-0 text-[#C9A84C]" />
          <span className="text-[#F5F0E8]/70">
            Site de démonstration créé par{" "}
            <strong className="font-semibold text-[#C9A84C]">Codalyx</strong>. Caviste fictif à vocation illustrative.
          </span>
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/40 px-3 py-1 text-[#C9A84C] text-xs font-medium tracking-wide transition-all hover:bg-[#C9A84C]/10"
        >
          Retour à Codalyx
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}
