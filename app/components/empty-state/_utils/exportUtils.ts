import type { EmptyStateState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: EmptyStateState, fileName = "empty-state"): ExportPayload {
  return { fileName: `${fileName || "empty-state"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: EmptyStateState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function illustrationPath(kind) {
  const icons = {
    chart: "M5 19V9m7 10V5m7 14v-7",
    inbox: "M4 13h5l2 3h2l2-3h5M5 13l2-7h10l2 7v6H5z",
    search: "M10.5 18a7.5 7.5 0 1 1 5.3-12.8 7.5 7.5 0 0 1-5.3 12.8zm5.3-2 4.2 4.2",
    lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
    spark: "M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z",
  };
  return icons[kind] || icons.spark;
}

export default function EmptyStateComponent() {
  const liveMode = state.role === "alert" ? "assertive" : state.role === "status" ? "polite" : undefined;
  const suggestions = Array.isArray(state.suggestions) ? state.suggestions.filter(Boolean) : [];
  const resources = Array.isArray(state.resources) ? state.resources.filter(Boolean) : [];
  const shellStyle = {
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
    display: state.layoutMode === "inline" || state.layoutMode === "sidebar" ? "flex" : "grid",
    placeItems: state.layoutMode === "inline" || state.layoutMode === "sidebar" ? undefined : "center",
    gap: state.gap,
    textAlign: state.layoutMode === "inline" || state.layoutMode === "sidebar" ? "left" : "center",
  };

  return (
    <section id={state.id} role={state.role} aria-label={state.ariaLabel} aria-live={liveMode} aria-atomic={liveMode ? true : undefined} tabIndex={state.tabIndex} style={shellStyle}>
      <div style={{ display: "grid", gap: state.gap, maxWidth: 560, transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none" }}>
        <div aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 80, height: 80, borderRadius: 24, border: "1px solid " + state.border, background: state.accent + "22", color: state.accent }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
            <path d={illustrationPath(state.illustration)} />
          </svg>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <span style={{ width: "fit-content", borderRadius: 999, padding: "4px 12px", background: state.accent + "22", color: state.accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em" }}>
            {state.statusVariant} / {state.stateMode}
          </span>
          <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
          <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {state.showPrimaryAction && <button type="button" disabled={state.disabled} style={{ border: 0, borderRadius: 12, padding: "8px 16px", background: state.accent, color: state.background, fontWeight: 700 }}>{state.primaryActionLabel}</button>}
          {state.showSecondaryAction && <button type="button" disabled={state.disabled} style={{ border: "1px solid " + state.border, borderRadius: 12, padding: "8px 16px", background: "transparent", color: state.foreground, fontWeight: 700 }}>{state.secondaryActionLabel}</button>}
        </div>
        {suggestions.length > 0 && (
          <ul aria-label={state.label + " suggestions"} style={{ display: "grid", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
            {suggestions.map((item) => <li key={item} style={{ border: "1px solid " + state.border, borderRadius: 12, padding: "8px 12px", color: state.muted }}>{item}</li>)}
          </ul>
        )}
        {resources.length > 0 && (
          <nav aria-label={state.label + " resources"} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {resources.map((resource) => <a key={resource} href="#" style={{ border: "1px solid " + state.border, borderRadius: 999, padding: "4px 12px", color: state.accent, textDecoration: "none", fontWeight: 700 }}>{resource}</a>)}
          </nav>
        )}
        <p style={{ margin: 0, color: state.muted, fontSize: 12 }}>{state.helper}</p>
      </div>
    </section>
  );
}
`;
}
