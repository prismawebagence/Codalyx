"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { PexelsPhoto } from "@/lib/pexels";
import { PRODUCTS, REGIONS, type Region } from "../data";

export default function RegionsClient({ cellarImage }: { cellarImage: PexelsPhoto }) {
  const [hovered, setHovered] = useState<Region | null>(null);

  return (
    <section className="min-h-screen bg-[#0D0D0D] px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
            — Nos terroirs
          </span>
          <h1
            className="mt-3 text-4xl font-bold leading-tight text-[#F5F0E8] lg:text-5xl"
            style={{ fontFamily: "var(--font-caviste-display)" }}
          >
            Des vignobles
            <br />
            <span className="italic text-[#C9A84C]">soigneusement choisis.</span>
          </h1>
          <p
            className="mt-4 max-w-lg text-sm leading-relaxed text-[#F5F0E8]/55"
            style={{ fontFamily: "var(--font-caviste-body)" }}
          >
            Chaque région représentée dans notre cave a été sillonnée par notre équipe.
            Nous ne référençons que des domaines visités, dont nous connaissons les vignerons.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          {/* Left: cellar image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            {cellarImage?.src ? (
               
              <img
                src={cellarImage.src}
                alt="Cave du Sommelier"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#1A0A0A] to-[#2a1010]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-[#0D0D0D]/70 p-4 backdrop-blur-md">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]">
                Strasbourg, Alsace
              </div>
              <div
                className="mt-1 text-base font-semibold text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-caviste-display)" }}
              >
                Cave voûtée XVIIIe siècle
              </div>
              <div className="mt-1 text-xs text-[#F5F0E8]/55">500 références · 12° constant</div>
            </div>
          </motion.div>

          {/* Right: regions list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
          >
            <ul className="space-y-2">
              {REGIONS.map((r, i) => {
                const regionProducts = PRODUCTS.filter((p) => p.region === r.id);
                return (
                  <motion.li
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 + i * 0.1 }}
                    onMouseEnter={() => setHovered(r.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative overflow-hidden rounded-xl px-5 py-5 transition-all duration-300"
                    style={{
                      backgroundColor: hovered === r.id ? `${r.color}22` : "rgba(255,255,255,0.03)",
                      borderLeft: `2px solid ${hovered === r.id ? r.color : "transparent"}`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div
                          className="text-xl font-semibold text-[#F5F0E8] transition-colors"
                          style={{ fontFamily: "var(--font-caviste-display)" }}
                        >
                          {r.label}
                        </div>
                        <div className="mt-0.5 text-xs text-[#F5F0E8]/40">{r.sub}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-[#C9A84C]">{r.count}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#F5F0E8]/30">cuvées</div>
                      </div>
                      <ChevronRight
                        className="size-4 text-[#C9A84C] transition-all duration-300"
                        style={{ opacity: hovered === r.id ? 1 : 0, transform: hovered === r.id ? "translateX(4px)" : "none" }}
                      />
                    </div>

                    {/* Products preview on hover */}
                    {hovered === r.id && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {regionProducts.map((p) => (
                          <li key={p.id} className="flex items-center justify-between rounded-lg bg-[#0D0D0D]/60 px-4 py-2.5">
                            <div>
                              <div
                                className="text-sm font-medium text-[#F5F0E8]"
                                style={{ fontFamily: "var(--font-caviste-display)" }}
                              >
                                {p.nom}
                              </div>
                              <div className="text-[11px] text-[#F5F0E8]/40">{p.domaine} · {p.millesime}</div>
                            </div>
                            <div className="text-sm font-bold text-[#C9A84C]">{p.prix} €</div>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.8 }}
              className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-[#C9A84C]/10 bg-[#1A0A0A] p-6"
              style={{ boxShadow: "inset 0 1px 0 rgba(201,168,76,0.08)" }}
            >
              {[
                { n: "4", label: "régions" },
                { n: "9+", label: "domaines" },
                { n: "12°", label: "en cave" },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "var(--font-caviste-display)" }}>
                    {n}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-[#F5F0E8]/40">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
