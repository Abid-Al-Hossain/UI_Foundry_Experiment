"use client";

import { useState, type CSSProperties } from "react";
import type { SidebarState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

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

function box(state: SidebarState): CSSProperties {
  const collapsed = state.collapsed || state.previewState === "collapsed";
  return {
    width: collapsed ? state.railWidth : state.width,
    minHeight: state.height,
    padding: collapsed ? Math.max(10, Math.round(state.padding * 0.55)) : state.padding,
    margin: state.margin,
    gap: state.gap,
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
    marginLeft: state.side === "right" ? "auto" : state.margin,
    transition: state.transitionDuration > 0 ? "all 180ms ease" : undefined,
  };
}

export default function LivePreview({ state }: { state: SidebarState }) {
  const collapsed = state.collapsed || state.previewState === "collapsed";
  const groupCount = Math.max(1, state.nestedGroups);
  const items = Array.from({ length: state.itemCount }, (_, index) => `Item ${index + 1}`);
  const groups = Array.from({ length: groupCount }, (_, index) => ({
    title: `Group ${index + 1}`,
    items: items.filter((_, itemIndex) => itemIndex % groupCount === index),
  }));
  const style = box(state);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <aside id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>
      <div className="flex items-center justify-between" style={{ gap: state.gap }}>
        <a href="#" className="font-semibold" style={{ color: state.foreground, fontSize: collapsed ? state.bodySize : state.titleSize, fontWeight: state.fontWeight }}>
          {collapsed ? state.title.slice(0, 1) : state.title}
        </a>
        <button type="button" aria-expanded={!collapsed} className="rounded-full border px-2 py-1 text-xs" style={{ borderColor: state.border, color: state.collapseIconColor }}>
          {collapsed ? "Open" : "Collapse"}
        </button>
      </div>
      {!collapsed && <p style={{ color: state.muted, fontSize: state.bodySize, marginTop: Math.max(8, state.gap / 2) }}>{state.description}</p>}
      <nav
        aria-label={`${state.landmarkLabel} groups`}
        className="grid overflow-y-auto"
        style={{
          gap: state.gap,
          marginTop: state.gap,
          maxHeight: "100%",
          scrollbarColor: `${state.scrollbarThumb} ${state.scrollbarBg}`,
        }}
      >
        {groups.map((group, groupIndex) => (
          <section key={group.title} aria-labelledby={`${state.id}-group-${groupIndex}`} className="grid" style={{ gap: Math.max(6, state.gap / 2) }}>
            {groupIndex > 0 && <div aria-hidden="true" style={{ height: 1, background: state.groupDividerColor, marginBottom: Math.max(6, state.gap / 2) }} />}
            <button
              id={`${state.id}-group-${groupIndex}`}
              type="button"
              aria-expanded={groupIndex === 0 || state.previewState !== "overflow"}
              className="rounded-xl px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: state.groupHeaderColor, background: "rgba(255,255,255,.04)" }}
            >
              {collapsed ? groupIndex + 1 : group.title}
            </button>
            {(groupIndex === 0 || state.previewState !== "overflow") && group.items.map((item, itemIndex) => {
              const active = groupIndex === 0 && itemIndex === 0;
              const key = `${groupIndex}-${itemIndex}`;
              const isHovered = hoveredKey === key || (state.previewState === "hover" && groupIndex === 0 && itemIndex === 0);
              const showBadge = groupIndex === 0 && itemIndex === 1;
              return (
                <a
                  key={item}
                  href="#"
                  aria-current={active ? "page" : undefined}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium"
                  style={{
                    color: active ? state.activeItemText : isHovered ? state.hoverItemText : state.muted,
                    background: active ? state.activeItemBg : isHovered ? state.hoverItemBg : "transparent",
                    border: `1px solid ${active ? state.activeItemBorder : "transparent"}`,
                    outline: state.previewState === "focus" && active ? `2px solid ${state.accent}` : undefined,
                    outlineOffset: 3,
                    textAlign: collapsed ? "center" : "left",
                  }}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey((current) => (current === key ? null : current))}
                >
                  <span>{collapsed ? item.replace("Item ", "") : item}</span>
                  {!collapsed && showBadge && (
                    <span aria-hidden="true" style={{ minWidth: 18, height: 18, padding: "0 5px", display: "grid", placeItems: "center", borderRadius: 999, fontSize: 10, fontWeight: 700, background: state.badgeCountBg, color: state.badgeCountText }}>
                      3
                    </span>
                  )}
                </a>
              );
            })}
          </section>
        ))}
      </nav>
    </aside>
  );
}
