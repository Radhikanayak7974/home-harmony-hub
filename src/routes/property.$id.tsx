import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  CalendarCheck,
  Check,
  MessageSquare,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Lock,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/app-shell";
import { Stars, VerifiedBadge } from "@/components/branding";
import { PropertyCard } from "@/components/cards";
import { properties, reviews, inr } from "@/lib/data";
import { MoveInPassportModal } from "@/components/passport-modal";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Property unavailable — GrihaCare" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.property;
    const title = `${p.title} — ${inr(p.price)}/month | GrihaCare`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description.slice(0, 155) },
        { property: "og:image", content: p.images[0] ?? "" },
        { name: "twitter:image", content: p.images[0] ?? "" },
      ],
    };
  },
  notFoundComponent: PropertyNotFound,
  component: PropertyDetail,
});

function PropertyNotFound() {
  return (
    <AppShell>
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">This listing is no longer available</h1>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Browse other homes</Link>
        </Button>
      </div>
    </AppShell>
  );
}

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [passportOpen, setPassportOpen] = useState(false);
  const similar = properties.filter((x) => x.id !== p.id && x.city === p.city).slice(0, 3);

  // Trust score & fairness defaults
  const trustScore = p.trustScore ?? 94;
  const trustBreakdown = p.trustBreakdown ?? {
    ownerVerified: true,
    kycCompleted: true,
    titleVerified: true,
    listingCompleteness: 95,
    safetyScore: 94,
  };
  const fairness = p.rentFairness ?? {
    status: "Fair" as const,
    estimatedRange: `${inr(Math.round(p.price * 0.95))} – ${inr(Math.round(p.price * 1.08))}/mo`,
    explanation: `Listed rent of ${inr(p.price)} matches estimated market benchmark for ${p.type} in ${p.location}.`,
    percentile: 94,
  };

  const getFairnessBadgeClass = (status: string) => {
    switch (status) {
      case "Fair":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Slightly High":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    }
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to search
        </Link>

        <div className="mt-4 grid gap-3 lg:grid-cols-[2fr_1fr]">
          <img
            src={p.images[active]}
            alt={`${p.title} — main photo`}
            className="aspect-[16/10] w-full rounded-xl object-cover shadow-card"
          />
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
            {p.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={
                  i === active
                    ? "overflow-hidden rounded-lg ring-2 ring-primary"
                    : "overflow-hidden rounded-lg"
                }
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{p.type}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="size-3.5" /> Trust Score {trustScore}/100
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md border ${getFairnessBadgeClass(fairness.status)}`}>
                    <Sparkles className="size-3" /> AI {fairness.status} Rent
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-extrabold">{p.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4" aria-hidden="true" /> {p.location}
                </p>
              </div>
              <div className="text-right">
                <Stars rating={p.rating} />
                <p className="text-xs text-muted-foreground">{p.reviews} reviews</p>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-4 rounded-lg border bg-card p-5 sm:grid-cols-4">
              {[
                [BedDouble, `${p.beds} beds`],
                [Bath, `${p.baths} baths`],
                [Ruler, `${p.area} sq ft`],
                [CalendarCheck, p.available],
              ].map(([Icon, label]) => {
                const I = Icon as typeof BedDouble;
                return (
                  <li key={String(label)} className="flex items-center gap-2 text-sm font-medium">
                    <I className="size-5 text-primary" aria-hidden="true" />
                    {label as string}
                  </li>
                );
              })}
            </ul>

            {/* Feature 1: GrihaCare Trust Score Detailed Breakdown */}
            <section className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">GrihaCare Trust Score</h2>
                    <p className="text-xs text-muted-foreground">Verified multi-point property audit score</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-emerald-400">{trustScore}</span>
                  <span className="text-sm text-zinc-400">/100</span>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Owner Identity & Land Deed
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{trustBreakdown.ownerVerified ? "100%" : "90%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: trustBreakdown.ownerVerified ? "100%" : "90%" }} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Physical Audit & Safety
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{trustBreakdown.safetyScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${trustBreakdown.safetyScore}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Document Title Deed
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{trustBreakdown.titleVerified ? "100%" : "90%"}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: trustBreakdown.titleVerified ? "100%" : "90%" }} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Listing Completeness
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{trustBreakdown.listingCompleteness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${trustBreakdown.listingCompleteness}%` }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Feature 2: AI Rent Fairness Score Widget */}
            <section className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <TrendingUp className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">AI Rent Fairness Score</h2>
                    <p className="text-xs text-muted-foreground">Market-indexed rental price estimation</p>
                  </div>
                </div>
                <Badge className={getFairnessBadgeClass(fairness.status)}>
                  ✨ {fairness.status} Rent
                </Badge>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-teal-950/20 border border-teal-500/20 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-zinc-300 font-medium">Estimated Local Market Range:</span>
                  <span className="font-mono font-bold text-teal-300">
                    {fairness.estimatedRange}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {fairness.explanation}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Info className="size-3.5 text-teal-400" />
                  <span>Calculated using recent agreements, location demand, and square footage in {p.city}. Top {fairness.percentile}% value.</span>
                </div>
              </div>
            </section>

            {/* Feature 3: Digital Move-In Passport Teaser & CTA */}
            <section className="mt-6 rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
                    <FileCheck2 className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Digital Move-In Passport</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Record meter readings, initial damages & inventory before move-in. Auto-saved to Rental Vault.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-300">
                      <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700">⚡ Electricity & Water Meters</span>
                      <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700">📸 Photo Damage Logs</span>
                      <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700">🔐 SHA-256 Vault Locked</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <p className="text-xs text-zinc-400">Ready to move in? Create your tamper-proof passport now.</p>
                <Button
                  onClick={() => setPassportOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  <FileCheck2 className="mr-1.5 size-4" /> Create Move-In Passport
                </Button>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">About this home</h2>
              <p className="mt-3 text-muted-foreground">{p.description}</p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">Amenities</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-success" aria-hidden="true" /> {a}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">Location</h2>
              <div className="mt-3 grid h-56 place-items-center rounded-lg border bg-surface text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" aria-hidden="true" /> Map preview —{" "}
                  {p.location}
                </span>
              </div>
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent reviews</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/reviews">See all</Link>
                </Button>
              </div>
              <div className="mt-4 space-y-4">
                {reviews.slice(0, 3).map((r) => (
                  <article key={r.id} className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt="" className="size-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-bold">{r.author}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                      <span className="ml-auto">
                        <Stars rating={r.rating} />
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="text-3xl font-extrabold text-primary">
                {inr(p.price)}
                <span className="text-sm font-medium text-muted-foreground">/month</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Deposit {inr(p.price * 2)} · No brokerage
              </p>

              {/* Badges in sidebar */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="size-3" /> Trust {trustScore}/100
                </span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border ${getFairnessBadgeClass(fairness.status)}`}>
                  <Sparkles className="size-3" /> AI {fairness.status}
                </span>
              </div>

              <Separator className="my-4" />
              <div className="flex items-center gap-3">
                <img src={p.owner.avatar} alt="" className="size-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold">{p.owner.name}</p>
                  <p className="text-xs text-muted-foreground">Owner since {p.owner.since}</p>
                </div>
                {p.owner.verified ? <VerifiedBadge /> : null}
              </div>

              {/* 11-Month Permanent Rental Box */}
              <div className="mt-5 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-[10px] uppercase font-bold">
                    Permanent Rental Option
                  </Badge>
                  <span className="text-xs font-mono font-bold text-teal-400">11 Months</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Rent permanently with a legally compliant 11-month digital deed and storage in Rental Vault.
                </p>
                <div className="text-[11px] text-zinc-400 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Rent:</span>
                    <span className="text-white font-bold">{inr(p.price)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposit:</span>
                    <span className="text-white font-bold">{inr(p.price * 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lock-in:</span>
                    <span className="text-amber-300 font-bold">3 Months</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs">
                  <Link to="/agreement/new" search={{ propertyId: p.id }}>
                    Rent Permanently (11-Month Lease)
                  </Link>
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <Button
                  onClick={() => setPassportOpen(true)}
                  variant="outline"
                  className="w-full border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                >
                  <FileCheck2 className="mr-2 size-4" /> Move-In Passport
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/booking" search={{ item: p.title }}>
                    Schedule Visit / Temporary Stay
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/messages">
                    <MessageSquare className="mr-2 size-4" /> Message owner
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.success("Listing link copied to clipboard")}
                >
                  <Share2 className="mr-2 size-4" /> Share
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {similar.length ? (
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold">Similar homes in {p.city}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {similar.map((x) => (
                <PropertyCard key={x.id} p={x} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <MoveInPassportModal
        open={passportOpen}
        onOpenChange={setPassportOpen}
        propertyId={p.id}
        propertyTitle={p.title}
        onPassportCreated={() => {
          toast.success("Move-In Passport saved to Rental Vault!");
        }}
      />
    </AppShell>
  );
}

