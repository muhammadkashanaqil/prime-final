"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { PageIntro, PageCTA, EmptyState } from "@/components/marketing/PageKit";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
export default function FAQDirectory({ initialFaqs }: { initialFaqs: any[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = Array.from(
    new Set(initialFaqs.map((faq) => faq.category).filter(Boolean)),
  );
  const faqs = initialFaqs.filter(
    (faq) =>
      (category === "All" || faq.category === category) &&
      `${faq.question} ${faq.answer}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="pa-page">
      <div className="pa-container">
        <PageIntro
          eyebrow="PRIME / QUESTIONS & ANSWERS"
          title={
            <>
              Clarity
              <br />
              <em>comes first.</em>
            </>
          }
          description="A few useful answers about the work we do, the way we work, and what to expect along the way."
        />
        <div className="pa-faq-layout">
          <aside className="pa-faq-sidebar">
            <div
              className="pa-filters"
              role="group"
              aria-label="Filter questions by topic"
            >
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={cat === category}
                >
                  {cat === "All" ? "All questions" : cat}
                </button>
              ))}
            </div>
            <p>Have something else in mind?</p>
            <Link href="/contact" className="pa-text-link">
              Ask us directly <ArrowUpRight size={16} />
            </Link>
          </aside>
          <div>
            <label className="pa-search" style={{ width: "100%" }}>
              <Search size={18} />
              <span className="sr-only">Search questions</span>
              <input
                type="search"
                placeholder="What would you like to know?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <p className="pa-result-count" role="status">
              {faqs.length} {faqs.length === 1 ? "answer" : "answers"}
            </p>
            {faqs.length ? (
              <div className="pa-faq-list">
                {faqs.map((faq) => (
                  <details key={faq.id}>
                    <summary>
                      {faq.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <div className="pa-faq-answer">
                      <RichTextRenderer content={faq.answer} />
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Let’s answer that together."
                description={
                  initialFaqs.length
                    ? "Try a different search or get in touch with your question."
                    : "Our team can help with questions about your project."
                }
                onReset={
                  initialFaqs.length
                    ? () => {
                        setCategory("All");
                        setQuery("");
                      }
                    : undefined
                }
              />
            )}
          </div>
        </div>
        <PageCTA title="Your question could be the start of something." />
      </div>
    </div>
  );
}
