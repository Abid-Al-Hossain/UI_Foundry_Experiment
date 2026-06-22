"use client";
import { type TextareaState } from "../types";
import {
  resolveTextareaBackground,
  resolveTextareaFontFamily,
  resolveTextareaPadding,
  resolveTextareaRadius,
  resolveTextareaShadow,
} from "./textareaVisuals";

export type TextareaExportInput = TextareaState & {
  downloadName: string;
};

const toJs = (value: string): string => JSON.stringify(value);

export function buildTextareaExportPayload(params: TextareaExportInput) {
  const { downloadName } = params;
  const filename = `${downloadName || "textarea"}.tsx`;

  const radius = resolveTextareaRadius(params);
  const background = resolveTextareaBackground(params);
  const fontFamily = resolveTextareaFontFamily(params);
  const shadow = resolveTextareaShadow(params);
  const transition = `${params.transitionProperty} ${params.transitionDuration}ms ${params.transitionEasing}`;
  const basePadding = resolveTextareaPadding(params, false);
  const floatingPadding = resolveTextareaPadding(params, true);
  const isFloating = params.labelPosition === "floating";
  const isTop = params.labelPosition === "top";
  const isLeft = params.labelPosition === "left";

  const descriptionMessage = params.descriptionText
    ? {
        id: "textarea-preview-description",
        text: params.descriptionText,
        color: params.descriptionColor,
      }
    : params.helperText
      ? {
          id: "textarea-preview-helper",
          text: params.helperText,
          color: params.helperColor,
        }
      : null;

  const feedbackMessage = params.errorText
    ? {
        id: "textarea-preview-error",
        text: params.errorText,
        color: params.errorColor,
      }
    : params.successText
      ? {
          id: "textarea-preview-success",
          text: params.successText,
          color: params.successColor,
        }
      : null;

  const helperId = descriptionMessage?.id ?? "";
  const feedbackId = feedbackMessage?.id ?? "";
  const ariaDescribedByExpr = `[${helperId ? toJs(helperId) : "undefined"}, ${feedbackId ? toJs(feedbackId) : "undefined"}, ${params.ariaDescribedBy ? toJs(params.ariaDescribedBy) : "undefined"}].filter(Boolean).join(" ") || undefined`;
  const ariaInvalidExpr =
    params.ariaInvalid || Boolean(params.errorText) ? "true" : "undefined";
  const ariaLabel = params.ariaLabel ? toJs(params.ariaLabel) : "undefined";
  const role = params.role ? toJs(params.role) : "undefined";
  const autoComplete =
    params.autocomplete !== "off" ? toJs(params.autocomplete) : "undefined";
  const inputMode =
    params.inputMode !== "text" ? toJs(params.inputMode) : "undefined";
  const direction = params.dir !== "auto" ? toJs(params.dir) : "undefined";
  const language = params.lang ? toJs(params.lang) : "undefined";
  const title = params.title ? toJs(params.title) : "undefined";
  const placeholderColorExpr = isFloating
    ? `floatingActive ? ${toJs(params.placeholderColor)} : "transparent"`
    : toJs(params.placeholderColor);

  const labelChildrenLines = [
    `          {${toJs(params.labelText)}}`,
    params.showRequired
      ? `          <span style={{ color: ${toJs(params.requiredColor)} }}> *</span>`
      : "",
  ].filter(Boolean);

  const charCountText = `{value.length}${params.maxLength > 0 ? ` / ${params.maxLength}` : " chars"}`;
  const charCountBlock = (style: string) =>
    `      <p style={${style}}>\n        ${charCountText}\n      </p>`;
  const charCountAbove = params.charCount && params.characterCountPosition === "above"
    ? charCountBlock('{ marginBottom: 4, fontSize: 11, color: "#94a3b8", textAlign: "right" }')
    : "";
  const charCountInsideOrFloating = params.charCount && (params.characterCountPosition === "inside" || params.characterCountPosition === "floating")
    ? charCountBlock(
        params.characterCountPosition === "inside"
          ? '{ position: "absolute", right: 8, bottom: 6, margin: 0, fontSize: 11, color: "#94a3b8", pointerEvents: "none" }'
          : '{ position: "absolute", right: 0, top: "100%", marginTop: 2, fontSize: 11, color: "#94a3b8" }',
      )
    : "";
  const charCountBelow = params.charCount && params.characterCountPosition === "below"
    ? charCountBlock('{ marginTop: 4, fontSize: 11, color: "#94a3b8", textAlign: "right" }')
    : "";

  const content = [
    'import React, { useEffect, useState } from "react";',
    "",
    "export default function CustomTextarea() {",
    `  const [value, setValue] = useState(${toJs(params.defaultValue)});`,
    "  const [focused, setFocused] = useState(false);",
    "",
    "  useEffect(() => {",
    `    setValue(${toJs(params.defaultValue)});`,
    `  }, [${toJs(params.defaultValue)}]);`,
    "",
    `  const floatingActive = ${isFloating} && (focused || value.length > 0);`,
    `  const describedBy = ${ariaDescribedByExpr};`,
    `  const ariaInvalid = ${ariaInvalidExpr};`,
    "",
    "  return (",
    '    <div style={{ width: "100%" }}>',
    isLeft
      ? `      <div style={{ display: "flex", alignItems: "flex-start", gap: ${params.labelGap} }}>`
      : isTop
        ? `      <div style={{ display: "flex", flexDirection: "column", gap: ${params.labelGap} }}>`
        : `      <div style={{ position: "relative", width: "100%" }}>`,
    !isFloating
      ? `        <label style={{ display: "block", color: ${toJs(params.labelColor)}, fontSize: ${params.labelFontSize}, fontWeight: ${params.labelFontWeight}, flexShrink: 0 }}>
${labelChildrenLines.join("\n")}
        </label>`
      : "",
    '        <div style={{ position: "relative", width: "100%" }}>',
    isFloating
      ? `          <label
            htmlFor={${toJs(params.id || "textarea-preview")}}
            style={{
              position: "absolute",
              left: ${params.paddingX},
              top: floatingActive ? 12 : ${Math.max(params.paddingY + 6, 14)},
              transform: floatingActive ? "scale(0.84)" : "scale(1)",
              transformOrigin: "left top",
              transition: "transform 160ms ease, top 160ms ease, color 160ms ease, opacity 160ms ease",
              color: ${toJs(params.labelColor)},
              fontSize: ${params.labelFontSize},
              fontWeight: ${params.labelFontWeight},
              lineHeight: 1,
              pointerEvents: "none",
              background: "transparent",
              zIndex: 1,
            }}
          >
${labelChildrenLines.join("\n")}
          </label>`
      : "",
    charCountAbove,
    `          <textarea
            id={${toJs(params.id || "textarea-preview")}}
            value={value}
            onChange={(event) => {
              if (!${params.disabled} && !${params.readOnly}) {
                setValue(event.target.value);
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={${toJs(params.placeholder)}}
            title={${title}}
            name={${toJs(params.name)}}
            rows={${Math.min(params.maxRows, Math.max(params.minRows, params.rows))}}
            cols={${params.cols}}
            wrap={${toJs(params.wrap)}}
            required={${params.required}}
            disabled={${params.disabled}}
            readOnly={${params.readOnly}}
            maxLength={${params.maxLength > 0 ? params.maxLength : "undefined"}}
            minLength={${params.minLength > 0 ? params.minLength : "undefined"}}
            spellCheck={${params.spellcheck}}
            aria-label={${ariaLabel}}
            aria-describedby={describedBy}
            aria-invalid={ariaInvalid}
            aria-required={${params.required || "undefined"}}
            autoComplete={${autoComplete}}
            inputMode={${inputMode}}
            enterKeyHint={${toJs(params.enterKeyHint)}}
            autoCapitalize={${toJs(params.autoCapitalize)}}
            autoCorrect={${toJs(params.autoCorrect)}}
            dir={${direction}}
            lang={${language}}
            tabIndex={${params.tabIndex}}
            role={${role}}
            className="uif-textarea"
            style={{
              width: "100%",
              minHeight: ${params.minHeight},
              maxHeight: ${params.maxHeight},
              padding: floatingActive ? ${toJs(floatingPadding)} : ${toJs(basePadding)},
              fontFamily: ${toJs(fontFamily)},
              fontSize: ${toJs(`${params.fontSize}${params.fontSizeUnit || "px"}`)},
              fontWeight: ${params.fontWeight},
              fontStyle: ${toJs(params.fontStyle)},
              color: ${toJs(params.textColor)},
              letterSpacing: ${toJs(`${params.letterSpacing}${params.letterSpacingUnit || "px"}`)},
              textAlign: ${toJs(params.textAlign)},
              textTransform: ${toJs(params.textTransform)},
              lineHeight: ${params.lineHeight},
              whiteSpace: ${toJs(params.whiteSpace)},
              overflowWrap: ${toJs(params.overflowWrap)},
              wordBreak: ${toJs(params.wordBreak)},
              tabSize: ${params.tabSize},
              background: ${toJs(background)},
              border: ${toJs(`${params.borderWidth}px ${params.borderStyle} ${params.borderColor}`)},
              borderRadius: ${toJs(radius)},
              caretColor: ${toJs(params.caretColor)},
              boxShadow: ${toJs(shadow)},
              transition: ${toJs(transition)},
              resize: ${toJs(params.resize)},
              outline: "none",
              boxSizing: "border-box",
              scrollbarWidth: ${toJs(params.scrollbarWidth)},
              scrollbarColor: ${toJs(`${params.scrollbarColor} ${params.scrollbarTrackColor}`)},
            }}
          />`,
    charCountInsideOrFloating,
    "        </div>",
    "      </div>",
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
    charCountBelow,
    "      <style>{`",
    "        .uif-textarea:hover:not(:disabled) {",
    `          border-color: ${params.hoverBorderColor};`,
    `          border-width: ${params.hoverBorderWidth}px;`,
    `          background: ${params.hoverBackgroundColor};`,
    "        }",
    "",
    "        .uif-textarea:focus {",
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
    "        .uif-textarea:disabled {",
    `          opacity: ${params.disabledOpacity};`,
    `          cursor: ${params.disabledCursor};`,
    params.disabledUseCustomColors
      ? `          background: ${params.disabledBackgroundColor};
          color: ${params.disabledTextColor};
          border-color: ${params.disabledBorderColor};`
      : "",
    "        }",
    "",
    "        .uif-textarea::placeholder {",
    `          color: ${placeholderColorExpr};`,
    `          opacity: ${params.placeholderOpacity};`,
    `          font-style: ${params.placeholderFontStyle};`,
    "        }",
    "",
    "        .uif-textarea::selection {",
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
