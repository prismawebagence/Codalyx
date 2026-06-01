"use client";

/**
 * Client-side i18n pour la démo boulangerie.
 *
 * Pourquoi un provider local et pas next-intl / i18next ?
 * - La démo n'a qu'une seule page, pas besoin de routing localisé.
 * - Les traductions sont colocatées dans `translations.ts` (typé).
 * - Changement instantané sans rechargement.
 *
 * La langue est persistée dans `localStorage` et reflétée sur `<html lang>`
 * pour l'accessibilité et le SEO (lecteurs d'écran, Google).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, type LocaleCode, type Translations } from "./translations";

interface LocaleContextValue {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "prismaweb-demo-locale";

function readStoredLocale(): LocaleCode {
  if (typeof window === "undefined") return "fr";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "fr" || raw === "de" || raw === "en") return raw;
  return "fr";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // On démarre en "fr" côté SSR pour éviter l'hydration mismatch. La vraie
  // langue est lue dans un effet (client uniquement).
  const [locale, setLocaleState] = useState<LocaleCode>("fr");

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== locale) setLocaleState(stored);
    document.documentElement.lang = stored;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* localStorage indispo (private mode) — on continue en mémoire */
    }
    document.documentElement.lang = code;
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
