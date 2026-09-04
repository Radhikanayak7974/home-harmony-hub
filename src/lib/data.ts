export type PropertyTrustBreakdown = {
  ownerVerified: boolean;
  kycCompleted: boolean;
  titleVerified: boolean;
  listingCompleteness: number;
  safetyScore: number;
};

export type RentFairnessInfo = {
  status: "Fair" | "Slightly High" | "High";
  estimatedRange: string;
  explanation: string;
  percentile: number;
};

export type Property = {
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
  images: string[];
  owner: { name: string; avatar: string; since: string; verified: boolean };
  available: string;
  trustScore: number;
  trustBreakdown: PropertyTrustBreakdown;
  rentFairness: RentFairnessInfo;
};

export type Stay = {
  id: string;
  title: string;
  kind:
    "Luxury PG" | "Co-living PG" | "Boys PG" | "Girls PG" | "Serviced PG" | "Homestay" | "Hostel";
  location: string;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  available: boolean;
  image: string;
  description: string;
};

export type Pro = {
  id: string;
  name: string;
  service: string;
  category: string;
  rating: number;
  reviews: number;
  area: string;
  priceFrom: number;
  priceTo: number;
  verified: boolean;
  experience: number;
  bio: string;
  avatar: string;
  portfolio: string[];
  skills: string[];
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

const h1 = img("photo-1560448204-e02f11c3d0e2");
const h2 = img("photo-1502672260266-1c1ef2d93688");
const h3 = img("photo-1493809842364-78817add7ffb");
const h4 = img("photo-1522708323590-d24dbb6b0267");
const h5 = img("photo-1600585154340-be6161a56a0c");
const h6 = img("photo-1600607687939-ce8a6c25118c");
const h7 = img("photo-1600566753086-00f18fb6b3ea");
const h8 = img("photo-1600047509807-ba8f99d2cdde");
const h9 = img("photo-1512917774080-9991f1c4c750");
const h10 = img("photo-1580587771525-78b9dba3b914");

export const properties: Property[] = [
  {
    id: "p1",
    title: "Sunlit 2BHK near Coaching Hub",
    type: "2BHK Apartment",
    location: "Bhawarkua, Indore",
    city: "Indore",
    price: 11500,
    rating: 4.8,
    reviews: 126,
    beds: 2,
    baths: 2,
    area: 980,
    amenities: ["Parking", "Power backup", "Security", "RO Water", "Lift"],
    description:
      "A bright, airy 2BHK with full-height windows, modular kitchen and quiet balcony overlooking the park. 5 mins walk to IT park and mess.",
    images: [h1, h5, h6, h7, h9],
    owner: {
      name: "Ananya Rao",
      avatar: img("photo-1494790108377-be9c29b29330"),
      since: "2021",
      verified: true,
    },
    available: "Immediately",
    trustScore: 96,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 98,
      safetyScore: 95,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹11,000 – ₹13,000/mo",
      explanation: "Rent is 6% below Bhawarkua 2BHK locality average of ₹12,200/mo.",
      percentile: 94,
    },
  },
  {
    id: "p2",
    title: "Spacious 3BHK Family Flat",
    type: "3BHK Apartment",
    location: "Kapoorthala, Lucknow",
    city: "Lucknow",
    price: 14500,
    rating: 4.9,
    reviews: 84,
    beds: 3,
    baths: 3,
    area: 1450,
    amenities: ["Metro Nearby", "Parking", "Gym", "Security", "Power Backup"],
    description:
      "Corner unit with wide balcony views, modular wood fittings and a dedicated study nook for students.",
    images: [h2, h6, h8, h5, h10],
    owner: {
      name: "Rohit Mehta",
      avatar: img("photo-1500648767791-00dcc994a43e"),
      since: "2019",
      verified: true,
    },
    available: "From 15 Oct",
    trustScore: 98,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 100,
      safetyScore: 97,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹14,000 – ₹16,500/mo",
      explanation: "Fair market valuation based on 1,450 sq ft area & metro proximity.",
      percentile: 98,
    },
  },
  {
    id: "p3",
    title: "Compact Studio for Coaching Students",
    type: "Studio",
    location: "Rajeev Gandhi Nagar, Kota",
    city: "Kota",
    price: 5500,
    rating: 4.8,
    reviews: 161,
    beds: 1,
    baths: 1,
    area: 380,
    amenities: ["Furnished", "WiFi", "Mess Food", "Security", "Study Desk"],
    description:
      "Fully furnished single occupancy room with smart storage, high-speed fiber internet and daily mess food.",
    images: [h3, h9, h7],
    owner: {
      name: "Sneha Kulkarni",
      avatar: img("photo-1438761681033-6461ffad8d80"),
      since: "2022",
      verified: true,
    },
    available: "Immediately",
    trustScore: 94,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 95,
      safetyScore: 96,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹5,200 – ₹6,200/mo",
      explanation: "Includes 3-time mess food & fiber Wi-Fi. Excellent value for Kota coaching hub.",
      percentile: 92,
    },
  },
  {
    id: "p4",
    title: "Garden Home with Private Terrace",
    type: "Independent House",
    location: "Gopalpura Bypass, Jaipur",
    city: "Jaipur",
    price: 18000,
    rating: 4.7,
    reviews: 39,
    beds: 3,
    baths: 3,
    area: 1850,
    amenities: ["Private lawn", "Parking", "CCTV", "Solar Water", "Pet friendly"],
    description:
      "Independent 3BHK house in a peaceful residential lane with terrace garden and covered car parking.",
    images: [h4, h10, h6, h8],
    owner: {
      name: "Vikram Shetty",
      avatar: img("photo-1507003211169-0a1dd7228f2d"),
      since: "2018",
      verified: true,
    },
    available: "From 1 Nov",
    trustScore: 91,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 92,
      safetyScore: 90,
    },
    rentFairness: {
      status: "Slightly High",
      estimatedRange: "₹15,500 – ₹17,000/mo",
      explanation: "Listed rent is ~5% above average due to private terrace garden & solar water features.",
      percentile: 85,
    },
  },
  {
    id: "p5",
    title: "Peaceful 1BHK near Main Market",
    type: "1BHK Apartment",
    location: "Boring Road, Patna",
    city: "Patna",
    price: 6500,
    rating: 4.4,
    reviews: 52,
    beds: 1,
    baths: 1,
    area: 550,
    amenities: ["Parking", "24/7 Water", "Lift", "Security"],
    description:
      "Quiet first-floor 1BHK on a safe street, five minutes from Patna College and coaching centers.",
    images: [h5, h3, h1],
    owner: {
      name: "Meera Joshi",
      avatar: img("photo-1544005313-94ddf0286df2"),
      since: "2020",
      verified: false,
    },
    available: "Immediately",
    trustScore: 82,
    trustBreakdown: {
      ownerVerified: false,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 88,
      safetyScore: 84,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹6,000 – ₹7,200/mo",
      explanation: "Optimal pricing for Boring Road locality with lift & security.",
      percentile: 88,
    },
  },
  {
    id: "p6",
    title: "Modern 2BHK Flat near DB Mall",
    type: "2BHK Apartment",
    location: "MP Nagar, Bhopal",
    city: "Bhopal",
    price: 10000,
    rating: 4.6,
    reviews: 73,
    beds: 2,
    baths: 2,
    area: 1100,
    amenities: ["Parking", "Lift", "RO Water", "Power Backup"],
    description:
      "Fully ventilated 2BHK flat with wooden wardrobes, modern bath fittings and close access to public transport.",
    images: [h6, h2, h9, h7],
    owner: {
      name: "Arjun Reddy",
      avatar: img("photo-1519085360753-af0119f7cbe7"),
      since: "2021",
      verified: true,
    },
    available: "Immediately",
    trustScore: 93,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 94,
      safetyScore: 92,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹9,500 – ₹11,000/mo",
      explanation: "Highly competitive rent for MP Nagar commercial hub vicinity.",
      percentile: 90,
    },
  },
  {
    id: "p7",
    title: "Heritage 2BHK Floor near BHU Gate",
    type: "2BHK Independent Floor",
    location: "Lanka, Varanasi",
    city: "Varanasi",
    price: 8500,
    rating: 4.5,
    reviews: 47,
    beds: 2,
    baths: 2,
    area: 950,
    amenities: ["Balcony", "WiFi", "Parking", "Pure Veg Mess"],
    description:
      "Independent floor with high ceilings, wide sunlit balcony and walking distance to BHU Campus.",
    images: [h7, h4, h10],
    owner: {
      name: "Farah Khan",
      avatar: img("photo-1534528741775-53994a69daeb"),
      since: "2017",
      verified: true,
    },
    available: "From 20 Oct",
    trustScore: 92,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 91,
      safetyScore: 93,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹8,000 – ₹9,200/mo",
      explanation: "Walkable distance to BHU campus. Excellent price per sq ft ratio.",
      percentile: 91,
    },
  },
  {
    id: "p8",
    title: "Scenic 3BHK Family Home",
    type: "3BHK House",
    location: "Clement Town, Dehradun",
    city: "Dehradun",
    price: 15000,
    rating: 4.6,
    reviews: 58,
    beds: 3,
    baths: 3,
    area: 1600,
    amenities: ["Mountain View", "Parking", "Security", "Solar Geyser", "Balcony"],
    description:
      "Fresh mountain air 3BHK near Graphic Era University with private balcony and valley views.",
    images: [h8, h1, h5, h6],
    owner: {
      name: "Karthik Iyer",
      avatar: img("photo-1506794778202-cad84cf45f1d"),
      since: "2019",
      verified: true,
    },
    available: "Immediately",
    trustScore: 95,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 96,
      safetyScore: 94,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹14,500 – ₹16,200/mo",
      explanation: "Fair market valuation for 1,600 sq ft house with solar amenities.",
      percentile: 93,
    },
  },
  {
    id: "p9",
    title: "Budget 1BHK Furnished Flat",
    type: "1BHK Apartment",
    location: "Viman Nagar, Pune",
    city: "Pune",
    price: 12500,
    rating: 4.3,
    reviews: 44,
    beds: 1,
    baths: 1,
    area: 580,
    amenities: ["Furnished", "WiFi", "Housekeeping", "Security"],
    description:
      "Furnished 1BHK suite with sofa, fridge, high-speed internet and weekly cleaning service included.",
    images: [h9, h3, h2],
    owner: {
      name: "Nikhil Bansal",
      avatar: img("photo-1463453091185-61582044d556"),
      since: "2023",
      verified: false,
    },
    available: "Immediately",
    trustScore: 84,
    trustBreakdown: {
      ownerVerified: false,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 89,
      safetyScore: 86,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹12,000 – ₹13,500/mo",
      explanation: "Includes weekly housekeeping & high-speed Wi-Fi.",
      percentile: 86,
    },
  },
  {
    id: "p10",
    title: "Duplex 3BHK House near Lake",
    type: "Duplex House",
    location: "Vastrapur, Ahmedabad",
    city: "Ahmedabad",
    price: 16000,
    rating: 4.9,
    reviews: 31,
    beds: 3,
    baths: 3,
    area: 2100,
    amenities: ["Terrace", "Parking", "Security", "RO Water"],
    description:
      "Two-level duplex home with spacious terrace, open kitchen and close to IIM Ahmedabad campus.",
    images: [h10, h4, h8, h2],
    owner: {
      name: "Priya Desai",
      avatar: img("photo-1487412720507-e7ab37603c6f"),
      since: "2016",
      verified: true,
    },
    available: "From 5 Nov",
    trustScore: 97,
    trustBreakdown: {
      ownerVerified: true,
      kycCompleted: true,
      titleVerified: true,
      listingCompleteness: 99,
      safetyScore: 96,
    },
    rentFairness: {
      status: "Fair",
      estimatedRange: "₹15,500 – ₹18,000/mo",
      explanation: "Great value for a 2,100 sq ft duplex near Vastrapur Lake & IIM.",
      percentile: 96,
    },
  },
];

