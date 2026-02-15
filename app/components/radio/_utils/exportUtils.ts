"use client";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { type RadioState } from "../types";

export type RadioExportInput = RadioState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildRadioExportPayload(params: RadioExportInput) {
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

  const optionsHtml = params.options
    .map(
      (o) =>
        `  <label class="radio-option${o.disabled ? " disabled" : ""}">\n    <input type="radio" name="${params.name}" value="${o.value}"${o.value === params.selectedValue ? " checked" : ""}${o.disabled ? " disabled" : ""} />\n    <span class="radio-circle"></span>\n    <span class="radio-label">${o.label}</span>\n  </label>`,
    )
    .join("\n");

  let content = "";

  if (downloadFormat === "html") {
    content = `<div class="radio-group" role="radiogroup">\n${optionsHtml}\n</div>\n\n<style>\n.radio-group { display: flex; flex-direction: ${params.orientation === "horizontal" ? "row" : "column"}; gap: ${params.gap}px; }\n.radio-option { display: inline-flex; align-items: center; gap: ${params.labelGap}px; cursor: pointer; font-family: ${params.labelFontFamily}; font-size: ${params.labelFontSize}px; color: ${params.labelColor}; }\n.radio-option input { position: absolute; opacity: 0; width: 0; height: 0; }\n.radio-circle { display: inline-flex; align-items: center; justify-content: center; width: ${params.outerSize}px; height: ${params.outerSize}px; border: ${params.outerBorderWidth}px solid ${params.outerBorderColor}; border-radius: 50%; transition: all ${params.transitionDuration}ms ${params.transitionEasing}; }\n.radio-option input:checked + .radio-circle { border-color: ${params.selectedOuterBorderColor}; }\n.radio-option input:checked + .radio-circle::after { content: ''; display: block; width: ${params.dotSize}px; height: ${params.dotSize}px; border-radius: 50%; background: ${params.dotColor}; }\n.radio-option.disabled { opacity: ${params.disabledOpacity}; cursor: ${params.disabledCursor}; }\n</style>`;
  } else if (downloadFormat === "react") {
    content = `import React, { useState } from 'react';\n\nconst options = ${JSON.stringify(params.options, null, 2)};\n\nexport default function RadioGroup() {\n  const [selected, setSelected] = useState('${params.selectedValue}');\n  return (\n    <div role="radiogroup" style={{ display: 'flex', flexDirection: '${params.orientation === "horizontal" ? "row" : "column"}', gap: ${params.gap} }}>\n      {options.map((opt) => (\n        <label key={opt.value} style={{ display: 'inline-flex', alignItems: 'center', gap: ${params.labelGap}, cursor: opt.disabled ? '${params.disabledCursor}' : 'pointer', opacity: opt.disabled ? ${params.disabledOpacity} : 1 }}>\n          <input type="radio" name="${params.name}" value={opt.value} checked={selected === opt.value} onChange={() => setSelected(opt.value)} disabled={opt.disabled} style={{ position: 'absolute', opacity: 0 }} />\n          <span style={{ width: ${params.outerSize}, height: ${params.outerSize}, border: '${params.outerBorderWidth}px solid ' + (selected === opt.value ? '${params.selectedOuterBorderColor}' : '${params.outerBorderColor}'), borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>\n            {selected === opt.value && <span style={{ width: ${params.dotSize}, height: ${params.dotSize}, borderRadius: '50%', background: '${params.dotColor}' }} />}\n          </span>\n          <span>{opt.label}</span>\n        </label>\n      ))}\n    </div>\n  );\n}`;
  } else if (downloadFormat === "css-vars") {
    content = `:root {\n  --radio-size: ${params.outerSize}px;\n  --radio-dot: ${params.dotSize}px;\n  --radio-border: ${params.outerBorderColor};\n  --radio-selected: ${params.selectedOuterBorderColor};\n  --radio-dot-color: ${params.dotColor};\n}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        radio: {
          outer: {
            size: { value: `${params.outerSize}px` },
            borderColor: { value: params.outerBorderColor },
          },
          dot: {
            size: { value: `${params.dotSize}px` },
            color: { value: params.dotColor },
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
  } else {
    content = `<!-- Radio group -->\n<div class="flex flex-col gap-3" role="radiogroup">\n  ${params.options.map((o) => `<label class="inline-flex items-center gap-2 cursor-pointer"><input type="radio" name="${params.name}" value="${o.value}" class="sr-only peer" /><span class="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-blue-500 flex items-center justify-center"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 hidden peer-checked:block"></span></span><span class="text-sm">${o.label}</span></label>`).join("\n  ")}  \n</div>`;
  }

  return { content, filename };
}
