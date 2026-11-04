"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Successful login -> navigate to /admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <aside className="admin-login-brand">
        <a href="/" aria-label="Prime Automation home">
          <img
            src="/assets/prime-logo.webp"
            alt="Prime Automation"
            width="206"
            height="61"
          />
        </a>
        <div>
          <h2>
            A little clarity.
            <br />A lot of possibility.
          </h2>
          <p>Your content, conversations, and next chapter—all in one place.</p>
        </div>
        <a href="/">← Back to the website</a>
      </aside>
      <div className="admin-login-form-area">
        <div className="admin-login-form">
          <span className="admin-eyebrow">PRIME / YOUR WORKSPACE</span>
          <h1>Welcome back.</h1>
          <p>Sign in to manage your website and follow up on new inquiries.</p>
          {error && (
            <div className="admin-notice" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} aria-busy={isLoading}>
            <div>
              <label htmlFor="admin-email">Email address</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="admin-action admin-action-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in…" : "Sign in"}
              <ArrowRight size={17} />
            </button>
          </form>
          <a
            href="/"
            className="pa-text-link"
            style={{ marginTop: 24, fontSize: 12 }}
          >
            ← Return to the website
          </a>
        </div>
      </div>
    </div>
  );
}
