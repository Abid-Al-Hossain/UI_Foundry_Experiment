import type { TimePickerState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: TimePickerState, fileName = "time-picker") : ExportPayload {
  return {
    fileName: `${fileName || "time-picker"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: TimePickerState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function normalizeTimeValue(value, showSeconds) {
  if (!value) return "";
  const [rawHour = "", rawMinute = "", rawSecond = ""] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  const second = rawSecond.padStart(2, "0").slice(0, 2);
  return showSeconds ? \`\${hour}:\${minute}:\${second || "00"}\` : \`\${hour}:\${minute}\`;
}

function nativeStep(config) {
  return config.showSeconds ? Math.max(1, Math.min(config.step, 59)) : Math.max(60, config.step);
}

export default function TimePickerComponent() {
  const invalid = state.invalid || state.previewState === "invalid";
  const disabled = state.disabled || state.previewState === "disabled";
  const success = state.showSuccess && !invalid;
  const helpId = \`\${state.id}-help\`;
  const timezoneId = \`\${state.id}-timezone\`;
  const describedBy = [helpId, state.showTimezone ? timezoneId : ""].filter(Boolean).join(" ");
  const message = invalid ? state.errorText : success ? state.successText : state.showHelper ? state.helper : "";
  const [value, setValue] = React.useState(() => normalizeTimeValue(state.value, state.showSeconds));

  React.useEffect(() => {
    setValue(normalizeTimeValue(state.value, state.showSeconds));
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
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      {state.description ? <p style={{ margin: 0, color: state.muted }}>{state.description}</p> : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 16,
          border: \`1px solid \${invalid ? state.errorColor : state.border}\`,
          padding: "8px 12px",
          background: "rgba(255,255,255,.06)",
        }}
      >
        <input
          id={state.id}
          name={state.name}
          title={state.title}
          tabIndex={state.tabIndex}
          dir={state.dir}
          lang={state.lang}
          type="time"
          value={value}
          min={normalizeTimeValue(state.min, state.showSeconds)}
          max={normalizeTimeValue(state.max, state.showSeconds)}
          step={nativeStep(state)}
          required={state.required}
          disabled={disabled}
          readOnly={state.readOnly}
          autoComplete={state.autocomplete}
          inputMode={state.inputMode}
          enterKeyHint={state.enterKeyHint}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          aria-label={state.ariaLabel || undefined}
          onChange={(event) => setValue(event.target.value)}
          style={{
            width: "100%",
            minWidth: 0,
            border: 0,
            outline: "none",
            background: "transparent",
            color: state.foreground,
            fontSize: state.inputSize,
          }}
        />
        {state.showClearAction && value && !disabled && !state.readOnly ? (
          <button type="button" aria-label="Clear time" onClick={() => setValue("")} style={{ border: 0, background: "transparent", color: state.muted, cursor: "pointer" }}>
            Clear
          </button>
        ) : null}
      </div>
      {state.showTimezone ? <span id={timezoneId} style={{ color: state.muted, fontSize: 12 }}>{state.timezoneLabel}</span> : null}
      <small id={helpId} style={{ color: invalid ? state.errorColor : success ? state.successColor : state.muted }}>
        {message}
      </small>
    </div>
  );
}
`;
}
