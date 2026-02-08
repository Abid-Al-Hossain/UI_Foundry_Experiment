"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniSpinnerPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .label { margin-top: 10px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center; }
</style>
</head>
<body>
  <div>
    <div class="spinner"></div>
    <div class="label">Loading...</div>
  </div>
</body>
</html>`;
}

export default function SpinnerGalleryPage() {
  const srcDoc = useMemo(() => buildMiniSpinnerPreview(), []);

  return (
    <GalleryPageTemplate
      title="Spinner & Loaders"
      description="Next-gen loading indicators featuring 3D cubes, quantum particles, liquid morphing, and cyberpunk glitch effects."
      playgroundLink="/components/spinner/playground"
      playgroundTitle="Spinner Studio"
      playgroundDescription="Interactive playground with 10+ variants and physics controls."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={[
        "3D Cubes & Spheres",
        "True Liquid / Gooey",
        "Quantum Orbit",
        "Glitch Mode",
      ]}
    />
  );
}
