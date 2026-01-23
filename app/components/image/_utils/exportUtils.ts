import type { ImageState } from "../types";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

interface ExportOptions extends ImageState {
  downloadFormat: DownloadFormat;
  downloadName: string;
}

export function buildImageExportPayload(options: ExportOptions) {
  const { downloadFormat, downloadName, ...state } = options;

  // Build filter string
  const filters: string[] = [];
  if (state.brightness !== "100")
    filters.push(`brightness(${state.brightness}%)`);
  if (state.contrast !== "100") filters.push(`contrast(${state.contrast}%)`);
  if (state.saturation !== "100")
    filters.push(`saturate(${state.saturation}%)`);
  if (state.grayscale !== "0") filters.push(`grayscale(${state.grayscale}%)`);
  if (state.sepia !== "0") filters.push(`sepia(${state.sepia}%)`);
  if (state.hueRotate !== "0")
    filters.push(`hue-rotate(${state.hueRotate}deg)`);
  if (state.invert !== "0") filters.push(`invert(${state.invert}%)`);
  if (state.blur !== "0") filters.push(`blur(${state.blur}px)`);
  if (state.filterOpacity !== "100")
    filters.push(`opacity(${state.filterOpacity}%)`);

  const filterString = filters.length > 0 ? filters.join(" ") : "none";

  // Build transform string
  const transforms: string[] = [];
  const scaleXVal = state.flipHorizontal
    ? -parseFloat(state.scaleX)
    : parseFloat(state.scaleX);
  const scaleYVal = state.flipVertical
    ? -parseFloat(state.scaleY)
    : parseFloat(state.scaleY);

  if (scaleXVal !== 1 || scaleYVal !== 1)
    transforms.push(`scale(${scaleXVal}, ${scaleYVal})`);
  if (state.rotate !== "0") transforms.push(`rotate(${state.rotate}deg)`);
  if (state.skewX !== "0") transforms.push(`skewX(${state.skewX}deg)`);
  if (state.skewY !== "0") transforms.push(`skewY(${state.skewY}deg)`);
  if (state.rotateX !== "0") transforms.push(`rotateX(${state.rotateX}deg)`);
  if (state.rotateY !== "0") transforms.push(`rotateY(${state.rotateY}deg)`);

  const transformString = transforms.length > 0 ? transforms.join(" ") : "none";

  // Build border radius
  const borderRadius =
    state.borderRadiusMode === "uniform"
      ? `${state.borderRadiusUniform}px`
      : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;

  // Build main styles object
  const mainStyles = {
    width:
      state.widthUnit === "auto" ? "auto" : `${state.width}${state.widthUnit}`,
    height:
      state.heightUnit === "auto"
        ? "auto"
        : `${state.height}${state.heightUnit}`,
    aspectRatio: state.aspectRatio === "none" ? "auto" : state.aspectRatio,
    objectFit: state.objectFit,
    objectPosition: `${state.objectPositionX}% ${state.objectPositionY}%`,
    filter: filterString !== "none" ? filterString : undefined,
    transform: transformString !== "none" ? transformString : undefined,
    transformOrigin: state.transformOrigin,
    borderRadius: borderRadius !== "0px" ? borderRadius : undefined,
    clipPath:
      state.clipPathShape !== "none"
        ? `${state.clipPathShape}(50%)`
        : undefined,
    border:
      state.borderWidth !== "0"
        ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`
        : undefined,
    mixBlendMode:
      state.mixBlendMode !== "normal" ? state.mixBlendMode : undefined,
  };

  // Generate CSS string
  const cssString = Object.entries(mainStyles)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `  ${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`,
    )
    .join("\n");

  if (downloadFormat === "html") {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Component</title>
  <style>
    .styled-image {
${cssString}
    }
  </style>
</head>
<body>
  <img 
    src="${state.src}" 
    alt="${state.alt}"
    loading="${state.loading}"
    class="styled-image"
  />
</body>
</html>`;

    return {
      content,
      filename: `${downloadName}.html`,
    };
  }

  if (downloadFormat === "react") {
    const styleObj = JSON.stringify(mainStyles, null, 2);
    const content = `import React from 'react';

export default function StyledImage() {
  return (
    <img
      src="${state.src}"
      alt="${state.alt}"
      loading="${state.loading}"
      style={${styleObj}}
    />
  );
}`;

    return {
      content,
      filename: `${downloadName}.tsx`,
    };
  }

  // Handle tailwind, css-vars, scss, etc. - fallback to HTML with inline styles for now
  // Future: implement specific generators for each format
  if (
    downloadFormat === "tailwind" ||
    downloadFormat === "css-vars" ||
    downloadFormat === "scss"
  ) {
    // For now, provide HTML with note about format limitations
    const content = `<!-- ${downloadFormat.toUpperCase()} format requested -->
<!-- Note: Full ${downloadFormat} support coming soon. Using HTML with inline styles for now. -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Component</title>
  <style>
    .styled-image {
${cssString}
    }
  </style>
</head>
<body>
  <img 
    src="${state.src}" 
    alt="${state.alt}"
    loading="${state.loading}"
    class="styled-image"
  />
</body>
</html>`;

    return {
      content,
      filename: `${downloadName}-${downloadFormat}.html`,
    };
  }

  // Vue (default fallback)
  const content = `<template>
  <img
    src="${state.src}"
    alt="${state.alt}"
    loading="${state.loading}"
    :style="imageStyle"
  />
</template>

<script setup>
const imageStyle = ${JSON.stringify(mainStyles, null, 2)};
</script>`;

  return {
    content,
    filename: `${downloadName}.vue`,
  };
}
