import Link from "next/link";
export default function Services() {
  return (
    <section
      className="services light-section section"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / WHAT WE BUILD</span>
            <h2 id="services-title" data-reveal="">
              Your ambition.
              <br />
              Our engineering<span className="accent">.</span>
            </h2>
          </div>
          <div>
            <p data-reveal="">
              From the first workflow
              <br />
              to your entire operation.
              <br />
              Built to go further.
            </p>
            <a
              href="/services"
              className="text-link"
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              All capabilities{" "}
              <svg className="icon" style={{ width: 14, height: 14 }}>
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>
        </div>
        <div className="services-list">
          <details className="service" open data-reveal="">
            <summary>
              <span className="service-number">(01)</span>
              <h3>AI agents &amp; chatbots</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art agent-art" aria-hidden="true">
                <div className="agent-eye"></div>
                <div className="agent-eye"></div>
                <span></span>
                <i className="agent-spark">✳</i>
              </div>
              <div>
                <h4>Turn conversations into completed tasks.</h4>
                <p>
                  Conversational agents that answer customer questions, qualify
                  leads, and take action across your business tools. Grounded in
                  your knowledge, with clear boundaries and human handoffs.
                </p>
                <div className="service-tags">
                  <span>Knowledge-grounded AI</span>
                  <span>Lead qualification</span>
                  <span>Human handoff</span>
                </div>
                <Link
                  className="text-link"
                  href="/services/ai-chatbots-virtual-agents"
                >
                  Let’s build your agent{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
          <details className="service" data-reveal="">
            <summary>
              <span className="service-number">(02)</span>
              <h3>Workflow automation</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art flow-art" aria-hidden="true">
                <span>01</span>
                <i></i>
                <span>02</span>
                <i></i>
                <span>✓</span>
              </div>
              <div>
                <h4>Connect the work between your tools.</h4>
                <p>
                  Replace repetitive handoffs with connected workflows. We use
                  n8n and custom integrations to connect triggers, decisions,
                  and actions around the way your team already works.
                </p>
                <div className="service-tags">
                  <span>n8n workflows</span>
                  <span>Business operations</span>
                  <span>Exception handling</span>
                </div>
                <Link
                  className="text-link"
                  href="/services/workflow-automation"
                >
                  Find your next automation{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
          <details className="service" data-reveal="">
            <summary>
              <span className="service-number">(03)</span>
              <h3>Data pipeline engineering</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art pipeline-art" aria-hidden="true">
                <svg className="icon">
                  <use href="#i-data"></use>
                </svg>
              </div>
              <div>
                <h4>Better decisions start with dependable data.</h4>
                <p>
                  Connect scattered sources into a resilient data foundation.
                  Ingestion, transformation, validation, and monitoring bring
                  your operational information together for analytics and AI.
                </p>
                <div className="service-tags">
                  <span>ETL pipelines</span>
                  <span>Data quality</span>
                  <span>Operational visibility</span>
                </div>
                <Link
                  className="text-link"
                  href="/services/data-pipeline-engineering"
                >
                  Connect your data{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
          <details className="service" data-reveal="">
            <summary>
              <span className="service-number">(04)</span>
              <h3>Custom AI development</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art custom-art" aria-hidden="true">
                {"{"}
                <span>✳</span>
                {"}"}
              </div>
              <div>
                <h4>Built for the problem you actually have.</h4>
                <p>
                  AI systems designed around your workflows, knowledge, and
                  business rules. We combine the right models with practical
                  safeguards and the integrations your operation needs.
                </p>
                <div className="service-tags">
                  <span>Custom agents</span>
                  <span>Retrieval systems</span>
                  <span>Business logic</span>
                </div>
                <Link className="text-link" href="/services/custom-ai-models">
                  Explore your idea{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
          <details className="service" data-reveal="">
            <summary>
              <span className="service-number">(05)</span>
              <h3>AI system integration</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art integration-art" aria-hidden="true">
                <span>+</span>
                <span>+</span>
                <span>+</span>
              </div>
              <div>
                <h4>Your tools. Finally on the same team.</h4>
                <p>
                  Bring AI into the software you already use. Connect your CRM,
                  email, calendar, support, and reporting systems into one
                  useful operational layer.
                </p>
                <div className="service-tags">
                  <span>APIs &amp; webhooks</span>
                  <span>Connected tools</span>
                  <span>Existing software</span>
                </div>
                <Link
                  className="text-link"
                  href="/services/ai-system-integration"
                >
                  Connect your systems{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
          <details className="service" data-reveal="">
            <summary>
              <span className="service-number">(06)</span>
              <h3>AI audit &amp; optimization</h3>
              <span className="service-toggle">+</span>
            </summary>
            <div className="service-body">
              <div className="service-art audit-art" aria-hidden="true">
                <svg className="icon">
                  <use href="#i-arrow"></use>
                </svg>
              </div>
              <div>
                <h4>Start with the work worth improving.</h4>
                <p>
                  Map your workflows, identify bottlenecks, and build a
                  practical roadmap. For existing systems, we review reliability
                  and opportunities to reduce friction before deciding what to
                  change.
                </p>
                <div className="service-tags">
                  <span>Workflow mapping</span>
                  <span>Practical roadmap</span>
                  <span>Optimization</span>
                </div>
                <Link
                  className="text-link"
                  href="/services/ai-audit-optimization"
                >
                  Book your free audit{" "}
                  <svg className="icon">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
