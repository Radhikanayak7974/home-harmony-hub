import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarCheck, MessageSquare, Sparkles, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/cards";
import { notifications, type Notification } from "@/lib/data";
import { useStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — GrihaCare" },
      { name: "description", content: "Booking updates, new messages and fresh AI matches, all in one place." },
      { property: "og:title", content: "Notifications — GrihaCare" },
      { property: "og:description", content: "Stay on top of bookings, messages and AI matches." },
    ],
  }),
  component: NotificationsPage,
});

const icons = { Bookings: CalendarCheck, Messages: MessageSquare, Updates: Sparkles } as const;
const tabs = ["All", "Bookings", "Messages", "Updates"] as const;

function NotificationsPage() {
  const { readNotifications, markRead, markAllRead } = useStore();
  const isRead = (n: Notification) => n.read || readNotifications.includes(n.id);
  const unread = notifications.filter((n) => !isRead(n)).length;

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Notifications</h1>
          <p className="mt-1 text-muted-foreground">
            {unread ? `${unread} unread update${unread > 1 ? "s" : ""}` : "You're all caught up."}
          </p>
        </div>
        <Button variant="outline" onClick={() => markAllRead(notifications.map((n) => n.id))} disabled={!unread}>
          <CheckCheck className="mr-2 size-4" /> Mark all read
        </Button>
      </div>

      <Tabs defaultValue="All" className="mt-6">
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => {
          const list = notifications.filter((n) => t === "All" || n.tab === t);
          return (
            <TabsContent key={t} value={t} className="mt-6">
              {list.length ? (
                <ul className="space-y-3">
                  {list.map((n) => {
                    const Icon = icons[n.tab] ?? Bell;
                    const read = isRead(n);
                    return (
                      <li key={n.id}>
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-muted",
                            read ? "bg-card" : "border-primary/30 bg-primary/5",
                          )}
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-bold">{n.title}</span>
                              {!read ? <span className="size-2 rounded-full bg-accent" aria-label="Unread" /> : null}
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">{n.body}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{n.time}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="grid">
                  <EmptyState title="Nothing here yet" body="New updates in this category will show up here." />
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </AppShell>
  );
}
