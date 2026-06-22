import type { SkeletonState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: SkeletonState, fileName = "skeleton"): ExportPayload {
  return { fileName: `${fileName || "skeleton"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: SkeletonState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function skeletonPiece(width, height, radius) {
  const animated = (state.transitionDuration > 0) && !state.reducedMotion && state.animation !== "none" && state.duration > 0;
  return {
    width,
    height,
    borderRadius: radius ?? state.radius / 2,
    background: animated && state.animation === "shimmer"
      ? "linear-gradient(90deg, " + state.muted + " 0%, " + state.accent + " 45%, " + state.muted + " 90%)"
      : state.muted,
    backgroundSize: animated && state.animation === "shimmer" ? "220% 100%" : undefined,
    animation: animated ? (state.animation === "shimmer" ? "skeleton-shimmer" : "skeleton-pulse") + " " + state.duration + "ms ease-in-out infinite" : undefined,
  };
}

function Lines() {
  return (
    <div aria-hidden="true" style={{ display: "grid", gap: 12 }}>
      {Array.from({ length: state.lineCount }, (_, index) => (
        <span key={index} data-skeleton-piece="true" style={skeletonPiece(index === state.lineCount - 1 ? "58%" : "100%", Math.max(10, state.bodySize))} />
      ))}
    </div>
  );
}

export default function SkeletonComponent() {
  const showCardMedia = state.pattern === "card" && state.showMedia;
  const showAvatar = state.showAvatar || state.pattern === "avatar";
  const isTable = state.pattern === "table";
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
    display: "grid",
    alignContent: "start",
    gap: state.gap,
  };

  return (
    <section id={state.id} role={state.role} aria-label={state.ariaLabel} aria-live={state.role === "status" ? "polite" : undefined} aria-busy={!state.disabled} tabIndex={state.tabIndex} style={shellStyle}>
      <style>{\`
        @keyframes skeleton-shimmer { from { background-position: 120% 0; } to { background-position: -120% 0; } }
        @keyframes skeleton-pulse { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 1; transform: scale(.985); } }
        @media (prefers-reduced-motion: reduce) { [data-skeleton-piece="true"] { animation: none !important; } }
      \`}</style>
      <span style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>{state.ariaLabel}</span>
      <div style={{ display: "grid", gap: 4 }}>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div data-skeleton-pattern={state.pattern} style={{ display: "grid", gap: 16 }}>
        {showCardMedia && <span data-skeleton-piece="true" aria-hidden="true" style={skeletonPiece("100%", Math.max(96, state.height / 3), state.radius)} />}
        {isTable ? (
          <div aria-hidden="true" style={{ display: "grid", gap: 12 }}>
            {Array.from({ length: state.lineCount }, (_, row) => (
              <div key={row} style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .6fr", gap: 12 }}>
                <span data-skeleton-piece="true" style={skeletonPiece("100%", 16)} />
                <span data-skeleton-piece="true" style={skeletonPiece("100%", 16)} />
                <span data-skeleton-piece="true" style={skeletonPiece("100%", 16)} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: showAvatar ? "auto 1fr" : "1fr", alignItems: "start", gap: 16 }}>
            {showAvatar && <span data-skeleton-piece="true" aria-hidden="true" style={skeletonPiece(Math.max(44, state.titleSize * 2), Math.max(44, state.titleSize * 2), 999)} />}
            <Lines />
          </div>
        )}
      </div>
      <p style={{ margin: 0, color: state.muted, fontSize: 12 }}>{state.helper}</p>
    </section>
  );
}
`;
}
