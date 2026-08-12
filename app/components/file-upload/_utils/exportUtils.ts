import type { FileUploadState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: FileUploadState, fileName = "file-upload") : ExportPayload {
  return {
    fileName: `${fileName || "file-upload"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: FileUploadState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }
function parseMaxBytes(label) { var match = label.match(/([\\d.]+)\\s*(kb|mb|gb|b)\\b/i); if (!match) return Number.POSITIVE_INFINITY; var units = { b: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3 }; return Number(match[1]) * units[match[2].toLowerCase()]; }
function acceptsFile(file, accept) { var rules = accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean); if (!rules.length) return true; var name = file.name.toLowerCase(); var type = file.type.toLowerCase(); return rules.some((rule) => rule.startsWith(".") ? name.endsWith(rule) : rule.endsWith("/*") ? type.startsWith(rule.slice(0, -1)) : type === rule); }


export default function FileUploadComponent() {
  const disabled = state.disabled || state.previewState === "disabled";
  const isLoading = state.previewState === "loading";
  const [isHovering, setIsHovering] = React.useState(false);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [validationMessage, setValidationMessage] = React.useState("");
  const invalid = state.invalid || state.previewState === "invalid" || Boolean(validationMessage);
  const stopDrag = (event) => { event.preventDefault(); setIsDragActive(false); };
  const message = validationMessage || (invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "");
  const configuredFiles = state.value.split(",").map((file) => file.trim()).filter(Boolean);
  const visibleFiles = files.length ? files.map((file) => file.name) : configuredFiles.length || state.previewState === "filled" ? configuredFiles.length ? configuredFiles : ["brand-kit.zip"] : [];
  const descriptionId = \`\${state.id}-description\`;
  const helperId = \`\${state.id}-helper\`;
  const statusId = \`\${state.id}-status\`;
  const describedBy = [descriptionId, helperId, message ? statusId : ""].filter(Boolean).join(" ");
  const shellStyle = {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: \`\${state.borderWidth}px ${state.borderStyle} \${invalid ? state.errorColor : state.previewState === "focus" ? state.accent : state.border}\`,
    boxShadow: buildShadow(state),
    background: state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    opacity: disabled ? 0.55 : 1,
    outline: state.previewState === "focus" ? \`\${state.focusRing}px solid \${state.accent}\` : "none",
    transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none",
  };
  const zoneClass = state.dropMode === "compact"
    ? "grid gap-2 rounded-xl border px-3 py-3"
    : state.dropMode === "button"
      ? "grid gap-3 rounded-2xl border px-4 py-4"
      : "grid gap-3 rounded-2xl border border-dashed p-4 text-center";
  const listClass = state.listMode === "chips" ? "flex flex-wrap gap-2" : state.listMode === "rows" ? "grid gap-2" : "grid gap-2 sm:grid-cols-2";
  const addFiles = (incoming) => {
    if (disabled) return;
    const candidates = Array.from(incoming);
    const rejectedType = candidates.find((file) => !acceptsFile(file, state.accept));
    if (rejectedType) { setValidationMessage(rejectedType.name + " is not an accepted file type."); return; }
    const rejectedSize = candidates.find((file) => file.size > parseMaxBytes(state.maxSizeLabel));
    if (rejectedSize) { setValidationMessage(rejectedSize.name + " exceeds " + state.maxSizeLabel + "."); return; }
    setFiles((current) => {
      const next = state.multiple ? [...current, ...candidates] : candidates.slice(0, 1);
      if (next.length > state.maxFileCount) { setValidationMessage("Select no more than " + state.maxFileCount + " file" + (state.maxFileCount === 1 ? "" : "s") + "."); return current; }
      setValidationMessage("");
      return next;
    });
  };
  const handleDrop = (event) => { stopDrag(event); addFiles(event.dataTransfer.files); };

  return (
    <form style={shellStyle} className="grid content-center" aria-labelledby={\`\${state.id}-label\`} onSubmit={(event) => event.preventDefault()}>
      <label id={\`\${state.id}-label\`} htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
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
        onDrop={handleDrop}
      >
        <input id={state.id} name={state.name} title={state.title} tabIndex={state.tabIndex} dir={state.dir} lang={state.lang} type="file" accept={state.accept} multiple={state.multiple} capture={state.capture || undefined} required={state.required} disabled={disabled} aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-label={state.ariaLabel || undefined} className={state.dropMode === "dropzone" ? "mx-auto max-w-full" : "sr-only"} onChange={(event) => { if (event.currentTarget.files) addFiles(event.currentTarget.files); event.currentTarget.value = ""; }} />
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
          {visibleFiles.length ? visibleFiles.map((file, index) => (
            <span key={file + "-" + index} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm" style={{ borderColor: state.fileListItemBorder, background: state.fileListBg, color: state.foreground }}>
              {file}
              {state.showRemoveAction && (
                <button type="button" aria-label={\`Remove \${file}\`} disabled={disabled} onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="ml-auto leading-none disabled:opacity-50" style={{ color: state.removeIconColor }}>
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
            <button type="button" disabled={disabled || !visibleFiles.length} onClick={() => { setFiles([]); setValidationMessage(""); }} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-50" style={{ borderColor: state.border, color: state.foreground }}>
              Remove selected
            </button>
          )}
        </div>
      </div>
      <small id={statusId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </form>
  );
}
`;
}
