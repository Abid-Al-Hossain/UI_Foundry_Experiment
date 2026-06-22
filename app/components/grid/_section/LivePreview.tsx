"use client";

import { useState } from "react";
import type { GridState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { getGridAriaLabel, getGridItems, getGridRole, getItemStyle, getLayoutVariant, getShellStyle } from "../_utils/gridModel";

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

export default function LivePreview({ state }: { state: GridState }) {
  const Element = state.element;
  const role = getGridRole(state);
  const items = getGridItems(state);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Element
      id={state.id || undefined}
      role={role}
      aria-label={getGridAriaLabel(state)}
      tabIndex={state.tabIndex}
      style={getShellStyle(state, isHovered)}
      data-layout-variant={getLayoutVariant(state)}
      data-testid="live-preview-grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight, lineHeight: 1.1 }}>{state.title}</h3>
        <p className="mt-2" style={{ color: state.muted, fontSize: state.bodySize, lineHeight: 1.55 }}>
          {state.description}
        </p>
      </div>
      {items.map((item) => (
        <article key={item} style={getItemStyle(state, item)} aria-label={`Grid item ${item}`} data-grid-cell="">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: state.accent }}>
            Item {item}
          </span>
          <span style={{ color: state.foreground, fontSize: state.bodySize, fontWeight: state.fontWeight }}>
            {getLayoutVariant(state)} cell
          </span>
          <span className="text-xs" style={{ color: state.muted }}>
            {state.autoMode} / min {state.itemMin}px
          </span>
        </article>
      ))}
    </Element>
  );
}
