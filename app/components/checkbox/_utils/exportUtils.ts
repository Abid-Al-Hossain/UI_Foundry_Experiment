"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { type CheckboxState } from "../types";

export type CheckboxExportInput = CheckboxState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildCheckboxExportPayload(params: CheckboxExportInput) {
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
  const labelFontFamily =
    params.fontBucket === "google"
      ? params.googleFontFamily || "inherit"
      : SYSTEM_FONTS[params.systemFontIdx]?.css || "inherit";
  const labelFontSize = `${params.labelFontSize}${params.fontSizeUnit}`;

  const attrs = [
    `type="checkbox"`,
    params.value ? `value="${params.value}"` : "",
    params.name ? `name="${params.name}"` : "",
    params.checked ? "checked" : "",
    params.disabled ? "disabled" : "",
    params.ariaLabel ? `aria-label="${params.ariaLabel}"` : "",
    params.role ? `role="${params.role}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const boxCss = `
  width: ${params.boxSize}px;
  height: ${params.boxSize}px;
  border: ${params.boxBorderWidth}px ${params.boxBorderStyle} ${params.boxBorderColor};
  border-radius: ${params.boxBorderRadius}px;
  background: ${params.boxBgColor};
  transition: all ${params.transitionDuration}ms ${params.transitionEasing};`.trim();

  const checkedCss = `
  background: ${params.checkedBgColor};
  border-color: ${params.checkedBorderColor};`.trim();

  let content = "";

  if (downloadFormat === "html") {
    content = `<label class="custom-checkbox">
  <input ${attrs} class="checkbox-input" />
  <span class="checkbox-box"></span>
  <span class="checkbox-label">${params.labelText}</span>
</label>

<style>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  gap: ${params.labelGap}px;
  cursor: pointer;
  font-family: ${labelFontFamily};
  font-size: ${labelFontSize};
  font-weight: ${params.labelFontWeight};
  color: ${params.labelColor};
}
.checkbox-input { position: absolute; opacity: 0; width: 0; height: 0; }
.checkbox-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${boxCss}
}
.checkbox-input:checked + .checkbox-box {
  ${checkedCss}
}
.checkbox-input:focus-visible + .checkbox-box {
  box-shadow: 0 0 0 ${params.focusRingWidth}px ${params.focusRingColor};
}
.checkbox-input:hover:not(:disabled) + .checkbox-box {
  border-color: ${params.hoverBorderColor};
}
.checkbox-input:disabled + .checkbox-box {
  opacity: ${params.disabledOpacity};
  cursor: ${params.disabledCursor};
}
</style>`;
  } else if (downloadFormat === "react") {
    content = `import React, { useState } from 'react';

export default function CustomCheckbox() {
  const [checked, setChecked] = useState(${params.checked});
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: ${params.labelGap}, cursor: 'pointer', fontFamily: '${labelFontFamily}', fontSize: '${labelFontSize}', color: '${params.labelColor}' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        ${params.disabled ? "disabled" : ""}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: ${params.boxSize}, height: ${params.boxSize},
        border: '${params.boxBorderWidth}px ${params.boxBorderStyle} ' + (checked ? '${params.checkedBorderColor}' : '${params.boxBorderColor}'),
        borderRadius: ${params.boxBorderRadius},
        background: checked ? '${params.checkedBgColor}' : '${params.boxBgColor}',
        transition: 'all ${params.transitionDuration}ms ${params.transitionEasing}',
      }}>
        {checked && (
          <svg width="${params.checkmarkSize}" height="${params.checkmarkSize}" viewBox="0 0 16 16" fill="none" stroke="${params.checkmarkColor}" strokeWidth="${params.checkmarkStrokeWidth}" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8 L6.5 11.5 L13 4.5" />
          </svg>
        )}
      </span>
      <span>${params.labelText}</span>
    </label>
  );
}`;
  } else if (downloadFormat === "scss") {
    content = `.custom-checkbox {\n  display: inline-flex;\n  align-items: center;\n  gap: ${params.labelGap}px;\n  cursor: pointer;\n  .checkbox-box {\n    ${boxCss}\n  }\n  .checkbox-input:checked + .checkbox-box {\n    ${checkedCss}\n  }\n}`;
  } else if (downloadFormat === "css-vars") {
    content = `:root {\n  --cb-size: ${params.boxSize}px;\n  --cb-border: ${params.boxBorderColor};\n  --cb-radius: ${params.boxBorderRadius}px;\n  --cb-checked-bg: ${params.checkedBgColor};\n  --cb-checkmark: ${params.checkmarkColor};\n  --cb-focus-ring: ${params.focusRingColor};\n  --cb-label-color: ${params.labelColor};\n}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        checkbox: {
          box: {
            size: { value: `${params.boxSize}px` },
            borderRadius: { value: `${params.boxBorderRadius}px` },
            borderColor: { value: params.boxBorderColor },
          },
          checked: {
            background: { value: params.checkedBgColor },
            checkmark: { value: params.checkmarkColor },
          },
          label: {
            fontSize: { value: `${params.labelFontSize}px` },
            color: { value: params.labelColor },
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
              checkbox: {
                bg: params.checkedBgColor,
                border: params.boxBorderColor,
                focus: params.focusRingColor,
              },
            },
          },
        },
      },
      null,
      2,
    );
  } else {
    content = `<!-- Tailwind checkbox -->\n<label class="inline-flex items-center gap-3 cursor-pointer">\n  <input type="checkbox" class="sr-only peer" ${params.checked ? "checked" : ""} />\n  <span class="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-all duration-200">\n    <svg class="w-3 h-3 hidden peer-checked:block text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8 L6.5 11.5 L13 4.5"/></svg>\n  </span>\n  <span class="text-sm text-slate-700">${params.labelText}</span>\n</label>`;
  }

  return { content, filename };
}
