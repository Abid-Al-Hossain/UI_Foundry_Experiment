import type { FlexState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: FlexState, fileName = "flex") : ExportPayload {
  return { fileName: `${fileName || "flex"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: FlexState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }

const flexAlign = (value) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;
const flexJustify = (value) => value === "start" ? "flex-start" : value === "end" ? "flex-end" : value;

export default function FlexComponent() {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = ["presentation", "group", "region"].includes(state.role) ? state.role : undefined;
  const items = Array.from({ length: state.itemCount }, (_, index) => index + 1);
  const [isHovered, setIsHovered] = React.useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const style = {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    margin: state.margin,
    borderRadius: state.radius,
    border: state.borderWidth + "px " + state.borderStyle + " " + (hovered ? state.hoverBorder : state.border),
    boxShadow: hovered ? state.hoverShadow : buildShadow(state),
    background: hovered ? state.hoverBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none"
  };

  return (
    <Element id={state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={style} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div style={{ display: "grid", gap: Math.max(8, state.gap / 2), marginBottom: state.gap }}>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div style={{ display: "flex", flexDirection: state.direction, flexWrap: state.wrap, justifyContent: flexJustify(state.justify), alignItems: flexAlign(state.align), gap: state.gap }}>
        {items.map((item) => (
          <div key={item} style={{ minWidth: 82, minHeight: 56, display: "grid", placeItems: "center", flex: state.wrap === "nowrap" ? "0 0 auto" : "1 1 96px", borderRadius: Math.max(10, state.radius / 2), border: "1px solid " + state.border, background: "rgba(255,255,255,.08)", color: state.foreground }}>
            Item {item}
          </div>
        ))}
      </div>
    </Element>
  );
}
`;
}
