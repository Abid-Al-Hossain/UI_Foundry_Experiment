"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { type TextareaState } from "../types";

export type TextareaExportInput = TextareaState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildTextareaExportPayload(params: TextareaExportInput) {
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
      ? `<label style="display:block;margin-bottom:${params.labelGap}px;color:${params.labelColor};font-size:${params.labelFontSize}px;font-weight:${params.labelFontWeight};">${params.labelText}${params.showRequired ? `<span style="color:${params.requiredColor};"> *</span>` : ""}</label>`
      : "";
  const helperHtml = params.helperText
    ? `<p style="margin-top:4px;font-size:12px;color:${params.helperColor};">${params.helperText}</p>`
    : "";
  const errorHtml = params.errorText
    ? `<p style="margin-top:4px;font-size:12px;color:${params.errorColor};">${params.errorText}</p>`
    : "";

  const attrs = [
    params.placeholder ? `placeholder="${params.placeholder}"` : "",
    params.name ? `name="${params.name}"` : "",
    `rows="${params.rows}"`,
    params.cols !== 40 ? `cols="${params.cols}"` : "",
    params.wrap !== "soft" ? `wrap="${params.wrap}"` : "",
    params.required ? "required" : "",
    params.disabled ? "disabled" : "",
    params.readOnly ? "readonly" : "",
    params.maxLength > 0 ? `maxlength="${params.maxLength}"` : "",
    params.minLength > 0 ? `minlength="${params.minLength}"` : "",
    !params.spellcheck ? `spellcheck="false"` : "",
    params.ariaLabel ? `aria-label="${params.ariaLabel}"` : "",
    params.ariaDescribedBy
      ? `aria-describedby="${params.ariaDescribedBy}"`
      : "",
    params.ariaInvalid ? `aria-invalid="true"` : "",
    params.role ? `role="${params.role}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const css = `
  width: 100%;
  min-height: ${params.minHeight}px;
  max-height: ${params.maxHeight}px;
  padding: ${params.paddingY}px ${params.paddingX}px;
  font-family: ${params.fontFamily};
  font-size: ${params.fontSize}px;
  font-weight: ${params.fontWeight};
  font-style: ${params.fontStyle};
  color: ${params.textColor};
  letter-spacing: ${params.letterSpacing}px;
  text-align: ${params.textAlign};
  line-height: ${params.lineHeight};
  white-space: ${params.whiteSpace};
  overflow-wrap: ${params.overflowWrap};
  tab-size: ${params.tabSize};
  background: ${bg};
  border: ${params.borderWidth}px ${params.borderStyle} ${params.borderColor};
  border-radius: ${radius};
  caret-color: ${params.caretColor};
  box-shadow: ${shadow};
  transition: ${transition};
  resize: ${params.resize};
  outline: none;
  box-sizing: border-box;
  scrollbar-width: ${params.scrollbarWidth};
  scrollbar-color: ${params.scrollbarColor} ${params.scrollbarTrackColor};`.trim();

  let content = "";

  if (downloadFormat === "html") {
    content = `<div class="textarea-wrapper">
${labelHtml ? `  ${labelHtml}\n` : ""}  <textarea ${attrs} class="custom-textarea">${params.defaultValue}</textarea>
${helperHtml ? `  ${helperHtml}\n` : ""}${errorHtml ? `  ${errorHtml}\n` : ""}</div>

<style>
.custom-textarea {
  ${css}
}
.custom-textarea:focus {
  border-color: ${params.focusBorderColor};
  border-width: ${params.focusBorderWidth}px;
  background: ${params.focusBackgroundColor};
  box-shadow: 0 0 0 ${params.focusBoxShadowSpread}px ${params.focusBoxShadowColor};
}
.custom-textarea:hover:not(:disabled) {
  border-color: ${params.hoverBorderColor};
  background: ${params.hoverBackgroundColor};
}
.custom-textarea:disabled {
  opacity: ${params.disabledOpacity};
  cursor: ${params.disabledCursor};
}
.custom-textarea::placeholder {
  color: ${params.placeholderColor};
  opacity: ${params.placeholderOpacity};
  font-style: ${params.placeholderFontStyle};
}
.custom-textarea::selection {
  background: ${params.selectionBg};
  color: ${params.selectionColor};
}
</style>`;
  } else if (downloadFormat === "react") {
    content = `import React, { useState } from 'react';

export default function CustomTextarea() {
  const [value, setValue] = useState('${params.defaultValue}');
  return (
    <div>
${params.labelPosition !== "hidden" ? `      <label style={{ display: 'block', marginBottom: ${params.labelGap}, color: '${params.labelColor}', fontSize: ${params.labelFontSize}, fontWeight: ${params.labelFontWeight} }}>${params.labelText}${params.showRequired ? `<span style={{ color: '${params.requiredColor}' }}> *</span>` : ""}</label>\n` : ""}      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ${attrs.replace(/"/g, "'")}
        className="custom-textarea"
      />
${params.charCount ? `      <div style={{ textAlign: 'right', fontSize: 12, color: '${params.helperColor}', marginTop: 4 }}>{value.length}${params.maxLength > 0 ? `/${params.maxLength}` : " chars"}</div>\n` : ""}${params.helperText ? `      <p style={{ marginTop: 4, fontSize: 12, color: '${params.helperColor}' }}>${params.helperText}</p>\n` : ""}${params.errorText ? `      <p style={{ marginTop: 4, fontSize: 12, color: '${params.errorColor}' }}>${params.errorText}</p>\n` : ""}    </div>
  );
}`;
  } else if (downloadFormat === "scss") {
    content = `.textarea-wrapper {\n  .custom-textarea {\n    ${css}\n    &:focus { border-color: ${params.focusBorderColor}; box-shadow: 0 0 0 ${params.focusBoxShadowSpread}px ${params.focusBoxShadowColor}; }\n    &:hover:not(:disabled) { border-color: ${params.hoverBorderColor}; }\n    &:disabled { opacity: ${params.disabledOpacity}; cursor: ${params.disabledCursor}; }\n    &::placeholder { color: ${params.placeholderColor}; }\n  }\n}`;
  } else if (downloadFormat === "css-vars") {
    content = `:root {\n  --textarea-min-h: ${params.minHeight}px;\n  --textarea-max-h: ${params.maxHeight}px;\n  --textarea-font-size: ${params.fontSize}px;\n  --textarea-color: ${params.textColor};\n  --textarea-bg: ${params.backgroundColor};\n  --textarea-border: ${params.borderColor};\n  --textarea-radius: ${radius};\n  --textarea-focus: ${params.focusBorderColor};\n  --textarea-placeholder: ${params.placeholderColor};\n}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        textarea: {
          sizing: {
            minHeight: { value: `${params.minHeight}px` },
            maxHeight: { value: `${params.maxHeight}px` },
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
          },
          typography: {
            fontFamily: { value: params.fontFamily },
            fontSize: { value: `${params.fontSize}px` },
            lineHeight: { value: params.lineHeight },
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
              textarea: {
                bg: params.backgroundColor,
                text: params.textColor,
                border: params.borderColor,
                focus: params.focusBorderColor,
              },
            },
          },
        },
      },
      null,
      2,
    );
  } else {
    content = `<!-- Tailwind textarea -->\n<textarea ${attrs} class="w-full min-h-[100px] px-4 py-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y disabled:opacity-50 disabled:cursor-not-allowed">${params.defaultValue}</textarea>`;
  }

  return { content, filename };
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
}
