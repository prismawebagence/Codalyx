"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  Phone,
  User,
} from "lucide-react";

/**
 * Module de prise de rendez-vous de l'Atelier Vauban (démo Pack Pro).
 *
 * Flux en 4 étapes : nature du projet → date → créneau → coordonnées.
 * Les créneaux occupés sont générés de façon déterministe (hash date+slot)
 * pour que la démo reste vivante sans persistance ni crash.
 */

type ProjetId = "neuf" | "renovation" | "interieur" | "public";

interface ProjetType {
  id: ProjetId;
  label: string;
  meta: string;
  description: string;
}

const PROJET_TYPES: ProjetType[] = [
  {
    id: "neuf",
    label: "Construction neuve",
    meta: "Maison · Extension",
    description: "Vous avez un terrain ou un projet de construction à imaginer.",
  },
  {
    id: "renovation",
    label: "Rénovation & réhabilitation",
    meta: "Transformer l'existant",
    description: "Vous souhaitez transformer un bâtiment existant ou patrimonial.",
  },
  {
    id: "interieur",
    label: "Aménagement intérieur",
    meta: "Espaces & mobilier",
    description: "Repenser un intérieur, un local commercial ou des bureaux.",
  },
  {
    id: "public",
    label: "Équipement public ou tertiaire",
    meta: "Concours · Marché public",
    description: "Vous portez un projet d'équipement, de bureaux ou de concours.",
  },
];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
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

