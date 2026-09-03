import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Users, CalendarCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/app-shell";
import { Stars } from "@/components/branding";
import { StayCard } from "@/components/cards";
import { stays, inr } from "@/lib/data";

export const Route = createFileRoute("/stay/$id")({
  loader: ({ params }) => {
    const stay = stays.find((s) => s.id === params.id);
    if (!stay) throw notFound();
    return { stay };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Stay unavailable — GrihaCare" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.stay;
    const title = `${s.title} — ${inr(s.price)}/night | GrihaCare Stays`;
    return {
      meta: [
        { title },
        { name: "description", content: s.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: s.description.slice(0, 155) },
        { property: "og:image", content: s.image },
        { name: "twitter:image", content: s.image },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">This stay is no longer listed</h1>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Browse other stays</Link>
        </Button>
      </div>
    </AppShell>
  ),
  component: StayDetail,
});

function StayDetail() {
  const { stay: s } = Route.useLoaderData();
  const more = stays.filter((x) => x.id !== s.id).slice(0, 3);

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to search
        </Link>
        <img
          src={s.image}
          alt={s.title}
          className="mt-4 aspect-[16/7] w-full rounded-xl object-cover shadow-card"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <Badge variant="secondary">{s.kind}</Badge>
            <h1 className="mt-2 text-3xl font-extrabold">{s.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" /> {s.location}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Stars rating={s.rating} />
              <span className="text-sm text-muted-foreground">{s.reviews} reviews</span>
            </div>

            <p className="mt-6 text-muted-foreground">{s.description}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {["Free cancellation up to 48 hrs", "Instant confirmation", "Verified host", "Wi-Fi and housekeeping"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-success" aria-hidden="true" /> {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="text-3xl font-extrabold text-primary">
                {inr(s.price)}
                <span className="text-sm font-medium text-muted-foreground">/night</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4" aria-hidden="true" /> Sleeps up to {s.guests}
              </p>
              <p
                className={
                  s.available
                    ? "mt-1 flex items-center gap-2 text-sm font-medium text-success"
                    : "mt-1 flex items-center gap-2 text-sm font-medium text-destructive"
                }
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                {s.available ? "Available for your dates" : "Sold out for now"}
              </p>
              <Separator className="my-4" />
              <Button asChild className="w-full" size="lg" disabled={!s.available}>
                <Link to="/booking" search={{ item: s.title }}>
                  {s.available ? "Book this stay" : "Join waitlist"}
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">More stays you may like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {more.map((x) => (
              <StayCard key={x.id} s={x} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