// ─── MOVE-IN PASSPORT TYPE SYSTEM ──────────────────────────────────────────

export type MoveInDamageRecord = {
  id: string;
  room: string;
  description: string;
  photoUrl?: string;
  severity: "Minor" | "Moderate" | "Major";
};

export type MoveInMeterReading = {
  electricityKwh: number;
  electricityPhotoUrl?: string;
  waterKl: number;
  waterPhotoUrl?: string;
  readingDate: string;
};

export type MoveInInventoryItem = {
  name: string;
  condition: "Good" | "Fair" | "Damaged" | "Missing";
  count: number;
};

export type MoveInPassport = {
  id: string;
  agreementId: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  ownerName: string;
  moveInDate: string;
  meterReadings: MoveInMeterReading;
  damages: MoveInDamageRecord[];
  inventory: MoveInInventoryItem[];
  tenantSignedAt: string;
  vaultHash: string;
};

export const sampleMoveInPassports: MoveInPassport[] = [
  {
    id: "mip-101",
    agreementId: "agr-101",
    propertyId: "p1",
    propertyTitle: "Sunlit 2BHK near Coaching Hub, Bhawarkua",
    tenantName: "Radhika Nayak",
    ownerName: "Ananya Rao",
    moveInDate: "2026-09-01",
    meterReadings: {
      electricityKwh: 4820,
      waterKl: 340,
      readingDate: "2026-09-01",
    },
    damages: [
      {
        id: "d-1",
        room: "Living Room",
        description: "Small paint scratch behind main sofa area",
        severity: "Minor",
      },
      {
        id: "d-2",
        room: "Master Bedroom",
        description: "Wardrobe right door hinge slightly loose",
        severity: "Minor",
      },
    ],
    inventory: [
      { name: "AC Remote Control", condition: "Good", count: 2 },
      { name: "Geyser (25L Storage)", condition: "Good", count: 2 },
      { name: "Ceiling Fans", condition: "Good", count: 4 },
      { name: "Main Entrance Keys", condition: "Good", count: 3 },
    ],
    tenantSignedAt: "2026-09-01T10:30:00Z",
    vaultHash: "0x8f7a2b901c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f",
  },
];

