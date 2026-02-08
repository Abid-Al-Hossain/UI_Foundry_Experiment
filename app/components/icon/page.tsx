"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniIconPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fff; }
  .icon-wrapper { 
    width: 64px; 
    height: 64px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: #3b82f6;
  }
</style>
</head>
<body>
  <div class="icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M22 12H2"/>
      <path d="m17 7 5 5-5 5"/>
      <path d="m7 7-5 5 5 5"/>
    </svg>
  </div>
</body>
</html>`;
}

export default function IconGalleryPage() {
  const srcDoc = useMemo(() => buildMiniIconPreview(), []);

  return (
    <GalleryPageTemplate
      title="Icon Studio"
      description="Ultimate icon customization with 3D tilts, neon glows, glassmorphism, and Framer Motion animations."
      playgroundLink="/components/icon/playground"
      playgroundTitle="Icon Playground"
      playgroundDescription="Advanced editor for SVG icons."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["Lucide Icons", "3D Engine", "Glow & Glass"]}
    />
  );
}
