import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Zap,
  RotateCcw,
  Key,
  Check,
  Lock,
  PhoneCall,
  Home,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  isOpenAI?: boolean;
};

const quickPrompts = [
  { label: "🏢 PGs under ₹3,000?", prompt: "Which Tier-2 cities have PGs under ₹3,000 per month?" },
  { label: "⚡ Hire verified electrician?", prompt: "How do I hire background-verified electricians or maids?" },
  { label: "📜 How does Aadhaar E-Sign work?", prompt: "Explain digital lease agreement and Aadhaar OTP e-sign." },
  { label: "🚨 What is Live SOS Desk?", prompt: "How does the 1-Tap SOS Emergency Desk work for safety?" },
  { label: "💰 Zero Brokerage guarantee?", prompt: "Is there really 0 brokerage on rental homes & PGs?" },
];

const SYSTEM_PROMPT = `You are GrihaCare AI Assistant, a friendly and knowledgeable support assistant for GrihaCare — India's #1 AI Housing & Home Services Super App.
Key Knowledge:
- Tier 2 & Tier 3 Cities: Indore (Bhawarkua PG ₹2,800/mo), Kota (Rajeev Gandhi Nagar ₹3,500/mo), Patna (Boring Road ₹3,200/mo), Lucknow (Kapoorthala ₹3,800/mo), Jaipur (Gopalpura ₹4,200/mo), Bhopal (MP Nagar ₹3,000/mo), Varanasi (Lanka - BHU ₹2,500/mo).
- Home Services: Maids, Cooks, Electricians, Plumbers, Attendants — 100% Police & Aadhaar Verified with Live GPS tracking.
- Features: 0% Brokerage, Digital Lease Agreement with instant Aadhaar OTP E-Sign, 1-Tap SOS Emergency Response Desk.
Format your responses neatly using bolding and bullet points. Be concise, polite, and helpful.`;

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  
  // API Key state
  const [apiKey, setApiKey] = useState<string>("");
  const [tempApiKey, setTempApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("grihacare_openai_api_key") || (import.meta.env as Record<string, string>)["VITE_OPENAI_API_KEY"] || "";
      if (stored) {
        setApiKey(stored);
      }
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-init",
      sender: "bot",
      text: "Namaste! 👋 I'm **GrihaCare AI Assist**. Ask me anything about Tier 2/3 city PGs, rental homes, verified home help, or digital lease agreements!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasOpened(true);
    }
  }, [isOpen, messages, isTyping]);

  const saveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    if (typeof window !== "undefined") {
      if (trimmed) {
        localStorage.setItem("grihacare_openai_api_key", trimmed);
        toast.success("OpenAI API Key saved successfully!");
      } else {
        localStorage.removeItem("grihacare_openai_api_key");
        toast.info("OpenAI API Key removed. Using local AI knowledge base.");
      }
    }
    setShowKeyConfig(false);
  };

  // Local fallback knowledge base
  const generateLocalAIResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes("pg") || q.includes("tier-2") || q.includes("tier 2") || q.includes("tier 3") || q.includes("3000") || q.includes("rent")) {
      return "🏡 **Budget PGs & Rentals in Tier 2 & Tier 3 Cities:**\n\n- **Indore (Bhawarkua):** PGs from **₹2,800/mo** (incl. 3 meals & RO water)\n- **Varanasi (Lanka - BHU):** PGs from **₹2,500/mo** (near BHU Gate)\n- **Kota (Rajeev Gandhi Nagar):** PGs from **₹3,500/mo** (Study desks & ALLEN mess)\n- **Patna (Boring Road):** PGs from **₹3,200/mo** (Biometric entry)\n- **Bhopal (MP Nagar):** PGs from **₹3,000/mo**\n- **Lucknow (Kapoorthala):** PGs from **₹3,800/mo**\n\nAll listings are direct from verified owners with **0 Brokerage**!";
    }

    if (q.includes("electrician") || q.includes("maid") || q.includes("cook") || q.includes("worker") || q.includes("pro") || q.includes("hire")) {
      return "⚡ **Verified Home Professionals:**\n\n- **100% Background Checked:** Police verified with Aadhaar ID check.\n- **Live GPS Tracking:** Track your maid, electrician, plumber or cook in real-time.\n- **Transparent Pricing:** Electricians from **₹500**, Housekeeping from **₹900**.\n- **Instant Dispatch:** Available in Indore, Lucknow, Pune, Hyderabad & 50+ cities!";
    }

    if (q.includes("esign") || q.includes("e-sign") || q.includes("lease") || q.includes("agreement") || q.includes("document")) {
      return "📜 **Digital Lease Agreement & Aadhaar E-Sign:**\n\n1. Auto-generate legally binding rental agreements in 2 minutes.\n2. Instant Aadhaar OTP verification for both tenant & owner.\n3. Government compliant & cryptographically signed.\n4. No stamp paper queue needed!";
    }

    if (q.includes("sos") || q.includes("safety") || q.includes("emergency") || q.includes("gps")) {
      return "🚨 **Live GPS Tracking & SOS Emergency Desk:**\n\n- Real-time location tracking while home attendants, drivers, or babysitters are on duty.\n- **1-Tap SOS Button:** Instantly alerts 24/7 GrihaCare emergency response desk & emergency contacts.\n- Try testing the Live SOS Desk button in the main top header!";
    }

    if (q.includes("brokerage") || q.includes("fee") || q.includes("commission") || q.includes("zero")) {
      return "💰 **100% Zero Brokerage Guarantee:**\n\nGrihaCare directly connects you with real property owners and verified service providers. You pay **₹0 brokerage commission** forever!";
    }

    if (q.includes("contact") || q.includes("support") || q.includes("phone") || q.includes("help") || q.includes("issue")) {
      return "📞 **GrihaCare Support Team:**\n\n- **Toll-Free Helpline:** 1800-419-GRIHA (47442)\n- **WhatsApp Assist:** +91 98765 43210\n- **Email:** support@grihacare.in\n- **Response Time:** Instant AI assistance 24/7 or <15 min human callback.";
    }

    return `Thanks for reaching out! Regarding your query: *"${userQuery}"*:\n\n- GrihaCare offers **AI-matched rental homes, budget PGs (from ₹2,500/mo)**, and **background-verified home help** across 50+ Tier 2 & 3 Indian cities.\n- All bookings include **0 Brokerage**, **Digital Aadhaar Lease E-Sign**, and **Live SOS Safety Protection**.\n\nWould you like me to connect you with a live support executive or help you search listings?`;
  };

  // Call OpenAI API
  const callOpenAIApi = async (query: string): Promise<string> => {
    try {
      const history = messages.slice(-4).map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: query },
          ],
          temperature: 0.7,
          max_tokens: 350,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error?.message || "OpenAI API request failed");
      }

      const data = await res.json();
      return data.choices[0]?.message?.content || generateLocalAIResponse(query);
    } catch (err: any) {
      console.warn("OpenAI API Error, falling back to local KB:", err);
      toast.error(`OpenAI Error: ${err.message || "Invalid Key"}. Using local AI engine.`);
      return generateLocalAIResponse(query);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    let responseText = "";
    let isOpenAIRes = false;

    if (apiKey.trim()) {
      responseText = await callOpenAIApi(query);
      isOpenAIRes = true;
    } else {
      await new Promise((r) => setTimeout(r, 750));
      responseText = generateLocalAIResponse(query);
    }

    const botMsg: Message = {
      id: `b-${Date.now()}`,
      sender: "bot",
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOpenAI: isOpenAIRes,
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "m-reset",
        sender: "bot",
        text: "Chat reset! How else can I assist you with GrihaCare today?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
        {!isOpen && !hasOpened && (
          <div
            className="hidden sm:flex items-center gap-2 rounded-full glass-card px-4 py-2 text-xs font-bold text-teal-400 shadow-lift border border-teal-500/40 cursor-pointer animate-bounce"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="size-3.5 text-cyan-400 fill-cyan-400" />
            <span>Need help? Ask AI Assist 💬</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative grid size-14 place-items-center rounded-full text-slate-950 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none",
            isOpen
              ? "bg-slate-900 text-foreground border border-teal-500/30"
              : "bg-gradient-to-r from-teal-400 to-cyan-400 shadow-teal-glow animate-breathe"
          )}
          aria-label="Toggle Support Chatbot"
        >
          {isOpen ? (
            <X className="size-6 text-teal-400" />
          ) : (
            <>
              <Bot className="size-7 fill-slate-950/20" />
              <span className="absolute -top-1 -right-1 flex size-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-4 rounded-full bg-teal-400 border-2 border-background" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* CHATBOT DRAWER / WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md rounded-3xl glass-card border border-teal-500/30 shadow-2xl overflow-hidden flex flex-col h-[530px] animate-slide-up">
          {/* CHAT HEADER */}
          <div className="flex items-center justify-between border-b border-teal-500/20 bg-gradient-to-r from-[#091322] via-[#0f2238] to-[#091322] px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative grid size-10 place-items-center rounded-2xl bg-teal-400 text-slate-950 font-extrabold shadow-md">
                <Bot className="size-6" />
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-400 border-2 border-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white">GrihaCare AI Assist</h3>
                  {apiKey && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-400 border border-emerald-500/30">
                      GPT-4o
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-semibold text-teal-300/80">
                  {apiKey ? "Live OpenAI Mode" : "Local AI Knowledge Base"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                title="Configure OpenAI Key"
                className="rounded-full p-1.5 text-zinc-400 hover:bg-white/10 hover:text-teal-400 transition-colors"
              >
                <Key className="size-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* OPENAI API KEY CONFIG POPOVER BAR */}
          {showKeyConfig && (
            <div className="border-b border-teal-500/30 bg-slate-950 p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                  <Key className="size-3.5" /> OpenAI API Key Setup
                </span>
                <button
                  onClick={() => setShowKeyConfig(false)}
                  className="text-xs text-muted-foreground hover:text-white"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3">
                Paste your OpenAI API Key (sk-...) for direct GPT-4o-mini response generation.
              </p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="h-8 text-xs bg-slate-900 border-teal-500/20 text-white placeholder:text-zinc-600 focus:border-teal-500"
                />
                <Button
                  size="sm"
                  className="h-8 bg-teal-400 text-slate-950 hover:bg-teal-300 font-bold shrink-0 text-xs px-3"
                  onClick={() => saveApiKey(tempApiKey)}
                >
                  <Check className="mr-1 size-3.5" /> Save
                </Button>
              </div>
            </div>
          )}

          {/* CHAT MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-2.5 max-w-[88%]",
                  m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold shadow-sm mt-0.5",
                    m.sender === "user"
                      ? "bg-teal-400 text-slate-950"
                      : "bg-slate-800 text-teal-400 border border-teal-500/30"
                  )}
                >
                  {m.sender === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap shadow-sm",
                      m.sender === "user"
                        ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-semibold rounded-tr-none"
                        : "bg-slate-900/90 text-zinc-100 border border-teal-500/20 rounded-tl-none"
                    )}
                  >
                    {m.text}
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 text-[9px] text-muted-foreground/60 px-1",
                      m.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <span>{m.time}</span>
                    {m.isOpenAI && (
                      <span className="text-[9px] text-emerald-400 font-semibold">• GPT-4o</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex gap-2.5 mr-auto max-w-[80%] items-center">
                <div className="grid size-7 place-items-center rounded-full bg-slate-800 text-teal-400 border border-teal-500/30 text-[10px]">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-slate-900/90 px-4 py-3 border border-teal-500/20 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-teal-400 animate-bounce" />
                  <span
                    className="size-2 rounded-full bg-cyan-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="size-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT CHIPS */}
          <div className="px-4 py-2 border-t border-teal-500/10 bg-black/40 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.prompt)}
                className="whitespace-nowrap rounded-full bg-teal-500/10 border border-teal-500/30 px-3 py-1 text-[11px] font-semibold text-teal-300 transition-all hover:bg-teal-500/20 hover:scale-105 active:scale-95 shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* CHAT INPUT AREA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-teal-500/20 bg-slate-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about PGs, rent, maids, e-sign..."
              className="flex-1 bg-slate-900 border border-teal-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-teal-500"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="size-9 bg-teal-400 text-slate-950 hover:bg-teal-300 disabled:opacity-40 shrink-0 rounded-xl font-bold"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
