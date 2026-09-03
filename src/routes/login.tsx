import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/branding";
import { useStore, demoUser } from "@/lib/app-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — GrihaCare" },
      { name: "description", content: "Log in to GrihaCare to manage rentals, stays, bookings and home services." },
      { property: "og:title", content: "Log in — GrihaCare" },
      { property: "og:description", content: "Access your GrihaCare account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("radhika@example.com");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      signIn({ ...demoUser, email });
      setLoading(false);
      toast.success("Welcome back to GrihaCare");
      navigate({ to: "/dashboard" });
    }, 800);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="gradient-hero hidden flex-col justify-between p-10 text-primary-foreground lg:flex">
        <Logo invert />
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">Welcome back.</h2>
          <p className="mt-4 max-w-md text-primary-foreground/85">
            Your saved homes, ongoing bookings and conversations with verified professionals are waiting.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">One App. Every Home Need.</p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Use any email and a 6+ character password for the demo.</p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
              </div>
              {errors.email ? (
                <p id="email-err" className="text-xs font-medium text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-9"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "pass-err" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password ? (
                <p id="pass-err" className="text-xs font-medium text-destructive">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked /> Remember me
              </label>
              <button type="button" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              {loading ? "Signing you in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to GrihaCare?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
