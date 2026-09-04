import { useState, useMemo } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  RefreshCw,
  Sparkles,
  Calendar,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/app-shell";
import { inr, rentalAgreements, type RentalAgreement } from "@/lib/data";
import { getRentalAgreementFn, renewAgreementFn } from "@/api/agreements";
import { addDays, addMonths, format, parseISO } from "date-fns";

export const Route = createFileRoute("/agreement/renew/$id")({
  head: ({ loaderData }: any) => ({
    meta: [
      { title: `Renew Agreement #${loaderData?.id || ""} — GrihaCare` },
      { name: "description", content: "Renew 11-month permanent rental agreement for the next cycle." },
    ],
  }),
  loader: async ({ params }) => {
    try {
      const res = await getRentalAgreementFn({ data: { agreementId: params.id } });
      return res;
    } catch {
      const found = rentalAgreements.find((a) => a.id === params.id);
      return found || null;
    }
  },
  component: AgreementRenewalPage,
});

export function AgreementRenewalPage() {
  const navigate = useNavigate();
  const existing = Route.useLoaderData() as RentalAgreement | null;

  if (!existing) {
    return (
      <AppShell>
        <div className="py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Agreement Not Found</h1>
          <Button asChild className="bg-teal-400 text-slate-950 font-bold">
            <Link to="/agreements">Back to My Agreements</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  // Calculate new start date (day after old end date)
  const defaultNewStartDate = useMemo(() => {
    try {
      if (!existing.endDate) return new Date().toISOString().split("T")[0];
      const end = parseISO(existing.endDate);
      const nextStart = addDays(end, 1);
      return format(nextStart, "yyyy-MM-dd");
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  }, [existing.endDate]);

  const [newStartDate, setNewStartDate] = useState(defaultNewStartDate);
  const [rentIncrementPct, setRentIncrementPct] = useState<number>(5);
  const [newMonthlyRent, setNewMonthlyRent] = useState<number>(
    Math.round(existing.monthlyRent * 1.05)
  );
  const [newSecurityDeposit, setNewSecurityDeposit] = useState<number>(existing.securityDeposit);
  const [renewalNotes, setRenewalNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle % increment quick buttons
  const applyIncrement = (pct: number) => {
    setRentIncrementPct(pct);
    setNewMonthlyRent(Math.round(existing.monthlyRent * (1 + pct / 100)));
  };

  // Auto calculate new end date (11 months from new start date)
  const newEndDate = useMemo(() => {
    try {
      if (!newStartDate) return "";
      const start = parseISO(newStartDate);
      if (isNaN(start.getTime())) return "";
      const end = addMonths(start, 11);
      return format(end, "yyyy-MM-dd");
    } catch {
      return "";
    }
  }, [newStartDate]);

  const handleCreateRenewal = async () => {
    setLoading(true);
    try {
      const res = await renewAgreementFn({
        data: {
          agreementId: existing.id,
          newStartDate: newStartDate || "",
          monthlyRent: Number(newMonthlyRent),
          securityDeposit: Number(newSecurityDeposit),
        },
      });
      toast.success("11-Month Renewal draft generated successfully!");
      navigate({ to: `/agreement/${res.id}` });
    } catch (err: any) {
      toast.error(err.message || "Failed to renew agreement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8 pb-16">
        {/* Header */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
                <RefreshCw className="mr-1.5 size-3.5 text-teal-400" />
                11-Month Renewal Wizard
              </Badge>
              <Badge variant="outline" className="border-amber-500/30 text-amber-300 bg-amber-500/10 text-xs font-bold">
                Next Cycle
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Renew <span className="hero-gradient-title">Rental Deed</span>
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              Seamlessly extend your stay for another 11 months with automated date calculations and rent adjustment.
            </p>
          </div>
        </div>

        {/* Property Reference Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-3">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Current Lease Information</span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-3">
            <div>
              <h2 className="text-xl font-bold text-white">{existing.propertyTitle}</h2>
              <p className="text-xs text-zinc-400">{existing.propertyAddress}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 block font-bold">Current Rent</span>
              <span className="text-xl font-extrabold text-white">{inr(existing.monthlyRent)}</span>
            </div>
          </div>
        </div>

        {/* Renewal Parameters Form */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Sparkles className="size-5 text-teal-400" /> New 11-Month Term Parameters
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-zinc-300 text-xs font-bold mb-1 block">New Cycle Start Date</Label>
              <Input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="bg-slate-950 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-zinc-300 text-xs font-bold mb-1 block">New Cycle End Date (Fixed 11 Months)</Label>
              <Input
                type="text"
                value={newEndDate}
                disabled
                className="bg-slate-900 border-white/10 text-teal-300 font-mono font-bold"
              />
            </div>
          </div>

          {/* Rent Adjustment Controls */}
          <div className="space-y-3 p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5">
            <Label className="text-teal-300 text-xs font-bold block">Annual Rent Revision / Increment</Label>
            <div className="flex items-center gap-2">
              {[0, 5, 8, 10].map((pct) => (
                <Button
                  key={pct}
                  type="button"
                  size="sm"
                  variant={rentIncrementPct === pct ? "default" : "outline"}
                  className={`text-xs font-bold rounded-xl ${
                    rentIncrementPct === pct
                      ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
                      : "border-white/10 text-zinc-300"
                  }`}
                  onClick={() => applyIncrement(pct)}
                >
                  +{pct}% Increment
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div>
                <Label className="text-zinc-300 text-xs font-bold mb-1 block">Revised Monthly Rent (₹)</Label>
                <Input
                  type="number"
                  value={newMonthlyRent}
                  onChange={(e) => setNewMonthlyRent(Number(e.target.value))}
                  className="bg-slate-950 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-zinc-300 text-xs font-bold mb-1 block">Security Deposit (₹)</Label>
                <Input
                  type="number"
                  value={newSecurityDeposit}
                  onChange={(e) => setNewSecurityDeposit(Number(e.target.value))}
                  className="bg-slate-950 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-zinc-300 text-xs font-bold mb-1 block">Renewal Notes / Terms (Optional)</Label>
            <textarea
              rows={2}
              value={renewalNotes}
              onChange={(e) => setRenewalNotes(e.target.value)}
              placeholder="e.g. Painting and deep cleaning completed before starting new term."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => navigate({ to: `/agreement/${existing.id}` })}
              className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
            >
              <ArrowLeft className="mr-1.5 size-4" /> Cancel
            </Button>
            <Button
              onClick={handleCreateRenewal}
              disabled={loading}
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs px-8 py-5 rounded-2xl shadow-teal-glow"
            >
              {loading ? "Generating Renewal..." : "Generate 11-Month Renewal Deed"} <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
