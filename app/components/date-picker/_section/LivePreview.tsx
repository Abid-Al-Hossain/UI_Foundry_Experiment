"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { DatePickerStudioState } from "../types";
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

function shellStyle(state: DatePickerStudioState): CSSProperties {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";

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
    opacity: disabled ? 0.55 : 1,
    outline: state.previewState === "focus" ? `${state.focusRing}px solid ${state.accent}` : "none",
    transition: state.transitionDuration > 0 ? "all 180ms ease" : "none",
  };
}

function normalizeDateValue(value: string, pickerType: DatePickerStudioState["pickerType"]) {
  if (!value) return "";
  if (pickerType === "datetime-local") return value.includes("T") ? value : value.replace(" ", "T");
  if (pickerType === "month") return value.slice(0, 7);
  if (pickerType === "week") return value.includes("W") ? value : "";
  return value.slice(0, 10);
}

export default function LivePreview({ state }: { state: DatePickerStudioState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const success = state.showSuccess && !invalid;
  const [value, setValue] = useState(() => normalizeDateValue(state.value, state.pickerType));
  const [valueEnd, setValueEnd] = useState(() => normalizeDateValue(state.valueEnd, state.pickerType));
  const describedBy = `${state.id}-help`;
  const message = invalid ? state.errorText : success ? state.successText : state.showHelper ? state.helper : "";
  const inputBorderColor = invalid ? state.errorColor : state.border;

  useEffect(() => {
    setValue(normalizeDateValue(state.value, state.pickerType));
    setValueEnd(normalizeDateValue(state.valueEnd, state.pickerType));
  }, [state.value, state.valueEnd, state.pickerType]);

  const singleInput = (
    <div className="flex items-center gap-2 rounded-2xl border px-3 py-2" style={{ borderColor: inputBorderColor, background: "rgba(255,255,255,.06)" }}>
      {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
      <input
        id={state.id}
        name={state.name}
        title={state.title}
        tabIndex={state.tabIndex}
        dir={state.dir}
        lang={state.lang}
        type={state.pickerType}
        value={value}
        min={normalizeDateValue(state.min, state.pickerType)}
        max={normalizeDateValue(state.max, state.pickerType)}
        step={state.step}
        required={state.required}
        disabled={disabled}
        readOnly={state.readOnly}
        autoComplete={state.autocomplete}
        inputMode={state.inputMode}
        enterKeyHint={state.enterKeyHint}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-label={state.ariaLabel || undefined}
        className="w-full bg-transparent outline-none"
        style={{ color: state.foreground, fontSize: state.inputSize }}
        onChange={(event) => setValue(event.target.value)}
      />
      {state.showClearAction && value && !disabled && !state.readOnly ? (
        <button type="button" aria-label="Clear date" className="rounded-lg px-2" style={{ color: state.muted }} onClick={() => setValue("")}>
          Clear
        </button>
      ) : null}
    </div>
  );

  const rangeInputs = (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <label htmlFor={`${state.id}-start`} className="text-xs" style={{ color: state.muted }}>From</label>
        <div className="flex items-center gap-2 rounded-2xl border px-3 py-2" style={{ borderColor: inputBorderColor, background: "rgba(255,255,255,.06)" }}>
          {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
          <input
            id={`${state.id}-start`}
            name={`${state.name}-start`}
            type={state.pickerType}
            value={value}
            min={normalizeDateValue(state.min, state.pickerType)}
            max={valueEnd || normalizeDateValue(state.max, state.pickerType)}
            required={state.required}
            disabled={disabled}
            readOnly={state.readOnly}
            aria-label="Range start date"
            aria-describedby={describedBy}
            className="w-full bg-transparent outline-none"
            style={{ color: state.foreground, fontSize: state.inputSize }}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-1">
        <label htmlFor={`${state.id}-end`} className="text-xs" style={{ color: state.muted }}>To</label>
        <div className="flex items-center gap-2 rounded-2xl border px-3 py-2" style={{ borderColor: inputBorderColor, background: "rgba(255,255,255,.06)" }}>
          {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
          <input
            id={`${state.id}-end`}
            name={`${state.name}-end`}
            type={state.pickerType}
            value={valueEnd}
            min={value || normalizeDateValue(state.min, state.pickerType)}
            max={normalizeDateValue(state.max, state.pickerType)}
            disabled={disabled}
            readOnly={state.readOnly}
            aria-label="Range end date"
            aria-describedby={describedBy}
            className="w-full bg-transparent outline-none"
            style={{ color: state.foreground, fontSize: state.inputSize }}
            onChange={(event) => setValueEnd(event.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div style={shellStyle(state)} className="grid content-center">
      <label htmlFor={state.rangeMode ? `${state.id}-start` : state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      {state.description ? <p className="text-sm" style={{ color: state.muted }}>{state.description}</p> : null}
      {state.rangeMode ? rangeInputs : singleInput}
      <small id={describedBy} style={{ color: invalid ? state.errorColor : success ? state.successColor : state.muted }}>{message}</small>
    </div>
  );
}
