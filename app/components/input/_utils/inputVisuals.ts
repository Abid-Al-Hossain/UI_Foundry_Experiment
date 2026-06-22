import type React from "react";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import type { TextInputState } from "../types";

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

export function resolveInputFontFamily(state: TextInputState) {
  return state.fontBucket === "google"
    ? state.googleFontFamily
    : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";
}

export function resolveInputRadius(state: TextInputState) {
  return state.linkRadius
    ? `${state.borderRadius}px`
    : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;
}

export function resolveInputBackground(state: TextInputState) {
  return state.useGradient
    ? `linear-gradient(${state.gradientAngle}deg, ${state.gradientStart}, ${state.gradientEnd})`
    : state.backgroundColor;
}

export function resolveInputShadow(state: TextInputState) {
  return state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${hexToRgba(state.shadowColor, state.shadowOpacity)}`
    : "none";
}

export function resolveInputPadding(
  state: TextInputState,
  floatingActive: boolean,
) {
  const leftPadding =
    state.iconEnabled && state.iconPosition === "left"
      ? `calc(${state.paddingX}px + ${state.iconSize}px + 8px)`
      : `${state.paddingX}px`;
  const rightPadding =
    state.iconEnabled && state.iconPosition === "right"
      ? `calc(${state.paddingX}px + ${state.iconSize}px + 8px)`
      : `${state.paddingX}px`;
  const topPadding =
    state.labelPosition === "floating"
      ? `${floatingActive ? Math.max(8, state.paddingY - 2) : Math.max(10, state.paddingY)}px`
      : `${state.paddingY}px`;
  const bottomPadding =
    state.labelPosition === "floating"
      ? `${Math.max(6, state.paddingY - 2)}px`
      : `${state.paddingY}px`;

  return `${topPadding} ${rightPadding} ${bottomPadding} ${leftPadding}`;
}

export function resolveInputDescribedBy(
  state: TextInputState,
  helperId?: string,
  errorId?: string,
) {
  return [helperId, errorId, state.ariaDescribedBy].filter(Boolean).join(" ") || undefined;
}

export function resolveInputAriaInvalid(state: TextInputState) {
  return state.ariaInvalid || Boolean(state.errorText) || undefined;
}

export function resolveInputFloatingLabelStyle(
  state: TextInputState,
  floatingActive: boolean,
): React.CSSProperties {
  const labelOffset =
    state.iconEnabled && state.iconPosition === "left"
      ? state.paddingX + state.iconSize + 8
      : state.paddingX;

  return {
    position: "absolute",
    left: labelOffset,
    top: "50%",
    transform: floatingActive
      ? "translateY(-140%) scale(0.84)"
      : "translateY(-50%) scale(1)",
    transformOrigin: "left center",
    transition: "transform 160ms ease, color 160ms ease, opacity 160ms ease",
    color: state.labelColor,
    fontSize: state.labelFontSize,
    fontWeight: state.labelFontWeight,
    pointerEvents: "auto",
    background: "transparent",
    zIndex: 2,
  };
}

