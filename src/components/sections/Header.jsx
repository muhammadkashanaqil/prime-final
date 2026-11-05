"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuToggle } from "@/components/ui/Controls1";
export default function Header() {
  const pathname = usePathname();
  const inner = pathname !== "/";
  return (
    <header className={`site-header${inner ? " pa-inner-header" : ""}`}>
      <Link href="/" className="brand" aria-label="Prime Automation home">
        <img
          src="/assets/prime-logo.webp"
          alt="Prime Automation Pvt. Ltd."
          width="206"
          height="61"
        />
      </Link>
      {inner && (
        <nav className="pa-header-links" aria-label="Main navigation">
          {[
            ["/services", "Services"],
            ["/case-studies", "Work"],
            ["/about", "About"],
            ["/insights", "Insights"],
            ["/contact", "Let’s talk ↗"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
      <MenuToggle />
    </header>
  );
}
