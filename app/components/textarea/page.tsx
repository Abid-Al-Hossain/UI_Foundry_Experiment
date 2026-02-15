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
  .wrapper { width: 360px; display: flex; flex-direction: column; gap: 20px; }
  .row label { display: block; margin-bottom: 6px; color: #64748b; font-size: 13px; font-weight: 500; }
  .row textarea { width: 100%; padding: 10px 14px; font-size: 14px; color: #1e293b; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; caret-color: #3b82f6; outline: none; line-height: 1.6; box-sizing: border-box; font-family: Inter, system-ui, sans-serif; }
  .focused textarea { border: 2px solid #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  .focused label .req { color: #ef4444; }
  .helper { margin-top: 4px; font-size: 12px; color: #64748b; }
  .disabled textarea { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; border-color: #e2e8f0; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="row">
    <label>Message</label>
    <textarea readonly rows="4" placeholder="Type your message here..." style="resize:vertical;min-height:100px;">Hello! This is a sample textarea with multi-line content support and vertical resize.</textarea>
    <p class="helper">Max 500 characters</p>
  </div>
  <div class="row focused">
    <label>Notes <span class="req">*</span></label>
    <textarea readonly rows="3" placeholder="Add notes..." style="resize:none;min-height:80px;"></textarea>
  </div>
  <div class="row disabled">
    <label>Disabled</label>
    <textarea readonly rows="2" disabled style="resize:none;">Cannot edit this textarea</textarea>
  </div>
</div>
</body>
</html>`;
}

const featureTags = [
  "Rows & Cols Control",
  "Resize (None / Both / Vertical / Horizontal)",
  "Focus / Hover / Disabled States",
  "Typography Controls",
  "White-space & Overflow-wrap",
  "Border & Radius",
  "Box Shadow",
  "Scrollbar Styling",
  "Character Count",
  "Label & Helper Text",
  "Min/Max Height",
  "Multi-format Export",
];

export default function TextareaGalleryPage() {
  const srcDoc = useMemo(() => buildMiniPreview(), []);

  return (
    <GalleryPageTemplate
      title="Textarea"
      description="Fully customizable multi-line text area with controls for sizing, resize behavior, typography, scrollbar styling, character counting, and comprehensive state management."
      previewSrcDoc={srcDoc}
      playgroundLink="/components/textarea/playground"
      playgroundTitle="Textarea Studio"
      playgroundDescription="Full editor with real-time preview, sliders for all sizes, color palettes, and multi-format code export."
      playgroundButtonLabel="Open Studio"
      featureTags={featureTags}
    />
  );
}
