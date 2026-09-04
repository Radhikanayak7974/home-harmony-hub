import { createServerFn } from "@tanstack/react-start";
import { addMonths, lastDayOfMonth, format, differenceInDays, parseISO } from "date-fns";
import {
  rentalAgreements,
  sampleMoveInPassports,
  type RentalAgreement,
  type RentalAgreementStatus,
  type MoveInPassport,
  type Notification,
  notifications,
} from "@/lib/data";

export type { RentalAgreement, RentalAgreementStatus, MoveInPassport };

const moveInPassportDatabase: MoveInPassport[] = [...sampleMoveInPassports];

// In-memory database for rental agreements
const agreementDatabase: RentalAgreement[] = [...rentalAgreements];

/**
 * Calculate end date for an 11-month agreement, handling month-end and leap-year edge cases.
 * If start is Jan 31, end is Dec 31 (11 months later = last day of that month).
 */
export function calculateAgreementEndDate(startDateStr: string, months: number): string {
  const start = parseISO(startDateStr);
  const endMonth = addMonths(start, months);
  const startMonthEnd = lastDayOfMonth(start);
  if (start.getDate() === startMonthEnd.getDate()) {
    const endMonthEnd = lastDayOfMonth(endMonth);
    return format(endMonthEnd, "yyyy-MM-dd");
  }
  const endDate = new Date(endMonth);
  endDate.setDate(endDate.getDate() - 1);
  return format(endDate, "yyyy-MM-dd");
}

/** Generate unique agreement ID */
function genAgreementId(): string {
  return `agr-${Math.floor(100000 + Math.random() * 900000)}`;
}

/** Push an agreement notification into the existing notification system */
function pushAgreementNotification(title: string, body: string) {
  const id = `n-agr-${Date.now()}`;
  notifications.unshift({
    id,
    tab: "Bookings",
    title,
    body,
    time: "Just now",
    read: false,
  });
}

// ─── 1. Create Agreement ────────────────────────────────────────────────────

export interface CreateAgreementPayload {
  propertyId?: string;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhone?: string;
  tenantAddress?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  propertyTitle?: string;
  propertyAddress?: string;
  propertyType?: string;
  bedrooms?: number;
  furnishingStatus?: string;
  monthlyRent?: number;
  securityDeposit?: number;
  startDate?: string;
  endDate?: string;
  noticePeriodDays?: number;
  rentDueDay?: number;
  lockInMonths?: number;
  lateFeePerDay?: number;
  residentialOnly?: boolean;
  maxOccupants?: number;
  sublettingAllowed?: boolean;
  petsAllowed?: boolean;
  customTerms?: string;
  maintenanceResponsibility?: "tenant" | "owner" | "shared";
  utilityResponsibility?: "tenant" | "owner" | "shared";
  tenantSignature?: string;
  tenantAccepted?: boolean;
  tenantAcceptedAt?: string;
  status?: RentalAgreementStatus;
  createdByRole?: "tenant" | "owner";
}

