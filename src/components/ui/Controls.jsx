"use client";

import { useEffect, useState } from "react";
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
  const [videoBlocked, setVideoBlocked] = useState(false);
  useEffect(() => {
    const sync = () => setVideoBlocked(
      document.querySelector("#home video")?.dataset.autoplayBlocked === "true",
    );
    sync();
    document.addEventListener("prime:videoblocked", sync);
    return () => document.removeEventListener("prime:videoblocked", sync);
  }, []);

  function handleMotion() {
    const video = document.querySelector("#home video");
    const retryBlocked = location === "hero" && videoBlocked;
    const retryVideo = video && (motionOff || retryBlocked);
    if (motionOff || !retryBlocked) toggleMotion();
    if (!retryVideo) return;
    // Call play inside the tap handler: mobile browsers may reject autoplay.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const report = (blocked) => {
      video.dataset.autoplayBlocked = String(blocked);
      document.dispatchEvent(
        new CustomEvent("prime:videoblocked", { detail: { blocked } }),
      );
    };
    try {
      Promise.resolve(video.play()).then(() => report(false)).catch((error) => {
        if (error?.name === "NotAllowedError") report(true);
      });
    } catch (error) {
      if (error?.name === "NotAllowedError") report(true);
    }
  }
  if (location === "hero") {
    return (
      <button
        id="hero-motion-toggle"
        type="button"
        aria-pressed={motionOff}
        onClick={handleMotion}
      >
        <svg className="icon" aria-hidden="true">
          <use href={motionOff || videoBlocked ? "#i-play" : "#i-pause"} />
        </svg>
        <span>{motionOff ? "Resume motion" : videoBlocked ? "Play animation" : "Pause motion"}</span>
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
      onClick={handleMotion}
    >
      Motion: {motionOff ? "off" : "on"}{" "}
      <span aria-hidden="true">{motionOff ? "○" : "◉"}</span>
    </button>
  );
}