/** 12 jours ouvrés à partir de demain (week-end exclu). */
function useUpcomingDays(): Date[] {
  return useMemo(() => {
    const days: Date[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    let cursor = 1;
    while (days.length < 12) {
      const d = new Date(start);
      d.setDate(start.getDate() + cursor);
      cursor += 1;
      const day = d.getDay();
      if (day === 0 || day === 6) continue; // pas de week-end
      days.push(d);
    }
    return days;
  }, []);
}

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
  const [projet, setProjet] = useState<ProjetId | null>(null);
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

  const selectedProjet = useMemo(
    () => PROJET_TYPES.find((p) => p.id === projet) ?? null,
    [projet],
  );

  const chooseProjet = (id: ProjetId) => {
    setProjet(id);
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
      setProjet(null);
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
    setProjet(null);
    setSelectedDayIso(null);
    setSelectedSlot(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", note: "" });
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulation réseau — en prod, on appellerait un endpoint ou Calendly/Cal.com.
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
    <div className="overflow-hidden rounded-none border border-[#17181C]/12 bg-[#E8E9E6] shadow-[0_40px_80px_-40px_rgba(26,24,21,0.3)]">
      {/* Progress */}
      <div className="flex items-center gap-2 border-b border-[#17181C]/10 bg-[#DCDDD9] px-5 py-4 sm:px-8">
        {[1, 2, 3, 4].map((s) => {
          const done = step > s || step === 5;
          const active = step === s;
          return (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  done
                    ? "bg-[#17181C] text-[#E8E9E6]"
                    : active
                      ? "bg-[#34405A] text-[#E8E9E6]"
                      : "bg-[#E8E9E6] text-[#17181C]/40 ring-1 ring-[#17181C]/15"
                }`}
              >
                {done ? <Check className="size-3.5" /> : s}
              </span>
              {s < 4 && (
                <span
                  className={`h-px flex-1 ${done ? "bg-[#17181C]" : "bg-[#17181C]/15"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
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
                title="Quel est votre projet ?"
                description="Cela nous permet de préparer le bon interlocuteur."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PROJET_TYPES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => chooseProjet(p.id)}
                    className="group relative flex flex-col items-start gap-2 rounded-2xl border border-[#17181C]/12 bg-[#DCDDD9]/60 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#34405A] hover:bg-[#E8E9E6] hover:shadow-lg"
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span
                        className="text-lg font-semibold text-[#17181C]"
                        style={{ fontFamily: "var(--font-archi-display)" }}
                      >
                        {p.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34405A]">
                      {p.meta}
                    </span>
                    <p className="text-sm leading-relaxed text-[#71747A]">
                      {p.description}
                    </p>
                    <ChevronRight className="absolute right-4 bottom-4 size-4 text-[#34405A] opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
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
                description="L'atelier reçoit du lundi au vendredi."
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
                            ? "-translate-y-0.5 border-[#17181C] bg-[#17181C] text-[#E8E9E6] shadow-lg"
                            : "border-[#17181C]/12 bg-[#E8E9E6] hover:-translate-y-0.5 hover:border-[#34405A]"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            isActive ? "text-[#E8E9E6]/70" : "text-[#71747A]"
                          }`}
                        >
                          {WEEKDAYS_SHORT[d.getDay()]}
                        </span>
                        <span
                          className="text-2xl font-semibold leading-none"
                          style={{ fontFamily: "var(--font-archi-display)" }}
                        >
                          {d.getDate()}
                        </span>
                        <span
                          className={`text-[10px] font-medium uppercase ${
                            isActive ? "text-[#E8E9E6]/70" : "text-[#71747A]"
                          }`}
                        >
                          {MONTHS[d.getMonth()]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-4 text-xs text-[#71747A]">
                Astuce : faites défiler horizontalement pour voir les jours suivants.
              </p>
            </motion.div>
          )}

          {/* STEP 3 */}
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
                          ? "cursor-not-allowed border-[#17181C]/10 bg-[#DCDDD9] text-[#17181C]/30 line-through"
                          : isActive
                            ? "-translate-y-0.5 border-[#17181C] bg-[#17181C] text-[#E8E9E6] shadow-md"
                            : "border-[#17181C]/12 bg-[#E8E9E6] hover:-translate-y-0.5 hover:border-[#34405A] hover:text-[#34405A]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center gap-4 text-xs text-[#71747A]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#17181C]" />
                  Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#17181C]/20" />
                  Indisponible
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && selectedDay && selectedSlot && selectedProjet && (
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
                description="Nous confirmons le rendez-vous par e-mail."
                onBack={goBack}
              />

              <div className="mt-6 rounded-2xl border border-[#17181C]/12 bg-[#DCDDD9]/60 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#34405A]">
                  Récapitulatif
                </div>
                <div
                  className="mt-1 text-lg font-semibold text-[#17181C]"
                  style={{ fontFamily: "var(--font-archi-display)" }}
                >
                  {selectedProjet.label}
                </div>
                <div className="text-sm text-[#71747A]">
                  {formatDateLong(selectedDay)} à {selectedSlot} · à l&apos;atelier
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Prénom"
                    icon={<User className="size-4" />}
                    value={form.firstName}
                    onChange={(v) => setForm({ ...form, firstName: v })}
                    placeholder="Camille"
                    autoComplete="given-name"
                  />
                  <Field
                    label="Nom"
                    value={form.lastName}
                    onChange={(v) => setForm({ ...form, lastName: v })}
                    placeholder="Hartmann"
                    autoComplete="family-name"
                  />
                </div>
                <Field
                  label="E-mail"
                  type="email"
                  icon={<Mail className="size-4" />}
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="camille.hartmann@exemple.fr"
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
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#17181C]/70">
                    Votre projet en quelques mots (facultatif)
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    rows={3}
                    placeholder="Surface, localisation, budget envisagé, échéance…"
                    className="w-full resize-none rounded-xl border border-[#17181C]/12 bg-[#E8E9E6] px-4 py-3 text-sm placeholder:text-[#17181C]/30 focus:border-[#34405A] focus:outline-none focus:ring-2 focus:ring-[#34405A]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#17181C] px-6 text-sm font-semibold uppercase tracking-wider text-[#E8E9E6] transition-all hover:-translate-y-0.5 hover:bg-[#34405A] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-[#17181C]"
                >
                  {submitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-[#E8E9E6]/30 border-t-[#E8E9E6]" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Confirmer le rendez-vous
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>

                <p className="text-xs leading-relaxed text-[#71747A]">
                  En confirmant, vous acceptez d&apos;être contacté·e par l&apos;atelier
                  pour finaliser le rendez-vous. Ce premier échange est gratuit et
                  sans engagement.
                </p>
              </form>
            </motion.div>
          )}

          {/* STEP 5 */}
          {step === 5 && selectedDay && selectedSlot && selectedProjet && (
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
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
                className="flex size-20 items-center justify-center rounded-full bg-[#17181C] text-[#E8E9E6]"
              >
                <Check className="size-10" strokeWidth={2.5} />
              </motion.div>
              <h3
                className="mt-6 text-3xl font-semibold tracking-tight text-[#17181C] sm:text-4xl"
                style={{ fontFamily: "var(--font-archi-display)" }}
              >
                Rendez-vous confirmé
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#71747A]">
                Un e-mail de confirmation vient d&apos;être envoyé à{" "}
                <strong className="text-[#17181C]">{form.email}</strong>. À très
                bientôt, {form.firstName}.
              </p>

              <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#17181C]/12 bg-[#DCDDD9]/60 p-4 text-left">
                <dl className="space-y-2 text-sm">
                  <Row label="Projet" value={selectedProjet.label} />
                  <Row label="Date" value={formatDateLong(selectedDay)} />
                  <Row label="Heure" value={selectedSlot} />
                  <Row label="Lieu" value="14 quai des Bateliers" />
                </dl>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#34405A] hover:underline"
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
        <span className="font-[family-name:var(--font-archi-mono)] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#34405A]">
          Étape {number}
        </span>
        <h3
          className="mt-1.5 text-2xl font-semibold tracking-tight text-[#17181C] sm:text-3xl"
          style={{ fontFamily: "var(--font-archi-display)" }}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-[#71747A]">{description}</p>
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#17181C]/20 px-3 py-1.5 text-xs font-semibold text-[#17181C] transition-colors hover:border-[#34405A] hover:text-[#34405A]"
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
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#17181C]/70">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#17181C]/40">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-12 w-full rounded-xl border border-[#17181C]/12 bg-[#E8E9E6] text-sm placeholder:text-[#17181C]/30 focus:border-[#34405A] focus:outline-none focus:ring-2 focus:ring-[#34405A]/20 ${
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
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#71747A]">
        {label}
      </dt>
      <dd className="font-semibold text-[#17181C]">{value}</dd>
    </div>
  );
}