export const createRentalAgreementFn = createServerFn({ method: "POST" })
  .validator((data: CreateAgreementPayload) => {
    if (!data.tenantName?.trim()) throw new Error("Tenant name is required");
    if (!data.ownerName?.trim()) throw new Error("Owner name is required");
    if (!data.startDate) throw new Error("Start date is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const endDate = data.endDate || calculateAgreementEndDate(data.startDate!, 11);
    const now = new Date().toISOString();
    const agreement: RentalAgreement = {
      id: genAgreementId(),
      propertyId: data.propertyId || "p1",
      tenantName: data.tenantName || "",
      tenantEmail: data.tenantEmail || "",
      tenantPhone: data.tenantPhone || "",
      tenantAddress: data.tenantAddress || "Bengaluru",
      tenantAadhaar: data.tenantSignature ? "VERIFIED" : undefined,
      tenantAccepted: data.tenantAccepted,
      tenantAcceptedAt: data.tenantAcceptedAt,
      tenantSignature: data.tenantSignature,
      ownerName: data.ownerName || "",
      ownerEmail: data.ownerEmail || "",
      ownerPhone: data.ownerPhone || "",
      ownerAddress: data.ownerAddress || "Bengaluru",
      ownerAccepted: false,
      propertyTitle: data.propertyTitle || "Residential Flat",
      propertyAddress: data.propertyAddress || "Bengaluru",
      propertyType: data.propertyType || "2 BHK Apartment",
      bedrooms: data.bedrooms || 2,
      furnishingStatus: data.furnishingStatus || "Semi-Furnished",
      monthlyRent: data.monthlyRent || 25000,
      securityDeposit: data.securityDeposit || 50000,
      startDate: data.startDate!,
      endDate,
      durationMonths: 11,
      tenureMonths: 11,
      noticePeriodDays: data.noticePeriodDays || 30,
      rentDueDay: data.rentDueDay || 5,
      lateFeePerDay: data.lateFeePerDay || 500,
      lockInMonths: data.lockInMonths || 3,
      residentialOnly: data.residentialOnly ?? true,
      maxOccupants: data.maxOccupants || 4,
      sublettingAllowed: data.sublettingAllowed ?? false,
      petsAllowed: data.petsAllowed ?? true,
      customTerms: data.customTerms || "",
      maintenanceResponsibility: "tenant",
      utilityResponsibility: "tenant",
      status: data.status || "pending_owner",
      createdAt: now,
      updatedAt: now,
      vaultHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      createdByRole: data.createdByRole || "tenant",
    };
    agreementDatabase.unshift(agreement);
    pushAgreementNotification(
      "New 11-Month Rental Agreement Created",
      `Agreement for ${agreement.propertyTitle} submitted by ${agreement.tenantName} awaiting owner acceptance.`
    );
    return agreement;
  });

// ─── 2. Get Agreement ───────────────────────────────────────────────────────

export const getRentalAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId?: string; id?: string; userEmail?: string }) => {
    const targetId = data.id || data.agreementId;
    if (!targetId) throw new Error("Agreement ID is required");
    return { targetId, userEmail: data.userEmail };
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.targetId);
    if (!agr) throw new Error("Agreement not found");
    return agr;
  });

// ─── 3. Update Draft ────────────────────────────────────────────────────────

export const updateRentalAgreementDraftFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string; updates: Partial<CreateAgreementPayload> }) => {
    if (!data.agreementId) throw new Error("Agreement ID is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    if (agr.status !== "draft") throw new Error("Only draft agreements can be edited");
    const u = data.updates;
    if (u.tenantName) agr.tenantName = u.tenantName;
    if (u.tenantEmail) agr.tenantEmail = u.tenantEmail;
    if (u.tenantPhone) agr.tenantPhone = u.tenantPhone;
    if (u.tenantAddress) agr.tenantAddress = u.tenantAddress;
    if (u.ownerName) agr.ownerName = u.ownerName;
    if (u.ownerEmail) agr.ownerEmail = u.ownerEmail;
    if (u.ownerPhone) agr.ownerPhone = u.ownerPhone;
    if (u.ownerAddress) agr.ownerAddress = u.ownerAddress;
    if (u.monthlyRent && u.monthlyRent > 0) agr.monthlyRent = u.monthlyRent;
    if (u.securityDeposit !== undefined) agr.securityDeposit = u.securityDeposit;
    if (u.noticePeriodDays !== undefined) agr.noticePeriodDays = u.noticePeriodDays;
    if (u.rentDueDay !== undefined) agr.rentDueDay = u.rentDueDay;
    if (u.furnishingStatus) agr.furnishingStatus = u.furnishingStatus;
    if (u.startDate) {
      agr.startDate = u.startDate;
      agr.endDate = calculateAgreementEndDate(u.startDate, 11);
    }
    agr.updatedAt = new Date().toISOString();
    return agr;
  });

// ─── 4. Submit Agreement (draft → pending_tenant) ──────────────────────────

export const submitRentalAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string }) => data)
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    if (agr.status !== "draft") throw new Error("Only draft agreements can be submitted");
    agr.status = "pending_tenant";
    agr.updatedAt = new Date().toISOString();
    pushAgreementNotification(
      "Agreement awaiting tenant review",
      `Agreement for ${agr.propertyTitle} is waiting for ${agr.tenantName}'s review and acceptance.`
    );
    return agr;
  });

// ─── 5. Tenant Accept ──────────────────────────────────────────────────────

