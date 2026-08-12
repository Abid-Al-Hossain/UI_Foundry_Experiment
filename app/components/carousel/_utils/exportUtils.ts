import type { CarouselState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: CarouselState, fileName = "carousel") : ExportPayload {
  return { fileName: `${fileName || "carousel"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: CarouselState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function clampIndex(index, count) {
  return Math.min(Math.max(index, 0), Math.max(count - 1, 0));
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  return prefersReducedMotion;
}

export default function CarouselComponent() {
  const slideCount = Math.max(1, state.slideCount);
  const slides = React.useMemo(() => Array.from({ length: slideCount }, (_, index) => ({
    id: \`slide-\${index + 1}\`,
    eyebrow: \`\${state.label} \${index + 1}\`,
    title: index === 0 ? state.title : \`\${state.title} \${index + 1}\`,
    body: index === 0 ? state.description : \`\${state.description} Item \${index + 1} of \${slideCount}.\`,
  })), [slideCount]);
  const [selectedIndex, setSelectedIndex] = React.useState(() => clampIndex(state.activeIndex, slideCount));
  const [isPaused, setIsPaused] = React.useState(!state.autoplay);
  const [isHovered, setIsHovered] = React.useState(false);
  const [arrowHover, setArrowHover] = React.useState("");
  const pointerStart = React.useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const canAutoplay = state.autoplay && !state.disabled && !prefersReducedMotion;
  const selectedSlide = slides[selectedIndex] ?? slides[0];
  const transition = (state.transitionDuration > 0) && !prefersReducedMotion ? "transform " + state.animationDuration + "ms ease, opacity " + state.animationDuration + "ms ease" : "none";

  React.useEffect(() => {
    setSelectedIndex((current) => clampIndex(current, slideCount));
  }, [slideCount]);

  React.useEffect(() => {
    if (!canAutoplay || isPaused || (state.pauseOnHover && isHovered)) return;
    const timer = window.setInterval(() => {
      setSelectedIndex((current) => {
        if (current >= slideCount - 1) return state.loop ? 0 : current;
        return current + 1;
      });
    }, Math.max(1000, state.interval));
    return () => window.clearInterval(timer);
  }, [canAutoplay, isPaused, isHovered, slideCount]);

  const goPrevious = () => setSelectedIndex((current) => current === 0 ? (state.loop ? slideCount - 1 : current) : current - 1);
  const goNext = () => setSelectedIndex((current) => current >= slideCount - 1 ? (state.loop ? 0 : current) : current + 1);
  const beginGesture = (event) => {
    const enabled = event.pointerType === "touch" ? state.swipeEnabled : state.dragEnabled;
    if (!enabled || state.disabled) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX, enabled };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const finishGesture = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start?.enabled || start.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const delta = event.clientX - start.x;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrevious(); else goNext();
  };

  return (
    <section
      id={state.id}
      role={state.role}
      aria-roledescription="carousel"
      aria-label={state.ariaLabel}
      tabIndex={state.tabIndex}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(event) => { if (state.disabled) return; if (event.key === "ArrowLeft") { event.preventDefault(); goPrevious(); } if (event.key === "ArrowRight") { event.preventDefault(); goNext(); } }}
      style={{
        width: state.width,
        minHeight: state.height,
        padding: state.padding,
        borderRadius: state.radius,
        border: state.borderWidth + "px " + state.borderStyle + " " + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border),
        boxShadow: buildShadow(state),
        background: state.background,
        color: state.foreground,
        fontFamily: resolveFont(state),
        opacity: state.disabled ? (state.disabledOpacity ?? 0.5) : 1,
cursor: state.disabled ? state.disabledCursor : undefined,
      }}
    >
      <div style={{ display: "grid", gap: state.gap }}>
        <header>
          <p style={{ margin: 0, color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>
            {state.label}
          </p>
          <h2 style={{ margin: "8px 0 0", fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h2>
          <p style={{ margin: "8px 0 0", color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        </header>

        <div aria-live={canAutoplay && !isPaused && !(state.pauseOnHover && isHovered) ? "off" : "polite"} data-swipe={state.swipeEnabled} data-drag={state.dragEnabled} onPointerDown={beginGesture} onPointerUp={finishGesture} onPointerCancel={() => { pointerStart.current = null; }} style={{ overflow: "hidden", borderRadius: state.slideRadius, touchAction: state.swipeEnabled ? "pan-y" : "auto", cursor: state.dragEnabled ? "grab" : undefined }}>
          <div style={{ display: "flex", transform: "translateX(-" + selectedIndex * 100 + "%)", transition }}>
            {slides.map((slide, index) => {
              const selected = index === selectedIndex;
              return (
                <article
                  key={slide.id}
                  id={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={\`Slide \${index + 1} of \${slideCount}: \${slide.title}\`}
                  aria-current={selected ? "true" : undefined}
                  aria-hidden={selected ? undefined : true}
                  style={{
                    flex: "0 0 100%",
                    minHeight: Math.max(160, state.height - state.padding * 2 - 120),
                    display: "grid",
                    alignContent: "end",
                    gap: 10,
                    padding: Math.max(20, state.padding),
                    borderRadius: state.slideRadius,
                    border: "1px solid " + state.border,
                    background: "linear-gradient(135deg, " + state.itemActiveBg + ", rgba(255,255,255,.06))",
                    opacity: selected ? 1 : 0.48,
                  }}
                >
                  <span style={{ color: state.accent, fontSize: 12, fontWeight: 700 }}>{slide.eyebrow}</span>
                  <h3 style={{ margin: 0, fontSize: Math.max(20, state.titleSize - 6), fontWeight: state.fontWeight }}>{slide.title}</h3>
                  <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{slide.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        {state.thumbnailsEnabled && (
          <div role="group" aria-label="Slide thumbnails" style={{ display: "flex", gap: 8, overflowX: "auto" }}>
            {slides.map((slide, index) => (
              <button key={slide.id} type="button" onClick={() => setSelectedIndex(index)} disabled={state.disabled} aria-label={\`Show slide \${index + 1}\`} aria-current={index === selectedIndex ? "true" : undefined} style={{ flexShrink: 0, height: state.thumbHeight, width: Math.round(state.thumbHeight * 1.6), borderRadius: Math.max(4, state.slideRadius - 4), border: "2px solid " + (index === selectedIndex ? state.thumbActiveBorder : state.border), background: "linear-gradient(135deg, " + state.itemActiveBg + ", rgba(255,255,255,.06))", opacity: index === selectedIndex ? 1 : 0.6 }} />
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          {state.showArrows && (
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={goPrevious} onMouseEnter={() => setArrowHover("prev")} onMouseLeave={() => setArrowHover("")} disabled={state.disabled || (!state.loop && selectedIndex === 0)} aria-label="Show previous slide" style={{ display: "grid", placeItems: "center", width: state.arrowSize, height: state.arrowSize, border: "1px solid " + state.arrowBorder, borderRadius: state.arrowRadius, background: arrowHover === "prev" ? state.arrowHoverBg : state.arrowBg, color: arrowHover === "prev" ? state.arrowHoverColor : state.arrowColor }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={goNext} onMouseEnter={() => setArrowHover("next")} onMouseLeave={() => setArrowHover("")} disabled={state.disabled || (!state.loop && selectedIndex === slideCount - 1)} aria-label="Show next slide" style={{ display: "grid", placeItems: "center", width: state.arrowSize, height: state.arrowSize, border: "1px solid " + state.arrowBorder, borderRadius: state.arrowRadius, background: arrowHover === "next" ? state.arrowHoverBg : state.arrowBg, color: arrowHover === "next" ? state.arrowHoverColor : state.arrowColor }}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          )}

          {state.showDots && (
            <div role="group" aria-label="Choose slide" style={{ display: "flex", gap: state.dotGap }}>
              {slides.map((slide, index) => (
                <button key={slide.id} type="button" onClick={() => setSelectedIndex(index)} disabled={state.disabled} aria-label={\`Show slide \${index + 1}\`} aria-current={index === selectedIndex ? "true" : undefined} style={{ width: index === selectedIndex ? state.dotSize * 2.4 : state.dotSize, height: state.dotSize, borderRadius: state.dotBorderRadius, border: 0, background: index === selectedIndex ? state.dotActiveBg : state.dotInactiveBg }} />
              ))}
            </div>
          )}

          <span style={{ borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: state.counterColor, background: state.counterBg }}>{selectedIndex + 1} / {slideCount}</span>

          {state.autoplay && (
            <button type="button" onClick={() => setIsPaused((value) => !value)} disabled={state.disabled || prefersReducedMotion} aria-pressed={isPaused} style={{ border: "1px solid " + state.border, borderRadius: 999, padding: "10px 14px", background: "transparent", color: state.foreground }}>
              {prefersReducedMotion ? "Autoplay disabled for reduced motion" : isPaused ? "Resume autoplay" : "Pause autoplay"}
            </button>
          )}
        </div>

        <p aria-live="polite" style={{ margin: 0, color: state.muted, fontSize: 12 }}>
          {selectedSlide.title} selected. {state.autoplay ? (isPaused || prefersReducedMotion || (state.pauseOnHover && isHovered) ? "Autoplay paused." : "Autoplay running.") : "Autoplay off."}
        </p>
      </div>
    </section>
  );
}
`;
}
