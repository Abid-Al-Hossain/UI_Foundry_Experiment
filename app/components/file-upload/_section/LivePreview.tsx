"use client";

import { useState, type CSSProperties, type DragEvent } from "react";
import type { FileUploadState } from "../types";
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

function shellStyle(state: FileUploadState): CSSProperties {
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

export default function LivePreview({ state }: { state: FileUploadState }) {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const disabled = state.disabled || state.previewState === "disabled";
  const [isHovering, setIsHovering] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const isLoading = state.previewState === "loading";
  const stopDrag = (event: DragEvent) => {
    event.preventDefault();
    setIsDragActive(false);
  };
  const selectedFiles = state.value
    .split(",")
    .map((file) => file.trim())
    .filter(Boolean);
  const visibleFiles = selectedFiles.length || state.previewState === "filled" ? selectedFiles.length ? selectedFiles : ["brand-kit.zip"] : [];
  const helperId = `${state.id}-helper`;
  const descriptionId = `${state.id}-description`;
  const statusId = `${state.id}-status`;
  const describedBy = [descriptionId, helperId, message ? statusId : ""].filter(Boolean).join(" ");
  const inputClass = state.dropMode === "dropzone" ? "mx-auto max-w-full" : "sr-only";
  const zoneClass =
    state.dropMode === "compact"
      ? "grid gap-2 rounded-xl border px-3 py-3"
      : state.dropMode === "button"
        ? "grid gap-3 rounded-2xl border px-4 py-4"
        : "grid gap-3 rounded-2xl border border-dashed p-4 text-center";
  const listClass =
    state.listMode === "chips"
      ? "flex flex-wrap gap-2"
      : state.listMode === "rows"
        ? "grid gap-2"
        : "grid gap-2 sm:grid-cols-2";

  return (
    <form style={shellStyle(state)} className="grid content-center" aria-labelledby={`${state.id}-label`} onSubmit={(event) => event.preventDefault()}>
      <label id={`${state.id}-label`} htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      <p id={descriptionId} className="text-sm" style={{ color: state.muted }}>{state.description}</p>
      <div
        className={zoneClass}
        style={{
          borderColor: invalid ? state.errorColor : isDragActive ? state.dropzoneActiveBorder : isHovering ? state.dropzoneHoverBorder : state.border,
          background: isDragActive ? state.dropzoneActiveBg : isHovering ? state.dropzoneHoverBg : state.dropzoneBg,
          color: state.dropzoneText,
        }}
        data-render-mode={state.dropMode}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDragEnter={(event) => { event.preventDefault(); setIsDragActive(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={stopDrag}
        onDrop={stopDrag}
      >
        <input id={state.id} name={state.name} title={state.title} tabIndex={state.tabIndex} dir={state.dir} lang={state.lang} type="file" accept={state.accept} multiple={state.multiple} capture={state.capture || undefined} required={state.required} disabled={disabled} aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-label={state.ariaLabel || undefined} className={inputClass} />
        {state.dropMode !== "dropzone" && (
          <label htmlFor={state.id} className="inline-flex w-fit cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-bold" style={{ background: state.accent, color: state.actionText }}>
            Browse files
          </label>
        )}
        <span id={helperId} className="text-sm" style={{ color: state.muted }}>{state.maxFileCount} file{state.maxFileCount === 1 ? "" : "s"} max, {state.maxSizeLabel}, accepts {state.accept || "any file"}</span>
        {isLoading && (
          <div aria-hidden="true" className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: state.progressBg }}>
            <div className="h-full rounded-full" style={{ width: "60%", background: state.progressFill }} />
          </div>
        )}
        <div className={listClass} aria-live="polite">
          {visibleFiles.length ? visibleFiles.map((file) => (
            <span key={file} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm" style={{ borderColor: state.fileListItemBorder, background: state.fileListBg, color: state.foreground }}>
              {file}
              {state.showRemoveAction && (
                <button type="button" aria-label={`Remove ${file}`} disabled={disabled} className="ml-auto leading-none disabled:opacity-50" style={{ color: state.removeIconColor }}>
                  ×
                </button>
              )}
            </span>
          )) : (
            <span className="text-sm" style={{ color: state.muted }}>No file selected</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {state.showBrowseAction && state.dropMode === "dropzone" && (
            <label htmlFor={state.id} className="inline-flex cursor-pointer rounded-xl px-4 py-2 text-sm font-bold" style={{ background: state.accent, color: state.actionText }}>
              Browse files
            </label>
          )}
          {state.showRemoveAction && (
            <button type="button" disabled={disabled || !visibleFiles.length} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-50" style={{ borderColor: state.border, color: state.foreground }}>
              Remove selected
            </button>
          )}
        </div>
      </div>
      <small id={statusId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </form>
  );
}
