"use client";

import { useEffect, useState } from "react";

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [hasFiltered, setHasFiltered] = useState(false);
  function chooseFilter(value: string) {
    setHasFiltered(true);
    setFilter(value);
  }
  useEffect(() => {
    window.dispatchEvent(new Event("prime:layoutchange"));
  }, [filter]);
  return (
    <section
      className="work section wrap"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / SELECTED SYSTEMS</span>
          <h2 id="work-title" data-reveal="">
            Good engineering.
            <br />
            <span className="muted-heading">Real-world impact.</span>
          </h2>
        </div>
        <div>
          <p data-reveal="">
            Different challenges.
            <br />
            One connected mindset.
            <br />
            <span className="small-note">
              Explore the architecture behind the work.
            </span>
          </p>
          <a
            href="/case-studies"
            className="text-link"
            style={{
              marginTop: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
            }}
          >
            All case studies{" "}
            <svg className="icon" style={{ width: 14, height: 14 }}>
              <use href="#i-arrow" />
            </svg>
          </a>
        </div>
      </div>
      <div className="work-filters" role="group" aria-label="Filter systems">
        <button
          type="button"
          className={filter === "all" ? "active" : ""}
          data-filter="all"
          aria-pressed={filter === "all"}
          onClick={() => chooseFilter("all")}
        >
          All systems <span>03</span>
        </button>
        <button
          type="button"
          data-filter="agents"
          aria-pressed={filter === "agents"}
          className={filter === "agents" ? "active" : ""}
          onClick={() => chooseFilter("agents")}
        >
          AI agents
        </button>
        <button
          type="button"
          data-filter="automation"
          aria-pressed={filter === "automation"}
          className={filter === "automation" ? "active" : ""}
          onClick={() => chooseFilter("automation")}
        >
          Automation
        </button>
        <button
          type="button"
          data-filter="data"
          aria-pressed={filter === "data"}
          className={filter === "data" ? "active" : ""}
          onClick={() => chooseFilter("data")}
        >
          Data pipelines
        </button>
      </div>
      <p
        className="sr-only"
        id="filter-status"
        aria-live="polite"
      >{`Showing ${filter === "all" ? "3 systems" : "1 system"}.`}</p>
      <div className={`project-grid${filter !== "all" ? " filtered" : ""}`}>
        <article
          className={
            "project project-support" + (hasFiltered ? " is-visible" : "")
          }
          data-category="agents"
          data-reveal=""
          hidden={filter !== "all" && filter !== "agents"}
        >
          <button
            className="project-visual support-visual"
            type="button"
            data-project="support"
            aria-label="Explore the OmniRetail Global support system"
          >
            <span className="project-topline">
              OMNIRETAIL GLOBAL <span>01 / AI AGENTS</span>
            </span>
            <div className="support-orbit" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <div className="support-core">
                <svg className="icon">
                  <use href="#i-spark"></use>
                </svg>
              </div>
            </div>
            <div className="chat-bubble customer-bubble">
              Where’s my order? <span>09:41</span>
            </div>
            <div className="chat-bubble agent-bubble">
              <span className="mini-label">
                <i></i> PRIME / SUPPORT AGENT
              </span>
              Your order is on its way.
              <br />
              Here’s the latest update.
              <div className="chat-source">
                <svg className="icon">
                  <use href="#i-check"></use>
                </svg>{" "}
                Connected to order knowledge
              </div>
            </div>
            <div className="project-visual-bottom">
              <span>
                SUPPORT, WITHOUT
                <br />
                THE BOTTLENECK.
              </span>
              <span className="project-arrow">
                <svg className="icon">
                  <use href="#i-arrow"></use>
                </svg>
              </span>
            </div>
            <span className="illustration-label">ILLUSTRATIVE SYSTEM VIEW</span>
          </button>
          <div className="project-caption">
            <div>
              <h3>
                <button type="button" data-project="support">
                  Customer support. Without the bottleneck.
                </button>
              </h3>
              <p>OmniRetail Global · E-commerce &amp; retail</p>
            </div>
            <span className="tag">AI agents</span>
          </div>
        </article>
        <article
          className={
            "project project-documents" + (hasFiltered ? " is-visible" : "")
          }
          data-category="automation"
          data-reveal=""
          hidden={filter !== "all" && filter !== "automation"}
        >
          <button
            className="project-visual document-visual"
            type="button"
            data-project="documents"
            aria-label="Explore the Apex FinServe document workflow"
          >
            <span className="project-topline">
              APEX FINSERVE <span>02 / AUTOMATION</span>
            </span>
            <div className="document-stack" aria-hidden="true">
              <div className="paper paper-back"></div>
              <div className="paper">
                <div className="paper-heading">
                  INVOICE <span>↗</span>
                </div>
                <div className="paper-lines">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="paper-rule"></div>
                <div className="paper-data">
                  <span>EXTRACT</span>
                  <span>VALIDATE</span>
                  <span>RECONCILE</span>
                </div>
                <div className="scan-line"></div>
              </div>
              <div className="verified-badge">
                <svg className="icon">
                  <use href="#i-check"></use>
                </svg>{" "}
                Ready for your ledger
              </div>
            </div>
            <div className="project-visual-bottom">
              <span>
                LESS PAPERWORK.
                <br />
                MORE POSSIBILITY.
              </span>
              <span className="project-arrow">
                <svg className="icon">
                  <use href="#i-arrow"></use>
                </svg>
              </span>
            </div>
            <span className="illustration-label">ILLUSTRATIVE SYSTEM VIEW</span>
          </button>
          <div className="project-caption">
            <div>
              <h3>
                <button type="button" data-project="documents">
                  From paperwork to possibility.
                </button>
              </h3>
              <p>Apex FinServe · Finance &amp; operations</p>
            </div>
            <span className="tag">Workflows</span>
          </div>
        </article>
        <article
          className={
            "project project-data" + (hasFiltered ? " is-visible" : "")
          }
          data-category="data"
          data-reveal=""
          hidden={filter !== "all" && filter !== "data"}
        >
          <button
            className="project-visual data-visual"
            type="button"
            data-project="pipelines"
            aria-label="Explore the Nexus Logistics data pipeline"
          >
            <span className="project-topline">
              NEXUS LOGISTICS PARTNERS <span>03 / DATA ENGINEERING</span>
            </span>
            <div className="data-copy">
              <span>
                EVERY SIGNAL.
                <br />
                ONE CLEAR PICTURE.
              </span>
              <p>
                From operational events
                <br />
                to decisions that move you forward.
              </p>
            </div>
            <div className="data-dashboard" aria-hidden="true">
              <div className="dashboard-top">
                <span>
                  <i></i> Operations intelligence
                </span>
                <span>Pipeline overview ↗</span>
              </div>
              <div className="pipeline-nodes">
                <span>
                  <svg className="icon">
                    <use href="#i-data"></use>
                  </svg>{" "}
                  Ingest
                </span>
                <i></i>
                <span>
                  <svg className="icon">
                    <use href="#i-flow"></use>
                  </svg>{" "}
                  Transform
                </span>
                <i></i>
                <span>
                  <svg className="icon">
                    <use href="#i-spark"></use>
                  </svg>{" "}
                  Understand
                </span>
              </div>
              <div className="data-chart">
                <span>CONNECTED OPERATIONS</span>
                <svg viewBox="0 0 480 140">
                  <path
                    className="chart-grid"
                    d="M0 20h480M0 60h480M0 100h480"
                  ></path>
                  <path
                    className="chart-area"
                    d="M0 126 25 117 49 123 76 99 108 107 138 80 169 86 205 55 241 65 278 39 310 48 347 20 384 28 425 9 480 3V140H0Z"
                  ></path>
                  <path
                    className="chart-line"
                    d="M0 126 25 117 49 123 76 99 108 107 138 80 169 86 205 55 241 65 278 39 310 48 347 20 384 28 425 9 480 3"
                  ></path>
                </svg>
                <div className="chart-bottom">
                  <span>Events → context → action</span>
                  <span>ILLUSTRATIVE VIEW</span>
                </div>
              </div>
            </div>
            <span className="project-arrow">
              <svg className="icon">
                <use href="#i-arrow"></use>
              </svg>
            </span>
          </button>
          <div className="project-caption">
            <div>
              <h3>
                <button type="button" data-project="pipelines">
                  A clearer view of every move.
                </button>
              </h3>
              <p>Nexus Logistics Partners · Logistics &amp; supply chain</p>
            </div>
            <span className="tag">Data pipelines</span>
          </div>
        </article>
      </div>
    </section>
  );
}
