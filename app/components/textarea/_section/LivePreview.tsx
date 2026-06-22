"use client";

import React, { useEffect, useState } from "react";
import { type TextareaState } from "../types";
import {
  resolveTextareaAriaInvalid,
  resolveTextareaBackground,
  resolveTextareaDescribedBy,
  resolveTextareaFloatingLabelStyle,
  resolveTextareaFontFamily,
  resolveTextareaPadding,
  resolveTextareaRadius,
  resolveTextareaShadow,
} from "../_utils/textareaVisuals";

type SupportingMessage = {
  id: string;
  text: string;
  color: string;
};

export default function LivePreview({ state }: { state: TextareaState }) {
  const [value, setValue] = useState(state.defaultValue);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValue(state.defaultValue);
  }, [state.defaultValue]);

  const floatingActive =
    state.labelPosition === "floating" && (focused || value.length > 0);
  const radius = resolveTextareaRadius(state);
  const background = resolveTextareaBackground(state);
  const fontFamily = resolveTextareaFontFamily(state);
  const shadow = resolveTextareaShadow(state);

  const secondaryMessage: SupportingMessage | null = state.descriptionText
    ? {
        id: "textarea-preview-description",
        text: state.descriptionText,
        color: state.descriptionColor,
      }
    : state.helperText
      ? {
          id: "textarea-preview-helper",
          text: state.helperText,
          color: state.helperColor,
        }
      : null;

  const feedbackMessage: SupportingMessage | null = state.errorText
    ? {
        id: "textarea-preview-error",
        text: state.errorText,
        color: state.errorColor,
      }
    : state.successText
      ? {
          id: "textarea-preview-success",
          text: state.successText,
          color: state.successColor,
        }
      : null;

  const describedBy = resolveTextareaDescribedBy(
    state,
    secondaryMessage?.id,
    feedbackMessage?.id,
  );
  const ariaInvalid = resolveTextareaAriaInvalid(state);
  const placeholderColor =
    state.labelPosition === "floating" && !floatingActive
      ? "transparent"
      : state.placeholderColor;

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    minHeight: state.minHeight,
    maxHeight: state.maxHeight,
    padding: resolveTextareaPadding(state, floatingActive),
    fontFamily,
    fontSize: `${state.fontSize}${state.fontSizeUnit || "px"}`,
    fontWeight: state.fontWeight,
    fontStyle: state.fontStyle,
    color: state.textColor,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit || "px"}`,
    textAlign: state.textAlign,
    textTransform: state.textTransform,
    lineHeight: state.lineHeight,
    whiteSpace: state.whiteSpace,
    overflowWrap: state.overflowWrap,
    wordBreak: state.wordBreak,
    tabSize: state.tabSize,
    background,
    border: `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`,
    borderRadius: radius,
    caretColor: state.caretColor,
    boxShadow: shadow,
    resize: state.resize,
    transition: `${state.transitionProperty} ${state.transitionDuration}ms ${state.transitionEasing}`,
    outline: "none",
    boxSizing: "border-box",
    scrollbarWidth: state.scrollbarWidth,
    scrollbarColor: `${state.scrollbarColor} ${state.scrollbarTrackColor}`,
  };

  const containerStyle: React.CSSProperties =
    state.labelPosition === "left"
      ? { display: "flex", alignItems: "flex-start", gap: state.labelGap }
      : { display: "flex", flexDirection: "column", gap: state.labelGap };
  const topLabelStyle: React.CSSProperties = {
    display: "block",
    color: state.labelColor,
    fontSize: state.labelFontSize,
    fontWeight: state.labelFontWeight,
    flexShrink: 0,
  };
  const floatingLabelStyle = resolveTextareaFloatingLabelStyle(
    state,
    floatingActive,
  );

  const pseudoId = state.id || "textarea-preview";
  const cssString = `
    #${pseudoId}:focus {
      border-color: ${state.focusBorderColor} !important;
      border-width: ${state.focusBorderWidth}px !important;
      background: ${state.focusBackgroundColor} !important;
      box-shadow: 0 0 0 ${state.focusBoxShadowSpread}px ${state.focusBoxShadowColor} !important;
      ${state.focusOutlineStyle !== "none" ? `outline: ${state.focusOutlineWidth}px ${state.focusOutlineStyle} ${state.focusOutlineColor} !important; outline-offset: ${state.focusOutlineOffset}px !important;` : "outline: none !important;"}
    }
    #${pseudoId}:hover:not(:disabled) {
      border-color: ${state.hoverBorderColor} !important;
      border-width: ${state.hoverBorderWidth}px !important;
      background: ${state.hoverBackgroundColor} !important;
    }
    #${pseudoId}:disabled {
      opacity: ${state.disabledOpacity} !important;
      cursor: ${state.disabledCursor} !important;
      ${state.disabledUseCustomColors ? `background: ${state.disabledBackgroundColor} !important; color: ${state.disabledTextColor} !important; border-color: ${state.disabledBorderColor} !important;` : ""}
    }
    #${pseudoId}::placeholder {
      color: ${placeholderColor} !important;
      opacity: ${state.placeholderOpacity} !important;
      font-style: ${state.placeholderFontStyle} !important;
    }
    #${pseudoId}::selection {
      background: ${state.selectionBg} !important;
      color: ${state.selectionColor} !important;
    }
  `;

  const charCountNode = state.charCount ? (
    <p
      style={
        state.characterCountPosition === "inside"
          ? { position: "absolute", right: 8, bottom: 6, margin: 0, fontSize: 11, color: "#94a3b8", pointerEvents: "none" }
          : state.characterCountPosition === "floating"
          ? { position: "absolute", right: 0, top: "100%", marginTop: 2, fontSize: 11, color: "#94a3b8" }
          : { marginTop: 4, marginBottom: state.characterCountPosition === "above" ? 4 : 0, fontSize: 11, color: "#94a3b8", textAlign: "right" }
      }
    >
      {value.length}
      {state.maxLength > 0 ? ` / ${state.maxLength}` : " chars"}
    </p>
  ) : null;

  const textareaNode = (
    <div style={{ position: "relative", width: "100%" }}>
      {state.labelPosition === "floating" ? (
        <label htmlFor={pseudoId} style={floatingLabelStyle}>
          {state.labelText}
          {state.showRequired ? (
            <span style={{ color: state.requiredColor }}> *</span>
          ) : null}
        </label>
      ) : null}
      {state.characterCountPosition === "above" ? charCountNode : null}
      <textarea
        id={pseudoId}
        placeholder={state.placeholder}
        value={value}
        onChange={(event) => {
          if (!state.disabled && !state.readOnly) {
            setValue(event.target.value);
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        name={state.name}
        title={state.title || undefined}
        required={state.required}
        disabled={state.disabled}
        readOnly={state.readOnly}
        maxLength={state.maxLength > 0 ? state.maxLength : undefined}
        minLength={state.minLength > 0 ? state.minLength : undefined}
        rows={Math.min(state.maxRows, Math.max(state.minRows, state.rows))}
        cols={state.cols}
        wrap={state.wrap}
        spellCheck={state.spellcheck}
        aria-label={state.ariaLabel || undefined}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        aria-required={state.required || undefined}
        autoComplete={state.autocomplete}
        inputMode={state.inputMode}
        enterKeyHint={state.enterKeyHint}
        autoCapitalize={state.autoCapitalize}
        autoCorrect={state.autoCorrect}
        dir={state.dir}
        lang={state.lang || undefined}
        tabIndex={state.tabIndex}
        role={state.role || undefined}
        style={textareaStyle}
      />
      {state.characterCountPosition === "inside" || state.characterCountPosition === "floating" ? charCountNode : null}
    </div>
  );

  return (
    <div
      className="flex items-center justify-center p-8"
      style={{ minHeight: 300 }}
    >
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <div style={{ width: "100%", maxWidth: 480 }}>
        {state.labelPosition === "left" ? (
          <div style={containerStyle}>
            <label style={topLabelStyle}>
              {state.labelText}
              {state.showRequired ? (
                <span style={{ color: state.requiredColor }}> *</span>
              ) : null}
            </label>
            {textareaNode}
          </div>
        ) : state.labelPosition === "top" ? (
          <div style={containerStyle}>
            <label style={topLabelStyle}>
              {state.labelText}
              {state.showRequired ? (
                <span style={{ color: state.requiredColor }}> *</span>
              ) : null}
            </label>
            {textareaNode}
          </div>
        ) : (
          textareaNode
        )}
        {secondaryMessage && (
          <p
            id={secondaryMessage.id}
            style={{ marginTop: 4, fontSize: 12, color: secondaryMessage.color }}
          >
            {secondaryMessage.text}
          </p>
        )}
        {feedbackMessage && (
          <p
            id={feedbackMessage.id}
            style={{ marginTop: 4, fontSize: 12, color: feedbackMessage.color }}
          >
            {feedbackMessage.text}
          </p>
        )}
        {state.characterCountPosition === "below" ? charCountNode : null}
      </div>
    </div>
  );
}
