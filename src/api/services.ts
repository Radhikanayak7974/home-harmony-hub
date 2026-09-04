import { createServerFn } from "@tanstack/react-start";
import { connectToDatabase } from "@/lib/db";
import { ServiceProviderModel, HomeServiceBookingModel } from "@/lib/models";

export type HomeServiceCategorySlug =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "ac_repair"
  | "home_cleaning"
  | "painting"
  | "pest_control"
  | "appliance_repair"
  | "packers_movers"
  | "other";

export interface HomeServiceCategory {
  id: string;
  slug: HomeServiceCategorySlug;
  title: string;
  description: string;
  iconName: string;
  count: number;
  popularServices: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  category: HomeServiceCategorySlug;
  categoryTitle: string;
  serviceTitle: string;
  description: string;
  experienceYears: number;
  city: string;
  serviceAreas: string[];
  rating: number;
  reviewCount: number;
  verificationStatus: "VERIFIED_PRO" | "BACKGROUND_CHECKED" | "PREMIUM_PARTNER";
  availability: "AVAILABLE_TODAY" | "SLOTS_OPEN_TOMORROW" | "AVAILABLE_ON_BOOKING";
  priceFrom: number;
  priceTo: number;
  pricingUnit: string;
  skills: string[];
  portfolioImages: string[];
  completedJobs: number;
  phone?: string | undefined;
}

export type HomeServiceBookingStatus =
  | "pending"
  | "confirmed"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface HomeServiceBooking {
  id: string;
  bookingRef: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  serviceCategory: HomeServiceCategorySlug;
  serviceTitle: string;
  city: string;
  address: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  notes?: string | undefined;
  status: HomeServiceBookingStatus;
  estimatedCost: number;
  createdAt: string;
  updatedAt: string;
  userId?: string | undefined;
}

// 1. SERVICE CATEGORIES DATA
export const SERVICE_CATEGORIES: HomeServiceCategory[] = [
  {
    id: "cat-1",
    slug: "electrician",
    title: "Electrician",
    description: "Wiring, switchboard repair, MCB replacement & light fittings",
    iconName: "Zap",
    count: 142,
    popularServices: ["Fault Finding", "MCB Repair", "Fan & Light Installation", "Inverter Wiring"],
  },
  {
    id: "cat-2",
    slug: "plumber",
    title: "Plumber",
    description: "Pipe leak fixes, tap replacements, drainage & bathroom fittings",
    iconName: "Wrench",
    count: 118,
    popularServices: ["Pipe Leakage", "Tap Repair", "Geyser Installation", "Drain Unclogging"],
  },
  {
    id: "cat-3",
    slug: "carpenter",
    title: "Carpenter",
    description: "Door lock repair, furniture assembly, wardrobe & cabinet work",
    iconName: "Hammer",
    count: 86,
    popularServices: ["Door Lock Change", "Furniture Assembly", "Hinge Repair", "Custom Shelves"],
  },
  {
    id: "cat-4",
    slug: "ac_repair",
    title: "AC Repair & Service",
    description: "Split & window AC servicing, gas refilling & cooling repairs",
    iconName: "Wind",
    count: 164,
    popularServices: ["AC Deep Clean", "Gas Leak Refill", "PCB Repair", "Installation"],
  },
  {
    id: "cat-5",
    slug: "home_cleaning",
    title: "Home Cleaning",
    description: "Move-in deep clean, sofa shampooing, kitchen degreasing & bathroom wash",
    iconName: "Sparkles",
    count: 210,
    popularServices: ["Full House Deep Clean", "Sofa & Carpet Clean", "Bathroom Scrub", "Kitchen Clean"],
  },
  {
    id: "cat-6",
    slug: "painting",
    title: "Painting & Waterproofing",
    description: "Wall touch-ups, full home interior painting & dampness treatment",
    iconName: "Paintbrush",
    count: 94,
    popularServices: ["1BHK/2BHK Painting", "Waterproofing", "Texture Walls", "Wall Touchup"],
  },
  {
    id: "cat-7",
    slug: "pest_control",
    title: "Pest Control",
    description: "Termite treatment, cockroach herbal gel & bed bug eradication",
    iconName: "ShieldAlert",
    count: 75,
    popularServices: ["Cockroach Control", "Termite Treatment", "Bed Bug Eradication", "Mosquito Shield"],
  },
  {
    id: "cat-8",
    slug: "appliance_repair",
    title: "Appliance Repair",
    description: "Washing machine, refrigerator, microwave & RO water purifier service",
    iconName: "Tv",
    count: 130,
    popularServices: ["Washing Machine Repair", "Fridge Cooling Repair", "RO Filter Service", "Microwave Repair"],
  },
  {
    id: "cat-9",
    slug: "packers_movers",
    title: "Packers & Movers",
    description: "Inter-city & local house shifting, bubble wrapping & safe transport",
    iconName: "Truck",
    count: 62,
    popularServices: ["Local House Relocation", "Intercity Shifting", "Packing & Unpacking", "Vehicle Transport"],
  },
  {
    id: "cat-10",
    slug: "other",
    title: "Other Services",
    description: "CCTV security, home nursing, solar panel cleaning & handyman work",
    iconName: "ShieldCheck",
    count: 55,
    popularServices: ["CCTV Installation", "Solar Panel Cleaning", "Elderly Care Assistant", "Handyman"],
  },
];

