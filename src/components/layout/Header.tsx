"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/offres", label: "Offres" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 10;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[#E4E4E7] bg-white/80 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="PrismaWeb — Accueil">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#0A0A0A]">
            <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
              <path d="M 9 35 L 9 14 L 16 14 Q 21 14 21 18.5 Q 21 23 16 23 L 9 23"
                    fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 25 14 Q 26 33 30 33 Q 32 33 33.5 23 Q 35 33 37 33 Q 41 33 42 14"
                    fill="none" stroke="#FF6B2C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-[#0A0A0A]">
            Prisma<span className="text-[#FF6B2C]">Web</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#0A0A0A]"
                    : "text-[#71717A] hover:text-[#0A0A0A]"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-x-3 -bottom-[1.05rem] h-0.5 bg-[#FF6B2C]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#FF6B2C] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
          >
            Devis gratuit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-[#52525B] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
                  aria-label="Ouvrir le menu"
                  aria-haspopup="dialog"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="size-5" aria-hidden="true" />
                </button>
              }
            />
            <SheetContent side="right" className="w-80 bg-white">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-lg">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                            isActive
                              ? "bg-[#FF6B2C]/10 text-[#FF6B2C]"
                              : "text-[#71717A] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
                          )}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
                <div className="mt-4 px-4">
                  <SheetClose
                    render={
                      <Link
                        href="/contact"
                        className="flex h-11 w-full items-center justify-center rounded-lg bg-[#FF6B2C] text-sm font-semibold text-white transition-colors hover:bg-[#E55A1F]"
                      />
                    }
                  >
                    Devis gratuit
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
