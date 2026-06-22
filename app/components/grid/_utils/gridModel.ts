import type { CSSProperties } from "react";
import type { GridElement, GridItemAlignment, GridLayoutVariant, GridRole, GridState } from "../types";

const IMPLIED_ROLES: Partial<Record<GridElement, GridRole>> = {
  main: "main",
  header: "banner",
  footer: "contentinfo",
  nav: "navigation",
};

export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function getLayoutVariant(state: GridState): GridLayoutVariant {
  return state.layoutVariant ?? "balanced";
}

export function getGridItems(state: GridState) {
  const count = clampNumber(state.itemCount, 1, 24);
  return Array.from({ length: count }, (_, index) => index + 1);
}

export function getTemplateColumns(state: GridState) {
  const columns = clampNumber(state.columns, 1, 8);
  const min = clampNumber(state.itemMin, 80, 320);

  if (state.autoMode === "fixed") return `repeat(${columns}, minmax(0, 1fr))`;

  return `repeat(auto-${state.autoMode}, minmax(${min}px, 1fr))`;
}

export function getTemplateRows(state: GridState) {
  const rows = clampNumber(state.rows, 1, 8);
  const min = Math.max(72, Math.round(clampNumber(state.itemMin, 80, 320) * 0.58));

  return `repeat(${rows}, minmax(${min}px, auto))`;
}

export function getGridRole(state: GridState) {
  return IMPLIED_ROLES[state.element] === state.role ? undefined : state.role;
}

export function getGridAriaLabel(state: GridState) {
  return state.landmarkLabel || undefined;
}

export function getAlignment(value: GridItemAlignment | undefined): GridItemAlignment {
  return value ?? "stretch";
}

export function getShellStyle(state: GridState, hovered = false): CSSProperties {
  return {
    width: state.width,
    maxWidth: "100%",
    minHeight: state.height,
    margin: state.margin,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${hovered && state.hoverEnabled ? state.hoverBorder : state.border}`,
    boxShadow: hovered && state.hoverEnabled ? state.hoverShadow : `0 ${Math.round(state.shadowBlur / 3)}px ${state.shadowBlur}px rgba(0,0,0,.28)`,
    background: hovered && state.hoverEnabled ? state.hoverBg : state.background,
    color: state.foreground,
    fontFamily: state.fontBucket === "google" ? `"${state.googleFontFamily}", sans-serif` : "inherit",
    display: "grid",
    gridTemplateColumns: getTemplateColumns(state),
    gridTemplateRows: getTemplateRows(state),
    gridAutoFlow: state.dense ? "row dense" : "row",
    gap: state.gap,
    justifyItems: getAlignment(state.justifyItems),
    alignItems: getAlignment(state.alignItems),
    alignContent: "start",
    transition: state.transitionDuration > 0 ? `gap ${state.transitionDuration}ms ${state.transitionEasing}, background ${state.transitionDuration}ms ${state.transitionEasing}` : "none",
  };
}

export function getItemStyle(state: GridState, item: number): CSSProperties {
  const columns = clampNumber(state.columns, 1, 8);
  const variant = getLayoutVariant(state);
  const canSpan = columns > 1;
  const spanTwo = canSpan ? "span 2" : "span 1";
  const style: CSSProperties = {
    minHeight: Math.max(64, Math.round(state.itemMin * 0.54)),
    borderRadius: Math.max(10, Math.round(state.radius * 0.5)),
    border: `${Math.max(1, state.borderWidth)}px solid ${state.border}`,
    background: "rgba(255,255,255,.075)",
    padding: Math.max(12, Math.round(state.padding * 0.45)),
    display: "grid",
    alignContent: "space-between",
    gap: Math.max(8, Math.round(state.gap * 0.45)),
  };

  if (variant === "feature" && item === 1) {
    style.gridColumn = spanTwo;
    style.gridRow = "span 2";
  } else if (variant === "mosaic" && item % 5 === 1) {
    style.gridColumn = spanTwo;
  } else if (variant === "dashboard" && item % 3 === 0) {
    style.gridRow = "span 2";
  }

  return style;
}
