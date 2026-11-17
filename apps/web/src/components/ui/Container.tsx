import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** Standard page width and horizontal gutter. */
export default function Container({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("container-page", className)} {...rest} />;
}