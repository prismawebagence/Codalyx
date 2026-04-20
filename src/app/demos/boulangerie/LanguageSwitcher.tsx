"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { LOCALES, type LocaleCode } from "./translations";

/**
 * Dropdown compact pour basculer FR / DE / EN.
 *
 * Placé dans la barre de navigation « Maison Farine » (fond clair crème),
 * d'où le style sombre. Accessible au clavier (Escape) et ferme au
 * clic extérieur.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const choose = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={t.switcher.ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-black/15 bg-white/60 px-3 text-xs font-semibold uppercase tracking-wide text-[#0A0A0A] transition-colors hover:border-[#E63946] hover:text-[#E63946]"
      >
        <Globe className="size-3.5" />
        <span>{current.label}</span>
        <ChevronDown
          className={`size-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.switcher.ariaLabel}
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-black/10 bg-white text-[#0A0A0A] shadow-lg"
        >
          {LOCALES.map((l) => {
            const isActive = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => choose(l.code)}
                  className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[#F4F1EC] ${
                    isActive ? "bg-[#F4F1EC] font-semibold" : "font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-6 text-[11px] font-bold tracking-wider text-[#E63946]">
                      {l.label}
                    </span>
                    <span>{l.name}</span>
                  </span>
                  {isActive && <Check className="size-3.5 text-[#E63946]" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
