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
  name: z.string().min(2, "Le nom doit contenir au moins 2 caract\u00e8res."),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Num\u00e9ro de t\u00e9l\u00e9phone invalide.")
    .or(z.literal(""))
    .optional(),
  projectType: z.string().min(1, "Veuillez s\u00e9lectionner un type de projet."),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caract\u00e8res."),
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
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-12 text-center">
        <CheckCircle2 className="size-12 text-[#FF6B2C]" />
        <h3 className="font-heading text-xl font-semibold text-[#0A0A0A]">
          Message envoy&eacute; !
        </h3>
        <p className="text-[#71717A]">
          Nous vous r&eacute;pondons sous 24h. &Agrave; tr&egrave;s vite !
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-[#E4E4E7] bg-white p-8"
    >
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          Une erreur est survenue. Veuillez r&eacute;essayer.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            {...register("name")}
            className={errors.name ? "border-red-400" : ""}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@exemple.fr"
            {...register("email")}
            className={errors.email ? "border-red-400" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">T&eacute;l&eacute;phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            {...register("phone")}
            className={errors.phone ? "border-red-400" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectType">Type de projet *</Label>
          <Select onValueChange={(v) => setValue("projectType", v)}>
            <SelectTrigger className={errors.projectType ? "border-red-400" : ""}>
              <SelectValue placeholder="Choisir une formule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essentiel">Essentiel (690 &euro;)</SelectItem>
              <SelectItem value="pro">Pro (1 290 &euro;)</SelectItem>
              <SelectItem value="premium">Premium (2 290 &euro;)</SelectItem>
              <SelectItem value="autre">Autre / Je ne sais pas encore</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType && (
            <p className="text-xs text-red-500">{errors.projectType.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="D&eacute;crivez votre projet, votre activit&eacute;, vos objectifs..."
          {...register("message")}
          className={errors.message ? "border-red-400" : ""}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 w-full bg-[#FF6B2C] text-white hover:bg-[#E55A1F] font-semibold"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 size-4" />
            Envoyer ma demande
          </>
        )}
      </Button>
    </form>
  );
}
