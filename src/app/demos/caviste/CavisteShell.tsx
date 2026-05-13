"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Wine,
  MapPin,
} from "lucide-react";
import { useCart } from "./CartContext";
import NewsletterPopup from "./NewsletterPopup";

const NAV_LINKS = [
  { href: "/demos/caviste", label: "La Cave" },
  { href: "/demos/caviste/catalogue", label: "Catalogue" },
  { href: "/demos/caviste/regions", label: "Régions" },
  { href: "/demos/caviste/evenements", label: "Événements" },
];

export default function CavisteShell({ children }: { children: React.ReactNode }) {
  const { cart, cartCount, cartTotal, cartOpen, setCartOpen, updateQty, removeItem } = useCart();

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .caviste-marquee { animation: marquee 28s linear infinite; }
        .caviste-marquee:hover { animation-play-state: paused; }
        @keyframes caviste-float {
          0%, 100% { transform: translateY(0px) rotateZ(-1deg); }
          50% { transform: translateY(-14px) rotateZ(1deg); }
        }
        .bottle-float { animation: caviste-float 4s ease-in-out infinite; }
      `}</style>

      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>{children}</main>
      <Footer />

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            total={cartTotal}
            onClose={() => setCartOpen(false)}
            onUpdate={updateQty}
            onRemove={removeItem}
          />
        )}
      </AnimatePresence>

      <NewsletterPopup />
    </>
  );
}

/* ── Navbar ── */
function Navbar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <motion.header
      className="sticky top-0 z-50 w-full transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-10">
        {/* Logo */}
        <Link href="/demos/caviste" className="flex items-center gap-2.5">
          <Wine className="size-5 text-[#C9A84C]" />
          <span
            className="text-base font-semibold tracking-wide text-[#F5F0E8] sm:text-lg"
            style={{ fontFamily: "var(--font-caviste-display)" }}
          >
            La Cave du Sommelier
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative text-sm tracking-wide transition-colors"
                style={{
                  fontFamily: "var(--font-caviste-body)",
                  color: active ? "#C9A84C" : "rgba(245,240,232,0.6)",
                }}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#C9A84C]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            type="button"
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full border border-[#C9A84C]/30 px-3.5 py-2 text-sm text-[#C9A84C] transition-all hover:border-[#C9A84C]/60 hover:bg-[#C9A84C]/10 active:scale-[0.96]"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex size-5 items-center justify-center rounded-full bg-[#C9A84C] text-[10px] font-bold text-[#0D0D0D]"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full border border-[#F5F0E8]/10 lg:hidden"
            aria-label="Menu"
          >
            <span className={`h-px w-4 bg-[#F5F0E8] transition-all ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-[#F5F0E8] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-[#F5F0E8] transition-all ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#C9A84C]/10 bg-[#0D0D0D] lg:hidden"
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm transition-colors"
                    style={{
                      fontFamily: "var(--font-caviste-body)",
                      color: active ? "#C9A84C" : "rgba(245,240,232,0.65)",
                      backgroundColor: active ? "rgba(201,168,76,0.08)" : "transparent",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Cart Drawer ── */
function CartDrawer({
  cart,
  total,
  onClose,
  onUpdate,
  onRemove,
}: {
  cart: ReturnType<typeof useCart>["cart"];
  total: number;
  onClose: () => void;
  onUpdate: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <>
      <motion.div
        key="cart-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-[#0D0D0D]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        key="cart-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#0D0D0D]"
        style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.6), inset 1px 0 0 rgba(201,168,76,0.08)" }}
      >
        <div className="flex items-center justify-between border-b border-[#C9A84C]/10 px-6 py-5">
          <div>
            <h2
              className="text-lg font-semibold text-[#F5F0E8]"
              style={{ fontFamily: "var(--font-caviste-display)" }}
            >
              Mon panier
            </h2>
            <div className="text-xs text-[#F5F0E8]/40">
              {cart.reduce((s, i) => s + i.qty, 0)} article{cart.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full border border-[#F5F0E8]/10 text-[#F5F0E8]/60 transition-colors hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <Wine className="size-12 text-[#F5F0E8]/20" />
              <p className="text-sm text-[#F5F0E8]/45" style={{ fontFamily: "var(--font-caviste-body)" }}>
                Votre panier est vide.
                <br />
                Explorez notre sélection.
              </p>
              <Link
                href="/demos/caviste/catalogue"
                onClick={onClose}
                className="rounded-full bg-[#C9A84C]/10 px-5 py-2 text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D]"
              >
                Voir le catalogue
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-4 rounded-xl border border-[#C9A84C]/10 bg-[#1A0A0A] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]/60">
                      {product.appellation} · {product.millesime}
                    </div>
                    <div
                      className="mt-0.5 truncate text-sm font-semibold text-[#F5F0E8]"
                      style={{ fontFamily: "var(--font-caviste-display)" }}
                    >
                      {product.nom}
                    </div>
                    <div className="mt-1 text-xs text-[#F5F0E8]/40">{product.domaine}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-bold text-[#C9A84C]">
                      {(product.prix * qty).toFixed(0)} €
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdate(product.id, -1)}
                        className="flex size-6 items-center justify-center rounded-full border border-[#F5F0E8]/10 text-[#F5F0E8]/50 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-5 text-center text-xs text-[#F5F0E8]">{qty}</span>
                      <button
                        type="button"
                        onClick={() => onUpdate(product.id, 1)}
                        className="flex size-6 items-center justify-center rounded-full border border-[#F5F0E8]/10 text-[#F5F0E8]/50 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        className="ml-1 flex size-6 items-center justify-center rounded-full text-[#722F37]/70 hover:text-[#722F37]"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-3 border-t border-[#C9A84C]/10 px-6 py-5">
            <div className="flex items-center justify-between text-xs text-[#F5F0E8]/50">
              <span>Sous-total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#F5F0E8]/50">
              <span>Livraison Strasbourg</span>
              <span className="text-[#C9A84C]">Offerte dès 80 €</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#C9A84C]/10 pt-3">
              <span className="text-base font-semibold text-[#F5F0E8]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                Total
              </span>
              <span className="text-xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                {total.toFixed(2)} €
              </span>
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-xl bg-[#C9A84C] py-3.5 text-sm font-bold uppercase tracking-wider text-[#0D0D0D] transition-all hover:bg-[#d4b55c] active:scale-[0.98] active:-translate-y-[1px]"
            >
              Commander
            </button>
            <p className="text-center text-[10px] text-[#F5F0E8]/25">
              Paiement sécurisé · Livraison 24 h · Strasbourg & environs
            </p>
          </div>
        )}
      </motion.aside>
    </>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[#C9A84C]/10 bg-[#0D0D0D] px-5 py-14 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          <div>
            <div className="flex items-center gap-2">
              <Wine className="size-5 text-[#C9A84C]" />
              <span className="text-lg font-semibold text-[#F5F0E8]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                La Cave du Sommelier
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F5F0E8]/45" style={{ fontFamily: "var(--font-caviste-body)" }}>
              Caviste indépendant à Strasbourg depuis 1987. Sélection personnelle, conseil expert, livraison locale.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#F5F0E8]/40">
              <MapPin className="size-3 text-[#C9A84C]" />
              12 rue des Dentelles, 67000 Strasbourg
            </div>
          </div>

          {[
            { title: "La Cave", links: ["Notre histoire", "Notre sélection", "Régions", "Domaines partenaires"] },
            { title: "Services", links: ["Livraison Strasbourg", "Click & Collect", "Coffrets cadeaux", "Dégustations privées"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]">{title}</div>
              <ul className="mt-4 space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[#F5F0E8]/45 transition-colors hover:text-[#C9A84C]">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]">Newsletter</div>
            <p className="mt-4 text-xs text-[#F5F0E8]/45">
              Nouveaux arrivages et invitations aux dégustations en avant-première.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 rounded-lg border border-[#F5F0E8]/10 bg-[#1A0A0A] px-3 py-2 text-xs text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]/40 focus:outline-none"
              />
              <button type="submit" className="rounded-lg bg-[#C9A84C] px-4 py-2 text-xs font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b55c] active:scale-[0.96]">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#C9A84C]/10 pt-6 sm:flex-row">
          <div className="text-xs text-[#F5F0E8]/25">© 2026 La Cave du Sommelier · Site de démonstration Codalyx</div>
          <div className="text-xs text-[#F5F0E8]/25">L'abus d'alcool est dangereux pour la santé — à consommer avec modération</div>
        </div>
      </div>
    </footer>
  );
}
