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
  .wrapper { display: flex; flex-direction: column; gap: 24px; width: 280px; }
  .row { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; }
  .track { position: relative; width: 48px; height: 26px; border-radius: 999px; flex-shrink: 0; }
  .thumb { position: absolute; top: 2px; width: 22px; height: 22px; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .on-t { background: #3b82f6; }
  .off-t { background: #cbd5e1; }
  .grn-t { background: #10b981; }
  .dis-t { background: #94a3b8; opacity: 0.5; }
  .on-th { background: #fff; left: 0; transform: translateX(24px); }
  .off-th { background: #fff; left: 2px; }
  .dis-th { background: #e2e8f0; left: 2px; }
  .lbl { font-size: 14px; color: #334155; }
  .dis-lbl { font-size: 14px; color: #94a3b8; opacity: 0.5; }
</style>
</head>
<body>
  <div class="wrapper">
    <label class="row">
      <div class="track on-t"><span class="thumb on-th"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8 L6.5 11.5 L13 4.5"/></svg></span></div>
      <span class="lbl">Enable notifications</span>
    </label>
    <label class="row">
      <div class="track off-t"><span class="thumb off-th"></span></div>
      <span class="lbl">Dark mode</span>
    </label>
    <label class="row">
      <div class="track grn-t"><span class="thumb on-th"></span></div>
      <span class="lbl">Sync data</span>
    </label>
    <label class="row" style="cursor:not-allowed;">
      <div class="track dis-t"><span class="thumb dis-th"></span></div>
      <span class="dis-lbl">Disabled option</span>
    </label>
  </div>
</body>
</html>`;
}

const featureTags = [
  "Track & Thumb Customization",
  "Thumb Icons (✓ / ✕ / Both)",
  "On/Off Color States",
  "Press & Hover Scale",
  "Focus Ring",
  "Smooth Animation",
  "Label Position",
  "Multi-format Export",
];

export default function ToggleGalleryPage() {
  const srcDoc = useMemo(() => buildMiniPreview(), []);

  return (
    <GalleryPageTemplate
      title="Toggle / Switch"
      description="Premium toggle switch with fully customizable track, thumb, icons, animations, and state-based styling. Exports to HTML, React, and design tokens."
      previewSrcDoc={srcDoc}
      playgroundLink="/components/toggle/playground"
      playgroundTitle="Toggle / Switch Studio"
      playgroundDescription="Full editor with real-time preview, sliders for all sizes, color palettes, and multi-format code export."
      playgroundButtonLabel="Open Studio"
      featureTags={featureTags}
    />
  );
}
