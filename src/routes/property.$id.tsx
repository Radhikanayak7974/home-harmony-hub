import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, BedDouble, Bath, Ruler, CalendarCheck, Check, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/app-shell";
import { Stars, VerifiedBadge } from "@/components/branding";
import { PropertyCard } from "@/components/cards";
import { properties, reviews, inr } from "@/lib/data";

export const Route = createFileRoute("/property/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Property unavailable — GrihaCare" }, { name: "robots", content: "noindex" }] };
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
  const similar = properties.filter((x) => x.id !== p.id && x.city === p.city).slice(0, 3);

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
                className={i === active ? "overflow-hidden rounded-lg ring-2 ring-primary" : "overflow-hidden rounded-lg"}
              >
                <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge variant="secondary">{p.type}</Badge>
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
                  <MapPin className="size-5 text-primary" aria-hidden="true" /> Map preview — {p.location}
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
              <p className="mt-1 text-xs text-muted-foreground">Deposit {inr(p.price * 2)} · No brokerage</p>
              <Separator className="my-4" />
              <div className="flex items-center gap-3">
                <img src={p.owner.avatar} alt="" className="size-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold">{p.owner.name}</p>
                  <p className="text-xs text-muted-foreground">Owner since {p.owner.since}</p>
                </div>
                {p.owner.verified ? <VerifiedBadge /> : null}
              </div>
              <div className="mt-5 space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link to="/booking" search={{ item: p.title }}>
                    Schedule a visit
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
    </AppShell>
  );
}
