"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initFeatureExplorer } from "@/lib/feature-explorer";
import { initPointerFollower } from "@/lib/pointer-follower";

export default function SiteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const abort = new AbortController();
    const observers = [];
    const all = (selector) => [...document.querySelectorAll(selector)];
    const listen = (target, type, fn, options = {}) =>
      target?.addEventListener(type, fn, { ...options, signal: abort.signal });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionOff = () =>
      root.classList.contains("motion-off") ||
      (reduced.matches && !root.classList.contains("motion-on"));

    const pageReveals = [];
    if ("IntersectionObserver" in window) {
      // Register only elements present on this route. New filter results stay visible.
      all(
        ".pa-page .pa-intro > *, .pa-page .pa-section-heading, .pa-page .pa-service-row, .pa-page .pa-principle, .pa-page .pa-step, .pa-page .pa-capability, .pa-page .pa-post-card, .pa-page .pa-case-card, .pa-page .pa-cta > *, .pa-page .pa-detail-header > *, .pa-page .pa-contact-aside > *, .pa-page.pa-message-page > div > *, .pa-page .pa-metric, .pa-page .pa-article-cover",
      ).forEach((node, index) => {
        node.setAttribute("data-page-reveal", "");
        node.style.setProperty("--reveal-delay", `${(index % 3) * 60}ms`);
        pageReveals.push(node);
      });
      const reveals = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              reveals.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.07, rootMargin: "0px 0px -25px 0px" },
      );
      root.classList.add("reveal-ready");
      all("[data-reveal], [data-page-reveal]").forEach((node) => {
        if (motionOff()) node.classList.add("is-visible");
        else reveals.observe(node);
      });
      listen(document, "focusin", (event) => {
        const target = event.target.closest?.("[data-page-reveal]");
        if (target) {
          target.classList.add("is-visible");
          reveals.unobserve(target);
        }
      });
      const revealWhenMotionDisabled = () => {
        if (motionOff())
          pageReveals.forEach((node) => node.classList.add("is-visible"));
      };
      listen(document, "prime:motionchange", revealWhenMotionDisabled);
      listen(reduced, "change", revealWhenMotionDisabled);
      observers.push(reveals);
      const scopes = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) =>
            entry.target.classList.toggle(
              "motion-paused",
              !entry.isIntersecting,
            ),
          );
        },
        { rootMargin: "100px" },
      );
      all(
        ".project-visual, .ticker, .tools-marquee, .service-art, .brand-orbit, .footer-wordmark",
      ).forEach((node) => {
        node.classList.add("motion-scope", "motion-paused");
        scopes.observe(node);
      });
      observers.push(scopes);
    }

    const navLinks = all(".side-nav a");
    const sections = ["work", "services", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const progress = document.querySelector(".page-progress");
    let scrollFrame = null;
    let currentSection = null;
    function updateScroll() {
      scrollFrame = null;
      const height = window.innerHeight;
      const scrollable = root.scrollHeight - height;
      const value =
        scrollable > 0
          ? Math.max(0, Math.min(1, window.scrollY / scrollable))
          : 0;
      let current = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= height * 0.45)
          current = section.id;
      });
      if (progress) progress.style.transform = `scaleX(${value})`;
      if (current !== currentSection) {
        currentSection = current;
        navLinks.forEach((link) => {
          const active = link.dataset.section === current;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }
    const queueScroll = () => {
      if (scrollFrame === null)
        scrollFrame = requestAnimationFrame(updateScroll);
    };
    listen(window, "scroll", queueScroll, { passive: true });
    listen(window, "resize", queueScroll, { passive: true });
    listen(window, "prime:layoutchange", queueScroll);
    updateScroll();

    const services = all(".service");
    services.forEach((service) =>
      listen(service, "toggle", () => {
        if (service.open)
          services.forEach((other) => {
            if (other !== service) other.open = false;
          });
        queueScroll();
      }),
    );

    const hero = document.getElementById("home");
    const heroMedia = hero?.querySelector("video");
    let heroVisible = true;
    let backgroundPaused = null;
    let videoBlocked = false;
    let playbackActive = true;
    function markVideoBlocked(blocked) {
      if (!playbackActive || !heroMedia) return;
      videoBlocked = blocked;
      heroMedia.dataset.autoplayBlocked = String(blocked);
      document.dispatchEvent(
        new CustomEvent("prime:videoblocked", { detail: { blocked } }),
      );
    }
    function playHeroVideo() {
      if (!heroMedia) return;
      heroMedia.muted = true;
      heroMedia.defaultMuted = true;
      heroMedia.playsInline = true;
      try {
        Promise.resolve(heroMedia.play()).catch((error) => {
          if (error?.name === "NotAllowedError") markVideoBlocked(true);
        });
      } catch (error) {
        if (error?.name === "NotAllowedError") markVideoBlocked(true);
      }
    }
    function syncPlayback() {
      const paused =
        document.hidden || Boolean(document.querySelector("dialog[open]"));
      if (backgroundPaused !== paused) {
        backgroundPaused = paused;
        root.classList.toggle("background-motion-paused", paused);
        document.dispatchEvent(
          new CustomEvent("prime:backgroundchange", { detail: { paused } }),
        );
      }
      const heroPaused = paused || !heroVisible || motionOff();
      hero?.classList.toggle("hero-paused", heroPaused);
      // The uploaded hero video follows the same visibility and motion controls.
      if (heroMedia) {
        if (heroPaused) heroMedia.pause();
        else if (heroMedia.paused && !videoBlocked) playHeroVideo();
      }
    }
    if (hero && "IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          heroVisible = entry.isIntersecting;
          document.body.classList.toggle(
            "hero-is-active",
            heroVisible && entry.intersectionRatio >= 0.35,
          );
          syncPlayback();
        },
        { threshold: [0, 0.35] },
      );
      heroObserver.observe(hero);
      observers.push(heroObserver);
    }
    if ("MutationObserver" in window) {
      const dialogs = new MutationObserver(syncPlayback);
      all("dialog").forEach((dialog) =>
        dialogs.observe(dialog, {
          attributes: true,
          attributeFilter: ["open"],
        }),
      );
      observers.push(dialogs);
    }
    listen(document, "visibilitychange", syncPlayback);
    listen(document, "prime:motionchange", syncPlayback);
    listen(heroMedia, "loadedmetadata", syncPlayback);
    listen(heroMedia, "playing", () => markVideoBlocked(false));
    syncPlayback();

    const cursor = document.querySelector(".project-cursor");
    const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)");
    let cursorFrame = null,
      x = 0,
      y = 0;
    function hideCursor() {
      if (cursorFrame !== null) cancelAnimationFrame(cursorFrame);
      cursorFrame = null;
      cursor?.classList.remove("visible");
    }
    all(".project-visual").forEach((visual) => {
      listen(
        visual,
        "pointermove",
        (event) => {
          if (
            !cursor ||
            !finePointer.matches ||
            motionOff() ||
            backgroundPaused
          )
            return;
          x = event.clientX;
          y = event.clientY;
          if (cursorFrame === null)
            cursorFrame = requestAnimationFrame(() => {
              cursorFrame = null;
              if (motionOff() || backgroundPaused) return;
              cursor.style.translate = `${x}px ${y}px`;
              cursor.classList.add("visible");
            });
        },
        { passive: true },
      );
      listen(visual, "pointerleave", hideCursor);
      listen(visual, "click", hideCursor);
    });
    listen(window, "scroll", hideCursor, { passive: true });
    listen(document, "prime:backgroundchange", hideCursor);
    listen(document, "prime:motionchange", hideCursor);
    const cleanupFeatures = initFeatureExplorer(
      document.getElementById("ai-in-action"),
    );
    const cleanupPointer = initPointerFollower(
      document.querySelector(".pointer-follower"),
    );

    return () => {
      playbackActive = false;
      abort.abort();
      observers.forEach((observer) => observer.disconnect());
      pageReveals.forEach((node) => {
        node.removeAttribute("data-page-reveal");
        node.style.removeProperty("--reveal-delay");
      });
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      hideCursor();
      cleanupFeatures();
      cleanupPointer();
      heroMedia?.pause();
      root.classList.remove("reveal-ready", "background-motion-paused");
      document.body.classList.remove("hero-is-active");
    };
  }, [pathname]);
  return null;
}
