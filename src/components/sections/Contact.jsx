export default function Contact() {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <div className="contact-top">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <span>LESS MANUAL WORK. MORE POSSIBILITY.</span>
        </div>
        <div className="contact-main">
          <h2 id="contact-title" data-reveal="">
            Make your
            <br />
            next move<span>.</span>
          </h2>
          <a
            href="/contact"
            className="contact-orb"
            data-audit=""
            aria-label="Book a free AI audit"
          >
            <svg className="icon">
              <use href="#i-arrow"></use>
            </svg>
            <span>
              LET&apos;S BUILD
              <br />
              WHAT&apos;S NEXT
            </span>
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            Let&apos;s find what&apos;s slowing you down —<br />
            and design the system that moves you forward.
          </p>
          <div>
            <a
              className="button button-dark"
              href="/contact"
              data-audit=""
            >
              Book a free AI audit{" "}
              <svg className="icon">
                <use href="#i-arrow"></use>
              </svg>
            </a>
            <span>45 minutes. Practical next steps. No commitment.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
