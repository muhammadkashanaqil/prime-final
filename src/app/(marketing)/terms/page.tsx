import type { Metadata } from "next";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Prime Automation Pvt. Ltd. Terms and Conditions.",
};

export default function TermsPage() {
  return (
    <div className="pa-page">
      <div className="pa-container pa-legal">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <header className="pa-intro">
          <h1>Terms of Service</h1>
          <p className="pa-note" style={{ marginTop: 20 }}>
            Last updated: August 2026
          </p>
        </header>

        <div className="pa-legal-body pa-prose">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the Prime Automation website, submitting
              audit requests, or interacting with our automated systems, you
              agree to be bound by these Terms of Service. If you disagree with
              any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2>2. Engineering Engagements & Audits</h2>
            <p>
              Informational consultations, free audits, and ROI estimates
              provided on this website are for discovery and architectural
              planning purposes only. Formal engineering scopes, guarantees, and
              service level agreements (SLAs) are governed exclusively by
              executed Master Services Agreements (MSAs) and Statements of Work
              (SOWs).
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property Rights</h2>
            <p>
              All website materials, branding, proprietary schemas, and case
              study narratives remain the intellectual property of Prime
              Automation Pvt. Ltd. Client deliverables and custom workflows
              developed under paid engagements are assigned to the client
              according to specific MSA terms.
            </p>
          </section>

          <section>
            <h2>4. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with
              applicable laws without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