const s1 = img("photo-1555854877-bab0e564b8d5");
const s2 = img("photo-1595526114035-0d45ed16cfbf");
const s3 = img("photo-1598928506311-c55ded91a20c");
const s4 = img("photo-1586023492125-27b2c045efd7");
const s5 = img("photo-1616594039964-ae9021a400a0");
const s6 = img("photo-1560185893-a55cbc8c57e8");
const s7 = img("photo-1540518614846-7ede433c517a");
const s8 = img("photo-1513694203232-719a280e022f");
const s9 = img("photo-1522798514-97ceb8c4f1c8");
const s10 = img("photo-1522771739844-6a9f6d5f14af");

export const stays: Stay[] = [
  {
    id: "s1",
    title: "Maa Saraswati Student PG",
    kind: "Boys PG",
    location: "Bhawarkua, Indore",
    price: 2800,
    rating: 4.8,
    reviews: 142,
    guests: 2,
    available: true,
    image: s1,
    description:
      "Low-budget student PG near Coaching Hub. Includes study table, high-speed WiFi, filtered RO water, and 3 home-style meals daily.",
  },
  {
    id: "s2",
    title: "Kota Coaching Hub Boys PG",
    kind: "Boys PG",
    location: "Rajeev Gandhi Nagar, Kota",
    price: 3500,
    rating: 4.9,
    reviews: 310,
    guests: 2,
    available: true,
    image: s2,
    description:
      "Quiet, peaceful environment for ALLEN & Resonance students. Air-cooled rooms, individual study desks, mess food, and 24/7 warden security.",
  },
  {
    id: "s3",
    title: "Ganga Girls PG & Hostel",
    kind: "Girls PG",
    location: "Boring Road, Patna",
    price: 3200,
    rating: 4.7,
    reviews: 185,
    guests: 2,
    available: true,
    image: s3,
    description:
      "Affordable and highly secure girls PG near Coaching centers. CCTV surveillance, biometric entry, AC rooms, and clean hygienic mess.",
  },
  {
    id: "s4",
    title: "Kapoorthala Executive Girls PG",
    kind: "Girls PG",
    location: "Kapoorthala, Lucknow",
    price: 3800,
    rating: 4.6,
    reviews: 128,
    guests: 2,
    available: true,
    image: s4,
    description:
      "Budget-friendly PG for college students & working women. Includes laundry, tea/snacks, power backup, and attached washrooms.",
  },
  {
    id: "s5",
    title: "Shree Ram Student PG",
    kind: "Boys PG",
    location: "MP Nagar, Bhopal",
    price: 3000,
    rating: 4.5,
    reviews: 94,
    guests: 2,
    available: true,
    image: s5,
    description:
      "Pocket-friendly PG in MP Nagar Zone 2. Single & double sharing beds, high-speed WiFi, daily cleaning, and North/Central Indian mess.",
  },
  {
    id: "s6",
    title: "Kashi Heritage Student PG",
    kind: "Boys PG",
    location: "Lanka, Varanasi",
    price: 2500,
    rating: 4.6,
    reviews: 88,
    guests: 2,
    available: true,
    image: s6,
    description:
      "Ultra-low cost PG 500 meters from BHU Main Gate. Clean beds, silent study atmosphere, pure vegetarian food, and free WiFi.",
  },
  {
    id: "s7",
    title: "Pink City Student Co-Living",
    kind: "Co-living PG",
    location: "Gopalpura Bypass, Jaipur",
    price: 4200,
    rating: 4.7,
    reviews: 215,
    guests: 2,
    available: true,
    image: s7,
    description:
      "Modern budget PG with AC, smart LED TV, study corner, 3 meals daily, and weekly room deep cleaning.",
  },
  {
    id: "s8",
    title: "Doon Valley Student Residence",
    kind: "Luxury PG",
    location: "Clement Town, Dehradun",
    price: 4500,
    rating: 4.8,
    reviews: 160,
    guests: 2,
    available: true,
    image: s8,
    description:
      "Scenic mountain view PG for Graphic Era students. Hot water 24/7, high-speed fiber, healthy meals, and balcony view.",
  },
  {
    id: "s9",
    title: "Zolo Horizon Executive PG",
    kind: "Luxury PG",
    location: "Koramangala, Bengaluru",
    price: 7500,
    rating: 4.9,
    reviews: 412,
    guests: 2,
    available: true,
    image: s9,
    description:
      "Fully furnished double sharing PG with attached bathroom, high-speed WiFi, 3-time meals, and daily housekeeping.",
  },
  {
    id: "s10",
    title: "Stanza Living Co-Living PG",
    kind: "Co-living PG",
    location: "HSR Layout, Bengaluru",
    price: 8500,
    rating: 4.8,
    reviews: 268,
    guests: 2,
    available: true,
    image: s10,
    description:
      "Single and double sharing PG for working professionals, with gaming zone, gym, laundry, and biometric entry.",
  },
];

