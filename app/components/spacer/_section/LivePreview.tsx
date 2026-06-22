"use client";

import type { CSSProperties } from "react";
import type { SpacerState } from "../types";
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

function box(state: SpacerState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, margin: state.margin, display: "grid", placeItems: "center", borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`, boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state) };
}

export default function LivePreview({ state }: { state: SpacerState }) {
  const mobileSize = state.mobileSize ?? Math.max(4, Math.round(state.size * 0.6));
  const desktopSize = state.desktopSize ?? state.size;
  const responsiveSize = `clamp(${mobileSize}px, 8vw, ${desktopSize}px)`;
  const spacerStyle: CSSProperties = {
    width: state.axis === "block" ? "100%" : responsiveSize,
    height: state.axis === "inline" ? 1 : responsiveSize,
    minHeight: state.axis === "both" ? responsiveSize : undefined,
    borderRadius: buildRadius(state),
    outline: state.debugVisible ? `1px dashed ${state.accent}` : undefined,
    background: state.debugVisible ? "rgba(255,255,255,.08)" : "transparent",
  };
  const style = box(state);
  return <div id={state.id} role="presentation" aria-hidden={state.decorative || undefined} style={style}><div style={spacerStyle}>{state.debugVisible && <span style={{ display: "grid", placeItems: "center", height: "100%", color: state.muted, fontSize: state.bodySize, fontFamily: resolveFont(state) }}>{state.token}: {mobileSize}-{desktopSize}px</span>}</div></div>;
}
