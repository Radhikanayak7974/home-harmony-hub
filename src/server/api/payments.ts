import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

// In-memory persistent database store for payments
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
    timestamp: new Date().toISOString(),
    gstRegistration: "27AABCU9603R1ZM",
    status: "SUCCESS",
  },
];

/**
 * Backend API Server Function: Process Rent Payment
 */
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
    // Simulate backend payment gateway validation & escrow disbursement
    const rewardPoints = Math.floor(data.amount * 0.02); // 2% reward points
    const cashbackEst = Math.floor(data.amount * 0.015); // 1.5% cashback savings
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
    return newReceipt;
  });

/**
 * Backend API Server Function: Get Past Rent Receipts
 */
export const getRentReceiptsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<RentPaymentReceipt[]> => {
    return paymentDatabase;
  }
);