export const serviceCategories = [
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Maintenance",
  "Construction",
  "Interior Design",
] as const;

const a = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;

export const pros: Pro[] = [
  {
    id: "w1",
    name: "Suresh Kumar",
    service: "Certified Electrician",
    category: "Electrical",
    rating: 4.9,
    reviews: 312,
    area: "South Bengaluru",
    priceFrom: 500,
    priceTo: 3500,
    verified: true,
    experience: 12,
    bio: "Licensed electrician specialising in home rewiring, smart switch installation and load audits.",
    avatar: a("photo-1507003211169-0a1dd7228f2d"),
    portfolio: [h6, h7, h8],
    skills: ["Rewiring", "Smart home", "Inverter setup", "Fault finding"],
  },
  {
    id: "w2",
    name: "Ramesh Yadav",
    service: "Plumbing Specialist",
    category: "Plumbing",
    rating: 4.7,
    reviews: 244,
    area: "Andheri, Mumbai",
    priceFrom: 600,
    priceTo: 4000,
    verified: true,
    experience: 9,
    bio: "Leak detection, bathroom fittings and full pipeline replacement with a 90-day workmanship warranty.",
    avatar: a("photo-1506794778202-cad84cf45f1d"),
    portfolio: [h5, h9],
    skills: ["Leak repair", "Bath fitting", "Water heater", "Drainage"],
  },
  {
    id: "w3",
    name: "Lakshmi Devi",
    service: "Deep Cleaning Lead",
    category: "Cleaning",
    rating: 4.8,
    reviews: 486,
    area: "Gachibowli, Hyderabad",
    priceFrom: 900,
    priceTo: 5000,
    verified: true,
    experience: 7,
    bio: "Leads a 4-person team for move-in deep cleans, sofa shampooing and kitchen degreasing.",
    avatar: a("photo-1544005313-94ddf0286df2"),
    portfolio: [h1, h3],
    skills: ["Deep clean", "Sofa shampoo", "Move-in clean", "Sanitisation"],
  },
  {
    id: "w4",
    name: "Imran Sheikh",
    service: "AC & Appliance Repair",
    category: "Maintenance",
    rating: 4.6,
    reviews: 198,
    area: "Hauz Khas, Delhi",
    priceFrom: 500,
    priceTo: 3000,
    verified: true,
    experience: 11,
    bio: "Split and window AC servicing, gas refill, washing machine and refrigerator repairs.",
    avatar: a("photo-1519085360753-af0119f7cbe7"),
    portfolio: [h2],
    skills: ["AC service", "Gas refill", "Washing machine", "Fridge"],
  },
  {
    id: "w5",
    name: "Anita Sharma",
    service: "Interior Designer",
    category: "Interior Design",
    rating: 5.0,
    reviews: 87,
    area: "Pune",
    priceFrom: 2500,
    priceTo: 5000,
    verified: true,
    experience: 8,
    bio: "Warm, material-led interiors for rentals and compact homes. 3D walkthroughs before execution.",
    avatar: a("photo-1487412720507-e7ab37603c6f"),
    portfolio: [h4, h10, h6],
    skills: ["Space planning", "3D render", "Modular kitchen", "Styling"],
  },
  {
    id: "w6",
    name: "Joseph Fernandes",
    service: "Civil Contractor",
    category: "Construction",
    rating: 4.5,
    reviews: 64,
    area: "Goa",
    priceFrom: 3000,
    priceTo: 5000,
    verified: true,
    experience: 15,
    bio: "Small-scale renovations, waterproofing and structural repair with documented material costs.",
    avatar: a("photo-1500648767791-00dcc994a43e"),
    portfolio: [h8, h7],
    skills: ["Renovation", "Waterproofing", "Tiling", "Plaster"],
  },
  {
    id: "w7",
    name: "Deepa Nair",
    service: "Housekeeping Partner",
    category: "Cleaning",
    rating: 4.4,
    reviews: 152,
    area: "Besant Nagar, Chennai",
    priceFrom: 500,
    priceTo: 2200,
    verified: false,
    experience: 5,
    bio: "Daily and weekly housekeeping with flexible slots, background verified.",
    avatar: a("photo-1438761681033-6461ffad8d80"),
    portfolio: [h3],
    skills: ["Daily clean", "Dishes", "Laundry"],
  },
  {
    id: "w8",
    name: "Manoj Verma",
    service: "Carpenter & Fittings",
    category: "Maintenance",
    rating: 4.7,
    reviews: 173,
    area: "Noida",
    priceFrom: 700,
    priceTo: 4500,
    verified: true,
    experience: 14,
    bio: "Custom wardrobes, door repairs and modular furniture assembly.",
    avatar: a("photo-1463453091185-61582044d556"),
    portfolio: [h9, h5],
    skills: ["Wardrobe", "Door repair", "Furniture", "Polish"],
  },
  {
    id: "w9",
    name: "Kavya Menon",
    service: "Painting Contractor",
    category: "Construction",
    rating: 4.6,
    reviews: 111,
    area: "Kochi",
    priceFrom: 1500,
    priceTo: 5000,
    verified: true,
    experience: 10,
    bio: "Low-VOC interior painting, texture walls and exterior weatherproof coats.",
    avatar: a("photo-1534528741775-53994a69daeb"),
    portfolio: [h1, h4],
    skills: ["Interior paint", "Texture", "Waterproof coat"],
  },
  {
    id: "w10",
    name: "Alok Pandey",
    service: "Electrical Maintenance",
    category: "Electrical",
    rating: 4.3,
    reviews: 96,
    area: "Lucknow",
    priceFrom: 500,
    priceTo: 2500,
    verified: false,
    experience: 6,
    bio: "Fan, light and MCB replacements with same-day slots on weekdays.",
    avatar: a("photo-1492562080023-ab3db95bfbce"),
    portfolio: [h6],
    skills: ["Fan install", "MCB", "Lighting"],
  },
  {
    id: "w11",
    name: "Rina Das",
    service: "Pest Control Expert",
    category: "Maintenance",
    rating: 4.5,
    reviews: 130,
    area: "Kolkata",
    priceFrom: 800,
    priceTo: 3200,
    verified: true,
    experience: 8,
    bio: "Child- and pet-safe termite, cockroach and mosquito treatments with follow-up visits.",
    avatar: a("photo-1494790108377-be9c29b29330"),
    portfolio: [h2],
    skills: ["Termite", "Cockroach", "Mosquito"],
  },
  {
    id: "w12",
    name: "Gurpreet Singh",
    service: "Plumbing & Sanitary",
    category: "Plumbing",
    rating: 4.8,
    reviews: 207,
    area: "Chandigarh",
    priceFrom: 600,
    priceTo: 3800,
    verified: true,
    experience: 13,
    bio: "Full bathroom renovations, concealed piping and water-saving fixture upgrades.",
    avatar: a("photo-1522075469751-3a6694fb2f61"),
    portfolio: [h10, h8],
    skills: ["Bath reno", "Concealed piping", "Fixtures"],
  },
];

