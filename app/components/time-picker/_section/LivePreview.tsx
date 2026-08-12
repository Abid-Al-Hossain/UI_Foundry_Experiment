"use client";

import { useState, type CSSProperties } from "react";
import type { TimePickerState } from "../types";
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

function shellStyle(state: TimePickerState): CSSProperties {
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

function normalizeTimeValue(value: string, showSeconds: boolean) {
  if (!value) return "";
  const [rawHour = "", rawMinute = "", rawSecond = ""] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  const second = rawSecond.padStart(2, "0").slice(0, 2);
  return showSeconds ? `${hour}:${minute}:${second || "00"}` : `${hour}:${minute}`;
}

function nativeStep(state: TimePickerState) {
  return state.showSeconds ? Math.max(1, Math.min(state.step, 59)) : Math.max(60, state.step);
}

export default function LivePreview({ state }: { state: TimePickerState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const success = state.showSuccess && !invalid;
  const [value, setValue] = useState(() => normalizeTimeValue(state.value, state.showSeconds));
  const helpId = `${state.id}-help`;
  const timezoneId = `${state.id}-timezone`;
  const describedBy = [helpId, state.showTimezone ? timezoneId : ""].filter(Boolean).join(" ");
  const message = invalid ? state.errorText : success ? state.successText : state.showHelper ? state.helper : "";

  return (
    <div style={shellStyle(state)} className="grid content-center">
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      {state.description ? <p className="text-sm" style={{ color: state.muted }}>{state.description}</p> : null}
      <div className="flex items-center gap-2 rounded-2xl border px-3 py-2" style={{ borderColor: invalid ? state.errorColor : state.border, background: "rgba(255,255,255,.06)" }}>
        <input
          id={state.id}
          name={state.name}
          title={state.title}
          tabIndex={state.tabIndex}
          dir={state.dir}
          lang={state.lang}
          type="time"
          value={value}
          min={normalizeTimeValue(state.min, state.showSeconds)}
          max={normalizeTimeValue(state.max, state.showSeconds)}
          step={nativeStep(state)}
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
          <button type="button" aria-label="Clear time" className="rounded-lg px-2" style={{ color: state.muted }} onClick={() => setValue("")}>
            Clear
          </button>
        ) : null}
      </div>
      {state.showTimezone ? <span id={timezoneId} className="text-xs" style={{ color: state.muted }}>{state.timezoneLabel}</span> : null}
      <small id={helpId} style={{ color: invalid ? state.errorColor : success ? state.successColor : state.muted }}>{message}</small>
    </div>
  );
}
