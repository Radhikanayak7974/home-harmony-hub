import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Phone, Heart, ShieldCheck, LogOut, Building, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/app-shell";
import { PropertyCard, StayCard, ProCard, EmptyState } from "@/components/cards";
import { properties, stays, pros } from "@/lib/data";
import { useStore } from "@/lib/app-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Saved Items — GrihaCare" },
      {
        name: "description",
        content: "View account settings, manage saved homes and pros, and update user preferences.",
      },
      { property: "og:title", content: "Profile — GrihaCare" },
      { property: "og:description", content: "Manage your GrihaCare account and wishlist." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, saved, signOut } = useStore();
  const [name, setName] = useState(user?.name ?? "Radhika Nayak");
  const [email, setEmail] = useState(user?.email ?? "radhika@example.com");
  const [phone, setPhone] = useState(user?.phone ?? "+91 98450 22110");
  const [isSaving, setIsSaving] = useState(false);

  const savedProperties = properties.filter((p) => saved.includes(p.id));
  const savedStays = stays.filter((s) => saved.includes(s.id));
  const savedPros = pros.filter((w) => saved.includes(w.id));

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile details updated successfully!");
    }, 600);
  }

  return (
    <AppShell>
      <div className="animate-in fade-in duration-500">
        <h1 className="text-3xl font-extrabold">Account Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your personal details, verified identity, and saved wishlist.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-xl border bg-card p-6 shadow-card h-fit space-y-6">
            <div className="text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary/10 text-primary text-2xl font-extrabold">
                {name.charAt(0)}
              </div>
              <h2 className="mt-4 text-xl font-bold">{name}</h2>
              <Badge variant="secondary" className="mt-1">
                {user?.userType ?? "Home Seeker"}
              </Badge>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-success">
                <ShieldCheck className="size-4" /> Identity Verified
              </div>
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span>{phone}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                signOut();
                toast.info("Logged out of account");
              }}
            >
              <LogOut className="mr-2 size-4" /> Sign Out
            </Button>
          </aside>

          <div>
            <Tabs defaultValue="saved">
              <TabsList>
                <TabsTrigger value="saved">
                  <Heart className="mr-2 size-4 text-accent" /> Saved Wishlist ({saved.length})
                </TabsTrigger>
                <TabsTrigger value="edit">
                  <User className="mr-2 size-4" /> Edit Profile
                </TabsTrigger>
                <TabsTrigger value="listings">
                  <Building className="mr-2 size-4" /> My Listings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="saved" className="mt-6">
                {saved.length === 0 ? (
                  <EmptyState
                    title="Your wishlist is empty"
                    body="Explore homes, stays, or service professionals and click the heart icon to save them here."
                  />
                ) : (
                  <div className="space-y-8">
                    {savedProperties.length > 0 ? (
                      <section>
                        <h3 className="text-lg font-bold mb-4">
                          Saved Homes ({savedProperties.length})
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                          {savedProperties.map((p) => (
                            <PropertyCard key={p.id} p={p} />
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {savedStays.length > 0 ? (
                      <section>
                        <h3 className="text-lg font-bold mb-4">
                          Saved Stays ({savedStays.length})
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                          {savedStays.map((s) => (
                            <StayCard key={s.id} s={s} />
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {savedPros.length > 0 ? (
                      <section>
                        <h3 className="text-lg font-bold mb-4">
                          Saved Service Professionals ({savedPros.length})
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                          {savedPros.map((w) => (
                            <ProCard key={w.id} w={w} />
                          ))}
                        </div>
                      </section>
                    ) : null}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="edit" className="mt-6">
                <form
                  onSubmit={handleSaveProfile}
                  className="rounded-xl border bg-card p-6 shadow-card space-y-4"
                >
                  <h2 className="text-lg font-bold">Personal Information</h2>
                  <div>
                    <Label htmlFor="prof-name">Full Name</Label>
                    <Input
                      id="prof-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="prof-email">Email Address</Label>
                    <Input
                      id="prof-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="prof-phone">Phone Number</Label>
                    <Input
                      id="prof-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="listings" className="mt-6">
                <div className="rounded-xl border bg-card p-6 shadow-card text-center py-10">
                  <Building className="mx-auto size-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-bold">List Your Property or Service</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Reach over 120,000 verified seekers with zero brokerage and transparent AI
                    matching.
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => toast.success("Listing creation workflow opened!")}
                  >
                    <Plus className="mr-2 size-4" /> Create New Listing
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
