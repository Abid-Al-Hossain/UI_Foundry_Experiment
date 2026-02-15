"use client";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { type ToggleState } from "../types";

export type ToggleExportInput = ToggleState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildToggleExportPayload(params: ToggleExportInput) {
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

  const pad = (params.trackHeight - params.thumbSize) / 2;
  const onX = params.trackWidth - params.thumbSize - pad;

  let content = "";

  if (downloadFormat === "html") {
    content = `<label class="toggle-label">
  <input type="checkbox" class="toggle-input" ${params.checked ? "checked" : ""} ${params.disabled ? "disabled" : ""} role="${params.role || "switch"}" />
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  <span class="toggle-text">${params.labelText}</span>
</label>

<style>
.toggle-label { display: inline-flex; align-items: center; gap: ${params.labelGap}px; cursor: pointer; font-family: ${params.labelFontFamily}; font-size: ${params.labelFontSize}px; color: ${params.labelColor}; }
.toggle-input { position: absolute; opacity: 0; width: 0; height: 0; }
.toggle-track { position: relative; width: ${params.trackWidth}px; height: ${params.trackHeight}px; border-radius: ${params.trackBorderRadius}px; background: ${params.trackOffBg}; transition: all ${params.transitionDuration}ms ${params.transitionEasing}; }
.toggle-thumb { position: absolute; top: ${pad}px; left: ${pad}px; width: ${params.thumbSize}px; height: ${params.thumbSize}px; border-radius: ${params.thumbBorderRadius}%; background: ${params.thumbOffBg}; box-shadow: ${params.thumbShadow}; transition: all ${params.transitionDuration}ms ${params.transitionEasing}; }
.toggle-input:checked + .toggle-track { background: ${params.trackOnBg}; }
.toggle-input:checked + .toggle-track .toggle-thumb { transform: translateX(${onX}px); }
.toggle-input:focus-visible + .toggle-track { box-shadow: 0 0 0 ${params.focusRingWidth}px ${params.focusRingColor}; }
.toggle-input:disabled + .toggle-track { opacity: ${params.disabledOpacity}; cursor: ${params.disabledCursor}; }
</style>`;
  } else if (downloadFormat === "react") {
    content = `import React, { useState } from 'react';

export default function ToggleSwitch() {
  const [checked, setChecked] = useState(${params.checked});
  const pad = ${pad};
  const onX = ${onX};

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: ${params.labelGap}, cursor: 'pointer', fontFamily: '${params.labelFontFamily}', fontSize: ${params.labelFontSize}, color: '${params.labelColor}' }}>
      <div
        onClick={() => setChecked(!checked)}
        style={{
          position: 'relative', width: ${params.trackWidth}, height: ${params.trackHeight},
          borderRadius: ${params.trackBorderRadius},
          background: checked ? '${params.trackOnBg}' : '${params.trackOffBg}',
          transition: 'all ${params.transitionDuration}ms ${params.transitionEasing}', cursor: 'pointer',
        }}
      >
        <span style={{
          position: 'absolute', top: pad, left: 0,
          transform: \`translateX(\${checked ? onX : pad}px)\`,
          width: ${params.thumbSize}, height: ${params.thumbSize},
          borderRadius: '${params.thumbBorderRadius}%',
          background: checked ? '${params.thumbOnBg}' : '${params.thumbOffBg}',
          boxShadow: '${params.thumbShadow}',
          transition: 'all ${params.transitionDuration}ms ${params.transitionEasing}',
        }} />
      </div>
      <span>${params.labelText}</span>
    </label>
  );
}`;
  } else if (downloadFormat === "css-vars") {
    content = `:root {\n  --toggle-track-w: ${params.trackWidth}px;\n  --toggle-track-h: ${params.trackHeight}px;\n  --toggle-off-bg: ${params.trackOffBg};\n  --toggle-on-bg: ${params.trackOnBg};\n  --toggle-thumb: ${params.thumbOffBg};\n  --toggle-radius: ${params.trackBorderRadius}px;\n}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        toggle: {
          track: {
            width: { value: `${params.trackWidth}px` },
            height: { value: `${params.trackHeight}px` },
            offBg: { value: params.trackOffBg },
            onBg: { value: params.trackOnBg },
          },
          thumb: {
            size: { value: `${params.thumbSize}px` },
            bg: { value: params.thumbOffBg },
          },
        },
      },
      null,
      2,
    );
  } else {
    content = `<!-- Toggle switch -->\n<label class="inline-flex items-center gap-3 cursor-pointer">\n  <input type="checkbox" class="sr-only peer" ${params.checked ? "checked" : ""} />\n  <div class="relative w-12 h-7 bg-slate-300 peer-checked:bg-blue-500 rounded-full transition-colors duration-200">\n    <span class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></span>\n  </div>\n  <span class="text-sm">${params.labelText}</span>\n</label>`;
  }

  return { content, filename };
}
