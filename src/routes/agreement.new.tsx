import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  User,
  AlertCircle,
  FileCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/app-shell";
import { useStore } from "@/lib/app-store";
import { properties, inr, type RentalAgreement } from "@/lib/data";
import { createRentalAgreementFn } from "@/api/agreements";
import { addMonths, format } from "date-fns";

export const Route = createFileRoute("/agreement/new")({
  head: () => ({
    meta: [
      { title: "New 11-Month Rental Agreement — GrihaCare" },
      { name: "description", content: "Create a legally compliant 11-month permanent rental agreement." },
    ],
  }),
  component: NewAgreementPage,
});

export function NewAgreementPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const initialPropertyId = searchParams.get("propertyId") || "";

  const selectedProp = properties.find((p) => p.id === initialPropertyId) || properties[0];

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [propertyId, setPropertyId] = useState(selectedProp?.id || "");
  const [propertyTitle, setPropertyTitle] = useState(selectedProp?.title || "");
  const [propertyAddress, setPropertyAddress] = useState(selectedProp?.location || "");
  const [monthlyRent, setMonthlyRent] = useState<number>(selectedProp?.price || 25000);
  const [securityDeposit, setSecurityDeposit] = useState<number>((selectedProp?.price || 25000) * 2);

  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0] || ""
  );
  const [dueDay, setDueDay] = useState<number>(5);
  const [lateFee, setLateFee] = useState<number>(500);
  const [lockInMonths, setLockInMonths] = useState<number>(3);
  const [noticePeriodDays, setNoticePeriodDays] = useState<number>(30);

  const [residentialOnly, setResidentialOnly] = useState(true);
  const [maxOccupants, setMaxOccupants] = useState(4);
  const [sublettingAllowed, setSublettingAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(true);
  const [customTerms, setCustomTerms] = useState<string>("");

  const [tenantName, setTenantName] = useState(user?.name || "Radhika Sharma");
  const [tenantEmail, setTenantEmail] = useState(user?.email || "radhika@example.com");
  const [tenantPhone, setTenantPhone] = useState(user?.phone || "+91 98765 43210");
  const [tenantAadhaar, setTenantAadhaar] = useState("");

  const [ownerName, setOwnerName] = useState(selectedProp?.owner.name || "Vikramaditya Roy");
  const [ownerEmail, setOwnerEmail] = useState("vikram.owner@grihacare.com");
  const [ownerPhone, setOwnerPhone] = useState("+91 98112 33445");
  const [ownerAadhaar, setOwnerAadhaar] = useState("998877665544");

  const [tenantSignature, setTenantSignature] = useState("");

  // Handle Property Selection change
  const handleSelectProperty = (id: string) => {
    setPropertyId(id);
    const p = properties.find((x) => x.id === id);
    if (p) {
      setPropertyTitle(p.title);
      setPropertyAddress(p.location);
      setMonthlyRent(p.price);
      setSecurityDeposit(p.price * 2);
      if (p.owner?.name) setOwnerName(p.owner.name);
    }
  };

  // 11-Month Date Calculations
  const calculatedEndDate = useMemo(() => {
    try {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) return "";
      const end = addMonths(start, 11);
      return format(end, "yyyy-MM-dd");
    } catch {
      return "";
    }
  }, [startDate]);

  const totalInitialPayout = useMemo(() => {
    return Number(monthlyRent) + Number(securityDeposit) + 999; // 999 stamp & processing fee
  }, [monthlyRent, securityDeposit]);

  const handleSubmitDraft = async () => {
    if (!tenantSignature.trim()) {
      toast.error("Please enter your signature / typed full name to proceed");
      return;
    }

    setLoading(true);
    try {
      const payload: Partial<RentalAgreement> = {
        propertyId,
        propertyTitle,
        propertyAddress,
        monthlyRent: Number(monthlyRent),
        securityDeposit: Number(securityDeposit),
        tenureMonths: 11,
        startDate,
        endDate: calculatedEndDate,
        rentDueDay: Number(dueDay),
        lateFeePerDay: Number(lateFee),
        lockInMonths: Number(lockInMonths),
        noticePeriodDays: Number(noticePeriodDays),
        residentialOnly,
        maxOccupants: Number(maxOccupants),
        sublettingAllowed,
        petsAllowed,
        customTerms,
        tenantName,
        tenantEmail,
        tenantPhone,
        tenantAadhaar,
        ownerName,
        ownerEmail,
        ownerPhone,
        ownerAadhaar,
        tenantAccepted: true,
        tenantAcceptedAt: new Date().toISOString(),
        tenantSignature,
        status: "pending_owner",
        createdByRole: "tenant",
      };

      const res = await createRentalAgreementFn({ data: payload as any });
      toast.success("11-Month Rental Agreement created and submitted to property owner!");
      navigate({ to: `/agreement/${res.id}` });
    } catch (err: any) {
      toast.error(err.message || "Failed to create rental agreement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8 pb-16">
        {/* Header */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
                <ShieldCheck className="mr-1.5 size-3.5 text-teal-400" />
                Permanent Rental Flow
              </Badge>
              <Badge variant="outline" className="border-amber-500/30 text-amber-300 bg-amber-500/10 text-xs font-bold">
                11 Months Fixed
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create <span className="hero-gradient-title">11-Month Rental Agreement</span>
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              Legally binding digital agreement wizard with automatic lock-in calculation, vault integration & Stamp Duty setup.
            </p>
          </div>
        </div>

        {/* Wizard Steps indicator */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { num: 1, label: "Property & Rent", icon: Building2 },
            { num: 2, label: "Tenure & Terms", icon: Calendar },
            { num: 3, label: "Parties Info", icon: User },
            { num: 4, label: "Review & Sign", icon: FileCheck },
          ].map((s) => {
            const Icon = s.icon;
            const active = step === s.num;
            const done = step > s.num;
            return (
              <button
                key={s.num}
                onClick={() => done && setStep(s.num)}
                disabled={!done && !active}
                className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border transition-all text-left ${
                  active
                    ? "border-teal-500 bg-teal-500/10 text-white shadow-lg shadow-teal-500/10"
                    : done
                    ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300 cursor-pointer"
                    : "border-white/10 bg-slate-900/40 text-zinc-500"
                }`}
              >
                <div
                  className={`size-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    active
                      ? "bg-teal-400 text-slate-950"
                      : done
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {done ? <CheckCircle2 className="size-4" /> : s.num}
                </div>
                <div className="hidden sm:block overflow-hidden">
                  <p className="text-xs font-bold truncate">{s.label}</p>
                  <p className="text-[10px] text-zinc-400">Step 0{s.num}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main Form Area */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            {/* STEP 1: PROPERTY & RENT */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="size-5 text-teal-400" />
                    Property & Financial Terms
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Select property and verify monthly rental parameters.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-zinc-300 text-xs font-bold mb-1 block">Select Property for Permanent Rent</Label>
                    <select
                      value={propertyId}
                      onChange={(e) => handleSelectProperty(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-400"
                    >
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.location}) — {inr(p.price)}/mo
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Property Title</Label>
                      <Input
                        value={propertyTitle}
                        onChange={(e) => setPropertyTitle(e.target.value)}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Property Full Address</Label>
                      <Input
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Monthly Rent (₹)</Label>
                      <Input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Security Deposit (₹)</Label>
                      <Input
                        type="number"
                        value={securityDeposit}
                        onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5 flex items-start gap-3">
                    <Zap className="size-5 text-teal-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-teal-200">
                      Standard GrihaCare security deposit is typically set to 2 months rent. Refundable upon lease completion subject to inspection.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setStep(2)}
                    className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
                  >
                    Next: Tenure & Terms <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: TENURE & CLAUSES */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="size-5 text-teal-400" />
                    Tenure & Rental Rules
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Standard 11-month agreement rules as per Indian Rent Control regulations.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Lease Agreement Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Lease End Date (Fixed 11 Months)</Label>
                      <Input
                        type="text"
                        value={calculatedEndDate}
                        disabled
                        className="bg-slate-900 border-white/10 text-teal-300 font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Monthly Rent Due Date (Day of Month)</Label>
                      <select
                        value={dueDay}
                        onChange={(e) => setDueDay(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-400"
                      >
                        {[1, 5, 7, 10, 15].map((d) => (
                          <option key={d} value={d}>
                            Every {d}th of the month
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Late Rent Fee per Day (₹)</Label>
                      <Input
                        type="number"
                        value={lateFee}
                        onChange={(e) => setLateFee(Number(e.target.value))}
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Lock-in Period (Months)</Label>
                      <select
                        value={lockInMonths}
                        onChange={(e) => setLockInMonths(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-400"
                      >
                        {[1, 2, 3, 6].map((m) => (
                          <option key={m} value={m}>
                            {m} {m === 1 ? "Month" : "Months"} Lock-in
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-zinc-300 text-xs font-bold mb-1 block">Notice Period (Days)</Label>
                      <select
                        value={noticePeriodDays}
                        onChange={(e) => setNoticePeriodDays(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-400"
                      >
                        {[15, 30, 45, 60].map((d) => (
                          <option key={d} value={d}>
                            {d} Days Notice
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Usage Toggles */}
                  <div className="grid gap-3 sm:grid-cols-2 pt-2">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-slate-950/50 cursor-pointer">
                      <span className="text-xs font-bold text-zinc-300">Residential Use Only</span>
                      <input
                        type="checkbox"
                        checked={residentialOnly}
                        onChange={(e) => setResidentialOnly(e.target.checked)}
                        className="accent-teal-400 size-4 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-slate-950/50 cursor-pointer">
                      <span className="text-xs font-bold text-zinc-300">Pets Allowed</span>
                      <input
                        type="checkbox"
                        checked={petsAllowed}
                        onChange={(e) => setPetsAllowed(e.target.checked)}
                        className="accent-teal-400 size-4 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-slate-950/50 cursor-pointer">
                      <span className="text-xs font-bold text-zinc-300">Sub-letting Allowed</span>
                      <input
                        type="checkbox"
                        checked={sublettingAllowed}
                        onChange={(e) => setSublettingAllowed(e.target.checked)}
                        className="accent-teal-400 size-4 rounded"
                      />
                    </label>

                    <div className="p-3 rounded-xl border border-white/10 bg-slate-950/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">Max Occupants</span>
                      <input
                        type="number"
                        value={maxOccupants}
                        onChange={(e) => setMaxOccupants(Number(e.target.value))}
                        className="w-16 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-right text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-zinc-300 text-xs font-bold mb-1 block">Special Clauses / Custom Additions (Optional)</Label>
                    <textarea
                      rows={2}
                      value={customTerms}
                      onChange={(e) => setCustomTerms(e.target.value)}
                      placeholder="e.g., Tenant will pay society maintenance of ₹2,500 directly by 10th of every month."
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
                  >
                    <ArrowLeft className="mr-1.5 size-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
                  >
                    Next: Parties Info <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PARTIES INFO */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="size-5 text-teal-400" />
                    Tenant & Owner Information
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Provide legal identities for both contracting parties.</p>
                </div>

                <div className="space-y-6">
                  {/* Tenant Details */}
                  <div className="p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                      Tenant Details (First Party)
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Full Legal Name</Label>
                        <Input
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Email Address</Label>
                        <Input
                          value={tenantEmail}
                          onChange={(e) => setTenantEmail(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Phone Number</Label>
                        <Input
                          value={tenantPhone}
                          onChange={(e) => setTenantPhone(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Aadhaar / Passport / ID</Label>
                        <Input
                          value={tenantAadhaar}
                          onChange={(e) => setTenantAadhaar(e.target.value)}
                          placeholder="12-digit Aadhaar number"
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Owner Details */}
                  <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/40 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      Property Owner / Lessor Details (Second Party)
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Owner Full Name</Label>
                        <Input
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Owner Email</Label>
                        <Input
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Owner Phone</Label>
                        <Input
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-300 text-xs font-bold mb-1 block">Owner ID / PAN / Aadhaar</Label>
                        <Input
                          value={ownerAadhaar}
                          onChange={(e) => setOwnerAadhaar(e.target.value)}
                          className="bg-slate-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
                  >
                    <ArrowLeft className="mr-1.5 size-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
                  >
                    Next: Review & Sign <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & ELECTRONIC SIGNATURE */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileCheck className="size-5 text-teal-400" />
                    Review Summary & Digital Acceptance
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Please review all clauses carefully before applying your electronic signature.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">Property Title</span>
                      <span className="font-bold text-white">{propertyTitle}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">Tenure</span>
                      <span className="font-bold text-teal-300">11 Months ({startDate} to {calculatedEndDate})</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">Monthly Rent</span>
                      <span className="font-bold text-white">{inr(monthlyRent)} / month</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">Security Deposit</span>
                      <span className="font-bold text-white">{inr(securityDeposit)}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">Lock-in Period</span>
                      <span className="font-bold text-amber-300">{lockInMonths} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Stamp & Processing Fee</span>
                      <span className="font-bold text-emerald-400">₹999 (Included in vault)</span>
                    </div>
                  </div>

                  {/* Digital Signature */}
                  <div className="p-5 rounded-2xl border border-teal-500/30 bg-teal-500/5 space-y-3">
                    <Label className="text-teal-300 text-xs font-bold block">
                      Tenant Electronic Acceptance & Signature
                    </Label>
                    <p className="text-[11px] text-zinc-400">
                      By typing your full legal name below, you confirm that you have read and agreed to all terms of this 11-month rental deed as Tenant.
                    </p>
                    <Input
                      value={tenantSignature}
                      onChange={(e) => setTenantSignature(e.target.value)}
                      placeholder="Type your full legal name (e.g. Radhika Sharma)"
                      className="bg-slate-950 border-teal-500/40 text-teal-300 font-mono text-sm tracking-wider"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <AlertCircle className="size-4 text-amber-400 shrink-0" />
                    After submission, an automated notification will be dispatched to owner ({ownerName}) for digital sign-off.
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
                  >
                    <ArrowLeft className="mr-1.5 size-4" /> Back
                  </Button>
                  <Button
                    onClick={handleSubmitDraft}
                    disabled={loading}
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs px-8 py-5 rounded-2xl shadow-teal-glow"
                  >
                    {loading ? "Submitting Draft..." : "Submit Agreement to Owner"} <Sparkles className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary Card */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="size-4 text-teal-400" />
                Agreement Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Tenure Duration</span>
                  <span className="text-white font-extrabold text-sm">11 Months</span>
                  <span className="text-zinc-400 block text-[11px] mt-0.5">Auto-expires before 12-month registration threshold</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Key Dates</span>
                  <p className="text-zinc-300 font-mono mt-1">
                    Start: <span className="text-white font-bold">{startDate || "Not set"}</span>
                  </p>
                  <p className="text-zinc-300 font-mono">
                    End: <span className="text-teal-300 font-bold">{calculatedEndDate || "Not set"}</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Initial Financial Payout</span>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>First Month Rent</span>
                      <span className="text-white font-bold">{inr(monthlyRent)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Security Deposit</span>
                      <span className="text-white font-bold">{inr(securityDeposit)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>E-Stamp & Vault Fee</span>
                      <span className="text-white font-bold">₹999</span>
                    </div>
                    <div className="border-t border-white/10 pt-1.5 flex justify-between font-bold text-teal-300 text-sm">
                      <span>Total Estimated</span>
                      <span>{inr(totalInitialPayout)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-teal-500/20 bg-teal-500/10">
                  <p className="text-[11px] text-teal-200 leading-relaxed">
                    🔒 Stored in <strong>Rental Vault</strong> with SHA-256 digital verification hash upon full sign-off.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
