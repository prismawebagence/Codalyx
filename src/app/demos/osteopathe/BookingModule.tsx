"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";

/**
 * Module de prise de rendez-vous en ligne.
 *
 * Flux en 4 étapes :
 *   1. Choix de la prestation (adulte / sportif / grossesse / enfant)
 *   2. Choix d'une date (14 prochains jours, dimanches exclus)
 *   3. Choix d'un créneau horaire (matin / après-midi / soir)
 *   4. Coordonnées + confirmation
 *
 * Les créneaux "occupés" sont générés de façon déterministe (hash sur date+slot)
 * pour que la démo ait l'air vivante sans jamais crasher. Aucune persistance :
 * le formulaire se réinitialise après l'écran de confirmation.
 */

type PrestationId = "adulte" | "sportif" | "grossesse" | "enfant";

interface Prestation {
  id: PrestationId;
  label: string;
  duration: string;
  price: string;
  description: string;
}

const PRESTATIONS: Prestation[] = [
  {
    id: "adulte",
    label: "Adulte",
    duration: "60 min",
    price: "65 €",
    description: "Séance complète pour douleurs chroniques, tensions, stress.",
  },
  {
    id: "sportif",
    label: "Sportif",
    duration: "60 min",
    price: "75 €",
    description: "Préparation, récupération et traitement des traumatismes.",
  },
  {
    id: "grossesse",
    label: "Femme enceinte",
    duration: "45 min",
    price: "65 €",
    description: "Accompagnement pré et post-natal, techniques douces.",
  },
  {
    id: "enfant",
    label: "Nourrisson & enfant",
    duration: "45 min",
    price: "55 €",
    description: "Plagiocéphalies, coliques, troubles du sommeil.",
  },
];

const TIME_SLOTS = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "14:00",
  "14:45",
  "15:30",
  "16:15",
  "17:00",
  "17:45",
  "18:30",
] as const;

const WEEKDAYS_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

/**
 * Génère 14 jours à partir d'aujourd'hui en excluant les dimanches.
 * Démarre à J+1 : on ne prend pas de rendez-vous le jour même.
 */
