import type { Metadata } from "next";
import { Suspense } from "react";
import { getPresentationSettings as getSiteSettings } from "@/lib/site-presentation";
import { PageIntro } from "@/components/marketing/PageKit";
import ContactFormClient from "./ContactFormClient";
export const metadata: Metadata = {
  title: "Let’s talk",
  description:
    "Tell us about your business and explore a practical next step with a free automation audit.",
};
export const revalidate = 60;
export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <div className="pa-page">
      <div className="pa-container">
        <PageIntro
          eyebrow="PRIME / LET’S TALK"
          title={
            <>
              Your next move
              <br />
              <em>starts here.</em>
            </>
          }
          description="A question, a challenge, or the beginning of an idea. We’d love to hear what you’re working on."
        />
        <Suspense
          fallback={
            <p style={{ paddingBlock: 50 }}>Preparing your inquiry form…</p>
          }
        >
          <ContactFormClient
            contactEmail={settings.email || undefined}
            contactPhone={settings.phone || undefined}
            schedulingUrl={settings.schedulingUrl || undefined}
          />
        </Suspense>
      </div>
    </div>
  );
}
