import Link from "next/link";
import prisma from "@/lib/db";
import {
  FolderKanban,
  FileText,
  HelpCircle,
  Users,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let publishedCaseStudiesCount = 0;
  let draftCaseStudiesCount = 0;
  let publishedPostsCount = 0;
  let draftPostsCount = 0;
  let publishedFaqsCount = 0;
  let draftFaqsCount = 0;
  let leadsCount = 0;
  let recentLeads: any[] = [];
  let statsUnavailable = false;

  try {
    const stats = await Promise.all([
      prisma.caseStudy.count({ where: { status: "PUBLISHED" } }),
      prisma.caseStudy.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.fAQ.count({ where: { status: "PUBLISHED" } }),
      prisma.fAQ.count({ where: { status: "DRAFT" } }),
      prisma.lead.count(),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

    publishedCaseStudiesCount = stats[0];
    draftCaseStudiesCount = stats[1];
    publishedPostsCount = stats[2];
    draftPostsCount = stats[3];
    publishedFaqsCount = stats[4];
    draftFaqsCount = stats[5];
    leadsCount = stats[6];
    recentLeads = stats[7];
  } catch (err) {
    statsUnavailable = true;
    console.error("Dashboard stats query error:", err);
  }

  const statCards = [
    {
      title: "Case Studies",
      published: publishedCaseStudiesCount,
      drafts: draftCaseStudiesCount,
      icon: FolderKanban,
      href: "/admin/case-studies",
      newHref: "/admin/case-studies/new",
    },
    {
      title: "Insights & posts",
      published: publishedPostsCount,
      drafts: draftPostsCount,
      icon: FileText,
      href: "/admin/posts",
      newHref: "/admin/posts/new",
    },
    {
      title: "FAQs",
      published: publishedFaqsCount,
      drafts: draftFaqsCount,
      icon: HelpCircle,
      href: "/admin/faqs",
      newHref: "/admin/faqs/new",
    },
    {
      title: "Leads & inquiries",
      published: leadsCount,
      drafts: 0,
      icon: Users,
      href: "/admin/leads",
      newHref: null,
    },
  ];

  return (
    <div>
      <div className="admin-overview-heading">
        <div>
          <span className="admin-eyebrow">PRIME / OVERVIEW</span>
          <h1>Keep good things moving.</h1>
          <p>
            Manage your content, share your work, and follow up on new
            conversations.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="admin-action admin-action-primary"
        >
          <Plus size={16} /> Create a post
        </Link>
      </div>
      {statsUnavailable && (
        <div className="admin-notice" role="alert">
          We couldn’t load your workspace data. Check your connection and
          refresh the page.
        </div>
      )}
      <div className="admin-stats">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <section className="admin-stat" key={card.href}>
              <div className="admin-stat-top">
                <span>{card.title}</span>
                <Icon size={18} />
              </div>
              <strong>{statsUnavailable ? "—" : card.published}</strong>
              <p>
                {card.newHref
                  ? `${card.drafts} drafts · Published content above`
                  : "Total received inquiries"}
              </p>
              <div className="admin-stat-bottom">
                <Link href={card.href}>
                  Manage <span aria-hidden="true">↗</span>
                </Link>
                {card.newHref && (
                  <Link
                    href={card.newHref}
                    aria-label={`Add ${card.title.toLowerCase()}`}
                  >
                    <Plus size={16} />
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Recent conversations</h2>
            <Link href="/admin/leads">View all leads ↗</Link>
          </div>
          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Status</th>
                    <th scope="col">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <Link href="/admin/leads" style={{ fontWeight: 500 }}>
                          {lead.fullName}
                        </Link>
                        <p>{lead.workEmail}</p>
                      </td>
                      <td>{lead.company || "—"}</td>
                      <td>{lead.status?.toLowerCase().replace(/_/g, " ")}</td>
                      <td>
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-empty">
              <Users size={28} />
              <h3>
                {statsUnavailable
                  ? "Data is temporarily unavailable."
                  : "Room for your next conversation."}
              </h3>
              <p>
                {statsUnavailable
                  ? "Your saved inquiries will appear once the connection is restored."
                  : "New contact and audit requests appear here when visitors send them through your website."}
              </p>
            </div>
          )}
        </section>
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Make your next update</h2>
          </div>
          <div className="admin-quicklinks">
            <Link href="/admin/posts/new">
              <FileText size={19} />
              <div>
                <strong>Share a perspective</strong>
                <span>Write and publish an insight.</span>
              </div>
            </Link>
            <Link href="/admin/case-studies/new">
              <FolderKanban size={19} />
              <div>
                <strong>Tell a project’s story</strong>
                <span>Add a case study and its results.</span>
              </div>
            </Link>
            <Link href="/admin/faqs/new">
              <HelpCircle size={19} />
              <div>
                <strong>Answer a good question</strong>
                <span>Make your knowledge useful.</span>
              </div>
            </Link>
            <Link href="/admin/settings">
              <Sparkles size={19} />
              <div>
                <strong>Keep the details current</strong>
                <span>Contact details, booking, and chat.</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
