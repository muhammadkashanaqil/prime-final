"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  Send,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

interface ContactFormClientProps {
  contactPhone?: string;
  contactEmail?: string;
  schedulingUrl?: string;
}

export default function ContactFormClient({
  contactPhone = "",
  contactEmail = "info@primeautomationpl.com",
  schedulingUrl = "https://cal.com/primeautomation/free-audit",
}: ContactFormClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build tel: href from prop
  const telHref = contactPhone
    ? `tel:+${contactPhone.replace(/\D/g, "")}`
    : "#";

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    website: "",
    phone: "",
    primaryNeed: "workflow" as
      | "chatbot"
      | "workflow"
      | "data"
      | "ai_model"
      | "integration"
      | "ai_audit"
      | "other",
    message: "",
    budgetRange: "$10k - $25k",
    consent: false,
    websiteUrl_hp: "", // Honeypot
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hasStartedInteracting, setHasStartedInteracting] = useState(false);

  const needByService: Record<string, typeof formData.primaryNeed> = {
    "ai-chatbots-virtual-agents": "chatbot",
    "workflow-automation": "workflow",
    "data-pipeline-engineering": "data",
    "custom-ai-models": "ai_model",
    "ai-system-integration": "integration",
    "ai-audit-optimization": "ai_audit",
  };

  // Capture the selected service and UTM parameters without changing the API contract.
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      primaryNeed:
        needByService[searchParams.get("service") || ""] || prev.primaryNeed,
      utmSource: searchParams.get("utm_source") || "",
      utmMedium: searchParams.get("utm_medium") || "",
      utmCampaign: searchParams.get("utm_campaign") || "",
      utmContent: searchParams.get("utm_content") || "",
      utmTerm: searchParams.get("utm_term") || "",
    }));
  }, [searchParams]);

  const handleFieldChange = (field: string, value: any) => {
    if (!hasStartedInteracting) {
      setHasStartedInteracting(true);
      trackEvent({
        name: "contact_form_start",
        params: { page_path: "/contact" },
      });
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side quick checks
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim() || !formData.workEmail.includes("@")) {
      newErrors.workEmail = "Valid work email is required";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message =
        "Please describe your bottleneck in at least 10 characters";
    }
    if (!formData.consent) {
      newErrors.consent = "You must agree to our privacy policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          const mapped: Record<string, string> = {};
          Object.entries(data.fieldErrors).forEach(([k, v]) => {
            mapped[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setErrors(mapped);
        }
        throw new Error(data.error || "Failed to submit request");
      }

      // Track conversion
      trackEvent({
        name: "contact_form_submit",
        params: {
          primary_need: formData.primaryNeed,
          page_path: "/contact",
        },
      });

      // Redirect to Thank You page
      router.push("/thank-you");
    } catch (err: any) {
      console.error("Submission error:", err);
      setServerError(
        err.message || "An unexpected error occurred. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  const handleScheduleClick = () => {
    trackEvent({
      name: "schedule_click",
      params: { page_path: "/contact" },
    });
  };

  const textFields = [
    {
      key: "fullName",
      label: "Your name",
      type: "text",
      auto: "name",
      required: true,
      max: 100,
      placeholder: "Alex Morgan",
    },
    {
      key: "workEmail",
      label: "Work email",
      type: "email",
      auto: "email",
      required: true,
      max: 254,
      placeholder: "alex@company.com",
    },
    {
      key: "company",
      label: "Company",
      type: "text",
      auto: "organization",
      required: false,
      max: 200,
      placeholder: "Your company",
    },
    {
      key: "website",
      label: "Website",
      type: "url",
      auto: "url",
      required: false,
      max: 500,
      placeholder: "https://yourcompany.com",
    },
    {
      key: "phone",
      label: "Phone",
      type: "tel",
      auto: "tel",
      required: false,
      max: 40,
      placeholder: "Your contact number",
    },
  ] as const;
  return (
    <div className="pa-contact-layout">
      <aside className="pa-contact-aside">
        <span className="pa-kicker">START WITH A CONVERSATION</span>
        <h2 style={{ marginTop: 20 }}>
          What’s taking up
          <br />
          too much time?
        </h2>
        <p>
          Tell us about your workflow, your tools, and the things you wish
          worked better. We’ll help you find a useful next step.
        </p>
        <dl>
          <div>
            <dt>Write to us</dt>
            <dd>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </dd>
          </div>
          {contactPhone && (
            <div>
              <dt>Call us</dt>
              <dd>
                <a href={telHref}>{contactPhone}</a>
              </dd>
            </div>
          )}
          <div>
            <dt>A first conversation</dt>
            <dd>45 minutes · No commitment</dd>
          </div>
        </dl>
        {schedulingUrl && (
          <a
            href={schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleScheduleClick}
            className="pa-button pa-button-outline"
          >
            Choose a time <Calendar size={17} />
          </a>
        )}
      </aside>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Project inquiry"
        aria-busy={isSubmitting}
      >
        {serverError && (
          <div role="alert" className="pa-form-error">
            {serverError}
          </div>
        )}
        <div hidden aria-hidden="true">
          <label htmlFor="contact-hp">Leave this field empty</label>
          <input
            id="contact-hp"
            name="websiteUrl_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.websiteUrl_hp}
            onChange={(e) => handleFieldChange("websiteUrl_hp", e.target.value)}
          />
        </div>
        <div className="pa-form-grid">
          {textFields.map((field) => (
            <div key={field.key} className="pa-field">
              <label htmlFor={`contact-${field.key}`}>
                {field.label}
                {!field.required && <span> (optional)</span>}
              </label>
              <input
                id={`contact-${field.key}`}
                name={field.key}
                type={field.type}
                autoComplete={field.auto}
                required={field.required}
                maxLength={field.max}
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                aria-invalid={Boolean(errors[field.key])}
                aria-describedby={
                  errors[field.key] ? `contact-error-${field.key}` : undefined
                }
              />
              {errors[field.key] && (
                <span
                  id={`contact-error-${field.key}`}
                  className="pa-field-error"
                  role="alert"
                >
                  {errors[field.key]}
                </span>
              )}
            </div>
          ))}
          <div className="pa-field">
            <label htmlFor="contact-budget">Project budget</label>
            <select
              id="contact-budget"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={(e) => handleFieldChange("budgetRange", e.target.value)}
            >
              {["< $10k", "$10k - $25k", "$25k - $50k", "$50k+"].map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="pa-field pa-field-wide">
            <label htmlFor="contact-need">
              What would you like to explore?
            </label>
            <select
              id="contact-need"
              name="primaryNeed"
              value={formData.primaryNeed}
              onChange={(e) => handleFieldChange("primaryNeed", e.target.value)}
            >
              {[
                ["chatbot", "AI agents & chatbots"],
                ["workflow", "Workflow automation"],
                ["data", "Data pipelines"],
                ["ai_model", "Custom AI systems"],
                ["integration", "System integration"],
                ["ai_audit", "AI audit & optimization"],
                ["other", "I’d like your guidance"],
              ].map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.primaryNeed && (
              <span className="pa-field-error" role="alert">
                {errors.primaryNeed}
              </span>
            )}
          </div>
          <div className="pa-field pa-field-wide">
            <label htmlFor="contact-message">
              Tell us a little about your challenge
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={4000}
              value={formData.message}
              onChange={(e) => handleFieldChange("message", e.target.value)}
              placeholder="We spend a lot of time on…"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-error-message" : undefined
              }
            />
            {errors.message && (
              <span
                id="contact-error-message"
                className="pa-field-error"
                role="alert"
              >
                {errors.message}
              </span>
            )}
          </div>
        </div>
        <label className="pa-checkbox">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={(e) => handleFieldChange("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? "contact-error-consent" : undefined
            }
          />
          <span>
            I agree to the{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{" "}
            and to being contacted about my request.
          </span>
        </label>
        {errors.consent && (
          <p id="contact-error-consent" role="alert" className="pa-field-error">
            {errors.consent}
          </p>
        )}
        <div className="pa-form-footer">
          <button className="pa-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending your request…" : "Send your request"}
            <Send size={17} />
          </button>
          <p>Your details go directly to the Prime Automation team.</p>
        </div>
      </form>
    </div>
  );
}
