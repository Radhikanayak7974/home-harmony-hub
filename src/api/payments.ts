import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "@/lib/db";
import { RentPaymentModel } from "@/lib/models";

export interface RentPaymentRequest {
  landlordName: string;
  landlordUpi: string;
  amount: number;
  paymentMode: "cc" | "upi" | "netbanking";
  tenantId?: string;
}

export interface RentPaymentReceipt {
  receiptId: string;
  transactionId: string;
  landlordName: string;
  landlordUpi: string;
  amount: number;
  paymentMode: "cc" | "upi" | "netbanking";
  rewardPoints: number;
  cashbackEst: number;
  timestamp: string;
  gstRegistration: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
}

const paymentDatabase: RentPaymentReceipt[] = [
  {
    receiptId: "GRC-RENT-892104",
    transactionId: "TXN-9021-4412",
    landlordName: "Ramesh Sharma (House Owner)",
    landlordUpi: "landlord@upi",
    amount: 15000,
    paymentMode: "cc",
    rewardPoints: 300,
    cashbackEst: 225,
    timestamp: "2026-09-01T10:30:00.000Z",
    gstRegistration: "27AABCU9603R1ZM",
    status: "SUCCESS",
  },
  {
    receiptId: "GRC-RENT-819203",
    transactionId: "TXN-8812-3391",
    landlordName: "Ramesh Sharma (House Owner)",
    landlordUpi: "landlord@upi",
    amount: 15000,
    paymentMode: "cc",
    rewardPoints: 300,
    cashbackEst: 225,
    timestamp: "2026-08-01T09:15:00.000Z",
    gstRegistration: "27AABCU9603R1ZM",
    status: "SUCCESS",
  },
  {
    receiptId: "GRC-RENT-741982",
    transactionId: "TXN-7192-2104",
    landlordName: "Ramesh Sharma (House Owner)",
    landlordUpi: "landlord@upi",
    amount: 15000,
    paymentMode: "cc",
    rewardPoints: 300,
    cashbackEst: 225,
    timestamp: "2026-07-01T11:45:00.000Z",
    gstRegistration: "27AABCU9603R1ZM",
    status: "SUCCESS",
  },
];

export const processRentPaymentFn = createServerFn({ method: "POST" })
  .validator((data: RentPaymentRequest) => {
    if (!data.landlordName || data.landlordName.trim() === "") {
      throw new Error("Landlord name is required");
    }
    if (!data.amount || data.amount <= 0) {
      throw new Error("Valid rent amount is required");
    }
    return data;
  })
  .handler(async ({ data }): Promise<RentPaymentReceipt> => {
    const rewardPoints = Math.floor(data.amount * 0.02);
    const cashbackEst = Math.floor(data.amount * 0.015);
    const receiptId = `GRC-RENT-${Math.floor(100000 + Math.random() * 900000)}`;
    const transactionId = `TXN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReceipt: RentPaymentReceipt = {
      receiptId,
      transactionId,
      landlordName: data.landlordName,
      landlordUpi: data.landlordUpi,
      amount: data.amount,
      paymentMode: data.paymentMode,
      rewardPoints,
      cashbackEst,
      timestamp: new Date().toISOString(),
      gstRegistration: "27AABCU9603R1ZM",
      status: "SUCCESS",
    };

    paymentDatabase.unshift(newReceipt);

    try {
      const db = await connectToDatabase();
      if (db) {
        await RentPaymentModel.create(newReceipt);
      }
    } catch {}

    return newReceipt;
  });

export const getRentReceiptsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<RentPaymentReceipt[]> => {
    try {
      const db = await connectToDatabase();
      if (db) {
        const docs = await RentPaymentModel.find().sort({ createdAt: -1 }).lean();
        if (docs && docs.length > 0) {
          return docs as unknown as RentPaymentReceipt[];
        }
      }
    } catch {}

    return paymentDatabase;
  }
);
