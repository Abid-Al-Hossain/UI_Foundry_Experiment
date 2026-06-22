"use client";

import { useState, type CSSProperties } from "react";
import type { HeaderState } from "../types";
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

function box(state: HeaderState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.compactOnScroll || state.previewState === "collapsed" ? Math.max(12, Math.round(state.padding * 0.62)) : state.padding,
    margin: state.margin,
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.border}`,
    boxShadow: buildShadow(state),
    background: state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    position: state.sticky ? "sticky" : "relative",
    top: state.sticky ? 0 : undefined,
    transition: state.transitionDuration > 0 ? "all 180ms ease" : undefined,
  };
}

export default function LivePreview({ state }: { state: HeaderState }) {
  const navItems = Array.from({ length: state.navCount }, (_, index) => `Section ${index + 1}`);
  const actions = Array.from({ length: state.actionCount }, (_, index) => (index === 0 ? "Docs" : index === 1 ? "Launch" : `Action ${index + 1}`));
  const [isHovered, setIsHovered] = useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const baseStyle = box(state);
  const style: CSSProperties = {
    ...baseStyle,
    background: hovered ? state.hoverBg : baseStyle.background,
    borderColor: hovered ? state.hoverBorder : state.border,
    boxShadow: hovered ? state.hoverShadow : baseStyle.boxShadow,
  };
  const isMobile = state.previewState === "mobile";
  const navHidden = state.mobileMode === "collapse" && isMobile;

  return (
    <header id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex flex-wrap items-center justify-between" style={{ gap: state.gap }}>
        <a href="#" className="font-semibold" style={{ color: state.foreground, fontSize: state.titleSize, fontWeight: state.fontWeight }}>
          {state.title}
        </a>
        <nav aria-label={`${state.landmarkLabel} links`} className={navHidden ? "hidden" : "flex flex-wrap items-center"} style={{ gap: Math.max(8, state.gap / 2) }}>
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className="rounded-full px-3 py-2 text-sm font-medium"
              style={{
                color: index === 0 || state.previewState === "hover" ? state.foreground : state.muted,
                background: state.previewState === "active" && index === 0 ? state.accent : "transparent",
                outline: state.previewState === "focus" && index === 0 ? `2px solid ${state.accent}` : undefined,
                outlineOffset: 3,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center" style={{ gap: Math.max(8, state.gap / 2) }}>
          {actions.map((action, index) => (
            <a
              key={action}
              href="#"
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: index === actions.length - 1 ? state.accent : "transparent", border: `1px solid ${state.border}`, color: index === actions.length - 1 ? state.background : state.foreground }}
            >
              {action}
            </a>
          ))}
        </div>
      </div>
      <section aria-labelledby={`${state.id}-title`} className="grid" style={{ gap: Math.max(10, state.gap), marginTop: state.gap }}>
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: state.accent }}>Hero slot</p>
        <h1 id={`${state.id}-title`} style={{ fontSize: Math.max(state.titleSize + 12, state.titleSize * 1.45), lineHeight: 1.05, fontWeight: state.fontWeight, maxWidth: 680 }}>
          {state.title}
        </h1>
        <p style={{ color: state.muted, fontSize: state.bodySize, maxWidth: 620 }}>{state.description}</p>
      </section>
    </header>
  );
}
