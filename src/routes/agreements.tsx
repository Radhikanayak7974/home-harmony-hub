import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/cards";
import { useStore } from "@/lib/app-store";
import { inr, type RentalAgreement, type RentalAgreementStatus } from "@/lib/data";
import { getUserAgreementsFn } from "@/api/agreements";

export const Route = createFileRoute("/agreements")({
  head: () => ({
    meta: [
      { title: "My Agreements — GrihaCare" },
      { name: "description", content: "View and manage your 11-month rental agreements." },
    ],
  }),
  component: AgreementsPage,
});

const statusConfig: Record<RentalAgreementStatus, { label: string; color: string; icon: typeof Clock }> = {
  draft: { label: "Draft", color: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30", icon: FileText },
  pending_tenant: { label: "Awaiting Tenant", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: Clock },
  pending_owner: { label: "Awaiting Owner", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Clock },
  accepted: { label: "Accepted", color: "bg-teal-500/20 text-teal-300 border-teal-500/30", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: XCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: XCircle },
  expired: { label: "Expired", color: "bg-orange-500/20 text-orange-300 border-orange-500/30", icon: AlertTriangle },
};

function AgreementsPage() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useState(() => {
    (async () => {
      try {
        const email = user?.email || "radhika@example.com";
        const res = await getUserAgreementsFn({ data: { userEmail: email } });
        setAgreements(res);
      } catch {
        /* fallback empty */
      } finally {
        setLoading(false);
      }
    })();
  });

  const filtered = useMemo(() => {
    let list = agreements;
    if (filter !== "all") list = list.filter((a) => a.status === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.propertyTitle.toLowerCase().includes(q) ||
          a.propertyAddress.toLowerCase().includes(q) ||
          a.tenantName.toLowerCase().includes(q) ||
          a.ownerName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [agreements, filter, search]);

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="relative z-10 space-y-2">
            <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
              <Sparkles className="mr-1.5 size-3.5 text-teal-400" />
              11-Month Rental Agreements
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My <span className="hero-gradient-title">Agreements</span>
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              View, manage, and track all your permanent rental agreements in one place.
            </p>
          </div>
          <div className="relative z-10">
            <Button
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs px-6 py-5 rounded-2xl shadow-teal-glow"
              onClick={() => navigate({ to: "/agreement/new" })}
            >
              <Plus className="mr-1.5 size-4" /> New Agreement
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by property, tenant or owner…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {["all", "draft", "pending_tenant", "pending_owner", "completed", "rejected"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={filter === s ? "default" : "outline"}
                className={`text-xs font-bold capitalize rounded-xl whitespace-nowrap ${
                  filter === s
                    ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
                    : "border-white/10 text-zinc-400 hover:text-white"
                }`}
                onClick={() => setFilter(s)}
              >
                {s === "all" ? "All" : s === "pending_tenant" ? "Awaiting Tenant" : s === "pending_owner" ? "Awaiting Owner" : s}
              </Button>
            ))}
          </div>
        </div>

        {/* Agreements List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center space-y-3">
              <FileText className="mx-auto size-10 text-zinc-500" />
              <h3 className="text-lg font-bold text-white">No Agreements Found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {agreements.length === 0
                  ? "You don't have any rental agreements yet. Create your first 11-month agreement to get started."
                  : "No agreements match your current filters."}
              </p>
              <Button
                size="sm"
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs rounded-xl"
                onClick={() => navigate({ to: "/agreement/new" })}
              >
                Create New Agreement
              </Button>
            </div>
          ) : (
            filtered.map((agr) => {
              const cfg = statusConfig[agr.status];
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={agr.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-teal-500/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-500/20 text-teal-300">
                      <FileText className="size-6" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-teal-400">{agr.id}</span>
                        <Badge className={`border text-[10px] font-bold ${cfg.color}`}>
                          <StatusIcon className="mr-1 size-3" /> {cfg.label}
                        </Badge>
                      </div>
                      <h3 className="text-base font-bold text-white truncate">{agr.propertyTitle}</h3>
                      <p className="text-xs text-zinc-400">
                        {inr(agr.monthlyRent)}/month · {agr.durationMonths} months · {agr.startDate} → {agr.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold border-white/20 text-white hover:bg-white/10 rounded-xl"
                      onClick={() => navigate({ to: "/agreement/$id", params: { id: agr.id } })}
                    >
                      <Eye className="mr-1 size-3" /> View
                    </Button>
                    {agr.status === "completed" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs font-bold border-white/20 text-white hover:bg-white/10 rounded-xl"
                          onClick={() => window.open(`/agreement/pdf/${agr.id}`, "_blank")}
                        >
                          <Download className="mr-1 size-3" /> Download PDF
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 rounded-xl"
                          onClick={() => navigate({ to: "/agreement/renew/$id", params: { id: agr.id } })}
                        >
                          <RefreshCw className="mr-1 size-3" /> Renew
                        </Button>
                      </>
                    )}
                    {(agr.status === "pending_tenant" || agr.status === "pending_owner" || agr.status === "draft") && (
                      <Button
                        size="sm"
                        className="text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 rounded-xl"
                        onClick={() => navigate({ to: "/agreement/$id", params: { id: agr.id } })}
                      >
                        Action / Sign <ArrowRight className="ml-1 size-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}
