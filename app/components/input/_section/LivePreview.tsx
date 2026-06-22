"use client";

import React, { useEffect, useState } from "react";
import { TextInputState } from "../types";
import {
  resolveInputAriaInvalid,
  resolveInputBackground,
  resolveInputDescribedBy,
  resolveInputFontFamily,
  resolveInputFloatingLabelStyle,
  resolveInputPadding,
  resolveInputRadius,
  resolveInputShadow,
} from "../_utils/inputVisuals";

type SupportingMessage = {
  id: string;
  text: string;
  color: string;
};

const getAdornmentWidth = (text: string) =>
  text ? Math.max(30, text.length * 8 + 18) : 0;

const RANGE_ATTRIBUTE_TYPES = new Set([
  "number",
  "range",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
]);

export default function LivePreview({ state }: { state: TextInputState }) {
  const [value, setValue] = useState(state.defaultValue);
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setValue(state.defaultValue);
  }, [state.defaultValue]);

  useEffect(() => {
    if (state.inputType !== "password") {
      setRevealed(false);
    }
  }, [state.inputType]);

  const floatingActive =
    state.labelPosition === "floating" && (focused || value.length > 0);

  const radius = resolveInputRadius(state);
  const background = resolveInputBackground(state);
  const shadow = resolveInputShadow(state);
  const fontFamily = resolveInputFontFamily(state);

  const secondaryMessage: SupportingMessage | null = state.descriptionText
    ? {
        id: "text-input-preview-description",
        text: state.descriptionText,
        color: state.descriptionColor,
      }
    : state.helperText
      ? {
          id: "text-input-preview-helper",
          text: state.helperText,
          color: state.helperColor,
        }
      : null;

  const feedbackMessage: SupportingMessage | null = state.errorText
    ? {
        id: "text-input-preview-error",
        text: state.errorText,
        color: state.errorColor,
      }
    : state.successText
      ? {
          id: "text-input-preview-success",
          text: state.successText,
          color: state.successColor,
        }
      : null;

  const describedBy = resolveInputDescribedBy(
    state,
    secondaryMessage?.id,
    feedbackMessage?.id,
  );
  const supportsRangeAttributes = RANGE_ATTRIBUTE_TYPES.has(state.inputType);
  const ariaInvalid = resolveInputAriaInvalid(state);
  const placeholderColor =
    state.labelPosition === "floating" && !floatingActive
      ? "transparent"
      : state.placeholderColor;

  const prefixWidth = getAdornmentWidth(state.prefixText);
  const suffixWidth = getAdornmentWidth(state.suffixText);
  const iconInset = state.iconEnabled ? state.iconSize + 8 : 0;
  const clearActionWidth =
    state.showClearButton && value.length > 0 && !state.disabled && !state.readOnly
      ? 30
      : 0;
  const revealActionWidth =
    state.showPasswordToggle && state.inputType === "password" ? 34 : 0;

  const leftInset =
    state.paddingX +
    (state.iconEnabled && state.iconPosition === "left" ? iconInset : 0) +
    prefixWidth;
  const rightInset =
    state.paddingX +
    (state.iconEnabled && state.iconPosition === "right" ? iconInset : 0) +
    suffixWidth +
    clearActionWidth +
    revealActionWidth;

  const actualType =
    state.inputType === "password" && state.showPasswordToggle && revealed
      ? "text"
      : state.inputType;

  const basePadding = resolveInputPadding(state, floatingActive);
  const dynamicPadding = `${basePadding}`.replace(
    /^(\d+px)\s+(\d+px)\s+(\d+px)\s+(\d+px)$/,
    `$1 ${rightInset}px $3 ${leftInset}px`,
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: state.height,
    padding: dynamicPadding,
    fontFamily,
    fontSize: `${state.fontSize}${state.fontSizeUnit}`,
    fontWeight: state.fontWeight,
    fontStyle: state.fontStyle,
    color: state.textColor,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    textAlign: state.textAlign,
    textTransform: state.textTransform,
    lineHeight: state.lineHeight,
    background,
    border: `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`,
    borderRadius: radius,
    caretColor: state.caretColor,
    boxShadow: shadow,
    transition: `${state.transitionProperty} ${state.transitionDuration}ms ${state.transitionEasing}`,
    outline: "none",
    boxSizing: "border-box",
  };

  const fieldWrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
  };

  const topLabelStyle: React.CSSProperties = {
    display: "block",
    color: state.labelColor,
    fontSize: state.labelFontSize,
    fontWeight: state.labelFontWeight,
    flexShrink: 0,
  };

  const floatingLabelStyle = resolveInputFloatingLabelStyle(
    {
      ...state,
      paddingX: leftInset,
    },
    floatingActive,
  );

  const cssString = `
    #text-input-preview:focus {
      border-color: ${state.focusBorderColor} !important;
      border-width: ${state.focusBorderWidth}px !important;
      background: ${state.focusBackgroundColor} !important;
      box-shadow: 0 0 0 ${state.focusBoxShadowSpread}px ${state.focusBoxShadowColor} !important;
      ${state.focusOutlineStyle !== "none" ? `outline: ${state.focusOutlineWidth}px ${state.focusOutlineStyle} ${state.focusOutlineColor} !important; outline-offset: ${state.focusOutlineOffset}px !important;` : "outline: none !important;"}
    }
    #text-input-preview:hover:not(:disabled) {
      border-color: ${state.hoverBorderColor} !important;
      border-width: ${state.hoverBorderWidth}px !important;
      background: ${state.hoverBackgroundColor} !important;
    }
    #text-input-preview:disabled {
      opacity: ${state.disabledOpacity} !important;
      cursor: ${state.disabledCursor} !important;
      ${state.disabledUseCustomColors ? `background: ${state.disabledBackgroundColor} !important; color: ${state.disabledTextColor} !important; border-color: ${state.disabledBorderColor} !important;` : ""}
    }
    #text-input-preview::placeholder {
      color: ${placeholderColor} !important;
      opacity: ${state.placeholderOpacity} !important;
      font-style: ${state.placeholderFontStyle} !important;
    }
    #text-input-preview::selection {
      background: ${state.selectionBg} !important;
      color: ${state.selectionColor} !important;
    }
  `;

  const inputNode = (
    <div style={fieldWrapperStyle}>
      {state.labelPosition === "floating" && (
        <label htmlFor={state.id || "text-input-preview"} style={floatingLabelStyle}>
          {state.labelText}
          {state.showRequired && (
            <span style={{ color: state.requiredColor }}> *</span>
          )}
        </label>
      )}
      {state.iconEnabled && (
        <span
          style={{
            position: "absolute",
            [state.iconPosition]: state.paddingX,
            top: "50%",
            transform: "translateY(-50%)",
            color: state.iconColor,
            width: state.iconSize,
            height: state.iconSize,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
          dangerouslySetInnerHTML={{ __html: state.iconSvg }}
        />
      )}
      {state.prefixText && (
        <span
          style={{
            position: "absolute",
            left:
              state.paddingX +
              (state.iconEnabled && state.iconPosition === "left"
                ? state.iconSize + 8
                : 0),
            top: "50%",
            transform: "translateY(-50%)",
            color: state.prefixColor,
            fontSize: 12,
            fontWeight: 600,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {state.prefixText}
        </span>
      )}
      {state.suffixText && (
        <span
          style={{
            position: "absolute",
            right:
              state.paddingX +
              (state.iconEnabled && state.iconPosition === "right"
                ? state.iconSize + 8
                : 0) +
              clearActionWidth +
              revealActionWidth,
            top: "50%",
            transform: "translateY(-50%)",
            color: state.suffixColor,
            fontSize: 12,
            fontWeight: 600,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {state.suffixText}
        </span>
      )}
      {state.showClearButton &&
        value.length > 0 &&
        !state.disabled &&
        !state.readOnly && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setValue("")}
            style={{
              position: "absolute",
              right:
                state.paddingX +
                (state.showPasswordToggle && state.inputType === "password"
                  ? revealActionWidth
                  : 0),
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "var(--muted)",
              fontSize: 16,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        )}
      {state.showPasswordToggle && state.inputType === "password" && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setRevealed((current) => !current)}
          style={{
            position: "absolute",
            right: state.paddingX,
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            color: "var(--muted)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          {revealed ? "HIDE" : "SHOW"}
        </button>
      )}
      <input
        id={state.id || "text-input-preview"}
        type={actualType}
        placeholder={state.placeholder}
        value={value}
        onChange={(e) => {
          if (!state.disabled && !state.readOnly) {
            setValue(e.target.value);
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        title={state.title || undefined}
        name={state.name}
        required={state.required}
        disabled={state.disabled}
        readOnly={state.readOnly}
        maxLength={state.maxLength > 0 ? state.maxLength : undefined}
        minLength={state.minLength > 0 ? state.minLength : undefined}
        pattern={state.pattern || undefined}
        min={supportsRangeAttributes && state.minValue ? state.minValue : undefined}
        max={supportsRangeAttributes && state.maxValue ? state.maxValue : undefined}
        step={supportsRangeAttributes && state.stepValue ? state.stepValue : undefined}
        aria-label={state.ariaLabel || undefined}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        aria-required={state.required || undefined}
        autoComplete={state.autocomplete}
        inputMode={state.inputmode}
        enterKeyHint={state.enterKeyHint}
        autoCapitalize={state.autoCapitalize}
        autoCorrect={state.autoCorrect}
        dir={state.dir}
        lang={state.lang || undefined}
        tabIndex={state.tabIndex}
        spellCheck={state.spellCheck}
        role={state.role || undefined}
        style={inputStyle}
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center p-8" style={{ minHeight: 300 }}>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <div style={{ width: "100%", maxWidth: 420 }}>
        {state.labelPosition === "left" ? (
          <div style={{ display: "flex", alignItems: "center", gap: state.labelGap }}>
            <label style={topLabelStyle}>
              {state.labelText}
              {state.showRequired && (
                <span style={{ color: state.requiredColor }}> *</span>
              )}
            </label>
            {inputNode}
          </div>
        ) : state.labelPosition === "top" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: state.labelGap }}>
            <label style={topLabelStyle}>
              {state.labelText}
              {state.showRequired && (
                <span style={{ color: state.requiredColor }}> *</span>
              )}
            </label>
            {inputNode}
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%" }}>{inputNode}</div>
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
      </div>
    </div>
  );
}
