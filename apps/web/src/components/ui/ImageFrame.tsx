import { cn } from "../../lib/cn";

type Aspect = "portrait" | "landscape" | "square" | "wide";

// The aspect ratio reserves space before the image loads, so nothing shifts.
const aspectClasses: Record<Aspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

interface ImageFrameProps {
  /** Image URL. When omitted, a labelled empty frame is shown. */
  src?: string;
  /** Required description of the photograph for screen readers. */
  alt: string;
  aspect?: Aspect;
  caption?: string;
  /** Above-the-fold images should load eagerly. */
  priority?: boolean;
  className?: string;
}

/** Presents one photograph at a fixed aspect ratio. */
export default function ImageFrame({
  src,
  alt,
  aspect = "landscape",
  caption,
  priority = false,
  className,
}: ImageFrameProps) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "overflow-hidden bg-cream-deep",
          aspectClasses[aspect],
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="type-eyebrow flex h-full w-full items-center justify-center text-muted">
            Photograph placeholder
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}