export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  photos?: string[];
};

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Divya Menon",
    avatar: a("photo-1494790108377-be9c29b29330"),
    rating: 5,
    date: "12 Aug 2026",
    title: "Exactly as listed, zero surprises",
    body: "Photos matched the home perfectly and the owner handled the paperwork within a day. The AI match put this at the top of my list and it was right.",
    helpful: 24,
    photos: [h1],
  },
  {
    id: "r2",
    author: "Aditya Nair",
    avatar: a("photo-1506794778202-cad84cf45f1d"),
    rating: 4,
    date: "3 Aug 2026",
    title: "Great place, parking is tight",
    body: "Lovely light through the day and a quiet street. Only nitpick is that visitor parking fills up by evening.",
    helpful: 11,
  },
  {
    id: "r3",
    author: "Shreya Kapoor",
    avatar: a("photo-1544005313-94ddf0286df2"),
    rating: 5,
    date: "27 Jul 2026",
    title: "The verification really matters",
    body: "I've been scammed on other listing apps before. Having the badge and a real ID check made this feel safe.",
    helpful: 38,
  },
  {
    id: "r4",
    author: "Mohit Grover",
    avatar: a("photo-1519085360753-af0119f7cbe7"),
    rating: 3.5,
    date: "14 Jul 2026",
    title: "Good value for the area",
    body: "Slightly dated fittings but the landlord agreed to replace the geyser before move-in. Fair for the rent.",
    helpful: 6,
  },
  {
    id: "r5",
    author: "Fatima Ali",
    avatar: a("photo-1534528741775-53994a69daeb"),
    rating: 5,
    date: "2 Jul 2026",
    title: "Booked and moved in within a week",
    body: "Chat, documents and payment all happened in one app. No brokers, no chasing anyone on the phone.",
    helpful: 41,
    photos: [h5, h6],
  },
];

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  unread: number;
  messages: { id: string; from: "me" | "them"; text: string; time: string; read?: boolean }[];
};