export const tenantAcceptAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string; tenantSignature?: string; tenantEmail?: string }) => {
    if (!data.agreementId) throw new Error("Agreement ID is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    agr.status = "pending_owner";
    agr.tenantAccepted = true;
    agr.tenantAcceptedAt = new Date().toISOString();
    if (data.tenantSignature) agr.tenantSignature = data.tenantSignature;
    agr.updatedAt = new Date().toISOString();
    pushAgreementNotification(
      "Tenant accepted agreement",
      `${agr.tenantName} has accepted the agreement for ${agr.propertyTitle}. Awaiting owner confirmation.`
    );
    return agr;
  });

// ─── 6. Owner Accept ───────────────────────────────────────────────────────

export const ownerAcceptAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string; ownerSignature?: string; ownerEmail?: string }) => {
    if (!data.agreementId) throw new Error("Agreement ID is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    const now = new Date().toISOString();
    agr.status = "completed";
    agr.ownerAccepted = true;
    agr.ownerAcceptedAt = now;
    agr.completedAt = now;
    if (data.ownerSignature) agr.ownerSignature = data.ownerSignature;
    agr.updatedAt = now;
    pushAgreementNotification(
      "Agreement completed! 🎉",
      `Rental agreement for ${agr.propertyTitle} has been fully accepted by both parties. You can now download the agreement document.`
    );
    return agr;
  });

// ─── 7. Reject Agreement ───────────────────────────────────────────────────

export const rejectAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string; rejectedBy?: "tenant" | "owner"; userEmail?: string; reason?: string }) => {
    if (!data.agreementId) throw new Error("Agreement ID is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    agr.status = "rejected";
    agr.rejectedAt = new Date().toISOString();
    if (data.rejectedBy) agr.rejectedBy = data.rejectedBy;
    if (data.reason) agr.rejectionReason = data.reason;
    agr.updatedAt = new Date().toISOString();
    pushAgreementNotification(
      "Agreement rejected",
      `The agreement for ${agr.propertyTitle} has been rejected.`
    );
    return agr;
  });

// ─── 8. Cancel Draft ────────────────────────────────────────────────────────

export const cancelAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string }) => data)
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    if (agr.status !== "draft") throw new Error("Only draft agreements can be cancelled");
    agr.status = "cancelled";
    agr.updatedAt = new Date().toISOString();
    return agr;
  });

// ─── 9. Get User's Agreements ───────────────────────────────────────────────

export const getUserAgreementsFn = createServerFn({ method: "POST" })
  .validator((data: { userEmail: string }) => {
    if (!data.userEmail) throw new Error("User email is required");
    return data;
  })
  .handler(async ({ data }): Promise<RentalAgreement[]> => {
    return agreementDatabase.filter(
      (a) => a.tenantEmail === data.userEmail || a.ownerEmail === data.userEmail
    );
  });

// ─── 10. Renew Agreement ────────────────────────────────────────────────────

export const renewAgreementFn = createServerFn({ method: "POST" })
  .validator((data: { existingAgreementId?: string; agreementId?: string; newStartDate: string; monthlyRent?: number; newMonthlyRent?: number; securityDeposit?: number; newSecurityDeposit?: number; renewalNotes?: string }) => {
    const id = data.existingAgreementId || data.agreementId;
    if (!id) throw new Error("Agreement ID is required");
    if (!data.newStartDate) throw new Error("New start date is required");
    return { ...data, targetId: id };
  })
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const original = agreementDatabase.find((a) => a.id === data.targetId);
    if (!original) throw new Error("Original agreement not found");
    const endDate = calculateAgreementEndDate(data.newStartDate, 11);
    const now = new Date().toISOString();
    const renewed: RentalAgreement = {
      ...original,
      id: genAgreementId(),
      startDate: data.newStartDate,
      endDate,
      monthlyRent: data.newMonthlyRent ?? data.monthlyRent ?? original.monthlyRent,
      securityDeposit: data.newSecurityDeposit ?? data.securityDeposit ?? original.securityDeposit,
      status: "pending_owner",
      createdAt: now,
      updatedAt: now,
      tenantAcceptedAt: now,
      tenantAccepted: true,
      ownerAccepted: false,
      ownerAcceptedAt: undefined,
      completedAt: undefined,
      rejectedAt: undefined,
      rejectedBy: undefined,
      renewedFromId: original.id,
      vaultHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
    };
    agreementDatabase.unshift(renewed);
    pushAgreementNotification(
      "Agreement renewal initiated",
      `A 11-month renewal agreement for ${renewed.propertyTitle} has been created based on ${original.id}.`
    );
    return renewed;
  });

