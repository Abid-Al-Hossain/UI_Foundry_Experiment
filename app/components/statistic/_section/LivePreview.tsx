"use client";

import type { CSSProperties } from "react";
import type { StatisticState } from "../types";
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

function shell(state: StatisticState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: buildRadius(state),
    border: state.cardMode === "minimal" ? "none" : `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: state.cardMode === "elevated" ? buildShadow(state) : state.cardMode === "minimal" ? "none" : buildShadow(state),
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

function trendCopy(state: StatisticState) {
  if (state.previewState === "error") return "Metric needs attention";
  if (state.previewState === "success") return "Metric is on target";
  if (state.trendDirection === "down") return `${state.trend} decrease`;
  if (state.trendDirection === "neutral") return `${state.trend} change`;
  return `${state.trend} increase`;
}

function trendColor(state: StatisticState) {
  if (state.previewState === "error" || state.trendDirection === "down") return state.trendDownColor;
  if (state.previewState === "success" || state.trendDirection === "up") return state.trendUpColor;
  return state.trendNeutralColor;
}

export default function LivePreview({ state }: { state: StatisticState }) {
  const panel = shell(state);
  const trend = trendCopy(state);
  const statusColor = trendColor(state);

  return (
    <section
      id={state.id}
      role={state.role}
      aria-labelledby={`${state.id}-label`}
      aria-describedby={`${state.id}-description ${state.id}-trend`}
      tabIndex={state.tabIndex}
      style={panel}
      data-component="statistic"
      data-preview-state={state.previewState}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p id={`${state.id}-label`} className="font-semibold uppercase tracking-[0.16em]" style={{ color: state.labelColor, fontSize: state.labelSize }}>{state.label}</p>
          <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        </div>
        <span role="status" className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: statusColor, color: statusColor }}>
          {state.previewState}
        </span>
      </div>
      <p id={`${state.id}-description`} className="mt-2" style={{ color: state.descriptionColor, fontSize: state.descriptionSize }}>{state.description}</p>
      <div className="mt-6" aria-label={`${state.ariaLabel}: ${state.prefix}${state.value}${state.suffix ? ` ${state.suffix}` : ""}`}>
        <p className="leading-none" style={{ color: state.valueColor, fontSize: state.valueSize, fontWeight: state.valueFontWeight, transition: state.transitionDuration > 0 ? "font-size 200ms ease" : "none" }}>
          {state.unit && state.unitPosition === "prefix" ? <span className="mr-2 font-semibold" style={{ color: state.unitColor, fontSize: state.unitSize }}>{state.unit}</span> : null}
          <span style={{ color: state.prefixColor }}>{state.prefix}</span>
          <data value={state.value}>{state.value}</data>
          {state.unit && state.unitPosition === "suffix" ? <span className="ml-2 font-semibold" style={{ color: state.unitColor, fontSize: state.unitSize }}>{state.unit}</span> : null}
        </p>
        {state.suffix && <p className="mt-2 text-sm" style={{ color: state.suffixColor }}>{state.suffix}</p>}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p id={`${state.id}-trend`} role="status" className="inline-flex rounded-full border px-3 py-1 text-sm font-semibold" style={{ borderColor: statusColor, color: statusColor }}>
          {trend}
        </p>
        {state.comparisonLabel ? <span className="text-xs" style={{ color: state.comparisonColor }}>{state.comparisonLabel}</span> : null}
      </div>
      {state.showSparkline && (
        <svg aria-hidden="true" viewBox="0 0 240 64" className="mt-5 w-full overflow-visible" style={{ height: state.sparklineHeight }}>
          {state.sparklineType === "area" ? <polygon points="0,46 32,38 64,42 96,24 128,30 160,14 192,20 240,8 240,58 0,58" fill={state.sparklineAreaColor} opacity="0.25" /> : null}
          {state.sparklineType === "bar" ? [0, 32, 64, 96, 128, 160, 192].map((x, i) => <rect key={x} x={x} y={[46, 38, 42, 24, 30, 14, 20][i]} width="20" height={58 - [46, 38, 42, 24, 30, 14, 20][i]} fill={state.sparklineColor} rx="3" />) : (
            <polyline points="0,46 32,38 64,42 96,24 128,30 160,14 192,20 240,8" fill="none" stroke={state.sparklineColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <line x1="0" x2="240" y1="58" y2="58" stroke={state.border} strokeWidth="2" />
        </svg>
      )}
      <p className="mt-4 text-xs" style={{ color: state.helpTextColor }}>{state.helper}</p>
    </section>
  );
}
