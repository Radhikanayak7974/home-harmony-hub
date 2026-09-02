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
};

export type Stay = {
  id: string;
  title: string;
  kind: "Hotel" | "Homestay" | "Hostel" | "Serviced Apartment";
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
    title: "Sunlit 2BHK near Koramangala Park",
    type: "2BHK Apartment",
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    price: 34000,
    rating: 4.8,
    reviews: 126,
    beds: 2,
    baths: 2,
    area: 1120,
    amenities: ["Parking", "Power backup", "Gym", "Security", "Lift"],
    description:
      "A bright, airy 2BHK with full-height windows, a modular kitchen and a quiet balcony overlooking the park. Walking distance to cafes and metro feeder.",
    images: [h1, h5, h6, h7, h9],
    owner: { name: "Ananya Rao", avatar: img("photo-1494790108377-be9c29b29330"), since: "2021", verified: true },
    available: "Immediately",
  },
  {
    id: "p2",
    title: "Premium 3BHK with Skyline View",
    type: "3BHK Apartment",
    location: "Powai, Mumbai",
    city: "Mumbai",
    price: 75000,
    rating: 4.9,
    reviews: 84,
    beds: 3,
    baths: 3,
    area: 1680,
    amenities: ["Pool", "Clubhouse", "Parking", "Gym", "Pet friendly"],
    description:
      "Corner unit on the 21st floor with lake and skyline views, imported fittings and a dedicated work nook.",
    images: [h2, h6, h8, h5, h10],
    owner: { name: "Rohit Mehta", avatar: img("photo-1500648767791-00dcc994a43e"), since: "2019", verified: true },
    available: "From 15 Oct",
  },
  {
    id: "p3",
    title: "Compact Studio for Young Professionals",
    type: "Studio",
    location: "HSR Layout, Bengaluru",
    city: "Bengaluru",
    price: 15500,
    rating: 4.3,
    reviews: 61,
    beds: 1,
    baths: 1,
    area: 420,
    amenities: ["Furnished", "WiFi", "Security", "Housekeeping"],
    description: "Fully furnished studio with smart storage, high-speed fibre and weekly housekeeping included.",
    images: [h3, h9, h7],
    owner: { name: "Sneha Kulkarni", avatar: img("photo-1438761681033-6461ffad8d80"), since: "2022", verified: true },
    available: "Immediately",
  },
  {
    id: "p4",
    title: "Garden Villa with Private Lawn",
    type: "Villa",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    price: 68000,
    rating: 4.7,
    reviews: 39,
    beds: 4,
    baths: 4,
    area: 2600,
    amenities: ["Private lawn", "Parking", "Servant room", "Solar", "Pet friendly"],
    description: "Independent villa in a gated community with a 900 sq ft lawn, terrace garden and covered parking.",
    images: [h4, h10, h6, h8],
    owner: { name: "Vikram Shetty", avatar: img("photo-1507003211169-0a1dd7228f2d"), since: "2018", verified: true },
    available: "From 1 Nov",
  },
  {
    id: "p5",
    title: "Peaceful 1BHK in Leafy Lane",
    type: "1BHK Apartment",
    location: "Aundh, Pune",
    city: "Pune",
    price: 19000,
    rating: 4.4,
    reviews: 52,
    beds: 1,
    baths: 1,
    area: 610,
    amenities: ["Parking", "Lift", "Water supply", "Security"],
    description: "Quiet first-floor 1BHK on a tree-lined street, five minutes from the riverside walking track.",
    images: [h5, h3, h1],
    owner: { name: "Meera Joshi", avatar: img("photo-1544005313-94ddf0286df2"), since: "2020", verified: false },
    available: "Immediately",
  },
  {
    id: "p6",
    title: "Designer 2BHK in Gated Township",
    type: "2BHK Apartment",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    price: 42000,
    rating: 4.6,
    reviews: 73,
    beds: 2,
    baths: 2,
    area: 1290,
    amenities: ["Gym", "Pool", "Kids play area", "Parking", "Power backup"],
    description: "Interior-designed home with warm wood finishes, a walk-in wardrobe and township amenities.",
    images: [h6, h2, h9, h7],
    owner: { name: "Arjun Reddy", avatar: img("photo-1519085360753-af0119f7cbe7"), since: "2021", verified: true },
    available: "Immediately",
  },
  {
    id: "p7",
    title: "Heritage Floor with Balcony",
    type: "2BHK Independent Floor",
    location: "Hauz Khas, Delhi",
    city: "Delhi",
    price: 55000,
    rating: 4.5,
    reviews: 47,
    beds: 2,
    baths: 2,
    area: 1400,
    amenities: ["Balcony", "Furnished", "Parking", "Pet friendly"],
    description: "Characterful independent floor with arched windows, a sun-drenched balcony and village views.",
    images: [h7, h4, h10],
    owner: { name: "Farah Khan", avatar: img("photo-1534528741775-53994a69daeb"), since: "2017", verified: true },
    available: "From 20 Oct",
  },
  {
    id: "p8",
    title: "Sea-Breeze 3BHK Family Home",
    type: "3BHK Apartment",
    location: "Besant Nagar, Chennai",
    city: "Chennai",
    price: 47000,
    rating: 4.6,
    reviews: 58,
    beds: 3,
    baths: 3,
    area: 1550,
    amenities: ["Parking", "Lift", "Security", "Power backup", "Balcony"],
    description: "Ten minutes from the beach, with cross ventilation, a puja room and a spacious utility area.",
    images: [h8, h1, h5, h6],
    owner: { name: "Karthik Iyer", avatar: img("photo-1506794778202-cad84cf45f1d"), since: "2019", verified: true },
    available: "Immediately",
  },
  {
    id: "p9",
    title: "Minimal 1BHK Co-living Suite",
    type: "1BHK Apartment",
    location: "Viman Nagar, Pune",
    city: "Pune",
    price: 22500,
    rating: 4.2,
    reviews: 44,
    beds: 1,
    baths: 1,
    area: 680,
    amenities: ["Furnished", "WiFi", "Housekeeping", "Community lounge"],
    description: "All-inclusive co-living suite with community events, laundry and a rooftop lounge.",
    images: [h9, h3, h2],
    owner: { name: "Nikhil Bansal", avatar: img("photo-1463453091185-61582044d556"), since: "2023", verified: false },
    available: "Immediately",
  },
  {
    id: "p10",
    title: "Duplex Penthouse with Terrace",
    type: "Penthouse",
    location: "Vastrapur, Ahmedabad",
    city: "Ahmedabad",
    price: 72000,
    rating: 4.9,
    reviews: 31,
    beds: 4,
    baths: 4,
    area: 3100,
    amenities: ["Private terrace", "Jacuzzi", "Parking", "Gym", "Concierge"],
    description: "Two-level penthouse with a 1200 sq ft terrace, outdoor kitchen and panoramic lake views.",
    images: [h10, h4, h8, h2],
    owner: { name: "Priya Desai", avatar: img("photo-1487412720507-e7ab37603c6f"), since: "2016", verified: true },
    available: "From 5 Nov",
  },
];

