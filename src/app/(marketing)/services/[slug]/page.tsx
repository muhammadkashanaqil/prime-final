import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, SERVICES_LIST } from "@/lib/services-data";
import { getPublishedCaseStudies } from "@/lib/cms/case-studies";
import { getPublishedFAQs } from "@/lib/cms/faqs";
import { PageIntro, PageCTA, CaseCard } from "@/components/marketing/PageKit";
import { SERVICE_COPY } from "@/components/marketing/service-copy";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
interface Props {
  params: Promise<{ slug: string }>;
}
export const revalidate = 60;
export function generateStaticParams() {
  return SERVICES_LIST.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_COPY[slug];
  return service
    ? { title: service.title, description: service.description }
    : { title: "Service not found" };
}
export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  const copy = SERVICE_COPY[slug];
  if (!service || !copy) notFound();
  const [allStudies, allFaqs] = await Promise.all([
    getPublishedCaseStudies({ serviceSlug: slug }),
    getPublishedFAQs({ serviceSlug: slug }),
  ]);
  const studies = allStudies.slice(0, 2);
  const faqs = allFaqs.slice(0, 4);
  return (
    <div className="pa-page">
      <div className="pa-container">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: copy.title },
          ]}
        />
        <PageIntro
          eyebrow={`PRIME / ${copy.title}`}
          title={copy.headline}
          description={copy.description}
        >
          <Link href={`/contact?service=${slug}`} className="pa-button">
            Discuss your project <ArrowUpRight size={18} />
          </Link>
        </PageIntro>
        <section className="pa-section">
          <div className="pa-section-heading">
            <div>
              <span className="pa-kicker">WHERE IT HELPS</span>
              <h2>A practical place to start.</h2>
            </div>
            <p>
              Choose a focused use case, build the right connections, and expand
              from what you learn.
            </p>
          </div>
          <div className="pa-capabilities">
            {service.useCases.map((item, i) => (
              <article className="pa-capability" key={item.title}>
                <span className="pa-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="pa-section">
          <div className="pa-section-heading">
            <div>
              <span className="pa-kicker">THE BUILD</span>
              <h2>What goes into the system.</h2>
            </div>
          </div>
          <div className="pa-capabilities">
            {service.capabilities.map((item, i) => (
              <article className="pa-capability" key={item.title}>
                <span className="pa-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="pa-checklist">
                  {item.deliverables.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="pa-section pa-split">
          <div>
            <span className="pa-kicker">YOUR EXISTING TOOLKIT</span>
            <h2 style={{ marginTop: 20 }}>
              Connected to the way
              <br />
              you already work.
            </h2>
          </div>
          <div>
            <p>
              We confirm your systems, access requirements, and integration
              options during discovery. The right combination depends on your
              workflow.
            </p>
            <div className="pa-tag-list">
              {service.typicalIntegrations.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="pa-section">
          <div className="pa-section-heading">
            <div>
              <span className="pa-kicker">
                FROM FIRST CONVERSATION TO LAUNCH
              </span>
              <h2>A considered process.</h2>
            </div>
            <p className="pa-note">
              We agree on scope, milestones, and timing before development
              begins.
            </p>
          </div>
          <div className="pa-steps">
            {service.engagementModel.phases.map((phase) => (
              <div className="pa-step" key={phase.step}>
                <span className="pa-number">{phase.step}</span>
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {studies.length > 0 && (
          <section className="pa-section">
            <div className="pa-section-heading">
              <h2>See it in practice.</h2>
              <Link href="/case-studies" className="pa-text-link">
                All projects <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="pa-work-grid">
              {studies.map((study, i) => (
                <CaseCard key={study.id} study={study} index={i} />
              ))}
            </div>
          </section>
        )}
        {faqs.length > 0 && (
          <section className="pa-section pa-split">
            <div>
              <span className="pa-kicker">GOOD QUESTIONS</span>
              <h2 style={{ marginTop: 20 }}>A little more clarity.</h2>
            </div>
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
          </section>
        )}
        <section className="pa-section">
          <div className="pa-section-heading">
            <h2>Connected capabilities.</h2>
            <Link href="/services" className="pa-text-link">
              All services <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="pa-tag-list">
            {SERVICES_LIST.filter((item) => item.slug !== slug).map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`}>
                {SERVICE_COPY[item.slug].title} ↗
              </Link>
            ))}
          </div>
        </section>
        <PageCTA
          href={`/contact?service=${slug}`}
          title="Let’s make it work for you."
        />
      </div>
    </div>
  );
}
