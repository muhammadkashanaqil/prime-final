"use client";

import { useMemo, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  PageIntro,
  PageCTA,
  EmptyState,
  PostCard,
  CaseCard,
  CoverArt,
} from "./PageKit";

export default function ContentDirectory({
  items,
  kind,
}: {
  items: any[];
  kind: "posts" | "work";
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const posts = kind === "posts";
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .flatMap((item) =>
              posts ? item.categoriesList || [] : [item.industry],
            )
            .filter(Boolean),
        ),
      ) as string[],
    [items, posts],
  );
  const filtered = items.filter(
    (item) =>
      (category === "All" ||
        (posts
          ? item.categoriesList?.includes(category)
          : item.industry === category)) &&
      [
        item.title,
        item.excerpt,
        item.clientName,
        ...(item.categoriesList || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const featured =
    posts && category === "All" && !query.trim()
      ? filtered.find((item) => item.featured) || filtered[0]
      : null;
  const rest = featured
    ? filtered.filter((item) => item.id !== featured.id)
    : filtered;
  const reset = () => {
    setCategory("All");
    setQuery("");
  };
  return (
    <div className="pa-page">
      <div className="pa-container">
        <PageIntro
          eyebrow={posts ? "PRIME / INSIGHTS" : "PRIME / SELECTED WORK"}
          title={
            posts ? (
              <>
                Ideas for a more
                <br />
                <em>connected business.</em>
              </>
            ) : (
              <>
                Good systems.
                <br />
                <em>Real-world impact.</em>
              </>
            )
          }
          description={
            posts
              ? "Practical perspectives on AI, automation, and the engineering behind better operations."
              : "A closer look at the challenges, decisions, and systems behind our work."
          }
        />
        <div className="pa-directory-tools">
          <div
            className="pa-filters"
            role="group"
            aria-label={posts ? "Filter by topic" : "Filter by industry"}
          >
            {["All", ...categories].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {cat === "All"
                  ? posts
                    ? "All insights"
                    : "All projects"
                  : cat}
              </button>
            ))}
          </div>
          <label className="pa-search">
            <Search size={17} />
            <span className="sr-only">
              {posts ? "Search insights" : "Search projects"}
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder={posts ? "Find an article" : "Find a project"}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>
        <p className="pa-result-count" role="status">
          {filtered.length}{" "}
          {posts
            ? filtered.length === 1
              ? "article"
              : "articles"
            : filtered.length === 1
              ? "project"
              : "projects"}
        </p>
        {featured && (
          <article className="pa-featured">
            <Link
              href={`/insights/${featured.slug}`}
              className="pa-featured-image"
            >
              <CoverArt
                src={featured.coverImageUrl}
                alt={featured.coverImageAlt || featured.title}
                label="FROM THE JOURNAL"
                priority
              />
            </Link>
            <div className="pa-featured-copy">
              <span className="pa-kicker">
                {featured.featured ? "EDITOR’S PICK" : "LATEST PERSPECTIVE"}
              </span>
              <h2>
                <Link href={`/insights/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="pa-card-meta">
                <span>{featured.categoriesList?.[0] || "Insight"}</span>
                {featured.readingTime && <span>{featured.readingTime}</span>}
              </div>
              <Link
                href={`/insights/${featured.slug}`}
                className="pa-text-link"
              >
                Read the perspective <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        )}
        {rest.length > 0 && (
          <div className={posts ? "pa-card-grid" : "pa-work-grid"}>
            {rest.map((item, index) =>
              posts ? (
                <PostCard
                  key={item.id || item.slug}
                  post={item}
                  index={index}
                />
              ) : (
                <CaseCard
                  key={item.id || item.slug}
                  study={item}
                  index={index}
                />
              ),
            )}
          </div>
        )}
        {!filtered.length && (
          <EmptyState
            title={
              items.length
                ? "Nothing matches just yet."
                : posts
                  ? "New perspectives are on the way."
                  : "More work to share soon."
            }
            description={
              items.length
                ? "Try another search or explore all categories."
                : posts
                  ? "In the meantime, let’s talk about what you’re working on."
                  : "Have a similar challenge? We’d love to hear about it."
            }
            onReset={items.length ? reset : undefined}
          />
        )}
        <PageCTA />
      </div>
    </div>
  );
}
