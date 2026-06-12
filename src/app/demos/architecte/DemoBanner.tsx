import Link from "next/link";
import { ExternalLink, Compass } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="w-full border-b border-[#17181C]/10 bg-[#DCDDD9] text-[#17181C]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:text-sm">
        <span className="flex items-center gap-2 text-center sm:text-left">
          <Compass className="size-4 shrink-0 text-[#34405A]" />
          <span className="text-[#17181C]/70">
            Site de démonstration créé par{" "}
            <strong className="font-semibold text-[#34405A]">PrismaWeb</strong>. Cabinet d&apos;architecture fictif à vocation illustrative.
          </span>
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#17181C]/25 px-3 py-1 text-xs font-medium tracking-wide text-[#17181C] transition-all hover:border-[#34405A] hover:text-[#34405A]"
        >
          Retour à PrismaWeb
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}
