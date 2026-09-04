import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Sparkles, Home, BedDouble, Wrench, CreditCard, ArrowRight, ShieldCheck, History, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/app-shell";
import { PropertyCard, StayCard, ProCard, EmptyState } from "@/components/cards";
import { SectionHeading } from "@/components/branding";
import { properties, stays, pros, aiRecs, serviceCategories, inr } from "@/lib/data";
import { useStore } from "@/lib/app-store";
import { RentPaymentModal, RentHistoryModal } from "@/components/unique-features";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Search homes, stays and pros | GrihaCare" },
      {
        name: "description",
        content:
          "Search AI-matched rentals, temporary stays and verified home-service professionals in one dashboard.",
      },
      { property: "og:title", content: "Dashboard — GrihaCare" },
      {
        property: "og:description",
        content: "AI-matched homes, stays and verified professionals.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useStore();
  const [q, setQ] = useState("");
  const [maxRent, setMaxRent] = useState(80000);
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("match");
  const [maxNight, setMaxNight] = useState(8000);
  const [category, setCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(true);
  const [payRentModalOpen, setPayRentModalOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    const list = properties.filter(
      (p) =>
        p.price <= maxRent &&
        (type === "all" || p.type === type) &&
        (q === "" ||
          `${p.title} ${p.location} ${p.city} ${p.type}`.toLowerCase().includes(q.toLowerCase())),
    );
    return [...list].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : b.rating - a.rating,
    );
  }, [q, maxRent, type, sort]);

  const filteredStays = useMemo(
    () =>
      stays.filter(
        (s) =>
          s.price <= maxNight &&
          (q === "" ||
            `${s.title} ${s.location} ${s.kind}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, maxNight],
  );

  const filteredPros = useMemo(
    () =>
      pros.filter(
        (w) =>
          (category === "all" || w.category === category) &&
          (q === "" ||
            `${w.name} ${w.service} ${w.area} ${w.skills.join(" ")}`
              .toLowerCase()
              .includes(q.toLowerCase())),
      ),
    [q, category],
  );

  const propertyTypes = Array.from(new Set(properties.map((p) => p.type)));

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="text-3xl font-extrabold">
              {user ? `Hello, ${user.name.split(" ")[0]}` : "Explore GrihaCare"}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Homes, 11-Month Permanent Rentals, stays & home services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 11-Month Permanent Agreement & Vault Quick Action */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900 to-teal-950 border border-teal-500/30 p-3.5 rounded-2xl shadow-md">
              <div className="grid size-10 place-items-center rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
                <FileText className="size-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">11-Month Rental Vault</span>
                <span className="block text-[11px] text-teal-300">Permanent Rentals & E-Stamp Deeds</span>
              </div>
              <Button
                size="sm"
                asChild
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs ml-2 rounded-xl"
              >
                <Link to="/agreements">My Agreements</Link>
              </Button>
            </div>

            {/* Quick Pay Rent Action Card */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-500/30 p-3.5 rounded-2xl shadow-md">
              <div className="grid size-10 place-items-center rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
                <CreditCard className="size-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Pay Rent via Credit Card</span>
                <span className="block text-[11px] text-teal-300">Earn 2% Rewards & HRA Receipt</span>
              </div>
              <Button
                size="sm"
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs ml-2 rounded-xl"
                onClick={() => setPayRentModalOpen(true)}
              >
                Pay Rent <ArrowRight className="ml-1 size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI recommendations */}
        <section className="mt-8 rounded-xl border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-accent" aria-hidden="true" />
            <h2 className="text-lg font-bold">AI picks for you</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {aiRecs.map((r) => (
              <article
                key={r.id}
                className="card-hover flex gap-3 rounded-lg border bg-card p-3 shadow-card"
              >
                <img
                  src={r.image}
                  alt=""
                  loading="lazy"
                  className="size-20 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <Badge variant="secondary" className="mb-1">
                    {r.kind}
                  </Badge>
                  <h3 className="truncate text-sm font-bold">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{r.subtitle}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.reason}</p>
                  <p className="mt-1 text-sm font-bold text-primary">{r.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by locality, city, home type or service…"
              className="pl-9"
              aria-label="Search"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters((v) => !v)}>
            <SlidersHorizontal className="mr-2 size-4" /> Filters
          </Button>
        </div>

        <Tabs defaultValue="homes" className="mt-6">
          <TabsList>
            <TabsTrigger value="homes">
              <Home className="mr-1.5 size-4" /> Homes
            </TabsTrigger>
            <TabsTrigger value="stays">
              <BedDouble className="mr-1.5 size-4" /> Stays
            </TabsTrigger>
            <TabsTrigger value="services">
              <Wrench className="mr-1.5 size-4" /> Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="homes" className="mt-6">
            {showFilters ? (
              <div className="mb-6 grid gap-5 rounded-lg border bg-card p-5 sm:grid-cols-3">
                <div>
                  <Label>Max rent: {inr(maxRent)}</Label>
                  <Slider
                    className="mt-3"
                    value={[maxRent]}
                    min={15000}
                    max={80000}
                    step={2500}
                    onValueChange={(v) => setMaxRent(v[0] ?? 80000)}
                  />
                </div>
                <div>
                  <Label htmlFor="ptype">Property type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="ptype" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {propertyTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sort">Sort by</Label>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger id="sort" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best match</SelectItem>
                      <SelectItem value="low">Price: low to high</SelectItem>
                      <SelectItem value="high">Price: high to low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.length ? (
                filteredProperties.map((p) => <PropertyCard key={p.id} p={p} />)
              ) : (
                <EmptyState
                  title="No homes match those filters"
                  body="Try widening your budget or clearing the search."
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="stays" className="mt-6">
            {showFilters ? (
              <div className="mb-6 rounded-lg border bg-card p-5 sm:max-w-sm">
                <Label>Max monthly PG rent: {inr(maxNight)}</Label>
                <Slider
                  className="mt-3"
                  value={[maxNight]}
                  min={2000}
                  max={15000}
                  step={500}
                  onValueChange={(v) => setMaxNight(v[0] ?? 15000)}
                />
              </div>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredStays.length ? (
                filteredStays.map((s) => <StayCard key={s.id} s={s} />)
              ) : (
                <EmptyState
                  title="No stays found"
                  body="Raise the nightly budget or search another destination."
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="mb-6 rounded-2xl border border-teal-500/30 bg-slate-900/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-teal-500/20 text-teal-300 shrink-0">
                  <Wrench className="size-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Full Home Services Marketplace</h3>
                  <p className="text-xs text-zinc-300">Book Electricians, Plumbers, AC Repair, Cleaning & Packers/Movers with GPS tracking.</p>
                </div>
              </div>
              <Button asChild className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs shrink-0 rounded-xl">
                <Link to="/services">Open Marketplace <ArrowRight className="ml-1 size-3.5" /></Link>
              </Button>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <Button
                variant={category === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory("all")}
              >
                All
              </Button>
              {serviceCategories.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={category === c ? "default" : "outline"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPros.length ? (
                filteredPros.map((w) => <ProCard key={w.id} w={w} />)
              ) : (
                <EmptyState
                  title="No professionals here yet"
                  body="Pick another category or clear your search."
                />
              )}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-12 rounded-xl border bg-card p-6 text-center shadow-card">
          <SectionHeading
            center
            title="Have a home to list?"
            subtitle="Reach verified seekers with zero brokerage."
          />
          <Button asChild className="mt-5">
            <Link to="/profile">Go to your profile</Link>
          </Button>
        </section>
      </div>

      <RentPaymentModal open={payRentModalOpen} onOpenChange={setPayRentModalOpen} />
    </AppShell>
  );
}
