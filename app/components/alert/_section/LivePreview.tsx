"use client";

import { useState, type CSSProperties } from "react";
import type { AlertState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

const SEVERITY_META: Record<string, { label: string; icon: string }> = {
  info: { label: "Information", icon: "i" },
  success: { label: "Success", icon: "+" },
  warning: { label: "Warning", icon: "!" },
  error: { label: "Error", icon: "!" },
};

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

function shell(state: AlertState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
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
    transition: state.transitionDuration > 0 ? "opacity 0.2s ease, transform 0.2s ease" : "none",
    transform: state.transitionDuration > 0 ? "translateY(0)" : undefined,
  };
}

function severityFallback(state: AlertState): string {
  if (state.severity === "success") return state.successColor;
  if (state.severity === "warning") return state.warningColor;
  if (state.severity === "error") return state.errorColor;
  return state.infoColor;
}

function severitySurface(state: AlertState, kind: "bg" | "border"): string {
  const map: Record<string, { bg: string; border: string }> = {
    info: { bg: state.infoBg, border: state.infoBorderColor },
    success: { bg: state.successBg, border: state.successBorderColor },
    warning: { bg: state.warningBg, border: state.warningBorderColor },
    error: { bg: state.errorBg, border: state.errorBorderColor },
  };
  const entry = map[state.severity];
  if (!entry) return kind === "bg" ? state.background : state.border;
  return kind === "bg" ? entry.bg : entry.border;
}

function variantShell(state: AlertState): CSSProperties {
  const base = shell(state);
  const sevBorder = severitySurface(state, "border");
  if (state.disabled && state.disabledUseCustomColors) return base;
  if (state.alertVariant === "filled") {
    return { ...base, background: severitySurface(state, "bg"), borderColor: sevBorder };
  }
  if (state.alertVariant === "outlined") {
    return { ...base, borderColor: sevBorder, borderWidth: Math.max(2, state.borderWidth) };
  }
  if (state.alertVariant === "left-accent") {
    return { ...base, borderLeft: `4px solid ${sevBorder}` };
  }
  return base;
}

export default function LivePreview({ state }: { state: AlertState }) {
  const tone = SEVERITY_META[state.severity] ?? SEVERITY_META.info;
  const accent = state.accent || severityFallback(state);
  const isAssertive = state.role === "alert" || state.livePoliteness === "assertive";
  const isDismissed = state.previewState === "closed";
  const isFocused = state.previewState === "focus";
  const [actionHover, setActionHover] = useState(false);
  const [dismissHover, setDismissHover] = useState(false);

  if (isDismissed) {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: state.border, color: state.muted, fontFamily: resolveFont(state) }}>
        Alert dismissed in state preview.
      </div>
    );
  }

  return (
    <section
      id={state.id}
      role={state.role}
      aria-label={state.ariaLabel}
      aria-live={state.livePoliteness}
      aria-atomic="true"
      tabIndex={state.disabled ? -1 : state.tabIndex}
      data-severity={state.severity}
      data-placement={state.placement}
      data-auto-dismiss={state.autoDismiss}
      style={{
        ...variantShell(state),
        outline: isFocused ? `3px solid ${accent}` : "none",
        outlineOffset: isFocused ? 4 : 0,
      }}
      className="grid content-start"
    >
      <div className="grid gap-4" style={{ gap: state.gap }}>
        <div className="flex items-start gap-4">
          {state.iconMode !== "none" && state.iconPosition === "left" ? (
            <span
              aria-hidden="true"
              className="grid shrink-0 place-items-center rounded-2xl border font-black"
              style={{ width: state.iconSize + 24, height: state.iconSize + 24, fontSize: state.iconSize, borderColor: accent, color: accent, background: `color-mix(in oklab, ${accent} 16%, transparent)` }}
            >
              {tone.icon}
            </span>
          ) : null}
          <div className="grid min-w-0 flex-1 gap-2">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
              {state.label || tone.label}
            </p>
            <h3 className="m-0" style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>
              {state.title}
            </h3>
            <p className="m-0" style={{ color: state.muted, fontSize: state.bodySize }}>
              {state.description}
            </p>
          </div>
          {state.iconMode !== "none" && state.iconPosition === "right" ? (
            <span
              aria-hidden="true"
              className="grid shrink-0 place-items-center rounded-2xl border font-black"
              style={{ width: state.iconSize + 24, height: state.iconSize + 24, fontSize: state.iconSize, borderColor: accent, color: accent, background: `color-mix(in oklab, ${accent} 16%, transparent)` }}
            >
              {tone.icon}
            </span>
          ) : null}
          {state.dismissible ? (
            <button
              type="button"
              aria-label="Dismiss alert"
              disabled={state.disabled}
              onMouseEnter={() => setDismissHover(true)}
              onMouseLeave={() => setDismissHover(false)}
              className="rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: state.dismissBorder, color: dismissHover ? state.dismissHoverColor : state.dismissColor, background: dismissHover ? state.dismissHoverBg : "transparent" }}
            >
              x
            </button>
          ) : null}
        </div>
        <p className="m-0 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: state.border, color: state.muted }}>
          {state.helper} {isAssertive ? "Assertive announcement." : "Polite announcement."}{state.autoDismiss ? ` Auto-dismiss in ${state.autoDismissDuration}ms.` : ""}
        </p>
        {state.showActions ? (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={state.disabled}
              onMouseEnter={() => setActionHover(true)}
              onMouseLeave={() => setActionHover(false)}
              className="rounded-xl px-4 py-2 text-sm font-bold"
              style={{ background: actionHover ? state.actionHoverBg : state.actionBg, color: state.actionText, border: `1px solid ${state.actionBorder}` }}
            >
              Primary action
            </button>
            <button type="button" disabled={state.disabled} className="rounded-xl border px-4 py-2 text-sm font-bold" style={{ borderColor: state.border, color: state.foreground }}>
              Secondary
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
