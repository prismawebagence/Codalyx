import { cn } from "@/lib/utils";

interface SectionTitleProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  tag,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <span className="inline-block font-sans text-sm font-medium uppercase tracking-widest text-[#FF6B2C]">
        {tag}
      </span>
      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[#71717A] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