export const chats: Chat[] = [
  {
    id: "c1",
    name: "Ananya Rao",
    avatar: a("photo-1494790108377-be9c29b29330"),
    role: "Owner · Koramangala 2BHK",
    online: true,
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hi Radhika! Thanks for saving the listing. Would you like a visit this weekend?",
        time: "10:12",
      },
      {
        id: "m2",
        from: "me",
        text: "Yes please. Is Saturday 11am possible?",
        time: "10:15",
        read: true,
      },
      {
        id: "m3",
        from: "them",
        text: "Saturday 11am works. I'll share the gate pass details on Friday.",
        time: "10:16",
      },
      {
        id: "m4",
        from: "them",
        text: "Also, the parking slot is covered — forgot to mention it in the listing.",
        time: "10:17",
      },
    ],
  },
  {
    id: "c2",
    name: "Suresh Kumar",
    avatar: a("photo-1507003211169-0a1dd7228f2d"),
    role: "Electrician · Verified",
    online: false,
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Two bedroom points are dead after the rain.",
        time: "Yesterday",
        read: true,
      },
      {
        id: "m2",
        from: "them",
        text: "Likely a tripped RCCB or moisture in the conduit. I can come tomorrow 4pm, ₹500 visit charge adjusted in the bill.",
        time: "Yesterday",
      },
      { id: "m3", from: "me", text: "Booked. See you then.", time: "Yesterday", read: true },
    ],
  },
  {
    id: "c3",
    name: "Lakshmi Devi",
    avatar: a("photo-1544005313-94ddf0286df2"),
    role: "Deep Cleaning · Verified",
    online: true,
    unread: 1,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Move-in deep clean quote for 1120 sq ft is ₹3,400 including sofa shampoo.",
        time: "08:40",
      },
    ],
  },
  {
    id: "c4",
    name: "GrihaCare Support",
    avatar: a("photo-1573497019940-1c28c88b4f3e"),
    role: "Support team",
    online: true,
    unread: 0,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Your refund of ₹2,100 for booking GC-88213 has been processed.",
        time: "Mon",
      },
    ],
  },
];

