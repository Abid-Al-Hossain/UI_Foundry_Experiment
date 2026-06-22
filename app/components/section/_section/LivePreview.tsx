"use client";

import { useState, type CSSProperties } from "react";
import type { SectionState } from "../types";
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

function box(state: SectionState): CSSProperties {
  return { width: state.width, minHeight: state.height, paddingBlock: state.verticalRhythm, paddingInline: state.padding, margin: state.margin, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`, boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, transition: state.transitionDuration > 0 ? "background 0.2s ease, padding 0.2s ease" : "none" };
}

export default function LivePreview({ state }: { state: SectionState }) {
  const Element = state.element === "hr" ? "section" : state.element;
  const Heading = state.headingLevel;
  const role = state.role === "presentation" || state.role === "group" || state.role === "region" ? state.role : undefined;
  const [isHovered, setIsHovered] = useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const style = box(state);
  const finalStyle: CSSProperties = {
    ...style,
    background: hovered ? state.hoverBg : style.background,
    borderColor: hovered ? state.hoverBorder : state.border,
    boxShadow: hovered ? state.hoverShadow : style.boxShadow,
  };
  return <Element id={state.anchorId || state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={finalStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><div style={{ maxWidth: state.contentWidth, marginInline: "auto", display: "grid", gap: state.gap }}><Heading style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</Heading><p style={{ margin: 0, color: state.muted, fontSize: state.bodySize, lineHeight: 1.65 }}>{state.description}</p><div aria-hidden="true" style={{ height: 4, width: 96, borderRadius: 999, background: state.accent }} /></div></Element>;
}
