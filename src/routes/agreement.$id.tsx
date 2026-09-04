import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Printer,
  RefreshCw,
  ArrowLeft,
  Building2,
  User,
  Zap,
  Lock,
  ExternalLink,
  Check,
  AlertTriangle,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/app-shell";
import { useStore } from "@/lib/app-store";
import { inr, rentalAgreements, type RentalAgreement } from "@/lib/data";
import {
  getRentalAgreementFn,
  tenantAcceptAgreementFn,
  ownerAcceptAgreementFn,
  rejectAgreementFn,
} from "@/api/agreements";
import { MoveInPassportModal } from "@/components/passport-modal";
import { format } from "date-fns";

export const Route = createFileRoute("/agreement/$id")({
  head: ({ loaderData }: any) => ({
    meta: [
      { title: `Agreement #${loaderData?.id || ""} — GrihaCare` },
      { name: "description", content: "View and manage 11-month permanent rental agreement details." },
    ],
  }),
  loader: async ({ params }) => {
    try {
      const res = await getRentalAgreementFn({ data: { id: params.id } });
      return res;
    } catch {
      const found = rentalAgreements.find((a) => a.id === params.id);
      return found || null;
    }
  },
  component: AgreementDetailPage,
});

export function AgreementDetailPage() {
  const agreementFromLoader = Route.useLoaderData() as RentalAgreement | null;
  const navigate = useNavigate();
  const { user } = useStore();

  const [agreement, setAgreement] = useState<RentalAgreement | null>(agreementFromLoader);
  const [ownerSignatureInput, setOwnerSignatureInput] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [passportOpen, setPassportOpen] = useState(false);

  useEffect(() => {
    if (agreementFromLoader) setAgreement(agreementFromLoader);
  }, [agreementFromLoader]);

  if (!agreement) {
    return (
      <AppShell>
        <div className="py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Agreement Not Found</h1>
          <p className="text-zinc-400 text-sm">The rental agreement you are looking for does not exist or has been removed.</p>
          <Button asChild className="bg-teal-400 text-slate-950 font-bold">
            <Link to="/agreements">Back to My Agreements</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const isOwner = user?.userType === "Property Owner" || agreement.ownerEmail === user?.email;
  const isTenant = user?.userType === "Home Seeker" || agreement.tenantEmail === user?.email;

  const handleOwnerAccept = async () => {
    if (!ownerSignatureInput.trim()) {
      toast.error("Please enter your signature / full name to accept");
      return;
    }
    setActionLoading(true);
    try {
      const updated = await ownerAcceptAgreementFn({
        data: { agreementId: agreement.id, ownerSignature: ownerSignatureInput, ownerEmail: user?.email || agreement.ownerEmail },
      });
      setAgreement(updated);
      toast.success("Agreement officially accepted & activated! Stored in Rental Vault.");
    } catch (err: any) {
      toast.error(err.message || "Failed to accept agreement");
    } finally {
      setActionLoading(false);
    }
  };

  const handleTenantAccept = async () => {
    setActionLoading(true);
    try {
      const updated = await tenantAcceptAgreementFn({
        data: { agreementId: agreement.id, tenantSignature: agreement.tenantName, tenantEmail: user?.email || agreement.tenantEmail },
      });
      setAgreement(updated);
      toast.success("Tenant acceptance recorded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to accept agreement");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please specify a reason for rejection");
      return;
    }
    setActionLoading(true);
    try {
      const updated = await rejectAgreementFn({
        data: {
          agreementId: agreement.id,
          rejectedBy: isOwner ? "owner" : "tenant",
          userEmail: user?.email || agreement.tenantEmail,
          reason: rejectReason,
        },
      });
      setAgreement(updated);
      setShowRejectModal(false);
      toast.success("Agreement rejected.");
    } catch (err: any) {
      toast.error(err.message || "Failed to reject agreement");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-6 pb-16">
        {/* Top bar navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/agreements"
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to My Agreements
          </Link>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 text-zinc-300 hover:text-white text-xs"
              onClick={() => window.open(`/agreement/pdf/${agreement.id}`, "_blank")}
            >
              <Printer className="mr-1.5 size-3.5" /> Print PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-teal-500/30 text-teal-300 hover:bg-teal-500/10 text-xs"
              onClick={() => navigate({ to: "/agreement/vault" })}
            >
              <Lock className="mr-1.5 size-3.5" /> Open Rental Vault
            </Button>
          </div>
        </div>

        {/* Contract Header Banner */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
                11-Month Permanent Agreement
              </Badge>
              <Badge className="bg-slate-800 text-zinc-300 border-white/10 text-xs">
                ID: #{agreement.id}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {agreement.propertyTitle}
            </h1>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Building2 className="size-3.5 text-teal-400" /> {agreement.propertyAddress}
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-start md:items-end gap-2">
            <div className="text-right">
              <span className="text-xs text-zinc-400 block font-bold uppercase">Monthly Rent</span>
              <span className="text-2xl font-extrabold text-teal-300">{inr(agreement.monthlyRent)}</span>
            </div>
            {agreement.status === "completed" && (
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold">
                <CheckCircle2 className="mr-1.5 size-3.5" /> Fully Executed & Vaulted
              </Badge>
            )}
            {agreement.status === "pending_owner" && (
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold animate-pulse">
                <Clock className="mr-1.5 size-3.5" /> Awaiting Owner Signature
              </Badge>
            )}
          </div>
        </div>

        {/* Action Callout if Pending Signatures */}
        {agreement.status === "pending_owner" && (
          <div className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="size-6 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-sm font-extrabold text-amber-300">Action Required: Owner Signature</h3>
                <p className="text-xs text-amber-200/80">
                  Tenant ({agreement.tenantName}) has signed and submitted this 11-month agreement deed. Property owner digital acceptance is required.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
              <label className="text-xs font-bold text-zinc-300 block">
                Owner Legal Signature / Type Full Name:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={ownerSignatureInput}
                  onChange={(e) => setOwnerSignatureInput(e.target.value)}
                  placeholder={`Type full name (e.g. ${agreement.ownerName})`}
                  className="bg-slate-900 border-amber-500/40 text-amber-300 font-mono text-sm flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleOwnerAccept}
                    disabled={actionLoading}
                    className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs px-6 rounded-xl"
                  >
                    <Check className="mr-1.5 size-4" /> Accept & Activate Agreement
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectModal(true)}
                    className="border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs px-4 rounded-xl"
                  >
                    <XCircle className="mr-1.5 size-4" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Contract Body */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Document Content */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-8">
            {/* 1. Contracting Parties */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
                1. Contracting Parties
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/50 space-y-1.5">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">LESSOR / OWNER (Second Party)</span>
                  <p className="text-white font-extrabold text-sm">{agreement.ownerName}</p>
                  <p className="text-zinc-400">Email: {agreement.ownerEmail}</p>
                  <p className="text-zinc-400">Phone: {agreement.ownerPhone}</p>
                  <p className="text-zinc-400">ID / Aadhaar: {agreement.ownerAadhaar || "Verified"}</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/50 space-y-1.5">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">LESSEE / TENANT (First Party)</span>
                  <p className="text-white font-extrabold text-sm">{agreement.tenantName}</p>
                  <p className="text-zinc-400">Email: {agreement.tenantEmail}</p>
                  <p className="text-zinc-400">Phone: {agreement.tenantPhone}</p>
                  <p className="text-zinc-400">ID / Aadhaar: {agreement.tenantAadhaar || "Verified"}</p>
                </div>
              </div>
            </div>

            {/* 2. Tenure & Key Dates */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
                2. Tenure & Duration (Mandatory 11 Months)
              </h2>
              <div className="grid gap-3 sm:grid-cols-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-zinc-500 text-[10px] font-bold block">Start Date</span>
                  <span className="text-white font-mono font-bold text-sm">{agreement.startDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-zinc-500 text-[10px] font-bold block">End Date (11th Month)</span>
                  <span className="text-teal-300 font-mono font-bold text-sm">{agreement.endDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-zinc-500 text-[10px] font-bold block">Lock-In Period</span>
                  <span className="text-amber-300 font-bold text-sm">{agreement.lockInMonths} Months</span>
                </div>
              </div>
            </div>

            {/* 3. Financial Terms */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
                3. Financial Schedule & Deposits
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <span className="text-zinc-400">Monthly Rent:</span>
                  <p className="text-lg font-bold text-white">{inr(agreement.monthlyRent)} / month</p>
                  <p className="text-zinc-500 text-[11px]">Due on or before the {agreement.rentDueDay}th of each month.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <span className="text-zinc-400">Security Deposit:</span>
                  <p className="text-lg font-bold text-amber-300">{inr(agreement.securityDeposit)}</p>
                  <p className="text-zinc-500 text-[11px]">Refundable upon handover after deduction for damages.</p>
                </div>
              </div>
            </div>

            {/* 4. Usage & Rules */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
                4. House Rules & Permitted Use
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-white/5">
                  <CheckCircle2 className="size-4 text-teal-400" />
                  <span>Residential occupancy only ({agreement.maxOccupants} occupants max)</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-white/5">
                  <CheckCircle2 className="size-4 text-teal-400" />
                  <span>Notice Period: {agreement.noticePeriodDays} days after lock-in</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-white/5">
                  {agreement.petsAllowed ? (
                    <CheckCircle2 className="size-4 text-teal-400" />
                  ) : (
                    <XCircle className="size-4 text-red-400" />
                  )}
                  <span>Pets Allowed: {agreement.petsAllowed ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-white/5">
                  {agreement.sublettingAllowed ? (
                    <CheckCircle2 className="size-4 text-teal-400" />
                  ) : (
                    <XCircle className="size-4 text-red-400" />
                  )}
                  <span>Sub-letting Allowed: {agreement.sublettingAllowed ? "Yes" : "No"}</span>
                </div>
              </div>

              {agreement.customTerms && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 text-xs text-zinc-300">
                  <span className="font-bold text-white block mb-1">Additional Special Clauses:</span>
                  <p className="leading-relaxed">{agreement.customTerms}</p>
                </div>
              )}
            </div>

            {/* 5. Digital Signatures */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/10 pb-2">
                5. Execution & Digital Signatures
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="p-4 rounded-2xl border border-teal-500/30 bg-teal-500/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-teal-300">Tenant Signature</span>
                    {agreement.tenantAccepted ? (
                      <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px]">Signed</Badge>
                    ) : (
                      <Badge variant="outline" className="text-zinc-500 text-[10px]">Pending</Badge>
                    )}
                  </div>
                  <p className="font-mono text-sm font-bold text-white">{agreement.tenantSignature || agreement.tenantName}</p>
                  {agreement.tenantAcceptedAt && (
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Timestamp: {format(new Date(agreement.tenantAcceptedAt), "yyyy-MM-dd HH:mm:ss")}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-300">Owner Signature</span>
                    {agreement.ownerAccepted ? (
                      <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px]">Signed</Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-300 text-[10px]">Pending</Badge>
                    )}
                  </div>
                  <p className="font-mono text-sm font-bold text-white">
                    {agreement.ownerSignature || (agreement.ownerAccepted ? agreement.ownerName : "Awaiting signature")}
                  </p>
                  {agreement.ownerAcceptedAt && (
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Timestamp: {format(new Date(agreement.ownerAcceptedAt), "yyyy-MM-dd HH:mm:ss")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Timeline & Quick Actions */}
          <aside className="space-y-6">
            {/* Audit Trail Timeline */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="size-4 text-teal-400" /> Audit Trail & History
              </h3>

              <div className="space-y-4 relative pl-4 border-l border-white/10 text-xs">
                {/* Draft Created */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-0 size-2.5 rounded-full bg-teal-400 ring-4 ring-slate-900" />
                  <p className="font-bold text-white">Draft Created</p>
                  <p className="text-[10px] text-zinc-400">
                    {format(new Date(agreement.createdAt), "MMM d, yyyy HH:mm")}
                  </p>
                </div>

                {/* Tenant Signed */}
                <div className="relative">
                  <div
                    className={`absolute -left-[21px] top-0 size-2.5 rounded-full ring-4 ring-slate-900 ${
                      agreement.tenantAccepted ? "bg-emerald-400" : "bg-zinc-600"
                    }`}
                  />
                  <p className="font-bold text-white">Tenant Signed</p>
                  <p className="text-[10px] text-zinc-400">
                    {agreement.tenantAcceptedAt
                      ? format(new Date(agreement.tenantAcceptedAt), "MMM d, yyyy HH:mm")
                      : "Pending"}
                  </p>
                </div>

                {/* Owner Signed */}
                <div className="relative">
                  <div
                    className={`absolute -left-[21px] top-0 size-2.5 rounded-full ring-4 ring-slate-900 ${
                      agreement.ownerAccepted ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                  <p className="font-bold text-white">Owner Signed</p>
                  <p className="text-[10px] text-zinc-400">
                    {agreement.ownerAcceptedAt
                      ? format(new Date(agreement.ownerAcceptedAt), "MMM d, yyyy HH:mm")
                      : "Pending owner review"}
                  </p>
                </div>

                {/* Vaulted */}
                {agreement.vaultHash && (
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 size-2.5 rounded-full bg-teal-300 ring-4 ring-slate-900" />
                    <p className="font-bold text-teal-300">Vaulted SHA-256</p>
                    <p className="text-[9px] text-zinc-400 font-mono truncate">{agreement.vaultHash}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Actions</h3>

              <Button
                onClick={() => setPassportOpen(true)}
                variant="outline"
                className="w-full border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs rounded-xl"
              >
                <FileCheck2 className="mr-1.5 size-4" /> Record Move-In Passport
              </Button>

              <Button
                asChild
                className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl"
              >
                <Link to="/agreement/renew/$id" params={{ id: agreement.id }}>
                  <RefreshCw className="mr-1.5 size-4" /> Renew Agreement (Next 11 Mos)
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/10 text-zinc-300 hover:text-white text-xs rounded-xl"
                onClick={() => window.open(`/agreement/pdf/${agreement.id}`, "_blank")}
              >
                <Download className="mr-1.5 size-4" /> Download Printable Deed
              </Button>
            </div>
          </aside>
        </div>
      </div>

      <MoveInPassportModal
        open={passportOpen}
        onOpenChange={setPassportOpen}
        propertyId={agreement.propertyId}
        propertyTitle={agreement.propertyTitle}
        agreementId={agreement.id}
        onPassportCreated={() => {
          toast.success("Move-In Passport linked to agreement & saved in Rental Vault!");
        }}
      />
    </AppShell>
  );
}

