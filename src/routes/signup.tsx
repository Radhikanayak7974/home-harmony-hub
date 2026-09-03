import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Home, Building2, Wrench, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/branding";
import { useStore, type UserType } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — GrihaCare" },
      {
        name: "description",
        content: "Sign up free as a home seeker, property owner or service professional on GrihaCare.",
      },
      { property: "og:title", content: "Create your account — GrihaCare" },
      { property: "og:description", content: "Join GrihaCare in under a minute." },
    ],
  }),
  component: SignupPage,
});

const types: { value: UserType; icon: typeof Home; body: string }[] = [
  { value: "Home Seeker", icon: Home, body: "Find rentals and short stays" },
  { value: "Property Owner", icon: Building2, body: "List and manage properties" },
  { value: "Service Professional", icon: Wrench, body: "Get matched to home jobs" },
];

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s += 34;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s += 33;
  if (/\d|[^\w]/.test(p)) s += 33;
  return s;
}

function SignupPage() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [userType, setUserType] = useState<UserType>("Home Seeker");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (f.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) next.email = "Enter a valid email address.";
    if (!/^[+]?[\d\s-]{10,15}$/.test(f.phone)) next.phone = "Enter a valid phone number.";
    if (strength(f.password) < 67) next.password = "Use 8+ characters with upper, lower case and a number.";
    if (f.confirm !== f.password) next.confirm = "Passwords do not match.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      signIn({ name: f.name, email: f.email, phone: f.phone, userType });
      setLoading(false);
      toast.success("Account created — welcome to GrihaCare!");
      navigate({ to: "/dashboard" });
    }, 900);
  }

  const s = strength(f.password);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Logo />
          <h1 className="mt-6 text-3xl font-extrabold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Free forever. No brokerage, no spam.</p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">I am a…</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {types.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setUserType(t.value)}
                    aria-pressed={userType === t.value}
                    className={cn(
                      "rounded-lg border p-3 text-left transition-colors",
                      userType === t.value ? "border-primary bg-primary/5" : "hover:bg-muted",
                    )}
                  >
                    <t.icon className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold leading-tight">{t.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
                  </button>
                ))}
              </div>
            </fieldset>

            {(
              [
                ["name", "Full name", "text", "Radhika Nayak"],
                ["email", "Email", "email", "you@example.com"],
                ["phone", "Phone", "tel", "+91 98450 22110"],
                ["password", "Password", "password", "••••••••"],
                ["confirm", "Confirm password", "password", "••••••••"],
              ] as const
            ).map(([k, label, type, ph]) => (
              <div key={k} className="space-y-2">
                <Label htmlFor={k}>{label}</Label>
                <Input
                  id={k}
                  type={type}
                  placeholder={ph}
                  value={f[k]}
                  onChange={set(k)}
                  aria-invalid={!!errors[k]}
                />
                {k === "password" && f.password ? (
                  <>
                    <Progress value={s} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">
                      {s < 40 ? "Weak" : s < 80 ? "Good" : "Strong"} password
                    </p>
                  </>
                ) : null}
                {errors[k] ? <p className="text-xs font-medium text-destructive">{errors[k]}</p> : null}
              </div>
            ))}

            <div>
              <label className="flex items-start gap-2 text-sm">
                <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
                <span>
                  I agree to the Terms of Service and Privacy Policy, including identity verification.
                </span>
              </label>
              {errors.agree ? <p className="mt-1 text-xs font-medium text-destructive">{errors.agree}</p> : null}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="gradient-hero hidden flex-col justify-center p-10 text-primary-foreground lg:flex">
        <h2 className="text-4xl font-extrabold leading-tight">Everything your home needs, in one account.</h2>
        <ul className="mt-8 space-y-4">
          {[
            "AI-ranked rentals with the reasoning shown",
            "Short stays with instant confirmation",
            "Background-verified service professionals",
            "One inbox, one wallet, one review history",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary-foreground/15">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              <span className="text-primary-foreground/90">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
