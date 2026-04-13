import Link from "next/link";

const serviceLinks = [
  { href: "/offres#essentiel", label: "Essentiel" },
  { href: "/offres#pro", label: "Pro" },
  { href: "/offres#premium", label: "Premium" },
];

const agenceLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Orange separator */}
      <div className="h-px bg-[#FF6B2C]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-white/10">
                <div className="size-3 rounded-sm bg-[#FF6B2C]" />
              </div>
              <span className="font-heading text-xl tracking-tight text-white">
                Web<span className="font-semibold">Craft</span>
                <span className="ml-1 font-light text-white/60">
                  Studio
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Agence web strasbourgeoise spécialisée dans la création de sites
              internet performants et sur-mesure pour les entreprises en Alsace.
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/50">
              15 Place Kléber
              <br />
              67000 Strasbourg
            </address>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B2C]">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Agence */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B2C]">
              Agence
            </h3>
            <ul className="mt-4 space-y-3">
              {agenceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Légal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B2C]">
              Légal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; 2025 WebCraft Studio. Tous droits réservés.</p>
          <p>Fait avec soin à Strasbourg</p>
        </div>
      </div>
    </footer>
  );
}
