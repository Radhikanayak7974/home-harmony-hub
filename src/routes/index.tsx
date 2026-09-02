import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  BedDouble,
  Wrench,
  Sparkles,
  ShieldCheck,
  Layers,
  UserPlus,
  Search,
  Cpu,
  MessageSquare,
  CreditCard,
  Star,
  ArrowRight,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo, SectionHeading, Stars, VerifiedBadge } from "@/components/branding";
import { properties, pros, inr } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrihaCare — One App. Every Home Need" },
      {
        name: "description",
        content:
          "Find rentals, book temporary stays and hire verified electricians, plumbers and cleaners — all AI-matched in one trusted app.",
      },
      { property: "og:title", content: "GrihaCare — One App. Every Home Need" },
      {
        property: "og:description",
        content: "Homes, stays and verified home services in one AI-powered platform.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Home,
    title: "Find a Home",
    body: "Verified rental listings with real photos, honest rents and owners you can message directly — no broker games.",
    tint: "bg-primary/10 text-primary",
  },
  {
    icon: BedDouble,
    title: "Book a Stay",
    body: "Hotels, homestays and serviced apartments for a night or a season, with instant confirmation.",
    tint: "bg-secondary/15 text-secondary",
  },
  {
    icon: Wrench,
    title: "Hire Services",
    body: "Background-checked electricians, plumbers, cleaners and designers with transparent price ranges.",
    tint: "bg-accent/15 text-accent",
  },
];

const journey = [
  { icon: UserPlus, title: "Sign Up", body: "Tell us who you are in 60 seconds." },
  { icon: Search, title: "Search", body: "Filter by location, budget and needs." },
  { icon: Cpu, title: "AI Match", body: "We rank what actually fits you." },
  { icon: MessageSquare, title: "Connect", body: "Chat with owners and pros directly." },
  { icon: CreditCard, title: "Book & Pay", body: "Secure payments with receipts." },
  { icon: Star, title: "Review", body: "Keep the ecosystem trustworthy." },
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI Personalisation",
    body: "Every recommendation comes with a plain-language reason: budget fit, commute, past bookings and saved filters.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Verification",
    body: "ID checks, background verification for professionals and review-gated badges you can actually rely on.",
  },
  {
    icon: Layers,
    title: "One Ecosystem",
    body: "Rent, stay and repair in one place — one profile, one wallet, one message inbox, one review history.",
  },
];

const audiences = [
  {
    title: "Renters",
    body: "Skip five apps and twenty broker calls. Shortlist, visit and sign — all tracked in one timeline.",
    points: ["AI-ranked listings", "Direct owner chat", "Zero brokerage options"],
  },
  {
    title: "Property Owners",
    body: "List once and reach verified seekers, with built-in scheduling, agreements and payouts.",
    points: ["Verified enquiries", "Visit scheduling", "On-time payouts"],
  },
  {
    title: "Service Professionals",
    body: "Build a public profile with portfolio and reviews, and get matched to jobs in your service area.",
    points: ["Verified badge", "Job matching", "Ratings that travel with you"],
  },
];

