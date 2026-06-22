"use client";

import { useState, type CSSProperties } from "react";
import type { FlexState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

const flexAlign = (value: FlexState["align"]) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
const flexJustify = (value: FlexState["justify"]) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;

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

function box(state: FlexState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, margin: state.margin, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`, boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, transition: state.transitionDuration > 0 ? "gap 0.2s ease, background 0.2s ease" : "none" };
}

export default function LivePreview({ state }: { state: FlexState }) {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = state.role === "presentation" || state.role === "group" || state.role === "region" ? state.role : undefined;
  const items = Array.from({ length: state.itemCount }, (_, index) => index + 1);
  const [isHovered, setIsHovered] = useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const style = box(state);
  const finalStyle: CSSProperties = {
    ...style,
    background: hovered ? state.hoverBg : style.background,
    borderColor: hovered ? state.hoverBorder : state.border,
    boxShadow: hovered ? state.hoverShadow : style.boxShadow,
  };
  return <Element id={state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={finalStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><div style={{ display: "grid", gap: Math.max(8, state.gap / 2), marginBottom: state.gap }}><h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3><p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p></div><div style={{ display: "flex", flexDirection: state.direction, flexWrap: state.wrap, justifyContent: flexJustify(state.justify), alignItems: flexAlign(state.align), gap: state.gap }}>{items.map((item) => <div key={item} style={{ minWidth: 82, minHeight: 56, display: "grid", placeItems: "center", flex: state.wrap === "nowrap" ? "0 0 auto" : "1 1 96px", borderRadius: Math.max(10, state.radius / 2), border: `1px solid ${state.border}`, background: "rgba(255,255,255,.08)", color: state.foreground }}>Item {item}</div>)}</div></Element>;
}
