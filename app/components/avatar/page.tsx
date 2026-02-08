"use client";

import GalleryPageTemplate from "@/app/components/controls/templates/GalleryPageTemplate";
import { useMemo } from "react";

function buildMiniAvatarPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .avatar { width: 64px; height: 64px; border-radius: 9999px; background-color: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #64748b; font-size: 24px; border: 2px solid #e2e8f0; }
  .img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
</style>
</head>
<body>
  <div class="avatar">
    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="img" />
  </div>
</body>
</html>`;
}

export default function AvatarGalleryPage() {
  const srcDoc = useMemo(() => buildMiniAvatarPreview(), []);

  return (
    <GalleryPageTemplate
      title="Avatar"
      description="Highly customizable avatar component with advanced features like 3D tilt, groups, and badging."
      playgroundLink="/components/avatar/playground"
      playgroundTitle="Playground"
      playgroundDescription="Full editor with all premium features."
      playgroundButtonLabel="Open Studio"
      previewSrcDoc={srcDoc}
      featureTags={["3D Tilt", "Groups", "Badges"]}
    />
  );
}
