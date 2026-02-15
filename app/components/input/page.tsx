"use client";

import React, { useMemo } from "react";
import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";

function buildMiniInputPreview(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Inter, system-ui, sans-serif; background: #fff; }
  .wrapper { width: 320px; display: flex; flex-direction: column; gap: 20px; }
  .row label { display: block; margin-bottom: 6px; color: #64748b; font-size: 13px; font-weight: 500; }
  .row input { width: 100%; height: 44px; padding: 10px 14px; font-size: 14px; color: #1e293b; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; caret-color: #3b82f6; outline: none; transition: border-color 200ms ease; box-sizing: border-box; }
  .focused input { border: 2px solid #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  .focused label .req { color: #ef4444; }
  .helper { margin-top: 4px; font-size: 12px; color: #64748b; }
  .disabled input { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; border-color: #e2e8f0; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="row">
    <label>Username</label>
    <input type="text" placeholder="Enter username..." value="johndoe" readonly />
  </div>
  <div class="row focused">
    <label>Email <span class="req">*</span></label>
    <input type="email" placeholder="you@example.com" readonly />
    <p class="helper">We'll never share your email.</p>
  </div>
  <div class="row">
    <label>Password</label>
    <input type="password" placeholder="••••••••" readonly />
  </div>
  <div class="row disabled">
    <label>Disabled</label>
    <input type="text" value="Can't edit this" disabled readonly />
  </div>
</div>
</body>
</html>`;
}

const featureTags = [
  "10+ Input Types",
  "Focus / Hover / Disabled States",
  "Typography Controls",
  "Border & Radius",
  "Box Shadow",
  "Icon Adornment",
  "Label & Helper Text",
  "Placeholder Styling",
  "Caret & Selection Colors",
  "Gradient Background",
  "Accessibility (ARIA)",
  "Multi-format Export",
];

export default function TextInputGalleryPage() {
  const srcDoc = useMemo(() => buildMiniInputPreview(), []);

  return (
    <GalleryPageTemplate
      title="Text Input"
      description="Fully customizable text input field with comprehensive styling controls for every CSS property — borders, typography, focus states, shadows, labels, icons, and more."
      previewSrcDoc={srcDoc}
      playgroundLink="/components/input/playground"
      playgroundTitle="Text Input Studio"
      playgroundDescription="Full editor with real-time preview, sliders for all sizes, color palettes, and multi-format code export."
      playgroundButtonLabel="Open Studio"
      featureTags={featureTags}
    />
  );
}
