import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_LIST } from "@/lib/services-data";
import { SERVICE_COPY } from "@/components/marketing/service-copy";
import { PageIntro, PageCTA } from "@/components/marketing/PageKit";
export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, workflow automation, data pipelines, and integrations built around your business.",
};
export default function ServicesPage() {
  return (
    <div className="pa-page">
      <div className="pa-container">
        <PageIntro
          eyebrow="PRIME / WHAT WE BUILD"
          title={
            <>
              Less friction.
              <br />
              <em>More possibility.</em>
            </>
          }
          description="Six connected capabilities. One practical goal: help your business work better, from the first customer conversation to the systems behind it."
        />
        <div>
          {SERVICES_LIST.map((service, i) => {
            const copy = SERVICE_COPY[service.slug];
            return (
              <Link
                key={service.slug}
                className="pa-service-row"
                href={`/services/${service.slug}`}
              >
                <span className="pa-service-index">0{i + 1}</span>
                <div>
                  <h2>{copy.title}</h2>
                  <div className="pa-service-tags">{copy.tags}</div>
                </div>
                <p>{copy.description}</p>
                <ArrowUpRight size={25} />
              </Link>
            );
          })}
        </div>
        <section className="pa-section pa-split">
          <div>
            <span className="pa-kicker">BUILT AROUND YOUR BUSINESS</span>
            <h2 style={{ marginTop: 20 }}>
              Start with the problem.
              <br />
              Find the right system.
            </h2>
          </div>
          <div className="pa-prose">
            <p>
              You don’t need to arrive with a technical brief. Tell us what
              takes too long, what keeps breaking, or where your team needs a
              clearer view.
            </p>
            <p>
              We’ll work through the opportunities with you and define a focused
              first step.
            </p>
            <Link href="/faq" className="pa-text-link">
              A few common questions <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
        <PageCTA />
      </div>
    </div>
  );
}
