import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  BedDouble,
  Wrench,
  Sparkles,
  UserPlus,
  Search,
  Cpu,
  MessageSquare,
  CreditCard,
  Star,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  GitCompare,
  PackageCheck,
  CheckCircle2,
  Navigation,
  MapPin,
  Zap,
  Heart,
  TrendingUp,
  Globe,
  Shield,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo, SectionHeading, VerifiedBadge } from "@/components/branding";
import { properties, pros, inr } from "@/lib/data";
import {
  NeighborhoodCompareSection,
  MoveInBundleSection,
  LiveTrackingSOSModal,
  ESignAgreementModal,
  RentPaymentSection,
  RentPaymentModal,
} from "@/components/unique-features";
import { Preloader } from "@/components/preloader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "GrihaCare — India's #1 AI Housing & Home Services Super App" },
      {
        name: "description",
        content:
          "Rent homes, book PGs & stays, and hire verified maids, cooks, attenders and electricians with AI safety checks and digital lease e-signing.",
      },
      { property: "og:title", content: "GrihaCare — Smart Housing & Home Services" },
      {
        property: "og:description",
        content: "AI-matched rental homes, PGs, stays, and verified home professionals.",
      },
    ],
  }),
  component: LandingPage,
}) as any);

const features = [
  {
    number: "01",
    icon: Home,
    title: "Verified Rental Homes & PGs",
    body: "1RK, 1BHK, 2BHKs & budget PGs (from ₹2,500/mo) with real owner contact, 0 brokerage and AI livability score.",
    color: "#2dd4bf",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Background-Checked Home Workers",
    body: "Maids, cooks, babysitters, elderly attenders, electricians & plumbers with background verification and live GPS tracking.",
    color: "#38bdf8",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Digital Lease E-Signing",
    body: "Auto-generate legally binding rental agreements with instant Aadhaar OTP e-signature in 2 minutes.",
    color: "#34d399",
  },
  {
    number: "04",
    icon: ShieldAlert,
    title: "Live GPS & 1-Tap SOS Desk",
    body: "Real-time location tracking for home workers + instant 24/7 emergency dispatch response.",
    color: "#ef4444",
  },
];

const uniqueHighlights = [
  {
    icon: PackageCheck,
    title: "Bundled Move-In Kits",
    body: "Book home rental + maid + cook + Wi-Fi setup as one seamless package with 15% discount.",
    color: "#2dd4bf",
  },
  {
    icon: ShieldAlert,
    title: "Live GPS Tracking & SOS",
    body: "Real-time location tracking for drivers & attenders + 1-Tap SOS Emergency response desk.",
    color: "#ef4444",
  },
  {
    icon: FileCheck2,
    title: "Digital Lease E-Sign",
    body: "Auto-generate legally binding rental agreements with instant Aadhaar OTP e-signature.",
    color: "#38bdf8",
  },
  {
    icon: GitCompare,
    title: "Neighborhood Comparator",
    body: "Compare rent, safety index, commute time, and AQI across multiple localities side-by-side.",
    color: "#34d399",
  },
];

const journey = [
  { step: "01", icon: UserPlus, title: "Sign Up", body: "Set your preferences in 30 seconds.", color: "#2dd4bf" },
  { step: "02", icon: Search, title: "Search & Compare", body: "Filter PGs, homes & verified workers.", color: "#38bdf8" },
  { step: "03", icon: Cpu, title: "AI Matching", body: "AI ranks options by budget & commute.", color: "#34d399" },
  { step: "04", icon: MessageSquare, title: "Direct Chat", body: "Message owners and pros directly.", color: "#818cf8" },
  { step: "05", icon: FileCheck2, title: "E-Sign & Pay", body: "Digital Aadhaar e-sign and escrow pay.", color: "#2dd4bf" },
  { step: "06", icon: Star, title: "Enjoy & Review", body: "Rate service for community trust.", color: "#38bdf8" },
];

function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: (i % 4) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}

function FloatingParticles() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const particles = ref.current.querySelectorAll<HTMLElement>(".gsap-particle");
    particles.forEach((p) => {
      const startY = 80 + Math.random() * 20;
      const endY = -20 - Math.random() * 30;
      const duration = 7 + Math.random() * 8;
      gsap.set(p, { top: `${startY}%`, left: `${Math.random() * 100}%`, opacity: 0 });
      const particleDelay = Math.random() * 5;
      gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 3 })
        .to(p, { top: `${endY}%`, opacity: 0.6, duration: duration * 0.5, delay: particleDelay, ease: "none" })
        .to(p, { opacity: 0, duration: duration * 0.5, ease: "none" });
    });
    return () => gsap.killTweensOf(particles);
  }, []);
  const colors = ["#2dd4bf", "#38bdf8", "#34d399", "#818cf8", "#22d3ee"];
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="gsap-particle absolute size-1.5 rounded-full" style={{ background: colors[i % 5], opacity: 0 }} />
      ))}
    </div>
  );
}

