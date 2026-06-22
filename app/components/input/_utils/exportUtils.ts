"use client";
import { type TextInputState } from "../types";
import {
  resolveInputBackground,
  resolveInputFontFamily,
  resolveInputPadding,
  resolveInputRadius,
  resolveInputShadow,
} from "./inputVisuals";

export type TextInputExportInput = TextInputState & {
  downloadName: string;
};

const toJs = (value: string): string => JSON.stringify(value);
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

export function buildTextInputExportPayload(params: TextInputExportInput) {
  const { downloadName } = params;
  const filename = `${downloadName || "text-input"}.tsx`;
  const supportsRangeAttributes = RANGE_ATTRIBUTE_TYPES.has(params.inputType);

  const fontFamily = resolveInputFontFamily(params);
  const radius = resolveInputRadius(params);
  const background = resolveInputBackground(params);
  const shadow = resolveInputShadow(params);
  const basePadding = resolveInputPadding(params, false);
  const floatingPadding = resolveInputPadding(params, true);
  const isFloating = params.labelPosition === "floating";
  const isTop = params.labelPosition === "top";
  const isLeft = params.labelPosition === "left";

  const descriptionMessage = params.descriptionText
    ? {
        id: "text-input-preview-description",
        text: params.descriptionText,
        color: params.descriptionColor,
      }
    : params.helperText
      ? {
          id: "text-input-preview-helper",
          text: params.helperText,
          color: params.helperColor,
        }
      : null;

  const feedbackMessage = params.errorText
    ? {
        id: "text-input-preview-error",
        text: params.errorText,
        color: params.errorColor,
      }
    : params.successText
      ? {
          id: "text-input-preview-success",
          text: params.successText,
          color: params.successColor,
        }
      : null;

  const helperId = descriptionMessage?.id ?? "";
  const feedbackId = feedbackMessage?.id ?? "";
  const ariaInvalidExpr =
    params.ariaInvalid || Boolean(params.errorText) ? "true" : "undefined";
  const ariaLabel = params.ariaLabel ? toJs(params.ariaLabel) : "undefined";
  const role = params.role ? toJs(params.role) : "undefined";
  const title = params.title ? toJs(params.title) : "undefined";
  const language = params.lang ? toJs(params.lang) : "undefined";

  const prefixWidth = getAdornmentWidth(params.prefixText);
  const suffixWidth = getAdornmentWidth(params.suffixText);
  const iconInset = params.iconEnabled ? params.iconSize + 8 : 0;
  const clearActionWidth = params.showClearButton ? 30 : 0;
  const revealActionWidth =
    params.showPasswordToggle && params.inputType === "password" ? 34 : 0;

  const leftInset =
    params.paddingX +
    (params.iconEnabled && params.iconPosition === "left" ? iconInset : 0) +
    prefixWidth;
  const rightInset =
    params.paddingX +
    (params.iconEnabled && params.iconPosition === "right" ? iconInset : 0) +
    suffixWidth +
    clearActionWidth +
    revealActionWidth;

  const placeholderColorExpr = isFloating
    ? `floatingActive ? ${toJs(params.placeholderColor)} : "transparent"`
    : toJs(params.placeholderColor);
  const floatingLabelStyleObject = `{
    position: "absolute",
    left: ${leftInset},
    top: "50%",
    transform: floatingActive ? "translateY(-140%) scale(0.84)" : "translateY(-50%) scale(1)",
    transformOrigin: "left center",
    transition: "transform 160ms ease, color 160ms ease, opacity 160ms ease",
    color: ${toJs(params.labelColor)},
    fontSize: ${params.labelFontSize},
    fontWeight: ${params.labelFontWeight},
    pointerEvents: "auto",
    background: "transparent",
    zIndex: 2,
  }`;

  const buildInputStyleObject = (paddingExpr: string) => `{
    width: "100%",
    height: ${params.height},
    padding: ${paddingExpr},
    fontFamily: ${toJs(fontFamily)},
    fontSize: ${toJs(`${params.fontSize}${params.fontSizeUnit}`)},
    fontWeight: ${params.fontWeight},
    fontStyle: ${toJs(params.fontStyle)},
    color: ${toJs(params.textColor)},
    letterSpacing: ${toJs(`${params.letterSpacing}${params.letterSpacingUnit}`)},
    textAlign: ${toJs(params.textAlign)},
    textTransform: ${toJs(params.textTransform)},
    lineHeight: ${params.lineHeight},
    background: ${toJs(background)},
    border: ${toJs(`${params.borderWidth}px ${params.borderStyle} ${params.borderColor}`)},
    borderRadius: ${toJs(radius)},
    caretColor: ${toJs(params.caretColor)},
    boxShadow: ${toJs(shadow)},
    transition: ${toJs(`${params.transitionProperty} ${params.transitionDuration}ms ${params.transitionEasing}`)},
    outline: "none",
    boxSizing: "border-box",
  }`;

  const supportingBlocks = [
    descriptionMessage
      ? `      <p id=${toJs(descriptionMessage.id)} style={{ marginTop: 4, fontSize: 12, color: ${toJs(descriptionMessage.color)} }}>
        {${toJs(descriptionMessage.text)}}
      </p>`
      : "",
    feedbackMessage
      ? `      <p id=${toJs(feedbackMessage.id)} style={{ marginTop: 4, fontSize: 12, color: ${toJs(feedbackMessage.color)} }}>
        {${toJs(feedbackMessage.text)}}
      </p>`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const content = [
    'import React, { useEffect, useState } from "react";',
    "",
    "export default function TextInput() {",
    `  const [value, setValue] = useState(${toJs(params.defaultValue)});`,
    "  const [focused, setFocused] = useState(false);",
    "  const [revealed, setRevealed] = useState(false);",
    "",
    "  useEffect(() => {",
    `    setValue(${toJs(params.defaultValue)});`,
    `  }, [${toJs(params.defaultValue)}]);`,
    "",
    "  useEffect(() => {",
    `    if (${toJs(params.inputType)} !== "password") {`,
    "      setRevealed(false);",
    "    }",
    `  }, [${toJs(params.inputType)}]);`,
    "",
    `  const floatingActive = ${isFloating} && (focused || value.length > 0);`,
    `  const describedBy = [${helperId ? toJs(helperId) : "undefined"}, ${feedbackId ? toJs(feedbackId) : "undefined"}, ${params.ariaDescribedBy ? toJs(params.ariaDescribedBy) : "undefined"}].filter(Boolean).join(" ") || undefined;`,
    `  const actualType = ${toJs(params.inputType)} === "password" && ${params.showPasswordToggle} && revealed ? "text" : ${toJs(params.inputType)};`,
    `  const dynamicPadding = (floatingActive ? ${toJs(floatingPadding)} : ${toJs(basePadding)}).replace(/^(\\d+px)\\s+(\\d+px)\\s+(\\d+px)\\s+(\\d+px)$/, "$1 ${rightInset}px $3 ${leftInset}px");`,
    "",
    "  return (",
    "    <div>",
    isLeft
      ? `      <div style={{ display: "flex", alignItems: "center", gap: ${params.labelGap} }}>`
      : isTop
        ? `      <div style={{ display: "flex", flexDirection: "column", gap: ${params.labelGap} }}>`
        : `      <div style={{ position: "relative", width: "100%" }}>`,
    !isFloating
      ? `        <label style={{ display: "block", color: ${toJs(params.labelColor)}, fontSize: ${params.labelFontSize}, fontWeight: ${params.labelFontWeight}, flexShrink: 0 }}>
          {${toJs(params.labelText)}}${params.showRequired ? ` <span style={{ color: ${toJs(params.requiredColor)} }}> *</span>` : ""}
        </label>`
      : "",
    "        <div style={{ position: \"relative\", width: \"100%\" }}>",
    isFloating
      ? `          <label htmlFor={${toJs(params.id || "text-input-preview")}} style=${floatingLabelStyleObject}>
            {${toJs(params.labelText)}}${params.showRequired ? ` <span style={{ color: ${toJs(params.requiredColor)} }}> *</span>` : ""}
          </label>`
      : "",
    params.iconEnabled
      ? `          <span
            style={{
              position: "absolute",
              ${params.iconPosition}: ${params.paddingX},
              top: "50%",
              transform: "translateY(-50%)",
              color: ${toJs(params.iconColor)},
              width: ${params.iconSize},
              height: ${params.iconSize},
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
            dangerouslySetInnerHTML={{ __html: ${toJs(params.iconSvg)} }}
          />`
      : "",
    params.prefixText
      ? `          <span style={{ position: "absolute", left: ${params.paddingX + (params.iconEnabled && params.iconPosition === "left" ? params.iconSize + 8 : 0)}, top: "50%", transform: "translateY(-50%)", color: ${toJs(params.prefixColor)}, fontSize: 12, fontWeight: 600, pointerEvents: "none", whiteSpace: "nowrap" }}>
            {${toJs(params.prefixText)}}
          </span>`
      : "",
    params.suffixText
      ? `          <span style={{ position: "absolute", right: ${params.paddingX + (params.iconEnabled && params.iconPosition === "right" ? params.iconSize + 8 : 0) + clearActionWidth + revealActionWidth}, top: "50%", transform: "translateY(-50%)", color: ${toJs(params.suffixColor)}, fontSize: 12, fontWeight: 600, pointerEvents: "none", whiteSpace: "nowrap" }}>
            {${toJs(params.suffixText)}}
          </span>`
      : "",
    params.showClearButton
      ? `          {!${params.disabled} && !${params.readOnly} && value.length > 0 ? (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setValue("")}
              style={{
                position: "absolute",
                right: ${params.paddingX + (params.showPasswordToggle && params.inputType === "password" ? revealActionWidth : 0)},
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
          ) : null}`
      : "",
    params.showPasswordToggle && params.inputType === "password"
      ? `          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setRevealed((current) => !current)}
            style={{
              position: "absolute",
              right: ${params.paddingX},
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
          </button>`
      : "",
    `          <input
            id={${toJs(params.id || "text-input-preview")}}
            type={actualType}
            placeholder={${toJs(params.placeholder)}}
            value={value}
            onChange={(e) => {
              if (!${params.disabled} && !${params.readOnly}) {
                setValue(e.target.value);
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            title={${title}}
            name={${toJs(params.name)}}
            required={${params.required}}
            disabled={${params.disabled}}
            readOnly={${params.readOnly}}
            maxLength={${params.maxLength > 0 ? params.maxLength : "undefined"}}
            minLength={${params.minLength > 0 ? params.minLength : "undefined"}}
            pattern={${params.pattern ? toJs(params.pattern) : "undefined"}}
            min={${supportsRangeAttributes && params.minValue ? toJs(params.minValue) : "undefined"}}
            max={${supportsRangeAttributes && params.maxValue ? toJs(params.maxValue) : "undefined"}}
            step={${supportsRangeAttributes && params.stepValue ? toJs(params.stepValue) : "undefined"}}
            aria-label={${ariaLabel}}
            aria-describedby={describedBy}
            aria-invalid={${ariaInvalidExpr}}
            aria-required={${params.required || "undefined"}}
            autoComplete={${toJs(params.autocomplete)}}
            inputMode={${toJs(params.inputmode)}}
            enterKeyHint={${toJs(params.enterKeyHint)}}
            autoCapitalize={${toJs(params.autoCapitalize)}}
            autoCorrect={${toJs(params.autoCorrect)}}
            dir={${params.dir !== "auto" ? toJs(params.dir) : "undefined"}}
            lang={${language}}
            tabIndex={${params.tabIndex}}
            spellCheck={${params.spellCheck}}
            role={${role}}
            className="uif-text-input"
            style=${buildInputStyleObject("dynamicPadding")}
          />`,
    "        </div>",
    isLeft || isTop ? "      </div>" : "      </div>",
    supportingBlocks,
    "      <style>{`",
    "        .uif-text-input:hover:not(:disabled) {",
    `          border-color: ${params.hoverBorderColor};`,
    `          border-width: ${params.hoverBorderWidth}px;`,
    `          background: ${params.hoverBackgroundColor};`,
    "        }",
    "",
    "        .uif-text-input:focus {",
    `          border-color: ${params.focusBorderColor};`,
    `          border-width: ${params.focusBorderWidth}px;`,
    `          background: ${params.focusBackgroundColor};`,
    `          box-shadow: 0 0 0 ${params.focusBoxShadowSpread}px ${params.focusBoxShadowColor};`,
    params.focusOutlineStyle !== "none"
      ? `          outline: ${params.focusOutlineWidth}px ${params.focusOutlineStyle} ${params.focusOutlineColor};
          outline-offset: ${params.focusOutlineOffset}px;`
      : "          outline: none;",
    "        }",
    "",
    "        .uif-text-input:disabled {",
    `          opacity: ${params.disabledOpacity};`,
    `          cursor: ${params.disabledCursor};`,
    params.disabledUseCustomColors
      ? `          background: ${params.disabledBackgroundColor};
          color: ${params.disabledTextColor};
          border-color: ${params.disabledBorderColor};`
      : "",
    "        }",
    "",
    "        .uif-text-input::placeholder {",
    `          color: ${placeholderColorExpr};`,
    `          opacity: ${params.placeholderOpacity};`,
    `          font-style: ${params.placeholderFontStyle};`,
    "        }",
    "",
    "        .uif-text-input::selection {",
    `          background: ${params.selectionBg};`,
    `          color: ${params.selectionColor};`,
    "        }",
    "      `}</style>",
    "    </div>",
    "  );",
    "}",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  return { content, filename };
}
