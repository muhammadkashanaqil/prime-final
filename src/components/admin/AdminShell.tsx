"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
const labels: Record<string, string> = {
  posts: "Insights",
  "case-studies": "Case studies",
  faqs: "FAQs",
  leads: "Leads",
  settings: "Settings",
};
export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const login = pathname === "/admin/login";
  const section = pathname.split("/")[2];
  return (
    <div className={`admin-shell${login ? " admin-is-login" : ""}`}>
      {!login && <AdminSidebar userEmail={userEmail} />}
      <div className="admin-workspace">
        {!login && (
          <header className="admin-topbar">
            <div>
              <span>Workspace</span>
              <span aria-hidden="true">/</span>
              <strong>{labels[section] || "Overview"}</strong>
            </div>
            <Link href="/" target="_blank" rel="noopener noreferrer">
              View website <ArrowUpRight size={15} />
            </Link>
          </header>
        )}
        <main id="admin-main" className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
