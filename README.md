# 🏡 GrihaCare — Unified Housing & Rental Intelligence Ecosystem

> **One App. Every Home Need.**  
> GrihaCare is an all-in-one housing ecosystem that combines **11-Month Permanent Rental Agreements**, **AI Rent Fairness Benchmarking**, **GrihaCare Trust Score Audits**, and **Digital Move-In Passports** into a single cryptographic platform.

---

## 🌟 Platform Overview

Renting and managing residential properties in urban India is traditionally plagued by fragmented applications, price opacity, security deposit disputes, and informal lease agreements. 

**GrihaCare** solves these challenges by providing a transparent, end-to-end platform for home seekers, property owners, and service professionals. From discovering verified properties and auditing rental fairness to executing legally compliant 11-month lease deeds and logging move-in damage condition records into a cryptographic **Rental Vault**, GrihaCare streamlines the entire living lifecycle.

---

## ✨ Key USPs & Standout Features

### 1. 📜 11-Month Permanent Rental Deed & Rental Vault
* **Legally Compliant 11-Month Flow**: Tailored to Indian rent control acts (exempting mandatory registration under Section 17 of the Registration Act, 1908).
* **Dual Digital Signatures**: Secure, bi-party digital signature workflow for both tenants and landlords with audit timestamps.
* **Lock-In & Renewal Engine**: Built-in 3-month lock-in rules, notice period tracking, and 1-click 11-month agreement renewal.
* **🔐 Cryptographic Rental Vault**: Every completed deed generates a unique **SHA-256 cryptographic hash**, storing tamper-proof records for legal dispute protection.

### 2. 🛡️ GrihaCare Trust Score (0–100)
Every property listing undergoes a multi-point verification process resulting in a real-time **Trust Score (0–100)**:
* **Owner Identity & Aadhaar KYC**: Verified identity proof matching land registry records.
* **Physical Safety Audit**: 24-point structural, electrical, and safety inspection score.
* **Document Title Deed Verification**: Authenticity checks on property ownership documents.
* **Listing Completeness**: High-resolution image verification, exact map coordinates, and amenity accuracy.

### 3. 📊 AI Rent Fairness Index
Powered by market-indexed valuation logic to protect tenants from overpriced rentals and help owners set competitive pricing:
* **Fairness Indicators**: Instant classification into **Fair**, **Slightly High**, or **High** rent categories.
* **Hyper-Local Price Range**: Displays estimated market rental ranges (e.g. `₹11,000 – ₹13,000 / mo`) based on locality averages, BHK size, and furnishing status.
* **Locality Percentile Insights**: Evaluates value proposition against historical rental data in top coaching hubs and IT corridors.

### 4. 📸 Digital Move-In Passport
Eliminates end-of-tenancy deposit disputes by capturing a tamper-proof baseline record of the property condition at key handover:
* **4-Step Inspection Wizard**:
  1. **Utility Meter Readings**: Logs initial Electricity (kWh) and Water (kL) meter readings with optional photo uploads.
  2. **Pre-Existing Damage Logs**: Records room location, severity (*Minor, Moderate, Major*), notes, and photo proof.
  3. **Key & Furniture Inventory Checklist**: Verifies quantity and condition (*Good, Fair, Damaged, Missing*) for appliances, keys, and fixtures.
  4. **Digital Signature & Cryptographic Seal**: Tenant digital signature locks the record into the **Rental Vault** with a unique SHA-256 hash certificate.

### 5. 🏨 Temporary Stays & Student PGs
* Flexible short-term bookings for co-living PGs, serviced hostels, and student accommodations.
* Filters for meal inclusions (3-time mess food), high-speed Wi-Fi, study desks, and proximity to coaching centers.

### 6. 🛠️ Verified Home Services & Handymen
* Connect directly with verified electricians, plumbers, deep cleaners, and appliance technicians.
* Instant service request dispatch with rating histories, transparent hourly rates, and verification badges.

---

## 🏗️ System Architecture & Technology Stack

GrihaCare is engineered with a modern, high-performance TypeScript stack featuring server-side rendering, type-safe data loading, and glassmorphic UI aesthetics.

