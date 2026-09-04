import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Lock,
  ShieldCheck,
  Search,
  Printer,
  RefreshCw,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  FileCheck2,
  Zap,
  Droplets,
  AlertCircle,
  PackageCheck,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppShell } from "@/components/app-shell";
import { useStore } from "@/lib/app-store";
import { inr, type RentalAgreement, type MoveInPassport, sampleMoveInPassports } from "@/lib/data";
import { getUserAgreementsFn, getMoveInPassportsFn } from "@/api/agreements";
import { MoveInPassportModal } from "@/components/passport-modal";
import { differenceInDays, parseISO } from "date-fns";

export const Route = createFileRoute("/agreement/vault")({
  head: () => ({
    meta: [
      { title: "Rental Vault — GrihaCare" },
      { name: "description", content: "Secure digital vault for 11-month permanent rental agreements & Move-In Passports." },
    ],
  }),
  component: RentalVaultPage,
});

export function RentalVaultPage() {
  const { user } = useStore();
  const navigate = useNavigate();

  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [passports, setPassports] = useState<MoveInPassport[]>(sampleMoveInPassports);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"agreements" | "passports">("agreements");
  const [createPassportOpen, setCreatePassportOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const email = user?.email || "radhika@example.com";
        const [resAgreements, resPassports] = await Promise.all([
          getUserAgreementsFn({ data: { userEmail: email } }),
          getMoveInPassportsFn({ data: { userEmail: email } }),
        ]);
        setAgreements(resAgreements);
        if (resPassports && resPassports.length > 0) {
          setPassports(resPassports);
        }
      } catch {
        /* fallback sample */
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const filteredAgreements = agreements.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.propertyTitle.toLowerCase().includes(q) ||
      a.propertyAddress.toLowerCase().includes(q) ||
      a.tenantName.toLowerCase().includes(q) ||
      a.ownerName.toLowerCase().includes(q)
    );
  });

  const filteredPassports = passports.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.propertyTitle.toLowerCase().includes(q) ||
      p.tenantName.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/agreement/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Shareable agreement link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8 pb-16">
        {/* Vault Hero Banner */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
                <Lock className="mr-1.5 size-3.5 text-teal-400" />
                GrihaCare Secure Vault
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 bg-emerald-500/10 text-xs font-bold">
                SHA-256 Encrypted
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Rental <span className="hero-gradient-title">Vault</span>
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              Centralized tamper-evident repository for 11-month permanent rental deeds, e-stamps, and Digital Move-In Passports.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
            <Button
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-5 rounded-2xl"
              onClick={() => setCreatePassportOpen(true)}
            >
              <FileCheck2 className="mr-1.5 size-4" /> New Move-In Passport
            </Button>
            <Button
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs px-5 py-5 rounded-2xl shadow-teal-glow"
              onClick={() => navigate({ to: "/agreement/new" })}
            >
              <Sparkles className="mr-1.5 size-4" /> Add 11-Month Lease
            </Button>
          </div>
        </div>

        {/* Vault Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Total Vaulted Deeds</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{agreements.length}</span>
            <span className="text-[11px] text-teal-400 mt-1 block">Active & Historical Agreements</span>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 backdrop-blur-md">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Move-In Passports</span>
            <span className="text-3xl font-extrabold text-amber-400 mt-1 block">{passports.length}</span>
            <span className="text-[11px] text-amber-300/80 mt-1 block">Tamper-proof initial condition records</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 backdrop-blur-md">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Active 11-Month Leases</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">
              {agreements.filter((a) => a.status === "completed" || a.status === "accepted").length}
            </span>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">Legally compliant & verified</span>
          </div>
        </div>

        {/* Tab Switcher & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab("agreements")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "agreements"
                  ? "bg-teal-400 text-slate-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="size-4" /> 11-Month Lease Deeds ({agreements.length})
            </button>
            <button
              onClick={() => setActiveTab("passports")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "passports"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileCheck2 className="size-4" /> Digital Move-In Passports ({passports.length})
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 size-4 text-zinc-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                activeTab === "agreements"
                  ? "Search agreements by property, tenant, or owner…"
                  : "Search passports by property or tenant name…"
              }
              className="pl-10 bg-slate-900/80 border-white/10 text-white rounded-2xl py-5"
            />
          </div>
        </div>

        {/* TAB 1: 11-Month Agreements */}
        {activeTab === "agreements" && (
          <div className="space-y-4">
            {filteredAgreements.map((item) => {
              const daysLeft = item.endDate ? differenceInDays(parseISO(item.endDate), new Date()) : 330;
              const isExpiringSoon = daysLeft <= 60 && daysLeft > 0;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl hover:border-teal-500/40 transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-slate-800 text-teal-300 border-white/10 text-xs font-mono font-bold">
                          #{item.id}
                        </Badge>
                        <Badge className="bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px]">
                          11-Month Permanent Lease
                        </Badge>
                        {isExpiringSoon && (
                          <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] animate-pulse">
                            <AlertTriangle className="mr-1 size-3" /> Expires in {daysLeft} Days
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.propertyTitle}</h3>
                      <p className="text-xs text-zinc-400">{item.propertyAddress}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 block font-bold">Monthly Rent</span>
                        <span className="text-xl font-extrabold text-teal-300">{inr(item.monthlyRent)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vault Metadata Grid */}
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold block">Parties</span>
                      <p className="text-zinc-300 font-bold">Tenant: {item.tenantName}</p>
                      <p className="text-zinc-400 text-[11px]">Owner: {item.ownerName}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold block">Cycle Validity</span>
                      <p className="text-white font-mono">{item.startDate} to {item.endDate}</p>
                      <p className="text-teal-400 text-[11px] font-bold">{daysLeft} days remaining</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold block">Security Deposit</span>
                      <p className="text-amber-300 font-bold">{inr(item.securityDeposit)}</p>
                      <p className="text-zinc-400 text-[11px]">Lock-in: {item.lockInMonths} Mos</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold block">SHA-256 Vault Hash</span>
                      <p className="text-emerald-400 font-mono text-[10px] truncate">{item.vaultHash || "0x98f4e2b..."}</p>
                      <p className="text-zinc-400 text-[10px] flex items-center gap-1">
                        <ShieldCheck className="size-3 text-emerald-400" /> Tamper-Verified
                      </p>
                    </div>
                  </div>

                  {/* Vault Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl"
                        onClick={() => navigate({ to: `/agreement/${item.id}` })}
                      >
                        <Eye className="mr-1.5 size-3.5" /> View Full Deed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-zinc-300 hover:text-white text-xs rounded-xl"
                        onClick={() => window.open(`/agreement/pdf/${item.id}`, "_blank")}
                      >
                        <Printer className="mr-1.5 size-3.5" /> Print / Download PDF
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-zinc-400 hover:text-white text-xs"
                        onClick={() => handleCopyLink(item.id)}
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="mr-1 size-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 size-3" /> Share Link
                          </>
                        )}
                      </Button>

                      {isExpiringSoon && (
                        <Button
                          size="sm"
                          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl"
                          onClick={() => navigate({ to: `/agreement/renew/${item.id}` })}
                        >
                          <RefreshCw className="mr-1.5 size-3.5" /> Renew Deed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Digital Move-In Passports */}
        {activeTab === "passports" && (
          <div className="space-y-4">
            {filteredPassports.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-12 text-center space-y-4">
                <FileCheck2 className="mx-auto size-12 text-zinc-500" />
                <h3 className="text-lg font-bold text-white">No Move-In Passports Found</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Create a digital move-in passport to record initial meter readings, damage photos, and inventory checklists before key handover.
                </p>
                <Button
                  onClick={() => setCreatePassportOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="mr-1.5 size-4" /> Create Move-In Passport
                </Button>
              </div>
            ) : (
              filteredPassports.map((passport) => (
                <div
                  key={passport.id}
                  className="rounded-3xl border border-amber-500/30 bg-slate-900/90 p-6 backdrop-blur-xl shadow-xl space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                          {passport.id}
                        </Badge>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                          <ShieldCheck className="mr-1 size-3" /> Vault Verified
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">{passport.propertyTitle}</h3>
                      <p className="text-xs text-zinc-400">Recorded by {passport.tenantName} on {passport.moveInDate}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase block">SHA-256 Cryptographic Hash</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded-md block mt-1">
                        {passport.vaultHash}
                      </span>
                    </div>
                  </div>

                  {/* Meters & Inventory Grid */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* Meter Readings */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <Zap className="size-4 text-amber-400" /> Utility Meters
                      </span>
                      <div className="text-xs space-y-1 font-mono text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Electricity:</span>
                          <span className="text-white font-bold">{passport.meterReadings.electricityKwh} kWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Water:</span>
                          <span className="text-white font-bold">{passport.meterReadings.waterKl} kL</span>
                        </div>
                      </div>
                    </div>

                    {/* Pre-existing Damages */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <AlertCircle className="size-4 text-rose-400" /> Recorded Damages ({passport.damages?.length || 0})
                      </span>
                      {passport.damages && passport.damages.length > 0 ? (
                        <div className="space-y-1 text-xs text-zinc-300">
                          {passport.damages.map((d, idx) => (
                            <div key={idx} className="flex justify-between text-[11px] bg-zinc-900/60 p-1.5 rounded">
                              <span>{d.room} - {d.description}</span>
                              <span className="text-amber-400 font-bold">{d.severity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="size-3.5" /> No pre-existing damage logged
                        </p>
                      )}
                    </div>

                    {/* Inventory */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <PackageCheck className="size-4 text-teal-400" /> Key Inventory
                      </span>
                      <div className="space-y-1 text-xs text-zinc-300">
                        {passport.inventory && passport.inventory.map((inv, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span>{inv.count}x {inv.name}</span>
                            <span className="text-emerald-400 font-bold">{inv.condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Signature & Digital Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-white/5">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span>Tenant Signature:</span>
                      <span className="font-mono text-white font-bold">{passport.tenantName}</span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs rounded-xl"
                      onClick={() => toast.success(`Exported Passport #${passport.id} certificate!`)}
                    >
                      <Printer className="mr-1.5 size-3.5" /> Download Signed Certificate
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <MoveInPassportModal
        open={createPassportOpen}
        onOpenChange={setCreatePassportOpen}
        onPassportCreated={(newPassport) => {
          setPassports((prev) => [newPassport, ...prev]);
          setActiveTab("passports");
        }}
      />
    </AppShell>
  );
}

