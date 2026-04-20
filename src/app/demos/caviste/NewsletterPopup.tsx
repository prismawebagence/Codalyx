"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wine, ArrowRight } from "lucide-react";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("caviste-newsletter-dismissed")) return;
    const timer = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("caviste-newsletter-dismissed", "1");
    setVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      sessionStorage.setItem("caviste-newsletter-dismissed", "1");
      setTimeout(() => setVisible(false), 800);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop — desktop only */}
          <motion.div
            key="nl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] hidden bg-[#0D0D0D]/60 backdrop-blur-sm sm:block"
            onClick={dismiss}
          />

          {/* Modal — slides up on mobile, scale on desktop */}
          <motion.div
            key="nl-modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="
              fixed z-[90] overflow-hidden
              bottom-0 left-0 right-0 rounded-t-3xl
              sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2
              sm:-translate-x-1/2 sm:-translate-y-1/2
              sm:w-[min(90vw,500px)] sm:rounded-3xl
            "
            style={{
              background: "linear-gradient(135deg, #1A0A0A 0%, #0D0D0D 60%, #14080A 100%)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,168,76,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)",
            }}
          >
            {/* Gold top accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

            <div className="relative p-7 sm:p-8">
              {/* Close */}
              <button
                type="button"
                onClick={dismiss}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-[#F5F0E8]/10 text-[#F5F0E8]/50 transition-colors hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
              >
                <X className="size-3.5" />
              </button>

              {/* Icon */}
              <div className="mb-5 flex size-11 items-center justify-center rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/8">
                <Wine className="size-5 text-[#C9A84C]" />
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#C9A84C]">
                      — Avant-première
                    </p>
                    <h2
                      className="mt-2 text-2xl font-bold leading-snug text-[#F5F0E8] sm:text-3xl"
                      style={{ fontFamily: "var(--font-caviste-display)" }}
                    >
                      Nouveaux arrivages
                      <br />
                      <span className="italic text-[#C9A84C]">en exclusivité</span>
                    </h2>
                    <p
                      className="mt-3 text-sm leading-relaxed text-[#F5F0E8]/55"
                      style={{ fontFamily: "var(--font-caviste-body)" }}
                    >
                      Recevez nos sélections rares et les invitations aux dégustations privées avant tout le monde.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6">
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.fr"
                          required
                          className="flex-1 rounded-xl border border-[#F5F0E8]/10 bg-[#0D0D0D] px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]/50 focus:outline-none transition-colors"
                        />
                        <button
                          type="submit"
                          className="flex items-center gap-2 rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0D0D0D] transition-all hover:bg-[#d4b55c] active:scale-[0.98] active:-translate-y-[1px]"
                        >
                          <span className="hidden sm:inline">S'inscrire</span>
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                      <p className="mt-3 text-[11px] text-[#F5F0E8]/30">
                        Pas de spam. Désabonnement en un clic. Données jamais revendues.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-4 text-center"
                  >
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10">
                      <Wine className="size-7 text-[#C9A84C]" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#F5F0E8]"
                      style={{ fontFamily: "var(--font-caviste-display)" }}
                    >
                      Bienvenue dans la cave
                    </h3>
                    <p className="mt-2 text-sm text-[#F5F0E8]/55" style={{ fontFamily: "var(--font-caviste-body)" }}>
                      Vous serez parmi les premiers informés de nos prochains arrivages.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
