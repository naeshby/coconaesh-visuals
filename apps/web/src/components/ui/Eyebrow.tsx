import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

interface EyebrowProps extends ComponentPropsWithoutRef<"p"> {
  tone?: "light" | "dark";
}

/** Small uppercase label that sits above a heading. */
export default function Eyebrow({
  tone = "light",
  className,
  ...rest
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "type-eyebrow",
        tone === "dark" ? "text-brand-blush" : "text-brand-plum",
        className,
      )}
      {...rest}
    />
  );
}