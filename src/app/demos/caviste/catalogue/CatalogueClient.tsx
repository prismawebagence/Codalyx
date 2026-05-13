"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Plus, Star, X, ShoppingCart } from "lucide-react";
import type { PexelsPhoto } from "@/lib/pexels";
import { PRODUCTS, REGIONS, type Product, type Region } from "../data";
import { useCart } from "../CartContext";

type Props = { productImages: PexelsPhoto[] };

export default function CatalogueClient({ productImages }: Props) {
  const { addToCart, setCartOpen } = useCart();
  const [activeRegion, setActiveRegion] = useState<Region | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAdd = useCallback(
    (p: Product) => {
      addToCart(p);
      setCartOpen(true);
    },
    [addToCart, setCartOpen]
  );

  const filtered =
    activeRegion === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.region === activeRegion);

  const filters: { id: Region | "all"; label: string }[] = [
    { id: "all", label: "Tous" },
    ...REGIONS.map((r) => ({ id: r.id, label: r.label })),
  ];

  return (
    <section className="min-h-screen bg-[#0D0D0D] px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
              — Notre sélection
            </span>
            <h1
              className="mt-3 text-4xl font-bold leading-none tracking-tighter text-[#F5F0E8] lg:text-5xl"
              style={{ fontFamily: "var(--font-caviste-display)" }}
            >
              La cave<br />
              <span className="italic text-[#C9A84C]">en bouteilles</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
            className="max-w-xs text-sm leading-relaxed text-[#F5F0E8]/50 sm:text-right"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            {PRODUCTS.length} références sélectionnées. Cliquez pour découvrir les notes de dégustation.
          </motion.p>
        </div>

        {/* Region filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {filters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveRegion(id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.96] ${
                activeRegion === id
                  ? "bg-[#C9A84C] text-[#0D0D0D]"
                  : "border border-[#F5F0E8]/10 text-[#F5F0E8]/50 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard
                  product={product}
                  image={
                    productImages[product.id % Math.max(productImages.length, 1)] ??
                    productImages[0]
                  }
                  onAdd={handleAdd}
                  onSelect={setSelectedProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            image={
              productImages[selectedProduct.id % Math.max(productImages.length, 1)] ??
              productImages[0]
            }
            onClose={() => setSelectedProduct(null)}
            onAdd={(p) => {
              handleAdd(p);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Product Card with 3D tilt ── */
function ProductCard({
  product,
  image,
  onAdd,
  onSelect,
}: {
  product: Product;
  image: PexelsPhoto;
  onAdd: (p: Product) => void;
  onSelect: (p: Product) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-[#C9A84C]/10 bg-[#140a0a]"
      onClick={() => onSelect(product)}
    >
      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background: `radial-gradient(120px at ${glowX}% ${glowY}%, rgba(201,168,76,0.13), transparent 70%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {image?.src ? (
           
          <img
            src={image.src}
            alt={product.nom}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#1A0A0A] to-[#722F37]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0a] via-transparent to-transparent" />
        {product.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-[#C9A84C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]">
            {product.badge}
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full border border-[#C9A84C]/30 bg-[#0D0D0D]/60 px-2 py-0.5 font-mono text-[11px] text-[#C9A84C] backdrop-blur-sm">
          {product.millesime}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]/60">
          {product.appellation}
        </div>
        <h3
          className="mt-1 text-base font-semibold leading-tight text-[#F5F0E8]"
          style={{ fontFamily: "var(--font-caviste-display)" }}
        >
          {product.nom}
        </h3>
        <div className="mt-0.5 text-xs text-[#F5F0E8]/45">{product.domaine}</div>

        <div className="mt-3 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`size-3 ${s <= Math.round(product.notation) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#F5F0E8]/20"}`}
            />
          ))}
          <span className="ml-1 text-[11px] text-[#F5F0E8]/40">{product.notation.toFixed(1)}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
            {product.prix} €
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] active:scale-[0.96]"
          >
            <Plus className="size-3" /> Ajouter
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Product Modal ── */
function ProductModal({
  product,
  image,
  onClose,
  onAdd,
}: {
  product: Product;
  image: PexelsPhoto;
  onClose: () => void;
  onAdd: (p: Product) => void;
}) {
  return (
    <>
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-[#0D0D0D]/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        key="modal-box"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="fixed left-1/2 top-1/2 z-[70] w-[min(92vw,780px)] max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[#C9A84C]/12 bg-[#0D0D0D]"
        style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,168,76,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)" }}
      >
        <div className="grid lg:grid-cols-[2fr_3fr]">
          {/* Image */}
          <div className="relative hidden min-h-[380px] lg:block">
            {image?.src ? (
               
              <img src={image.src} alt={product.nom} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#1A0A0A] to-[#722F37]" />
            )}
            {product.badge && (
              <div className="absolute left-4 top-4 rounded-full bg-[#C9A84C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]">
                {product.badge}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]">
                  {product.appellation}
                </div>
                <h2
                  className="mt-1 text-xl font-bold leading-tight text-[#F5F0E8] sm:text-2xl"
                  style={{ fontFamily: "var(--font-caviste-display)" }}
                >
                  {product.nom}
                </h2>
                <div className="mt-0.5 text-sm text-[#F5F0E8]/45">
                  {product.domaine} · {product.millesime}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#F5F0E8]/10 text-[#F5F0E8]/50 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-4 ${s <= Math.round(product.notation) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#F5F0E8]/15"}`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-[#C9A84C]">{product.notation.toFixed(1)}</span>
              <span className="text-xs text-[#F5F0E8]/30">/ 5</span>
            </div>

            <p className="text-sm leading-relaxed text-[#F5F0E8]/65" style={{ fontFamily: "var(--font-caviste-body)" }}>
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#1A0A0A] p-4 text-xs">
              {[
                { label: "Cépage", value: product.cepages },
                { label: "Millésime", value: String(product.millesime) },
                { label: "Région", value: product.region.charAt(0).toUpperCase() + product.region.slice(1) },
                { label: "Accord", value: product.accord },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#C9A84C]/50">{label}</div>
                  <div className="mt-0.5 text-[#F5F0E8]/75">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-[#C9A84C]/10 pt-4">
              <div className="text-3xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                {product.prix} €
              </div>
              <button
                type="button"
                onClick={() => onAdd(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C9A84C] py-3 text-sm font-bold uppercase tracking-wider text-[#0D0D0D] transition-all hover:bg-[#d4b55c] active:scale-[0.98] active:-translate-y-[1px]"
              >
                <ShoppingCart className="size-4" /> Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
