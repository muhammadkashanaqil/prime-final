import Link from "next/link";
import { MotionButton } from "@/components/ui/Controls1";

export default function Footer({ settings }) {
  const email = settings?.email || "info@primeautomationpl.com";
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <a href={`mailto:${email}`}>
          {email}{" "}
          <svg className="icon">
            <use href="#i-arrow"></use>
          </svg>
        </a>
        <nav aria-label="Footer navigation">
          <Link href="/case-studies">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      {settings?.socialLinks && (
        <nav className="footer-social" aria-label="Social links">
          {Object.entries(settings.socialLinks)
            .filter(
              ([, url]) => typeof url === "string" && /^https?:\/\//.test(url),
            )
            .map(([name, url]) => (
              <a
                key={name}
                href={String(url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name === "twitter"
                  ? "X / Twitter"
                  : name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                ↗
              </a>
            ))}
        </nav>
      )}
      <div className="footer-wordmark" aria-hidden="true">
        PRIME<span>®</span>
        <svg viewBox="0 0 100 100">
          <path d="M50 0v100M0 50h100M14.6 14.6l70.8 70.8m0-70.8L14.6 85.4"></path>
        </svg>
      </div>
      <div className="footer-bottom">
        <span>
          © <span id="year">{new Date().getFullYear()}</span>{" "}
          {settings?.businessName || "Prime Automation Pvt. Ltd."}
        </span>
        <span>{settings?.footerText || "Built around your business."}</span>
        <MotionButton location="footer"></MotionButton>
      </div>
    </footer>
  );
}