export type Booking = {
  id: string;
  kind: "Home" | "Stay" | "Service";
  title: string;
  date: string;
  amount: number;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
};

export const bookings: Booking[] = [
  {
    id: "GC-90142",
    kind: "Stay",
    title: "Coorg Coffee Estate Homestay",
    date: "18–21 Sep 2026",
    amount: 12600,
    status: "Confirmed",
  },
  {
    id: "GC-90118",
    kind: "Service",
    title: "Deep clean — Lakshmi Devi",
    date: "9 Sep 2026",
    amount: 3400,
    status: "Pending",
  },
  {
    id: "GC-89977",
    kind: "Home",
    title: "Site visit — Koramangala 2BHK",
    date: "5 Sep 2026",
    amount: 0,
    status: "Confirmed",
  },
  {
    id: "GC-89610",
    kind: "Service",
    title: "AC service — Imran Sheikh",
    date: "22 Aug 2026",
    amount: 1800,
    status: "Completed",
  },
  {
    id: "GC-88213",
    kind: "Stay",
    title: "Backpackers' Loft Hostel",
    date: "2 Aug 2026",
    amount: 2100,
    status: "Cancelled",
  },
];

export type Notification = {
  id: string;
  tab: "Bookings" | "Messages" | "Updates";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    tab: "Bookings",
    title: "Booking confirmed",
    body: "Coorg Coffee Estate Homestay, 18–21 Sep. Receipt is ready to download.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    tab: "Messages",
    title: "Ananya Rao sent a message",
    body: "Saturday 11am works. I'll share the gate pass details on Friday.",
    time: "18 min ago",
    read: false,
  },
  {
    id: "n3",
    tab: "Updates",
    title: "New AI match for you",
    body: "3 new 2BHKs in Koramangala under ₹36,000 match your saved filters.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n4",
    tab: "Bookings",
    title: "Service pro on the way",
    body: "Lakshmi Devi will arrive between 10:00 and 10:30 am.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n5",
    tab: "Updates",
    title: "Verification complete",
    body: "Your ID has been verified. You now have a trusted badge.",
    time: "2 days ago",
    read: true,
  },
];

// ─── 11-MONTH RENTAL AGREEMENT ───────────────────────────────────────────────

export type RentalAgreementStatus =
  | "draft"
  | "pending_tenant"
  | "pending_owner"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled"
  | "expired";

