"use client";
import { useDialogFocus } from "@/components/admin/use-dialog-focus";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import {
  Search,
  Trash2,
  Mail,
  Phone,
  Building,
  Globe,
  Tag,
  Clock,
  Eye,
  X,
  MessageSquare,
} from "lucide-react";

export default function LeadsListClient({
  initialLeads,
}: {
  initialLeads: any[];
}) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeLeadModal, setActiveLeadModal] = useState<any | null>(null);
  const leadDialogRef = useDialogFocus(Boolean(activeLeadModal), () =>
    setActiveLeadModal(null),
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.workEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.company &&
          item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.primaryNeed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  const leadToDelete = leads.find((item) => item.id === deletingId);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)),
      );
      if (activeLeadModal && activeLeadModal.id === id) {
        setActiveLeadModal((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (e) {
      console.error(e);
      alert("Error updating status");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/leads?id=${deletingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete lead");

      setLeads((prev) => prev.filter((item) => item.id !== deletingId));
      if (activeLeadModal?.id === deletingId) setActiveLeadModal(null);
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
      <div>
        <h1 className="text-3xl font-semibold admin-ink tracking-tight">
          Captured Inbound Leads
        </h1>
        <p className="text-xs sm:text-sm admin-muted mt-1">
          Review consultation requests from /contact form and live chatbot
          inquiries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-lg p-4 border admin-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 admin-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
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
            <option value="ALL">All Statuses ({leads.length})</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-lg border admin-border overflow-hidden admin-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="admin-soft admin-muted border-b admin-border uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Lead Contact</th>
                <th className="py-3.5 px-4">Primary Need</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:admin-soft transition-colors"
                  >
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold admin-ink text-sm">
                        {lead.fullName}
                      </div>
                      <div className="text-[11px] admin-muted">
                        {lead.workEmail}
                      </div>
                      {lead.phone && (
                        <div className="text-[10px] admin-muted">
                          {lead.phone}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono admin-accent">
                      {lead.primaryNeed}
                    </td>

                    <td className="py-4 px-4 admin-ink">
                      {lead.company || "—"}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded admin-soft border admin-border admin-ink font-mono text-[10px]">
                        {lead.source}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        aria-label={`Status for ${lead.fullName}`}
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value)
                        }
                        className="admin-surface border admin-border rounded-lg px-2 py-1 text-[11px] font-bold admin-ink focus:outline-none focus:border-prime-accent"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 admin-muted text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveLeadModal(lead)}
                          className="p-1.5 rounded-lg admin-muted hover:admin-accent hover:admin-tint"
                          title="View Full Submission"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(lead.id)}
                          className="p-1.5 rounded-lg admin-muted hover:admin-danger hover:bg-rose-500/10"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center admin-muted">
                    No leads found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {activeLeadModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70  animate-in fade-in duration-150">
          <div
            ref={leadDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-details-title"
            className="admin-surface border admin-border rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 admin-shadow max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold admin-accent uppercase tracking-wider">
                  Lead Submission Details
                </span>
                <h3
                  id="lead-details-title"
                  className="text-2xl font-semibold admin-ink mt-1"
                >
                  {activeLeadModal.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLeadModal(null)}
                aria-label="Close lead details"
                className="p-1.5 rounded-lg admin-muted hover:admin-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg admin-soft border admin-border text-xs">
              <div className="space-y-1">
                <span className="admin-muted">Work Email:</span>
                <div className="font-semibold admin-ink flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 admin-accent" />
                  <a
                    href={`mailto:${activeLeadModal.workEmail}`}
                    className="underline"
                  >
                    {activeLeadModal.workEmail}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="admin-muted">Phone:</span>
                <div className="font-semibold admin-ink flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 admin-accent" />
                  <span>{activeLeadModal.phone || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="admin-muted">Company:</span>
                <div className="font-semibold admin-ink flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 admin-accent" />
                  <span>{activeLeadModal.company || "Not provided"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="admin-muted">Website:</span>
                <div className="font-semibold admin-ink flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 admin-accent" />
                  {activeLeadModal.website ? (
                    <a
                      href={activeLeadModal.website}
                      target="_blank"
                      className="underline truncate"
                    >
                      {activeLeadModal.website}
                    </a>
                  ) : (
                    <span>Not provided</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <span className="admin-muted">Primary Need:</span>
                <div className="font-semibold admin-accent">
                  {activeLeadModal.primaryNeed}
                </div>
              </div>

              <div className="space-y-1">
                <span className="admin-muted">Budget Range:</span>
                <div className="font-semibold admin-ink">
                  {activeLeadModal.budgetRange || "Not specified"}
                </div>
              </div>
            </div>

            {/* Message / Bottleneck */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold admin-ink uppercase tracking-wider">
                Submitted Message / Bottleneck
              </h4>
              <div className="p-4 rounded-lg admin-soft border admin-border text-xs admin-ink leading-relaxed whitespace-pre-wrap">
                {activeLeadModal.message}
              </div>
            </div>

            {/* UTM Campaign Attribution */}
            {(activeLeadModal.utmSource ||
              activeLeadModal.utmCampaign ||
              activeLeadModal.utmMedium) && (
              <div className="space-y-2 pt-2 border-t admin-border">
                <h4 className="text-xs font-bold admin-ink uppercase tracking-wider">
                  Marketing & UTM Attribution
                </h4>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  {activeLeadModal.utmSource && (
                    <span className="px-2 py-1 rounded admin-soft border admin-border admin-muted">
                      source:{" "}
                      <span className="admin-ink">
                        {activeLeadModal.utmSource}
                      </span>
                    </span>
                  )}
                  {activeLeadModal.utmMedium && (
                    <span className="px-2 py-1 rounded admin-soft border admin-border admin-muted">
                      medium:{" "}
                      <span className="admin-ink">
                        {activeLeadModal.utmMedium}
                      </span>
                    </span>
                  )}
                  {activeLeadModal.utmCampaign && (
                    <span className="px-2 py-1 rounded admin-soft border admin-border admin-muted">
                      campaign:{" "}
                      <span className="admin-ink">
                        {activeLeadModal.utmCampaign}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        title="Delete Captured Lead"
        itemName={leadToDelete?.fullName || "this lead"}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
