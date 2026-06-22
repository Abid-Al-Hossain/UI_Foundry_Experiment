import type { AudioPlayerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: AudioPlayerState, fileName = "audio-player") : ExportPayload {
  return { fileName: `${fileName || "audio-player"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: AudioPlayerState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
  "",
  "function resolveFont(s) { return s.fontBucket === \"google\" ? '\"' + s.googleFontFamily + '\", sans-serif' : \"inherit\"; }",
  "function buildShadow(s) { if (!s.shadowEnabled) return \"none\"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, \"0\"); return s.shadowX + \"px \" + s.shadowY + \"px \" + s.shadowBlur + \"px \" + s.shadowSpread + \"px \" + s.shadowColor + hex; }",
    "",
    "const progressByState = { default: 36, hover: 44, focus: 48, active: 62, open: 36, closed: 0, selected: 72, loading: 12, empty: 0, error: 0, success: 100 };",
    "const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, \"0\")}`;",
    "",
    "export default function AudioPlayerComponent() {",
    "  const progress = progressByState[state.previewState] ?? 36;",
    "  const duration = 258;",
    "  const current = Math.round((duration * progress) / 100);",
    "  const volume = state.muted ? 0 : 72;",
    "  return (",
    "    <section id={state.id} role={state.role || undefined} aria-label={state.ariaLabel || undefined} tabIndex={state.tabIndex} style={{ width: state.width, minHeight: state.height, padding: state.padding, borderRadius: state.radius, border: state.borderWidth + \"px \" + state.borderStyle + \" \" + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border), boxShadow: buildShadow(state), background: state.background, color: state.foreground, fontFamily: resolveFont(state), opacity: state.disabled ? (state.disabledOpacity ?? 0.5) : 1, cursor: state.disabled ? state.disabledCursor : undefined, transition: \"all \" + state.transitionDuration + \"ms \" + state.transitionEasing }}>",
    "      <div style={{ display: \"grid\", gap: 8 }}>",
    "        <p style={{ margin: 0, color: state.accent, fontSize: 12, letterSpacing: \".2em\", textTransform: \"uppercase\" }}>{state.label}</p>",
    "        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "        <p style={{ margin: 0, fontSize: state.bodySize, opacity: 0.72 }}>{state.description}</p>",
    "      </div>",
    "      <audio controls src={state.src || undefined} muted={state.muted} loop={state.loop} preload={state.preload} aria-label={state.ariaLabel} style={{ width: \"100%\", accentColor: state.accent }} />",
    "      {state.showTimeline && (",
    "        <div aria-label={`${state.title} timeline preview`} style={{ display: \"grid\", gap: 8 }}>",
    "          <div role=\"progressbar\" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ width: \"100%\", height: 8, borderRadius: 999, overflow: \"hidden\", background: \"rgba(148,163,184,.18)\" }}>",
    "            <div style={{ height: \"100%\", width: `${progress}%`, borderRadius: 999, background: state.accent, transition: state.motion ? \"width 0.1s linear\" : \"none\" }} />",
    "          </div>",
    "          <div style={{ display: \"flex\", justifyContent: \"space-between\", fontSize: 12, opacity: 0.74 }}>",
    "            <span>{formatTime(current)}</span>",
    "            <span>{formatTime(duration)}</span>",
    "          </div>",
    "        </div>",
    "      )}",
    "      <div style={{ display: \"flex\", flexWrap: \"wrap\", justifyContent: \"space-between\", gap: 12, fontSize: 12, opacity: 0.78 }}>",
    "        <span>{state.previewState === \"loading\" ? \"Buffering preview\" : state.previewState === \"error\" ? \"Source unavailable\" : state.previewState === \"success\" ? \"Finished playback\" : `Playback: ${state.previewState}`}</span>",
    "        <span>Rate {state.playbackRate}x</span>",
    "        {state.showVolume && <span>Volume {volume}% {state.muted ? \"(muted)\" : \"\"}</span>}",
    "        <a href=\"#transcript\" style={{ color: state.accent }}>{state.transcriptLink}</a>",
    "      </div>",
    "    </section>",
    "  );",
    "}",
    ""
  ].join("\n");
}
