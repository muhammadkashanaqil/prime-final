"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { SERVICES_LIST } from "@/lib/services-data";
import {
  Save,
  ArrowLeft,
  Eye,
  Trash2,
  Plus,
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Layers,
  MessageSquareQuote,
  CheckSquare,
} from "lucide-react";

interface CaseStudyFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CaseStudyForm({
  initialData,
  isEdit = false,
}: CaseStudyFormProps) {
  const router = useRouter();

  // Helper to parse challenge/solution/implementation/results whether string or object
  const parseSection = (val: any) => {
    if (!val) return "";
    if (typeof val === "object") {
      try {
        return JSON.stringify(val, null, 2);
      } catch {
        return String(val);
      }
    }
    return String(val);
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    status: initialData?.status || "DRAFT",
    clientName: initialData?.clientName || "",
    industry: initialData?.industry || "E-Commerce & Retail",
    services: initialData?.servicesList || ["workflow-automation"],
    excerpt:
      initialData?.excerpt ||
      "Comprehensive architectural case study outlining system design, automated workflows, and measurable ROI.",
    heroImageUrl: initialData?.heroImageUrl || "",
    heroImageAlt: initialData?.heroImageAlt || "",
    featured: initialData?.featured || false,
    featuredResult: initialData?.featuredResult || "",
    metrics: initialData?.metricsList || [],
    challenge: initialData
      ? parseSection(initialData.challenge)
      : JSON.stringify({ summary: "", bulletPoints: [] }, null, 2),
    solution: initialData
      ? parseSection(initialData.solution)
      : JSON.stringify({ summary: "", bulletPoints: [] }, null, 2),
    implementation: parseSection(initialData?.implementation),
    results: initialData
      ? parseSection(initialData.results)
      : JSON.stringify({ summary: "", bulletPoints: [] }, null, 2),
    technologies: initialData?.technologiesList || [
      "n8n",
      "OpenAI GPT-4o",
      "PostgreSQL",
      "Supabase",
    ],
    testimonial: initialData?.testimonialObj || {
      quote: "",
      name: "",
      role: "",
      company: "",
    },
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    ogImageUrl: initialData?.ogImageUrl || "",
    noindex: initialData?.noindex || false,
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-generate slug from title on creation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEdit
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : prev.slug,
    }));
  };

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      const nextServices = exists
        ? prev.services.filter((s: string) => s !== slug)
        : [...prev.services, slug];
      return {
        ...prev,
        services: nextServices.length > 0 ? nextServices : [slug],
      };
    });
  };

  const handleMetricChange = (index: number, field: string, val: string) => {
    const updated = [...formData.metrics];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, metrics: updated }));
  };

  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        { label: "New Metric", value: "99%", note: "" },
      ],
    }));
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
    }
    setTechInput("");
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t: string) => t !== tech),
    }));
  };

  const handleSave = async (publishStatus?: "DRAFT" | "PUBLISHED") => {
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);
    setIsSubmitting(true);

    // Clean up testimonial if empty
    const testimonialPayload =
      formData.testimonial?.quote &&
      formData.testimonial.quote.trim().length > 0
        ? formData.testimonial
        : null;

    // Ensure title and slug exist
    const finalTitle = formData.title?.trim() || "Untitled Case Study";
    const finalSlug =
      formData.slug?.trim() ||
      finalTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `case-study-${Date.now()}`;

    const payload = {
      ...formData,
      title: finalTitle,
      slug: finalSlug,
      excerpt:
        formData.excerpt?.trim() ||
        `${finalTitle} - Enterprise operational case study by Prime Automation.`,
      status: publishStatus || formData.status,
      testimonial: testimonialPayload,
    };

    try {
      const url = "/api/admin/case-studies";
      const method = isEdit ? "PUT" : "POST";
      const bodyData = isEdit ? { id: initialData.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          const flat: Record<string, string> = {};
          Object.entries(data.details).forEach(([k, v]) => {
            flat[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setFieldErrors(flat);
        }
        throw new Error(data.error || "Failed to save case study");
      }

      setSuccessMessage(
        publishStatus === "PUBLISHED"
          ? "Case study published successfully!"
          : "Draft saved successfully!",
      );

      if (!isEdit && data.item?.id) {
        router.push(`/admin/case-studies/${data.item.id}/edit`);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/case-studies"
            className="p-2 rounded-md admin-soft hover:admin-soft admin-muted hover:admin-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold admin-ink">
              {isEdit ? "Edit Case Study" : "Create New Case Study"}
            </h1>
            <p className="text-xs admin-muted">
              {isEdit
                ? `Editing: ${formData.title}`
                : "Fill in the architecture breakdown below"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isEdit && formData.status === "PUBLISHED" && (
            <Link
              href={`/case-studies/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md admin-soft hover:admin-soft admin-ink text-xs font-semibold"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Live</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSave("DRAFT")}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-md admin-soft hover:admin-soft admin-ink text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("PUBLISHED")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md admin-primary hover:admin-primary-hover admin-ink text-xs font-bold  transition-all active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Case Study</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-rose-500/15 border border-rose-500/30 admin-danger text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">{error}</div>
            {Object.keys(fieldErrors).length > 0 && (
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {Object.entries(fieldErrors).map(([field, msg]) => (
                  <li key={field}>
                    <strong className="capitalize">{field}:</strong> {msg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-md bg-emerald-500/15 border border-emerald-500/30 admin-success text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Content & Narrative */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              Basic Information
            </h3>

            <div>
              <label
                htmlFor="admin-casestudyform-1"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Case Study Title *
              </label>
              <input
                id="admin-casestudyform-1"
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Autonomous Multi-Channel Support & Intelligent Lead Routing"
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label
                htmlFor="admin-casestudyform-2"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                URL Slug *
              </label>
              <input
                id="admin-casestudyform-2"
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink font-mono focus:outline-none focus:border-prime-accent"
              />
              {isEdit && formData.status === "PUBLISHED" && (
                <p className="text-[11px] admin-warning mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Changing the slug of a
                  published page will change its public URL.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="admin-casestudyform-3"
                  className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
                >
                  Client / Project Name (Optional)
                </label>
                <input
                  id="admin-casestudyform-3"
                  type="text"
                  placeholder="OmniRetail Global"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      clientName: e.target.value,
                    }))
                  }
                  className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-casestudyform-4"
                  className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
                >
                  Industry *
                </label>
                <input
                  id="admin-casestudyform-4"
                  type="text"
                  required
                  placeholder="E-Commerce & Retail"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      industry: e.target.value,
                    }))
                  }
                  className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>
            </div>

            {/* Related Services Selector */}
            <div>
              <label className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2">
                Related Services (Select one or more) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {SERVICES_LIST.map((srv) => {
                  const isChecked = formData.services.includes(srv.slug);
                  return (
                    <button
                      key={srv.slug}
                      type="button"
                      onClick={() => toggleService(srv.slug)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-left border transition-all ${
                        isChecked
                          ? "admin-primary/20 border-prime-accent admin-ink"
                          : "admin-soft admin-border admin-muted hover:admin-ink"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isChecked
                            ? "admin-primary border-prime-accent"
                            : "border-white/30"
                        }`}
                      >
                        {isChecked && (
                          <CheckSquare className="w-3 h-3 admin-ink" />
                        )}
                      </span>
                      <span className="truncate">{srv.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-casestudyform-5"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Card & Meta Excerpt * (~140-180 chars)
              </label>
              <textarea
                id="admin-casestudyform-5"
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="How a high-volume e-commerce brand reduced first-response time from 4 hours to 12 seconds..."
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Key Metrics Manager */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
                Audited Performance Metrics (1-4 Items)
              </h3>
              <button
                type="button"
                onClick={handleAddMetric}
                className="inline-flex items-center gap-1 text-xs admin-accent hover:admin-ink font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.metrics.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-md admin-soft border admin-border flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="Value (e.g. 68%)"
                    value={m.value}
                    onChange={(e) =>
                      handleMetricChange(idx, "value", e.target.value)
                    }
                    className="w-full sm:w-28 admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Ticket Deflection)"
                    value={m.label}
                    onChange={(e) =>
                      handleMetricChange(idx, "label", e.target.value)
                    }
                    className="w-full sm:w-48 admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                  />
                  <input
                    type="text"
                    placeholder="Note (optional)"
                    value={m.note || ""}
                    onChange={(e) =>
                      handleMetricChange(idx, "note", e.target.value)
                    }
                    className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="p-1.5 rounded-lg admin-muted hover:admin-danger hover:bg-rose-500/10 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative values keep their existing text/JSON format and API fields. */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-6">
            <div>
              <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
                Architecture narrative
              </h3>
              <p className="admin-editor-help">
                Tell the story of the system. Write, preview, or edit the
                original source for each section.
              </p>
            </div>
            {(
              [
                ["challenge", "1. The Challenge", true],
                ["solution", "2. The Solution", true],
                ["implementation", "3. Implementation & Timeline", false],
                ["results", "4. Results & ROI Impact", true],
              ] as const
            ).map(([field, label, required]) => (
              <fieldset className="admin-narrative-field" key={field}>
                <legend>
                  {label} {required ? "*" : "(Optional)"}
                </legend>
                <ArticleEditor
                  label={label}
                  compact
                  value={formData[field]}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, [field]: value }))
                  }
                />
              </fieldset>
            ))}
          </div>

          {/* Testimonial Section */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 admin-accent" />
              <span>Client Testimonial (Optional)</span>
            </h3>

            <div>
              <label
                htmlFor="admin-casestudyform-10"
                className="block text-[11px] admin-muted mb-1"
              >
                Quote
              </label>
              <textarea
                id="admin-casestudyform-10"
                rows={3}
                placeholder="Prime Automation built a system that fundamentally transformed how we operate..."
                value={formData.testimonial?.quote || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    testimonial: { ...prev.testimonial, quote: e.target.value },
                  }))
                }
                className="w-full admin-soft border admin-border rounded-md px-4 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="admin-casestudyform-11"
                  className="block text-[11px] admin-muted mb-1"
                >
                  Client Name
                </label>
                <input
                  id="admin-casestudyform-11"
                  type="text"
                  placeholder="Elena Rostova"
                  value={formData.testimonial?.name || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: {
                        ...prev.testimonial,
                        name: e.target.value,
                      },
                    }))
                  }
                  className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="admin-casestudyform-12"
                  className="block text-[11px] admin-muted mb-1"
                >
                  Role / Title
                </label>
                <input
                  id="admin-casestudyform-12"
                  type="text"
                  placeholder="VP Operations"
                  value={formData.testimonial?.role || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: {
                        ...prev.testimonial,
                        role: e.target.value,
                      },
                    }))
                  }
                  className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="admin-casestudyform-13"
                  className="block text-[11px] admin-muted mb-1"
                >
                  Company
                </label>
                <input
                  id="admin-casestudyform-13"
                  type="text"
                  placeholder="OmniRetail"
                  value={formData.testimonial?.company || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: {
                        ...prev.testimonial,
                        company: e.target.value,
                      },
                    }))
                  }
                  className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Settings, Media, Tech & SEO */}
        <div className="space-y-6">
          {/* Status & Homepage Pinning */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              Publish Settings
            </h3>

            <div>
              <label
                htmlFor="admin-casestudyform-14"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Current Status
              </label>
              <select
                id="admin-casestudyform-14"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full admin-surface border admin-border rounded-md px-4 py-2.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              >
                <option value="DRAFT">DRAFT (Hidden from public)</option>
                <option value="PUBLISHED">PUBLISHED (Live on site)</option>
              </select>
            </div>

            <div className="pt-2 border-t admin-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded admin-accent focus:ring-prime-accent"
                />
                <span className="text-xs admin-ink font-semibold">
                  Feature this case study
                </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="admin-casestudyform-15"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Featured Result Badge
              </label>
              <input
                id="admin-casestudyform-15"
                type="text"
                placeholder="68% Ticket Deflection"
                value={formData.featuredResult}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuredResult: e.target.value,
                  }))
                }
                className="w-full admin-soft border admin-border rounded-md px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <ImageUploader
              value={formData.heroImageUrl}
              altValue={formData.heroImageAlt}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, heroImageUrl: url }))
              }
              onAltChange={(alt) =>
                setFormData((prev) => ({ ...prev, heroImageAlt: alt }))
              }
              label="Hero Image"
            />
          </div>

          {/* Technologies Stack Tags */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              Technologies Stack
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tech (e.g. n8n)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTech())
                }
                className="w-full admin-soft border admin-border rounded-md px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-2 rounded-md admin-primary admin-ink text-xs font-bold shrink-0"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {formData.technologies.map((t: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg admin-soft border admin-border text-xs admin-ink"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(t)}
                    className="admin-muted hover:admin-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Overrides */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-3">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              SEO Overrides
            </h3>
            <div>
              <label
                htmlFor="admin-casestudyform-16"
                className="block text-[11px] admin-muted mb-1"
              >
                SEO Title Override
              </label>
              <input
                id="admin-casestudyform-16"
                type="text"
                value={formData.seoTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))
                }
                className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>
            <div>
              <label
                htmlFor="admin-casestudyform-17"
                className="block text-[11px] admin-muted mb-1"
              >
                SEO Meta Description
              </label>
              <textarea
                id="admin-casestudyform-17"
                rows={2}
                value={formData.seoDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seoDescription: e.target.value,
                  }))
                }
                className="w-full admin-soft border admin-border rounded-lg px-3 py-1.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
