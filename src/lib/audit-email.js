export const CONTACT_EMAIL = "info@primeautomationpl.com";

export const SERVICES = [
  "Not sure yet — help me find the opportunity",
  "AI agents & chatbots",
  "Workflow automation",
  "Data pipeline engineering",
  "Custom AI development",
  "AI system integration",
  "AI audit & optimization",
];

// This only prepares an email. It never sends or stores the visitor's information.
export function buildAuditEmail(values) {
  const clean = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      String(value ?? "").trim(),
    ]),
  );
  for (const key of ["name", "email", "company", "message"]) {
    if (!clean[key]) throw new Error(`Missing required field: ${key}`);
  }
  const subject = `Free AI audit request — ${clean.company}`;
  const body = `Hello Prime Automation,\n\nI would like to arrange a free 45-minute AI audit.\n\nName: ${clean.name}\nWork email: ${clean.email}\nCompany: ${clean.company}\nArea of interest: ${clean.service || SERVICES[0]}\n\nOur bottleneck:\n${clean.message}\n\nPlease let me know a suitable time to talk.\n\nThank you,\n${clean.name}`;
  return {
    subject,
    body,
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    copyText: `To: ${CONTACT_EMAIL}\n\n${body}`,
  };
}
