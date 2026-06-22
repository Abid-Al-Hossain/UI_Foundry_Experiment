"use client";

import type { CSSProperties } from "react";
import type { BreadcrumbState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

type CrumbItem = { index: number; label: string; collapsed?: boolean };

const FALLBACK_LABELS = ["Home", "Products", "Components", "Navigation", "Breadcrumb", "Current page"];

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function shell(state: BreadcrumbState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function separatorFor(value: string) {
  if (value === "chevron") return ">";
  if (value === "dot") return ".";
  if (value === "pipe") return "|";
  return "/";
}

function visibleCrumbs(items: CrumbItem[], mode: string): CrumbItem[] {
  if (items.length <= 5 || mode === "none") return items;
  if (mode === "start") return [{ index: -1, label: "...", collapsed: true }, ...items.slice(-4)];
  if (mode === "end") return [...items.slice(0, 4), { index: -1, label: "...", collapsed: true }];
  return [items[0], { index: -1, label: "...", collapsed: true }, ...items.slice(-3)];
}

export default function LivePreview({ state }: { state: BreadcrumbState }) {
  const count = clamp(state.itemCount, 1, 14);
  const currentIndex = clamp(state.currentIndex, 0, count - 1);
  const items = Array.from({ length: count }, (_, index) => ({
    index,
    label: FALLBACK_LABELS[index] ?? `Level ${index + 1}`,
  }));
  const crumbs = visibleCrumbs(items, state.collapseMode);
  const separator = separatorFor(state.separator);

  return (
    <nav id={state.id} aria-label={state.ariaLabel} style={shell(state)} className="grid content-center gap-4">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, position) => {
          const isCurrent = crumb.index === currentIndex;
          return (
            <li key={`${crumb.index}-${position}`} className="flex items-center gap-2 text-sm">
              {position > 0 && <span aria-hidden="true" style={{ color: state.separatorColor, transition: state.transitionDuration > 0 ? "color 0.2s ease" : "none" }}>{separator}</span>}
              {crumb.collapsed ? (
                <span aria-label="Collapsed breadcrumb levels" className="rounded-full border px-3 py-1" style={{ borderColor: state.collapsedBorder, color: state.collapsedColor }}>...</span>
              ) : isCurrent ? (
                <span aria-current={state.ariaCurrent} className="max-w-[14rem] truncate rounded-full px-3 py-1 font-bold" style={{ background: state.currentBg, color: state.currentText }}>
                  {state.showIcons && <span aria-hidden="true"># </span>}
                  {crumb.label}
                </span>
              ) : (
                <a href={`#breadcrumb-${crumb.index + 1}`} className="max-w-[12rem] truncate rounded-full border px-3 py-1" style={{ borderColor: state.linkBorder, color: state.linkColor, transition: state.transitionDuration > 0 ? "color 0.2s ease, border-color 0.2s ease" : "none" }}>
                  {state.showIcons && <span aria-hidden="true"># </span>}
                  {crumb.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-xs" style={{ color: state.muted }}>
        Ordered-list breadcrumb with aria-current {state.ariaCurrent}, aria-hidden separators, and {state.collapseMode} collapsing.
      </p>
    </nav>
  );
}