// 2. INITIAL SERVICE PROVIDERS DATABASE
const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: "pro-1",
    name: "Suresh Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    category: "electrician",
    categoryTitle: "Electrician",
    serviceTitle: "Master Electrician & Fault Specialist",
    description: "Over 12 years of expertise in residential wiring, short-circuit troubleshooting, MCB box upgrades, and LED panel fittings.",
    experienceYears: 12,
    city: "Kota",
    serviceAreas: ["Rajeev Gandhi Nagar", "Talwandi", "Vigyan Nagar", "Dadabari"],
    rating: 4.9,
    reviewCount: 312,
    verificationStatus: "VERIFIED_PRO",
    availability: "AVAILABLE_TODAY",
    priceFrom: 350,
    priceTo: 1500,
    pricingUnit: "per visit",
    skills: ["MCB Replacement", "Short Circuit Repair", "Inverter Setup", "Geyser Wiring"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=70",
    ],
    completedJobs: 480,
  },
  {
    id: "pro-2",
    name: "Ramesh Prajapati",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    category: "plumber",
    categoryTitle: "Plumber",
    serviceTitle: "Sanitary & Leak Repair Specialist",
    description: "Expert leak detection, high-pressure pipeline flushing, flush tank repairs, and modern bathroom tap installations.",
    experienceYears: 9,
    city: "Indore",
    serviceAreas: ["Vijay Nagar", "Bhawarkua", "Palasia", "Nipania"],
    rating: 4.8,
    reviewCount: 245,
    verificationStatus: "BACKGROUND_CHECKED",
    availability: "AVAILABLE_TODAY",
    priceFrom: 400,
    priceTo: 2200,
    pricingUnit: "per job",
    skills: ["Leakage Fix", "Tap & Mixer Fitting", "Drain Cleaning", "Water Tank Cleaning"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=70",
    ],
    completedJobs: 390,
  },
  {
    id: "pro-3",
    name: "Lakshmi Devi & Team",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    category: "home_cleaning",
    categoryTitle: "Home Cleaning",
    serviceTitle: "Move-In Deep Cleaning Lead",
    description: "Leads a trained 4-member crew for tenant move-in deep cleaning, kitchen degreasing, bathroom scrubbing, and sofa shampooing.",
    experienceYears: 7,
    city: "Lucknow",
    serviceAreas: ["Gomti Nagar", "Kapoorthala", "Hazratganj", "Indira Nagar"],
    rating: 4.9,
    reviewCount: 486,
    verificationStatus: "PREMIUM_PARTNER",
    availability: "SLOTS_OPEN_TOMORROW",
    priceFrom: 1200,
    priceTo: 4500,
    pricingUnit: "per home",
    skills: ["Deep Cleaning", "Sofa Shampoo", "Kitchen Degreasing", "Bathroom Disinfection"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=70",
    ],
    completedJobs: 620,
  },
  {
    id: "pro-4",
    name: "Imran Sheikh",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    category: "ac_repair",
    categoryTitle: "AC Repair & Service",
    serviceTitle: "AC Jet-Pump Servicing & Gas Refill",
    description: "Specializes in split/window AC foam jet cleaning, R32/R410 gas refills, PCB repairs, and energy-saving cooling tune-ups.",
    experienceYears: 11,
    city: "Patna",
    serviceAreas: ["Boring Road", "Kankarbagh", "Patliputra", "Bailey Road"],
    rating: 4.7,
    reviewCount: 198,
    verificationStatus: "VERIFIED_PRO",
    availability: "AVAILABLE_TODAY",
    priceFrom: 499,
    priceTo: 2800,
    pricingUnit: "per unit",
    skills: ["AC Jet Service", "Gas Topup", "Compressor Repair", "Duct Cleaning"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=70",
    ],
    completedJobs: 510,
  },
  {
    id: "pro-5",
    name: "Gurpreet Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    category: "packers_movers",
    categoryTitle: "Packers & Movers",
    serviceTitle: "Safe House Relocation Partner",
    description: "5-star rated packing and moving crew equipped with bubble wrap, corrugated boxes, container trucks, and transit insurance.",
    experienceYears: 10,
    city: "Jaipur",
    serviceAreas: ["Malviya Nagar", "Vaishali Nagar", "Raja Park", "Mansarovar"],
    rating: 4.9,
    reviewCount: 174,
    verificationStatus: "PREMIUM_PARTNER",
    availability: "SLOTS_OPEN_TOMORROW",
    priceFrom: 2500,
    priceTo: 12000,
    pricingUnit: "per trip",
    skills: ["Furniture Dismantling", "Fragile Packing", "Loading & Unloading", "Transit Insurance"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70",
    ],
    completedJobs: 310,
  },
  {
    id: "pro-6",
    name: "Vikram Rathore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    category: "carpenter",
    categoryTitle: "Carpenter",
    serviceTitle: "Woodworking & Door Lock Specialist",
    description: "Custom wooden shelving, wardrobe sliding door repairs, electronic smart lock installations, and modular kitchen cabinet fixes.",
    experienceYears: 8,
    city: "Kota",
    serviceAreas: ["Talwandi", "Mahaveer Nagar", "Kunhari"],
    rating: 4.8,
    reviewCount: 156,
    verificationStatus: "VERIFIED_PRO",
    availability: "AVAILABLE_TODAY",
    priceFrom: 300,
    priceTo: 1800,
    pricingUnit: "per job",
    skills: ["Smart Lock Installation", "Wardrobe Hinge Repair", "Custom Furniture", "Modular Kitchen Fix"],
    portfolioImages: [],
    completedJobs: 280,
  },
  {
    id: "pro-7",
    name: "Anand Verma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    category: "painting",
    categoryTitle: "Painting & Waterproofing",
    serviceTitle: "Interior Wall Painting & Damp Treatment",
    description: "Dustless sanding machine painting, Royal Asian Paints finish, water seepage wall treatment, and rental apartment white-wash.",
    experienceYears: 13,
    city: "Indore",
    serviceAreas: ["Vijay Nagar", "Old Palasia", "Rau"],
    rating: 4.7,
    reviewCount: 215,
    verificationStatus: "BACKGROUND_CHECKED",
    availability: "SLOTS_OPEN_TOMORROW",
    priceFrom: 1800,
    priceTo: 8500,
    pricingUnit: "per BHK",
    skills: ["Dustless Sanding", "Dampness Waterproofing", "Rental Touchup", "Texture Wall"],
    portfolioImages: [],
    completedJobs: 430,
  },
  {
    id: "pro-8",
    name: "Dr. Herbal Pest Care",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    category: "pest_control",
    categoryTitle: "Pest Control",
    serviceTitle: "Odorless Cockroach & Termite Treatment",
    description: "Govt-approved odorless herbal gel treatment for kitchens, bed bug thermal spray, and 1-year termite warranty.",
    experienceYears: 6,
    city: "Bengaluru",
    serviceAreas: ["Koramangala", "HSR Layout", "Indiranagar", "BTM Layout"],
    rating: 4.9,
    reviewCount: 389,
    verificationStatus: "PREMIUM_PARTNER",
    availability: "AVAILABLE_TODAY",
    priceFrom: 699,
    priceTo: 3200,
    pricingUnit: "per service",
    skills: ["Herbal Gel Treatment", "Bed Bug Eradication", "Termite Warranty", "Rodent Baiting"],
    portfolioImages: [],
    completedJobs: 790,
  },
];

