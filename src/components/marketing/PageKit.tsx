import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="pa-intro">
      <div className="pa-kicker">
        <span />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <div className="pa-intro-bottom">
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
}

export function PageCTA({
  title = "Make room for better work.",
  description = "Tell us where things get complicated. We’ll help you find a practical place to start.",
  href = "/contact",
  label = "Start a conversation",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="pa-cta">
      <div>
        <span className="pa-kicker">YOUR NEXT CHAPTER</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="pa-button pa-button-light" href={href}>
        {label}
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}

export function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset?: () => void;
}) {
  return (
    <div className="pa-empty">
      <span className="pa-kicker">A LITTLE SPACE FOR WHAT’S NEXT</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {onReset ? (
        <button className="pa-text-link" onClick={onReset}>
          Clear filters <ArrowRight size={16} />
        </button>
      ) : (
        <Link className="pa-text-link" href="/contact">
          Talk to our team <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

export function CoverArt({
  src,
  alt = "",
  label = "PRIME / FIELD NOTES",
  variant = 0,
  priority = false,
  sizes = "(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 620px",
}: {
  src?: string | null;
  alt?: string;
  label?: string;
  variant?: number;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`pa-cover pa-cover-${variant % 3}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      ) : (
        <div className="pa-cover-drawing" aria-hidden="true">
          <span className="pa-cover-label">{label}</span>
          <svg viewBox="0 0 600 360" fill="none">
            <path d="M0 180H600M300 0V360" />
            <circle cx="300" cy="180" r="120" />
            <circle cx="300" cy="180" r="80" />
            <ellipse
              cx="300"
              cy="180"
              rx="160"
              ry="55"
              transform="rotate(-30 300 180)"
            />
            <path d="M80 80h90v90M430 190v90h90" />
            <circle cx="300" cy="60" r="6" className="pa-drawing-node" />
            <circle cx="420" cy="180" r="6" className="pa-drawing-node" />
            <circle cx="180" cy="180" r="6" className="pa-drawing-node" />
          </svg>
          <span className="pa-cover-index">SYSTEMS, CONNECTED. ↗</span>
        </div>
      )}
    </div>
  );
}

export function PostCard({ post, index = 0 }: { post: any; index?: number }) {
  return (
    <article className="pa-post-card">
      <Link href={`/insights/${post.slug}`} className="pa-card-link">
        <CoverArt
          src={post.coverImageUrl}
          alt={post.coverImageAlt || post.title}
          label={post.categoriesList?.[0] || "FIELD NOTES"}
          variant={index}
        />
        <div className="pa-card-meta">
          <span>{post.categoriesList?.[0] || "Perspective"}</span>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
        <h3>
          {post.title}
          <ArrowUpRight size={22} />
        </h3>
        <p>{post.excerpt}</p>
        <span className="pa-text-link">
          Read the article <ArrowRight size={16} />
        </span>
      </Link>
    </article>
  );
}

export function CaseCard({ study, index = 0 }: { study: any; index?: number }) {
  return (
    <article className="pa-case-card">
      <Link href={`/case-studies/${study.slug}`} className="pa-card-link">
        <CoverArt
          src={study.heroImageUrl}
          alt={study.heroImageAlt || study.title}
          label={study.industry || "SELECTED WORK"}
          variant={index}
        />
        <div className="pa-card-meta">
          <span>{study.clientName || study.industry}</span>
          <span>
            {study.industry && study.clientName ? study.industry : "Case study"}
          </span>
        </div>
        <h3>
          {study.title}
          <ArrowUpRight size={22} />
        </h3>
        <p>{study.excerpt}</p>
        {study.featuredResult && (
          <div className="pa-case-result">{study.featuredResult}</div>
        )}
        <span className="pa-text-link">
          Explore the project <ArrowRight size={16} />
        </span>
      </Link>
    </article>
  );
}
