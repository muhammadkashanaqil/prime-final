import type { Metadata } from "next";
import { getPresentationSettings } from "@/lib/site-presentation";
import localFont from "next/font/local";
import "@/styles/styles.css";
import "@/styles/mobile-fixes.css";
import "@/styles/features.css";
import "@/styles/hero.css";
import "@/styles/motion.css";
import "./globals.css";
import "@/styles/pages.css";
import "@/styles/admin.css";
import "@/styles/chat.css";
import { SiteProvider } from "@/components/SiteProvider";

const inter = localFont({
  src: "../../public/assets/inter.woff2",
  variable: "--font-inter",
  display: "swap",
});

const outfit = localFont({
  src: "../../public/assets/outfit.woff2",
  variable: "--font-heading",
  display: "swap",
});

const baseMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.primeautomationpl.com",
  ),
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  title: {
    default:
      "Prime Automation | Enterprise AI & Operational Automation Systems",
    template: "%s | Prime Automation",
  },
  description:
    "Prime Automation builds enterprise-grade AI chatbots, automated workflows via n8n, real-time data pipelines, and custom AI integrations that scale your operations.",
  keywords: [
    "AI automation agency",
    "n8n workflow automation",
    "custom AI agents",
    "enterprise chatbot development",
    "data pipeline engineering",
    "operational AI optimization",
  ],
  authors: [{ name: "Prime Automation Pvt. Ltd." }],
  creator: "Prime Automation Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.primeautomationpl.com",
    siteName: "Prime Automation Pvt. Ltd.",
    title: "Prime Automation — Intelligence. In motion.",
    description:
      "Enterprise AI systems, autonomous workflows, and modern data engineering engineered for measurable ROI.",
    images: [
      {
        url: "/assets/hero-art.png",
        width: 1254,
        height: 1254,
        alt: "Prime Automation Enterprise AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Automation — Intelligence. In motion.",
    description:
      "Engineering production-grade AI agents, intelligent multi-step workflows, and real-time data pipelines.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPresentationSettings();
  return {
    ...baseMetadata,
    title: {
      default: settings.defaultSeoTitle || "Prime Automation",
      template: "%s | Prime Automation",
    },
    description: settings.defaultSeoDescription || baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      siteName: settings.businessName,
      title: settings.defaultSeoTitle || undefined,
      description: settings.defaultSeoDescription || undefined,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: settings.defaultSeoTitle || undefined,
      description: settings.defaultSeoDescription || undefined,
    },
  };
}

export const viewport = {
  themeColor: "#050508",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPresentationSettings();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.businessName,
    url: "https://www.primeautomationpl.com",
    logo: "https://www.primeautomationpl.com/assets/prime-logo.webp",
    email: settings.email,
    telephone: settings.phone || undefined,
    description:
      "Enterprise-grade AI chatbots, n8n workflow automation, real-time data engineering, and custom AI systems.",
    sameAs: Object.values(settings.socialLinks || {}).filter(
      (value) => typeof value === "string" && /^https?:\/\//.test(value),
    ),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
