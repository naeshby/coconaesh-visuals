import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

type SectionTone = "default" | "blush" | "dark";

const toneClasses: Record<SectionTone, string> = {
  default: "",
  blush: "bg-brand-blush/40",
  dark: "surface-dark bg-brand-wine text-cream",
};

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: SectionTone;
}

/** A full-width page section with consistent vertical rhythm. */
export default function Section({
  tone = "default",
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("section-y", toneClasses[tone], className)}
      {...rest}
    />
  );
}