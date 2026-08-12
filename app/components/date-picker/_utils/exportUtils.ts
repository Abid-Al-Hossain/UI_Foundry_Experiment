import type { DatePickerStudioState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: DatePickerStudioState, fileName = "date-picker") : ExportPayload {
  return {
    fileName: `${fileName || "date-picker"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: DatePickerStudioState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function normalizeDateValue(value, pickerType) {
  if (!value) return "";
  if (pickerType === "datetime-local") return value.includes("T") ? value : value.replace(" ", "T");
  if (pickerType === "month") return value.slice(0, 7);
  if (pickerType === "week") return value.includes("W") ? value : "";
  return value.slice(0, 10);
}

export default function DatePickerComponent() {
  // Native modes supported by this single input: type="date", type="month", type="week", type="datetime-local".
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const success = state.showSuccess && !invalid;
  const message = invalid ? state.errorText : success ? state.successText : state.showHelper ? state.helper : "";
  const helpId = \`\${state.id}-help\`;
  const [value, setValue] = React.useState(() => normalizeDateValue(state.value, state.pickerType));
  const [valueEnd, setValueEnd] = React.useState(() => normalizeDateValue(state.valueEnd, state.pickerType));

  React.useEffect(() => {
    setValue(normalizeDateValue(state.value, state.pickerType));
    setValueEnd(normalizeDateValue(state.valueEnd, state.pickerType));
  }, []);

  return (
    <div
      style={{
        width: state.width,
        minHeight: state.height,
        padding: state.padding,
        display: "grid",
        alignContent: "center",
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
      }}
    >
      <label htmlFor={state.rangeMode ? \`\${state.id}-start\` : state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      {state.description ? <p style={{ margin: 0, color: state.muted }}>{state.description}</p> : null}
      {state.rangeMode ? (
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor={\`\${state.id}-start\`} style={{ fontSize: 12, color: state.muted }}>From</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 16, border: \`1px solid \${invalid ? state.errorColor : state.border}\`, padding: "8px 12px", background: "rgba(255,255,255,.06)" }}>
              {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
              <input id={\`\${state.id}-start\`} name={\`\${state.name}-start\`} title={state.title} tabIndex={state.tabIndex} dir={state.dir} lang={state.lang} type={state.pickerType} value={value} min={normalizeDateValue(state.min, state.pickerType)} max={valueEnd || normalizeDateValue(state.max, state.pickerType)} step={state.step} required={state.required} disabled={disabled} readOnly={state.readOnly} autoComplete={state.autocomplete} inputMode={state.inputMode} enterKeyHint={state.enterKeyHint} aria-invalid={invalid || undefined} aria-label={state.ariaLabel ? state.ariaLabel + ", start" : "Range start date"} aria-describedby={helpId} onChange={(event) => setValue(event.target.value)} style={{ width: "100%", minWidth: 0, border: 0, outline: "none", background: "transparent", color: state.foreground, fontSize: state.inputSize }} />
            </div>
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            <label htmlFor={\`\${state.id}-end\`} style={{ fontSize: 12, color: state.muted }}>To</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 16, border: \`1px solid \${invalid ? state.errorColor : state.border}\`, padding: "8px 12px", background: "rgba(255,255,255,.06)" }}>
              {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
              <input id={\`\${state.id}-end\`} name={\`\${state.name}-end\`} title={state.title} tabIndex={state.tabIndex < 0 ? state.tabIndex : state.tabIndex + 1} dir={state.dir} lang={state.lang} type={state.pickerType} value={valueEnd} min={value || normalizeDateValue(state.min, state.pickerType)} max={normalizeDateValue(state.max, state.pickerType)} step={state.step} required={state.required} disabled={disabled} readOnly={state.readOnly} autoComplete={state.autocomplete} inputMode={state.inputMode} enterKeyHint={state.enterKeyHint} aria-invalid={invalid || undefined} aria-label={state.ariaLabel ? state.ariaLabel + ", end" : "Range end date"} aria-describedby={helpId} onChange={(event) => setValueEnd(event.target.value)} style={{ width: "100%", minWidth: 0, border: 0, outline: "none", background: "transparent", color: state.foreground, fontSize: state.inputSize }} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 16, border: \`1px solid \${invalid ? state.errorColor : state.border}\`, padding: "8px 12px", background: "rgba(255,255,255,.06)" }}>
          {state.showCalendarIcon ? <span aria-hidden="true" style={{ color: state.accent }}>calendar</span> : null}
          <input
            id={state.id}
            name={state.name}
            title={state.title}
            tabIndex={state.tabIndex}
            dir={state.dir}
            lang={state.lang}
            type={state.pickerType}
            value={value}
            min={normalizeDateValue(state.min, state.pickerType)}
            max={normalizeDateValue(state.max, state.pickerType)}
            step={state.step}
            required={state.required}
            disabled={disabled}
            readOnly={state.readOnly}
            autoComplete={state.autocomplete}
            inputMode={state.inputMode}
            enterKeyHint={state.enterKeyHint}
            aria-invalid={invalid || undefined}
            aria-describedby={helpId}
            aria-label={state.ariaLabel || undefined}
            onChange={(event) => setValue(event.target.value)}
            style={{ width: "100%", minWidth: 0, border: 0, outline: "none", background: "transparent", color: state.foreground, fontSize: state.inputSize }}
          />
          {state.showClearAction && value && !disabled && !state.readOnly ? (
            <button type="button" aria-label="Clear date" onClick={() => setValue("")} style={{ border: 0, background: "transparent", color: state.muted, cursor: "pointer" }}>
              Clear
            </button>
          ) : null}
        </div>
      )}
      <small id={helpId} style={{ color: invalid ? state.errorColor : success ? state.successColor : state.muted }}>
        {message}
      </small>
    </div>
  );
}
`;
}
