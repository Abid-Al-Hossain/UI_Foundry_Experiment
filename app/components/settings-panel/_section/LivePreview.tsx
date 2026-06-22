"use client";

import type { CSSProperties } from "react";
import type { SettingsPanelState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

const SETTING_GROUPS = [
  { title: "Account", description: "Profile and identity settings", fields: ["Display name", "Workspace slug", "Contact email"] },
  { title: "Notifications", description: "Delivery and alert preferences", fields: ["Product updates", "Security alerts", "Weekly digest"] },
  { title: "Privacy", description: "Visibility and data controls", fields: ["Public profile", "Usage analytics", "Data retention"] },
  { title: "Billing", description: "Invoices and payment settings", fields: ["Plan", "Invoice email", "Spend alerts"] },
  { title: "Integrations", description: "Connected app permissions", fields: ["API access", "Webhook endpoint", "Sync cadence"] },
  { title: "Advanced", description: "Administrative defaults", fields: ["Default role", "Session timeout", "Beta access"] },
];

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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function resolveStatus(state: SettingsPanelState) {
  if (state.previewState === "error" || state.saveState === "error") {
    return { role: "alert", text: "Unable to save settings. Review the highlighted fields and try again.", color: "#fca5a5" };
  }
  if (state.previewState === "success" || state.saveState === "success") {
    return { role: "status", text: "Settings saved successfully.", color: "#86efac" };
  }
  if (state.previewState === "loading" || state.saveState === "saving") {
    return { role: "status", text: "Saving settings...", color: state.accent };
  }
  if (state.dirtyState) {
    return { role: "status", text: "Unsaved changes are ready to save.", color: state.accent };
  }
  return { role: "status", text: "Settings are up to date.", color: state.muted };
}

function shell(state: SettingsPanelState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    display: "grid",
    gap: state.gap,
    padding: state.padding,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: `${buildShadow(state)}`,
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? 0.58 : 1,
  };
}

export default function LivePreview({ state }: { state: SettingsPanelState }) {
  const groupCount = clamp(state.groupCount, 1, SETTING_GROUPS.length);
  const controlCount = clamp(state.controlCount, 1, 16);
  const groups = SETTING_GROUPS.slice(0, groupCount);
  const status = resolveStatus(state);
  const describedBy = `${state.id}-description ${state.id}-status`;
  const groupStyle: CSSProperties = {
    display: "grid",
    gap: 12,
    margin: 0,
    padding: 14,
    border: `1px solid ${state.border}`,
    borderRadius: Math.max(12, state.radius - 8),
    transition: state.transitionDuration > 0 ? "opacity 0.2s ease, border-color 0.2s ease" : "none",
  };
  const labelStyle: CSSProperties = { display: "grid", gap: 6, color: state.foreground, fontSize: state.bodySize };
  const controlStyle: CSSProperties = {
    width: "100%",
    border: `1px solid ${state.border}`,
    borderRadius: 12,
    padding: "10px 12px",
    background: "transparent",
    color: state.foreground,
  };

  return (
    <form id={state.id} role={state.role} aria-label={state.ariaLabel} aria-describedby={describedBy} onSubmit={(event) => event.preventDefault()} style={shell(state)}>
      <header className="grid gap-1.5">
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={`${state.id}-description`} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>

      {groups.map((group, groupIndex) => (
        <fieldset key={group.title} style={groupStyle}>
          <legend>{group.title}</legend>
          <p id={`${state.id}-group-${groupIndex}-description`} style={{ margin: 0, color: state.muted, fontSize: 12 }}>{group.description}</p>
          {group.fields.slice(0, Math.max(1, Math.ceil(controlCount / groupCount))).map((field, fieldIndex) => {
            const fieldId = `${state.id}-${groupIndex}-${fieldIndex}`;
            const helpId = `${fieldId}-help`;
            const kind = (groupIndex + fieldIndex) % 3;

            if (kind === 0) {
              return (
                <label key={field} htmlFor={fieldId} style={labelStyle}>
                  {field}
                  <input id={fieldId} name={field.toLowerCase().replaceAll(" ", "-")} type="text" defaultValue={fieldIndex === 0 ? state.label : ""} aria-describedby={helpId} aria-invalid={state.previewState === "error" ? "true" : undefined} disabled={state.disabled} style={controlStyle} />
                  <span id={helpId} style={{ color: state.muted, fontSize: 12 }}>Update {field.toLowerCase()} for this settings group.</span>
                </label>
              );
            }

            if (kind === 1) {
              return (
                <label key={field} htmlFor={fieldId} style={labelStyle}>
                  {field}
                  <select id={fieldId} name={field.toLowerCase().replaceAll(" ", "-")} defaultValue="balanced" aria-describedby={helpId} disabled={state.disabled} style={controlStyle}>
                    <option value="minimal">Minimal</option>
                    <option value="balanced">Balanced</option>
                    <option value="strict">Strict</option>
                  </select>
                  <span id={helpId} style={{ color: state.muted, fontSize: 12 }}>Choose how strongly this setting should apply.</span>
                </label>
              );
            }

            return (
              <label key={field} htmlFor={fieldId} className="flex items-center justify-between gap-3" style={{ fontSize: state.bodySize, transition: state.transitionDuration > 0 ? "background 0.15s ease, color 0.15s ease" : "none" }}>
                <span>
                  <strong>{field}</strong>
                  <small id={helpId} style={{ display: "block", color: state.muted }}>Toggle {field.toLowerCase()} for this workspace.</small>
                </span>
                <input id={fieldId} name={field.toLowerCase().replaceAll(" ", "-")} type="checkbox" defaultChecked={state.dirtyState} aria-describedby={helpId} disabled={state.disabled} />
              </label>
            );
          })}
        </fieldset>
      ))}

      <p id={`${state.id}-status`} role={status.role} aria-live="polite" style={{ margin: 0, color: status.color, fontSize: 13 }}>{status.text}</p>

      <div className="flex flex-wrap gap-2.5">
        <button type="submit" disabled={state.disabled || state.previewState === "loading"} className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: state.accent, color: state.actionText, transition: state.transitionDuration > 0 ? "background 0.15s ease, opacity 0.15s ease" : "none" }}>Save settings</button>
        {state.showReset && <button type="reset" disabled={state.disabled} className="rounded-xl border px-4 py-2 text-sm" style={{ borderColor: state.border, color: state.foreground, transition: state.transitionDuration > 0 ? "border-color 0.15s ease, color 0.15s ease" : "none" }}>Reset settings</button>}
      </div>
    </form>
  );
}
