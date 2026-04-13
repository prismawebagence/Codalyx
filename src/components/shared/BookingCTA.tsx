"use client";

import { type ReactNode } from "react";
import { Calendar } from "lucide-react";
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            R&eacute;servez votre appel d&eacute;couverte
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            20 minutes pour discuter de votre projet &mdash; gratuit et sans
            engagement.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#FF6B2C]">
            <Calendar className="size-5 text-white" />
          </div>
          <p className="text-sm text-[#71717A]">
            Choisissez un cr&eacute;neau qui vous convient
          </p>
          <a
            href="https://calendly.com/votre-lien"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#FF6B2C] px-6 text-sm font-medium text-white transition-colors hover:bg-[#E55A1F]"
          >
            Ouvrir Calendly
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
