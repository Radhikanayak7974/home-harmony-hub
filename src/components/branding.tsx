import { Link } from "@tanstack/react-router";
import { Home, Star, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)} aria-label="GrihaCare home">
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg",
          invert ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <Home className="size-5" aria-hidden="true" />
      </span>
      <span className={cn("text-lg font-extrabold tracking-tight", invert && "text-primary-foreground")}>
        Griha<span className="text-accent">Care</span>
      </span>
    </Link>
  );
}

export function Stars({ rating, size = 14, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-label={`Rated ${rating} out of 5`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={cn(
              "shrink-0",
              rating >= i - 0.25
                ? "fill-accent text-accent"
                : rating >= i - 0.75
                  ? "fill-accent/50 text-accent"
                  : "text-muted-foreground/40",
            )}
          />
        ))}
      </span>
      <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
    </span>
  );
}

export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
