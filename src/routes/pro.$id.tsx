import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, MessageSquare, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/app-shell";
import { Stars, VerifiedBadge } from "@/components/branding";
import { ProCard } from "@/components/cards";
import { pros, reviews, inr } from "@/lib/data";

export const Route = createFileRoute("/pro/$id")({
  loader: ({ params }) => {
    const pro = pros.find((w) => w.id === params.id);
    if (!pro) throw notFound();
    return { pro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Professional unavailable — GrihaCare" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const w = loaderData.pro;
    const title = `${w.name} — ${w.service} in ${w.area} | GrihaCare`;
    return {
      meta: [
        { title },
        { name: "description", content: w.bio.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: w.bio.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">This professional is not available</h1>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Find another pro</Link>
        </Button>
      </div>
    </AppShell>
  ),
  component: ProDetail,
});

function ProDetail() {
  const { pro: w } = Route.useLoaderData();
  const similar = pros.filter((x) => x.id !== w.id && x.category === w.category).slice(0, 3);

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to search
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-5 shadow-card">
              <img src={w.avatar} alt={w.name} className="size-20 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold">{w.name}</h1>
                  {w.verified ? <VerifiedBadge /> : null}
                </div>
                <p className="text-secondary">{w.service}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Stars rating={w.rating} />
                  <span>{w.reviews} reviews</span>
                  <span className="flex items-center gap-1">
                    <BriefcaseBusiness className="size-4" aria-hidden="true" /> {w.experience} yrs
                    experience
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" aria-hidden="true" /> {w.area}
                  </span>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-3 text-muted-foreground">{w.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {w.skills.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </section>

            {w.portfolio.length ? (
              <section className="mt-8">
                <h2 className="text-xl font-bold">Recent work</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {w.portfolio.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Work by ${w.name}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-8">
              <h2 className="text-xl font-bold">Customer reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews.slice(1, 4).map((r) => (
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
                    <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <p className="text-sm text-muted-foreground">Typical price range</p>
              <p className="text-2xl font-extrabold text-primary">
                {inr(w.priceFrom)} – {inr(w.priceTo)}
              </p>
              <Separator className="my-4" />
              <Button asChild className="w-full" size="lg">
                <Link to="/booking" search={{ item: `${w.service} — ${w.name}` }}>
                  Book this professional
                </Link>
              </Button>
              <Button asChild variant="secondary" className="mt-2 w-full">
                <Link to="/messages">
                  <MessageSquare className="mr-2 size-4" /> Send a message
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        {similar.length ? (
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold">
              Other {w.category.toLowerCase()} professionals
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {similar.map((x) => (
                <ProCard key={x.id} w={x} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
