// These are local, illustrative interface demos. No customer data or APIs are used.
const STEP_DURATION_MS = 600;
const TOUR_DURATION_MS = 6000;

export function initFeatureExplorer(explorer) {
  if (!explorer) return () => {};
  const abort = new AbortController();
  const observers = [];
  const listen = (target, type, handler, options = {}) =>
    target.addEventListener(type, handler, {
      ...options,
      signal: abort.signal,
    });
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const panels = [...explorer.querySelectorAll('[role="tabpanel"]')];
  const demoSteps = panels.map((panel) => [
    ...panel.querySelectorAll("[data-demo-step]"),
  ]);
  const demoDuration = (index) =>
    (Math.max(
      0,
      ...demoSteps[index].map((step) => Number(step.dataset.demoStep)),
    ) +
      1) *
    STEP_DURATION_MS;
  const tablist = explorer.querySelector('[role="tablist"]');
  const playButton = document.getElementById("feature-autoplay");
  const replayButton = document.getElementById("feature-replay");
  const counter = document.getElementById("feature-count");
  const progress = document.getElementById("feature-progress");
  const status = document.getElementById("feature-status");
  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const compactQuery = matchMedia("(max-width: 800px)");
  let current = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
  );
  let elapsed = 0;
  let renderedStep = -1;
  let renderedProgress = -1;
  let tourElapsed = 0;
  let autoplay = false;
  let visible = !("IntersectionObserver" in window);
  let timer = null;
  let lastTick = 0;
  let hoverPaused = false;
  let motionOff = isMotionOff();

  function isMotionOff() {
    const classes = document.documentElement.classList;
    return (
      classes.contains("motion-off") ||
      (motionQuery.matches && !classes.contains("motion-on"))
    );
  }

  function renderSteps() {
    const stepNumber = motionOff
      ? Infinity
      : Math.floor(elapsed / STEP_DURATION_MS);
    if (stepNumber !== renderedStep) {
      renderedStep = stepNumber;
      demoSteps[current].forEach((step) => {
        step.classList.toggle(
          "is-shown",
          motionOff || stepNumber >= Number(step.dataset.demoStep),
        );
      });
    }
    const value = autoplay ? Math.min(1, tourElapsed / TOUR_DURATION_MS) : 0;
    if (value !== renderedProgress) {
      renderedProgress = value;
      progress.style.transform = `scaleX(${value})`;
    }
  }

  function renderControls() {
    playButton.setAttribute("aria-pressed", String(autoplay));
    playButton.querySelector("span").textContent = motionOff
      ? "Motion off"
      : autoplay
        ? "Pause tour"
        : "Play tour";
    playButton
      .querySelector("use")
      .setAttribute("href", autoplay ? "#i-pause" : "#i-play");
    playButton.disabled = motionOff;
    replayButton.disabled = motionOff;
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(tabs.length).padStart(2, "0")}`;
  }

  function stopTour() {
    autoplay = false;
    tourElapsed = 0;
    renderControls();
    renderSteps();
  }

  function activate(index, { manual = false, focus = false } = {}) {
    if (manual) stopTour();
    current = (index + tabs.length) % tabs.length;
    // Manual selection shows the complete preview immediately; Replay retains the demo.
    elapsed = manual ? demoDuration(current) : 0;
    renderedStep = -1;
    tourElapsed = 0;
    tabs.forEach((tab, i) => {
      const selected = i === current;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
      panels[i].classList.toggle("is-entering", selected);
    });
    if (focus) tabs[current].focus({ preventScroll: true });
    renderControls();
    renderSteps();
    if (manual)
      status.textContent = `${tabs[current].querySelector(".feature-tab-label").firstChild.textContent.trim()} preview selected.`;
    syncTimer();
  }

  function tick() {
    const now = performance.now();
    const delta = Math.min(300, now - lastTick);
    lastTick = now;
    elapsed += delta;
    // Hovering over or reading the panel pauses automatic navigation.
    const focusInside =
      panels[current].contains(document.activeElement) ||
      tablist.contains(document.activeElement);
    if (autoplay && !hoverPaused && !focusInside) tourElapsed += delta;
    if (autoplay && tourElapsed >= TOUR_DURATION_MS) activate(current + 1);
    else renderSteps();
    if (!autoplay && elapsed >= demoDuration(current)) stopTimer();
  }

  function stopTimer() {
    if (timer !== null) clearInterval(timer);
    timer = null;
  }

  function syncTimer() {
    if (
      !visible ||
      document.hidden ||
      document.documentElement.classList.contains("background-motion-paused") ||
      motionOff ||
      (!autoplay && elapsed >= demoDuration(current))
    ) {
      stopTimer();
      return;
    }
    if (timer === null) {
      lastTick = performance.now();
      timer = setInterval(tick, 100);
    }
  }

  tabs.forEach((tab, index) => {
    listen(tab, "click", () => activate(index, { manual: true }));
    listen(tab, "keydown", (event) => {
      const horizontal = compactQuery.matches;
      let next;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else if (event.key === (horizontal ? "ArrowRight" : "ArrowDown"))
        next = index + 1;
      else if (event.key === (horizontal ? "ArrowLeft" : "ArrowUp"))
        next = index - 1;
      else return;
      event.preventDefault();
      activate(next, { manual: true, focus: true });
    });
  });

  listen(playButton, "click", () => {
    autoplay = !autoplay;
    tourElapsed = 0;
    if (autoplay) elapsed = 0;
    renderControls();
    renderSteps();
    syncTimer();
    status.textContent = autoplay
      ? "Tour playing. Each preview stays visible for six seconds."
      : "Tour paused.";
  });
  listen(replayButton, "click", () => {
    stopTour();
    elapsed = 0;
    renderSteps();
    syncTimer();
    status.textContent = "Replaying this example.";
  });
  const workspace = explorer.querySelector(".feature-panels");
  listen(workspace, "pointerenter", (event) => {
    if (event.pointerType === "mouse") hoverPaused = true;
  });
  listen(workspace, "pointerleave", () => {
    hoverPaused = false;
  });
  listen(document, "visibilitychange", syncTimer);
  listen(document, "prime:backgroundchange", syncTimer);
  listen(document, "prime:motionchange", () => {
    motionOff = isMotionOff();
    if (motionOff) stopTour();
    renderControls();
    renderSteps();
    syncTimer();
  });
  function updateOrientation() {
    tablist.setAttribute(
      "aria-orientation",
      compactQuery.matches ? "horizontal" : "vertical",
    );
  }
  listen(compactQuery, "change", updateOrientation);
  updateOrientation();

  explorer.classList.add("feature-enhanced");
  document.getElementById("feature-controls").hidden = false;
  activate(current);
  if ("IntersectionObserver" in window) {
    // Start only after a meaningful portion of the preview enters the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        visible =
          entries[0].isIntersecting && entries[0].intersectionRatio >= 0.4;
        syncTimer();
      },
      { threshold: 0.4 },
    );
    observer.observe(workspace);
    observers.push(observer);
  }
  return () => {
    abort.abort();
    stopTimer();
    observers.forEach((observer) => observer.disconnect());
  };
}
