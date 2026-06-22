"use client";

import type { CSSProperties } from "react";
import type { EmptyStateState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function shell(state: EmptyStateState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
  };
}

function illustrationGlyph(kind: EmptyStateState["illustration"]) {
  const icons = {
    chart: "M5 19V9m7 10V5m7 14v-7",
    inbox: "M4 13h5l2 3h2l2-3h5M5 13l2-7h10l2 7v6H5z",
    search: "M10.5 18a7.5 7.5 0 1 1 5.3-12.8 7.5 7.5 0 0 1-5.3 12.8zm5.3-2 4.2 4.2",
    lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
    spark: "M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z",
  };
  return icons[kind];
}

export default function LivePreview({ state }: { state: EmptyStateState }) {
  const liveMode = state.role === "alert" ? "assertive" : state.role === "status" ? "polite" : undefined;
  const layoutClass = state.layoutMode === "inline" || state.layoutMode === "sidebar" ? "flex items-center text-left" : "grid place-items-center text-center";
  const suggestions = state.suggestions.filter(Boolean);
  const resources = state.resources.filter(Boolean);

  return (
    <section
      id={state.id}
      role={state.role}
      aria-label={state.ariaLabel}
      aria-live={liveMode}
      aria-atomic={liveMode ? true : undefined}
      tabIndex={state.tabIndex}
      style={shell(state)}
      className={`${layoutClass} content-center`}
    >
      <div className="grid max-w-xl gap-4" style={{ gap: state.gap, transition: state.transitionDuration > 0 ? "opacity 0.25s ease, transform 0.25s ease" : "none" }}>
        <div
          aria-hidden="true"
          className="grid size-20 place-items-center rounded-3xl border"
          style={{ borderColor: state.border, background: `${state.accent}20`, color: state.accent }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-10">
            <path d={illustrationGlyph(state.illustration)} />
          </svg>
        </div>
        <div className="grid gap-2">
          <span className="w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]" style={{ background: `${state.accent}22`, color: state.accent }}>
            {state.statusVariant} / {state.stateMode}
          </span>
          <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
          <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.showPrimaryAction && (
            <button type="button" disabled={state.disabled} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ background: state.accent, color: state.background }}>
              {state.primaryActionLabel}
            </button>
          )}
          {state.showSecondaryAction && (
            <button type="button" disabled={state.disabled} className="rounded-xl border px-4 py-2 text-sm font-semibold" style={{ borderColor: state.border, color: state.foreground }}>
              {state.secondaryActionLabel}
            </button>
          )}
        </div>
        {suggestions.length > 0 && (
          <ul className="grid gap-2 text-sm" aria-label={`${state.label} suggestions`}>
            {suggestions.map((item) => (
              <li key={item} className="rounded-xl border px-3 py-2" style={{ borderColor: state.border, color: state.muted }}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {resources.length > 0 && (
          <nav className="flex flex-wrap gap-2 text-xs" aria-label={`${state.label} resources`}>
            {resources.map((resource) => (
              <a key={resource} href="#" className="rounded-full border px-3 py-1 font-semibold" style={{ borderColor: state.border, color: state.accent }}>
                {resource}
              </a>
            ))}
          </nav>
        )}
        <p className="text-xs" style={{ color: state.muted }}>{state.helper}</p>
      </div>
    </section>
  );
}
