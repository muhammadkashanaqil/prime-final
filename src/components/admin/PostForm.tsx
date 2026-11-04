"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArticleEditor from "@/components/admin/ArticleEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Save,
  ArrowLeft,
  Eye,
  Plus,
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface PostFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function PostForm({
  initialData,
  isEdit = false,
}: PostFormProps) {
  const router = useRouter();

  const parseBody = (val: any) => {
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
    excerpt:
      initialData?.excerpt ||
      "Deep-dive technical guide on enterprise automation, data engineering, and modern AI systems.",
    coverImageUrl: initialData?.coverImageUrl || "",
    coverImageAlt: initialData?.coverImageAlt || "",
    author: initialData?.author || "Prime Automation Team",
    categories: initialData?.categoriesList || ["Workflow Automation", "n8n"],
    readingTime: initialData?.readingTime || "5 min read",
    body:
      parseBody(initialData?.bodyJson || initialData?.body) ||
      '{\n  "sections": [\n    {\n      "heading": "Introduction",\n      "content": "Write the opening overview..."\n    }\n  ]\n}',
    featured: initialData?.featured || false,
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    ogImageUrl: initialData?.ogImageUrl || "",
    noindex: initialData?.noindex || false,
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleAddCategory = () => {
    if (!categoryInput.trim()) return;
    if (!formData.categories.includes(categoryInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
    }
    setCategoryInput("");
  };

  const handleRemoveCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c: string) => c !== cat),
    }));
  };

  const handleSave = async (publishStatus?: "DRAFT" | "PUBLISHED") => {
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);
    setIsSubmitting(true);

    const finalTitle = formData.title?.trim() || "Untitled Insight Post";
    const finalSlug =
      formData.slug?.trim() ||
      finalTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `post-${Date.now()}`;

    const payload = {
      ...formData,
      title: finalTitle,
      slug: finalSlug,
      excerpt:
        formData.excerpt?.trim() ||
        `${finalTitle} - Technical insight article by Prime Automation.`,
      status: publishStatus || formData.status,
    };

    try {
      const url = "/api/admin/posts";
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
        throw new Error(data.error || "Failed to save post");
      }

      setSuccessMessage(
        publishStatus === "PUBLISHED"
          ? "Post published successfully!"
          : "Draft saved successfully!",
      );

      if (!isEdit && data.item?.id) {
        router.push(`/admin/posts/${data.item.id}/edit`);
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
            href="/admin/posts"
            className="p-2 rounded-md admin-soft hover:admin-soft admin-muted hover:admin-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold admin-ink">
              {isEdit ? "Edit Insight Post" : "Create New Post"}
            </h1>
            <p className="text-xs admin-muted">
              {isEdit
                ? `Editing: ${formData.title}`
                : "Share an idea with your readers"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isEdit && formData.status === "PUBLISHED" && (
            <Link
              href={`/insights/${formData.slug}`}
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
            <span>Publish Post</span>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <div>
              <label
                htmlFor="admin-postform-1"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Article Title *
              </label>
              <input
                id="admin-postform-1"
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="The 2026 Blueprint for Enterprise Workflow Automation..."
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div>
              <label
                htmlFor="admin-postform-2"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                URL Slug *
              </label>
              <input
                id="admin-postform-2"
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink font-mono focus:outline-none focus:border-prime-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="admin-postform-3"
                  className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
                >
                  Author *
                </label>
                <input
                  id="admin-postform-3"
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-postform-4"
                  className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
                >
                  Reading Time
                </label>
                <input
                  id="admin-postform-4"
                  type="text"
                  value={formData.readingTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      readingTime: e.target.value,
                    }))
                  }
                  placeholder="6 min read"
                  className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-postform-5"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Excerpt / Meta Summary *
              </label>
              <textarea
                id="admin-postform-5"
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="A comprehensive guide on combining open orchestration platforms with modern LLMs..."
                className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
              />
            </div>
          </div>

          {/* Body Content Editor */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
                Article content
              </h3>
            </div>
            <ArticleEditor
              value={formData.body}
              onChange={(body) => setFormData((prev) => ({ ...prev, body }))}
            />
          </div>
        </div>

        {/* Right 1 Col */}
        <div className="space-y-6">
          {/* Publish Status & Pinning */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              Status & Visibility
            </h3>

            <div>
              <label
                htmlFor="admin-postform-6"
                className="block text-xs font-semibold admin-ink uppercase tracking-wider mb-2"
              >
                Status
              </label>
              <select
                id="admin-postform-6"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full admin-surface border admin-border rounded-md px-4 py-2.5 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              >
                <option value="DRAFT">DRAFT (Not visible to public)</option>
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
                  Feature on Homepage / Insights Top
                </span>
              </label>
            </div>
          </div>

          {/* Cover Image */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <ImageUploader
              value={formData.coverImageUrl}
              altValue={formData.coverImageAlt}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, coverImageUrl: url }))
              }
              onAltChange={(alt) =>
                setFormData((prev) => ({ ...prev, coverImageAlt: alt }))
              }
              label="Article Cover Image"
            />
          </div>

          {/* Categories */}
          <div className="glass-card rounded-lg p-6 border admin-border space-y-4">
            <h3 className="text-sm font-bold admin-ink uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Category (e.g. AI Chatbots)"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddCategory())
                }
                className="w-full admin-soft border admin-border rounded-md px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 rounded-md admin-primary admin-ink text-xs font-bold shrink-0"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {formData.categories.map((cat: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg admin-soft border admin-border text-xs admin-ink"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
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
                htmlFor="admin-postform-7"
                className="block text-[11px] admin-muted mb-1"
              >
                Meta Title
              </label>
              <input
                id="admin-postform-7"
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
                htmlFor="admin-postform-8"
                className="block text-[11px] admin-muted mb-1"
              >
                Meta Description
              </label>
              <textarea
                id="admin-postform-8"
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
