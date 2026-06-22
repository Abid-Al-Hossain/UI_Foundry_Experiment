"use client";

import { useState, type CSSProperties } from "react";
import type { ListState } from "../types";
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

function shell(state: ListState): CSSProperties {
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
    opacity: state.disabled ? 0.6 : 1,
    transition: state.transitionDuration > 0 ? "opacity 200ms ease" : "none",
  };
}

function itemStatus(state: ListState, selected: boolean) {
  if (selected) return "Selected";
  if (state.previewState === "error") return "Needs review";
  if (state.previewState === "success") return "Complete";
  if (state.previewState === "loading") return "Syncing";
  return "Ready";
}

export default function LivePreview({ state }: { state: ListState }) {
  const itemTotal = state.emptyState ? 0 : Math.max(state.itemCount, 1);
  const items = Array.from({ length: itemTotal }, (_, index) => index);
  const selectedIndex = Math.min(Math.max(state.selectedIndex, 0), Math.max(itemTotal - 1, 0));
  const ListTag = state.listMode === "ordered" ? "ol" : "ul";
  const listRole = state.listMode === "menu" || state.listMode === "listbox" ? state.listMode : undefined;
  const itemRole = state.listMode === "menu" ? "menuitem" : state.listMode === "listbox" ? "option" : undefined;
  const panel = shell(state);
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <section
      id={state.id}
      aria-labelledby={`${state.id}-title`}
      aria-describedby={`${state.id}-description ${state.id}-count`}
      tabIndex={state.tabIndex}
      style={panel}
      data-component="list"
      data-preview-state={state.previewState}
    >
      <div className="mb-4">
        <h3 id={`${state.id}-title`} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={`${state.id}-description`} style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        <p id={`${state.id}-count`} className="mt-2 text-xs" style={{ color: state.muted }}>
          {itemTotal} {itemTotal === 1 ? "item" : "items"} in this {state.listMode} list.
        </p>
      </div>
      {state.emptyState ? (
        <p role="status" className="rounded-2xl border p-4 text-sm" style={{ borderColor: state.border, color: state.muted }}>
          {state.helper}
        </p>
      ) : (
        <ListTag role={listRole} aria-label={`${state.ariaLabel}: ${itemTotal} items`} className="grid list-none p-0" style={{ gap: state.gap }}>
          {items.map((index) => {
            const selected = index === selectedIndex;
            const hovered = hoverIndex === index && !selected && !state.disabled;
            const status = itemStatus(state, selected);
            const itemBackground = selected ? state.itemActiveBg : hovered ? state.itemHoverBg : state.itemBg;
            const itemColor = state.disabled ? state.itemDisabledColor : selected ? state.itemSelectedText : hovered ? state.itemHoverText : state.itemText;
            const itemBorderColor = selected ? state.itemSelectedBorder : state.showDividers ? state.dividerColor : "transparent";
            return (
              <li
                key={index}
                role={itemRole}
                aria-selected={state.listMode === "listbox" ? selected : undefined}
                aria-disabled={state.disabled || undefined}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                className="flex items-center gap-3"
                style={{ minHeight: state.itemHeight, padding: state.itemPadding, borderRadius: state.itemRadius, border: `${state.borderWidth}px ${state.dividerStyle} ${itemBorderColor}`, background: itemBackground, color: itemColor, transition: state.transitionDuration > 0 ? "background 200ms ease, border-color 200ms ease, color 200ms ease" : "none" }}
              >
                {state.showAvatars && (
                  <span aria-hidden="true" className="grid place-items-center rounded-full text-sm font-bold" style={{ width: state.avatarSize, height: state.avatarSize, background: selected ? state.accent : state.border, color: state.leadingIconColor }}>
                    {index + 1}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{state.label} {index + 1}</span>
                  <span className="block truncate" style={{ color: state.secondaryTextColor, fontSize: state.secondaryTextSize }}>{state.helper}</span>
                </span>
                <span className="border px-2 py-1 text-xs" style={{ borderRadius: state.badgeRadius, borderColor: state.badgeBorder, background: state.badgeBg, color: state.badgeText }}>
                  {status}
                </span>
              </li>
            );
          })}
        </ListTag>
      )}
    </section>
  );
}
