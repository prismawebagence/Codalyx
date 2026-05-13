"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(100),
  email: z.string().email("Adresse e-mail invalide.").max(200),
  phone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide.")
    .or(z.literal(""))
    .optional(),
  projectType: z.string().min(1, "Veuillez sélectionner un type de projet."),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères."),
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-12 text-center"
      >
        <CheckCircle2 className="size-12 text-[#FF6B2C]" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-[#0A0A0A]">
          Message envoyé !
        </h3>
        <p className="text-[#52525B]">
          Nous vous répondons sous 24h. À très vite !
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl border border-[#E4E4E7] bg-white p-8"
    >
      {status === "error" && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      {/* Honeypot — invisible to humans, attractive to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Site web (ne pas remplir)</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
            className={errors.name ? "border-red-400" : ""}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@exemple.fr"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={errors.email ? "border-red-400" : ""}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
            className={errors.phone ? "border-red-400" : ""}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectType">Type de projet *</Label>
          <Select onValueChange={(v: string | null) => { if (v) setValue("projectType", v, { shouldValidate: true }); }}>
            <SelectTrigger
              id="projectType"
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? "projectType-error" : undefined}
              className={errors.projectType ? "border-red-400" : ""}
            >
              <SelectValue placeholder="Choisir une formule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essentiel">Essentiel (690 €)</SelectItem>
              <SelectItem value="pro">Pro (1 290 €)</SelectItem>
              <SelectItem value="premium">Premium (2 290 €)</SelectItem>
              <SelectItem value="autre">Autre / Je ne sais pas encore</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType && (
            <p id="projectType-error" className="text-xs text-red-600">
              {errors.projectType.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Décrivez votre projet, votre activité, vos objectifs..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className={errors.message ? "border-red-400" : ""}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 w-full bg-[#FF6B2C] text-[#0A0A0A] hover:bg-[#E55A1F] font-semibold"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 size-4" aria-hidden="true" />
            Envoyer ma demande
          </>
        )}
      </Button>
    </form>
  );
}
