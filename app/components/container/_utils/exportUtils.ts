import type { ContainerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: ContainerState, fileName = "container") : ExportPayload {
  return { fileName: `${fileName || "container"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: ContainerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


export default function ContainerComponent() {
  const Element = state.element === "hr" ? "div" : state.element;
  const role = ["presentation", "group", "region"].includes(state.role) ? state.role : undefined;
  const [isHovered, setIsHovered] = React.useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const style = {
    width: state.fluid ? "100%" : state.width,
    maxWidth: state.maxWidth,
    minHeight: state.minHeight,
    padding: state.safeArea ? \`max(\${state.padding}px, env(safe-area-inset-left))\` : state.padding,
    marginInline: state.centered ? "auto" : undefined,
    marginBlock: state.margin,
    display: "grid",
    alignContent: "center",
    gap: state.gap,
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
      <div style={{ display: "grid", gap: Math.max(8, state.gap / 2) }}>
        <p style={{ margin: 0, color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{state.element} container</p>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
    </Element>
  );
}
`;
}
