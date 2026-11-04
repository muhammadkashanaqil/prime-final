"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  BookOpen,
  Layers,
} from "lucide-react";

interface ThankYouClientProps {
  schedulingUrl?: string;
}

export default function ThankYouClient({
  schedulingUrl = "",
}: ThankYouClientProps) {
  useEffect(() => {
    // Fire lead conversion analytics event once
    trackEvent({
      name: "contact_form_submit",
      params: {
        primary_need: "confirmed_audit",
        page_path: "/thank-you",
      },
    });
  }, []);

  return (
    <div className="pa-page pa-message-page">
      <div>
        <div className="pa-success-mark">
          <CheckCircle2 size={26} />
        </div>
        <span className="pa-kicker">MESSAGE RECEIVED</span>
        <h1>
          Good things start
          <br />
          with a conversation.
        </h1>
        <p>
          Thanks for telling us about your business. Our team will review your
          request and follow up using the contact details you provided.
        </p>
        <div className="pa-actions">
          {schedulingUrl && (
            <a
              href={schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pa-button"
              onClick={() =>
                trackEvent({
                  name: "schedule_click",
                  params: { page_path: "/thank-you" },
                })
              }
            >
              Choose a time to talk <ArrowRight size={18} />
            </a>
          )}
          <Link href="/case-studies" className="pa-text-link">
            Explore our work <ArrowRight size={17} />
          </Link>
        </div>
        <Link href="/" className="pa-text-link" style={{ marginTop: 28 }}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
