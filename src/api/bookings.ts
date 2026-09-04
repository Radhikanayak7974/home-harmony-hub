import { createServerFn } from "@tanstack/react-start";
import { bookings, Booking } from "@/lib/data";

export interface CreateBookingPayload {
  title: string;
  kind: "Home" | "Stay" | "Service";
  date: string;
  amount: number;
}

const bookingDatabase: Booking[] = [...bookings];

/**
 * Backend API Server Function: Get User Bookings
 */
export const getBookingsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<Booking[]> => {
    return bookingDatabase;
  }
);

/**
 * Backend API Server Function: Create New Visit / Service Booking
 */
export const createBookingFn = createServerFn({ method: "POST" })
  .validator((data: CreateBookingPayload) => {
    if (!data.title || !data.date) {
      throw new Error("Booking title and date are required");
    }
    return data;
  })
  .handler(async ({ data }): Promise<Booking> => {
    const newBooking: Booking = {
      id: `GC-${Math.floor(80000 + Math.random() * 19000)}`,
      title: data.title,
      kind: data.kind,
      date: data.date,
      status: "Confirmed",
      amount: data.amount,
    };

    bookingDatabase.unshift(newBooking);
    return newBooking;
  });

/**
 * Backend API Server Function: Cancel Booking
 */
export const cancelBookingFn = createServerFn({ method: "POST" })
  .validator((data: { bookingId: string }) => data)
  .handler(async ({ data }): Promise<Booking> => {
    const item = bookingDatabase.find((b) => b.id === data.bookingId);
    if (!item) throw new Error("Booking not found");
    item.status = "Cancelled";
    return item;
  });

/**
 * Backend API Server Function: Reschedule Booking Date
 */
export const updateBookingDateFn = createServerFn({ method: "POST" })
  .validator((data: { bookingId: string; newDate: string }) => data)
  .handler(async ({ data }): Promise<Booking> => {
    const item = bookingDatabase.find((b) => b.id === data.bookingId);
    if (!item) throw new Error("Booking not found");
    item.date = data.newDate;
    item.status = "Confirmed";
    return item;
  });
