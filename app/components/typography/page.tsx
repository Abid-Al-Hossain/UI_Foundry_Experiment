"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniTypographyPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 24px; font-family: system-ui, sans-serif; background: #fff; }
  h1 { font-size: 2rem; font-weight: 700; line-height: 1.1; margin: 0 0 8px; color: #0f172a; }
  h2 { font-size: 1.5rem; font-weight: 600; line-height: 1.2; margin: 0 0 8px; color: #1e293b; }
  h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.3; margin: 0 0 8px; color: #334155; }
  p { font-size: 1rem; font-weight: 400; line-height: 1.6; margin: 0; color: #475569; max-width: 400px; }
  .caption { font-size: 0.75rem; color: #94a3b8; margin-top: 12px; }
</style>
</head>
<body>
  <h1>H1 Heading</h1>
  <h2>H2 Heading</h2>
  <h3>H3 Heading</h3>
  <p>Body text paragraph with optimal line height and letter spacing for readability.</p>
  <div class="caption">Caption · Scale: Major Third (1.25)</div>
</body>
</html>`;
}

export default function TypographyGalleryPage() {
  const srcDoc = useMemo(() => buildMiniTypographyPreview(), []);

  return (
    <GalleryPageTemplate
      title="Typography System"
      description="Design a complete typography scale with modular ratios, fluid sizing, and export CSS variables or React components."
      playgroundLink="/components/typography/playground"
      playgroundTitle="Typography Studio"
      playgroundDescription="Interactive playground with modular scales, fluid typography, and full export options."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={[
        "Modular Scale",
        "Fluid Typography",
        "H1-H6 + Body",
        "CSS / React / Tailwind",
      ]}
    />
  );
}
