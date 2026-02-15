"use client";

import React from "react";
import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniPreview(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Inter, system-ui, sans-serif; background: #fff; }
  .wrapper { display: flex; flex-direction: column; gap: 20px; width: 280px; }
  .row { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
  .box { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 4px; flex-shrink: 0; }
  .checked { background: #3b82f6; border: 2px solid #3b82f6; }
  .unchecked { background: transparent; border: 2px solid #94a3b8; }
  .indet { background: #3b82f6; border: 2px solid #3b82f6; }
  .dis { background: transparent; border: 2px solid #d1d5db; opacity: 0.5; cursor: not-allowed; }
  .lbl { font-size: 14px; color: #334155; }
  .dis-lbl { font-size: 14px; color: #94a3b8; opacity: 0.5; }
</style>
</head>
<body>
  <div class="wrapper">
    <label class="row">
      <span class="box checked"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8 L6.5 11.5 L13 4.5"/></svg></span>
      <span class="lbl">Accept terms and conditions</span>
    </label>
    <label class="row">
      <span class="box unchecked"></span>
      <span class="lbl">Subscribe to newsletter</span>
    </label>
    <label class="row">
      <span class="box indet"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M4 8 L12 8"/></svg></span>
      <span class="lbl">Select all (indeterminate)</span>
    </label>
    <label class="row" style="cursor:not-allowed;">
      <span class="box dis"></span>
      <span class="dis-lbl">Disabled option</span>
    </label>
  </div>
</body>
</html>`;
}

const featureTags = [
  "Custom Checkmark (✓ / ✕ / — / SVG)",
  "Indeterminate State",
  "Focus Ring",
  "Hover / Disabled States",
  "Label Position (Left / Right)",
  "Animation (Scale / Fade)",
  "Custom Box Sizing & Radius",
  "Multi-format Export",
];

export default function CheckboxGalleryPage() {
  const srcDoc = useMemo(() => buildMiniPreview(), []);

  return (
    <GalleryPageTemplate
      title="Checkbox"
      description="Fully customizable checkbox with custom checkmarks, indeterminate state, animation support, and comprehensive styling for box, label, and states."
      previewSrcDoc={srcDoc}
      playgroundLink="/components/checkbox/playground"
      playgroundTitle="Checkbox Studio"
      playgroundDescription="Full editor with real-time preview, sliders for all sizes, color palettes, and multi-format code export."
      playgroundButtonLabel="Open Studio"
      featureTags={featureTags}
    />
  );
}
