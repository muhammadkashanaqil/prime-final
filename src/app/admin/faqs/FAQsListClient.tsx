"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpDown,
} from "lucide-react";

export default function FAQsListClient({
  initialFaqs,
}: {
  initialFaqs: any[];
}) {
  const router = useRouter();
  const [faqs, setFaqs] = useState(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [faqs]);

  const filteredItems = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory =
        categoryFilter === "ALL" || item.category === categoryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, categoryFilter, searchQuery]);

  const itemToDelete = faqs.find((item) => item.id === deletingId);

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/faqs?id=${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete FAQ");

      setFaqs((prev) => prev.filter((item) => item.id !== deletingId));
      setDeletingId(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error deleting record");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold admin-ink tracking-tight">
            Knowledge FAQs
          </h1>
          <p className="text-xs sm:text-sm admin-muted mt-1">
            Manage public FAQs, categories, homepage preview pinning, and sort
            order.
          </p>
        </div>

        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md admin-primary hover:admin-primary-hover admin-ink text-xs font-bold  transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-lg p-4 border admin-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 admin-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full admin-soft border admin-border rounded-md pl-10 pr-4 py-2 text-xs admin-ink placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs admin-muted">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-surface border admin-border rounded-md px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "ALL" ? `All Categories (${faqs.length})` : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="glass-card rounded-lg border admin-border overflow-hidden admin-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="admin-soft admin-muted border-b admin-border uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Question</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Homepage Featured</th>
                <th className="py-3.5 px-4">Sort Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:admin-soft transition-colors"
                  >
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold admin-ink text-sm hover:admin-accent transition-colors">
                        <Link href={`/admin/faqs/${item.id}/edit`}>
                          {item.question}
                        </Link>
                      </div>
                      <div className="text-[11px] admin-muted mt-0.5 line-clamp-1">
                        {item.answer}
                      </div>
                    </td>

                    <td className="py-4 px-4 admin-ink">
                      <span className="px-2.5 py-1 rounded-lg admin-soft border admin-border text-xs">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 admin-accent font-semibold">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      ) : (
                        <span className="admin-muted">Standard</span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono admin-ink">
                      #{item.sortOrder}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-500/15 admin-success border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/admin/faqs/${item.id}/edit`}
                          title="Edit FAQ"
                          className="p-1.5 rounded-lg admin-muted hover:admin-accent hover:admin-tint transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(item.id)}
                          title="Delete FAQ"
                          className="p-1.5 rounded-lg admin-muted hover:admin-danger hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center admin-muted">
                    No FAQs match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="Delete FAQ"
        itemName={itemToDelete?.question || "this FAQ"}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
