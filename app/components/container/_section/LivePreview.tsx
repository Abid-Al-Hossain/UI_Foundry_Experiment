"use client";

import { useState, type CSSProperties } from "react";
import type { ContainerState } from "../types";
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

function box(state: ContainerState): CSSProperties {
  return { width: state.fluid ? "100%" : state.width, maxWidth: state.maxWidth, minHeight: state.minHeight, padding: state.safeArea ? `max(${state.padding}px, env(safe-area-inset-left))` : state.padding, marginInline: state.centered ? "auto" : undefined, marginBlock: state.margin, display: "grid", alignContent: "center", gap: state.gap, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`, boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, transition: state.transitionDuration > 0 ? "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease" : "none" };
}

export default function LivePreview({ state }: { state: ContainerState }) {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = state.role === "presentation" || state.role === "group" || state.role === "region" ? state.role : undefined;
  const [isHovered, setIsHovered] = useState(false);
  const style = box(state);
  const hovered = state.hoverEnabled && isHovered;
  const finalStyle: CSSProperties = {
    ...style,
    background: hovered ? state.hoverBg : style.background,
    borderColor: hovered ? state.hoverBorder : state.border,
    boxShadow: hovered ? state.hoverShadow : style.boxShadow,
  };
  return <Element id={state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={finalStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><div style={{ display: "grid", gap: Math.max(8, state.gap / 2) }}><p style={{ margin: 0, color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{state.element} container</p><h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3><p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p></div></Element>;
}
