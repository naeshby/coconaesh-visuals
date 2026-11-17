import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "text";
/** "dark" is for use on wine backgrounds. */
export type ButtonTone = "light" | "dark";

interface StyleProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
}

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const styles: Record<ButtonTone, Record<ButtonVariant, string>> = {
  light: {
    primary: "bg-brand-wine px-6 py-3.5 text-cream hover:bg-brand-plum",
    secondary:
      "border border-brand-wine px-6 py-3.5 text-brand-wine hover:bg-brand-wine hover:text-cream",
    text: "border-b border-current pb-1 text-brand-wine hover:text-brand-plum",
  },
  dark: {
    primary: "bg-cream px-6 py-3.5 text-brand-wine hover:bg-brand-blush",
    secondary:
      "border border-cream px-6 py-3.5 text-cream hover:bg-cream hover:text-brand-wine",
    text: "border-b border-current pb-1 text-cream hover:text-brand-blush",
  },
};

function buttonClasses(
  variant: ButtonVariant,
  tone: ButtonTone,
  className?: string,
) {
  return cn(base, styles[tone][variant], className);
}

export function Button({
  variant = "primary",
  tone = "light",
  className,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, tone, className)}
      {...rest}
    />
  );
}

/** A React Router link styled as a button or text link. */
export function ButtonLink({
  variant = "primary",
  tone = "light",
  className,
  ...rest
}: LinkProps & StyleProps) {
  return <Link className={buttonClasses(variant, tone, className)} {...rest} />;
}