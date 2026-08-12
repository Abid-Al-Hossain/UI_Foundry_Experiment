"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniPreview() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#fff;color:#0f172a}
.card{padding:18px 24px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-weight:700;font-size:18px;box-shadow:0 10px 30px rgba(99,102,241,.35)}</style>
</head><body><div class="card">Drag & Drop</div></body></html>`;
}

export default function DragdropGalleryPage() {
  const srcDoc = useMemo(() => buildMiniPreview(), []);
  return (
    <GalleryPageTemplate
      title="Drag & Drop"
      description="Drag and drop zones."
      playgroundLink="/components/drag-drop/playground"
      playgroundTitle="Drag & Drop Studio"
      playgroundDescription="Full editor with live preview, presets, and code export."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["Presets", "Live Preview", "Export"]}
    />
  );
}
