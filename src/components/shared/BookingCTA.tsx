"use client";

import { type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BookingCTAProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

// Calendly configuration — colors match the Codalyx brand palette.
const CALENDLY_URL = "https://calendly.com/sank4bob/30min";
const CALENDLY_PARAMS = new URLSearchParams({
  hide_gdpr_banner: "1",
  primary_color: "FF6B2C",
  text_color: "0A0A0A",
  background_color: "ffffff",
}).toString();
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?embed_domain=codalyx.fr&embed_type=Inline&${CALENDLY_PARAMS}`;

export default function BookingCTA({
  children,
  className,
}: BookingCTAProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors",
              className
            )}
          />
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[95vw] overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-heading text-2xl">
            R&eacute;servez votre appel d&eacute;couverte
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            20 minutes pour discuter de votre projet &mdash; gratuit et sans
            engagement.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[70vh] w-full">
          <iframe
            src={CALENDLY_EMBED_URL}
            title="R&eacute;servation Calendly"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
