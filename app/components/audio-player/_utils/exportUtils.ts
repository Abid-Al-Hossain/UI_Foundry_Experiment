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
  "const systemFonts = [\"Arial, system-ui\",\"Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", ui-monospace, monospace\",\"\\\"Courier New\\\", ui-monospace, monospace\",\"Georgia, ui-serif, serif\",\"Helvetica, Arial, system-ui\",\"Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", ui-monospace, monospace\",\"Monaco, Menlo, Consolas, \\\"Liberation Mono\\\", ui-monospace, monospace\",\"Roboto, system-ui, -apple-system, Arial\",\"\\\"Segoe UI\\\", system-ui, -apple-system, Arial\",\"system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial\",\"\\\"Times New Roman\\\", Times, ui-serif, serif\",\"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\",\"ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial\",\"ui-serif, Georgia, Cambria, \\\"Times New Roman\\\", Times, serif\"];",
  "function resolveFont(s) { return s.fontBucket === \"google\" ? '\"' + s.googleFontFamily + '\", sans-serif' : (systemFonts[s.systemFontIdx] || \"system-ui\"); }",
  "function buildShadow(s) { if (!s.shadowEnabled) return \"none\"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, \"0\"); return s.shadowX + \"px \" + s.shadowY + \"px \" + s.shadowBlur + \"px \" + s.shadowSpread + \"px \" + s.shadowColor + hex; }",
    "",
    "const formatTime = (seconds) => !Number.isFinite(seconds) || seconds < 0 ? \"0:00\" : `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, \"0\")}`;",
    "",
    "export default function AudioPlayerComponent() {",
    "  const audioRef = React.useRef(null);",
    "  const [media, setMedia] = React.useState({ current: 0, duration: 0, volume: state.muted ? 0 : 1, status: \"idle\" });",
    "  const parsedRate = Number.parseFloat(state.playbackRate);",
    "  const playbackRate = Number.isFinite(parsedRate) && parsedRate > 0 ? parsedRate : 1;",
    "  const progress = media.duration > 0 ? Math.min(100, (media.current / media.duration) * 100) : 0;",
    "  React.useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = playbackRate; }, [playbackRate]);",
    "  const syncMedia = (status) => {",
    "    const audio = audioRef.current; if (!audio) return;",
    "    setMedia({ current: Number.isFinite(audio.currentTime) ? audio.currentTime : 0, duration: Number.isFinite(audio.duration) ? audio.duration : 0, volume: audio.muted ? 0 : audio.volume, status: status || (audio.paused ? \"paused\" : \"playing\") });",
    "  };",
    "  return (",
    "    <section id={state.id} role={state.role || undefined} aria-label={state.ariaLabel || undefined} tabIndex={state.tabIndex} style={{ width: state.width, minHeight: state.height, padding: state.padding, borderRadius: state.radiusLinked ? state.radius : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`, border: state.borderWidth + \"px \" + state.borderStyle + \" \" + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border), boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.disabled && state.disabledUseCustomColors ? state.disabledText : state.foreground, fontFamily: resolveFont(state), fontStyle: state.fontStyle, textTransform: state.textTransform, textDecoration: state.textDecoration, letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`, lineHeight: state.lineHeight, opacity: state.disabled ? state.disabledOpacity : 1, cursor: state.disabled ? state.disabledCursor : undefined, display: \"grid\", gap: state.gap, transition: \"all \" + state.transitionDuration + \"ms \" + state.transitionEasing }}>",
    "      <div style={{ display: \"grid\", gap: 8 }}>",
    "        <p style={{ margin: 0, color: state.accent, fontSize: 12, letterSpacing: \".2em\", textTransform: \"uppercase\" }}>{state.label}</p>",
    "        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "        <p style={{ margin: 0, fontSize: state.bodySize, opacity: 0.72 }}>{state.description}</p>",
    "      </div>",
    "      <audio ref={audioRef} controls={!state.disabled} src={state.src || undefined} muted={state.muted} loop={state.loop} preload={state.preload} aria-label={state.ariaLabel} aria-disabled={state.disabled || undefined} tabIndex={state.disabled ? -1 : 0} style={{ width: \"100%\", accentColor: state.accent, pointerEvents: state.disabled ? \"none\" : undefined }} onLoadedMetadata={() => syncMedia(\"ready\")} onDurationChange={() => syncMedia()} onTimeUpdate={() => syncMedia()} onVolumeChange={() => syncMedia()} onPlay={() => syncMedia(\"playing\")} onPause={() => syncMedia(\"paused\")} onWaiting={() => syncMedia(\"buffering\")} onPlaying={() => syncMedia(\"playing\")} onEnded={() => syncMedia(\"ended\")} onError={() => syncMedia(\"error\")} />",
    "      {state.showTimeline && (",
    "        <div aria-label={`${state.title} timeline preview`} style={{ display: \"grid\", gap: 8 }}>",
    "          <div role=\"progressbar\" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ width: \"100%\", height: 8, borderRadius: 999, overflow: \"hidden\", background: \"rgba(148,163,184,.18)\" }}>",
    "            <div style={{ height: \"100%\", width: `${progress}%`, borderRadius: 999, background: state.accent, transition: state.transitionDuration > 0 ? \"width 0.1s linear\" : \"none\" }} />",
    "          </div>",
    "          <div style={{ display: \"flex\", justifyContent: \"space-between\", fontSize: 12, opacity: 0.74 }}>",
    "            <span>{formatTime(media.current)}</span>",
    "            <span>{formatTime(media.duration)}</span>",
    "          </div>",
    "        </div>",
    "      )}",
    "      <div style={{ display: \"flex\", flexWrap: \"wrap\", justifyContent: \"space-between\", gap: 12, fontSize: 12, opacity: 0.78 }}>",
    "        <span>{media.status === \"buffering\" ? \"Buffering\" : media.status === \"error\" ? \"Source unavailable\" : media.status === \"ended\" ? \"Finished playback\" : `Playback: ${media.status}`}</span>",
    "        <span>Rate {playbackRate}x</span>",
    "        {state.showVolume && <span>Volume {Math.round(media.volume * 100)}% {media.volume === 0 ? \"(muted)\" : \"\"}</span>}",
    "        <a href=\"#transcript\" style={{ color: state.accent }}>{state.transcriptLink}</a>",
    "      </div>",
    "    </section>",
    "  );",
    "}",
    ""
  ].join("\n");
}
