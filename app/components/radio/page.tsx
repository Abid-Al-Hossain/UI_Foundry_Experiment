"use client";
import React, { useMemo } from "react";
import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";

function buildMiniPreview(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Inter, system-ui, sans-serif; background: #fff; }
  .wrapper { display: flex; flex-direction: column; gap: 16px; width: 250px; }
  .row { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
  .circle { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; }
  .sel { border: 2px solid #3b82f6; }
  .unsel { border: 2px solid #94a3b8; }
  .dis { border: 2px solid #d1d5db; opacity: 0.5; }
  .dot { display: block; width: 10px; height: 10px; border-radius: 50%; background: #3b82f6; }
  .lbl { font-size: 14px; color: #334155; }
  .dis-lbl { font-size: 14px; color: #94a3b8; opacity: 0.5; }
</style>
</head>
<body>
  <div class="wrapper">
    <label class="row"><span class="circle unsel"></span><span class="lbl">Small</span></label>
    <label class="row"><span class="circle sel"><span class="dot"></span></span><span class="lbl">Medium</span></label>
    <label class="row"><span class="circle unsel"></span><span class="lbl">Large</span></label>
    <label class="row" style="cursor:not-allowed;"><span class="circle dis"></span><span class="dis-lbl">Disabled</span></label>
  </div>
</body>
</html>`;
}

const featureTags = [
  "Dynamic Options List",
  "Horizontal / Vertical Layout",
  "Custom Dot Indicator",
  "Focus Ring",
  "Hover / Disabled States",
  "Animation (Scale / Fade)",
  "Label Position",
  "Multi-format Export",
];

export default function RadioGalleryPage() {
  const srcDoc = useMemo(() => buildMiniPreview(), []);

  return (
    <GalleryPageTemplate
      title="Radio Button"
      description="Customizable radio button group with dynamic options, dot indicator styling, orientation control, and comprehensive state management."
      previewSrcDoc={srcDoc}
      playgroundLink="/components/radio/playground"
      playgroundTitle="Radio Button Studio"
      playgroundDescription="Full editor with real-time preview, sliders for all sizes, color palettes, and multi-format code export."
      playgroundButtonLabel="Open Studio"
      featureTags={featureTags}
    />
  );
}
