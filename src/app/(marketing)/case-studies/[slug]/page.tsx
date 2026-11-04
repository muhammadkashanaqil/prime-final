import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  getCaseStudyBySlug,
  getPublishedCaseStudies,
} from "@/lib/cms/case-studies";
import { SERVICE_COPY } from "@/components/marketing/service-copy";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
import { PageIntro, PageCTA, CaseCard } from "@/components/marketing/PageKit";
interface Props {
  params: Promise<{ slug: string }>;
}
export const revalidate = 60;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: cs.seoTitle || `${cs.title} | Case Study`,
    description: cs.seoDescription || cs.excerpt,
    robots: cs.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      images:
        cs.ogImageUrl || cs.heroImageUrl
          ? [{ url: cs.ogImageUrl || cs.heroImageUrl! }]
          : undefined,
    },
  };
}
export default async function CaseStudyDetail({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();
  const related = (await getPublishedCaseStudies({ limit: 4 }))
    .filter((item) => item.slug !== slug)
    .slice(0, 2);
  const narrative = [
    { id: "challenge", title: "The challenge", body: study.challenge },
    { id: "solution", title: "The solution", body: study.solution },
    {
      id: "implementation",
      title: "How it came together",
      body: study.implementation,
    },
    { id: "results", title: "The results", body: study.results },
  ].filter((section) => section.body);
  return (
    <div className="pa-page">
      <div className="pa-container">
        <Breadcrumbs
          items={[
            { label: "Our work", href: "/case-studies" },
            { label: study.title },
          ]}
        />
        <PageIntro
          eyebrow={`PRIME / ${study.industry}`}
          title={study.title}
          description={study.excerpt}
        />
        {study.heroImageUrl && (
          <figure className="pa-article-cover">
            <Image
              src={study.heroImageUrl}
              alt={study.heroImageAlt || study.title}
              fill
              sizes="(max-width: 800px) 100vw, 1168px"
              priority
            />
          </figure>
        )}
        {study.metricsList.length > 0 && (
          <div className="pa-metrics" aria-label="Project results">
            {study.metricsList.map((metric: any, i: number) => (
              <div className="pa-metric" key={i}>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
                {metric.note && <small>{metric.note}</small>}
              </div>
            ))}
          </div>
        )}
        <div className="pa-article-layout">
          <aside className="pa-article-aside">
            <span className="pa-kicker">PROJECT NOTES</span>
            <dl>
              {study.clientName && (
                <div>
                  <dt>Client</dt>
                  <dd>{study.clientName}</dd>
                </div>
              )}
              <div>
                <dt>Industry</dt>
                <dd>{study.industry}</dd>
              </div>
              {study.servicesList.length > 0 && (
                <div>
                  <dt>Services</dt>
                  <dd>
                    {study.servicesList.map((service: string) => (
                      <div key={service}>
                        {SERVICE_COPY[service] ? (
                          <Link href={`/services/${service}`}>
                            {SERVICE_COPY[service].title} ↗
                          </Link>
                        ) : (
                          service
                        )}
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <nav aria-label="In this case study">
              {narrative.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <article className="pa-article-body">
            {narrative.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                <RichTextRenderer content={section.body} />
              </section>
            ))}
            {study.technologiesList.length > 0 && (
              <section>
                <span className="pa-kicker">TOOLS & TECHNOLOGIES</span>
                <div className="pa-tag-list">
                  {study.technologiesList.map((tool: string) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </section>
            )}
            {study.testimonialObj?.quote && (
              <blockquote className="pa-testimonial">
                <p>“{study.testimonialObj.quote}”</p>
                <footer>
                  {study.testimonialObj.name}
                  <br />
                  {[study.testimonialObj.role, study.testimonialObj.company]
                    .filter(Boolean)
                    .join(" · ")}
                </footer>
              </blockquote>
            )}
          </article>
        </div>
        {related.length > 0 && (
          <section className="pa-related">
            <div className="pa-section-heading">
              <h2>More connected thinking.</h2>
              <Link href="/case-studies" className="pa-text-link">
                All projects <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="pa-work-grid">
              {related.map((item, i) => (
                <CaseCard key={item.id} study={item} index={i} />
              ))}
            </div>
          </section>
        )}
        <PageCTA title="A similar challenge? Let’s talk." />
      </div>
    </div>
  );
}
