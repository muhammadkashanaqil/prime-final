"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Globe,
  Share2,
} from "lucide-react";

export default function SettingsClient({
  initialSettings,
}: {
  initialSettings: any;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: initialSettings?.businessName || "Prime Automation Pvt. Ltd.",
    email: initialSettings?.email || "info@primeautomationpl.com",
    phone: initialSettings?.phone ?? "",
    schedulingUrl: initialSettings?.schedulingUrl ?? "",
    socialLinks: {
      linkedin: initialSettings?.socialLinks?.linkedin ?? "",
      twitter: initialSettings?.socialLinks?.twitter ?? "",
      github: initialSettings?.socialLinks?.github ?? "",
      youtube: initialSettings?.socialLinks?.youtube ?? "",
    },
    defaultSeoTitle:
      initialSettings?.defaultSeoTitle ||
      "Prime Automation | Custom AI & Operational Automation Systems",
    defaultSeoDescription:
      initialSettings?.defaultSeoDescription ||
      "Prime Automation builds enterprise-grade AI chatbots, automated workflows, data pipelines, and custom AI integrations that scale your operations.",
    footerText: initialSettings?.footerText ?? "",
    chatbotWelcomeMessage:
      initialSettings?.chatbotWelcomeMessage ||
      "👋 Hello! Welcome to Prime Automation. I can help answer questions about our AI services, explain our automation process, or help you book a free audit. How can I assist you today?",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update settings");
      }

      setSuccessMessage("Site settings saved and revalidated successfully!");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold admin-ink tracking-tight">
            Site & Global Settings
          </h1>
          <p className="text-xs sm:text-sm admin-muted mt-1">
            Configure company contact info, default SEO tags, scheduling
            calendar, and chatbot welcome copy.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md admin-primary hover:admin-primary-hover admin-ink text-xs font-bold  transition-all active:scale-95 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-rose-500/15 border border-rose-500/30 admin-danger text-xs sm:text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-md bg-emerald-500/15 border border-emerald-500/30 admin-success text-xs sm:text-sm">
          {successMessage}
        </div>
      )}

      {/* General Company Info */}
      <div className="glass-card rounded-lg p-6 sm:p-8 border admin-border space-y-6">
        <h2 className="text-sm font-bold admin-ink uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 admin-accent" />
          <span>Company & Contact Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="admin-settingsclient-1"
              className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
            >
              Business Name *
            </label>
            <input
              id="admin-settingsclient-1"
              type="text"
              required
              value={formData.businessName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
              className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-2"
              className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
            >
              Primary Contact Email *
            </label>
            <input
              id="admin-settingsclient-2"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-3"
              className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
            >
              Phone Number
            </label>
            <input
              id="admin-settingsclient-3"
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-4"
              className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
            >
              Cal.com / Calendly Scheduling URL
            </label>
            <input
              id="admin-settingsclient-4"
              type="url"
              value={formData.schedulingUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  schedulingUrl: e.target.value,
                }))
              }
              className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-settingsclient-5"
            className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
          >
            Footer Tagline
          </label>
          <input
            id="admin-settingsclient-5"
            type="text"
            value={formData.footerText}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, footerText: e.target.value }))
            }
            className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Chatbot Settings */}
      <div className="glass-card rounded-lg p-6 sm:p-8 border admin-border space-y-6">
        <h2 className="text-sm font-bold admin-ink uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 admin-accent" />
          <span>Chatbot Widget Configuration</span>
        </h2>

        <div>
          <label
            htmlFor="admin-settingsclient-6"
            className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
          >
            Initial Welcome Message *
          </label>
          <textarea
            id="admin-settingsclient-6"
            rows={3}
            required
            value={formData.chatbotWelcomeMessage}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                chatbotWelcomeMessage: e.target.value,
              }))
            }
            className="w-full admin-soft border admin-border rounded-md p-4 text-sm admin-ink focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Default SEO Defaults */}
      <div className="glass-card rounded-lg p-6 sm:p-8 border admin-border space-y-6">
        <h2 className="text-sm font-bold admin-ink uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 admin-accent" />
          <span>Default Site SEO Defaults</span>
        </h2>

        <div>
          <label
            htmlFor="admin-settingsclient-7"
            className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
          >
            Default Site Title Template *
          </label>
          <input
            id="admin-settingsclient-7"
            type="text"
            required
            value={formData.defaultSeoTitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                defaultSeoTitle: e.target.value,
              }))
            }
            className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div>
          <label
            htmlFor="admin-settingsclient-8"
            className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
          >
            Default Meta Description *
          </label>
          <textarea
            id="admin-settingsclient-8"
            rows={3}
            required
            value={formData.defaultSeoDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                defaultSeoDescription: e.target.value,
              }))
            }
            className="w-full admin-soft border admin-border rounded-md p-4 text-sm admin-ink focus:outline-none focus:border-prime-accent"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="glass-card rounded-lg p-6 sm:p-8 border admin-border space-y-6">
        <h2 className="text-sm font-bold admin-ink uppercase tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4 admin-accent" />
          <span>Social Media Profiles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="admin-settingsclient-9"
              className="block text-[11px] admin-muted mb-1"
            >
              LinkedIn URL
            </label>
            <input
              id="admin-settingsclient-9"
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    linkedin: e.target.value,
                  },
                }))
              }
              className="w-full admin-soft border admin-border rounded-lg px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-10"
              className="block text-[11px] admin-muted mb-1"
            >
              Twitter / X URL
            </label>
            <input
              id="admin-settingsclient-10"
              type="url"
              value={formData.socialLinks.twitter}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                }))
              }
              className="w-full admin-soft border admin-border rounded-lg px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-11"
              className="block text-[11px] admin-muted mb-1"
            >
              GitHub Organization URL
            </label>
            <input
              id="admin-settingsclient-11"
              type="url"
              value={formData.socialLinks.github}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, github: e.target.value },
                }))
              }
              className="w-full admin-soft border admin-border rounded-lg px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>

          <div>
            <label
              htmlFor="admin-settingsclient-12"
              className="block text-[11px] admin-muted mb-1"
            >
              YouTube URL
            </label>
            <input
              id="admin-settingsclient-12"
              type="url"
              value={formData.socialLinks.youtube}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, youtube: e.target.value },
                }))
              }
              className="w-full admin-soft border admin-border rounded-lg px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