export const renewRentalAgreementFn = renewAgreementFn;

// ─── 11. Get Agreement PDF Data ─────────────────────────────────────────────

export const getAgreementPdfDataFn = createServerFn({ method: "POST" })
  .validator((data: { agreementId: string }) => data)
  .handler(async ({ data }): Promise<RentalAgreement> => {
    const agr = agreementDatabase.find((a) => a.id === data.agreementId);
    if (!agr) throw new Error("Agreement not found");
    return agr;
  });

// ─── 12. Get Agreement Notifications ────────────────────────────────────────

export const getAgreementNotificationsFn = createServerFn({ method: "POST" })
  .validator((data: { userEmail: string }) => {
    if (!data.userEmail) throw new Error("User email is required");
    return data;
  })
  .handler(async ({ data }): Promise<{ notifications: Notification[]; expiryWarnings: Array<{ agreementId: string; propertyTitle: string; endDate: string; daysLeft: number }> }> => {
    const userAgreements = agreementDatabase.filter(
      (a) => a.tenantEmail === data.userEmail || a.ownerEmail === data.userEmail
    );
    const now = new Date();
    const expiryWarnings: Array<{ agreementId: string; propertyTitle: string; endDate: string; daysLeft: number }> = [];

    for (const agr of userAgreements) {
      if (agr.status === "completed" || agr.status === "accepted") {
        const end = parseISO(agr.endDate);
        const daysLeft = differenceInDays(end, now);
        if (daysLeft <= 30 && daysLeft > 0) {
          expiryWarnings.push({
            agreementId: agr.id,
            propertyTitle: agr.propertyTitle,
            endDate: agr.endDate,
            daysLeft,
          });
        }
      }
    }

    const agrNotifications = notifications.filter(
      (n) => n.title.toLowerCase().includes("agreement") || n.title.toLowerCase().includes("tenant") || n.title.toLowerCase().includes("owner accepted")
    );

    return { notifications: agrNotifications, expiryWarnings };
  });

// ─── 13. Digital Move-In Passport Functions ─────────────────────────────────

export const createMoveInPassportFn = createServerFn({ method: "POST" })
  .validator((data: Partial<MoveInPassport>) => {
    if (!data.propertyTitle) throw new Error("Property title is required");
    if (!data.tenantName) throw new Error("Tenant name is required");
    return data;
  })
  .handler(async ({ data }): Promise<MoveInPassport> => {
    const now = new Date().toISOString();
    const passport: MoveInPassport = {
      id: `mip-${Math.floor(100000 + Math.random() * 900000)}`,
      agreementId: data.agreementId || "agr-101",
      propertyId: data.propertyId || "p1",
      propertyTitle: data.propertyTitle || "Residential Property",
      tenantName: data.tenantName || "Radhika Nayak",
      ownerName: data.ownerName || "Ananya Rao",
      moveInDate: data.moveInDate || now.split("T")[0] || "2026-09-01",
      meterReadings: data.meterReadings || {
        electricityKwh: 4820,
        waterKl: 340,
        readingDate: now.split("T")[0] || "2026-09-01",
      },
      damages: data.damages || [],
      inventory: data.inventory || [
        { name: "AC Remote Control", condition: "Good", count: 2 },
        { name: "Geyser", condition: "Good", count: 2 },
        { name: "Keys", condition: "Good", count: 3 },
      ],
      tenantSignedAt: now,
      vaultHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
    };

    moveInPassportDatabase.unshift(passport);
    pushAgreementNotification(
      "Move-In Passport Created 📸",
      `Digital condition passport and meter readings saved into Rental Vault for ${passport.propertyTitle}.`
    );
    return passport;
  });

export const getMoveInPassportsFn = createServerFn({ method: "POST" })
  .validator((data: { userEmail?: string }) => data)
  .handler(async ({ data }): Promise<MoveInPassport[]> => {
    if (!data.userEmail) return moveInPassportDatabase;
    return moveInPassportDatabase;
  });
