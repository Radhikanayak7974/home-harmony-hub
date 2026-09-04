import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Download,
  XCircle,
  PlusCircle,
  Sparkles,
  MapPin,
  Building,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppShell } from "@/components/app-shell";
import { bookings as initialBookings, inr, type Booking } from "@/lib/data";
import {
  getBookingsFn,
  createBookingFn,
  cancelBookingFn,
  updateBookingDateFn,
} from "@/api/bookings";

type BookingSearch = {
  item?: string | undefined;
};

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    item: typeof search["item"] === "string" ? (search["item"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Bookings & Schedule — Manage Stays & Visits | GrihaCare" },
      {
        name: "description",
        content: "Schedule visits, manage stay reservations, and track home service appointments.",
      },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState<Booking[]>(initialBookings);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // Selected Booking for Details Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [rescheduling, setRescheduling] = useState(false);

  // New Booking Modal
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("Sunlit 2BHK Koramangala Site Visit");
  const [newKind, setNewKind] = useState<"Home" | "Stay" | "Service">("Home");
  const [newDate, setNewDate] = useState("2026-09-15");
  const [creating, setCreating] = useState(false);

  // Load Bookings from Backend API
  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await getBookingsFn();
      setBookingList(res);
    } catch {
      /* fallback to initial */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle URL Query Parameter Booking
  useEffect(() => {
    if (search.item) {
      setNewTitle(search.item);
      setNewModalOpen(true);
    }
  }, [search.item]);

  // Handle New Booking Creation
  async function handleCreateNewBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter a valid title");
      return;
    }

    setCreating(true);
    try {
      const created = await createBookingFn({
        data: {
          title: newTitle,
          kind: newKind,
          date: newDate,
          amount: newKind === "Home" ? 0 : 3500,
        },
      });

      toast.success(`Booking ${created.id} Scheduled Successfully!`);
      setNewModalOpen(false);
      navigate({ to: "/booking", search: {} });
      fetchBookings();
    } catch (err: any) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setCreating(false);
    }
  }

  // Handle Cancel Booking Action
  async function handleCancelBooking(bId: string) {
    try {
      await cancelBookingFn({ data: { bookingId: bId } });
      toast.success(`Booking ${bId} has been cancelled`);
      if (selectedBooking && selectedBooking.id === bId) {
        setSelectedBooking({ ...selectedBooking, status: "Cancelled" });
      }
      fetchBookings();
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  }

  // Handle Reschedule Date Action
  async function handleRescheduleDate() {
    if (!selectedBooking || !newRescheduleDate) return;
    setRescheduling(true);
    try {
      await updateBookingDateFn({
        data: { bookingId: selectedBooking.id, newDate: newRescheduleDate },
      });
      toast.success(`Booking rescheduled to ${newRescheduleDate}`);
      setSelectedBooking({ ...selectedBooking, date: newRescheduleDate, status: "Confirmed" });
      fetchBookings();
    } catch (err) {
      toast.error("Failed to reschedule date");
    } finally {
      setRescheduling(false);
    }
  }

  function openDetails(b: Booking) {
    setSelectedBooking(b);
    setNewRescheduleDate(b.date);
    setDetailsModalOpen(true);
  }

  const filteredBookings = bookingList.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return (
          <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <CheckCircle2 className="mr-1 size-3" /> Confirmed
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="mr-1 size-3" /> Pending
          </Badge>
        );
      case "Completed":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Completed
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-500/20 text-red-300 border border-red-500/30">
            <XCircle className="mr-1 size-3" /> Cancelled
          </Badge>
        );
    }
  };

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500 space-y-6 pb-16">
        {/* HEADER & TOP BANNER */}
        <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="relative z-10 space-y-2">
            <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold uppercase tracking-wider px-3 py-1">
              <Sparkles className="mr-1.5 size-3.5 text-teal-400" />
              Automated Site Visits & Reservations
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-outfit">
              Bookings & <span className="hero-gradient-title">Schedule</span>
            </h1>
            <p className="text-zinc-300 text-sm max-w-xl">
              Manage your upcoming home site visits, PG stay reservations, and domestic worker appointments with instant status updates.
            </p>
          </div>

          <div className="relative z-10">
            <Button
              className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs px-6 py-5 rounded-2xl shadow-teal-glow"
              onClick={() => setNewModalOpen(true)}
            >
              <PlusCircle className="mr-1.5 size-4" /> Schedule New Visit / Stay
            </Button>
          </div>
        </div>

        {/* STATUS FILTER TABS */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {["all", "confirmed", "pending", "completed", "cancelled"].map((st) => (
              <Button
                key={st}
                size="sm"
                variant={filterStatus === st ? "default" : "outline"}
                className={`text-xs font-bold capitalize rounded-xl ${
                  filterStatus === st
                    ? "bg-teal-400 text-slate-950 hover:bg-teal-300"
                    : "border-white/10 text-zinc-400 hover:text-white"
                }`}
                onClick={() => setFilterStatus(st)}
              >
                {st}
              </Button>
            ))}
          </div>

          <span className="text-xs font-bold text-zinc-400 hidden sm:inline">
            Showing {filteredBookings.length} Bookings
          </span>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-28 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center space-y-3">
              <Calendar className="mx-auto size-10 text-zinc-500" />
              <h3 className="text-lg font-bold text-white">No Bookings Found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No active bookings matching this status filter. Click below to schedule a new visit.
              </p>
              <Button
                size="sm"
                className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs rounded-xl"
                onClick={() => setNewModalOpen(true)}
              >
                Schedule New Visit Now
              </Button>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:border-teal-500/50"
              >
                <div className="flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-500/20 text-teal-300">
                    <CalendarCheck className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-400">{b.id}</span>
                      <Badge variant="outline" className="border-white/15 text-zinc-300 text-[10px] uppercase font-bold">
                        {b.kind}
                      </Badge>
                      {getStatusBadge(b.status)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{b.title}</h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <Calendar className="size-3.5 text-teal-400" /> {b.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                  {b.amount > 0 ? (
                    <p className="text-lg font-extrabold text-white">{inr(b.amount)}</p>
                  ) : (
                    <p className="text-xs font-extrabold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full">
                      Free Site Visit
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold border-white/20 text-white hover:bg-white/10 rounded-xl px-5"
                    onClick={() => openDetails(b)}
                  >
                    View Details & Actions
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BOOKING DETAILS & ACTIONS DIALOG */}
      {selectedBooking && (
        <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white font-bold">
                <FileCheck2 className="size-5 text-teal-400" /> Booking Details ({selectedBooking.id})
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400">
                Manage appointment, reschedule date, or cancel booking.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-teal-500/30 text-teal-300 text-xs">
                    {selectedBooking.kind}
                  </Badge>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <h4 className="font-bold text-white text-base">{selectedBooking.title}</h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <Calendar className="size-3.5 text-teal-400" /> Scheduled: <strong>{selectedBooking.date}</strong>
                </p>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Booking Fee:</span>
                  <span className="font-extrabold text-white">
                    {selectedBooking.amount > 0 ? inr(selectedBooking.amount) : "₹0 Free Visit"}
                  </span>
                </div>
              </div>

              {/* Reschedule Box */}
              {selectedBooking.status !== "Cancelled" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 space-y-2">
                  <Label className="block text-xs font-bold text-zinc-300 uppercase">Reschedule Visit Date</Label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={newRescheduleDate}
                      onChange={(e) => setNewRescheduleDate(e.target.value)}
                      className="bg-slate-950 border-white/15 text-white text-xs"
                    />
                    <Button
                      size="sm"
                      className="bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shrink-0 rounded-xl"
                      onClick={handleRescheduleDate}
                      disabled={rescheduling}
                    >
                      {rescheduling ? "Updating..." : "Reschedule"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold border-white/20 text-white hover:bg-white/10"
                  onClick={() => toast.info(`Downloading official PDF confirmation invoice for ${selectedBooking.id}...`)}
                >
                  <Download className="mr-2 size-4 text-teal-400" /> Download PDF Booking Receipt
                </Button>

                {selectedBooking.status !== "Cancelled" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-xs font-bold"
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                  >
                    <XCircle className="mr-2 size-4" /> Cancel Booking Appointment
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* NEW BOOKING MODAL */}
      <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white font-bold">
              <PlusCircle className="size-5 text-teal-400" /> Schedule New Visit / Stay
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400">
              Select item and preferred date for instant booking.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateNewBooking} className="space-y-4 py-2">
            <div>
              <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Property or Service Title</Label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Koramangala 2BHK Site Visit"
                className="bg-slate-950 border-white/15 text-white text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Booking Category</Label>
                <select
                  value={newKind}
                  onChange={(e: any) => setNewKind(e.target.value)}
                  className="w-full h-9 bg-slate-950 border border-white/15 text-white text-xs rounded-md px-2 outline-none"
                >
                  <option value="Home">Home Rental</option>
                  <option value="Stay">PG / Homestay</option>
                  <option value="Service">Home Service</option>
                </select>
              </div>

              <div>
                <Label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Visit Date</Label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-slate-950 border-white/15 text-white text-xs"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold py-5 text-xs rounded-xl"
              disabled={creating}
            >
              {creating ? "Scheduling Visit..." : "Confirm & Schedule Visit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
