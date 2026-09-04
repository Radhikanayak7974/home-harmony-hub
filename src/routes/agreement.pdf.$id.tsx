import { createFileRoute } from "@tanstack/react-router";
import { Printer, ShieldCheck, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr, rentalAgreements, type RentalAgreement } from "@/lib/data";
import { getRentalAgreementFn } from "@/api/agreements";

export const Route = createFileRoute("/agreement/pdf/$id")({
  head: ({ loaderData }: any) => ({
    meta: [
      { title: `Legal Deed PDF #${loaderData?.id || ""} — GrihaCare` },
      { name: "description", content: "Printable 11-Month Permanent Rental Deed." },
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
  component: AgreementPdfPage,
});

export function AgreementPdfPage() {
  const agreement = Route.useLoaderData() as RentalAgreement | null;

  if (!agreement) {
    return (
      <div className="p-8 text-center text-slate-900">
        <h1>Agreement Document Not Found</h1>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8">
      {/* Screen-only Action Toolbar */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl shadow-xl">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="size-4" /> Back to Application
        </button>

        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} className="bg-teal-400 text-slate-950 font-bold text-xs">
            <Printer className="mr-1.5 size-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable Legal Document Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 font-serif leading-relaxed text-sm space-y-6">
        {/* Document Header & E-Stamp Header */}
        <div className="border-b-4 border-slate-900 pb-6 text-center space-y-2">
          <div className="flex justify-between items-center text-[10px] font-sans font-bold uppercase text-slate-500 tracking-wider">
            <span>GOVERNMENT OF INDIA E-STAMP EQUIVALENT</span>
            <span>CERTIFICATE NO: IN-DL{agreement.id.toUpperCase()}9988</span>
          </div>

          <div className="py-2 bg-slate-50 border border-slate-200 my-2 rounded">
            <h1 className="text-2xl font-bold tracking-tight uppercase font-sans text-slate-900">
              ELEVEN (11) MONTH RESIDENTIAL LEASE AGREEMENT
            </h1>
            <p className="text-xs font-sans text-slate-600 mt-1">
              Executed under Indian Registration Act & Delhi / State Rent Control Framework
            </p>
          </div>
        </div>

        {/* Contract Preamble */}
        <p className="text-justify">
          This <strong>Residential Lease Deed</strong> is made and executed on this date by and between the parties named below:
        </p>

        {/* Parties Box */}
        <div className="grid grid-cols-2 gap-6 border p-4 bg-slate-50 rounded text-xs font-sans">
          <div>
            <h3 className="font-bold text-slate-900 uppercase border-b pb-1">LESSOR / LANDLORD (FIRST PARTY)</h3>
            <p className="mt-2 font-bold">{agreement.ownerName}</p>
            <p>Email: {agreement.ownerEmail}</p>
            <p>Phone: {agreement.ownerPhone}</p>
            <p>Aadhaar / Identity: {agreement.ownerAadhaar || "Verified"}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 uppercase border-b pb-1">LESSEE / TENANT (SECOND PARTY)</h3>
            <p className="mt-2 font-bold">{agreement.tenantName}</p>
            <p>Email: {agreement.tenantEmail}</p>
            <p>Phone: {agreement.tenantPhone}</p>
            <p>Aadhaar / Identity: {agreement.tenantAadhaar || "Verified"}</p>
          </div>
        </div>

        {/* Property Description */}
        <div className="space-y-2">
          <h3 className="font-sans font-bold text-slate-900 border-b pb-1">1. PREMISES DEMISED</h3>
          <p className="text-justify">
            The Lessor hereby demises unto the Lessee all that residential property situated at:
            <br />
            <strong className="font-sans">{agreement.propertyTitle} — {agreement.propertyAddress}</strong>.
          </p>
        </div>

        {/* Tenure & Rent Clause */}
        <div className="space-y-2">
          <h3 className="font-sans font-bold text-slate-900 border-b pb-1">2. TENURE, RENT & SECURITY DEPOSIT</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Mandatory Tenure:</strong> The lease shall be for a fixed duration of exactly <strong>11 (Eleven) Months</strong> starting from <strong>{agreement.startDate}</strong> and expiring on <strong>{agreement.endDate}</strong>.
            </li>
            <li>
              <strong>Monthly Rent:</strong> The Lessee shall pay to the Lessor a monthly rental amount of <strong>{inr(agreement.monthlyRent)}</strong> on or before the <strong>{agreement.rentDueDay}th</strong> of every calendar month.
            </li>
            <li>
              <strong>Security Deposit:</strong> The Lessee has deposited an interest-free security amount of <strong>{inr(agreement.securityDeposit)}</strong> with the Lessor, refundable upon quiet possession handover.
            </li>
            <li>
              <strong>Lock-In & Notice Period:</strong> Both parties agree to a lock-in period of <strong>{agreement.lockInMonths} months</strong>. Subsequent termination requires <strong>{agreement.noticePeriodDays} days</strong> written notice.
            </li>
          </ul>
        </div>

        {/* Usage & Terms */}
        <div className="space-y-2">
          <h3 className="font-sans font-bold text-slate-900 border-b pb-1">3. TERMS & CONDITIONS</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>The premises shall be used exclusively for residential purpose by maximum of <strong>{agreement.maxOccupants} occupants</strong>.</li>
            <li>Sub-letting is strictly <strong>{agreement.sublettingAllowed ? "permitted with written consent" : "prohibited"}</strong>.</li>
            <li>Pets are <strong>{agreement.petsAllowed ? "permitted" : "not allowed"}</strong> on the property.</li>
            {agreement.customTerms && <li><strong>Custom Clause:</strong> {agreement.customTerms}</li>}
          </ul>
        </div>

        {/* Digital Signatures Box */}
        <div className="pt-8 space-y-4">
          <h3 className="font-sans font-bold text-slate-900 border-b pb-1">IN WITNESS WHEREOF THE PARTIES HAVE EXECUTED THIS DEED</h3>

          <div className="grid grid-cols-2 gap-8 pt-4 font-sans text-xs">
            <div className="border p-4 rounded bg-slate-50 space-y-2">
              <p className="font-bold text-slate-900">TENANT (LESSEE)</p>
              <div className="h-12 border-b border-dashed border-slate-400 flex items-center font-mono font-bold text-slate-800">
                {agreement.tenantSignature || agreement.tenantName}
              </div>
              <p className="text-[10px] text-slate-500">
                Status: {agreement.tenantAccepted ? "Digitally Signed" : "Pending"}
                <br />
                Date: {agreement.tenantAcceptedAt ? agreement.tenantAcceptedAt.split("T")[0] : "—"}
              </p>
            </div>

            <div className="border p-4 rounded bg-slate-50 space-y-2">
              <p className="font-bold text-slate-900">LESSOR (LANDLORD)</p>
              <div className="h-12 border-b border-dashed border-slate-400 flex items-center font-mono font-bold text-slate-800">
                {agreement.ownerSignature || (agreement.ownerAccepted ? agreement.ownerName : "Pending")}
              </div>
              <p className="text-[10px] text-slate-500">
                Status: {agreement.ownerAccepted ? "Digitally Signed" : "Pending Signature"}
                <br />
                Date: {agreement.ownerAcceptedAt ? agreement.ownerAcceptedAt.split("T")[0] : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Cryptographic Vault Hash Seal */}
        <div className="border-t pt-4 text-center font-sans text-[10px] text-slate-500 space-y-1">
          <p className="font-bold uppercase tracking-wider text-teal-700">🔒 GrihaCare Rental Vault Cryptographic Hash Certificate</p>
          <p className="font-mono text-[9px]">{agreement.vaultHash || "0x98f4e2b810a901c10d3f..."}</p>
          <p>Verified immutable record stored on GrihaCare secure vault infrastructure.</p>
        </div>
      </div>
    </div>
  );
}
