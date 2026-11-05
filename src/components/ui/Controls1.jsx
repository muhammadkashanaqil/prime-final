"use client";

import { useSite } from "@/components/SiteProvider";

export function MenuToggle() {
  const { dialog, openDialog } = useSite();
  return (
    <button
      className="hero-menu-toggle"
      id="site-menu-toggle"
      type="button"
      aria-expanded={dialog?.kind === "menu"}
      aria-controls="site-menu"
      onClick={() => openDialog({ kind: "menu" })}
    >
      <span className="menu-toggle-lines" aria-hidden="true">
        <i />
        <i />
      </span>{" "}
      MENU
    </button>
  );
}

export function MotionButton({ location }) {
  const { motionOff, toggleMotion } = useSite();
  if (location === "hero") {
    return (
      <button
        id="hero-motion-toggle"
        type="button"
        aria-pressed={motionOff}
        onClick={toggleMotion}
      >
        <svg className="icon" aria-hidden="true">
          <use href={motionOff ? "#i-play" : "#i-pause"} />
        </svg>
        <span>{motionOff ? "Resume motion" : "Pause motion"}</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      id="motion-toggle"
      aria-pressed={motionOff}
      aria-label={
        motionOff ? "Enable decorative animation" : "Pause decorative animation"
      }
      onClick={toggleMotion}
    >
      Motion: {motionOff ? "off" : "on"}{" "}
      <span aria-hidden="true">{motionOff ? "○" : "◉"}</span>
    </button>
  );
}
