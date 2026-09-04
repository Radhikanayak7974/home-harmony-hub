import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap,
  Wrench,
  Hammer,
  Wind,
  Sparkles,
  Paintbrush,
  ShieldAlert,
  Tv,
  Truck,
  ShieldCheck,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  ArrowRight,
  Filter,
  X,
  Phone,
  AlertCircle,
  Briefcase,
  ChevronRight,
  Check,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppShell } from "@/components/app-shell";
import {
  SERVICE_CATEGORIES,
  ServiceProvider,
  HomeServiceBooking,
  HomeServiceBookingStatus,
  getServiceProvidersFn,
  createHomeServiceBookingFn,
  getUserHomeServiceBookingsFn,
  cancelHomeServiceBookingFn,
  updateHomeServiceBookingStatusFn,
} from "@/api/services";
import { inr } from "@/lib/data";

const CATEGORY_ICONS: Record<string, any> = {
  electrician: Zap,
  plumber: Wrench,
  carpenter: Hammer,
  ac_repair: Wind,
  home_cleaning: Sparkles,
  painting: Paintbrush,
  pest_control: ShieldAlert,
  appliance_repair: Tv,
  packers_movers: Truck,
  other: ShieldCheck,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Verified Home Services Marketplace — GrihaCare" },
      {
        name: "description",
        content:
          "Book background-checked electricians, plumbers, maids, painters, AC technicians, and movers with GPS safety tracking.",
      },
    ],
  }),
  component: HomeServicesPage,
});

