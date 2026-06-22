"use client";

import { useState, type CSSProperties } from "react";
import type { SelectStudioState } from "../types";
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

function shellStyle(state: SelectStudioState): CSSProperties {
  const invalid = state.invalid || state.previewState === "invalid";
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px solid ${invalid ? state.errorColor : state.previewState === "focus" ? state.accent : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled || state.previewState === "disabled" ? 0.55 : 1,
    outline: state.previewState === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transition: state.transitionDuration > 0 ? "all 180ms ease" : "none",
  };
}

export default function LivePreview({ state }: { state: SelectStudioState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const messageId = `${state.id}-message`;
  const describedBy = [state.ariaDescribedBy, message ? messageId : ""].filter(Boolean).join(" ") || undefined;
  const commonInput = "w-full rounded-xl border bg-white/10 px-3 py-2 outline-none";
  const optionCount = Math.max(2, state.optionCount);
  const groupCount = Math.max(1, state.groupCount);
  const [activeOptionIdx, setActiveOptionIdx] = useState<number | null>(null);
  const options = Array.from({ length: optionCount }, (_, index) => ({
    label: index === 0 ? "Growth workspace" : `Option ${index + 1}`,
    value: index === 0 ? state.value : `option-${index + 1}`,
    group: `Group ${(index % groupCount) + 1}`,
    optionDisabled: index % 4 === 3,
  }));
  const selectedOption = options.find((option) => option.value === state.value) ?? options[0];
  const groups = Array.from(new Set(options.map((option) => option.group)));
  const preSelectedValues = [options[0]?.value, options[1]?.value].filter(Boolean);
  const nativeSelect = (
    <select id={state.id} name={state.name} title={state.title} tabIndex={state.tabIndex} dir={state.dir} lang={state.lang} multiple={state.multiple || undefined} size={state.multiple ? Math.min(optionCount, 5) : undefined} value={state.multiple ? preSelectedValues : state.value} required={state.required} disabled={state.disabled} autoComplete={state.autocomplete} aria-invalid={invalid || undefined} aria-label={state.ariaLabel || undefined} aria-describedby={describedBy} className={commonInput} style={{ borderColor: invalid ? state.errorColor : state.border, color: state.foreground }} onChange={() => undefined}>
      {!state.multiple && state.placeholder && <option value="" disabled={state.required}>{state.placeholder}</option>}
      {groups.map((group) => (
        <optgroup key={group} label={group}>
          {options.filter((option) => option.group === group).map((option) => <option key={option.value} value={option.value} disabled={option.optionDisabled}>{option.label}</option>)}
        </optgroup>
      ))}
    </select>
  );
  const customPanel = (
    <div role="listbox" id={`${state.id}-listbox`} aria-label={state.ariaLabel || `${state.label} options`} aria-multiselectable={state.multiple || undefined} className="grid gap-1 overflow-y-auto rounded-xl border p-2" style={{ borderColor: state.border, background: "rgba(255,255,255,0.06)", maxHeight: state.listMaxHeight, boxShadow: state.listShadow }}>
      {options.map((option, idx) => {
        const isSelected = state.multiple ? idx < 2 : option.value === state.value;
        const isActive = activeOptionIdx === idx;
        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.optionDisabled || undefined}
            disabled={option.optionDisabled}
            onMouseEnter={() => setActiveOptionIdx(idx)}
            onMouseLeave={() => setActiveOptionIdx((current) => (current === idx ? null : current))}
            onFocus={() => setActiveOptionIdx(idx)}
            onBlur={() => setActiveOptionIdx((current) => (current === idx ? null : current))}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm disabled:cursor-not-allowed"
            style={{
              background: isSelected ? state.itemActiveBg : isActive ? state.optionActiveBg : "transparent",
              color: option.optionDisabled ? state.optionDisabledColor : isSelected ? state.optionSelectedText : isActive ? state.optionActiveText : state.foreground,
            }}
          >
            {state.multiple && <span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 16, height: 16, borderRadius: 4, border: `2px solid ${isSelected ? state.accent : state.border}`, background: isSelected ? state.accent : "transparent", flexShrink: 0 }}>{isSelected ? "✓" : ""}</span>}
            {option.label}
            {!state.multiple && isSelected && <span aria-hidden="true" style={{ marginLeft: "auto", color: state.checkmarkColor }}>✓</span>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={shellStyle(state)} className="grid content-center">
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>{state.label}{state.required ? " *" : ""}</label>
      <p className="text-sm" style={{ color: state.muted }}>{state.description}</p>
      {state.selectMode === "native" ? nativeSelect : (
        <div className="grid gap-2">
          {state.selectMode === "combobox" && state.searchable ? (
            <div className="relative">
              <input id={state.id} role="combobox" aria-controls={`${state.id}-listbox`} aria-expanded="true" aria-autocomplete="list" aria-invalid={invalid || undefined} aria-label={state.ariaLabel || undefined} aria-describedby={describedBy} value={state.multiple ? `${preSelectedValues.length} selected` : selectedOption.label} placeholder={state.placeholder} disabled={state.disabled} readOnly className={commonInput} style={{ borderColor: invalid ? state.errorColor : state.border, color: state.foreground, paddingRight: 28 }} />
              <span aria-hidden="true" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: state.chevronColor, pointerEvents: "none" }}>▾</span>
            </div>
          ) : (
            <button id={state.id} type="button" role="combobox" aria-controls={`${state.id}-listbox`} aria-expanded="true" aria-invalid={invalid || undefined} aria-label={state.ariaLabel || undefined} aria-describedby={describedBy} disabled={state.disabled} className={`${commonInput} relative`} style={{ borderColor: invalid ? state.errorColor : state.border, color: state.foreground, textAlign: "left", paddingRight: 28 }}>
              {state.multiple ? `${preSelectedValues.length} selected` : (selectedOption.label || state.placeholder)}
              <span aria-hidden="true" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: state.chevronColor }}>▾</span>
            </button>
          )}
          {state.clearable && <button type="button" disabled={state.disabled} className="justify-self-start rounded-lg px-2 py-1 text-xs" style={{ border: `1px solid ${state.border}`, color: state.foreground }}>Clear selection</button>}
          {customPanel}
        </div>
      )}
      <small id={messageId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </div>
  );
}
