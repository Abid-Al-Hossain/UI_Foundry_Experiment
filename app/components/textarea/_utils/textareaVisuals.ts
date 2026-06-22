import type React from "react";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import type { TextareaState } from "../types";

export function hexToRgba(hex: string, alpha: number) {
  let r = 0;
  let g = 0;
  let b = 0;

  let normalized = hex.trim();
  if (normalized.startsWith("#")) {
    normalized = normalized.slice(1);
  }

  if (normalized.length === 3) {
    r = parseInt(normalized[0] + normalized[0], 16);
    g = parseInt(normalized[1] + normalized[1], 16);
    b = parseInt(normalized[2] + normalized[2], 16);
  } else if (normalized.length === 6) {
    r = parseInt(normalized.slice(0, 2), 16);
    g = parseInt(normalized.slice(2, 4), 16);
    b = parseInt(normalized.slice(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function resolveTextareaRadius(state: TextareaState) {
  return state.linkRadius
    ? `${state.borderRadius}px`
    : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;
}

export function resolveTextareaBackground(state: TextareaState) {
  return state.useGradient
    ? `linear-gradient(${state.gradientAngle}deg, ${state.gradientStart}, ${state.gradientEnd})`
    : state.backgroundColor;
}

export function resolveTextareaFontFamily(state: TextareaState) {
  return state.fontBucket === "google"
    ? state.googleFontFamily
    : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";
}

export function resolveTextareaShadow(state: TextareaState) {
  return state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${hexToRgba(state.shadowColor, state.shadowOpacity)}`
    : "none";
}

export function resolveTextareaPadding(
  state: TextareaState,
  floatingActive: boolean,
) {
  if (state.labelPosition !== "floating") {
    return `${state.paddingY}px ${state.paddingX}px`;
  }

  const topPadding = floatingActive
    ? Math.max(state.paddingY + 10, 18)
    : Math.max(state.paddingY + 16, 24);
  const bottomPadding = Math.max(state.paddingY, 10);

  return `${topPadding}px ${state.paddingX}px ${bottomPadding}px ${state.paddingX}px`;
}

export function resolveTextareaDescribedBy(
  state: TextareaState,
  helperId?: string,
  errorId?: string,
) {
  return [helperId, errorId, state.ariaDescribedBy].filter(Boolean).join(" ") || undefined;
}

export function resolveTextareaAriaInvalid(state: TextareaState) {
  return state.ariaInvalid || Boolean(state.errorText) || undefined;
}

export function resolveTextareaFloatingLabelStyle(
  state: TextareaState,
  floatingActive: boolean,
): React.CSSProperties {
  return {
    position: "absolute",
    left: state.paddingX,
    top: floatingActive ? 12 : Math.max(state.paddingY + 6, 14),
    transform: floatingActive ? "scale(0.84)" : "scale(1)",
    transformOrigin: "left top",
    transition: "transform 160ms ease, top 160ms ease, color 160ms ease, opacity 160ms ease",
    color: state.labelColor,
    fontSize: state.labelFontSize,
    fontWeight: state.labelFontWeight,
    lineHeight: 1,
    pointerEvents: "none",
    background: "transparent",
    zIndex: 1,
  };
}
