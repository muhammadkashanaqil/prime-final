import PrimeGlobe from "@/components/PrimeGlobe";
import { MotionButton } from "@/components/ui/Controls";

export default function Hero() {
  return (
    <section
      className="hero cinematic-hero"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-aura"></div>
        <div className="hero-stars">
          <i style={{ "--particle-x": "4%", "--particle-y": "38%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "10%", "--particle-y": "74%", "--particle-size": "3px" }}></i>
          <i style={{ "--particle-x": "23%", "--particle-y": "19%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "35%", "--particle-y": "54%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "47%", "--particle-y": "14%", "--particle-size": "3px" }}></i>
          <i style={{ "--particle-x": "52%", "--particle-y": "80%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "57%", "--particle-y": "34%", "--particle-size": "3px" }}></i>
          <i style={{ "--particle-x": "61%", "--particle-y": "63%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "68%", "--particle-y": "12%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "76%", "--particle-y": "87%", "--particle-size": "3px" }}></i>
          <i style={{ "--particle-x": "80%", "--particle-y": "26%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "86%", "--particle-y": "67%", "--particle-size": "3px" }}></i>
          <i style={{ "--particle-x": "91%", "--particle-y": "41%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "95%", "--particle-y": "81%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "39%", "--particle-y": "86%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "28%", "--particle-y": "40%", "--particle-size": "1px" }}></i>
          <i style={{ "--particle-x": "73%", "--particle-y": "49%", "--particle-size": "2px" }}></i>
          <i style={{ "--particle-x": "93%", "--particle-y": "15%", "--particle-size": "2px" }}></i>
        </div>
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <span></span> YOUR AMBITION. AUTOMATED.
        </p>
        <h1 id="hero-title" aria-label="Automation built for the future.">
          <span className="hero-title-line" aria-hidden="true">
            <span className="hero-line-inner">AUTOMATION</span>
          </span>
          <span className="hero-title-line" aria-hidden="true">
            <span className="hero-line-inner">BUILT FOR</span>
          </span>
          <span className="hero-title-line" aria-hidden="true">
            <span className="hero-line-inner">
              THE FUTURE<span className="hero-period">.</span>
            </span>
          </span>
        </h1>
        <p className="hero-description">
          AI systems that automate the busywork, connect your tools, and help
          your business scale.
        </p>
        <div className="hero-actions">
          <a
            className="hero-cta hero-cta-primary"
            id="hero-book-call"
            href="/contact"
            data-audit=""
          >
            Book a Call{" "}
            <svg className="icon" aria-hidden="true">
              <use href="#i-arrow"></use>
            </svg>
          </a>
          <a className="hero-cta hero-cta-secondary" href="/case-studies">
            Our Work{" "}
            <svg className="icon" aria-hidden="true">
              <use href="#i-arrow"></use>
            </svg>
          </a>
        </div>
        <p className="hero-note">
          <span></span> Built around your business. Connected to your world.
        </p>
      </div>

      {/* <div
        className="hero-visual"
        id="prime-logo-visual"
        role="img"
        aria-label="Prime Automation globe, surrounded by a connected network and purple orbital lines."
      >
        <PrimeGlobe />
        <svg
          className="hero-node-lights"
          viewBox="-13 -15 290 290"
          aria-hidden="true"
          focusable="false"
        >
          <g className="hero-node-light">
            <circle cx="73.03" cy="39.49" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="73.03" cy="39.49" r="2.1" fill="#f1b2ff"></circle>
          </g>
          <g className="hero-node-light">
            <circle cx="192.4" cy="90.42" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="192.4" cy="90.42" r="2.1" fill="#f1b2ff"></circle>
          </g>
          <g className="hero-node-light">
            <circle cx="72.72" cy="201.29" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="72.72" cy="201.29" r="2.1" fill="#f1b2ff"></circle>
          </g>
        </svg>
      </div> */}
      <div
        className="hero-visual"
        id="prime-logo-visual"
        role="img"
        aria-label="Prime Automation globe, surrounded by a connected network and purple orbital lines."
      >
        {/* === GIF REPLACEMENT HERE === */}
        {/* Update the src to point to your actual GIF file in the public folder */}
        {/* <img 
          src="/assets/test1.gif"
          alt="Animated Purple Globe Network" 
          style={{ width: "100%", height: "50%", objectFit: "contain", position: "relative", zIndex: 1 }} 
        /> */}

        <video
          className="hero-globe-media"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/anime.webm"
          style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain" }}
        >
          <source src="/assets/anime.webm" type="video/webm" />
          {/* <source src="/assets/vidlogo.mp4" type="video/mp4" /> */}
        </video>



        {/* Note: I left your SVG node lights here in case you want them to overlay the GIF. 
            If the GIF already includes these glowing nodes, you can delete this entire <svg> block. */}
        <svg
          className="hero-node-lights"
          viewBox="-13 -15 290 290"
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2, pointerEvents: "none" }}
        >
          <g className="hero-node-light">
            <circle cx="73.03" cy="39.49" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="73.03" cy="39.49" r="2.1" fill="#f1b2ff"></circle>
          </g>
          <g className="hero-node-light">
            <circle cx="192.4" cy="90.42" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="192.4" cy="90.42" r="2.1" fill="#f1b2ff"></circle>
          </g>
          <g className="hero-node-light">
            <circle cx="72.72" cy="201.29" r="4.4" fill="#d95af0" opacity=".22"></circle>
            <circle cx="72.72" cy="201.29" r="2.1" fill="#f1b2ff"></circle>
          </g>
        </svg>
      </div>

      <div className="hero-bottom-bar">
        <span className="hero-bottom-label">
          AI AGENTS <i>·</i> CONNECTED WORKFLOWS <i>·</i> INTELLIGENT SYSTEMS
        </span>
        <a className="hero-scroll-link" href="#work">
          <span>Scroll to explore</span>
          <svg className="icon" aria-hidden="true">
            <use href="#i-arrow"></use>
          </svg>
        </a>
        <div className="hero-motion-actions">
          <MotionButton location="hero"></MotionButton>
        </div>
      </div>
    </section>
  );
}
