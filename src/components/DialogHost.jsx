"use client";
import Link from "next/link";

import { Fragment, useEffect, useRef } from "react";
import { useSite } from "@/components/SiteProvider";
import { projects, insights } from "@/lib/content";
import AuditForm from "@/components/ui/AuditForm";

function LineBreaks({ text }) {
  return text.split(/<br\s*\/?\s*>/i).map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function NativeDialog({ open, onClose, children, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (open && !node.open) {
      node.showModal();
      node.scrollTop = 0;
    } else if (!open && node.open) node.close();
  }, [open]);
  return (
    <dialog
      {...props}
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (open) onClose();
      }}
      onClick={(event) => {
        if (event.target !== ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      {children}
    </dialog>
  );
}

function ProjectDetails({ project }) {
  return (
    <>
      <span className="eyebrow">{project.category}</span>
      <h2 id="dialog-title">
        <LineBreaks text={project.title} />
      </h2>
      <p className="dialog-intro">{project.introduction}</p>
      <div className="dialog-tags">
        <span>{project.client}</span>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <h3>The opportunity</h3>
      <p>{project.challenge}</p>
      <div className="architecture-steps">
        {project.steps.map(([number, title, copy]) => (
          <div key={number}>
            <span>{number}</span>
            <h4>{title}</h4>
            <p>{copy}</p>
          </div>
        ))}
      </div>
      <h3>The connected approach</h3>
      <p>{project.approach}</p>
      <a
        className="button"
        href="/contact"
        data-audit=""
        data-service={project.service}
      >
        Build a system like this{" "}
        <svg className="icon">
          <use href="#i-arrow" />
        </svg>
      </a>
      <p className="dialog-note">
        Project overview adapted from Prime Automation&apos;s existing
        portfolio. Interface graphics are illustrative architecture previews.
      </p>
    </>
  );
}

function InsightDetails({ article }) {
  return (
    <>
      <span className="eyebrow">{article.category}</span>
      <h2 id="dialog-title">
        <LineBreaks text={article.title} />
      </h2>
      <p className="dialog-intro">{article.introduction}</p>
      {/* Trusted, local editorial copy from lib/content.js; never external or user HTML. */}
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
      <a className="button" href="/contact" data-audit="">
        Find your next opportunity{" "}
        <svg className="icon">
          <use href="#i-arrow" />
        </svg>
      </a>
    </>
  );
}

export default function DialogHost({
  contactEmail = "info@primeautomationpl.com",
}) {
  const { dialog, closeDialog } = useSite();
  const project = dialog?.kind === "project" ? projects[dialog.key] : null;
  const article = dialog?.kind === "insight" ? insights[dialog.key] : null;
  const links = [
    ["home", "Home", "/"],
    ["work", "Our work", "/case-studies"],
    ["services", "Services", "/services"],
    ["insights", "Insights", "/insights"],
    ["about", "About Prime", "/about"],
    ["faq", "FAQs", "/faq"],
    ["contact", "Let's talk ↗", "/contact"],
  ];
  return (
    <>
      <NativeDialog
        className="content-dialog"
        id="content-dialog"
        aria-labelledby="dialog-title"
        open={Boolean(project || article)}
        onClose={closeDialog}
      >
        <div className="dialog-bar">
          <Link href="/" className="dialog-wordmark" onClick={closeDialog}>
            PRIME<span>®</span>
          </Link>
          <button
            type="button"
            className="close-dialog"
            aria-label="Close details"
            onClick={closeDialog}
          >
            ×
          </button>
        </div>
        <div className="dialog-content" id="dialog-content">
          {project ? (
            <ProjectDetails project={project} />
          ) : article ? (
            <InsightDetails article={article} />
          ) : (
            <h2 className="sr-only" id="dialog-title">
              Details
            </h2>
          )}
        </div>
      </NativeDialog>

      <NativeDialog
        className="hero-menu-dialog"
        id="site-menu"
        aria-labelledby="site-menu-title"
        open={dialog?.kind === "menu"}
        onClose={closeDialog}
      >
        <div className="hero-menu-top">
          <span id="site-menu-title">EXPLORE PRIME</span>
          <button
            type="button"
            id="site-menu-close"
            aria-label="Close navigation"
            onClick={closeDialog}
          >
            ×
          </button>
        </div>
        <nav aria-label="Site navigation">
          {links.map(([id, label, url], index) => (
            <Link key={id} href={url || `/${id}`} onClick={closeDialog}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </Link>
          ))}
        </nav>
        <a className="hero-menu-email" href={`mailto:${contactEmail}`}>
          {contactEmail} ↗
        </a>
      </NativeDialog>

      <NativeDialog
        className="audit-dialog"
        id="audit-dialog"
        aria-labelledby="audit-title"
        open={dialog?.kind === "audit"}
        onClose={closeDialog}
      >
        <button
          type="button"
          className="close-dialog"
          aria-label="Close audit request"
          onClick={closeDialog}
        >
          ×
        </button>
        <div className="audit-intro">
          <span className="eyebrow">LET&apos;S TALK</span>
          <h2 id="audit-title">
            What&apos;s your
            <br />
            biggest bottleneck<span className="accent">?</span>
          </h2>
          <p>
            Start with a free 45-minute automation audit. Tell us a little about
            your business.
          </p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <AuditForm service={dialog?.service} open={dialog?.kind === "audit"} />
      </NativeDialog>
    </>
  );
}
