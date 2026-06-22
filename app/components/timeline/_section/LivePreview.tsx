"use client";

import type { CSSProperties } from "react";
import type { TimelineState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { getStateSummary, getTimelineEvents, getVisibleEventCount } from "../_utils/timelineModel";

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

function shell(state: TimelineState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`, boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, opacity: state.disabled ? 0.55 : 1 };
}

export default function LivePreview({ state }: { state: TimelineState }) {
  const events = getTimelineEvents(state);
  const summary = getStateSummary(state);
  const visibleEvents = events.slice(0, getVisibleEventCount(state));
  const panel = shell(state);
  const isHorizontal = state.orientation === "horizontal";
  const markerGlyph = state.markerStyle === "dot" ? "" : state.markerStyle === "number" ? null : "ok";
  const regionRole = state.role === "list" ? "region" : state.role;

  return (
    <section id={state.id} role={regionRole} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} data-timeline-orientation={state.orientation} data-timeline-state={state.previewState} className="grid content-start">
      <div className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: state.accent }}>{summary.statusText}</p>
        <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <ol aria-label={`${state.title} events`} role="list" className={isHorizontal ? "mt-6 grid md:grid-flow-col md:auto-cols-fr" : "mt-6 grid"} style={{ gap: state.itemGap }}>
        {visibleEvents.map((event, index) => {
          const isCurrent = event.status === "current";
          const isComplete = event.status === "complete";
          const alignEnd = state.alternating && !isHorizontal && index % 2 === 1;
          const markerText = markerGlyph === null ? String(index + 1) : markerGlyph;
          const markerBg = isCurrent ? state.markerActiveBg : isComplete ? state.markerCompletedBg : state.markerBg;
          const markerColor = isCurrent ? state.markerActiveText : isComplete ? state.markerCompletedText : (state.markerStyle === "icon" ? state.markerIconColor : state.markerText);
          const markerBorderColor = isCurrent ? state.accent : isComplete ? state.markerCompletedBg : state.markerBorder;
          const connColor = isComplete ? state.connectorCompletedColor : state.connectorColor;

          return (
            <li key={event.id} role="listitem" aria-current={isCurrent ? "step" : undefined} className={alignEnd ? "grid justify-items-end text-right" : "grid justify-items-start text-left"}>
              <article className={isHorizontal ? "grid h-full gap-3" : "grid max-w-[34rem] gap-3"} style={{ opacity: event.status === "upcoming" ? 0.72 : 1, transition: state.transitionDuration > 0 ? "opacity 0.25s ease, transform 0.25s ease" : "none" }}>
                <div className={isHorizontal ? "grid grid-cols-[auto_1fr] items-center gap-3" : "grid grid-cols-[auto_1fr] items-start gap-3"}>
                  <span aria-hidden="true" className="grid place-items-center border text-xs font-bold" style={{ width: state.markerSize, height: state.markerSize, borderRadius: state.markerRadius, borderColor: markerBorderColor, background: markerBg, color: markerColor }}>{markerText}</span>
                  <span aria-hidden="true" className={isHorizontal ? "w-full self-center" : "h-12 justify-self-center"} style={{ height: isHorizontal ? state.connectorWidth : undefined, width: isHorizontal ? undefined : state.connectorWidth, borderTop: isHorizontal ? `${state.connectorWidth}px ${state.connectorStyle} ${connColor}` : undefined, borderLeft: isHorizontal ? undefined : `${state.connectorWidth}px ${state.connectorStyle} ${connColor}`, opacity: index === visibleEvents.length - 1 ? 0 : 1 }} />
                </div>
                <div className="border" style={{ padding: state.itemCardPadding, borderRadius: state.itemCardRadius, borderColor: isCurrent ? state.accent : state.itemCardBorder, background: state.itemCardBg }}>
                  {state.datePlacement === "top" && <time dateTime={event.date} className="font-semibold uppercase tracking-[0.14em]" style={{ color: state.dateColor, fontSize: state.dateSize }}>{event.displayDate}</time>}
                  <div className={state.datePlacement === "side" ? "mt-2 flex items-start justify-between gap-3" : "mt-2"}>
                    <h4 className="font-semibold" style={{ color: state.eventTitleColor }}>{event.title}</h4>
                    {state.datePlacement === "side" && <time dateTime={event.date} className="shrink-0 font-semibold uppercase tracking-[0.14em]" style={{ color: state.dateColor, fontSize: state.dateSize }}>{event.displayDate}</time>}
                  </div>
                  <p className="mt-1 text-sm" style={{ color: state.bodyColor }}>{event.description}</p>
                  <span className="mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs capitalize" style={{ borderColor: isCurrent ? state.accent : state.border, color: isCurrent ? state.accent : state.muted }}>{event.status}</span>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
      {summary.hiddenCount > 0 && <p className="mt-4 text-sm" style={{ color: state.muted }}>{summary.hiddenCount} later events are collapsed in this state.</p>}
      <p className="mt-4 text-xs" style={{ color: state.muted }}>{state.helper} - {state.previewState}</p>
    </section>
  );
}