export type RentalAgreement = {
  id: string;
  propertyId: string;
  // Tenant info
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantAddress: string;
  tenantAadhaar?: string | undefined;
  tenantAccepted?: boolean | undefined;
  tenantSignature?: string | undefined;
  // Owner info
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress: string;
  ownerAadhaar?: string | undefined;
  ownerAccepted?: boolean | undefined;
  ownerSignature?: string | undefined;
  // Property info
  propertyTitle: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: number;
  furnishingStatus: string;
  // Rental terms
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  durationMonths: number;
  tenureMonths?: number | undefined;
  noticePeriodDays: number;
  rentDueDay: number;
  lateFeePerDay?: number | undefined;
  lockInMonths?: number | undefined;
  residentialOnly?: boolean | undefined;
  maxOccupants?: number | undefined;
  sublettingAllowed?: boolean | undefined;
  petsAllowed?: boolean | undefined;
  customTerms?: string | undefined;
  maintenanceResponsibility: "tenant" | "owner" | "shared";
  utilityResponsibility: "tenant" | "owner" | "shared";
  // Status & Cryptography
  status: RentalAgreementStatus;
  createdAt: string;
  updatedAt: string;
  tenantAcceptedAt?: string | undefined;
  ownerAcceptedAt?: string | undefined;
  completedAt?: string | undefined;
  rejectedAt?: string | undefined;
  rejectedBy?: "tenant" | "owner" | undefined;
  rejectionReason?: string | undefined;
  renewedFromId?: string | undefined;
  vaultHash?: string | undefined;
  createdByRole?: "tenant" | "owner" | undefined;
};

export const rentalAgreements: RentalAgreement[] = [
  {
    id: "agr-101",
    propertyId: "p1",
    tenantName: "Radhika Nayak",
    tenantEmail: "radhika@example.com",
    tenantPhone: "+91 98450 22110",
    tenantAddress: "204, Lotus Residency, JP Nagar, Bengaluru",
    ownerName: "Ananya Rao",
    ownerEmail: "ananya.rao@example.com",
    ownerPhone: "+91 99001 44210",
    ownerAddress: "12, Lake View, Koramangala, Bengaluru",
    propertyTitle: "Sunlit 2BHK near Coaching Hub",
    propertyAddress: "Bhawarkua, Indore",
    propertyType: "2BHK Apartment",
    bedrooms: 2,
    furnishingStatus: "Semi-furnished",
    monthlyRent: 11500,
    securityDeposit: 23000,
    startDate: "2026-10-01",
    endDate: "2027-08-31",
    durationMonths: 11,
    noticePeriodDays: 30,
    rentDueDay: 5,
    maintenanceResponsibility: "shared",
    utilityResponsibility: "tenant",
    status: "completed",
    createdAt: "2026-08-20T10:30:00.000Z",
    updatedAt: "2026-08-25T14:20:00.000Z",
    tenantAcceptedAt: "2026-08-22T09:15:00.000Z",
    ownerAcceptedAt: "2026-08-24T16:45:00.000Z",
    completedAt: "2026-08-25T14:20:00.000Z",
  },
];

// ─── END RENTAL AGREEMENT DATA ───────────────────────────────────────────────

export type AiRec = {
  id: string;
  kind: "Home" | "Stay" | "Service";
  title: string;
  subtitle: string;
  reason: string;
  image: string;
  meta: string;
  to: string;
  param: string;
};

export const aiRecs: AiRec[] = [
  {
    id: "a1",
    kind: "Home",
    title: "Sunlit 2BHK near Koramangala Park",
    subtitle: "Koramangala, Bengaluru",
    reason:
      "Matches your ₹30–36K budget, 2BHK preference and 4.5+ rating filter — plus it's 1.2 km from your workplace pin.",
    image: h1,
    meta: "₹34,000/mo",
    to: "/property/$id",
    param: "p1",
  },
  {
    id: "a2",
    kind: "Service",
    title: "Suresh Kumar · Electrician",
    subtitle: "South Bengaluru · Verified",
    reason:
      "You searched 'bedroom socket not working' twice. Suresh has 312 reviews for fault finding in your pin code.",
    image: h6,
    meta: "From ₹500",
    to: "/pro/$id",
    param: "w1",
  },
  {
    id: "a3",
    kind: "Stay",
    title: "Stanza Living Co-Living PG",
    subtitle: "HSR Layout, Bengaluru",
    reason:
      "Matches your PG preference near tech parks under ₹12K/month with 3-time meals & WiFi included.",
    image: s2,
    meta: "₹10,500/mo",
    to: "/stay/$id",
    param: "s2",
  },
  {
    id: "a4",
    kind: "Home",
    title: "Designer 2BHK in Gated Township",
    subtitle: "Gachibowli, Hyderabad",
    reason:
      "You shortlisted two township homes with gyms last week; this one adds a pool at a similar rent.",
    image: h6,
    meta: "₹42,000/mo",
    to: "/property/$id",
    param: "p6",
  },
  {
    id: "a5",
    kind: "Service",
    title: "Lakshmi Devi · Deep Cleaning",
    subtitle: "Team of 4 · Verified",
    reason:
      "Move-in cleaning is the most booked service within 7 days of a rental agreement like yours.",
    image: h3,
    meta: "From ₹900",
    to: "/pro/$id",
    param: "w3",
  },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
