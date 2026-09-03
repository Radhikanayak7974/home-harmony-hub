# Home Harmony Hub

BUILD A MODERN WEBAPP FOR GRIHACARE - "One App. Every Home Need"

PROJECT OVERVIEW:

GrihaCare is an AI-powered platform connecting users with:

1. HOME RENTALS (find rental properties by location, budget, preferences)

2. TEMPORARY STAYS (book short-term accommodation)

3. VERIFIED HOME SERVICES (connect with electricians, plumbers, cleaners, etc.)

All in one trusted platform with AI-powered personalized matching.

TECHNOLOGY STACK:

- Next.js 14+ with TypeScript

- Tailwind CSS for styling

- Lucide React icons

- Use modern, clean design system

DESIGN:

- Primary Color: Deep Blue (#1E40AF)

- Secondary: Teal (#06B6D4)

- Accent: Orange (#F97316)

- Modern, minimalist, trustworthy aesthetic

- Fully responsive (mobile-first)

- Smooth animations and transitions

PAGES REQUIRED:

1. LANDING PAGE (Before Login)

   - Hero: "One App. Every Home Need" with signup CTA

   - Show problem: Fragmented home needs across multiple apps

   - Show solution: Three features (Homes, Stays, Services) with icons

   - User journey flow: Sign Up → Search → AI Match → Connect → Book & Pay → Review

   - Key benefits: AI Personalization, Trust & Verification, One Ecosystem

   - Target users: Renters, Property Owners, Service Professionals

2. AUTHENTICATION PAGES

   - SIGN UP: Full name, email, phone, password, user type selector (Home Seeker/Property Owner/Service Professional)

   - LOGIN: Email, password, forgot password link, remember me

   - OTP VERIFICATION: 6-digit OTP input with resend timer

   - Add real-time validation, password strength indicator

3. MAIN DASHBOARD (After Login)

   - Top navigation: Logo, search bar, location filter, notifications bell, messages, profile menu

   - Greeting section with quick stats (Saved Properties, Active Bookings, Messages, Reviews)

   - Three switchable sections:

   SECTION A: FIND A HOME (Rentals)

   - Search filters: Location, Budget slider, Property type, Amenities, Date picker

   - Grid of property cards (3 columns responsive) showing: Image carousel, Location, Price/month, Rating, Type, Description, Wishlist heart, View Details button

   - Pagination

   SECTION B: BOOK A STAY

   - Search filters: Destination, Check-in date, Check-out date, Guests count

   - Grid of stay cards showing: Image, Location, Price/night, Rating, Availability, Book Now button

   SECTION C: FIND SERVICES

   - Category filter chips: Electrical, Plumbing, Cleaning, Maintenance, Construction, Interior Design

   - Service type search, Location, Budget range filters

   - Service worker cards showing: Profile picture, Name, Service type, Rating, Service area, Price range, Verification badge, Bio, View Profile button

   AI RECOMMENDATIONS CAROUSEL: Show personalized recommendations with reasoning

   RECENT BOOKINGS: Table showing booking type, date, status, action buttons

   SAVED ITEMS: Tabs for Saved Homes, Stays, Services

4. PROPERTY DETAIL PAGE

   - Large image carousel (5+ images, thumbnails)

   - Key info bar: Price, rating, location, availability

   - Tabs: Overview, Photos, Reviews, Map, Owner Profile

   - Sidebar: Price breakdown, Availability calendar, Book Now button, Save to Wishlist, Share

   - Reviews section with sorting and filtering

5. SERVICE WORKER DETAIL PAGE

   - Profile hero: Image, name, service type, location, rating, verification badge, experience

   - Tabs: About, Portfolio, Reviews, Pricing, Availability calendar

   - Sidebar: Contact info, Request Service button, Message button, Save, Share

   - Reviews with photos

6. CHAT/MESSAGING PAGE

   - Left sidebar: Chat list with avatars, names, last message, unread badges

   - Main chat window: Contact name, status, messages with timestamps and read receipts

   - Message input with emoji picker and attachment icon, send button

7. USER PROFILE PAGE

   - Profile header: Picture, name, user type badge, member since, verification badge

   - Tabs:

     * My Information: Name, email, phone, bio, address (editable)

     * My Bookings: Current/Past/Cancelled tabs with booking cards and actions

     * My Wishlist: Saved items with remove option

     * Reviews: Received reviews and ratings

     * My Properties (if owner): List of properties with status, bookings, rating, edit option

     * My Services (if professional): Services offered with edit and add new buttons

     * Settings: Notifications, privacy, password change, deactivate account

8. BOOKING/PAYMENT PAGE

   - Multi-step form: Confirm Details → Special Requests → Payment Information → Confirmation

   - Show price breakdown (base, taxes, fee, total)

   - Payment method selection (Card, UPI, Wallet)

   - Coupon code field

   - Confirm Booking and Pay button

   - Success confirmation with booking number, receipt download, share option

9. REVIEWS PAGE

   - Write review form: Star rating, title, content, photo upload, submit button

   - Reviews list: Filter by rating, sort by newest/helpful, review cards with helpful votes

10. NOTIFICATIONS CENTER

    - Bell icon dropdown/modal with tabs: All, Bookings, Messages, Updates

    - Notification cards with timestamps, mark as read, delete

    - View All Notifications link

INTERACTIVE FEATURES:

✓ Real-time search with autocomplete

✓ Dynamic filter updates with chip display

✓ AI matching/recommendations with reasoning

✓ Verification badges on trusted profiles

✓ Real-time chat with typing indicator and read receipts

✓ 5-star rating system with individual reviews

✓ Wishlist/save functionality with heart icons

✓ Payment integration UI ready (Stripe)

✓ Responsive design (mobile, tablet, desktop)

✓ Loading states and skeleton loaders

✓ Error handling and empty states

✓ Form validation with real-time feedback

✓ Toast notifications for success/error messages

SAMPLE DATA:

- 8-10 properties (1BHK-3BHK, villas, studios) with images, ₹15K-75K/month

- 8-10 stays (hotels, homestays, hostels) with images, ₹1.5K-8K/night

- 10-12 service workers (different categories) with images, verified badge, ₹500-5000 per service

- Mix of ratings (3.5-5 stars) with sample reviews

- Sample user profiles and chat histories

ACCESSIBILITY:

- WCAG 2.1 AA compliant

- Semantic HTML, proper alt text

- Keyboard navigation, visible focus indicators

- Color contrast ≥ 4.5:1

- Mobile-friendly text sizes

STYLING NOTES:

- Modern cards with 8px rounded corners

- Subtle shadows and hover effects

- Consistent 8px grid spacing

- Smooth transitions (0.3s ease)

- Use Tailwind utilities for everything

- Mobile-first responsive approach

IMPORTANT:

- Make it modern and professional looking

- All forms must have proper validation

- Implement smooth animations

- Test on all device sizes

- Ensure fast load times

- Add loading states for all async operations

- Implement proper error boundaries

This is everything needed to build a complete, modern GrihaCare website with login, dashboard, and all features. Copy this entire prompt to Lovable for best results!

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7ab56ef9-db4e-480c-a192-95987fff55a7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
