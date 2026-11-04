export default function Process() {
  return (
    <section className="process section wrap" aria-labelledby="process-title">
      <div className="process-heading">
        <span className="eyebrow">04 / HOW WE GET THERE</span>
        <h2 id="process-title" data-reveal="">
          From “what if”
          <br />
          to <span className="accent">working.</span>
        </h2>
        <p>
          A clear path from your first conversation
          <br />
          to a system your team can rely on.
        </p>
        <a className="text-link" href="#contact" data-audit="">
          Start with a conversation{" "}
          <svg className="icon">
            <use href="#i-arrow"></use>
          </svg>
        </a>
      </div>
      <div className="process-steps">
        <article data-reveal="">
          <span className="step-number">01</span>
          <div>
            <span className="eyebrow">A FOCUSED ROADMAP</span>
            <h3>Discover &amp; audit</h3>
            <p>
              Understand your workflows, uncover bottlenecks, and define what
              success looks like.
            </p>
          </div>
        </article>
        <article data-reveal="">
          <span className="step-number">02</span>
          <div>
            <span className="eyebrow">A PRACTICAL BLUEPRINT</span>
            <h3>Design the system</h3>
            <p>
              Map the architecture, integrations, and safeguards around your
              operation.
            </p>
          </div>
        </article>
        <article data-reveal="">
          <span className="step-number">03</span>
          <div>
            <span className="eyebrow">A TESTED SYSTEM</span>
            <h3>Build &amp; integrate</h3>
            <p>
              Connect the pieces. Test real scenarios. Refine the experience
              with your team.
            </p>
          </div>
        </article>
        <article data-reveal="">
          <span className="step-number">04</span>
          <div>
            <span className="eyebrow">A PATH FORWARD</span>
            <h3>Optimize &amp; scale</h3>
            <p>
              Launch, monitor, and improve. Expand what works as your business
              grows.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