function Landing() {
  const featured = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#journey" className="text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#benefits" className="text-muted-foreground transition-colors hover:text-foreground">
              Why GrihaCare
            </a>
            <a href="#audiences" className="text-muted-foreground transition-colors hover:text-foreground">
              For you
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="gradient-hero relative overflow-hidden text-primary-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Badge className="border-0 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                <Sparkles className="mr-1 size-3.5" aria-hidden="true" /> AI-powered home matching
              </Badge>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
                One App.
                <br />
                Every Home Need.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
                Rent a home, book a stay, hire a verified professional. GrihaCare learns what you need and puts the
                right match in front of you — with the reasoning shown.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/signup">
                    Create free account <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/dashboard">Explore the app</Link>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
                {[
                  ["12,400+", "Verified listings"],
                  ["3,800+", "Service pros"],
                  ["4.8/5", "Average rating"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-2xl font-extrabold">{v}</dt>
                    <dd className="text-xs text-primary-foreground/75">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative animate-in fade-in zoom-in-95 duration-700">
              <img
                src={properties[1].images[0]}
                alt="Modern apartment living room available on GrihaCare"
                className="aspect-[4/3] w-full rounded-xl object-cover shadow-lift"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-lg border bg-card p-4 text-card-foreground shadow-lift sm:block">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-accent" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">AI match 96%</p>
                </div>
                <p className="mt-2 text-sm font-semibold">{properties[1].title}</p>
                <p className="text-xs text-muted-foreground">
                  Fits your ₹70–80K budget and 3BHK filter, 2 km from work.
                </p>
              </div>
              <div className="absolute -right-3 top-6 hidden rounded-lg border bg-card p-3 text-card-foreground shadow-lift sm:block">
                <div className="flex items-center gap-2">
                  <img src={pros[0].avatar} alt="" className="size-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{pros[0].name}</p>
                    <VerifiedBadge />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="border-b bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              center
              eyebrow="The problem"
              title="Home needs are scattered across a dozen apps"
              subtitle="One app for listings, another for short stays, a WhatsApp group for a plumber — and no way to know who to trust."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Fragmented search", "Rentals here, stays there, services in a neighbour's contact list."],
                ["No real verification", "Fake listings, unverified workers and reviews you can't trace."],
                ["Nothing learns from you", "Every search starts from zero, every time."],
              ].map(([t, b]) => (
                <div key={t} className="rounded-lg border bg-card p-6 shadow-card">
                  <CircleAlert className="size-6 text-destructive" aria-hidden="true" />
                  <h3 className="mt-3 font-bold">{t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="features" className="scroll-mt-20 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              center
              eyebrow="The solution"
              title="Three needs. One trusted platform."
              subtitle="Everything a home needs, from the day you search for it to the day the geyser breaks."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="card-hover rounded-lg border bg-card p-6 shadow-card">
                  <span className={`grid size-12 place-items-center rounded-lg ${f.tint}`}>
                    <f.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="scroll-mt-20 bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading center eyebrow="How it works" title="From sign up to reviewed in six steps" />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {journey.map((s, i) => (
                <li key={s.title} className="relative rounded-lg border bg-card p-5 shadow-card">
                  <span className="absolute right-3 top-3 text-xs font-bold text-muted-foreground/50">
                    0{i + 1}
                  </span>
                  <s.icon className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-bold">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FEATURED */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Trending now" title="Homes people are moving into this week" />
              <Button asChild variant="outline">
                <Link to="/dashboard">Browse all homes</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  to="/property/$id"
                  params={{ id: p.id }}
                  className="card-hover group overflow-hidden rounded-lg border bg-card shadow-card"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{p.type}</Badge>
                      <Stars rating={p.rating} />
                    </div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.location}</p>
                    <p className="font-extrabold text-primary">
                      {inr(p.price)}
                      <span className="text-xs font-medium text-muted-foreground">/month</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="scroll-mt-20 bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading center eyebrow="Why GrihaCare" title="Built on matching, trust and one ecosystem" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-lg border bg-card p-6 shadow-card">
                  <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCES */}
        <section id="audiences" className="scroll-mt-20 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading center eyebrow="Who it's for" title="One platform, three kinds of people" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {audiences.map((a) => (
                <div key={a.title} className="card-hover rounded-lg border bg-card p-6 shadow-card">
                  <h3 className="text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-success" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="secondary" className="mt-5 w-full">
                    <Link to="/signup">Join as {a.title.replace(/s$/, "")}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="gradient-hero py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Your next home is one search away</h2>
            <p className="mt-3 text-primary-foreground/85">
              Join 120,000 people who stopped juggling apps and started using GrihaCare.
            </p>
            <Button asChild size="lg" className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/signup">Sign up free</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Logo />
          <p className="text-sm text-muted-foreground">© 2026 GrihaCare. One App. Every Home Need.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              Sign up
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