```
                    ┌────────────────────────────────────────┐
                    │            Client Browser              │
                    │   (React 19 + TanStack Router + UI)    │
                    └──────────────────┬─────────────────────┘
                                       │
                                       ▼
                    ┌────────────────────────────────────────┐
                    │      TanStack Start Server Engine      │
                    │    (SSR + Server Functions Layer)      │
                    └───┬────────────────────────────────┬───┘
                        │                                │
                        ▼                                ▼
       ┌────────────────────────────────┐ ┌────────────────────────────────┐
       │   Agreements & Vault Engine    │ │    Properties & Trust Audit    │
       │ (11-Mo Lease + Move-In Passport)│ │ (Trust Score + AI Rent Fair)   │
       └────────────────────────────────┘ └────────────────────────────────┘
```

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Modern UI engine utilizing reactive hooks and server-rendered components. |
| **Routing & SSR** | **TanStack Router / TanStack Start** | File-based type-safe routing, SSR page loaders, and head meta management. |
| **Styling & Design** | **Tailwind CSS v4 + Lucide Icons** | Custom glassmorphism dark theme tokens (`styles.css`), responsive layouts, and modern typography. |
| **State Management** | **Zustand + React Hooks** | Centralized user session, active state persistence, and notification queues. |
| **Server Logic** | **TanStack Server Functions** | Type-safe server actions (`src/api/agreements.ts`, `src/server/api/`). |
| **Utilities** | **Date-fns, Sonner** | Date mathematics for 11-month lease cycles and toast notifications. |

---

## 📁 Repository Directory Structure

```
home-harmony-hub/
├── src/
│   ├── api/                     # Type-safe server functions
│   │   ├── agreements.ts        # 11-Month lease & Move-In Passport backend handlers
│   │   └── properties.ts        # Property data & search handlers
│   ├── components/              # Core reusable UI components
│   │   ├── app-shell.tsx        # Responsive navigation & global layout header/footer
│   │   ├── branding.tsx         # Verified badges, trust seals & rating stars
│   │   ├── cards.tsx            # Property Cards with Trust Score & AI Fair Rent badges
│   │   ├── passport-modal.tsx   # 4-Step Digital Move-In Passport inspection modal
│   │   └── ui/                  # Primitives (Buttons, Badges, Inputs, Dialogs, Tabs)
│   ├── lib/
│   │   ├── app-store.ts         # Zustand user state & authentication store
│   │   └── data.ts              # Domain types (RentalAgreement, MoveInPassport, Property)
│   ├── routes/                  # TanStack File-Based Route Tree
│   │   ├── index.tsx            # High-conversion Landing Page
│   │   ├── dashboard.tsx        # Main Search Dashboard (Homes, Stays, Services)
│   │   ├── property.$id.tsx     # Property Detail page (Trust Audit & Rent Fairness)
│   │   ├── agreement.new.tsx    # 11-Month Permanent Lease Creation Form
│   │   ├── agreement.$id.tsx    # Digital Deed Execution & Audit Trail
│   │   ├── agreement.vault.tsx  # Rental Vault (Lease Deeds + Move-In Passports)
│   │   ├── booking.tsx          # Temporary Stay & Visit Scheduling
│   │   ├── messages.tsx         # Real-time In-App Messaging
│   │   └── profile.tsx          # User Profile & Activity Hub
│   ├── server/                  # API server routes & RPC handlers
│   ├── styles.css               # Tailored CSS variables, gradients, and custom utility classes
│   └── routeTree.gen.ts         # Auto-generated TanStack router tree
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/grihacare.git
   cd grihacare
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:8081` (or `http://localhost:8080`).*

4. **Verify TypeScript Type Safety**
   ```bash
   npx tsc --noEmit
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🔒 Security & Cryptographic Proofs

Every document created on GrihaCare is assigned a deterministic cryptographic signature hash computed over:
* Contracting Party Identities (Tenant & Owner Aadhaar/PAN metadata)
* Legal Lease Clauses (Rent, Deposit, Tenure, Lock-in)
* Initial Condition Artifacts (Meter readings, damage logs, inventory checklist)

This ensures that neither party can unilaterally alter agreement terms or claim unrecorded damages upon move-out.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <b>GrihaCare</b> — Reimagining Residential Renting in India.
</p>