function LandingPage() {
  const featured = properties.slice(0, 3);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [esignModalOpen, setEsignModalOpen] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (heroTextRef.current) {
      tl.fromTo(heroTextRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1 });
    }
    if (statsRef.current) {
      const statEls = statsRef.current.querySelectorAll<HTMLElement>(".stat-num");
      statEls.forEach((el) => {
        const target = parseInt(el.dataset["target"] || "0");
        const suffix = el.dataset["suffix"] || "";
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 2.5,
          delay: 1.0,
          ease: "power2.out",
          onUpdate() { el.textContent = Math.floor(proxy.val).toLocaleString("en-IN") + suffix; },
        });
      });
    }
  }, []);

  // Curved Fan Arc properties showcase images
  const arcProperties = [
    { title: "Kota Student PG", price: "₹3,500/mo", img: properties[2]?.images[0] },
    { title: "Indore 2BHK Flat", price: "₹11,500/mo", img: properties[0]?.images[0] },
    { title: "Lucknow 3BHK Flat", price: "₹14,500/mo", img: properties[1]?.images[0] },
    { title: "Patna 1BHK Flat", price: "₹6,500/mo", img: properties[4]?.images[0] },
    { title: "Jaipur House", price: "₹18,000/mo", img: properties[3]?.images[0] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* PRELOADER SCREEN */}
      <Preloader />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold text-zinc-300 md:flex">
            <a href="#featured" className="transition-colors hover:text-teal-400">PGs & Rentals</a>
            <a href="#solutions" className="transition-colors hover:text-teal-400">Home Services</a>
            <a href="#unique" className="transition-colors hover:text-teal-400">Smart Ecosystem</a>
            <a href="#compare" className="transition-colors hover:text-teal-400">Compare Areas</a>
            <a href="#journey" className="transition-colors hover:text-teal-400">How It Works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-500/20 font-bold hidden sm:flex"
              onClick={() => setSosModalOpen(true)}
            >
              <ShieldAlert className="mr-1.5 size-4 animate-pulse text-red-400" /> Live SOS Desk
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="bg-teal-400 text-slate-950 font-extrabold hover:bg-teal-300 shadow-md">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════
            HERO — URBAN NEST STYLE IMAGE + TEXT OVERLAY + SOFT MINT SEARCH BAR
        ═══════════════════════════════════════════════ */}
        <section className="hero-image-bg relative overflow-hidden py-12 lg:py-16 min-h-[95vh] flex flex-col justify-between border-b border-white/10">
          <div className="pointer-events-none absolute -left-32 -top-32 size-[650px] rounded-full bg-teal-500/15 blur-[120px] animate-pulse-glow" />
          <div className="pointer-events-none absolute right-0 bottom-0 size-[550px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <FloatingParticles />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full pt-4">
            <div className="grid gap-12 lg:grid-cols-12 items-center pt-2">
              {/* Left Column: Clean, Minimal & Spacious Editorial Text */}
              <div ref={heroTextRef} className="lg:col-span-7 space-y-6" style={{ opacity: 0 }}>
                {/* Single Sleek Minimal Badge Tag */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-medium tracking-wider uppercase backdrop-blur-md">
                    <Sparkles className="size-3 text-teal-300 fill-teal-300" />
                    Available in 50+ Cities · Tier 2 & 3 AI Housing
                  </div>
                </div>

                {/* Smooth Breathable Display Headline */}
                <h1
                  ref={heroTitleRef}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-normal leading-[1.22]"
                >
                  Find your next <br />
                  <span className="hero-gradient-title">ideal home & PG.</span>
                </h1>

                {/* Clean Minimal Subtitle Description */}
                <p className="max-w-xl text-base sm:text-lg text-zinc-300/80 leading-relaxed font-light pt-1">
                  Book verified budget PGs (from ₹2,500/mo in Kota, Indore, Patna & Lucknow), 1BHK/2BHK rentals, and background-checked maids & electricians.
                </p>

                {/* 2 Minimal Action CTA Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-base px-7 py-6 rounded-full shadow-lg shadow-teal-500/20 hover:scale-102 transition-all"
                  >
                    <Link to="/signup">
                      Get Started Free <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/15 bg-white/5 text-white hover:bg-white/10 transition-all text-base px-6 py-6 rounded-full font-medium backdrop-blur-md"
                    onClick={() => setEsignModalOpen(true)}
                  >
                    <FileCheck2 className="mr-2 size-5 text-teal-400" /> Try Digital E-Sign
                  </Button>
                </div>
              </div>

              {/* Right Column: Prominent Smooth 3D Arc Semi-Circle Fan Display */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                {/* 3D Arc Semi-Circle Fan Carousel (SMOOTH CARDS) */}
                <div className="arc-container hidden sm:block">
                  {arcProperties.map((p, idx) => {
                    const angles = [-24, -12, 0, 12, 24];
                    const xOffsets = [-170, -85, 0, 85, 170];
                    const yOffsets = [28, 9, 0, 9, 28];
                    const angle = angles[idx] || 0;
                    const x = xOffsets[idx] || 0;
                    const y = yOffsets[idx] || 0;

                    return (
                      <div
                        key={idx}
                        className="arc-card cursor-pointer"
                        style={{
                          left: `calc(50% - 97px + ${x}px)`,
                          top: `${40 + y}px`,
                          transform: `rotate(${angle}deg)`,
                          zIndex: 10 + idx,
                        }}
                      >
                        <img src={p.img} alt={p.title} className="size-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                          <p className="text-sm font-bold text-white truncate drop-shadow">{p.title}</p>
                          <p className="text-xs font-black text-teal-300 drop-shadow">{p.price}</p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Center Floating Statement Pill */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 rounded-full glass-card px-5 py-2.5 border border-teal-500/40 text-center shadow-2xl flex items-center gap-2">
                    <span className="size-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-xs font-bold text-white">Let's Find Something Exceptional</span>
                    <Button asChild size="sm" variant="ghost" className="h-6 px-2 text-xs text-teal-400 hover:text-white p-0">
                      <Link to="/dashboard">Explore <ChevronRight className="size-3 ml-0.5" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              URBAN NEST STYLE SEARCH & FILTER BAR OVERLAY (SOFT MINT / CYAN)
          ═══════════════════════════════════════════════ */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-20 w-full mt-12 mb-2">
            <div className="hero-search-bar rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/15">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
                {/* 1. Location / Where */}
                <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10 flex items-center gap-3 hover:border-teal-500/50 transition-colors">
                  <MapPin className="size-5 text-teal-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Where</label>
                    <select className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer">
                      <option value="kota" className="bg-slate-900 text-white">Kota (Student PGs)</option>
                      <option value="indore" className="bg-slate-900 text-white">Indore (Vijay Nagar)</option>
                      <option value="lucknow" className="bg-slate-900 text-white">Lucknow (Gomti Nagar)</option>
                      <option value="patna" className="bg-slate-900 text-white">Patna (Boring Road)</option>
                      <option value="jaipur" className="bg-slate-900 text-white">Jaipur (Malviya Nagar)</option>
                    </select>
                  </div>
                </div>

                {/* 2. Category / Type */}
                <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10 flex items-center gap-3 hover:border-teal-500/50 transition-colors">
                  <Home className="size-5 text-cyan-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Property / Service</label>
                    <select className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer">
                      <option value="pg" className="bg-slate-900 text-white">Budget PG / Co-living</option>
                      <option value="flat" className="bg-slate-900 text-white">1BHK / 2BHK Rental</option>
                      <option value="maid" className="bg-slate-900 text-white">Verified Maid / Cook</option>
                      <option value="electrician" className="bg-slate-900 text-white">Electrician / Plumber</option>
                    </select>
                  </div>
                </div>

                {/* 3. Check in / Move-in */}
                <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10 flex items-center gap-3 hover:border-teal-500/50 transition-colors">
                  <Sparkles className="size-5 text-teal-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Check in / Move-in</label>
                    <select className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer">
                      <option value="instant" className="bg-slate-900 text-white">Instant Move-in</option>
                      <option value="7days" className="bg-slate-900 text-white">Within 7 Days</option>
                      <option value="30days" className="bg-slate-900 text-white">Next Month</option>
                    </select>
                  </div>
                </div>

                {/* 4. Guests / Budget */}
                <div className="bg-slate-900/80 rounded-2xl p-3 border border-white/10 flex items-center gap-3 hover:border-teal-500/50 transition-colors">
                  <BedDouble className="size-5 text-cyan-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Budget Range</label>
                    <select className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer">
                      <option value="under5k" className="bg-slate-900 text-white">Under ₹5,000/mo</option>
                      <option value="5to15k" className="bg-slate-900 text-white">₹5,000 - ₹15,000/mo</option>
                      <option value="15kplus" className="bg-slate-900 text-white">₹15,000+/mo</option>
                    </select>
                  </div>
                </div>

                {/* 5. CTA Book now / Search Button */}
                <div className="col-span-2 md:col-span-1">
                  <Button
                    asChild
                    className="w-full h-14 bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm rounded-2xl shadow-teal-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Link to="/dashboard">
                      Book now <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            MARQUEE TRUST / LOGO TICKER STRIP
        ═══════════════════════════════════════════════ */}
        <section className="border-y border-white/10 bg-zinc-950 py-5 overflow-hidden">
          <div className="flex items-center justify-around gap-8 text-xs font-bold text-zinc-400 tracking-wider uppercase flex-wrap px-4">
            {[
              { icon: Shield, label: "Aadhaar Verified", color: "#f97316" },
              { icon: Zap, label: "0% Brokerage Guarantee", color: "#f59e0b" },
              { icon: FileCheck2, label: "Digital Lease E-Sign", color: "#fb923c" },
              { icon: Navigation, label: "Live GPS Safety Dispatch", color: "#ef4444" },
              { icon: CreditCard, label: "Credit Card Rent Payments", color: "#2dd4bf" },
              { icon: Award, label: "Tier 2 & 3 Budget PGs", color: "#fbbf24" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <item.icon className="size-4" style={{ color: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            NUMBERED SOLUTIONS GRID (01, 02, 03, 04)
        ═══════════════════════════════════════════════ */}
        <section id="solutions" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">Complete Ecosystem</p>
              <h2 className="mt-2 text-3xl font-black sm:text-5xl text-white tracking-tight font-outfit">
                Design Solutions That <br />
                <span className="hero-gradient-title">Elevate Your Living.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
              From verified budget PGs in Kota & Indore to background-checked home help and digital lease agreements, GrihaCare handles your entire household.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="gsap-reveal group relative rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/60 hover:shadow-lift"
              >
                <span className="number-badge block mb-4">{f.number}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{f.body}</p>
                <div className="mt-6 flex items-center text-xs font-bold text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 size-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            NEXT-GEN INNOVATIONS SHOWCASE
        ═══════════════════════════════════════════════ */}
        <section id="unique" className="bg-slate-950/60 py-20 lg:py-28 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Beyond Standard Real Estate"
              title="Crafting Meaningful Innovations"
              subtitle="GrihaCare solves real trust and convenience problems with AI-driven tools competitors don't offer."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {uniqueHighlights.map((u, i) => (
                <div
                  key={i}
                  className="gsap-reveal group rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/50"
                >
                  <div
                    className="grid size-12 place-items-center rounded-2xl"
                    style={{ background: `${u.color}20`, color: u.color }}
                  >
                    <u.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{u.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{u.body}</p>
                </div>
              ))}
            </div>

            {/* SOS Banner */}
            <div className="mt-14 rounded-3xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 p-8 text-slate-950 shadow-lift flex flex-col sm:flex-row items-center justify-between gap-6 gsap-reveal">
              <div className="flex items-center gap-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-black/20 backdrop-blur-sm">
                  <ShieldAlert className="size-7 text-slate-950 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xl font-black">Safety First: SOS Emergency & Live GPS Tracking</h4>
                  <p className="text-sm text-slate-950/80 mt-1 font-semibold">
                    Live GPS dispatch and instant emergency button for babysitters, drivers and home nurses.
                  </p>
                </div>
              </div>
              <Button
                className="bg-slate-950 text-white font-extrabold hover:bg-slate-900 shrink-0 px-7 py-6 rounded-full shadow-lg"
                onClick={() => setSosModalOpen(true)}
              >
                Test Live SOS Desk
              </Button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            NEIGHBORHOOD COMPARATOR & BUNDLED MOVE-IN KITS
        ═══════════════════════════════════════════════ */}
        <section id="compare" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-20">
            <RentPaymentSection />
            <NeighborhoodCompareSection />
            <MoveInBundleSection />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            FEATURED PROPERTIES GRID
        ═══════════════════════════════════════════════ */}
        <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 border-t border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-400">Handpicked Listings</p>
              <h3 className="text-3xl font-extrabold text-white mt-1 font-outfit">Featured Tier 2 & Tier 3 Homes & PGs</h3>
            </div>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full font-bold">
              <Link to="/dashboard">View All ({properties.length}+)</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <div
                key={p.id}
                className="gsap-reveal group rounded-3xl border border-white/10 bg-slate-900/90 overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/50"
              >
                <div className="relative aspect-[4/3]">
                  <img src={p.images[0]} alt={p.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 right-3 bg-teal-400 text-slate-950 font-extrabold text-xs px-3 py-1 shadow-md">
                    {inr(p.price)}/mo
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
                    <MapPin className="size-3.5" /> {p.location}
                  </div>
                  <h4 className="mt-2 text-lg font-bold text-white line-clamp-1">{p.title}</h4>
                  <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">{p.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <img src={p.owner.avatar} alt="" className="size-7 rounded-full object-cover ring-1 ring-teal-400" />
                      <span className="text-xs font-bold text-zinc-300">{p.owner.name}</span>
                    </div>
                    <Button asChild size="sm" className="bg-slate-800 text-teal-400 hover:bg-teal-400 hover:text-slate-950 font-bold rounded-full transition-colors">
                      <Link to="/property/$id" params={{ id: p.id }}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            HOW IT WORKS ROADMAP (01 - 06)
        ═══════════════════════════════════════════════ */}
        <section id="journey" className="bg-zinc-950/60 py-20 lg:py-28 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Simple Roadmap"
              title="How GrihaCare Works in 6 Steps"
              subtitle="Transparent, fast, and secure process from discovery to digital agreement and daily home care."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {journey.map((s, idx) => (
                <div
                  key={idx}
                  className="gsap-reveal relative rounded-3xl border border-white/10 bg-zinc-900/80 p-7 shadow-card transition-all hover:border-teal-500/40"
                >
                  <span className="absolute top-4 right-5 text-3xl font-black text-teal-500/20">{s.step}</span>
                  <div
                    className="grid size-12 place-items-center rounded-2xl font-bold"
                    style={{ background: `${s.color}20`, color: s.color }}
                  >
                    <s.icon className="size-6" />
                  </div>
                  <h4 className="mt-5 text-lg font-bold text-white">{s.title}</h4>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            IMPACT FINAL CTA BANNER ("Let's Bring Your Vision to Life")
        ═══════════════════════════════════════════════ */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-5xl text-center gsap-reveal">
            <div
              className="rounded-3xl p-12 sm:p-16 relative overflow-hidden border border-teal-500/30"
              style={{
                background: "linear-gradient(135deg, #091322 0%, #0f2238 50%, #091322 100%)",
                boxShadow: "0 0 100px rgba(45,212,191,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-cyan-500/15 blur-3xl" />

              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md mb-6 px-4 py-1.5 font-bold">
                <Sparkles className="mr-1.5 size-4 text-teal-300 fill-teal-300" />
                Limited Time — Zero Brokerage Guarantee
              </Badge>

              <h2 className="text-4xl font-black text-white sm:text-6xl tracking-tight font-outfit">
                Let's Bring Your <br />
                <span className="hero-gradient-title">Dream Home to Life.</span>
              </h2>
              <p className="mt-5 text-zinc-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
                Join 1,20,000+ Indians who found their perfect home, PG, and verified domestic help through GrihaCare.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 font-black shadow-[0_0_35px_rgba(45,212,191,0.5)] hover:scale-105 transition-all px-9 py-6 rounded-full text-base"
                >
                  <Link to="/signup">
                    Get Started Free <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="glass-pill text-white border-white/25 hover:bg-teal-500/20 hover:border-teal-400 px-8 py-6 rounded-full text-base font-bold shadow-lg"
                >
                  <Link to="/dashboard">Browse Listings</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 text-zinc-400 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-xs font-medium text-zinc-500">
            © {new Date().getFullYear()} GrihaCare Technologies India Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-bold text-zinc-400">
            <Link to="/login" className="hover:text-teal-400 transition-colors">Login</Link>
            <Link to="/signup" className="hover:text-teal-400 transition-colors">Signup</Link>
            <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <LiveTrackingSOSModal open={sosModalOpen} onOpenChange={setSosModalOpen} />
      <ESignAgreementModal open={esignModalOpen} onOpenChange={setEsignModalOpen} />
    </div>
  );
}
