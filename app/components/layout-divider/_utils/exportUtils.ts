import type { LayoutDividerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: LayoutDividerState, fileName = "layout-divider") : ExportPayload {
  return { fileName: `${fileName || "layout-divider"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: LayoutDividerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


export default function LayoutDividerComponent() {
  const isVertical = state.orientation === "vertical";
  const separatorRole = state.decorative || state.role === "presentation" ? "presentation" : "separator";
  const wrapperStyle = {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    margin: state.margin,
    display: "grid",
    placeItems: "center",
    borderRadius: state.radius,
    border: state.borderWidth + "px " + state.borderStyle + " " + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border),
    boxShadow: buildShadow(state),
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily
  };
  const lineStyle = {
    width: isVertical ? state.thickness : state.length,
    height: isVertical ? state.length : state.thickness,
    borderRadius: 999,
    background: state.accent,
    transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none"
  };

  return (
    <div id={state.id} style={wrapperStyle}>
      <div aria-hidden={state.decorative || undefined} style={{ display: "flex", flexDirection: isVertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: state.gap, padding: state.inset }}>
        <div role={separatorRole} aria-orientation={separatorRole === "separator" ? state.orientation : undefined} aria-label={separatorRole === "separator" ? state.contentLabel || state.landmarkLabel : undefined} style={lineStyle} />
        {state.contentLabel && <span style={{ color: state.foreground, fontSize: state.bodySize, fontWeight: state.fontWeight }}>{state.contentLabel}</span>}
        <div aria-hidden="true" style={lineStyle} />
      </div>
    </div>
  );
}
`;
}
