"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [media, setMedia] = useState({ current: 0, duration: 0, volume: state.muted ? 0 : 1, status: "idle" });
  const rate = Number.parseFloat(state.playbackRate);
  const playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  const progress = media.duration > 0 ? Math.min(100, (media.current / media.duration) * 100) : 0;
  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate, state.src]);

  const syncMedia = (status?: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    setMedia({
      current: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      volume: audio.muted ? 0 : audio.volume,
      status: status ?? (audio.paused ? "paused" : "playing"),
    });
  };

  return <section id={state.id} role={state.role} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} className="grid content-center gap-4">
    <div className="grid gap-2">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: state.accent }}>{state.label}</p>
      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
      <p style={{ color: "color-mix(in oklab, currentColor 70%, transparent)", fontSize: state.bodySize }}>{state.description}</p>
    </div>
    <audio
      ref={audioRef}
      controls={!state.disabled}
      src={state.src || undefined}
      muted={state.muted}
      loop={state.loop}
      preload={state.preload}
      aria-label={state.ariaLabel}
      aria-disabled={state.disabled || undefined}
      tabIndex={state.disabled ? -1 : 0}
      className="w-full"
      style={{ accentColor: state.accent, pointerEvents: state.disabled ? "none" : undefined }}
      onLoadedMetadata={() => syncMedia("ready")}
      onDurationChange={() => syncMedia()}
      onTimeUpdate={() => syncMedia()}
      onVolumeChange={() => syncMedia()}
      onPlay={() => syncMedia("playing")}
      onPause={() => syncMedia("paused")}
      onWaiting={() => syncMedia("buffering")}
      onPlaying={() => syncMedia("playing")}
      onEnded={() => syncMedia("ended")}
      onError={() => syncMedia("error")}
    />
    {state.showTimeline && <div className="grid gap-2" aria-label={`${state.title} timeline preview`}>
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "color-mix(in oklab, currentColor 14%, transparent)" }} role="progressbar" aria-label="Playback progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: state.accent, transition: state.transitionDuration > 0 ? "width 0.1s linear" : "none" }} />
      </div>
      <div className="flex justify-between text-xs" style={{ color: "color-mix(in oklab, currentColor 72%, transparent)" }}>
        <span>{formatTime(media.current)}</span>
        <span>{formatTime(media.duration)}</span>
      </div>
    </div>}
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "color-mix(in oklab, currentColor 74%, transparent)" }}>
      <span>{media.status === "buffering" ? "Buffering" : media.status === "error" ? "Source unavailable" : media.status === "ended" ? "Finished playback" : `Playback: ${media.status}`}</span>
      <span>Rate {playbackRate}x</span>
      {state.showVolume && <span>Volume {Math.round(media.volume * 100)}% {media.volume === 0 ? "(muted)" : ""}</span>}
      <a href="#transcript" style={{ color: state.accent }}>{state.transcriptLink}</a>
    </div>
  </section>;
}
