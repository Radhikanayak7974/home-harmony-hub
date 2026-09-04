import mongoose, { Schema, Document, Model } from "mongoose";

// 1. SERVICE PROVIDER SCHEMA
export interface IServiceProviderDocument extends Document {
  id: string;
  name: string;
  avatar: string;
  category: string;
  categoryTitle: string;
  serviceTitle: string;
  description: string;
  experienceYears: number;
  city: string;
  serviceAreas: string[];
  rating: number;
  reviewCount: number;
  verificationStatus: string;
  availability: string;
  priceFrom: number;
  priceTo: number;
  pricingUnit: string;
  skills: string[];
  completedJobs: number;
}

const ServiceProviderSchema = new Schema<IServiceProviderDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    category: { type: String, required: true, index: true },
    categoryTitle: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    description: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    city: { type: String, required: true, index: true },
    serviceAreas: [{ type: String }],
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 100 },
    verificationStatus: { type: String, default: "VERIFIED_PRO" },
    availability: { type: String, default: "AVAILABLE_TODAY" },
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    pricingUnit: { type: String, default: "per job" },
    skills: [{ type: String }],
    completedJobs: { type: Number, default: 100 },
  },
  { timestamps: true }
);

// 2. HOME SERVICE BOOKING SCHEMA
export interface IHomeServiceBookingDocument extends Document {
  id: string;
  bookingRef: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  serviceCategory: string;
  serviceTitle: string;
  city: string;
  address: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  notes?: string;
  status: string;
  estimatedCost: number;
}

const HomeServiceBookingSchema = new Schema<IHomeServiceBookingDocument>(
  {
    id: { type: String, required: true, unique: true },
    bookingRef: { type: String, required: true, unique: true },
    providerId: { type: String, required: true, index: true },
    providerName: { type: String, required: true },
    providerAvatar: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    scheduledDate: { type: String, required: true },
    scheduledTimeSlot: { type: String, required: true },
    notes: { type: String },
    status: { type: String, default: "confirmed", index: true },
    estimatedCost: { type: Number, required: true },
  },
  { timestamps: true }
);

// 3. RENT PAYMENT SCHEMA
export interface IRentPaymentDocument extends Document {
  receiptId: string;
  transactionId: string;
  landlordName: string;
  landlordUpi: string;
  amount: number;
  paymentMode: string;
  rewardPoints: number;
  cashbackEst: number;
  gstRegistration: string;
  status: string;
}

const RentPaymentSchema = new Schema<IRentPaymentDocument>(
  {
    receiptId: { type: String, required: true, unique: true },
    transactionId: { type: String, required: true, unique: true },
    landlordName: { type: String, required: true },
    landlordUpi: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    rewardPoints: { type: Number, default: 0 },
    cashbackEst: { type: Number, default: 0 },
    gstRegistration: { type: String, default: "27AABCU9603R1ZM" },
    status: { type: String, default: "SUCCESS" },
  },
  { timestamps: true }
);

// 4. PROPERTY SCHEMA
export interface IPropertyDocument extends Document {
  id: string;
  title: string;
  type: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  area: number;
  amenities: string[];
  description: string;
  available: string;
}

const PropertySchema = new Schema<IPropertyDocument>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 50 },
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    area: { type: Number, default: 500 },
    amenities: [{ type: String }],
    description: { type: String, required: true },
    available: { type: String, default: "Immediately" },
  },
  { timestamps: true }
);

export const ServiceProviderModel: Model<IServiceProviderDocument> =
  (mongoose.models["ServiceProvider"] as Model<IServiceProviderDocument>) || mongoose.model<IServiceProviderDocument>("ServiceProvider", ServiceProviderSchema);

export const HomeServiceBookingModel: Model<IHomeServiceBookingDocument> =
  (mongoose.models["HomeServiceBooking"] as Model<IHomeServiceBookingDocument>) || mongoose.model<IHomeServiceBookingDocument>("HomeServiceBooking", HomeServiceBookingSchema);

export const RentPaymentModel: Model<IRentPaymentDocument> =
  (mongoose.models["RentPayment"] as Model<IRentPaymentDocument>) || mongoose.model<IRentPaymentDocument>("RentPayment", RentPaymentSchema);

export const PropertyModel: Model<IPropertyDocument> =
  (mongoose.models["Property"] as Model<IPropertyDocument>) || mongoose.model<IPropertyDocument>("Property", PropertySchema);
