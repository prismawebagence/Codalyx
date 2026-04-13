"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#1A1A1A]">
            <div className="size-3 rounded-sm bg-[#FF6B2C]" />
          </div>
          <span className="font-heading text-xl tracking-tight text-[#0A0A0A]">
            Web<span className="font-semibold">Craft</span>
            <span className="ml-1 font-light text-[#71717A]">Studio</span>
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
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FF6B2C] px-4 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#E55A1F]"
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
                  className="inline-flex size-9 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="size-5" />
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
                        className="flex h-10 w-full items-center justify-center rounded-lg bg-[#FF6B2C] text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#E55A1F]"
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
