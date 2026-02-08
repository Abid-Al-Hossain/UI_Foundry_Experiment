"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniImagePreview() {
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
    font-family: sans-serif; 
    background: #fff; 
  }
  img {
    width: 240px;
    height: 160px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    filter: sepia(10%) contrast(105%);
  }
</style>
</head>
<body>
  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=320&fit=crop" alt="Mountain landscape" />
</body>
</html>`;
}

export default function ImageGalleryPage() {
  const srcDoc = useMemo(() => buildMiniImagePreview(), []);

  return (
    <GalleryPageTemplate
      title="Image"
      description="Enhanced image component with CSS filters, transforms, and styling effects."
      playgroundLink="/components/image/playground"
      playgroundTitle="Image Studio"
      playgroundDescription="Full editor for image manipulation and effects."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["Filters", "Transforms", "Shapes"]}
    />
  );
}
