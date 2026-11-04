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
  ExternalLink,
  Eye,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function CaseStudiesListClient({
  initialCaseStudies,
}: {
  initialCaseStudies: any[];
}) {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredItems = useMemo(() => {
    return caseStudies.filter((item) => {
      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.clientName &&
          item.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.industry.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [caseStudies, statusFilter, searchQuery]);

  const itemToDelete = caseStudies.find((item) => item.id === deletingId);

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/case-studies?id=${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete case study");

      setCaseStudies((prev) => prev.filter((item) => item.id !== deletingId));
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
            Case Studies
          </h1>
          <p className="text-xs sm:text-sm admin-muted mt-1">
            Manage published proof of work, challenge breakdowns, architecture
            solutions, and metrics.
          </p>
        </div>

        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md admin-primary hover:admin-primary-hover admin-ink text-xs font-bold  transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Case Study</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-lg p-4 border admin-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 admin-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, client, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full admin-soft border admin-border rounded-md pl-10 pr-4 py-2 text-xs admin-ink placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs admin-muted">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-surface border admin-border rounded-md px-3 py-2 text-xs admin-ink focus:outline-none focus:border-prime-accent"
          >
            <option value="ALL">All Statuses ({caseStudies.length})</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Drafts</option>
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="glass-card rounded-lg border admin-border overflow-hidden admin-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="admin-soft admin-muted border-b admin-border uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Case Study</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated</th>
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
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold admin-ink text-sm hover:admin-accent transition-colors">
                        <Link href={`/admin/case-studies/${item.id}/edit`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className="text-[11px] admin-muted mt-0.5 flex items-center gap-2">
                        <span>Slug: /{item.slug}</span>
                        {item.clientName && (
                          <span>• Client: {item.clientName}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 admin-ink">{item.industry}</td>

                    <td className="py-4 px-4">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 admin-accent font-semibold">
                          <Sparkles className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="admin-muted">No</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-500/15 admin-success border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {item.status === "PUBLISHED" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 admin-muted text-[11px]">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        {item.status === "PUBLISHED" && (
                          <Link
                            href={`/case-studies/${item.slug}`}
                            target="_blank"
                            title="View Public Page"
                            className="p-1.5 rounded-lg admin-muted hover:admin-ink hover:admin-soft transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/case-studies/${item.id}/edit`}
                          title="Edit Record"
                          className="p-1.5 rounded-lg admin-muted hover:admin-accent hover:admin-tint transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(item.id)}
                          title="Delete Record"
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
                    No case studies match your query. Click &ldquo;Create Case
                    Study&rdquo; to add one.
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
        title="Delete Case Study"
        itemName={itemToDelete?.title || "this case study"}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
