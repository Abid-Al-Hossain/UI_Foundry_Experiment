import type { SpacerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: SpacerState, fileName = "spacer") : ExportPayload {
  return { fileName: `${fileName || "spacer"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: SpacerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
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
    borderRadius: state.radius,
    border: state.borderWidth + "px " + state.borderStyle + " " + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border),
    boxShadow: buildShadow(state),
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily
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
        {state.debugVisible && <span style={{ display: "grid", placeItems: "center", height: "100%", color: state.muted, fontSize: state.bodySize, fontFamily: state.fontFamily }}>{state.token}: {mobileSize}-{desktopSize}px</span>}
      </div>
    </div>
  );
}
`;
}
