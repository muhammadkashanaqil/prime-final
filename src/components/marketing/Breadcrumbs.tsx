import Link from "next/link";
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.primeautomationpl.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: item.href ? `${origin}${item.href}` : undefined,
      })),
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="pa-breadcrumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i}>
              <span aria-hidden="true">/</span>
              {item.href && i < items.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
