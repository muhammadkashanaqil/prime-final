// One small, non-interactive ring. Frames run only while it is catching the mouse.
export function initPointerFollower(follower) {
  if (!follower) return () => {};
  const abort = new AbortController();
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  let frame = null;
  let visible = false;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let lastTime = 0;

  const listen = (target, type, handler, options = {}) =>
    target.addEventListener(type, handler, {
      ...options,
      signal: abort.signal,
    });
  const enabled = () =>
    finePointer.matches &&
    !document.hidden &&
    !root.classList.contains("motion-off") &&
    !(reduced.matches && !root.classList.contains("motion-on")) &&
    !root.classList.contains("background-motion-paused");

  function hide() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    visible = false;
    follower.classList.remove("is-visible", "is-interactive", "is-contrast");
  }

  function draw(now) {
    frame = null;
    if (!enabled()) return hide();
    const delta = Math.min(48, Math.max(1, now - lastTime));
    lastTime = now;
    const ease = 1 - Math.exp(-delta / 45);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.15;
    if (settled) {
      x = targetX;
      y = targetY;
    }
    follower.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    if (!settled) frame = requestAnimationFrame(draw);
  }

  listen(
    window,
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || !enabled()) return hide();
      const target = event.target;
      // Retain the existing project cue and native text-selection/form behavior.
      if (
        target.closest?.(
          ".project-visual, input, textarea, select, [contenteditable='true']",
        )
      ) {
        return hide();
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        visible = true;
        follower.classList.add("is-visible");
      }
      follower.classList.toggle(
        "is-interactive",
        Boolean(target.closest?.("a, button, summary, [role='tab']")),
      );
      follower.classList.toggle(
        "is-contrast",
        Boolean(target.closest?.(".contact-section")),
      );
      if (frame === null) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    },
    { passive: true },
  );
  listen(document, "pointerout", (event) => {
    if (!event.relatedTarget) hide();
  });
  listen(document, "keydown", hide);
  listen(document, "visibilitychange", hide);
  listen(document, "prime:motionchange", hide);
  listen(document, "prime:backgroundchange", hide);
  listen(window, "scroll", hide, { passive: true });
  listen(window, "blur", hide);
  listen(finePointer, "change", hide);
  listen(reduced, "change", hide);

  return () => {
    abort.abort();
    hide();
  };
}
