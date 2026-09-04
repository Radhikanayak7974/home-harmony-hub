import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Home, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statusMessages = [
      "Initializing AI Housing Super App...",
      "Connecting Verified Owners & Pros...",
      "Curating Zero Brokerage Homes...",
      "Preparing Smart Lease Agreements...",
      "Welcome to GrihaCare!"
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsDone(true);
            if (onComplete) onComplete();
          }
        });

        exitTl.to(logoRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    });

    // Animate progress bar & percentage counter
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.floor(progressObj.value);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${val}%`;
        }
        if (percentageRef.current) {
          percentageRef.current.textContent = `${val}%`;
        }

        // Update status text dynamically based on progress
        if (statusTextRef.current) {
          const msgIdx = Math.min(
            Math.floor((val / 100) * statusMessages.length),
            statusMessages.length - 1
          );
          statusTextRef.current.textContent = statusMessages[msgIdx] ?? "";
        }
      }
    });

    // Logo pulse
    gsap.to(logoRef.current, {
      scale: 1.06,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b] text-foreground select-none overflow-hidden"
    >
      {/* Background glowing teal & cyan lights */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-[500px] rounded-full bg-teal-500/15 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute size-[300px] rounded-full bg-teal-600/10 blur-[80px]" />

      {/* Grid texture overlay */}
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />

      {/* Logo & Brand */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <div
          className="relative grid size-20 place-items-center rounded-2xl border border-teal-500/40 p-4 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #091322, #0d2238)",
            boxShadow: "0 0 50px rgba(45,212,191,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"
          }}
        >
          <Home className="size-10 text-teal-400" />
          <div className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-teal-400 text-slate-950 shadow-md">
            <Sparkles className="size-3.5 fill-slate-950" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Griha<span className="mint-glow-text">Care</span>
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-teal-400/90">
            AI Housing Super App
          </p>
        </div>
      </div>

      {/* Progress Container */}
      <div className="relative z-10 mt-10 w-full max-w-xs px-4 flex flex-col items-center">
        {/* Progress Bar Track */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-900/80 border border-teal-500/20 p-0.5 shadow-inner">
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full transition-all duration-75"
            style={{
              background: "linear-gradient(90deg, #0d9488, #2dd4bf, #38bdf8)",
              boxShadow: "0 0 16px rgba(45,212,191,0.8)"
            }}
          />
        </div>

        {/* Percentage & Status info */}
        <div className="mt-4 flex w-full items-center justify-between text-xs font-semibold text-muted-foreground">
          <p ref={statusTextRef} className="truncate text-teal-300/80 font-medium max-w-[210px]">
            Initializing AI Housing Super App...
          </p>
          <span ref={percentageRef} className="tabular-nums font-extrabold text-teal-400 text-sm">
            0%
          </span>
        </div>
      </div>

      {/* Footer Feature Pills */}
      <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold text-muted-foreground/60">
        <span className="flex items-center gap-1.5">
          <Zap className="size-3.5 text-teal-400" /> Instant AI Matching
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-cyan-400" /> 100% Background Verified
        </span>
      </div>
    </div>
  );
}
