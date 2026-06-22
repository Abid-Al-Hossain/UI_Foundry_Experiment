"use client";

import { useState, type CSSProperties } from "react";
import type { FilterPanelState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

const CATEGORY_OPTIONS = ["Analytics", "Billing", "Customers", "Inventory", "Regions", "Teams", "Risk", "Lifecycle"];
const TOGGLE_OPTIONS = ["In stock", "On sale", "Verified", "Recently updated", "High priority", "Has notes", "Requires review", "Archived"];

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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function shell(state: FilterPanelState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    display: "grid",
    gap: state.gap,
    padding: state.padding,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: `${buildShadow(state)}`,
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? 0.58 : 1,
  };
}

export default function LivePreview({ state }: { state: FilterPanelState }) {
  const groupCount = clamp(state.groupCount, 1, 8);
  const filterCount = clamp(state.filterCount, 1, 16);
  const categories = CATEGORY_OPTIONS.slice(0, groupCount);
  const toggles = TOGGLE_OPTIONS.slice(0, Math.max(2, Math.min(filterCount - 3, TOGGLE_OPTIONS.length)));
  const appliedCount = clamp(state.appliedCount, 0, categories.length);
  const describedBy = `${state.id}-description ${state.id}-helper`;
  const [chipHover, setChipHover] = useState(-1);
  const [removeHover, setRemoveHover] = useState(-1);
  const [applyHover, setApplyHover] = useState(false);
  const [resetHover, setResetHover] = useState(false);
  const fieldsetStyle: CSSProperties = {
    display: "grid",
    gap: 10,
    margin: 0,
    padding: 14,
    border: `1px solid ${state.groupDividerColor}`,
    borderRadius: Math.max(12, state.radius - 8),
    transition: state.transitionDuration > 0 ? "border-color 0.2s ease, opacity 0.2s ease" : "none",
  };
  const legendStyle: CSSProperties = { color: state.groupHeaderColor, fontSize: state.groupHeaderSize, fontWeight: 600 };
  const labelStyle: CSSProperties = { display: "grid", gap: 6, color: state.foreground, fontSize: state.bodySize };
  const controlStyle: CSSProperties = {
    width: "100%",
    border: `1px solid ${state.border}`,
    borderRadius: 12,
    padding: "10px 12px",
    background: "transparent",
    color: state.foreground,
  };

  return (
    <form id={state.id} role={state.role} aria-label={state.ariaLabel} aria-describedby={describedBy} onSubmit={(event) => event.preventDefault()} style={shell(state)}>
      <header className="grid gap-1.5" style={{ background: state.panelHeaderBg, borderBottom: `1px solid ${state.panelHeaderBorder}`, paddingBottom: 12 }}>
        <div className="flex items-center justify-between gap-3">
          <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
          {appliedCount > 0 ? <span className="grid place-items-center rounded-full px-2 text-xs font-bold" style={{ minWidth: 22, height: 22, background: state.badgeCountBg, color: state.badgeCountText }}>{appliedCount}</span> : null}
        </div>
        <p id={`${state.id}-description`} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>{state.label} search{state.collapseEnabled ? " ▾" : ""}</legend>
        <label htmlFor={`${state.id}-query`} style={labelStyle}>
          Search keywords
          <input id={`${state.id}-query`} name="query" type="search" placeholder="Search by name, owner, or tag" aria-describedby={`${state.id}-query-help`} disabled={state.disabled} style={controlStyle} />
        </label>
        <p id={`${state.id}-query-help`} style={{ margin: 0, color: state.muted, fontSize: 12 }}>Use text search before narrowing categories or ranges.</p>
      </fieldset>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Categories{state.collapseEnabled ? " ▾" : ""}</legend>
        <label htmlFor={`${state.id}-category`} style={labelStyle}>
          Category
          <select id={`${state.id}-category`} name="category" defaultValue={categories[0]} disabled={state.disabled} style={controlStyle}>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        {state.showChips && (
          <div aria-label="Applied filters" className="flex flex-wrap gap-2">
            {categories.slice(0, appliedCount).map((category, index) => (
              <span
                key={category}
                className="inline-flex items-center gap-1.5 border px-3 py-1 text-xs"
                onMouseEnter={() => setChipHover(index)}
                onMouseLeave={() => setChipHover(-1)}
                style={{ borderRadius: state.chipRadius, borderColor: state.chipBorder, color: state.chipText, background: chipHover === index ? state.chipHoverBg : state.chipBg, transition: state.transitionDuration > 0 ? "background 0.15s ease, border-color 0.15s ease" : "none" }}
              >
                {category}
                <span
                  role="button"
                  aria-label={`Remove ${category}`}
                  onMouseEnter={() => setRemoveHover(index)}
                  onMouseLeave={() => setRemoveHover(-1)}
                  className="grid place-items-center rounded-full"
                  style={{ width: 16, height: 16, color: state.chipRemoveColor, background: removeHover === index ? state.chipRemoveHoverBg : "transparent" }}
                >
                  <svg aria-hidden="true" width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </span>
              </span>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Range and toggles{state.collapseEnabled ? " ▾" : ""}</legend>
        <label htmlFor={`${state.id}-range`} style={labelStyle}>
          Minimum match score
          <input id={`${state.id}-range`} name="score" type="range" min="0" max="100" defaultValue="62" aria-describedby={`${state.id}-range-help`} disabled={state.disabled} />
        </label>
        <p id={`${state.id}-range-help`} style={{ margin: 0, color: state.muted, fontSize: 12 }}>Higher values reduce results to stronger matches.</p>
        <div className="grid gap-2">
          {toggles.map((option, index) => (
            <label key={option} className="flex items-center gap-2">
              <input name="flags" type="checkbox" value={option} defaultChecked={index < appliedCount} disabled={state.disabled} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor={`${state.id}-sort`} style={labelStyle}>
        Sort results
        <select id={`${state.id}-sort`} name="sort" defaultValue="relevance" disabled={state.disabled} style={controlStyle}>
          <option value="relevance">Relevance</option>
          <option value="newest">Newest first</option>
          <option value="priority">Priority</option>
        </select>
      </label>

      {state.showApplyReset && (
        <div className="flex flex-wrap gap-2.5">
          <button type="submit" disabled={state.disabled} onMouseEnter={() => setApplyHover(true)} onMouseLeave={() => setApplyHover(false)} className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: applyHover ? state.applyHoverBg : state.applyBg, color: state.applyText, transition: state.transitionDuration > 0 ? "background 0.15s ease, opacity 0.15s ease" : "none" }}>Apply filters</button>
          <button type="reset" disabled={state.disabled} onMouseEnter={() => setResetHover(true)} onMouseLeave={() => setResetHover(false)} className="rounded-xl border px-4 py-2 text-sm" style={{ background: resetHover ? state.resetHoverBg : state.resetBg, borderColor: state.resetBorder, color: state.resetText, transition: state.transitionDuration > 0 ? "border-color 0.15s ease, color 0.15s ease" : "none" }}>Reset filters</button>
        </div>
      )}

      <p id={`${state.id}-helper`} role="status" aria-live="polite" style={{ margin: 0, color: state.muted, fontSize: 12 }}>{state.helper}</p>
    </form>
  );
}