function HomeServicesPage() {
  const [activeTab, setActiveTab] = useState<"marketplace" | "my_bookings">("marketplace");
  const [categories] = useState(SERVICE_CATEGORIES);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rating" | "price_low" | "price_high" | "experience">("rating");

  // Data States
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(true);
  const [bookings, setBookings] = useState<HomeServiceBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(false);
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");

  // Modal States
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);

  // Booking Form State
  const [bookingAddress, setBookingAddress] = useState("Flat 402, Sunshine Residency, Vijay Nagar, Indore");
  const [bookingCity, setBookingCity] = useState("Indore");
  const [bookingDate, setBookingDate] = useState("2026-09-10");
  const [bookingTimeSlot, setBookingTimeSlot] = useState("10:00 AM - 12:00 PM");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Fetch Providers based on filters
  useEffect(() => {
    async function loadProviders() {
      setLoadingProviders(true);
      try {
        const res = await getServiceProvidersFn({
          data: {
            category: selectedCategory,
            city: selectedCity,
            ...(minRating > 0 ? { minRating } : {}),
            searchQuery: searchQuery,
            sortBy: sortBy,
          },
        });
        setProviders(res);
      } catch (err) {
        toast.error("Failed to load service providers");
      } finally {
        setLoadingProviders(false);
      }
    }
    loadProviders();
  }, [selectedCategory, selectedCity, minRating, searchQuery, sortBy]);

  // Fetch Bookings
  async function loadBookings() {
    setLoadingBookings(true);
    try {
      const res = await getUserHomeServiceBookingsFn({
        data: { statusFilter: bookingStatusFilter },
      });
      setBookings(res);
    } catch (err) {
      toast.error("Failed to load service bookings");
    } finally {
      setLoadingBookings(false);
    }
  }

  useEffect(() => {
    if (activeTab === "my_bookings") {
      loadBookings();
    }
  }, [activeTab, bookingStatusFilter]);

  // Handle New Booking Submission
  async function handleConfirmBooking() {
    if (!selectedProvider) return;
    if (!bookingAddress.trim()) {
      toast.error("Please enter a valid service address");
      return;
    }

    setSubmittingBooking(true);
    try {
      const newBk = await createHomeServiceBookingFn({
        data: {
          providerId: selectedProvider.id,
          address: bookingAddress,
          city: bookingCity || selectedProvider.city,
          scheduledDate: bookingDate,
          scheduledTimeSlot: bookingTimeSlot,
          notes: bookingNotes,
          estimatedCost: selectedProvider.priceFrom,
        },
      });

      toast.success(`Service Booking Confirmed! Ref: ${newBk.bookingRef}`);
      setBookingModalOpen(false);
      setProfileModalOpen(false);
      setActiveTab("my_bookings");
      loadBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to place booking");
    } finally {
      setSubmittingBooking(false);
    }
  }

  // Handle Cancel Booking
  async function handleCancelBooking(bookingId: string) {
    try {
      await cancelHomeServiceBookingFn({ data: { bookingId } });
      toast.success("Service booking cancelled");
      loadBookings();
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  }

  // Handle Status Update Simulation
  async function handleUpdateStatus(bookingId: string, newStatus: HomeServiceBookingStatus) {
    try {
      await updateHomeServiceBookingStatusFn({ data: { bookingId, status: newStatus } });
      toast.success(`Booking status updated to ${newStatus.replace("_", " ").toUpperCase()}`);
      loadBookings();
    } catch (err) {
      toast.error("Failed to update status");
    }
  }

  function openBookingDialog(provider: ServiceProvider) {
    setSelectedProvider(provider);
    setBookingCity(provider.city);
    setBookingModalOpen(true);
  }

  function openProfileDialog(provider: ServiceProvider) {
    setSelectedProvider(provider);
    setProfileModalOpen(true);
  }

  return (
    <AppShell>
      <div className="space-y-8 pb-16">
        {/* HEADER HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl animate-pulse-glow" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="mr-1.5 size-3.5 text-teal-400" />
                100% Background-Checked Professionals
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-outfit">
                Home Services <span className="hero-gradient-title">Marketplace</span>
              </h1>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Discover verified electricians, plumbers, carpenters, painters, and deep clean professionals with live GPS safety tracking and transparent pricing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={activeTab === "marketplace" ? "default" : "outline"}
                className={activeTab === "marketplace" ? "bg-teal-400 text-slate-950 font-extrabold hover:bg-teal-300" : "border-white/20 text-white"}
                onClick={() => setActiveTab("marketplace")}
              >
                Browse Services
              </Button>
              <Button
                variant={activeTab === "my_bookings" ? "default" : "outline"}
                className={activeTab === "my_bookings" ? "bg-teal-400 text-slate-950 font-extrabold hover:bg-teal-300" : "border-white/20 text-white"}
                onClick={() => setActiveTab("my_bookings")}
              >
                My Service Bookings
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "marketplace" ? (
          <>
            {/* 1. SERVICE CATEGORIES GRID */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-white font-outfit flex items-center gap-2">
                <Briefcase className="size-5 text-teal-400" />
                Browse Service Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedCategory === "all"
                      ? "border-teal-400 bg-teal-500/20 text-white shadow-teal-glow"
                      : "border-white/10 bg-slate-900/60 text-zinc-300 hover:border-teal-500/50 hover:bg-slate-900"
                  }`}
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-teal-500/20 text-teal-300 mb-2">
                    <Sparkles className="size-5" />
                  </div>
                  <div className="font-bold text-sm">All Categories</div>
                  <div className="text-[11px] text-zinc-400">View all professionals</div>
                </button>

                {categories.map((cat) => {
                  const IconComp = CATEGORY_ICONS[cat.slug] || Wrench;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-teal-400 bg-teal-500/20 text-white shadow-teal-glow"
                          : "border-white/10 bg-slate-900/60 text-zinc-300 hover:border-teal-500/50 hover:bg-slate-900"
                      }`}
                    >
                      <div className="grid size-10 place-items-center rounded-xl bg-teal-500/20 text-teal-300 mb-2">
                        <IconComp className="size-5" />
                      </div>
                      <div className="font-bold text-sm line-clamp-1">{cat.title}</div>
                      <div className="text-[11px] text-zinc-400">{cat.count}+ pros</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. SEARCH & FILTER BAR */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Search Input */}
                <div className="sm:col-span-4 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                  <Input
                    placeholder="Search by pro name, service, skill (e.g. leak, AC)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-950 border-white/10 text-white text-xs h-10 rounded-xl"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* City Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-10 bg-slate-950 border border-white/10 text-white text-xs font-semibold rounded-xl px-3 outline-none cursor-pointer"
                  >
                    <option value="all">All Cities</option>
                    <option value="Kota">Kota</option>
                    <option value="Indore">Indore</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Patna">Patna</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="sm:col-span-2">
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full h-10 bg-slate-950 border border-white/10 text-white text-xs font-semibold rounded-xl px-3 outline-none cursor-pointer"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4.5">★ 4.5 & Above</option>
                    <option value="4.8">★ 4.8 & Above</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="sm:col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="w-full h-10 bg-slate-950 border border-white/10 text-white text-xs font-semibold rounded-xl px-3 outline-none cursor-pointer"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="experience">Most Experienced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. PROVIDER LISTINGS GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Showing {providers.length} Verified Service Professionals
                </p>
              </div>

              {loadingProviders ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse" />
                  ))}
                </div>
              ) : providers.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center space-y-3">
                  <AlertCircle className="mx-auto size-10 text-zinc-500" />
                  <h3 className="text-lg font-bold text-white">No Service Professionals Found</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Try clearing filters or searching for a different service category or city.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold text-teal-400 border-teal-500/30"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedCity("all");
                      setMinRating(0);
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providers.map((pro) => (
                    <div
                      key={pro.id}
                      className="group rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-lift flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Header info */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative shrink-0">
                            <img
                              src={pro.avatar}
                              alt={pro.name}
                              className="size-14 rounded-2xl object-cover ring-2 ring-teal-400/40"
                            />
                            {pro.verificationStatus === "PREMIUM_PARTNER" && (
                              <Badge className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1">
                                GOLD
                              </Badge>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-white text-base group-hover:text-teal-400 transition-colors">
                                {pro.name}
                              </h3>
                              <ShieldCheck className="size-4 text-teal-400 shrink-0" />
                            </div>
                            <p className="text-xs font-semibold text-teal-300 mt-0.5">{pro.serviceTitle}</p>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                              <span className="flex items-center gap-1 text-amber-400 font-bold">
                                <Star className="size-3 fill-amber-400" /> {pro.rating} ({pro.reviewCount})
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3 text-cyan-400" /> {pro.city}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bio snippet */}
                        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                          {pro.description}
                        </p>

                        {/* Skills chips */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {pro.skills.slice(0, 3).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-950 border border-white/10 text-[10px] font-semibold text-zinc-400"
                            >
                              {skill}
                            </span>
                          ))}
                          {pro.skills.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-white/10 text-[10px] font-semibold text-zinc-400">
                              +{pro.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] font-bold text-zinc-400 uppercase">Pricing</span>
                          <span className="text-sm font-extrabold text-white">
                            {inr(pro.priceFrom)} - {inr(pro.priceTo)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs font-bold text-zinc-300 border-white/20 rounded-xl hover:bg-white/10"
                            onClick={() => openProfileDialog(pro)}
                          >
                            Profile
                          </Button>
                          <Button
                            size="sm"
                            className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
                            onClick={() => openBookingDialog(pro)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* MY SERVICE BOOKINGS TAB */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white font-outfit">My Service Bookings</h2>
                <p className="text-xs text-zinc-400">Track and manage home service appointments and status updates.</p>
              </div>

              {/* Status filter bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["all", "pending", "confirmed", "in_progress", "completed", "cancelled"].map((st) => (
                  <Button
                    key={st}
                    size="sm"
                    variant={bookingStatusFilter === st ? "default" : "outline"}
                    className={`text-xs font-bold capitalize rounded-xl ${
                      bookingStatusFilter === st
                        ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
                        : "border-white/10 text-zinc-400"
                    }`}
                    onClick={() => setBookingStatusFilter(st)}
                  >
                    {st.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>

            {loadingBookings ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center space-y-3">
                <Calendar className="mx-auto size-10 text-zinc-500" />
                <h3 className="text-lg font-bold text-white">No Service Bookings Found</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  You haven't placed any home service bookings under this filter yet.
                </p>
                <Button
                  className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs rounded-xl"
                  onClick={() => setActiveTab("marketplace")}
                >
                  Browse Service Marketplace
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((bk) => {
                  const statusColors: Record<string, string> = {
                    pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                    confirmed: "bg-teal-500/20 text-teal-300 border-teal-500/30",
                    assigned: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                    in_progress: "bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse",
                    completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                    cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
                  };

                  return (
                    <div
                      key={bk.id}
                      className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={bk.providerAvatar}
                          alt={bk.providerName}
                          className="size-14 rounded-2xl object-cover ring-2 ring-teal-400/40 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-slate-950 text-zinc-300 border-white/10 text-[10px] font-bold">
                              {bk.bookingRef}
                            </Badge>
                            <Badge className={`text-[10px] font-extrabold uppercase px-2 py-0.5 border ${statusColors[bk.status] || ""}`}>
                              {bk.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-white text-base">{bk.serviceTitle}</h3>
                          <p className="text-xs text-teal-300 font-semibold">Pro: {bk.providerName}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3.5 text-teal-400" /> {bk.scheduledDate} ({bk.scheduledTimeSlot})
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3.5 text-cyan-400" /> {bk.city}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                        <div>
                          <span className="block text-[10px] font-bold text-zinc-400 uppercase">Estimated Fee</span>
                          <span className="text-lg font-extrabold text-white">{inr(bk.estimatedCost)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Demo Status Switcher */}
                          <select
                            value={bk.status}
                            onChange={(e) => handleUpdateStatus(bk.id, e.target.value as HomeServiceBookingStatus)}
                            className="bg-slate-950 border border-white/15 text-xs text-zinc-300 rounded-xl px-2 py-1.5 outline-none cursor-pointer"
                          >
                            <option value="pending">Set Pending</option>
                            <option value="confirmed">Set Confirmed</option>
                            <option value="assigned">Set Assigned</option>
                            <option value="in_progress">Set In Progress</option>
                            <option value="completed">Set Completed</option>
                            <option value="cancelled">Set Cancelled</option>
                          </select>

                          {bk.status !== "cancelled" && bk.status !== "completed" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="text-xs font-bold rounded-xl h-8"
                              onClick={() => handleCancelBooking(bk.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROVIDER PROFILE DETAIL DIALOG */}
      {selectedProvider && (
        <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white text-lg font-bold">
                <ShieldCheck className="size-5 text-teal-400" /> Professional Profile
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400">
                Verified background check completed by GrihaCare Partner Operations.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="flex items-start gap-4">
                <img
                  src={selectedProvider.avatar}
                  alt={selectedProvider.name}
                  className="size-16 rounded-2xl object-cover ring-2 ring-teal-400/40 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedProvider.name}</h3>
                  <p className="text-xs font-semibold text-teal-400">{selectedProvider.serviceTitle}</p>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="size-3.5 fill-amber-400" /> {selectedProvider.rating} ({selectedProvider.reviewCount} reviews)
                    </span>
                    <span>·</span>
                    <span>{selectedProvider.experienceYears} Years Exp</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px] text-zinc-400">About Professional</h4>
                <p className="text-zinc-300 leading-relaxed">{selectedProvider.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-zinc-400">Verified Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProvider.skills.map((s, idx) => (
                    <Badge key={idx} variant="outline" className="border-teal-500/30 text-teal-300 text-xs font-medium">
                      <Check className="mr-1 size-3 text-teal-400" /> {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase">Service City</span>
                  <span className="font-extrabold text-white text-sm">{selectedProvider.city}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950 p-3">
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase">Jobs Completed</span>
                  <span className="font-extrabold text-teal-400 text-sm">{selectedProvider.completedJobs}+ Verified Jobs</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setProfileModalOpen(false)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold px-6"
                  onClick={() => {
                    setProfileModalOpen(false);
                    openBookingDialog(selectedProvider);
                  }}
                >
                  Book Service Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* SERVICE BOOKING DIALOG */}
      {selectedProvider && (
        <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white font-bold">
                <Calendar className="size-5 text-teal-400" /> Schedule Service Appointment
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400">
                Book {selectedProvider.name} ({selectedProvider.serviceTitle}).
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-3 flex items-center gap-3">
                <img src={selectedProvider.avatar} alt="" className="size-10 rounded-xl object-cover ring-1 ring-teal-400" />
                <div>
                  <h4 className="font-bold text-white text-xs">{selectedProvider.name}</h4>
                  <p className="text-[11px] text-teal-300 font-semibold">{selectedProvider.serviceTitle}</p>
                </div>
              </div>

              <div>
                <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Service Address</Label>
                <Input
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  placeholder="House/Flat No., Building, Street, City"
                  className="bg-slate-950 border-white/15 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Preferred Date</Label>
                  <Input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="bg-slate-950 border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Time Slot</Label>
                  <select
                    value={bookingTimeSlot}
                    onChange={(e) => setBookingTimeSlot(e.target.value)}
                    className="w-full h-9 bg-slate-950 border border-white/15 text-white text-xs rounded-md px-2 outline-none"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Issue Details / Instructions (Optional)</Label>
                <Input
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="e.g. Master bedroom fan making noise..."
                  className="bg-slate-950 border-white/15 text-white text-xs"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-950 p-3 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Estimated Inspection / Base Fee:</span>
                  <span className="font-extrabold text-white">{inr(selectedProvider.priceFrom)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">GrihaCare Platform Convenience Fee:</span>
                  <span className="font-bold text-teal-400">₹0 FREE</span>
                </div>
              </div>

              <Button
                className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold py-5 text-xs rounded-xl"
                onClick={handleConfirmBooking}
                disabled={submittingBooking}
              >
                {submittingBooking ? "Confirming Service Booking..." : "Confirm & Schedule Booking"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
