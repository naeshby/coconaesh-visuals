import { Link } from "react-router-dom";
import { siteName } from "../../config/site";
import { cn } from "../../lib/cn";

interface WordmarkProps {
  tone?: "light" | "dark";
  className?: string;
}

/**
 * TEMPORARY text-based identity. Replace with the supplied logo once the
 * owner provides it.
 */
export default function Wordmark({ tone = "light", className }: WordmarkProps) {
  return (
    <Link
      to="/"
      aria-label={`${siteName}, home`}
      className={cn(
        "font-display text-xl tracking-tight",
        tone === "dark" ? "text-cream" : "text-brand-wine",
        className,
      )}
    >
      CocoNaesh <span className="italic">Visuals</span>
    </Link>
  );
}