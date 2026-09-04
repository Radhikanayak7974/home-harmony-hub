import { useState } from "react";
import {
  ShieldCheck,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Zap,
  Droplet,
  FileCheck,
  Lock,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createMoveInPassportFn } from "@/api/agreements";
import { type MoveInDamageRecord, type MoveInInventoryItem } from "@/lib/data";

interface PassportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle?: string;
  propertyId?: string;
  agreementId?: string;
  tenantName?: string;
  ownerName?: string;
  onSuccess?: () => void;
  onPassportCreated?: (passport: any) => void;
}

export function MoveInPassportModal({
  open,
  onOpenChange,
  propertyTitle = "Sunlit 2BHK near Coaching Hub",
  propertyId = "p1",
  agreementId = "agr-101",
  tenantName = "Radhika Nayak",
  ownerName = "Ananya Rao",
  onSuccess,
  onPassportCreated,
}: PassportModalProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  // Meter Readings
  const [elecKwh, setElecKwh] = useState<number>(4820);
  const [waterKl, setWaterKl] = useState<number>(340);
  const [moveInDate, setMoveInDate] = useState<string>(
    new Date().toISOString().split("T")[0] || "2026-09-01"
  );

  // Pre-Existing Damages
  const [damages, setDamages] = useState<MoveInDamageRecord[]>([
    {
      id: "d-1",
      room: "Living Room",
      description: "Paint scratch behind sofa wall area",
      severity: "Minor",
    },
  ]);
  const [newDamageRoom, setNewDamageRoom] = useState("");
  const [newDamageDesc, setNewDamageDesc] = useState("");
  const [newDamageSeverity, setNewDamageSeverity] = useState<"Minor" | "Moderate" | "Major">("Minor");

  // Inventory Checklist
  const [inventory, setInventory] = useState<MoveInInventoryItem[]>([
    { name: "AC Remote Control", condition: "Good", count: 2 },
    { name: "Geyser (25L Storage)", condition: "Good", count: 2 },
    { name: "Ceiling Fans", condition: "Good", count: 4 },
    { name: "Main Entrance Key Sets", condition: "Good", count: 3 },
  ]);

  const [tenantSignature, setTenantSignature] = useState(tenantName);

  const handleAddDamage = () => {
    if (!newDamageRoom.trim() || !newDamageDesc.trim()) {
      toast.error("Please provide room and damage description");
      return;
    }
    const record: MoveInDamageRecord = {
      id: `d-${Date.now()}`,
      room: newDamageRoom,
      description: newDamageDesc,
      severity: newDamageSeverity,
    };
    setDamages([...damages, record]);
    setNewDamageRoom("");
    setNewDamageDesc("");
    toast.success("Damage record added to Move-In Passport");
  };

  const handleRemoveDamage = (id: string) => {
    setDamages(damages.filter((d) => d.id !== id));
  };

  const handleInventoryConditionChange = (
    index: number,
    condition: "Good" | "Fair" | "Damaged" | "Missing"
  ) => {
    const updated = [...inventory];
    if (updated[index]) {
      updated[index].condition = condition;
      setInventory(updated);
    }
  };

  const handleSubmitPassport = async () => {
    if (!tenantSignature.trim()) {
      toast.error("Please enter your signature / typed full name to lock passport");
      return;
    }

    setLoading(true);
    try {
      const created = await createMoveInPassportFn({
        data: {
          agreementId,
          propertyId,
          propertyTitle,
          tenantName,
          ownerName,
          moveInDate,
          meterReadings: {
            electricityKwh: Number(elecKwh),
            waterKl: Number(waterKl),
            readingDate: moveInDate,
          },
          damages,
          inventory,
          tenantSignedAt: new Date().toISOString(),
        },
      });

      toast.success("Move-In Passport locked & saved in Rental Vault! 📸🔒");
      onOpenChange(false);
      if (onSuccess) onSuccess();
      if (onPassportCreated) onPassportCreated(created);
    } catch (err: any) {
      toast.error(err.message || "Failed to create move-in passport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-white rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] uppercase font-bold px-2.5 py-0.5">
              <ShieldCheck className="mr-1 size-3 text-teal-400" /> Digital Passport
            </Badge>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 bg-emerald-500/10 text-[10px]">
              Vault Sealed
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-white">
            Digital Move-In Passport
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-300">
            Document initial property condition, meter readings & inventory before handover. Stored securely in <strong>Rental Vault</strong>.
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {[
            { stepNum: 1, label: "Meters" },
            { stepNum: 2, label: "Damages" },
            { stepNum: 3, label: "Inventory" },
            { stepNum: 4, label: "Sign & Vault" },
          ].map((s) => (
            <div
              key={s.stepNum}
              className={`p-2 rounded-xl border text-center transition-all ${
                step === s.stepNum
                  ? "border-teal-500 bg-teal-500/10 text-teal-300 font-bold"
                  : step > s.stepNum
                  ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
                  : "border-white/5 bg-slate-950/40 text-zinc-500"
              }`}
            >
              <span className="text-[10px] block">Step 0{s.stepNum}</span>
              <span className="text-xs truncate block">{s.label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: METER READINGS */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="size-4 text-amber-400" /> Initial Meter Readings
            </h3>

            <div className="space-y-3">
              <div>
                <Label className="text-zinc-300 text-xs font-bold mb-1 block">Move-In Date</Label>
                <Input
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="bg-slate-950 border-white/10 text-white"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                  <Label className="text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <Zap className="size-3.5" /> Electricity Meter (kWh)
                  </Label>
                  <Input
                    type="number"
                    value={elecKwh}
                    onChange={(e) => setElecKwh(Number(e.target.value))}
                    placeholder="e.g. 4820"
                    className="bg-slate-900 border-white/10 text-white font-mono text-base font-bold"
                  />
                  <p className="text-[10px] text-zinc-400">Current initial electricity meter unit reading.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                  <Label className="text-cyan-300 text-xs font-bold flex items-center gap-1.5">
                    <Droplet className="size-3.5" /> Water Meter (KL / Units)
                  </Label>
                  <Input
                    type="number"
                    value={waterKl}
                    onChange={(e) => setWaterKl(Number(e.target.value))}
                    placeholder="e.g. 340"
                    className="bg-slate-900 border-white/10 text-white font-mono text-base font-bold"
                  />
                  <p className="text-[10px] text-zinc-400">Initial water meter unit reading.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <Button
                onClick={() => setStep(2)}
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
              >
                Next: Existing Damages <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: PRE-EXISTING DAMAGES */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-400" /> Pre-Existing Damages Record
            </h3>
            <p className="text-xs text-zinc-400">
              Record any existing scratches, cracks, or flaws to protect your security deposit.
            </p>

            {/* List of logged damages */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {damages.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{d.room}</span>
                      <Badge
                        className={`text-[9px] px-2 py-0 ${
                          d.severity === "Major"
                            ? "bg-red-500/20 text-red-300 border-red-500/30"
                            : d.severity === "Moderate"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-teal-500/20 text-teal-300 border-teal-500/30"
                        }`}
                      >
                        {d.severity}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 mt-0.5">{d.description}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveDamage(d.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form to add damage */}
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-teal-300 block">+ Add New Damage Entry</span>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  value={newDamageRoom}
                  onChange={(e) => setNewDamageRoom(e.target.value)}
                  placeholder="Room (e.g. Master Bedroom)"
                  className="bg-slate-900 border-white/10 text-xs text-white"
                />
                <Input
                  value={newDamageDesc}
                  onChange={(e) => setNewDamageDesc(e.target.value)}
                  placeholder="Flaw Description (e.g. Door scratch)"
                  className="bg-slate-900 border-white/10 text-xs text-white"
                />
                <select
                  value={newDamageSeverity}
                  onChange={(e) => setNewDamageSeverity(e.target.value as any)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white"
                >
                  <option value="Minor">Minor Flaw</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Major">Major Defect</option>
                </select>
              </div>
              <Button
                type="button"
                onClick={handleAddDamage}
                size="sm"
                variant="outline"
                className="border-teal-500/30 text-teal-300 hover:bg-teal-500/10 text-xs rounded-xl"
              >
                <Plus className="mr-1 size-3.5" /> Save Damage Entry
              </Button>
            </div>

            <div className="flex justify-between pt-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
              >
                Next: Inventory Checklist <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: INVENTORY CHECKLIST */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="size-4 text-teal-400" /> Key & Appliance Inventory
            </h3>
            <p className="text-xs text-zinc-400">
              Verify existence and working condition of major fixtures provided by landlord.
            </p>

            <div className="space-y-2">
              {inventory.map((item, idx) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-[10px] text-zinc-500">Qty: {item.count}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {(["Good", "Fair", "Damaged", "Missing"] as const).map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => handleInventoryConditionChange(idx, cond)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          item.condition === cond
                            ? "bg-teal-400 text-slate-950"
                            : "bg-slate-900 border border-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs px-6 rounded-xl"
              >
                Next: Review & Vault Lock <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & VAULT LOCK */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="size-4 text-emerald-400" /> Digital Sign-Off & Vault Lock
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Property</span>
                <span className="font-bold text-white">{propertyTitle}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Move-In Date</span>
                <span className="font-bold text-teal-300">{moveInDate}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Meter Readings</span>
                <span className="font-mono font-bold text-amber-300">
                  {elecKwh} kWh Elec · {waterKl} KL Water
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Recorded Damages</span>
                <span className="font-bold text-white">{damages.length} Flaw Entries</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-teal-500/30 bg-teal-500/5 space-y-2">
              <Label className="text-teal-300 text-xs font-bold block">
                Tenant Digital Signature
              </Label>
              <Input
                value={tenantSignature}
                onChange={(e) => setTenantSignature(e.target.value)}
                placeholder="Type full legal name"
                className="bg-slate-950 border-teal-500/40 text-teal-300 font-mono text-sm"
              />
              <p className="text-[10px] text-zinc-400">
                🔒 Sealed with SHA-256 cryptographic hash and saved directly inside your <strong>Rental Vault</strong>.
              </p>
            </div>

            <div className="flex justify-between pt-3">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="border-white/10 text-zinc-400 hover:text-white text-xs px-5 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitPassport}
                disabled={loading}
                className="bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs px-7 rounded-xl shadow-teal-glow"
              >
                {loading ? "Sealing Passport..." : "Lock Passport in Rental Vault"} <Sparkles className="ml-1.5 size-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
