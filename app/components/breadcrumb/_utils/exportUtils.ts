import type { BreadcrumbState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: BreadcrumbState, fileName = "breadcrumb"): ExportPayload {
  return { fileName: `${fileName || "breadcrumb"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: BreadcrumbState) {
  const transition = state.transitionDuration > 0 ? `color ${state.transitionDuration}ms ${state.transitionEasing}` : "none";
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }

const labels = ["Home", "Products", "Components", "Navigation", "Breadcrumb", "Current page"];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function separatorFor(value) {
  if (value === "chevron") return ">";
  if (value === "dot") return ".";
  if (value === "pipe") return "|";
  return "/";
}

function visibleCrumbs(items, mode) {
  if (items.length <= 5 || mode === "none") return items;
  if (mode === "start") return [{ index: -1, label: "...", collapsed: true }, ...items.slice(-4)];
  if (mode === "end") return [...items.slice(0, 4), { index: -1, label: "...", collapsed: true }];
  return [items[0], { index: -1, label: "...", collapsed: true }, ...items.slice(-3)];
}

export default function BreadcrumbComponent() {
  const count = clamp(state.itemCount, 1, 14);
  const currentIndex = clamp(state.currentIndex, 0, count - 1);
  const items = Array.from({ length: count }, (_, index) => ({
    index,
    label: labels[index] || "Level " + (index + 1),
  }));
  const crumbs = visibleCrumbs(items, state.collapseMode);
  const separator = separatorFor(state.separator);

  return (
    <nav
      id={state.id}
      aria-label={state.ariaLabel}
      style={{
        width: state.width,
        minHeight: state.height,
        padding: state.padding,
        borderRadius: state.radius,
        border: state.borderWidth + "px " + state.borderStyle + " " + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border),
        boxShadow: buildShadow(state),
        background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
        color: state.foreground,
        fontFamily: resolveFont(state),
        opacity: state.disabled ? (state.disabledOpacity ?? 0.5) : 1,
cursor: state.disabled ? state.disabledCursor : undefined,
      }}
    >
      <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
        {crumbs.map((crumb, position) => {
          const isCurrent = crumb.index === currentIndex;
          return (
            <li key={crumb.index + "-" + position} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              {position > 0 && <span aria-hidden="true" style={{ color: state.separatorColor, transition: "${transition}" }}>{separator}</span>}
              {crumb.collapsed ? (
                <span aria-label="Collapsed breadcrumb levels" style={{ padding: "4px 12px", border: "1px solid " + state.collapsedBorder, borderRadius: 999, color: state.collapsedColor }}>...</span>
              ) : isCurrent ? (
                <span aria-current={state.ariaCurrent} style={{ maxWidth: 224, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "4px 12px", borderRadius: 999, background: state.currentBg, color: state.currentText, fontWeight: 800 }}>
                  {state.showIcons ? <span aria-hidden="true"># </span> : null}{crumb.label}
                </span>
              ) : (
                <a href={"#breadcrumb-" + (crumb.index + 1)} style={{ maxWidth: 192, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "4px 12px", border: "1px solid " + state.linkBorder, borderRadius: 999, color: state.linkColor, textDecoration: "none", transition: "${transition}" }}>
                  {state.showIcons ? <span aria-hidden="true"># </span> : null}{crumb.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
`;
}
