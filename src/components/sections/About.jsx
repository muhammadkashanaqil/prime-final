export default function About() {
  return (
    <section
      className="about section wrap"
      id="about"
      aria-labelledby="about-title"
    >
      <span className="eyebrow">03 / THE PRIME APPROACH</span>
      <div className="about-main">
        <h2 id="about-title" data-reveal="">
          AI shouldn’t
          <br />
          add more tools.
          <br />
          It should
          <br />
          <span className="accent">remove work.</span>
        </h2>
        <div className="about-right">
          <div className="brand-orbit" aria-hidden="true">
            <svg viewBox="0 0 240 240">
              <defs>
                <path
                  id="circle-type"
                  d="M120,120m-90,0a90,90 0 1,1 180,0a90,90 0 1,1-180,0"
                ></path>
              </defs>
              <text>
                <textPath href="#circle-type">
                  BUILT AROUND YOUR BUSINESS • BUILT AROUND YOUR BUSINESS •{" "}
                </textPath>
              </text>
            </svg>
            <span>
              p<span>.</span>
            </span>
          </div>
          <p className="about-lead" data-reveal="">
            Disconnected systems. Repetitive tasks. Opportunities stuck in a
            spreadsheet.
          </p>
          <p data-reveal="">
            We connect the pieces so your team can focus on what comes next. A
            specialized engineering team building AI agents, connected
            operations, and reliable data pipelines for businesses that need to
            scale.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "16px" }}>
            <a href="#contact" className="text-link" data-audit="">
              Meet your engineering partner{" "}
              <svg className="icon">
                <use href="#i-arrow"></use>
              </svg>
            </a>
            <a href="/about" className="text-link">
              Our full story{" "}
              <svg className="icon">
                <use href="#i-arrow"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="principles">
        <div data-reveal="">
          <span>01 / OUR MINDSET</span>
          <h3>Utility over hype.</h3>
          <p>
            AI where it solves real problems. Every system should earn its
            place.
          </p>
        </div>
        <div data-reveal="">
          <span>02 / OUR FOUNDATION</span>
          <h3>Security by design.</h3>
          <p>
            Clear boundaries, human oversight, and architecture built around
            your data.
          </p>
        </div>
        <div data-reveal="">
          <span>03 / OUR STANDARD</span>
          <h3>Systems that scale.</h3>
          <p>
            Connect what already works. Measure the results. Keep making it
            better.
          </p>
        </div>
      </div>
    </section>
  );
}
