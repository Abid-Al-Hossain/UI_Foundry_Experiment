"use client";

import type { CSSProperties } from "react";
import type { LayoutDividerState } from "../types";
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

function box(state: LayoutDividerState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, margin: state.margin, display: "grid", placeItems: "center", borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`, boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state) };
}

export default function LivePreview({ state }: { state: LayoutDividerState }) {
  const isVertical = state.orientation === "vertical";
  const separatorRole = state.decorative || state.role === "presentation" ? "presentation" : "separator";
  const style = box(state);
  const lineStyle: CSSProperties = { width: isVertical ? state.thickness : state.length, height: isVertical ? state.length : state.thickness, borderRadius: 999, background: state.accent, transition: state.transitionDuration > 0 ? "opacity 0.3s ease" : "none" };
  return <div id={state.id} style={style}><div aria-hidden={state.decorative || undefined} style={{ display: "flex", flexDirection: isVertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: state.gap, padding: state.inset }}><div role={separatorRole} aria-orientation={separatorRole === "separator" ? state.orientation : undefined} aria-label={separatorRole === "separator" ? state.contentLabel || state.landmarkLabel : undefined} style={lineStyle} />{state.contentLabel && <span style={{ color: state.foreground, fontSize: state.bodySize, fontWeight: state.fontWeight }}>{state.contentLabel}</span>}<div aria-hidden="true" style={lineStyle} /></div></div>;
}
