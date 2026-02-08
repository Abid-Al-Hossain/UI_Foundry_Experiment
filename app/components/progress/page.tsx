"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniProgressPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .container { width: 300px; display: flex; flex-direction: column; gap: 20px; }
  .progress { width: 100%; height: 12px; background: #e2e8f0; border-radius: 99px; overflow: hidden; position: relative; }
  .bar { height: 100%; background: linear-gradient(to right, #3b82f6, #8b5cf6); width: 65%; border-radius: 99px; position: relative; }
  .bar::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent); background-size: 20px 20px; }
  .label { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 4px; font-weight: 600; }
</style>
</head>
<body>
  <div class="container">
    <div>
      <div class="label"><span>Uploading...</span><span>65%</span></div>
      <div class="progress">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default function ProgressGalleryPage() {
  const srcDoc = useMemo(() => buildMiniProgressPreview(), []);

  return (
    <GalleryPageTemplate
      title="Progress Bar"
      description="Ultimate progress indicator with liquid, glitch, and stripe effects. Supports buffers, steps, and timer modes."
      playgroundLink="/components/progress/playground"
      playgroundTitle="Playground"
      playgroundDescription="Full editor with all premium features."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["Liquid Effect", "Glitch Mode", "Animated Stripes"]}
    />
  );
}
