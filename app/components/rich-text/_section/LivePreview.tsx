"use client";

import type { CSSProperties } from "react";
import type { RichTextState } from "../types";
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

function shell(state: RichTextState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    display: "grid",
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
  };
}

export default function LivePreview({ state }: { state: RichTextState }) {
  const isEmpty = state.previewState === "empty";
  const isFocused = state.previewState === "focus" || state.previewState === "active";
  const descriptionId = `${state.id}-description`;
  const countId = `${state.id}-count`;
  const words = Math.max(1, Math.round(state.characterCount / 6));
  const toolbarButtons = [
    ...(state.showMarks ? ["Bold", "Italic", "Link"] : []),
    ...(state.showLists ? ["Bulleted list", "Numbered list"] : []),
  ];

  return (
    <section id={state.id} aria-label={state.ariaLabel} style={shell(state)}>
      <header style={{ display: "grid", gap: 6 }}>
        <span style={{ color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{state.toolbarMode} editor</span>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>

      {state.toolbarMode !== "none" && (
        <div role="toolbar" aria-label={`${state.label} formatting toolbar`} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {toolbarButtons.map((button) => (
            <button key={button} type="button" disabled={state.disabled} aria-pressed={button === "Bold" || button === "Bulleted list"} style={{ border: `1px solid ${state.border}`, borderRadius: 999, background: button === "Bold" ? state.accent : "transparent", color: button === "Bold" ? state.background : state.foreground, padding: "7px 11px", fontSize: 12, fontWeight: 700, transition: state.transitionDuration > 0 ? "background 0.15s ease, color 0.15s ease" : "none" }}>
              {button}
            </button>
          ))}
        </div>
      )}

      <div
        role="textbox"
        aria-label={state.ariaLabel}
        aria-describedby={`${descriptionId} ${countId}`}
        aria-multiline="true"
        contentEditable={!state.disabled}
        suppressContentEditableWarning
        tabIndex={state.disabled ? -1 : state.tabIndex}
        data-placeholder={state.placeholder}
        style={{ minHeight: Math.max(130, state.height - 150), border: `${Math.max(1, state.borderWidth)}px solid ${isFocused ? state.accent : state.border}`, borderRadius: Math.max(12, state.radius - 8), background: "rgba(255,255,255,.06)", outline: isFocused ? `3px solid ${state.accent}33` : "none", padding: Math.max(14, Math.round(state.padding * 0.7)), color: state.foreground, fontSize: state.bodySize, lineHeight: 1.7 }}
      >
        {isEmpty ? (
          <span style={{ color: state.muted }}>{state.placeholder}</span>
        ) : (
          <>
            <p style={{ margin: "0 0 10px" }}><strong>{state.label}</strong> starts with a {state.blockType} block and keeps editing affordances visible.</p>
            {state.showMarks && <p style={{ margin: "0 0 10px" }}>Formatting preview: <strong>bold</strong>, <em>italic</em>, and <a href="#" style={{ color: state.accent }}>inline link</a>.</p>}
            {state.showLists && <ul style={{ margin: 0, paddingLeft: 22 }}><li>Semantic list content</li><li>Keyboard-editable surface</li></ul>}
          </>
        )}
      </div>

      <footer style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, color: state.muted, fontSize: 12 }}>
        <span>{state.helper}</span>
        <span id={countId} aria-live="polite">{state.characterCount} characters / {words} words</span>
      </footer>
    </section>
  );
}
