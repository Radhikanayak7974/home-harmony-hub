import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Search, CheckCheck, Sparkles, PhoneCall, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppShell } from "@/components/app-shell";
import { chats as initialChats, Chat } from "@/lib/data";
import { getConversationsFn, sendMessageFn } from "@/api/messages";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Direct Inbox & Messages | GrihaCare" },
      {
        name: "description",
        content: "Chat directly with verified property owners, housemates, and home service pros.",
      },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [chatList, setChatList] = useState<Chat[]>(initialChats);
  const [activeId, setActiveId] = useState<string>(initialChats[0]?.id ?? "c1");
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Live Chat Conversations
  async function loadChats() {
    try {
      const res = await getConversationsFn();
      setChatList(res);
    } catch {
      /* fallback */
    }
  }

  useEffect(() => {
    loadChats();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList, activeId, isTyping]);

  const activeChat = chatList.find((c) => c.id === activeId) ?? chatList[0];

  const filteredChats = chatList.filter((c) =>
    `${c.name} ${c.role}`.toLowerCase().includes(q.toLowerCase())
  );

  async function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!draft.trim() || !activeChat || sending) return;

    const messageText = draft.trim();
    setDraft("");
    setSending(true);

    try {
      // Optimistic update
      const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      const tempUserMsg = {
        id: `temp-${Date.now()}`,
        from: "me" as const,
        text: messageText,
        time: timeStr,
        read: true,
      };

      setChatList((prev) =>
        prev.map((c) => (c.id === activeChat.id ? { ...c, messages: [...c.messages, tempUserMsg] } : c))
      );

      setIsTyping(true);

      // Call Backend API
      await sendMessageFn({
        data: { chatId: activeChat.id, text: messageText },
      });

      setTimeout(async () => {
        setIsTyping(false);
        await loadChats();
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
      setIsTyping(false);
    } finally {
      setSending(false);
    }
  }

  function handleQuickChip(text: string) {
    setDraft(text);
  }

  return (
    <AppShell>
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-outfit">Direct Messages & Chat</h1>
            <p className="mt-1 text-xs text-zinc-400">
              One secure inbox to message house owners, Verified service pros, and 24/7 Support.
            </p>
          </div>
          <Badge className="border border-teal-500/30 bg-teal-500/15 text-teal-300 backdrop-blur-md text-xs font-bold px-3 py-1 w-fit">
            <ShieldCheck className="mr-1.5 size-4 text-teal-400" /> End-to-End Encrypted
          </Badge>
        </div>

        {/* MAIN MESSAGING LAYOUT */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* CHAT LIST SIDEBAR */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-white/10 bg-slate-950/60">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-10 h-10 bg-slate-900 border-white/10 text-white text-xs rounded-xl focus-visible:ring-teal-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {filteredChats.map((c) => {
                const isSelected = c.id === activeChat?.id;
                const lastMsg = c.messages[c.messages.length - 1];

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "w-full flex items-start gap-3.5 p-4 text-left transition-all hover:bg-white/5",
                      isSelected && "bg-teal-500/10 border-l-4 border-teal-400"
                    )}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="size-12 rounded-2xl object-cover ring-2 ring-teal-400/30"
                      />
                      {c.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-teal-400 ring-2 ring-slate-900" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm truncate">{c.name}</span>
                        {c.unread > 0 && (
                          <span className="grid size-5 place-items-center rounded-full bg-teal-400 text-[10px] font-black text-slate-950">
                            {c.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-teal-300 truncate">{c.role}</p>
                      <p className="text-xs text-zinc-400 truncate">{lastMsg?.text || "No messages yet"}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE CHAT THREAD AREA */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col h-[600px]">
            {activeChat ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-white/10 bg-slate-950/80 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="size-11 rounded-2xl object-cover ring-2 ring-teal-400/40"
                      />
                      {activeChat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-teal-400 ring-2 ring-slate-900" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-base flex items-center gap-1.5">
                        {activeChat.name}
                        <ShieldCheck className="size-4 text-teal-400" />
                      </h2>
                      <p className="text-xs text-zinc-400">
                        <span className={activeChat.online ? "text-teal-400 font-bold" : "text-zinc-500"}>
                          {activeChat.online ? "● Online Now" : "Offline"}
                        </span>{" "}
                        · {activeChat.role}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/15 text-xs font-bold text-zinc-300 hover:bg-white/10 rounded-xl"
                    onClick={() => toast.info(`Initiating secure voice call with ${activeChat.name}...`)}
                  >
                    <PhoneCall className="mr-1.5 size-3.5 text-teal-400" /> Call
                  </Button>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-955/40">
                  {activeChat.messages.map((m) => {
                    const isMe = m.from === "me";
                    return (
                      <div
                        key={m.id}
                        className={cn("flex flex-col", isMe ? "items-end" : "items-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed shadow-lg",
                            isMe
                              ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold rounded-tr-none"
                              : "bg-slate-950 border border-white/10 text-zinc-200 rounded-tl-none"
                          )}
                        >
                          <p>{m.text}</p>
                          <div
                            className={cn(
                              "mt-1.5 flex items-center justify-end gap-1 text-[10px]",
                              isMe ? "text-slate-950/70" : "text-zinc-500"
                            )}
                          >
                            <span>{m.time}</span>
                            {isMe && <CheckCheck className="size-3 text-slate-950" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-teal-300 bg-slate-950/60 border border-teal-500/30 p-2.5 rounded-2xl w-fit animate-pulse">
                      <Clock className="size-3.5 text-teal-400" />
                      <span>{activeChat.name} is typing a response...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Chips */}
                <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 flex items-center gap-2 overflow-x-auto shrink-0">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider shrink-0">Quick:</span>
                  {[
                    "Is Saturday 11am available for visit?",
                    "Can you share the gate pass details?",
                    "What is your hourly service rate?",
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickChip(chip)}
                      className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-teal-500/20 hover:border-teal-400 border border-white/10 text-[11px] text-zinc-300 transition-all shrink-0"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Input Form */}
                <form
                  onSubmit={handleSend}
                  className="p-3 border-t border-white/10 bg-slate-950 flex items-center gap-3 shrink-0"
                >
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Message ${activeChat.name}...`}
                    className="h-12 bg-slate-900 border-white/15 text-white font-medium text-xs rounded-xl focus-visible:ring-teal-400"
                  />

                  <Button
                    type="submit"
                    disabled={!draft.trim() || sending}
                    className="h-12 px-6 bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-teal-glow shrink-0 flex items-center gap-1.5"
                  >
                    <span>Send</span>
                    <Send className="size-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 grid place-items-center p-8 text-center text-zinc-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
