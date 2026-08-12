import type { SpacerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: SpacerState, fileName = "spacer") : ExportPayload {
  return { fileName: `${fileName || "spacer"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: SpacerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


export default function SpacerComponent() {
  const mobileSize = state.mobileSize ?? Math.max(4, Math.round(state.size * 0.6));
  const desktopSize = state.desktopSize ?? state.size;
  const responsiveSize = \`clamp(\${mobileSize}px, 8vw, \${desktopSize}px)\`;
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
  const spacerStyle = {
    width: state.axis === "block" ? "100%" : responsiveSize,
    height: state.axis === "inline" ? 1 : responsiveSize,
    minHeight: state.axis === "both" ? responsiveSize : undefined,
    borderRadius: state.radius,
    outline: state.debugVisible ? "1px dashed " + state.accent : undefined,
    background: state.debugVisible ? "rgba(255,255,255,.08)" : "transparent"
  };

  return (
    <div id={state.id} role="presentation" aria-hidden={state.decorative || undefined} style={wrapperStyle}>
      <div style={spacerStyle}>
        {state.debugVisible && <span style={{ display: "grid", placeItems: "center", height: "100%", color: state.muted, fontSize: state.bodySize, fontFamily: resolveFont(state) }}>{state.token}: {mobileSize}-{desktopSize}px</span>}
      </div>
    </div>
  );
}
`;
}