function useUpcomingDays(): Date[] {
  return useMemo(() => {
    const days: Date[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    let cursor = 1;
    while (days.length < 14) {
      const d = new Date(start);
      d.setDate(start.getDate() + cursor);
      cursor += 1;
      if (d.getDay() === 0) continue; // pas de dimanche
      days.push(d);
    }
    return days;
  }, []);
}

/**
 * Hash déterministe simple : décide si un créneau est occupé en fonction de
 * la date et de l'heure. Garantit une expérience stable entre re-renders.
 */
function isSlotBusy(date: Date, slot: string): boolean {
  const seed =
    date.getDate() * 37 +
    date.getMonth() * 11 +
    parseInt(slot.replace(":", ""), 10);
  return seed % 7 === 0 || seed % 11 === 0;
}

function formatDateLong(d: Date): string {
  return `${WEEKDAYS_SHORT[d.getDay()].toLowerCase()} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingModule() {
  const days = useUpcomingDays();
  const [step, setStep] = useState<Step>(1);
  const [prestation, setPrestation] = useState<PrestationId | null>(null);
  const [selectedDayIso, setSelectedDayIso] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const selectedDay = useMemo(
    () => days.find((d) => formatDateISO(d) === selectedDayIso) ?? null,
    [days, selectedDayIso],
  );

  const selectedPrestation = useMemo(
    () => PRESTATIONS.find((p) => p.id === prestation) ?? null,
    [prestation],
  );

  // Helpers — on avance d'étape directement dans le handler de sélection,
  // pour éviter `setState` dans un effet (anti-pattern React 19).
  const choosePrestation = (id: PrestationId) => {
    setPrestation(id);
    if (step === 1) setStep(2);
  };
  const chooseDay = (iso: string) => {
    setSelectedDayIso(iso);
    if (step === 2) setStep(3);
  };
  const chooseSlot = (slot: string) => {
    setSelectedSlot(slot);
    if (step === 3) setStep(4);
  };

  const goBack = () => {
    if (step === 2) {
      setPrestation(null);
      setStep(1);
    } else if (step === 3) {
      setSelectedDayIso(null);
      setStep(2);
    } else if (step === 4) {
      setSelectedSlot(null);
      setStep(3);
    }
  };

  const reset = () => {
    setPrestation(null);
    setSelectedDayIso(null);
    setSelectedSlot(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", note: "" });
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulation réseau — en prod, ici on appellerait un endpoint ou un service
    // type Calendly / Cal.com. Pour la démo, on se contente d&apos;une pause.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setStep(5);
  };

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.trim().length >= 8;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2F4A34]/15 bg-white shadow-[0_40px_80px_-40px_rgba(47,74,52,0.25)]">
      {/* ---- PROGRESS BAR ---- */}
      <div className="flex items-center gap-2 border-b border-[#2F4A34]/10 bg-[#F5F1EA] px-5 py-4 sm:px-8">
        {[1, 2, 3, 4].map((s) => {
          const done = step > s || step === 5;
          const active = step === s;
          return (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  done
                    ? "bg-[#2F4A34] text-white"
                    : active
                      ? "bg-[#C06B4E] text-white"
                      : "bg-white text-[#2F4A34]/50 ring-1 ring-[#2F4A34]/15"
                }`}
              >
                {done ? <Check className="size-3.5" /> : s}
              </span>
              {s < 4 && (
                <span
                  className={`h-px flex-1 ${done ? "bg-[#2F4A34]" : "bg-[#2F4A34]/15"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ---- STEP CONTENT ---- */}
      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1 : prestation */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader
                number="01"
                title="Pour qui est la consultation ?"
                description="Chaque approche est adaptée au profil du patient."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PRESTATIONS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => choosePrestation(p.id)}
                    className="group relative flex flex-col items-start gap-2 rounded-2xl border border-[#2F4A34]/15 bg-[#F5F1EA]/60 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#C06B4E] hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className="text-lg font-semibold text-[#1A1F1B]"
                        style={{ fontFamily: "var(--font-osteo-display)" }}
                      >
                        {p.label}
                      </span>
                      <span className="rounded-full bg-[#2F4A34] px-2.5 py-1 text-[11px] font-semibold text-white">
                        {p.price}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#2F4A34]/70">
                      <Clock className="size-3" /> {p.duration}
                    </span>
                    <p className="text-sm leading-relaxed text-[#1A1F1B]/70">
                      {p.description}
                    </p>
                    <ChevronRight className="absolute right-4 bottom-4 size-4 text-[#C06B4E] opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 : date */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader
                number="02"
                title="Choisissez une date"
                description="Le cabinet est ouvert du lundi au samedi."
                onBack={goBack}
              />
              <div className="mt-6 -mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
                <div className="flex min-w-max gap-2">
                  {days.map((d) => {
                    const iso = formatDateISO(d);
                    const isActive = iso === selectedDayIso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => chooseDay(iso)}
                        className={`flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl border px-2 py-4 transition-all ${
                          isActive
                            ? "-translate-y-0.5 border-[#2F4A34] bg-[#2F4A34] text-white shadow-lg"
                            : "border-[#2F4A34]/15 bg-white hover:-translate-y-0.5 hover:border-[#C06B4E]"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            isActive ? "text-white/70" : "text-[#2F4A34]/60"
                          }`}
                        >
                          {WEEKDAYS_SHORT[d.getDay()]}
                        </span>
                        <span
                          className="text-2xl font-semibold leading-none"
                          style={{ fontFamily: "var(--font-osteo-display)" }}
                        >
                          {d.getDate()}
                        </span>
                        <span
                          className={`text-[10px] font-medium uppercase ${
                            isActive ? "text-white/70" : "text-[#2F4A34]/60"
                          }`}
                        >
                          {MONTHS[d.getMonth()]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-4 text-xs text-[#1A1F1B]/60">
                Astuce : faites défiler horizontalement pour voir les jours suivants.
              </p>
            </motion.div>
          )}

          {/* STEP 3 : créneau */}
          {step === 3 && selectedDay && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader
                number="03"
                title={`Créneaux — ${formatDateLong(selectedDay)}`}
                description="Les créneaux barrés sont déjà réservés."
                onBack={goBack}
              />
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((slot) => {
                  const busy = isSlotBusy(selectedDay, slot);
                  const isActive = slot === selectedSlot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={busy}
                      onClick={() => chooseSlot(slot)}
                      className={`relative rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                        busy
                          ? "cursor-not-allowed border-[#2F4A34]/10 bg-[#F5F1EA] text-[#1A1F1B]/30 line-through"
                          : isActive
                            ? "-translate-y-0.5 border-[#2F4A34] bg-[#2F4A34] text-white shadow-md"
                            : "border-[#2F4A34]/15 bg-white hover:-translate-y-0.5 hover:border-[#C06B4E] hover:text-[#C06B4E]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center gap-4 text-xs text-[#1A1F1B]/60">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#2F4A34]" />
                  Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#1A1F1B]/20" />
                  Indisponible
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 4 : coordonnées */}
          {step === 4 && selectedDay && selectedSlot && selectedPrestation && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeader
                number="04"
                title="Vos coordonnées"
                description="Nous vous envoyons une confirmation par e-mail."
                onBack={goBack}
              />

              <div className="mt-6 rounded-2xl border border-[#2F4A34]/15 bg-[#F5F1EA]/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C06B4E]">
                      Récapitulatif
                    </div>
                    <div
                      className="mt-1 text-lg font-semibold"
                      style={{ fontFamily: "var(--font-osteo-display)" }}
                    >
                      {selectedPrestation.label} · {formatDateLong(selectedDay)}{" "}
                      à {selectedSlot}
                    </div>
                    <div className="text-sm text-[#1A1F1B]/60">
                      {selectedPrestation.duration} — {selectedPrestation.price}
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Prénom"
                    icon={<User className="size-4" />}
                    value={form.firstName}
                    onChange={(v) => setForm({ ...form, firstName: v })}
                    placeholder="Marie"
                    autoComplete="given-name"
                  />
                  <Field
                    label="Nom"
                    value={form.lastName}
                    onChange={(v) => setForm({ ...form, lastName: v })}
                    placeholder="Lefèvre"
                    autoComplete="family-name"
                  />
                </div>
                <Field
                  label="E-mail"
                  type="email"
                  icon={<Mail className="size-4" />}
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="marie.lefevre@exemple.fr"
                  autoComplete="email"
                />
                <Field
                  label="Téléphone"
                  type="tel"
                  icon={<Phone className="size-4" />}
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="06 12 34 56 78"
                  autoComplete="tel"
                />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1F1B]/70">
                    Motif de consultation (facultatif)
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) =>
                      setForm({ ...form, note: e.target.value })
                    }
                    rows={3}
                    placeholder="Quelques mots sur vos douleurs ou le contexte…"
                    className="w-full resize-none rounded-xl border border-[#2F4A34]/15 bg-white px-4 py-3 text-sm placeholder:text-[#1A1F1B]/30 focus:border-[#C06B4E] focus:outline-none focus:ring-2 focus:ring-[#C06B4E]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#2F4A34] px-6 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-[#C06B4E] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-[#2F4A34]"
                >
                  {submitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Confirmer le rendez-vous
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>

                <p className="text-xs leading-relaxed text-[#1A1F1B]/50">
                  En confirmant, vous acceptez d&apos;être contacté·e par le cabinet
                  pour finaliser votre rendez-vous. Aucun paiement n&apos;est demandé
                  en ligne — le règlement s&apos;effectue sur place.
                </p>
              </form>
            </motion.div>
          )}

          {/* STEP 5 : confirmation */}
          {step === 5 && selectedDay && selectedSlot && selectedPrestation && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                className="flex size-20 items-center justify-center rounded-full bg-[#2F4A34] text-white"
              >
                <Check className="size-10" strokeWidth={2.5} />
              </motion.div>
              <h3
                className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-osteo-display)" }}
              >
                Rendez-vous confirmé
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#1A1F1B]/70">
                Un e-mail de confirmation vient d&apos;être envoyé à{" "}
                <strong className="text-[#1A1F1B]">{form.email}</strong>. À très
                bientôt, {form.firstName}.
              </p>

              <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#2F4A34]/15 bg-[#F5F1EA]/60 p-4 text-left">
                <dl className="space-y-2 text-sm">
                  <Row label="Prestation" value={selectedPrestation.label} />
                  <Row label="Date" value={formatDateLong(selectedDay)} />
                  <Row label="Heure" value={selectedSlot} />
                  <Row label="Durée" value={selectedPrestation.duration} />
                  <Row label="Tarif" value={selectedPrestation.price} />
                </dl>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C06B4E] hover:underline"
              >
                Prendre un autre rendez-vous
                <ArrowRight className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- */
/* Sub-components                                                 */
/* -------------------------------------------------------------- */

function StepHeader({
  number,
  title,
  description,
  onBack,
}: {
  number: string;
  title: string;
  description: string;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#C06B4E]">
          Étape {number}
        </span>
        <h3
          className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-osteo-display)" }}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-[#1A1F1B]/60">{description}</p>
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2F4A34]/20 px-3 py-1.5 text-xs font-semibold text-[#2F4A34] transition-colors hover:border-[#C06B4E] hover:text-[#C06B4E]"
        >
          <ArrowLeft className="size-3" />
          Retour
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1F1B]/70">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2F4A34]/50">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-xl border border-[#2F4A34]/15 bg-white text-sm placeholder:text-[#1A1F1B]/30 focus:border-[#C06B4E] focus:outline-none focus:ring-2 focus:ring-[#C06B4E]/20 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A1F1B]/50">
        {label}
      </dt>
      <dd className="font-semibold text-[#1A1F1B]">{value}</dd>
    </div>
  );
}
