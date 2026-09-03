import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/app-shell";
import { chats } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Chat with owners and pros | GrihaCare" },
      {
        name: "description",
        content: "Message property owners and verified service professionals directly inside GrihaCare.",
      },
      { property: "og:title", content: "Messages — GrihaCare" },
      { property: "og:description", content: "One inbox for owners, professionals and support." },
    ],
  }),
  component: Messages,
});

type Msg = { id: string; from: "me" | "them"; text: string; time: string; read?: boolean };

function Messages() {
  const [activeId, setActiveId] = useState(chats[0]?.id ?? "");
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, Msg[]>>({});

  const list = chats.filter((c) => `${c.name} ${c.role}`.toLowerCase().includes(q.toLowerCase()));
  const active = chats.find((c) => c.id === activeId) ?? chats[0];
  const messages: Msg[] = active ? [...active.messages, ...(extra[active.id] ?? [])] : [];

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    const msg: Msg = {
      id: `x${Date.now()}`,
      from: "me",
      text: draft.trim(),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setExtra((p) => ({ ...p, [active.id]: [...(p[active.id] ?? []), msg] }));
    setDraft("");
  }

  return (
    <AppShell>
      <h1 className="text-3xl font-extrabold">Messages</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border bg-card">
          <div className="relative border-b p-3">
            <Search className="absolute left-6 top-5.5 size-4 text-muted-foreground" aria-hidden="true" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search chats" className="pl-9" aria-label="Search chats" />
          </div>
          <ul className="max-h-[520px] overflow-y-auto">
            {list.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-current={c.id === active?.id}
                  className={cn(
                    "flex w-full items-start gap-3 border-b p-3 text-left transition-colors hover:bg-muted",
                    c.id === active?.id && "bg-primary/5",
                  )}
                >
                  <span className="relative shrink-0">
                    <img src={c.avatar} alt="" className="size-11 rounded-full object-cover" />
                    {c.online ? (
                      <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-success" />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold">{c.name}</span>
                      {c.unread ? (
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {c.unread}
                        </span>
                      ) : null}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{c.role}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {c.messages[c.messages.length - 1]?.text}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            {!list.length ? <li className="p-6 text-center text-sm text-muted-foreground">No chats found.</li> : null}
          </ul>
        </aside>

        <section className="flex min-h-[560px] flex-col rounded-xl border bg-card">
          {active ? (
            <>
              <header className="flex items-center gap-3 border-b p-4">
                <img src={active.avatar} alt="" className="size-10 rounded-full object-cover" />
                <div>
                  <h2 className="text-sm font-bold">{active.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {active.online ? "Online now" : "Offline"} · {active.role}
                  </p>
                </div>
              </header>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-card",
                        m.from === "me"
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : "rounded-bl-sm bg-muted text-foreground",
                      )}
                    >
                      <p>{m.text}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={send} className="flex gap-2 border-t p-3">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Message ${active.name}…`}
                  aria-label="Message text"
                />
                <Button type="submit" disabled={!draft.trim()} aria-label="Send message">
                  <Send className="size-4" />
                </Button>
              </form>
            </>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
