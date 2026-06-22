"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { ToastState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

const InfoIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="7.25" y="7" width="1.5" height="5" rx="0.75" />
    <circle cx="8" cy="4.5" r="0.875" />
  </svg>
);
const SuccessIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="7" />
    <polyline points="4.5,8.5 7,11 11.5,5.5" />
  </svg>
);
const WarningIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5L14.5 13H1.5L8 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="7.25" y="6" width="1.5" height="4" rx="0.75" />
    <circle cx="8" cy="11.5" r="0.875" />
  </svg>
);
const ErrorIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="8" cy="8" r="7" />
    <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" /><line x1="10.5" y1="5.5" x2="5.5" y2="10.5" />
  </svg>
);

const SEVERITY_ICONS: Record<string, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
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

function severityColor(state: ToastState, kind: "bg" | "border"): string {
  const map: Record<string, { bg: string; border: string }> = {
    info: { bg: state.infoBg, border: state.infoBorderColor },
    success: { bg: state.successBg, border: state.successBorderColor },
    warning: { bg: state.warningBg, border: state.warningBorderColor },
    error: { bg: state.errorBg, border: state.errorBorderColor },
  };
  const entry = map[state.severity];
  if (!entry) return kind === "bg" ? state.toastBg : state.toastBorder;
  return kind === "bg" ? entry.bg : entry.border;
}

function shell(state: ToastState, index: number): CSSProperties {
  const sevBorder = severityColor(state, "border");
  const variant = state.toastVariant;
  const background = variant === "filled" ? severityColor(state, "bg") : state.toastBg;
  const borderColor = variant === "filled" || variant === "outlined" ? sevBorder : state.toastBorder;
  const borderWidth = variant === "outlined" ? Math.max(2, state.borderWidth) : state.borderWidth;
  const scale = Math.max(0.8, 1 - index * state.stackScaleRatio);
  return {
    width: state.width,
    minHeight: Math.max(92, Math.round(state.height / 3)),
    padding: state.padding,
    borderRadius: state.toastRadius,
    border: `${borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : borderColor}`,
    borderLeft: variant === "left-accent" ? `4px solid ${sevBorder}` : undefined,
    boxShadow: state.toastShadow,
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled || state.previewState === "closed" ? state.disabledOpacity : 1,
    transform: `translate(${index * state.stackOffset}px, ${index * state.stackOffset}px) scale(${scale})`,
    transition: state.transitionDuration > 0 ? "opacity 0.3s ease, transform 0.3s ease" : "none",
  };
}

function toastFallback(state: ToastState): string {
  if (state.severity === "success") return state.successColor;
  if (state.severity === "warning") return state.warningColor;
  if (state.severity === "error") return state.errorColor;
  return state.infoColor;
}

export default function LivePreview({ state }: { state: ToastState }) {
  const icon = SEVERITY_ICONS[state.severity] ?? SEVERITY_ICONS.info;
  const accent = state.accent || toastFallback(state);
  const count = Math.max(1, Math.min(Math.max(1, Math.round(state.maxToasts)), Math.round(state.stackCount)));
  const liveRole = state.role === "alert" || state.severity === "error" ? "alert" : "status";
  const livePoliteness = liveRole === "alert" ? "assertive" : "polite";
  const isFocused = state.previewState === "focus";
  const [actionHover, setActionHover] = useState(-1);
  const [dismissHover, setDismissHover] = useState(-1);

  return (
    <section
      id={state.id}
      role={state.role === "region" ? "region" : undefined}
      aria-label={state.ariaLabel}
      data-placement={state.placement}
      data-swipe-direction={state.swipeDirection}
      data-pause-on-hover={state.pauseOnHover}
      data-pause-on-window-blur={state.pauseOnWindowBlur}
      className="grid"
      style={{ gap: state.stackGap, justifyItems: state.placement.includes("right") ? "end" : "start" }}
    >
      {Array.from({ length: count }, (_, index) => (
        <article
          key={index}
          role={liveRole}
          aria-live={livePoliteness}
          aria-atomic="true"
          tabIndex={state.disabled ? -1 : state.tabIndex}
          className="grid gap-3"
          style={{
            ...shell(state, index),
            outline: isFocused && index === 0 ? `3px solid ${accent}` : "none",
            outlineOffset: isFocused && index === 0 ? 4 : 0,
          }}
        >
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="grid shrink-0 place-items-center rounded-xl border font-black" style={{ width: state.iconSize + 20, height: state.iconSize + 20, borderColor: state.iconColor, color: state.iconColor }}>
              <span style={{ display: "grid", placeItems: "center", width: state.iconSize, height: state.iconSize }}>{icon}</span>
            </span>
            <div className="grid min-w-0 flex-1 gap-1">
              <h3 className="m-0" style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>
                {index === 0 ? state.title : `${state.title} ${index + 1}`}
              </h3>
              <p className="m-0" style={{ color: state.muted, fontSize: state.bodySize }}>
                {state.description}
              </p>
            </div>
            {state.dismissible ? (
              <button
                type="button"
                disabled={state.disabled}
                aria-label="Dismiss toast"
                onMouseEnter={() => setDismissHover(index)}
                onMouseLeave={() => setDismissHover(-1)}
                className="rounded-xl border px-3 py-2"
                style={{ borderColor: state.dismissBorder, color: dismissHover === index ? state.dismissHoverColor : state.dismissColor, background: dismissHover === index ? state.dismissHoverBg : "transparent", lineHeight: 0 }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
                </svg>
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: state.muted }}>
            <span>{state.helper}</span>
            <span>{state.duration}ms{state.pauseOnHover ? " · pause on hover" : ""}</span>
          </div>
          {state.showAction ? (
            <button
              type="button"
              disabled={state.disabled}
              onMouseEnter={() => setActionHover(index)}
              onMouseLeave={() => setActionHover(-1)}
              className="justify-self-start rounded-xl px-4 py-2 text-sm font-bold"
              style={{ background: actionHover === index ? state.actionHoverBg : state.actionBg, color: state.actionText, border: `1px solid ${state.actionBorder}` }}
            >
              {state.label}
            </button>
          ) : null}
          {state.progressBarEnabled ? (
            <div aria-hidden="true" style={{ height: state.progressBarHeight, borderRadius: 999, background: state.progressBarBg, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "62%", background: state.progressBarColor }} />
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}
