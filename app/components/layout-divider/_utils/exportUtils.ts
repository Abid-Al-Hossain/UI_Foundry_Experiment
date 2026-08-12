import type { LayoutDividerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: LayoutDividerState, fileName = "layout-divider") : ExportPayload {
  return { fileName: `${fileName || "layout-divider"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: LayoutDividerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
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
    borderRadius: state.radiusLinked ? state.radius : state.radiusTL + "px " + state.radiusTR + "px " + state.radiusBR + "px " + state.radiusBL + "px",
    border: state.borderWidth + "px " + state.borderStyle + " " + state.border,
    boxShadow: buildShadow(state),
    background: state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: state.letterSpacing + state.letterSpacingUnit,
    lineHeight: state.lineHeight
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