// 3. SERVICE BOOKINGS DATABASE
const SERVICE_BOOKINGS: HomeServiceBooking[] = [
  {
    id: "sb-101",
    bookingRef: "GC-SVC-9812",
    providerId: "pro-1",
    providerName: "Suresh Kumar",
    providerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    serviceCategory: "electrician",
    serviceTitle: "MCB Trip & Bedroom Socket Repair",
    city: "Kota",
    address: "Flat 302, Green Valley Apartments, Rajeev Gandhi Nagar",
    scheduledDate: "2026-09-08",
    scheduledTimeSlot: "11:00 AM - 01:00 PM",
    notes: "Main bedroom socket sparks when plugging study laptop.",
    status: "confirmed",
    estimatedCost: 450,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "sb-102",
    bookingRef: "GC-SVC-9745",
    providerId: "pro-3",
    providerName: "Lakshmi Devi & Team",
    providerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    serviceCategory: "home_cleaning",
    serviceTitle: "Full 2BHK Tenant Move-In Deep Clean",
    city: "Lucknow",
    address: "B-42, Sector 14, Gomti Nagar",
    scheduledDate: "2026-09-12",
    scheduledTimeSlot: "09:00 AM - 01:00 PM",
    notes: "Includes kitchen degreasing and balcony pressure wash.",
    status: "pending",
    estimatedCost: 2800,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ═══════════════════════════════════════════════════════════
// BACKEND API SERVER FUNCTIONS
// ═══════════════════════════════════════════════════════════

/**
 * 1. Get All Service Categories
 */
export const getServiceCategoriesFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeServiceCategory[]> => {
    return SERVICE_CATEGORIES;
  }
);

export interface FilterProvidersPayload {
  category?: string | undefined;
  city?: string | undefined;
  minRating?: number | undefined;
  searchQuery?: string | undefined;
  sortBy?: "rating" | "price_low" | "price_high" | "experience" | undefined;
}

/**
 * 2. Get Service Providers with Search & Filter
 */
export const getServiceProvidersFn = createServerFn({ method: "POST" })
  .validator((data: FilterProvidersPayload) => data)
  .handler(async ({ data }): Promise<ServiceProvider[]> => {
    let list = [...SERVICE_PROVIDERS];

    if (data.category && data.category !== "all") {
      list = list.filter((p) => p.category === data.category);
    }

    if (data.city && data.city !== "all") {
      list = list.filter((p) => p.city.toLowerCase() === data.city!.toLowerCase());
    }

    if (data.minRating) {
      list = list.filter((p) => p.rating >= data.minRating!);
    }

    if (data.searchQuery && data.searchQuery.trim() !== "") {
      const q = data.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.serviceTitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (data.sortBy) {
      if (data.sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
      if (data.sortBy === "price_low") list.sort((a, b) => a.priceFrom - b.priceFrom);
      if (data.sortBy === "price_high") list.sort((a, b) => b.priceFrom - a.priceFrom);
      if (data.sortBy === "experience") list.sort((a, b) => b.experienceYears - a.experienceYears);
    }

    return list;
  });

/**
 * 3. Get Provider Details by ID
 */
export const getServiceProviderByIdFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<ServiceProvider | null> => {
    const found = SERVICE_PROVIDERS.find((p) => p.id === data.id);
    return found || null;
  });

export interface CreateServiceBookingPayload {
  providerId: string;
  address: string;
  city: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  notes?: string | undefined;
  estimatedCost: number;
}

/**
 * 4. Create New Service Booking
 */
export const createHomeServiceBookingFn = createServerFn({ method: "POST" })
  .validator((data: CreateServiceBookingPayload) => {
    if (!data.providerId) throw new Error("Service provider is required");
    if (!data.address || data.address.trim() === "") throw new Error("Service address is required");
    if (!data.scheduledDate) throw new Error("Service date is required");
    if (!data.scheduledTimeSlot) throw new Error("Time slot is required");
    return data;
  })
  .handler(async ({ data }): Promise<HomeServiceBooking> => {
    const provider = SERVICE_PROVIDERS.find((p) => p.id === data.providerId);
    if (!provider) throw new Error("Provider not found");

    const newBooking: HomeServiceBooking = {
      id: `sb-${Date.now()}`,
      bookingRef: `GC-SVC-${Math.floor(1000 + Math.random() * 9000)}`,
      providerId: provider.id,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      serviceCategory: provider.category,
      serviceTitle: provider.serviceTitle,
      city: data.city || provider.city,
      address: data.address,
      scheduledDate: data.scheduledDate,
      scheduledTimeSlot: data.scheduledTimeSlot,
      notes: data.notes,
      status: "confirmed",
      estimatedCost: data.estimatedCost || provider.priceFrom,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    SERVICE_BOOKINGS.unshift(newBooking);

    // Save to MongoDB if connected
    try {
      const db = await connectToDatabase();
      if (db) {
        await HomeServiceBookingModel.create(newBooking as any);
      }
    } catch (e) {
      console.warn("MongoDB Booking Save Warning:", e);
    }

    return newBooking;
  });

/**
 * 5. Get Single Booking Details
 */
export const getHomeServiceBookingByIdFn = createServerFn({ method: "POST" })
  .validator((data: { bookingId: string }) => data)
  .handler(async ({ data }): Promise<HomeServiceBooking | null> => {
    try {
      const db = await connectToDatabase();
      if (db) {
        const found = await HomeServiceBookingModel.findOne({ id: data.bookingId }).lean();
        if (found) return found as unknown as HomeServiceBooking;
      }
    } catch {}
    const found = SERVICE_BOOKINGS.find((b) => b.id === data.bookingId);
    return found || null;
  });

/**
 * 6. Cancel Booking
 */
export const cancelHomeServiceBookingFn = createServerFn({ method: "POST" })
  .validator((data: { bookingId: string; reason?: string | undefined }) => data)
  .handler(async ({ data }): Promise<HomeServiceBooking> => {
    const booking = SERVICE_BOOKINGS.find((b) => b.id === data.bookingId);
    if (!booking) throw new Error("Booking not found");

    booking.status = "cancelled";
    booking.updatedAt = new Date().toISOString();

    try {
      const db = await connectToDatabase();
      if (db) {
        await HomeServiceBookingModel.updateOne({ id: data.bookingId }, { status: "cancelled", updatedAt: booking.updatedAt });
      }
    } catch {}

    return booking;
  });

/**
 * 7. Update Booking Status (pending -> confirmed -> assigned -> in_progress -> completed -> cancelled)
 */
export const updateHomeServiceBookingStatusFn = createServerFn({ method: "POST" })
  .validator((data: { bookingId: string; status: HomeServiceBookingStatus }) => data)
  .handler(async ({ data }): Promise<HomeServiceBooking> => {
    const booking = SERVICE_BOOKINGS.find((b) => b.id === data.bookingId);
    if (!booking) throw new Error("Booking not found");

    booking.status = data.status;
    booking.updatedAt = new Date().toISOString();

    try {
      const db = await connectToDatabase();
      if (db) {
        await HomeServiceBookingModel.updateOne({ id: data.bookingId }, { status: data.status, updatedAt: booking.updatedAt });
      }
    } catch {}

    return booking;
  });

/**
 * 8. Get User's Service Bookings / History
 */
export const getUserHomeServiceBookingsFn = createServerFn({ method: "POST" })
  .validator((data: { statusFilter?: string | undefined }) => data)
  .handler(async ({ data }): Promise<HomeServiceBooking[]> => {
    try {
      const db = await connectToDatabase();
      if (db) {
        const query = data.statusFilter && data.statusFilter !== "all" ? { status: data.statusFilter } : {};
        const docs = await HomeServiceBookingModel.find(query).sort({ createdAt: -1 }).lean();
        if (docs && docs.length > 0) {
          return docs as unknown as HomeServiceBooking[];
        }
      }
    } catch {}

    if (data.statusFilter && data.statusFilter !== "all") {
      return SERVICE_BOOKINGS.filter((b) => b.status === data.statusFilter);
    }
    return SERVICE_BOOKINGS;
  });
