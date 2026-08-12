"use client";

import { useState } from "react";
import type { GridState } from "../types";
import { getGridAriaLabel, getGridItems, getGridRole, getItemStyle, getLayoutVariant, getShellStyle } from "../_utils/gridModel";

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
