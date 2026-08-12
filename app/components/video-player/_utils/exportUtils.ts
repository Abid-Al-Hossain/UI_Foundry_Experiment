import type { VideoPlayerState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: VideoPlayerState, fileName = "video-player") : ExportPayload {
  return { fileName: `${fileName || "video-player"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: VideoPlayerState) {
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
    "export default function VideoPlayerComponent() {",
    "  const videoRef = React.useRef(null);",
    "  const [media, setMedia] = React.useState({ current: 0, duration: 0, volume: state.muted ? 0 : 1, status: \"idle\" });",
    "  const progress = media.duration > 0 ? Math.min(100, (media.current / media.duration) * 100) : 0;",
    "  const syncMedia = (status) => { const video = videoRef.current; if (!video) return; setMedia({ current: Number.isFinite(video.currentTime) ? video.currentTime : 0, duration: Number.isFinite(video.duration) ? video.duration : 0, volume: video.muted ? 0 : video.volume, status: status || (video.paused ? \"paused\" : \"playing\") }); };",
    "  const captionsSrc = `data:text/vtt;charset=utf-8,${encodeURIComponent(`WEBVTT\\n\\n00:00:00.000 --> 00:00:04.000\\n${state.label || state.title}\\n`)}`;",
    "  return (",
    "    <section id={state.id} role={state.role || undefined} aria-label={state.ariaLabel || undefined} tabIndex={state.tabIndex} style={{ width: state.width, minHeight: state.height, padding: state.padding, borderRadius: state.radiusLinked ? state.radius : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`, border: state.borderWidth + \"px \" + state.borderStyle + \" \" + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border), boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.disabled && state.disabledUseCustomColors ? state.disabledText : state.foreground, fontFamily: resolveFont(state), fontStyle: state.fontStyle, textTransform: state.textTransform, textDecoration: state.textDecoration, letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`, lineHeight: state.lineHeight, opacity: state.disabled ? state.disabledOpacity : 1, cursor: state.disabled ? state.disabledCursor : undefined, display: \"grid\", gap: state.gap, transition: \"all \" + state.transitionDuration + \"ms \" + state.transitionEasing }}>",
    "      <div style={{ display: \"grid\", gap: 8 }}>",
    "        <p style={{ margin: 0, color: state.accent, fontSize: 12, letterSpacing: \".2em\", textTransform: \"uppercase\" }}>{state.label}</p>",
    "        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "        <p style={{ margin: 0, fontSize: state.bodySize, opacity: 0.72 }}>{state.description}</p>",
    "      </div>",
    "      <div style={{ overflow: \"hidden\", borderRadius: 16, border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`, background: state.actionText }}>",
    "        <video ref={videoRef} controls={!state.disabled} src={state.src || undefined} poster={state.poster || undefined} muted={state.muted} loop={state.loop} autoPlay={state.autoplay && !state.disabled} preload={state.preload} aria-label={state.ariaLabel} aria-disabled={state.disabled || undefined} tabIndex={state.disabled ? -1 : 0} style={{ display: \"block\", width: \"100%\", aspectRatio: \"16 / 9\", objectFit: state.objectFit, accentColor: state.accent, pointerEvents: state.disabled ? \"none\" : undefined }} onLoadedMetadata={() => syncMedia(\"ready\")} onDurationChange={() => syncMedia()} onTimeUpdate={() => syncMedia()} onVolumeChange={() => syncMedia()} onPlay={() => syncMedia(\"playing\")} onPause={() => syncMedia(\"paused\")} onWaiting={() => syncMedia(\"buffering\")} onPlaying={() => syncMedia(\"playing\")} onEnded={() => syncMedia(\"ended\")} onError={() => syncMedia(\"error\")}>",
    "          {state.showCaptions && <track kind=\"captions\" srcLang=\"en\" label={state.label || \"English captions\"} src={captionsSrc} default />}",
    "        </video>",
    "      </div>",
    "      <div aria-label={`${state.title} timeline preview`} style={{ display: \"grid\", gap: 8 }}>",
    "        <div role=\"progressbar\" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ width: \"100%\", height: 8, borderRadius: 999, overflow: \"hidden\", background: \"rgba(148,163,184,.18)\" }}>",
    "          <div style={{ height: \"100%\", width: `${progress}%`, borderRadius: 999, background: state.accent, transition: state.transitionDuration > 0 ? \"width 0.1s linear\" : \"none\" }} />",
    "        </div>",
    "        <div style={{ display: \"flex\", justifyContent: \"space-between\", fontSize: 12, opacity: 0.74 }}>",
    "          <span>{formatTime(media.current)}</span>",
    "          <span>{formatTime(media.duration)}</span>",
    "        </div>",
    "      </div>",
    "      <div style={{ display: \"flex\", flexWrap: \"wrap\", justifyContent: \"space-between\", gap: 12, fontSize: 12, opacity: 0.78 }}>",
    "        <span>{media.status === \"buffering\" ? \"Buffering\" : media.status === \"error\" ? \"Source unavailable\" : media.status === \"ended\" ? \"Finished playback\" : `Playback: ${media.status}`}</span>",
    "        <span>Volume {Math.round(media.volume * 100)}% {media.volume === 0 ? \"(muted)\" : \"\"}</span>",
    "        <span>{state.showCaptions ? \"Captions on\" : \"Captions off\"}</span>",
    "        <span>Fit {state.objectFit}</span>",
    "      </div>",
    "    </section>",
    "  );",
    "}",
    ""
  ].join("\n");
}