const s1 = img("photo-1566073771259-6a8506099945");
const s2 = img("photo-1571003123894-1f0594d2b5d9");
const s3 = img("photo-1445019980597-93fa8acb246c");
const s4 = img("photo-1590490360182-c33d57733427");
const s5 = img("photo-1551882547-ff40c63fe5fa");
const s6 = img("photo-1584132967334-10e028bd69f7");
const s7 = img("photo-1520250497591-112f2f40a3f4");
const s8 = img("photo-1522798514-97ceb8c4f1c8");
const s9 = img("photo-1618773928121-c32242e63f39");

export const stays: Stay[] = [
  { id: "s1", title: "The Lakeview Boutique Hotel", kind: "Hotel", location: "Udaipur, Rajasthan", price: 7800, rating: 4.9, reviews: 412, guests: 3, available: true, image: s1, description: "Lakefront rooms with hand-painted frescoes and a rooftop dinner terrace." },
  { id: "s2", title: "Coorg Coffee Estate Homestay", kind: "Homestay", location: "Madikeri, Karnataka", price: 4200, rating: 4.8, reviews: 268, guests: 4, available: true, image: s2, description: "Family-run bungalow inside a working coffee plantation, breakfast included." },
  { id: "s3", title: "Backpackers' Loft Hostel", kind: "Hostel", location: "Anjuna, Goa", price: 1500, rating: 4.1, reviews: 530, guests: 1, available: true, image: s3, description: "Bright dorms, surfboard storage and nightly beach bonfires." },
  { id: "s4", title: "Skyline Serviced Apartment", kind: "Serviced Apartment", location: "Bandra, Mumbai", price: 6400, rating: 4.7, reviews: 189, guests: 4, available: false, image: s4, description: "Full kitchen, laundry and weekly housekeeping for longer work trips." },
  { id: "s5", title: "Old City Heritage Haveli", kind: "Homestay", location: "Jaipur, Rajasthan", price: 3900, rating: 4.6, reviews: 221, guests: 3, available: true, image: s5, description: "Restored 19th-century haveli with courtyard breakfasts and rooftop views." },
  { id: "s6", title: "Himalayan Pine Cottage", kind: "Homestay", location: "Manali, Himachal", price: 3300, rating: 4.5, reviews: 143, guests: 5, available: true, image: s6, description: "Wood-fired stove, valley-facing deck and a stocked winter pantry." },
  { id: "s7", title: "Marina Business Hotel", kind: "Hotel", location: "T. Nagar, Chennai", price: 5200, rating: 4.3, reviews: 356, guests: 2, available: true, image: s7, description: "Central location, 24x7 desk, complimentary airport pickup." },
  { id: "s8", title: "Riverside Zen Stay", kind: "Homestay", location: "Rishikesh, Uttarakhand", price: 2600, rating: 4.7, reviews: 176, guests: 2, available: true, image: s8, description: "Morning yoga deck over the Ganga, sattvic meals and silent hours." },
  { id: "s9", title: "Tech Park Studio Suites", kind: "Serviced Apartment", location: "Whitefield, Bengaluru", price: 3100, rating: 4.4, reviews: 205, guests: 2, available: true, image: s9, description: "Walk to the tech park, high-speed WiFi and a coworking lounge." },
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
  { id: "w1", name: "Suresh Kumar", service: "Certified Electrician", category: "Electrical", rating: 4.9, reviews: 312, area: "South Bengaluru", priceFrom: 500, priceTo: 3500, verified: true, experience: 12, bio: "Licensed electrician specialising in home rewiring, smart switch installation and load audits.", avatar: a("photo-1507003211169-0a1dd7228f2d"), portfolio: [h6, h7, h8], skills: ["Rewiring", "Smart home", "Inverter setup", "Fault finding"] },
  { id: "w2", name: "Ramesh Yadav", service: "Plumbing Specialist", category: "Plumbing", rating: 4.7, reviews: 244, area: "Andheri, Mumbai", priceFrom: 600, priceTo: 4000, verified: true, experience: 9, bio: "Leak detection, bathroom fittings and full pipeline replacement with a 90-day workmanship warranty.", avatar: a("photo-1506794778202-cad84cf45f1d"), portfolio: [h5, h9], skills: ["Leak repair", "Bath fitting", "Water heater", "Drainage"] },
  { id: "w3", name: "Lakshmi Devi", service: "Deep Cleaning Lead", category: "Cleaning", rating: 4.8, reviews: 486, area: "Gachibowli, Hyderabad", priceFrom: 900, priceTo: 5000, verified: true, experience: 7, bio: "Leads a 4-person team for move-in deep cleans, sofa shampooing and kitchen degreasing.", avatar: a("photo-1544005313-94ddf0286df2"), portfolio: [h1, h3], skills: ["Deep clean", "Sofa shampoo", "Move-in clean", "Sanitisation"] },
  { id: "w4", name: "Imran Sheikh", service: "AC & Appliance Repair", category: "Maintenance", rating: 4.6, reviews: 198, area: "Hauz Khas, Delhi", priceFrom: 500, priceTo: 3000, verified: true, experience: 11, bio: "Split and window AC servicing, gas refill, washing machine and refrigerator repairs.", avatar: a("photo-1519085360753-af0119f7cbe7"), portfolio: [h2], skills: ["AC service", "Gas refill", "Washing machine", "Fridge"] },
  { id: "w5", name: "Anita Sharma", service: "Interior Designer", category: "Interior Design", rating: 5.0, reviews: 87, area: "Pune", priceFrom: 2500, priceTo: 5000, verified: true, experience: 8, bio: "Warm, material-led interiors for rentals and compact homes. 3D walkthroughs before execution.", avatar: a("photo-1487412720507-e7ab37603c6f"), portfolio: [h4, h10, h6], skills: ["Space planning", "3D render", "Modular kitchen", "Styling"] },
  { id: "w6", name: "Joseph Fernandes", service: "Civil Contractor", category: "Construction", rating: 4.5, reviews: 64, area: "Goa", priceFrom: 3000, priceTo: 5000, verified: true, experience: 15, bio: "Small-scale renovations, waterproofing and structural repair with documented material costs.", avatar: a("photo-1500648767791-00dcc994a43e"), portfolio: [h8, h7], skills: ["Renovation", "Waterproofing", "Tiling", "Plaster"] },
  { id: "w7", name: "Deepa Nair", service: "Housekeeping Partner", category: "Cleaning", rating: 4.4, reviews: 152, area: "Besant Nagar, Chennai", priceFrom: 500, priceTo: 2200, verified: false, experience: 5, bio: "Daily and weekly housekeeping with flexible slots, background verified.", avatar: a("photo-1438761681033-6461ffad8d80"), portfolio: [h3], skills: ["Daily clean", "Dishes", "Laundry"] },
  { id: "w8", name: "Manoj Verma", service: "Carpenter & Fittings", category: "Maintenance", rating: 4.7, reviews: 173, area: "Noida", priceFrom: 700, priceTo: 4500, verified: true, experience: 14, bio: "Custom wardrobes, door repairs and modular furniture assembly.", avatar: a("photo-1463453091185-61582044d556"), portfolio: [h9, h5], skills: ["Wardrobe", "Door repair", "Furniture", "Polish"] },
  { id: "w9", name: "Kavya Menon", service: "Painting Contractor", category: "Construction", rating: 4.6, reviews: 111, area: "Kochi", priceFrom: 1500, priceTo: 5000, verified: true, experience: 10, bio: "Low-VOC interior painting, texture walls and exterior weatherproof coats.", avatar: a("photo-1534528741775-53994a69daeb"), portfolio: [h1, h4], skills: ["Interior paint", "Texture", "Waterproof coat"] },
  { id: "w10", name: "Alok Pandey", service: "Electrical Maintenance", category: "Electrical", rating: 4.3, reviews: 96, area: "Lucknow", priceFrom: 500, priceTo: 2500, verified: false, experience: 6, bio: "Fan, light and MCB replacements with same-day slots on weekdays.", avatar: a("photo-1492562080023-ab3db95bfbce"), portfolio: [h6], skills: ["Fan install", "MCB", "Lighting"] },
  { id: "w11", name: "Rina Das", service: "Pest Control Expert", category: "Maintenance", rating: 4.5, reviews: 130, area: "Kolkata", priceFrom: 800, priceTo: 3200, verified: true, experience: 8, bio: "Child- and pet-safe termite, cockroach and mosquito treatments with follow-up visits.", avatar: a("photo-1494790108377-be9c29b29330"), portfolio: [h2], skills: ["Termite", "Cockroach", "Mosquito"] },
  { id: "w12", name: "Gurpreet Singh", service: "Plumbing & Sanitary", category: "Plumbing", rating: 4.8, reviews: 207, area: "Chandigarh", priceFrom: 600, priceTo: 3800, verified: true, experience: 13, bio: "Full bathroom renovations, concealed piping and water-saving fixture upgrades.", avatar: a("photo-1522075469751-3a6694fb2f61"), portfolio: [h10, h8], skills: ["Bath reno", "Concealed piping", "Fixtures"] },
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
  { id: "r1", author: "Divya Menon", avatar: a("photo-1494790108377-be9c29b29330"), rating: 5, date: "12 Aug 2026", title: "Exactly as listed, zero surprises", body: "Photos matched the home perfectly and the owner handled the paperwork within a day. The AI match put this at the top of my list and it was right.", helpful: 24, photos: [h1] },
  { id: "r2", author: "Aditya Nair", avatar: a("photo-1506794778202-cad84cf45f1d"), rating: 4, date: "3 Aug 2026", title: "Great place, parking is tight", body: "Lovely light through the day and a quiet street. Only nitpick is that visitor parking fills up by evening.", helpful: 11 },
  { id: "r3", author: "Shreya Kapoor", avatar: a("photo-1544005313-94ddf0286df2"), rating: 5, date: "27 Jul 2026", title: "The verification really matters", body: "I've been scammed on other listing apps before. Having the badge and a real ID check made this feel safe.", helpful: 38 },
  { id: "r4", author: "Mohit Grover", avatar: a("photo-1519085360753-af0119f7cbe7"), rating: 3.5, date: "14 Jul 2026", title: "Good value for the area", body: "Slightly dated fittings but the landlord agreed to replace the geyser before move-in. Fair for the rent.", helpful: 6 },
  { id: "r5", author: "Fatima Ali", avatar: a("photo-1534528741775-53994a69daeb"), rating: 5, date: "2 Jul 2026", title: "Booked and moved in within a week", body: "Chat, documents and payment all happened in one app. No brokers, no chasing anyone on the phone.", helpful: 41, photos: [h5, h6] },
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
      { id: "m1", from: "them", text: "Hi Radhika! Thanks for saving the listing. Would you like a visit this weekend?", time: "10:12" },
      { id: "m2", from: "me", text: "Yes please. Is Saturday 11am possible?", time: "10:15", read: true },
      { id: "m3", from: "them", text: "Saturday 11am works. I'll share the gate pass details on Friday.", time: "10:16" },
      { id: "m4", from: "them", text: "Also, the parking slot is covered — forgot to mention it in the listing.", time: "10:17" },
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
      { id: "m1", from: "me", text: "Two bedroom points are dead after the rain.", time: "Yesterday", read: true },
      { id: "m2", from: "them", text: "Likely a tripped RCCB or moisture in the conduit. I can come tomorrow 4pm, ₹500 visit charge adjusted in the bill.", time: "Yesterday" },
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
      { id: "m1", from: "them", text: "Move-in deep clean quote for 1120 sq ft is ₹3,400 including sofa shampoo.", time: "08:40" },
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
      { id: "m1", from: "them", text: "Your refund of ₹2,100 for booking GC-88213 has been processed.", time: "Mon" },
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
  { id: "GC-90142", kind: "Stay", title: "Coorg Coffee Estate Homestay", date: "18–21 Sep 2026", amount: 12600, status: "Confirmed" },
  { id: "GC-90118", kind: "Service", title: "Deep clean — Lakshmi Devi", date: "9 Sep 2026", amount: 3400, status: "Pending" },
  { id: "GC-89977", kind: "Home", title: "Site visit — Koramangala 2BHK", date: "5 Sep 2026", amount: 0, status: "Confirmed" },
  { id: "GC-89610", kind: "Service", title: "AC service — Imran Sheikh", date: "22 Aug 2026", amount: 1800, status: "Completed" },
  { id: "GC-88213", kind: "Stay", title: "Backpackers' Loft Hostel", date: "2 Aug 2026", amount: 2100, status: "Cancelled" },
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
  { id: "n1", tab: "Bookings", title: "Booking confirmed", body: "Coorg Coffee Estate Homestay, 18–21 Sep. Receipt is ready to download.", time: "2 min ago", read: false },
  { id: "n2", tab: "Messages", title: "Ananya Rao sent a message", body: "Saturday 11am works. I'll share the gate pass details on Friday.", time: "18 min ago", read: false },
  { id: "n3", tab: "Updates", title: "New AI match for you", body: "3 new 2BHKs in Koramangala under ₹36,000 match your saved filters.", time: "1 hr ago", read: false },
  { id: "n4", tab: "Bookings", title: "Service pro on the way", body: "Lakshmi Devi will arrive between 10:00 and 10:30 am.", time: "Yesterday", read: true },
  { id: "n5", tab: "Updates", title: "Verification complete", body: "Your ID has been verified. You now have a trusted badge.", time: "2 days ago", read: true },
];

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
  { id: "a1", kind: "Home", title: "Sunlit 2BHK near Koramangala Park", subtitle: "Koramangala, Bengaluru", reason: "Matches your ₹30–36K budget, 2BHK preference and 4.5+ rating filter — plus it's 1.2 km from your workplace pin.", image: h1, meta: "₹34,000/mo", to: "/property/$id", param: "p1" },
  { id: "a2", kind: "Service", title: "Suresh Kumar · Electrician", subtitle: "South Bengaluru · Verified", reason: "You searched 'bedroom socket not working' twice. Suresh has 312 reviews for fault finding in your pin code.", image: h6, meta: "From ₹500", to: "/pro/$id", param: "w1" },
  { id: "a3", kind: "Stay", title: "Coorg Coffee Estate Homestay", subtitle: "Madikeri, Karnataka", reason: "Weekend trips you booked before were nature homestays within 6 hours' drive and under ₹5K/night.", image: s2, meta: "₹4,200/night", to: "/stay/$id", param: "s2" },
  { id: "a4", kind: "Home", title: "Designer 2BHK in Gated Township", subtitle: "Gachibowli, Hyderabad", reason: "You shortlisted two township homes with gyms last week; this one adds a pool at a similar rent.", image: h6, meta: "₹42,000/mo", to: "/property/$id", param: "p6" },
  { id: "a5", kind: "Service", title: "Lakshmi Devi · Deep Cleaning", subtitle: "Team of 4 · Verified", reason: "Move-in cleaning is the most booked service within 7 days of a rental agreement like yours.", image: h3, meta: "From ₹900", to: "/pro/$id", param: "w3" },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
