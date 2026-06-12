"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Menu, X, ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { STUDIO } from "./data";
import { ScrollProgress, GrainOverlay } from "./shared";

const NAV_LINKS = [
  { href: "/demos/architecte", label: "Accueil" },
  { href: "/demos/architecte/projets", label: "Projets" },
  { href: "/demos/architecte/agence", label: "Agence" },
  { href: "/demos/architecte/journal", label: "Journal" },
  { href: "/demos/architecte/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/demos/architecte") return pathname === href;
  return pathname.startsWith(href);
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

function Wordmark({ onClick, light = false }: { onClick?: () => void; light?: boolean }) {
  return (
    <Link
      href="/demos/architecte"
      onClick={onClick}
      className="group flex items-baseline gap-2 leading-none"
    >
      <span
        className={`text-lg font-bold tracking-tight ${light ? "text-[#E8E9E6]" : "text-[#17181C]"}`}
        style={{ fontFamily: "var(--font-archi-display)" }}
      >
        {STUDIO.name}
      </span>
      <span
        className={`hidden font-[family-name:var(--font-archi-mono)] text-[10px] uppercase tracking-[0.3em] sm:inline ${
          light ? "text-[#E8E9E6]/70" : "text-[#34405A]"
        }`}
      >
        {STUDIO.city}
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // La nav reste toujours encre sur clair : elle est posée sur le fond clair de
  // la page (au-dessus du hero), pas par-dessus l'image. Un fond translucide
  // apparaît dès qu'on scrolle pour garder la lisibilité au-dessus du contenu.
  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[#17181C]/10 bg-[#E8E9E6]/90 backdrop-blur-md"
            : "border-b border-[#17181C]/10 bg-[#E8E9E6]"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <Wordmark />

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-[0.18em] text-[#17181C] transition-colors hover:text-[#34405A]"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-[#34405A] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <Link
            href="/demos/architecte/contact"
            className="hidden items-center gap-1.5 bg-[#17181C] px-5 py-2.5 font-[family-name:var(--font-archi-mono)] text-xs uppercase tracking-[0.15em] text-[#E8E9E6] transition-all hover:-translate-y-0.5 hover:bg-[#34405A] lg:inline-flex"
          >
            Rendez-vous
            <ArrowUpRight className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-10 items-center justify-center border border-[#17181C]/15 text-[#17181C] lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* ---- Menu mobile plein écran ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#E8E9E6] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <Wordmark onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#17181C]/15 text-[#17181C]"
                aria-label="Fermer le menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-4xl font-semibold tracking-tight text-[#17181C]"
                    style={{ fontFamily: "var(--font-archi-display)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-10 text-sm text-[#71747A]">
              <a href={`mailto:${STUDIO.email}`} className="block py-1">
                {STUDIO.email}
              </a>
              <a href={`tel:${STUDIO.phone}`} className="block py-1">
                {STUDIO.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

const footerReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Footer() {
  return (
    <footer className="mt-24 border-t border-[#17181C]/10 bg-[#DCDDD9]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <motion.div
          variants={footerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]"
        >
          <div>
            <span
              className="text-3xl font-bold tracking-tight text-[#17181C]"
              style={{ fontFamily: "var(--font-archi-display)" }}
            >
              {STUDIO.name}
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#71747A]">
              {STUDIO.baseline}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#34405A]">
              Naviguer
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-[#17181C]/80 transition-colors hover:text-[#34405A]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm text-[#17181C]/80">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#34405A]">
              Contact
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#34405A]" />
              {STUDIO.address}
            </span>
            <a href={`mailto:${STUDIO.email}`} className="flex items-center gap-2 hover:text-[#34405A]">
              <Mail className="size-4 shrink-0 text-[#34405A]" />
              {STUDIO.email}
            </a>
            <a href={`tel:${STUDIO.phone}`} className="flex items-center gap-2 hover:text-[#34405A]">
              <Phone className="size-4 shrink-0 text-[#34405A]" />
              {STUDIO.phoneDisplay}
            </a>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#17181C]/10 pt-6 text-xs text-[#71747A] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {STUDIO.name} — Cabinet fictif. Démo créée par{" "}
            <Link href="/" className="font-semibold text-[#17181C] hover:text-[#34405A]">
              PrismaWeb
            </Link>
            .
          </span>
          <span>Atelier d&apos;architecture · {STUDIO.signature}</span>
        </div>
      </div>
    </footer>
  );
}

export default function AtelierShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
