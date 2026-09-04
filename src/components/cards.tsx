import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Users,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Stars, VerifiedBadge } from "@/components/branding";
import { useStore } from "@/lib/app-store";
import { inr, type Property, type Stay, type Pro } from "@/lib/data";

function SaveButton({ id, label }: { id: string; label: string }) {
  const { isSaved, toggleSaved } = useStore();
  const saved = isSaved(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleSaved(id);
        toast.success(saved ? `Removed ${label} from wishlist` : `Saved ${label} to wishlist`);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label} to wishlist`}
      className="grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-card backdrop-blur transition-colors hover:bg-card"
    >
      <Heart
        className={saved ? "size-4 fill-destructive text-destructive" : "size-4"}
        aria-hidden="true"
      />
    </button>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + p.images.length) % p.images.length);

  return (
    <article className="card-hover group overflow-hidden rounded-lg border bg-card shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.images[i]}
          alt={`${p.title} — photo ${i + 1} of ${p.images.length}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-2 top-2 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <Badge className="bg-card text-foreground shadow-card hover:bg-card">{p.type}</Badge>
            <Badge className="bg-slate-900/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold backdrop-blur-md">
              <ShieldCheck className="size-3 mr-1 text-emerald-400" /> Trust {p.trustScore || 95}/100
            </Badge>
          </div>
          <SaveButton id={p.id} label={p.title} />
        </div>
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="grid size-8 place-items-center rounded-full bg-card/90 shadow-card"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium">
            {i + 1}/{p.images.length}
          </span>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="grid size-8 place-items-center rounded-full bg-card/90 shadow-card"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug">{p.title}</h3>
          <Stars rating={p.rating} />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {p.location}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <ul className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <li className="flex items-center gap-1">
            <BedDouble className="size-4" aria-hidden="true" /> {p.beds} beds
          </li>
          <li className="flex items-center gap-1">
            <Bath className="size-4" aria-hidden="true" /> {p.baths} baths
          </li>
          <li className="flex items-center gap-1">
            <Ruler className="size-4" aria-hidden="true" /> {p.area} sq ft
          </li>
        </ul>
        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <p className="text-lg font-extrabold text-primary">
              {inr(p.price)}
              <span className="text-xs font-medium text-muted-foreground">/month</span>
            </p>
            {p.rentFairness && (
              <span className="text-[10px] font-bold text-teal-300 flex items-center gap-1 mt-0.5">
                <Sparkles className="size-2.5 text-teal-400" /> AI {p.rentFairness.status} Rent
              </span>
            )}
          </div>
          <Button asChild size="sm">
            <Link to="/property/$id" params={{ id: p.id }}>
              View details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function StayCard({ s }: { s: Stay }) {
  return (
    <article className="card-hover group overflow-hidden rounded-lg border bg-card shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-2 top-2 flex items-start justify-between">
          <Badge className="bg-card text-foreground hover:bg-card">{s.kind}</Badge>
          <SaveButton id={s.id} label={s.title} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug">{s.title}</h3>
          <Stars rating={s.rating} />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {s.location}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-4" aria-hidden="true" /> up to {s.guests} guests
          </span>
          <span
            className={
              s.available
                ? "flex items-center gap-1 text-success"
                : "flex items-center gap-1 text-destructive"
            }
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            {s.available ? "Available" : "Sold out"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t pt-3">
          <p className="text-lg font-extrabold text-primary">
            {inr(s.price)}
            <span className="text-xs font-medium text-muted-foreground">/month</span>
          </p>
          <Button
            asChild
            size="sm"
            variant={s.available ? "default" : "secondary"}
            disabled={!s.available}
          >
            <Link to="/stay/$id" params={{ id: s.id }}>
              {s.available ? "Book now" : "View"}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProCard({ w }: { w: Pro }) {
  return (
    <article className="card-hover rounded-lg border bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <img
          src={w.avatar}
          alt={w.name}
          loading="lazy"
          className="size-14 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold">{w.name}</h3>
            {w.verified ? <VerifiedBadge /> : null}
          </div>
          <p className="text-sm text-secondary">{w.service}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <Stars rating={w.rating} size={12} />
            <span>{w.reviews} reviews</span>
            <span>{w.experience} yrs</span>
          </div>
        </div>
        <SaveButton id={w.id} label={w.name} />
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{w.bio}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" aria-hidden="true" />
        {w.area}
      </p>
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-sm font-bold text-primary">
          {inr(w.priceFrom)} – {inr(w.priceTo)}
        </p>
        <Button asChild size="sm" variant="secondary">
          <Link to="/pro/$id" params={{ id: w.id }}>
            View profile
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card p-4 shadow-card">
      <Skeleton className="mb-4 aspect-[4/3] w-full rounded-md" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="col-span-full rounded-lg border border-dashed bg-surface p-10 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
