"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const [motionOff, setMotionOff] = useState(false);
  const [ready, setReady] = useState(false);
  const savedPreference = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      savedPreference.current = localStorage.getItem("prime-motion");
    } catch {
      /* Storage is optional. */
    }
    setMotionOff(
      savedPreference.current === "off" ||
        (savedPreference.current === null && query.matches),
    );
    setReady(true);
    const change = (event) => {
      if (savedPreference.current === null) setMotionOff(event.matches);
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.classList.toggle("motion-off", motionOff);
    root.classList.toggle("motion-on", !motionOff);
    if (motionOff)
      document
        .querySelectorAll("[data-reveal]")
        .forEach((node) => node.classList.add("is-visible"));
    document.dispatchEvent(
      new CustomEvent("prime:motionchange", { detail: { off: motionOff } }),
    );
  }, [motionOff, ready]);

  const toggleMotion = useCallback(() => {
    const next = !motionOff;
    savedPreference.current = next ? "off" : "on";
    try {
      localStorage.setItem("prime-motion", savedPreference.current);
    } catch {
      /* The control still works. */
    }
    setMotionOff(next);
  }, [motionOff]);
  const openDialog = useCallback((value) => setDialog(value), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  // Delegation lets static server-rendered section links open small React dialogs.
  useEffect(() => {
    const click = (event) => {
      const target = event.target.closest?.(
        "[data-audit], [data-project], [data-insight]",
      );
      if (!target) return;
      if (target.hasAttribute("data-audit")) {
        event.preventDefault();
        setDialog({ kind: "audit", service: target.dataset.service });
      } else if (target.hasAttribute("data-project")) {
        setDialog({ kind: "project", key: target.dataset.project });
      } else if (target.hasAttribute("data-insight")) {
        setDialog({ kind: "insight", key: target.dataset.insight });
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  const value = useMemo(
    () => ({ dialog, openDialog, closeDialog, motionOff, toggleMotion }),
    [dialog, openDialog, closeDialog, motionOff, toggleMotion],
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("Site controls must be inside SiteProvider.");
  return context;
}
