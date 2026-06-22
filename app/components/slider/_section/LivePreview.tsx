"use client";

import type { CSSProperties } from "react";
import type { SliderState } from "../types";
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

function shellStyle(state: SliderState): CSSProperties {
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

export default function LivePreview({ state }: { state: SliderState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const messageId = `${state.id}-message`;
  const describedBy = [state.ariaDescribedBy, message ? messageId : ""].filter(Boolean).join(" ") || undefined;
  const datalistId = `${state.id}-marks`;
  const sliderClass = `slider-${state.id}`;
  const clampedValue = Math.min(state.max, Math.max(state.min, state.value));
  const step = Math.max(1, state.step);
  const fillPercent = state.max > state.min ? ((clampedValue - state.min) / (state.max - state.min)) * 100 : 0;
  const markValues =
    state.markMode === "none"
      ? []
      : Array.from({ length: Math.floor((state.max - state.min) / step) + 1 }, (_, index) => state.min + index * step).filter((value) => value <= state.max);
  const rangeStyle: CSSProperties = {
    accentColor: state.accent,
    width: state.orientation === "vertical" ? state.height : "100%",
    writingMode: state.orientation === "vertical" ? "vertical-lr" : "horizontal-tb",
  };

  return (
    <div style={shellStyle(state)} className="grid content-center">
      <style>{`
        .${sliderClass}::-webkit-slider-thumb { background: ${state.thumbBg}; border: 2px solid ${state.thumbBorder}; box-shadow: ${state.thumbShadow}; }
        .${sliderClass}::-moz-range-thumb { background: ${state.thumbBg}; border: 2px solid ${state.thumbBorder}; box-shadow: ${state.thumbShadow}; }
        .${sliderClass}::-webkit-slider-runnable-track { background: linear-gradient(to right, ${state.trackFillBg} 0%, ${state.trackFillBg} ${fillPercent}%, ${state.trackBg} ${fillPercent}%, ${state.trackBg} 100%); }
        .${sliderClass}::-moz-range-track { background: ${state.trackBg}; }
        .${sliderClass}::-moz-range-progress { background: ${state.trackFillBg}; }
      `}</style>
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>{state.label}{state.required ? " *" : ""}</label>
      <p className="text-sm" style={{ color: state.muted }}>{state.description}</p>
      <div className="grid gap-2" style={{ justifyItems: state.orientation === "vertical" ? "start" : "stretch" }}>
        <div className="relative" style={{ width: state.orientation === "vertical" ? state.height : "100%" }}>
          <input id={state.id} name={state.name} title={state.title} tabIndex={state.tabIndex} dir={state.dir} lang={state.lang} type="range" min={state.min} max={state.max} step={state.step} value={clampedValue} list={markValues.length ? datalistId : undefined} disabled={state.disabled} aria-invalid={invalid || undefined} aria-label={state.ariaLabel || undefined} aria-describedby={describedBy} aria-orientation={state.orientation} aria-valuetext={state.valueText} className={sliderClass} style={rangeStyle} onChange={() => undefined} />
          {state.markMode === "steps" && markValues.length > 0 && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-between" style={{ transform: "translateY(-50%)" }}>
              {markValues.map((value) => (
                <span key={value} style={{ width: state.ticksSize, height: state.ticksSize, borderRadius: "50%", background: state.ticksColor }} />
              ))}
            </div>
          )}
        </div>
        {markValues.length > 0 && (
          <datalist id={datalistId}>
            {markValues.map((value) => (
              <option key={value} value={value} label={state.markMode === "labels" ? String(value) : undefined} />
            ))}
          </datalist>
        )}
        {state.outputMode !== "none" && <output htmlFor={state.id} className={state.outputMode === "tooltip" ? "rounded-full px-3 py-1 text-xs" : undefined} style={{ background: state.outputMode === "tooltip" ? state.tooltipBg : "transparent", color: state.outputMode === "tooltip" ? state.tooltipText : state.foreground }}>{state.valueText || clampedValue}</output>}
        <div className="flex justify-between text-xs" style={{ color: state.muted, width: state.orientation === "vertical" ? state.height : "100%" }}>
          <span>{state.min}</span>
          <span>{state.max}</span>
        </div>
      </div>
      <small id={messageId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </div>
  );
}
