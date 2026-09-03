import { type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, MessageSquare, LayoutDashboard, Heart, User, CalendarCheck, Star, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/branding";
import { useStore } from "@/lib/app-store";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/booking", label: "Bookings", icon: CalendarCheck },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/reviews", label: "Reviews", icon: Star },
  { to: "/notifications", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, saved, readNotifications, signOut } = useStore();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read && !readNotifications.includes(n.id)).length;

  const links = (
    <>
      {nav.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          activeProps={{ className: "bg-primary/10 text-primary" }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <n.icon className="size-4" aria-hidden="true" />
          {n.label}
          {n.label === "Alerts" && unread > 0 ? (
            <span className="ml-auto grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unread}
            </span>
          ) : null}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Logo className="mb-6" />
              <nav className="flex flex-col gap-1">{links}</nav>
            </SheetContent>
          </Sheet>

          <Logo />

          <nav aria-label="App" className="ml-6 hidden items-center gap-1 lg:flex">
            {links}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
              <Link to="/profile">
                <span className="relative">
                  <Heart className="size-5" />
                  {saved.length > 0 ? (
                    <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                      {saved.length}
                    </span>
                  ) : null}
                </span>
              </Link>
            </Button>
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut();
                  navigate({ to: "/", replace: true });
                }}
              >
                <LogOut className="mr-1 size-4" /> Sign out
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className={cn("mx-auto max-w-7xl px-4 py-8 sm:px-6")}>{children}</main>
      <footer className="border-t bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground sm:px-6">
          © 2026 GrihaCare. One App. Every Home Need.
        </div>
      </footer>
    </div>
  );
}
