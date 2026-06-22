import type React from "react";
import type { IconEntranceAnimation, IconHoverEffect, IconState } from "../types";

type MotionTarget = Record<string, number | string | number[]>;

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const safe =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);
  const r = parseInt(safe.slice(0, 2), 16);
  const g = parseInt(safe.slice(2, 4), 16);
  const b = parseInt(safe.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getNeumorphicShadow(state: IconState) {
  if (!state.neumorphic || state.shape === "none") return "";

  const light = "rgba(255, 255, 255, 0.78)";
  const dark = "rgba(15, 23, 42, 0.18)";
  switch (state.neumorphicElevation) {
    case "pressed":
      return `inset 8px 8px 16px ${dark}, inset -8px -8px 16px ${light}`;
    case "convex":
      return `10px 10px 24px ${dark}, -10px -10px 24px ${light}`;
    case "concave":
      return `inset 6px 6px 14px ${dark}, inset -6px -6px 14px ${light}`;
    default:
      return `6px 6px 14px ${dark}, -6px -6px 14px ${light}`;
  }
}

export function resolveIconContainerBackground(state: IconState) {
  if (state.shape === "none") return "transparent";
  if (state.glassBlur > 0) {
    return hexToRgba("#ffffff", state.glassOpacity);
  }
  return hexToRgba(state.containerColor, state.containerOpacity);
}

export function resolveIconContainerRadius(state: IconState) {
  if (state.shape === "circle") return "50%";
  if (state.shape === "squircle") return `${Math.max(state.borderRadius, 20)}px`;
  return `${state.borderRadius}px`;
}

export function resolveIconBoxShadow(state: IconState) {
  const shadows = [
    getNeumorphicShadow(state),
    state.shadowEnabled
      ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
      : "",
    state.glowEnabled ? `0 0 ${state.glowBlur}px ${state.glowColor}` : "",
  ].filter(Boolean);
  return shadows.join(", ") || "none";
}

export function resolveIconContainerStyle(state: IconState): React.CSSProperties {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: state.shape === "none" ? "auto" : `${state.containerSize}px`,
    height: state.shape === "none" ? "auto" : `${state.containerSize}px`,
    padding: state.shape === "none" ? 0 : `${state.containerPadding}px`,
    background: resolveIconContainerBackground(state),
    borderWidth: state.shape === "none" ? 0 : `${state.borderWidth}px`,
    borderStyle: state.borderStyle,
    borderColor: state.borderColor,
    borderRadius: resolveIconContainerRadius(state),
    boxShadow: resolveIconBoxShadow(state),
    backdropFilter: state.glassBlur > 0 ? `blur(${state.glassBlur}px)` : undefined,
    WebkitBackdropFilter: state.glassBlur > 0 ? `blur(${state.glassBlur}px)` : undefined,
    overflow: "hidden",
    transformStyle: "preserve-3d",
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : state.clickable ? state.cursorType : undefined,
    pointerEvents: state.disabled ? "none" : undefined,
    transition: state.transitionDuration > 0 ? `transform ${state.transitionDuration}ms ${state.transitionEasing}, box-shadow ${state.transitionDuration}ms ${state.transitionEasing}` : undefined,
  };
}

export function resolveIconFocusOutline(state: IconState): React.CSSProperties {
  if (!state.focusRingEnabled || !state.clickable) return {};
  return {
    outline: `${state.focusRingWidth}px solid ${state.focusRingColor}`,
    outlineOffset: state.focusRingOffset,
  };
}

export function resolveIconOuterTransform(state: IconState) {
  return [
    `rotate(${state.rotation}deg)`,
    `scaleX(${state.flipHorizontal ? -1 : 1})`,
    `scaleY(${state.flipVertical ? -1 : 1})`,
  ].join(" ");
}

export function resolveIconThreeDTransform(state: IconState) {
  return state.use3D
    ? `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) rotateZ(${state.rotateZ}deg) translateZ(${state.depth}px)`
    : undefined;
}

export function getIconHoverVariant(
  hoverEffect: IconHoverEffect,
  color: string,
): MotionTarget {
  switch (hoverEffect) {
    case "scale":
      return { scale: 1.12 };
    case "rotate":
      return { rotate: 180 };
    case "shake":
      return { x: [0, -5, 5, -5, 5, 0] };
    case "glow":
      return { filter: `drop-shadow(0 0 10px ${color})` };
    case "3d-tilt":
      return { rotateX: 12, rotateY: -12 };
    default:
      return {};
  }
}

export function getIconAnimateVariant(state: IconState): MotionTarget {
  switch (state.animationType) {
    case "spin":
      return { rotate: 360 };
    case "pulse":
      return { scale: [1, 1.1, 1] };
    case "bounce":
      return { y: [0, -16, 0] };
    case "wiggle":
      return { rotate: [0, -10, 10, -10, 10, 0] };
    case "float":
      return { y: [0, -8, 0] };
    case "tada":
      return { scale: [1, 0.95, 1.05, 1], rotate: [0, -3, 3, 0] };
    case "flash":
      return { opacity: [1, 0.4, 1] };
    case "jello":
      return { skewX: [0, -8, 6, -4, 2, 0], skewY: [0, 3, -2, 1, 0] };
    case "rubberBand":
      return {
        scaleX: [1, 1.2, 0.95, 1.05, 1],
        scaleY: [1, 0.9, 1.05, 0.98, 1],
      };
    default:
      return {};
  }
}

export function getIconEntranceInitial(
  entranceAnimation: IconEntranceAnimation,
): MotionTarget | undefined {
  switch (entranceAnimation) {
    case "fade":
      return { opacity: 0 };
    case "zoom":
      return { opacity: 0, scale: 0.84 };
    case "slide-up":
      return { opacity: 0, y: 20 };
    case "slide-down":
      return { opacity: 0, y: -20 };
    case "rotate-in":
      return { opacity: 0, rotate: -24, scale: 0.92 };
    default:
      return undefined;
  }
}

export function getIconEntranceAnimate(
  entranceAnimation: IconEntranceAnimation,
): MotionTarget {
  if (entranceAnimation === "none") return {};
  return { opacity: 1, scale: 1, y: 0, rotate: 0 };
}

export function resolveIconRole(state: IconState) {
  if (state.ariaHidden || state.ariaRole === "none") return undefined;
  return state.ariaRole;
}
