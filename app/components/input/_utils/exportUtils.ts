"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { type TextInputState } from "../types";

export type TextInputExportInput = TextInputState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildTextInputExportPayload(params: TextInputExportInput) {
  const { downloadFormat, downloadName } = params;

  const ext =
    downloadFormat === "react"
      ? "jsx"
      : downloadFormat === "tailwind-config"
        ? "js"
        : downloadFormat === "figma-tokens"
          ? "json"
          : downloadFormat === "css-vars"
            ? "css"
            : downloadFormat === "scss"
              ? "scss"
              : "html";
  const filename = `${downloadName}.${ext}`;

  const radius = params.linkRadius
    ? `${params.borderRadius}px`
    : `${params.borderRadiusTL}px ${params.borderRadiusTR}px ${params.borderRadiusBR}px ${params.borderRadiusBL}px`;
  const bg = params.useGradient
    ? `linear-gradient(${params.gradientAngle}deg, ${params.gradientStart}, ${params.gradientEnd})`
    : params.backgroundColor;
  const shadow = params.shadowEnabled
    ? `${params.shadowX}px ${params.shadowY}px ${params.shadowBlur}px ${params.shadowSpread}px rgba(${hexToRgb(params.shadowColor)}, ${params.shadowOpacity})`
    : "none";
  const transition = `${params.transitionProperty} ${params.transitionDuration}ms ${params.transitionEasing}`;

  const labelHtml =
    params.labelPosition !== "hidden"
      ? `<label style="display: block; margin-bottom: ${params.labelGap}px; color: ${params.labelColor}; font-size: ${params.labelFontSize}px; font-weight: ${params.labelFontWeight};">${params.labelText}${params.showRequired ? `<span style="color: ${params.requiredColor};"> *</span>` : ""}</label>`
      : "";

  const helperHtml = params.helperText
    ? `<p style="margin-top: 4px; font-size: 12px; color: ${params.helperColor};">${params.helperText}</p>`
    : "";
  const errorHtml = params.errorText
    ? `<p style="margin-top: 4px; font-size: 12px; color: ${params.errorColor};">${params.errorText}</p>`
    : "";

  const attrs = [
    `type="${params.inputType}"`,
    params.placeholder ? `placeholder="${params.placeholder}"` : "",
    params.defaultValue ? `value="${params.defaultValue}"` : "",
    params.name ? `name="${params.name}"` : "",
    params.required ? `required` : "",
    params.disabled ? `disabled` : "",
    params.readOnly ? `readonly` : "",
    params.maxLength > 0 ? `maxlength="${params.maxLength}"` : "",
    params.minLength > 0 ? `minlength="${params.minLength}"` : "",
    params.pattern ? `pattern="${params.pattern}"` : "",
    params.ariaLabel ? `aria-label="${params.ariaLabel}"` : "",
    params.ariaDescribedBy
      ? `aria-describedby="${params.ariaDescribedBy}"`
      : "",
    params.ariaInvalid ? `aria-invalid="true"` : "",
    params.autocomplete !== "off"
      ? `autocomplete="${params.autocomplete}"`
      : "",
    params.inputmode !== "text" ? `inputmode="${params.inputmode}"` : "",
    params.role ? `role="${params.role}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const css = `
  width: 100%;
  height: ${params.height}px;
  padding: ${params.paddingY}px ${params.paddingX}px;
  font-family: ${params.fontFamily};
  font-size: ${params.fontSize}px;
  font-weight: ${params.fontWeight};
  font-style: ${params.fontStyle};
  color: ${params.textColor};
  letter-spacing: ${params.letterSpacing}px;
  text-align: ${params.textAlign};
  text-transform: ${params.textTransform};
  line-height: ${params.lineHeight};
  background: ${bg};
  border: ${params.borderWidth}px ${params.borderStyle} ${params.borderColor};
  border-radius: ${radius};
  caret-color: ${params.caretColor};
  box-shadow: ${shadow};
  transition: ${transition};
  outline: none;
  box-sizing: border-box;`.trim();

  const focusCss = `
  border-color: ${params.focusBorderColor};
  border-width: ${params.focusBorderWidth}px;
  background: ${params.focusBackgroundColor};
  box-shadow: 0 0 0 ${params.focusBoxShadowSpread}px ${params.focusBoxShadowColor};${
    params.focusOutlineStyle !== "none"
      ? `\n  outline: ${params.focusOutlineWidth}px ${params.focusOutlineStyle} ${params.focusOutlineColor};\n  outline-offset: ${params.focusOutlineOffset}px;`
      : ""
  }`.trim();

  const hoverCss = `
  border-color: ${params.hoverBorderColor};
  border-width: ${params.hoverBorderWidth}px;
  background: ${params.hoverBackgroundColor};`.trim();

  const disabledCss = `
  opacity: ${params.disabledOpacity};
  cursor: ${params.disabledCursor};${
    params.disabledUseCustomColors
      ? `\n  background: ${params.disabledBackgroundColor};\n  color: ${params.disabledTextColor};\n  border-color: ${params.disabledBorderColor};`
      : ""
  }`.trim();

  let content = "";

  if (downloadFormat === "html") {
    const iconHtml = params.iconEnabled
      ? `<span style="position: absolute; ${params.iconPosition}: ${params.paddingX}px; top: 50%; transform: translateY(-50%); color: ${params.iconColor}; width: ${params.iconSize}px; height: ${params.iconSize}px; display: flex; align-items: center; pointer-events: none;">${params.iconSvg}</span>`
      : "";

    content = `<div class="text-input-wrapper">
${labelHtml ? `  ${labelHtml}\n` : ""}  <div style="position: relative;">
${iconHtml ? `    ${iconHtml}\n` : ""}    <input ${attrs} class="text-input" />
  </div>
${helperHtml ? `  ${helperHtml}\n` : ""}${errorHtml ? `  ${errorHtml}\n` : ""}</div>

<style>
.text-input {
  ${css}${params.iconEnabled ? `\n  padding-${params.iconPosition}: calc(${params.paddingX}px + ${params.iconSize}px + 8px);` : ""}
}
.text-input:focus {
  ${focusCss}
}
.text-input:hover:not(:disabled) {
  ${hoverCss}
}
.text-input:disabled {
  ${disabledCss}
}
.text-input::placeholder {
  color: ${params.placeholderColor};
  opacity: ${params.placeholderOpacity};
  font-style: ${params.placeholderFontStyle};
}
.text-input::selection {
  background: ${params.selectionBg};
  color: ${params.selectionColor};
}
</style>`;
  } else if (downloadFormat === "react") {
    content = `import React from 'react';

export default function TextInput() {
  return (
    <div>
${params.labelPosition !== "hidden" ? `      <label style={{ display: 'block', marginBottom: ${params.labelGap}, color: '${params.labelColor}', fontSize: ${params.labelFontSize}, fontWeight: ${params.labelFontWeight} }}>${params.labelText}${params.showRequired ? `<span style={{ color: '${params.requiredColor}' }}> *</span>` : ""}</label>\n` : ""}      <div style={{ position: 'relative' }}>
        <input
          ${attrs.replace(/"/g, "'")}
          style={{
            width: '100%',
            height: ${params.height},
            padding: '${params.paddingY}px ${params.paddingX}px',
            fontFamily: '${params.fontFamily}',
            fontSize: ${params.fontSize},
            fontWeight: ${params.fontWeight},
            color: '${params.textColor}',
            background: '${bg}',
            border: '${params.borderWidth}px ${params.borderStyle} ${params.borderColor}',
            borderRadius: '${radius}',
            caretColor: '${params.caretColor}',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
${params.helperText ? `      <p style={{ marginTop: 4, fontSize: 12, color: '${params.helperColor}' }}>${params.helperText}</p>\n` : ""}${params.errorText ? `      <p style={{ marginTop: 4, fontSize: 12, color: '${params.errorColor}' }}>${params.errorText}</p>\n` : ""}    </div>
  );
}`;
  } else if (downloadFormat === "tailwind") {
    content = `<div>
${labelHtml ? `  ${labelHtml}\n` : ""}  <input ${attrs} class="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed" />
${helperHtml ? `  ${helperHtml}\n` : ""}${errorHtml ? `  ${errorHtml}\n` : ""}</div>`;
  } else if (downloadFormat === "scss") {
    content = `.text-input-wrapper {
  .text-input {
    ${css}
    &:focus { ${focusCss} }
    &:hover:not(:disabled) { ${hoverCss} }
    &:disabled { ${disabledCss} }
    &::placeholder { color: ${params.placeholderColor}; opacity: ${params.placeholderOpacity}; font-style: ${params.placeholderFontStyle}; }
    &::selection { background: ${params.selectionBg}; color: ${params.selectionColor}; }
  }
}`;
  } else if (downloadFormat === "css-vars") {
    content = `:root {
  --input-height: ${params.height}px;
  --input-px: ${params.paddingX}px;
  --input-py: ${params.paddingY}px;
  --input-font-size: ${params.fontSize}px;
  --input-font-weight: ${params.fontWeight};
  --input-color: ${params.textColor};
  --input-bg: ${params.backgroundColor};
  --input-border-width: ${params.borderWidth}px;
  --input-border-color: ${params.borderColor};
  --input-border-radius: ${radius};
  --input-caret: ${params.caretColor};
  --input-focus-border: ${params.focusBorderColor};
  --input-focus-shadow-color: ${params.focusBoxShadowColor};
  --input-hover-border: ${params.hoverBorderColor};
  --input-placeholder: ${params.placeholderColor};
  --input-disabled-opacity: ${params.disabledOpacity};
  --input-transition: ${params.transitionDuration}ms;
}

.text-input {
  width: 100%;
  height: var(--input-height);
  padding: var(--input-py) var(--input-px);
  font-size: var(--input-font-size);
  font-weight: var(--input-font-weight);
  color: var(--input-color);
  background: var(--input-bg);
  border: var(--input-border-width) solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  caret-color: var(--input-caret);
  transition: all var(--input-transition) ease;
  outline: none;
}
.text-input:focus {
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 3px var(--input-focus-shadow-color);
}
.text-input:hover:not(:disabled) {
  border-color: var(--input-hover-border);
}
.text-input:disabled { opacity: var(--input-disabled-opacity); cursor: not-allowed; }
.text-input::placeholder { color: var(--input-placeholder); }`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        textInput: {
          sizing: {
            height: { value: `${params.height}px` },
          },
          border: {
            width: { value: `${params.borderWidth}px` },
            color: { value: params.borderColor },
            radius: { value: radius },
          },
          colors: {
            background: { value: params.backgroundColor },
            text: { value: params.textColor },
            placeholder: { value: params.placeholderColor },
            caret: { value: params.caretColor },
          },
          focus: {
            borderColor: { value: params.focusBorderColor },
            shadowColor: { value: params.focusBoxShadowColor },
          },
          hover: { borderColor: { value: params.hoverBorderColor } },
          typography: {
            fontFamily: { value: params.fontFamily },
            fontSize: { value: `${params.fontSize}px` },
            fontWeight: { value: params.fontWeight },
          },
        },
      },
      null,
      2,
    );
  } else if (downloadFormat === "tailwind-config") {
    content = JSON.stringify(
      {
        theme: {
          extend: {
            colors: {
              input: {
                bg: params.backgroundColor,
                text: params.textColor,
                border: params.borderColor,
                focus: params.focusBorderColor,
                placeholder: params.placeholderColor,
              },
            },
            borderRadius: { input: radius },
          },
        },
      },
      null,
      2,
    );
  }

  return { content, filename };
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
