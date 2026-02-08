"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniTooltipPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: system-ui, -apple-system, sans-serif;
    background: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .tooltip-demo {
    position: relative;
    display: inline-block;
  }
  .trigger {
    padding: 12px 24px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  }
  .trigger:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
  .tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: #f8fafc;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #1e293b;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .tooltip-demo:nth-child(2) .tooltip {
    background: #ffffff;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  .tooltip-demo:nth-child(2) .tooltip::after {
    border-top-color: #ffffff;
  }
  .tooltip-demo:nth-child(2) .trigger {
    background: linear-gradient(135deg, #06b6d4, #22d3ee);
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
  }
  .tooltip-demo:nth-child(2) .trigger:hover {
    box-shadow: 0 8px 30px rgba(6, 182, 212, 0.4);
  }
  .row {
    display: flex;
    gap: 40px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="tooltip-demo">
        <div class="tooltip">✨ Dark Theme Tooltip</div>
        <button class="trigger">Hover Effect</button>
      </div>
      <div class="tooltip-demo">
        <div class="tooltip">🌟 Light Theme Tooltip</div>
        <button class="trigger">Click Trigger</button>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default function TooltipGalleryPage() {
  const srcDoc = useMemo(() => buildMiniTooltipPreview(), []);

  return (
    <GalleryPageTemplate
      title="Tooltip"
      description="Ultimate tooltip builder with 50+ customization options. Supports 12 placements, 5 animation types, themes, arrows, and advanced trigger behaviors."
      playgroundLink="/components/tooltip/playground"
      playgroundTitle="Playground"
      playgroundDescription="Full editor with positioning, animation, triggers, and export."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      previewHeight={200}
      featureTags={[
        "12 Placements",
        "5 Animations",
        "Themes",
        "Arrows",
        "Multi-Trigger",
      ]}
    />
  );
}
