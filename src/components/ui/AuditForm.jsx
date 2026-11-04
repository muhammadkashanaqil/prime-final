"use client";

import { useEffect, useRef, useState } from "react";
import { buildAuditEmail, CONTACT_EMAIL, SERVICES } from "@/lib/audit-email";

function mapServiceToNeed(service) {
  if (!service) return "other";
  if (service.includes("agents") || service.includes("chatbots"))
    return "chatbot";
  if (service.includes("Workflow")) return "workflow";
  if (service.includes("Data")) return "data";
  if (service.includes("Custom")) return "ai_model";
  if (service.includes("integration")) return "integration";
  if (service.includes("audit")) return "ai_audit";
  return "other";
}

export default function AuditForm({ service = "", open = false }) {
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const fallbackRef = useRef(null);
  const [request, setRequest] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedToDb, setSubmittedToDb] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (open && service && SERVICES.includes(service)) {
      if (formRef.current?.elements?.service) {
        formRef.current.elements.service.value = service;
      }
      setRequest(null);
    }
  }, [service, open]);

  useEffect(() => {
    if (request) emailRef.current?.focus();
  }, [request]);

  useEffect(() => {
    if (showFallback && fallbackRef.current) {
      fallbackRef.current.focus();
      fallbackRef.current.select();
    }
  }, [showFallback]);

  async function submit(event) {
    event.preventDefault();
    const form = formRef.current;
    for (const field of form.querySelectorAll("[required]")) {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please enter a value.",
      );
    }
    if (!form.reportValidity()) return;

    const rawData = Object.fromEntries(new FormData(form));
    const prepared = buildAuditEmail(rawData);
    setRequest(prepared);
    setCopyStatus("");
    setShowFallback(false);

    // Save lead into database via API so it instantly appears in admin dashboard
    setSubmitting(true);
    setSubmittedToDb(false);
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: rawData.name || "Inquirer",
          workEmail: rawData.email,
          company: rawData.company || "",
          primaryNeed: mapServiceToNeed(rawData.service),
          message: rawData.message,
          websiteUrl_hp: "",
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error ||
            "Your request could not be sent. Please try again, or send the prepared email below.",
        );
      setSubmittedToDb(true);
    } catch (err) {
      setSubmitError(
        err.message ||
          "Could not send your request. You can try again or use the email option below.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function clearPrepared(event) {
    event.target.setCustomValidity?.("");
    setRequest(null);
    setShowFallback(false);
    setSubmittedToDb(false);
    setSubmitError("");
  }

  async function copyRequest() {
    if (!request) return;
    try {
      await navigator.clipboard.writeText(request.copyText);
      setCopyStatus(`Copied. Paste this into an email to ${CONTACT_EMAIL}.`);
    } catch {
      setShowFallback(true);
      setCopyStatus(
        "Your request is selected below. Use your device's Copy command.",
      );
    }
  }

  return (
    <form
      id="audit-form"
      ref={formRef}
      onSubmit={submit}
      onInput={clearPrepared}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
          />
        </label>
        <label>
          Work email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={180}
          />
        </label>
      </div>
      <label>
        Company
        <input
          name="company"
          autoComplete="organization"
          placeholder="Your company"
          required
          maxLength={150}
        />
      </label>
      <label>
        What would you like to explore?
        <select name="service" onChange={clearPrepared}>
          {SERVICES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        What&apos;s taking up too much time?
        <textarea
          name="message"
          rows={3}
          placeholder="Tell us about a workflow you'd love to improve..."
          required
          minLength={5}
          maxLength={3000}
        />
      </label>
      <p className="form-note">
        Fill out your bottleneck to request a complimentary 45-minute technical
        audit.
      </p>
      <button type="submit" className="button" disabled={submitting}>
        {submitting ? "Sending request..." : "Request my free audit"}{" "}
        <svg className="icon">
          <use href="#i-arrow" />
        </svg>
      </button>

      {submitError && (
        <p
          role="alert"
          style={{ color: "#ffbdca", marginTop: 16, fontSize: 13 }}
        >
          {submitError}
        </p>
      )}
      {submittedToDb && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(200, 42, 239, 0.12)",
            border: "1px solid rgba(200, 42, 239, 0.35)",
            color: "#f7f5fa",
            fontSize: "13px",
          }}
        >
          ✓ Your audit request has been received. We’ll review it and get in
          touch.
        </div>
      )}

      <div className="email-ready" id="email-ready" hidden={!request}>
        <p>
          Your request is prepared. Send it from your email app or copy the
          details:
        </p>
        <div>
          <a
            ref={emailRef}
            id="email-link"
            className="text-link"
            href={request?.mailto || `mailto:${CONTACT_EMAIL}`}
          >
            Open email app ↗
          </a>
          <button id="copy-request" type="button" onClick={copyRequest}>
            Copy request
          </button>
        </div>
        <span id="copy-status" role="status">
          {copyStatus}
        </span>
        {showFallback && (
          <textarea
            ref={fallbackRef}
            id="request-fallback"
            readOnly
            aria-label="Prepared audit request"
            value={request?.copyText || ""}
          />
        )}
      </div>
    </form>
  );
}
