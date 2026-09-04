import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ThumbsUp, MessageSquarePlus, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/app-shell";
import { Stars } from "@/components/branding";
import { reviews, type Review } from "@/lib/data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Verified Community Ratings | GrihaCare" },
      {
        name: "description",
        content:
          "Read and write genuine reviews for rental properties, temporary stays, and home service pros.",
      },
      { property: "og:title", content: "Reviews — GrihaCare" },
      { property: "og:description", content: "Community reviews for homes, stays and home pros." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newRating, setNewRating] = useState(5);

  function handleHelpful(id: string) {
    setReviewList((prev) => prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)));
    toast.success("Thank you for your feedback!");
  }

  function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newRev: Review = {
      id: `r-${Date.now()}`,
      author: "Radhika Nayak",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70",
      rating: newRating,
      date: "Today",
      title: newTitle,
      body: newBody,
      helpful: 0,
    };

    setReviewList([newRev, ...reviewList]);
    setNewTitle("");
    setNewBody("");
    setShowAddForm(false);
    toast.success("Your review has been published!");
  }

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Community Reviews</h1>
            <p className="mt-1 text-muted-foreground">
              Authentic ratings and feedback from verified tenants, guests, and homeowners.
            </p>
          </div>
          <Button onClick={() => setShowAddForm((v) => !v)}>
            <MessageSquarePlus className="mr-2 size-4" /> Write a Review
          </Button>
        </div>

        {showAddForm ? (
          <form
            onSubmit={handleAddReview}
            className="mt-6 rounded-xl border bg-card p-6 shadow-card space-y-4"
          >
            <h2 className="text-lg font-bold">Write Your Review</h2>
            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`size-6 ${
                        star <= newRating ? "fill-accent text-accent" : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-semibold">{newRating} / 5</span>
              </div>
            </div>

            <div>
              <Label htmlFor="rev-title">Headline / Title</Label>
              <Input
                id="rev-title"
                placeholder="Summarize your experience..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="rev-body">Detailed Review</Label>
              <Textarea
                id="rev-body"
                placeholder="What did you like or dislike? How was the service or property?"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                required
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        ) : null}

        <div className="mt-8 space-y-6">
          {reviewList.map((r) => (
            <article key={r.id} className="rounded-xl border bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt="" className="size-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-base">{r.author}</h3>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size={16} />
              </div>

              <h4 className="mt-4 font-bold text-lg">{r.title}</h4>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{r.body}</p>

              {r.photos && r.photos.length > 0 ? (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {r.photos.map((p, i) => (
                    <img key={i} src={p} alt="" className="size-20 rounded-lg object-cover" />
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => handleHelpful(r.id)}
                  className="flex items-center gap-1.5 hover:text-foreground font-medium transition-colors"
                >
                  <ThumbsUp className="size-4 text-primary" /> Helpful ({r.helpful})
                </button>
                <span>Verified Booking</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
