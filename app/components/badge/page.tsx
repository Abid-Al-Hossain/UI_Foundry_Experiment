"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniBadgePreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .badge { 
    display: inline-flex; 
    align-items: center; 
    padding: 6px 12px; 
    border-radius: 9999px; 
    background-color: #3b82f6; 
    color: white; 
    font-size: 14px; 
    font-weight: 600; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
</style>
</head>
<body>
  <div class="badge">
    New Feature
  </div>
</body>
</html>`;
}

export default function BadgeGalleryPage() {
  const srcDoc = useMemo(() => buildMiniBadgePreview(), []);

  return (
    <GalleryPageTemplate
      title="Badge"
      description="Versatile badge component for status indicators, notifications, and labels."
      playgroundLink="/components/badge/playground"
      playgroundTitle="Badge Studio"
      playgroundDescription="Full editor with 3D support, status dots, and custom shapes."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["3D Effects", "Status Dots", "Gradients"]}
    />
  );
}
