"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  HelpCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Insights & posts", icon: FileText },
  { href: "/admin/case-studies", label: "Case studies", icon: FolderKanban },
  { href: "/admin/faqs", label: "Questions & answers", icon: HelpCircle },
  { href: "/admin/leads", label: "Leads & inquiries", icon: Users },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];
export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const focusable = drawer.current?.querySelectorAll<HTMLElement>(
          "a[href],button:not([disabled])",
        );
        if (!focusable?.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [mobileOpen]);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok)
        throw new Error("Unable to sign out. Please try again.");
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    }
  };
  return (
    <>
      <a href="#admin-main" className="skip-link">
        Skip to workspace
      </a>
      <div className="admin-mobilebar">
        <Link href="/admin">
          <img
            src="/assets/prime-logo.webp"
            alt="Prime Automation"
            width="150"
            height="44"
          />
        </Link>
        <button
          type="button"
          ref={toggle}
          onClick={() => setMobileOpen(true)}
          aria-label="Open workspace navigation"
          aria-expanded={mobileOpen}
          aria-controls="admin-navigation"
        >
          <Menu size={22} />
        </button>
      </div>
      {mobileOpen && (
        <button
          className="admin-nav-scrim"
          onClick={() => {
            setMobileOpen(false);
            toggle.current?.focus();
          }}
          aria-label="Close navigation"
          tabIndex={-1}
        />
      )}
      <aside
        ref={drawer}
        id="admin-navigation"
        className={`admin-sidebar${mobileOpen ? " is-open" : ""}`}
      >
        <div className="admin-sidebar-brand">
          <Link href="/admin">
            <img
              src="/assets/prime-logo.webp"
              alt="Prime Automation"
              width="168"
              height="50"
            />
          </Link>
          <button
            ref={closeButton}
            className="admin-drawer-close"
            type="button"
            onClick={() => {
              setMobileOpen(false);
              toggle.current?.focus();
            }}
            aria-label="Close navigation"
          >
            <X size={21} />
          </button>
        </div>
        <div className="admin-nav-caption">YOUR WORKSPACE</div>
        <nav aria-label="Admin navigation">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-note">
          <span>Good content. Clear connections.</span>
          <p>Publish, manage, and keep your website moving.</p>
        </div>
        <footer className="admin-sidebar-account">
          <div>
            <strong>{userEmail || "Administrator"}</strong>
            <span>Site administrator</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
          {logoutError && <p role="alert">{logoutError}</p>}
        </footer>
      </aside>
    </>
  );
}
