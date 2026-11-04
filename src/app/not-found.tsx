import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="pa-page pa-message-page">
      <div>
        <span className="pa-kicker">PRIME / 404</span>
        <h1>A loose connection.</h1>
        <p>
          This page may have moved, or the link may be incomplete. Let’s get you
          back to somewhere useful.
        </p>
        <div className="pa-actions">
          <Link href="/" className="pa-button">
            Back to the homepage <ArrowUpRight size={18} />
          </Link>
          <Link href="/services" className="pa-text-link">
            Explore our services <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
