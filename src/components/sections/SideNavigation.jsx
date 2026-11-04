export default function SideNavigation() {
  return (
    <nav className="side-nav" aria-label="Main navigation">
      <a href="#work" data-section="work" aria-label="Selected work">
        <svg className="icon">
          <use href="#i-grid"></use>
        </svg>
        <span>Work</span>
      </a>
      <a href="#services" data-section="services" aria-label="Our services">
        <svg className="icon">
          <use href="#i-spark"></use>
        </svg>
        <span>Services</span>
      </a>
      <a href="#about" data-section="about" aria-label="About Prime">
        <svg className="icon">
          <use href="#i-orbit"></use>
        </svg>
        <span>About</span>
      </a>
      <a href="#contact" data-section="contact" aria-label="Contact us">
        <svg className="icon">
          <use href="#i-mail"></use>
        </svg>
        <span>Contact</span>
      </a>
    </nav>
  );
}
