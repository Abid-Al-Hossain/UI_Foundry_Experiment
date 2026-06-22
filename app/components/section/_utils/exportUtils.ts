import type { SectionState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: SectionState, fileName = "section") : ExportPayload {
  return { fileName: `${fileName || "section"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: SectionState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


export default function SectionComponent() {
  const Element = state.element === "hr" ? "section" : state.element;
  const Heading = state.headingLevel;
  const role = ["presentation", "group", "region"].includes(state.role) ? state.role : undefined;
  const [isHovered, setIsHovered] = React.useState(false);
  const hovered = state.hoverEnabled && isHovered;
  const style = {
    width: state.width,
    minHeight: state.height,
    paddingBlock: state.verticalRhythm,
    paddingInline: state.padding,
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
    <Element id={state.anchorId || state.id} role={role} aria-label={state.landmarkLabel || undefined} tabIndex={state.tabIndex} style={style} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div style={{ maxWidth: state.contentWidth, marginInline: "auto", display: "grid", gap: state.gap }}>
        <Heading style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</Heading>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize, lineHeight: 1.65 }}>{state.description}</p>
        <div aria-hidden="true" style={{ height: 4, width: 96, borderRadius: 999, background: state.accent }} />
      </div>
    </Element>
  );
}
`;
}
