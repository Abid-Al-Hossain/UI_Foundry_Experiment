import type { SelectStudioState } from "../types";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: SelectStudioState, fileName = "select") : ExportPayload {
  return {
    fileName: `${fileName || "select"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: SelectStudioState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : "inherit"; }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


export default function SelectStudioComponent() {
  const invalid = state.invalid || state.previewState === "invalid";
  const message = invalid ? state.errorText : state.showSuccess ? state.successText : state.showHelper ? state.helper : "";
  const messageId = \`\${state.id}-message\`;
  const describedBy = [state.ariaDescribedBy, message ? messageId : ""].filter(Boolean).join(" ") || undefined;
  const [activeOptionIdx, setActiveOptionIdx] = React.useState(null);
  const optionCount = Math.max(2, state.optionCount);
  const groupCount = Math.max(1, state.groupCount);
  const options = Array.from({ length: optionCount }, (_, index) => ({
    label: index === 0 ? "Growth workspace" : \`Option \${index + 1}\`,
    value: index === 0 ? state.value : \`option-\${index + 1}\`,
    group: \`Group \${(index % groupCount) + 1}\`,
    optionDisabled: index % 4 === 3,
  }));
  const selectedOption = options.find((option) => option.value === state.value) ?? options[0];
  const selectedValues = state.multiple ? [options[0]?.value, options[1]?.value].filter(Boolean) : [state.value];
  const groups = Array.from(new Set(options.map((option) => option.group)));
  const fieldStyle = {
    width: "100%",
    borderRadius: 12,
    border: \`1px solid \${invalid ? state.errorColor : state.border}\`,
    background: "rgba(255,255,255,0.1)",
    padding: "8px 12px",
    outline: 0,
    color: state.foreground,
  };
  const nativeSelect = (
    <select
      id={state.id}
      name={state.name}
      title={state.title}
      tabIndex={state.tabIndex}
      dir={state.dir}
      lang={state.lang}
      multiple={state.multiple || undefined}
      size={state.multiple ? Math.min(optionCount, 5) : undefined}
      value={state.multiple ? selectedValues : state.value}
      required={state.required}
      disabled={state.disabled}
      autoComplete={state.autocomplete}
      aria-invalid={invalid || undefined}
      aria-label={state.ariaLabel || undefined}
      aria-describedby={describedBy}
      style={fieldStyle}
      onChange={() => undefined}
    >
      {!state.multiple && state.placeholder && <option value="" disabled={state.required}>{state.placeholder}</option>}
      {groups.map((group) => (
        <optgroup key={group} label={group}>
          {options.filter((option) => option.group === group).map((option) => (
            <option key={option.value} value={option.value} disabled={option.optionDisabled}>{option.label}</option>
          ))}
        </optgroup>
      ))}
    </select>
  );
  const customPanel = (
    <div role="listbox" id={\`\${state.id}-listbox\`} aria-label={state.ariaLabel || \`\${state.label} options\`} aria-multiselectable={state.multiple || undefined} style={{ display: "grid", gap: 4, overflowY: "auto", maxHeight: state.listMaxHeight, boxShadow: state.listShadow, borderRadius: 12, border: \`1px solid \${state.border}\`, padding: 8, background: "rgba(255,255,255,0.06)" }}>
      {options.map((option, idx) => {
        const isSelected = state.multiple ? idx < 2 : option.value === state.value;
        const isActive = activeOptionIdx === idx;
        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.optionDisabled || undefined}
            disabled={option.optionDisabled}
            onMouseEnter={() => setActiveOptionIdx(idx)}
            onMouseLeave={() => setActiveOptionIdx((current) => (current === idx ? null : current))}
            onFocus={() => setActiveOptionIdx(idx)}
            onBlur={() => setActiveOptionIdx((current) => (current === idx ? null : current))}
            style={{ border: 0, borderRadius: 8, padding: "8px 12px", textAlign: "left", display: "flex", alignItems: "center", gap: 8, background: isSelected ? state.itemActiveBg : isActive ? state.optionActiveBg : "transparent", color: option.optionDisabled ? state.optionDisabledColor : isSelected ? state.optionSelectedText : isActive ? state.optionActiveText : state.foreground }}
          >
            {state.multiple && <span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 16, height: 16, flexShrink: 0, borderRadius: 4, border: \`2px solid \${isSelected ? state.accent : state.border}\`, background: isSelected ? state.accent : "transparent" }}>{isSelected ? "✓" : ""}</span>}
            {option.label}
            {!state.multiple && isSelected && <span aria-hidden="true" style={{ marginLeft: "auto", color: state.checkmarkColor }}>✓</span>}
          </button>
        );
      })}
    </div>
  );

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
        boxShadow: \`0 \${Math.round(state.shadow / 3)}px \${state.shadow}px rgba(0,0,0,.28)\`,
        background: state.background,
        color: state.foreground,
        fontFamily: resolveFont(state),
        opacity: state.disabled || state.previewState === "disabled" ? 0.55 : 1,
        outline: state.previewState === "focus" ? \`\${state.focusRing}px solid \${state.accent}\` : "none",
        transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none",
      }}
    >
      <label htmlFor={state.id} style={{ fontSize: state.labelSize, fontWeight: state.fontWeight }}>
        {state.label}{state.required ? " *" : ""}
      </label>
      <p style={{ margin: 0, color: state.muted }}>{state.description}</p>
      {state.selectMode === "native" ? nativeSelect : (
        <div style={{ display: "grid", gap: 8 }}>
          {state.selectMode === "combobox" && state.searchable ? (
            <div style={{ position: "relative" }}>
              <input
                id={state.id}
                role="combobox"
                aria-controls={\`\${state.id}-listbox\`}
                aria-expanded="true"
                aria-autocomplete="list"
                aria-invalid={invalid || undefined}
                aria-label={state.ariaLabel || undefined}
                aria-describedby={describedBy}
                value={state.multiple ? selectedValues.length + " selected" : selectedOption.label}
                placeholder={state.placeholder}
                disabled={state.disabled}
                readOnly
                style={{ ...fieldStyle, paddingRight: 28 }}
              />
              <span aria-hidden="true" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: state.chevronColor, pointerEvents: "none" }}>▾</span>
            </div>
          ) : (
            <button
              id={state.id}
              type="button"
              role="combobox"
              aria-controls={\`\${state.id}-listbox\`}
              aria-expanded="true"
              aria-invalid={invalid || undefined}
              aria-label={state.ariaLabel || undefined}
              aria-describedby={describedBy}
              disabled={state.disabled}
              style={{ ...fieldStyle, textAlign: "left", position: "relative", paddingRight: 28 }}
            >
              {state.multiple ? selectedValues.length + " selected" : (selectedOption.label || state.placeholder)}
              <span aria-hidden="true" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: state.chevronColor }}>▾</span>
            </button>
          )}
          {state.clearable && (
            <button type="button" disabled={state.disabled} style={{ justifySelf: "start", border: \`1px solid \${state.border}\`, borderRadius: 8, padding: "4px 8px", color: state.foreground, background: "transparent" }}>
              Clear selection
            </button>
          )}
          {customPanel}
        </div>
      )}
      <small id={messageId} style={{ color: invalid ? state.errorColor : state.showSuccess ? state.successColor : state.muted }}>{message}</small>
    </div>
  );
}
`;
}
