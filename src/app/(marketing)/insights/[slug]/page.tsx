import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/cms/posts";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
import { PageIntro, PageCTA, PostCard } from "@/components/marketing/PageKit";
interface Props {
  params: Promise<{ slug: string }>;
}
export const revalidate = 60;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle || `${post.title} | Insights`,
    description: post.seoDescription || post.excerpt,
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images:
        post.ogImageUrl || post.coverImageUrl
          ? [{ url: post.ogImageUrl || post.coverImageUrl! }]
          : undefined,
    },
  };
}
export default async function PostDetail({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = (await getPublishedPosts({ limit: 4 }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl || undefined,
    datePublished: post.publishedAt?.toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Prime Automation" },
  };
  return (
    <div className="pa-page">
      <div className="pa-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Breadcrumbs
          items={[
            { label: "Insights", href: "/insights" },
            { label: post.title },
          ]}
        />
        <div className="pa-article-head">
          <PageIntro
            eyebrow={post.categoriesList[0] || "PRIME / FIELD NOTES"}
            title={post.title}
            description={post.excerpt}
          />
          <div className="pa-article-meta">
            <span>By {post.author}</span>
            {date && (
              <time dateTime={post.publishedAt?.toISOString()}>{date}</time>
            )}
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </div>
        {post.coverImageUrl && (
          <figure className="pa-article-cover">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              sizes="(max-width: 800px) 100vw, 1168px"
              priority
            />
          </figure>
        )}
        <div className="pa-article-layout">
          <aside className="pa-article-aside">
            <span className="pa-kicker">IN THIS PERSPECTIVE</span>
            <div className="pa-tag-list">
              {post.categoriesList.map((category: string) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <Link
              href="/insights"
              className="pa-text-link"
              style={{ marginTop: 24 }}
            >
              ← All insights
            </Link>
          </aside>
          <article className="pa-article-body">
            <RichTextRenderer content={post.bodyJson || post.body} />
          </article>
        </div>
        {related.length > 0 && (
          <section className="pa-related">
            <div className="pa-section-heading">
              <h2>Keep exploring.</h2>
              <Link href="/insights" className="pa-text-link">
                All perspectives <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="pa-card-grid">
              {related.map((item, i) => (
                <PostCard key={item.id} post={item} index={i} />
              ))}
            </div>
          </section>
        )}
        <PageCTA title="Turn a good idea into a working system." />
      </div>
    </div>
  );
}
