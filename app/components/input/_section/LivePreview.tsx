import React, { useState, useEffect } from "react";
import { TextInputState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function LivePreview({ state }: { state: TextInputState }) {
  const radius = state.linkRadius
    ? `${state.borderRadius}px`
    : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;

  const bg = state.useGradient
    ? `linear-gradient(${state.gradientAngle}deg, ${state.gradientStart}, ${state.gradientEnd})`
    : state.backgroundColor;

  // Construct Shadow
  const shadowColorRgba = hexToRgba(state.shadowColor, state.shadowOpacity);
  const shadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${shadowColorRgba}`
    : "none";

  // Construct Font Family
  const fontFamily =
    state.fontBucket === "google"
      ? state.googleFontFamily
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: state.height,
    padding: `${state.paddingY}px ${state.paddingX}px`,
    fontFamily: fontFamily,
    fontSize: `${state.fontSize}${state.fontSizeUnit}`,
    fontWeight: state.fontWeight,
    fontStyle: state.fontStyle,
    color: state.textColor,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    textAlign: state.textAlign as any,
    textTransform: state.textTransform as any,
    lineHeight: state.lineHeight,
    background: bg,
    border: `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`,
    borderRadius: radius,
    caretColor: state.caretColor,
    boxShadow: shadow,
    transition: `${state.transitionProperty} ${state.transitionDuration}ms ${state.transitionEasing}`,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const containerStyle: React.CSSProperties =
    state.labelPosition === "left"
      ? { display: "flex", alignItems: "center", gap: state.labelGap }
      : { display: "flex", flexDirection: "column", gap: state.labelGap };

  const pseudoId = "text-input-preview";
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
      color: ${state.placeholderColor} !important;
      opacity: ${state.placeholderOpacity} !important;
      font-style: ${state.placeholderFontStyle} !important;
    }
    #${pseudoId}::selection {
      background: ${state.selectionBg} !important;
      color: ${state.selectionColor} !important;
    }
  `;

  return (
    <div
      className="flex items-center justify-center p-8"
      style={{ minHeight: 300 }}
    >
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={containerStyle}>
          {state.labelPosition !== "hidden" && (
            <label
              style={{
                display: "block",
                color: state.labelColor,
                fontSize: state.labelFontSize,
                fontWeight: state.labelFontWeight,
                flexShrink: 0,
              }}
            >
              {state.labelText}
              {state.showRequired && (
                <span style={{ color: state.requiredColor }}> *</span>
              )}
            </label>
          )}
          <div style={{ position: "relative", width: "100%" }}>
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
            <input
              id={pseudoId}
              type={state.inputType}
              placeholder={state.placeholder}
              defaultValue={state.defaultValue}
              name={state.name}
              required={state.required}
              disabled={state.disabled}
              readOnly={state.readOnly}
              maxLength={state.maxLength > 0 ? state.maxLength : undefined}
              minLength={state.minLength > 0 ? state.minLength : undefined}
              pattern={state.pattern || undefined}
              aria-label={state.ariaLabel || undefined}
              aria-describedby={state.ariaDescribedBy || undefined}
              aria-invalid={state.ariaInvalid || undefined}
              autoComplete={state.autocomplete}
              inputMode={state.inputmode as any}
              role={state.role || undefined}
              style={{
                ...inputStyle,
                ...(state.iconEnabled
                  ? {
                      [`padding${state.iconPosition === "left" ? "Left" : "Right"}`]: `calc(${state.paddingX}px + ${state.iconSize}px + 8px)`,
                    }
                  : {}),
              }}
            />
          </div>
        </div>
        {state.helperText && (
          <p style={{ marginTop: 4, fontSize: 12, color: state.helperColor }}>
            {state.helperText}
          </p>
        )}
        {state.errorText && (
          <p style={{ marginTop: 4, fontSize: 12, color: state.errorColor }}>
            {state.errorText}
          </p>
        )}
      </div>
    </div>
  );
}
