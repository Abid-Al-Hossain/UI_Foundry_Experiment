"use client";

import type { CSSProperties } from "react";
import type { AudioPlayerState } from "../types";
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

function shell(state: AudioPlayerState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: buildRadius(state), border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`, boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.foreground, fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight, opacity: state.disabled ? 0.55 : 1 };
}

export default function LivePreview({ state }: { state: AudioPlayerState }) {
  const panel = shell(state);
  const progressByState: Record<AudioPlayerState["previewState"], number> = { default: 36, hover: 44, focus: 48, active: 62, open: 36, closed: 0, selected: 72, loading: 12, empty: 0, error: 0, success: 100 };
  const progress = progressByState[state.previewState];
  const duration = 258;
  const current = Math.round((duration * progress) / 100);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const volume = state.muted ? 0 : 72;

  return <section id={state.id} role={state.role} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} className="grid content-center gap-4">
    <div className="grid gap-2">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: state.accent }}>{state.label}</p>
      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
      <p style={{ color: "color-mix(in oklab, currentColor 70%, transparent)", fontSize: state.bodySize }}>{state.description}</p>
    </div>
    <audio controls src={state.src || undefined} muted={state.muted} loop={state.loop} preload={state.preload} aria-label={state.ariaLabel} className="w-full" style={{ accentColor: state.accent }} />
    {state.showTimeline && <div className="grid gap-2" aria-label={`${state.title} timeline preview`}>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "color-mix(in oklab, currentColor 14%, transparent)" }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: state.accent, transition: state.transitionDuration > 0 ? "width 0.1s linear" : "none" }} />
      </div>
      <div className="flex justify-between text-xs" style={{ color: "color-mix(in oklab, currentColor 72%, transparent)" }}>
        <span>{formatTime(current)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>}
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "color-mix(in oklab, currentColor 74%, transparent)" }}>
      <span>{state.previewState === "loading" ? "Buffering preview" : state.previewState === "error" ? "Source unavailable" : state.previewState === "success" ? "Finished playback" : `Playback: ${state.previewState}`}</span>
      <span>Rate {state.playbackRate}x</span>
      {state.showVolume && <span>Volume {volume}% {state.muted ? "(muted)" : ""}</span>}
      <a href="#transcript" style={{ color: state.accent }}>{state.transcriptLink}</a>
    </div>
  </section>;
}
