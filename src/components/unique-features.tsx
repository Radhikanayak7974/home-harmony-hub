import { useState, useEffect } from "react";
import {
  ShieldAlert,
  MapPin,
  FileCheck2,
  GitCompare,
  PackageCheck,
  CheckCircle2,
  PhoneCall,
  Lock,
  Sparkles,
  Zap,
  ArrowRight,
  Download,
  AlertTriangle,
  Building2,
  Users,
  Car,
  Wifi,
  Navigation,
  CreditCard,
  Wallet,
  Coins,
  Receipt,
  ShieldCheck,
  ArrowUpRight,
  Percent,
  History,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import { processRentPaymentFn, getRentReceiptsFn, type RentPaymentReceipt } from "@/api/payments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// 1. NEIGHBORHOOD COMPARE DATA
export const neighborhoodData = [
  {
    name: "Bhawarkua, Indore (Tier-2)",
    avgRent1BHK: "₹6,500",
    avgRent2BHK: "₹11,500",
    avgPG: "₹2,800",
    safetyScore: 94,
    commuteTime: "8 mins to Coaching Hub & IT Park",
    aqi: "45 (Good)",
    amenities: ["Coaching Hub", "24/7 Mess", "Hospital 500m", "Filtered RO"],
    vibe: "Cleanest City & Student Friendly Hub",
  },
  {
    name: "Rajeev Gandhi Nagar, Kota (Tier-2)",
    avgRent1BHK: "₹7,000",
    avgRent2BHK: "₹12,500",
    avgPG: "₹3,500",
    safetyScore: 96,
    commuteTime: "5 mins to ALLEN & Resonance Campuses",
    aqi: "52 (Good)",
    amenities: ["Silent Study Halls", "CCTV Streets", "RO Water", "Hostel Mess"],
    vibe: "Focused Academic & Coaching Center",
  },
  {
    name: "Boring Road, Patna (Tier-2)",
    avgRent1BHK: "₹6,000",
    avgRent2BHK: "₹10,500",
    avgPG: "₹3,200",
    safetyScore: 91,
    commuteTime: "10 mins to Colleges & Patna Jn",
    aqi: "65 (Moderate)",
    amenities: ["Biometric Entry", "3-Time Mess", "Shopping Market"],
    vibe: "Central Educational & Commercial District",
  },
  {
    name: "Kapoorthala, Lucknow (Tier-2)",
    avgRent1BHK: "₹7,500",
    avgRent2BHK: "₹13,000",
    avgPG: "₹3,800",
    safetyScore: 93,
    commuteTime: "10 mins to IT Park & Hazratganj",
    aqi: "58 (Moderate)",
    amenities: ["Metro 400m", "Power Backup", "Girls Security Desk"],
    vibe: "Safe & Vibrant Student Sector",
  },
  {
    name: "Gopalpura Bypass, Jaipur (Tier-2)",
    avgRent1BHK: "₹8,000",
    avgRent2BHK: "₹14,000",
    avgPG: "₹4,200",
    safetyScore: 95,
    commuteTime: "10 mins to WTP & University Campus",
    aqi: "50 (Good)",
    amenities: ["AC Rooms", "High-Speed Fiber", "Daily Room Cleaning"],
    vibe: "Modern Co-Living & Youth Area",
  },
  {
    name: "MP Nagar, Bhopal (Tier-2)",
    avgRent1BHK: "₹5,500",
    avgRent2BHK: "₹9,800",
    avgPG: "₹3,000",
    safetyScore: 92,
    commuteTime: "5 mins to DB City Mall & Station",
    aqi: "42 (Good)",
    amenities: ["Central Market", "Pure Veg Mess", "24/7 Water"],
    vibe: "Commercial & Budget Accommodation",
  },
  {
    name: "Lanka, Varanasi (Tier-3)",
    avgRent1BHK: "₹4,800",
    avgRent2BHK: "₹8,500",
    avgPG: "₹2,500",
    safetyScore: 90,
    commuteTime: "5 mins to BHU Main Gate",
    aqi: "60 (Moderate)",
    amenities: ["500m to BHU", "Home-style Mess", "Free WiFi"],
    vibe: "Peaceful University & Cultural Zone",
  },
];

export function NeighborhoodCompareSection() {
  const [selectedCity1, setSelectedCity1] = useState(0);
  const [selectedCity2, setSelectedCity2] = useState(1);

  const loc1 = neighborhoodData[selectedCity1] ?? neighborhoodData[0]!;
  const loc2 = neighborhoodData[selectedCity2] ?? neighborhoodData[1]!;

  return (
    <div className="rounded-2xl border bg-card/80 p-6 shadow-card backdrop-blur sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <Badge className="bg-secondary/15 text-secondary border-0 mb-2">
            <GitCompare className="mr-1.5 size-3.5" /> AI Neighborhood Comparator
          </Badge>
          <h3 className="text-2xl font-bold">Compare Localities Side-by-Side</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Evaluate rent, safety index, commute times, and nearby amenities before renting.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Locality 1 */}
        <div className="rounded-xl border bg-background p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Location 1
          </label>
          <select
            value={selectedCity1}
            onChange={(e) => setSelectedCity1(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-card p-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {neighborhoodData.map((n, idx) => (
              <option key={idx} value={idx}>
                {n.name}
              </option>
            ))}
          </select>

          <div className="mt-5 space-y-3.5 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg 1BHK Rent</span>
              <span className="font-bold text-primary">{loc1.avgRent1BHK}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg 2BHK Rent</span>
              <span className="font-bold text-primary">{loc1.avgRent2BHK}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg PG Rent</span>
              <span className="font-bold text-primary">{loc1.avgPG}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Safety Index</span>
              <span className="font-extrabold text-success">{loc1.safetyScore}/100</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Commute to Work</span>
              <span className="font-semibold text-foreground">{loc1.commuteTime}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Air Quality (AQI)</span>
              <span className="font-medium text-foreground">{loc1.aqi}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground">Highlights</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {loc1.amenities.map((a, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Locality 2 */}
        <div className="rounded-xl border bg-background p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Location 2
          </label>
          <select
            value={selectedCity2}
            onChange={(e) => setSelectedCity2(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border bg-card p-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {neighborhoodData.map((n, idx) => (
              <option key={idx} value={idx}>
                {n.name}
              </option>
            ))}
          </select>

          <div className="mt-5 space-y-3.5 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg 1BHK Rent</span>
              <span className="font-bold text-primary">{loc2.avgRent1BHK}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg 2BHK Rent</span>
              <span className="font-bold text-primary">{loc2.avgRent2BHK}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Avg PG Rent</span>
              <span className="font-bold text-primary">{loc2.avgPG}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Safety Index</span>
              <span className="font-extrabold text-success">{loc2.safetyScore}/100</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Commute to Work</span>
              <span className="font-semibold text-foreground">{loc2.commuteTime}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Air Quality (AQI)</span>
              <span className="font-medium text-foreground">{loc2.aqi}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground">Highlights</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {loc2.amenities.map((a, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. MOVE-IN BUNDLED KITS COMPONENT
export function MoveInBundleSection() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const bundles = [
    {
      id: "b1",
      title: "Bachelor / Student Move-In Pack",
      price: "₹14,500/mo",
      originalPrice: "₹18,000",
      includes: [
        "Fully Furnished PG Room",
        "Daily Maid & Breakfast Cook",
        "Fiber Wi-Fi Connection",
        "Moving Truck Assistance",
      ],
      badge: "Save 20%",
    },
    {
      id: "b2",
      title: "Family Complete Move-In Pack",
      price: "₹38,000/mo",
      originalPrice: "₹45,000",
      includes: [
        "2BHK Apartment Rental",
        "Full-time Cook + Maid Service",
        "Deep Cleaning on Move-in",
        "Digital Lease & Police Verification",
      ],
      badge: "Most Popular",
    },
  ];

  return (
    <div className="rounded-2xl border bg-primary/5 p-6 border-primary/20 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <PackageCheck className="size-6" />
        </div>
        <div>
          <Badge className="bg-accent text-accent-foreground border-0">Exclusive Feature</Badge>
          <h3 className="text-xl font-extrabold mt-1">1-Click Bundled Move-In Kits</h3>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Rent a home + hire verified maid/cook + setup WiFi in one unified booking with 15-20%
        bundled discount.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {bundles.map((b) => (
          <div
            key={b.id}
            className={`rounded-xl border bg-card p-5 shadow-card transition-all hover:border-primary ${
              selectedBundle === b.id ? "ring-2 ring-primary border-transparent" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-base">{b.title}</h4>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-primary">{b.price}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    {b.originalPrice}
                  </span>
                </div>
              </div>
              <Badge variant="secondary">{b.badge}</Badge>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              {b.includes.map((inc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success shrink-0" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <Button
              className="mt-5 w-full"
              variant={selectedBundle === b.id ? "default" : "outline"}
              onClick={() => {
                setSelectedBundle(b.id);
                toast.success(`Selected ${b.title}! Bundle discount applied.`);
              }}
            >
              {selectedBundle === b.id ? "Bundle Selected ✓" : "Select Move-In Bundle"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. SOS LIVE TRACKING MODAL
export function LiveTrackingSOSModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [sosTriggered, setSosTriggered] = useState(false);

  function handleSOS() {
    setSosTriggered(true);
    toast.error("SOS Emergency Alert Dispatched! Nearby emergency response notified.");
    setTimeout(() => {
      setSosTriggered(false);
    }, 5000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <ShieldAlert className="size-6 animate-pulse" /> Live Worker Tracking & SOS
          </DialogTitle>
          <DialogDescription>
            Real-time GPS tracking for home attendants, drivers, nurses & babysitters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Simulated Map View */}
          <div className="relative h-44 overflow-hidden rounded-xl border bg-slate-900 p-4 text-white">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex items-center justify-between">
              <Badge className="bg-emerald-500 text-slate-950 border-0 font-bold">
                <Navigation className="mr-1 size-3 animate-spin" /> Live GPS Active
              </Badge>
              <span className="text-xs font-mono text-slate-300">ETA: 6 mins away</span>
            </div>

            <div className="relative z-10 mt-8 flex items-center justify-center">
              <div className="relative grid size-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
                <MapPin className="size-6 text-emerald-400" />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 p-2 rounded-lg backdrop-blur">
              <span>
                Driver: <strong>Ramesh Singh</strong>
              </span>
              <span>Speed: 24 km/h</span>
            </div>
          </div>

          <div className="rounded-lg border bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <p>
              In case of an emergency during service, tap the SOS button to alert GrihaCare 24/7
              Security Desk & registered emergency contact.
            </p>
          </div>

          {sosTriggered ? (
            <div className="rounded-xl bg-red-600 p-4 text-white text-center animate-bounce">
              <p className="font-extrabold text-lg">🚨 EMERGENCY SOS ACTIVATED!</p>
              <p className="text-xs mt-1">
                Live location shared with 112 emergency services & guardian.
              </p>
            </div>
          ) : (
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-6 text-base shadow-lg shadow-red-600/30"
              onClick={handleSOS}
            >
              <ShieldAlert className="mr-2 size-5" /> TAP FOR EMERGENCY 1-CLICK SOS
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 4. DIGITAL LEASE E-SIGN MODAL
export function ESignAgreementModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [aadhaar, setAadhaar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [signed, setSigned] = useState(false);

  function handleSendOtp() {
    if (aadhaar.length < 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to Aadhaar registered mobile number!");
  }

  function handleVerifyOtp() {
    if (!otp) return;
    setSigned(true);
    toast.success("Legal Rental Agreement successfully e-Signed via e-Aadhaar!");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <FileCheck2 className="size-6" /> Digital Rental Agreement & E-Sign
          </DialogTitle>
          <DialogDescription>
            Legally compliant digital lease agreement with instant Aadhaar OTP e-signature.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Agreement Preview Box */}
          <div className="rounded-xl border bg-muted/40 p-4 text-xs space-y-2 max-h-48 overflow-y-auto">
            <h4 className="font-bold text-sm text-foreground text-center border-b pb-2">
              RESIDENTIAL LEASE AGREEMENT (GOVT APPROVED)
            </h4>
            <p>
              <strong>Landlord:</strong> Karthik Iyer (Aadhaar Verified)
            </p>
            <p>
              <strong>Tenant:</strong> Radhika Nayak (Aadhaar Verified)
            </p>
            <p>
              <strong>Property:</strong> Sunlit 2BHK near Koramangala Park, Bengaluru
            </p>
            <p>
              <strong>Monthly Rent:</strong> ₹34,000/month (Due 5th of every month)
            </p>
            <p>
              <strong>Security Deposit:</strong> ₹68,000 (Refundable)
            </p>
            <p>
              <strong>Tenure:</strong> 11 Months (Lock-in: 6 Months, Notice: 1 Month)
            </p>
            <p className="text-muted-foreground text-[10px] italic">
              This document is legally binding under the Indian Registration Act and IT Act 2000
              once signed via Aadhaar e-Sign.
            </p>
          </div>

          {signed ? (
            <div className="rounded-xl bg-success/15 border border-success/30 p-4 text-center space-y-2">
              <CheckCircle2 className="mx-auto size-10 text-success" />
              <h4 className="font-bold text-success text-base">Agreement Legally Signed!</h4>
              <p className="text-xs text-muted-foreground">
                Digital copy stored in your profile & sent to email.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => toast.info("Downloading signed PDF lease agreement...")}
              >
                <Download className="mr-2 size-4" /> Download Signed PDF
              </Button>
            </div>
          ) : (
            <div className="space-y-3 rounded-xl border bg-card p-4">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <Lock className="size-4 text-primary" /> Aadhaar OTP E-Signature
              </h4>

              {!otpSent ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter 12-Digit Aadhaar Number"
                    value={aadhaar}
                    maxLength={12}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
                  />
                  <Button className="w-full" onClick={handleSendOtp}>
                    Send Aadhaar OTP
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter 6-Digit OTP received on mobile"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button className="w-full" onClick={handleVerifyOtp}>
                    Verify OTP & Sign Agreement
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 5. RENT PAYMENT SECTION & CALCULATOR
export function RentPaymentSection() {
  const [amount, setAmount] = useState("15000");
  const [payMethod, setPayMethod] = useState<"cc" | "upi" | "netbanking">("cc");
  const [modalOpen, setModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const rewardPoints = Math.floor(numAmount * 0.02); // 2% reward points
  const cashbackEst = Math.floor(numAmount * 0.015); // 1.5% cashback savings

  return (
    <div id="pay-rent" className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="grid gap-10 lg:grid-cols-12 items-center relative z-10">
        {/* Left Column: Rent Payment Benefits */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              <Coins className="mr-1.5 size-3.5 text-teal-400" />
              0% Interest & Instant Credit Card Rewards
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="border-teal-500/40 text-teal-300 hover:bg-teal-500/20 text-xs font-bold rounded-xl"
              onClick={() => setHistoryOpen(true)}
            >
              <History className="mr-1.5 size-3.5" /> View Payment History & Receipts
            </Button>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-outfit">
            Pay House Rent & PG Fees <br />
            <span className="hero-gradient-title">Via Credit Card & Earn Rewards.</span>
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Never delay rent payments. Transfer rent directly to your landlord’s bank account or UPI ID using your credit card, earn up to 45 days interest-free credit, credit card reward points, and instant digital receipts for HRA tax claim.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-2xl border border-white/10 bg-slate-955/60 p-4">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <ShieldCheck className="size-4" /> Escrow Safe Guarantee
              </div>
              <p className="text-xs text-zinc-400 mt-1">Funds disbursed instantly to landlord with SMS receipt.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-955/60 p-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Receipt className="size-4" /> Automated HRA Receipts
              </div>
              <p className="text-xs text-zinc-400 mt-1">Instant landlord signed GST rent receipts for IT filing.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quick Payment Box & Reward Estimator */}
        <div className="lg:col-span-6 rounded-3xl border border-white/15 bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <CreditCard className="size-5 text-teal-400" />
              <span className="text-base font-bold text-white">Rent Payment Portal</span>
            </div>
            <Badge variant="outline" className="border-teal-500/40 text-teal-400 text-[11px] font-semibold">
              Instant Transfer
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Monthly Rent Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-zinc-400">₹</span>
                <Input
                  type="number"
                  className="pl-8 h-12 bg-slate-900/90 border-white/15 text-white font-extrabold text-lg focus-visible:ring-teal-400 rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 15000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayMethod("cc")}
                  className={`rounded-xl border p-3 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    payMethod === "cc"
                      ? "border-teal-400 bg-teal-500/20 text-teal-300"
                      : "border-white/10 bg-slate-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="size-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod("upi")}
                  className={`rounded-xl border p-3 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    payMethod === "upi"
                      ? "border-teal-400 bg-teal-500/20 text-teal-300"
                      : "border-white/10 bg-slate-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Wallet className="size-4" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod("netbanking")}
                  className={`rounded-xl border p-3 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    payMethod === "netbanking"
                      ? "border-teal-400 bg-teal-500/20 text-teal-300"
                      : "border-white/10 bg-slate-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Receipt className="size-4" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Estimated Rewards Box */}
            <div className="rounded-2xl bg-gradient-to-r from-teal-950/60 to-cyan-950/60 border border-teal-500/30 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Percent className="size-3.5 text-teal-400" /> Estimated Reward Points:
                </span>
                <span className="font-extrabold text-teal-300">+{rewardPoints.toLocaleString("en-IN")} pts</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Coins className="size-3.5 text-cyan-400" /> Est. CashBack Savings:
                </span>
                <span className="font-extrabold text-cyan-300">~₹{cashbackEst.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                className="h-12 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-[0_0_25px_rgba(45,212,191,0.35)] hover:scale-[1.02] transition-all"
                onClick={() => setModalOpen(true)}
              >
                Pay ₹{numAmount.toLocaleString("en-IN")} Rent Now <ArrowUpRight className="ml-1 size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 border-teal-500/40 text-teal-300 hover:bg-teal-500/20 font-bold text-xs rounded-xl"
                onClick={() => setHistoryOpen(true)}
              >
                <History className="mr-1.5 size-4" /> History Ledger
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RentPaymentModal open={modalOpen} onOpenChange={setModalOpen} initialAmount={amount} payMode={payMethod} />
      <RentHistoryModal open={historyOpen} onOpenChange={setHistoryOpen} />
    </div>
  );
}

// 6. RENT PAYMENT MODAL
export function RentPaymentModal({
  open,
  onOpenChange,
  initialAmount = "15000",
  payMode = "cc",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialAmount?: string;
  payMode?: "cc" | "upi" | "netbanking";
}) {
  const [landlordUpi, setLandlordUpi] = useState("landlord@upi");
  const [landlordName, setLandlordName] = useState("Ramesh Sharma (House Owner)");
  const [rentAmt, setRentAmt] = useState(initialAmount);
  const [processing, setProcessing] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<RentPaymentReceipt | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  useEffect(() => {
    setRentAmt(initialAmount);
  }, [initialAmount]);

  async function handlePay() {
    const amt = parseFloat(rentAmt);
    if (!amt || amt <= 0) {
      toast.error("Please enter a valid rent amount");
      return;
    }
    setProcessing(true);
    try {
      const receipt = await processRentPaymentFn({
        data: {
          landlordName,
          landlordUpi,
          amount: amt,
          paymentMode: payMode,
        },
      });
      setLastReceipt(receipt);
      toast.success("Rent payment transferred instantly! HRA Receipt generated.");
    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-slate-950 text-white border-teal-500/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-teal-400 font-extrabold text-lg">
              <CreditCard className="size-5 text-teal-400" /> Instant Credit Card Rent Transfer
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Transfer rent securely with 256-bit encryption & instant SMS notification to landlord.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {lastReceipt ? (
              <div className="rounded-2xl bg-teal-500/15 border border-teal-500/30 p-5 text-center space-y-3">
                <CheckCircle2 className="mx-auto size-12 text-teal-400 animate-bounce" />
                <h4 className="font-extrabold text-white text-lg">Rent Payment Successful!</h4>
                <p className="text-xs text-zinc-300">
                  ₹{lastReceipt.amount.toLocaleString("en-IN")} transferred to <strong>{lastReceipt.landlordName}</strong>.
                </p>
                <Badge className="bg-teal-400 text-slate-950 font-bold text-xs px-3 py-1">
                  Receipt ID: {lastReceipt.receiptId}
                </Badge>
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs py-5 rounded-xl"
                    onClick={() => {
                      setReceiptModalOpen(true);
                    }}
                  >
                    <Download className="mr-2 size-4" /> Download / Print HRA Receipt
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 text-xs font-bold py-4 rounded-xl"
                    onClick={() => {
                      setLastReceipt(null);
                      onOpenChange(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Landlord Name / Beneficiary
                  </label>
                  <Input
                    className="bg-slate-900 border-white/15 text-white"
                    value={landlordName}
                    onChange={(e) => setLandlordName(e.target.value)}
                    placeholder="Owner's full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Landlord UPI ID / Account Number
                  </label>
                  <Input
                    className="bg-slate-900 border-white/15 text-white"
                    value={landlordUpi}
                    onChange={(e) => setLandlordUpi(e.target.value)}
                    placeholder="e.g. 9876543210@paytm or UPI ID"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Rent Amount (₹)
                  </label>
                  <Input
                    type="number"
                    className="bg-slate-900 border-white/15 text-white font-extrabold text-base"
                    value={rentAmt}
                    onChange={(e) => setRentAmt(e.target.value)}
                    placeholder="Rent amount"
                  />
                </div>

                <div className="rounded-xl bg-slate-900 p-3 text-xs space-y-1.5 border border-white/10">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Convenience Fee:</span>
                    <span className="font-bold text-teal-400">₹0 FREE (Launch Offer)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Credit Card CashBack:</span>
                    <span className="font-bold text-cyan-400">Up to 2% Points (+{Math.floor((parseFloat(rentAmt) || 0) * 0.02)} pts)</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold py-6 text-sm rounded-xl"
                  onClick={handlePay}
                  disabled={processing}
                >
                  {processing ? "Processing Encrypted Payment..." : `Confirm & Transfer ₹${parseFloat(rentAmt || "0").toLocaleString("en-IN")}`}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {lastReceipt && (
        <HraReceiptModal
          open={receiptModalOpen}
          onOpenChange={setReceiptModalOpen}
          receipt={lastReceipt}
        />
      )}
    </>
  );
}

// 7. RENT PAYMENT HISTORY MODAL
export function RentHistoryModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [receipts, setReceipts] = useState<RentPaymentReceipt[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<RentPaymentReceipt | null>(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getRentReceiptsFn()
        .then((res) => {
          setReceipts(res || []);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [open]);

  const totalPaid = receipts.reduce((acc, r) => acc + r.amount, 0);
  const totalRewards = receipts.reduce((acc, r) => acc + r.rewardPoints, 0);
  const totalCashback = receipts.reduce((acc, r) => acc + r.cashbackEst, 0);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 text-white border-teal-500/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-teal-400 font-extrabold text-xl">
              <History className="size-6 text-teal-400" /> Monthly Rent Payment History & Receipts
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Complete history of rent transfers, reward points earned, and official GST HRA receipts for IT filing.
            </DialogDescription>
          </DialogHeader>

          {/* Stats Header */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/40 p-3 text-center">
              <span className="block text-[11px] text-zinc-400 uppercase font-bold">Total Rent Paid</span>
              <span className="text-lg font-extrabold text-white">₹{totalPaid.toLocaleString("en-IN")}</span>
            </div>
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/40 p-3 text-center">
              <span className="block text-[11px] text-zinc-400 uppercase font-bold">Rewards Earned</span>
              <span className="text-lg font-extrabold text-teal-300">+{totalRewards.toLocaleString("en-IN")} pts</span>
            </div>
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/40 p-3 text-center">
              <span className="block text-[11px] text-zinc-400 uppercase font-bold">Est. CashBack</span>
              <span className="text-lg font-extrabold text-cyan-300">₹{totalCashback.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-3 mt-2">
            {loading ? (
              <div className="p-8 text-center text-sm text-zinc-400 animate-pulse">
                Loading payment history...
              </div>
            ) : receipts.length === 0 ? (
              <div className="p-8 text-center text-sm text-zinc-400">
                No past rent payments found. Pay rent above to generate your first receipt!
              </div>
            ) : (
              receipts.map((r) => {
                const dateObj = new Date(r.timestamp);
                const monthStr = dateObj.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
                const dateStr = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

                return (
                  <div
                    key={r.receiptId}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-500/40 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-[11px] font-bold">
                          {monthStr} Rent
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-zinc-400 border-white/10 font-mono">
                          ID: {r.receiptId}
                        </Badge>
                      </div>
                      <h4 className="font-extrabold text-white text-base mt-1">{r.landlordName}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                        <span>Date: {dateStr}</span>
                        <span>•</span>
                        <span>UPI/Acc: {r.landlordUpi}</span>
                        <span>•</span>
                        <span className="uppercase font-semibold text-teal-400">Mode: {r.paymentMode}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-white">₹{r.amount.toLocaleString("en-IN")}</span>
                        <span className="block text-[11px] text-teal-300 font-semibold">+{r.rewardPoints} pts earned</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal-500/40 text-teal-300 hover:bg-teal-500/20 text-xs font-bold rounded-xl"
                        onClick={() => setSelectedReceipt(r)}
                      >
                        <Download className="mr-1.5 size-3.5" /> View HRA Receipt
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedReceipt && (
        <HraReceiptModal
          open={!!selectedReceipt}
          onOpenChange={(open) => {
            if (!open) setSelectedReceipt(null);
          }}
          receipt={selectedReceipt}
        />
      )}
    </>
  );
}

// 8. OFFICIAL HRA RECEIPT MODAL
export function HraReceiptModal({
  open,
  onOpenChange,
  receipt,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receipt: RentPaymentReceipt | null;
}) {
  if (!receipt) return null;

  const dateObj = new Date(receipt.timestamp);
  const monthStr = dateObj.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const dateStr = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-slate-950 text-white border-teal-500/40">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-teal-400 font-extrabold border-b border-white/10 pb-3">
            <span className="flex items-center gap-2">
              <Receipt className="size-5" /> Official HRA Rent Receipt
            </span>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
              Sec 10(13A) IT Act
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Printable Document Box */}
          <div className="rounded-2xl border border-white/15 bg-slate-900/90 p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-white">RENT RECEIPT VOUCHER</h3>
                <p className="text-xs text-teal-300 font-mono">Receipt No: {receipt.receiptId}</p>
                <p className="text-xs text-zinc-400">Transaction ID: {receipt.transactionId}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="border-teal-400 text-teal-300 font-bold text-[10px]">
                  GST REG: {receipt.gstRegistration}
                </Badge>
                <p className="text-xs text-zinc-400 mt-1">Date: {dateStr}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Received From (Tenant)</span>
                <p className="font-extrabold text-white text-sm">Radhika Nayak</p>
                <p className="text-zinc-400">Aadhaar: XXXX-XXXX-4812 (Verified)</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">Paid To (Landlord)</span>
                <p className="font-extrabold text-white text-sm">{receipt.landlordName}</p>
                <p className="text-zinc-400">UPI/Acc: {receipt.landlordUpi}</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-white/10 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Rent Month Period:</span>
                <span className="font-bold text-teal-300">{monthStr}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Payment Mode:</span>
                <span className="font-bold uppercase text-white">{receipt.paymentMode}</span>
              </div>
              <div className="flex justify-between items-center text-base border-t border-white/10 pt-2 font-extrabold">
                <span className="text-white">Amount Paid:</span>
                <span className="text-teal-400 text-xl">₹{receipt.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-white/10 pt-3">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="size-4" /> Digitally Verified via GrihaCare Escrow
              </div>
              <span>Status: <strong className="text-emerald-400">PAID & VERIFIED</strong></span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs py-5 rounded-xl"
              onClick={handlePrint}
            >
              <Printer className="mr-2 size-4" /> Print / Save PDF Receipt
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-xs font-bold py-5 rounded-xl"
              onClick={() => {
                toast.success(`HRA Receipt ${receipt.receiptId} downloaded as PDF!`);
                onOpenChange(false);
              }}
            >
              <Download className="mr-2 size-4" /> Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


