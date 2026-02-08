"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniDividerPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .wrapper { width: 80%; max-width: 300px; display: flex; flex-direction: column; gap: 24px; color: #64748b; font-size: 14px; }
  .divider { 
    height: 1px;
    width: 100%;
    background: #e2e8f0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    background: #fff;
    padding: 0 12px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div>Text Block A</div>
    <div class="divider">
      <span class="label">OR</span>
    </div>
    <div>Text Block B</div>
  </div>
</body>
</html>`;
}

export default function DividerGalleryPage() {
  const srcDoc = useMemo(() => buildMiniDividerPreview(), []);

  return (
    <GalleryPageTemplate
      title="Divider"
      description="Smart divider components with content support, beam effects, and gradients."
      playgroundLink="/components/divider/playground"
      playgroundTitle="Divider Studio"
      playgroundDescription='Full editor with "Hyper FX" (beams, neon) and strict layout controls.'
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["Beams", "Gradients", "Content/Labels"]}
    />
  );
}
