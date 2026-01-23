import type { ImageState } from "../types";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

interface ExportOptions extends ImageState {
  downloadFormat: DownloadFormat;
  downloadName: string;
}

export function buildImageExportPayload(options: ExportOptions) {
  const { downloadFormat, downloadName, ...state } = options;

  // 1. Build Base Values (Dimensions, Colors, etc.)
  // ---------------------------------------------------------------------------

  // Helpers
  const widthVal =
    state.widthUnit === "auto" ? "auto" : `${state.width}${state.widthUnit}`;
  const heightVal =
    state.heightUnit === "auto" ? "auto" : `${state.height}${state.heightUnit}`;
  const aspectRatio =
    state.aspectRatio === "custom"
      ? `${state.customAspectWidth} / ${state.customAspectHeight}`
      : state.aspectRatio === "none"
        ? "auto"
        : state.aspectRatio;

  // Filter String
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

  // Base Drop Shadow (CSS filter level)
  if (state.dropShadowEnabled) {
    filters.push(
      `drop-shadow(${state.dropShadowX}px ${state.dropShadowY}px ${state.dropShadowBlur}px ${state.dropShadowColor})`,
    );
  }
  const baseFilter = filters.length > 0 ? filters.join(" ") : "none";

  // Transform String
  const transforms: string[] = [];
  const scaleX = state.flipHorizontal
    ? -parseFloat(state.scaleX)
    : parseFloat(state.scaleX);
  const scaleY = state.flipVertical
    ? -parseFloat(state.scaleY)
    : parseFloat(state.scaleY);
  if (scaleX !== 1 || scaleY !== 1)
    transforms.push(`scale(${scaleX}, ${scaleY})`);
  if (state.rotate !== "0") transforms.push(`rotate(${state.rotate}deg)`);
  if (state.translateX !== "0" || state.translateY !== "0")
    transforms.push(`translate(${state.translateX}px, ${state.translateY}px)`);
  if (state.skewX !== "0") transforms.push(`skewX(${state.skewX}deg)`);
  if (state.skewY !== "0") transforms.push(`skewY(${state.skewY}deg)`);
  if (state.rotateX !== "0") transforms.push(`rotateX(${state.rotateX}deg)`);
  if (state.rotateY !== "0") transforms.push(`rotateY(${state.rotateY}deg)`);
  if (state.rotateZ !== "0") transforms.push(`rotateZ(${state.rotateZ}deg)`);
  const baseTransform = transforms.length > 0 ? transforms.join(" ") : "none";

  // Border Radius
  const borderRadius =
    state.borderRadiusMode === "uniform"
      ? `${state.borderRadiusUniform}px`
      : `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;

  // Clip Path
  const clipPath =
    state.clipPathShape !== "none"
      ? state.clipPathShape === "inset"
        ? "inset(10% round 10px)"
        : state.clipPathShape === "circle"
          ? "circle(50% at 50% 50%)"
          : state.clipPathShape === "ellipse"
            ? "ellipse(50% 50% at 50% 50%)"
            : state.clipPathShape === "polygon"
              ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              : "none"
      : "none";

  // Box Shadow
  const boxShadow = state.boxShadowEnabled
    ? `${state.boxShadowInset ? "inset " : ""}${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${state.boxShadowColor}`
    : "none";

  // Mask Image
  let maskImage = "none";
  if (state.maskType === "linear-gradient") {
    const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
    const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
    maskImage = `linear-gradient(${state.maskAngle}deg, ${start}, ${end})`;
  } else if (state.maskType === "radial-gradient") {
    const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
    const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
    maskImage = `radial-gradient(circle, ${start} 0%, ${end} 100%)`;
  } else if (state.maskType === "vignette" && state.vignetteEnabled) {
    const intensity = parseInt(state.vignetteIntensity) / 100;
    const softness = parseInt(state.vignetteSoftness);
    maskImage = `radial-gradient(circle, transparent ${softness}%, ${state.vignetteColor} ${100 - intensity * 20}%)`;
  }

  // Hover Values
  const hoverZoom =
    state.hoverEffect === "zoom-in" || state.hoverEffect === "zoom-out"
      ? state.hoverZoomScale
      : "1";
  const hoverRotate =
    state.hoverEffect === "rotate" ? state.hoverRotateAngle : "0";
  const hoverLift =
    state.hoverEffect === "lift" ? -parseFloat(state.hoverLiftAmount) : 0;
  const hoverTilt =
    state.hoverEffect === "tilt" ? parseFloat(state.hoverTiltAmount) : 0;
  const cursor = state.hoverEffect !== "none" ? "pointer" : "default";
  const transition =
    state.hoverEffect !== "none"
      ? `all ${state.hoverDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : "none";

  // Duotone & Overlay Logics
  const duotoneFilter = state.duotoneEnabled ? "grayscale(100%)" : "";
  const finalFilter =
    [baseFilter !== "none" ? baseFilter : "", duotoneFilter]
      .filter(Boolean)
      .join(" ") || "none";

  // Caption Logic
  let captionCss = "";
  if (state.captionEnabled) {
    const bg =
      state.captionBgStyle === "solid"
        ? `background-color: ${state.captionBgColor};`
        : state.captionBgStyle === "gradient"
          ? `background: linear-gradient(to ${state.captionPosition === "top" ? "bottom" : "top"}, rgba(0,0,0,0.8), transparent); width: 100%; border-radius: 0; padding: 20px; text-align: center;`
          : `background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 6px rgba(0,0,0,0.1);`;

    const pos =
      state.captionPosition === "top"
        ? "top: 0;"
        : state.captionPosition === "bottom"
          ? "bottom: 0;"
          : "top: 50%; transform: translateY(-50%);";
    captionCss = `.image-caption-container { position: absolute; left: 0; right: 0; ${pos} padding: 20px; display: flex; justify-content: center; pointer-events: none; }
      .image-caption-text { color: ${state.captionTextColor}; font-size: ${state.captionFontSize}px; font-weight: 500; padding: 8px 16px; border-radius: 8px; ${bg} }`;
  }

  // 2. Global CSS (HTML/React/Vue/CSS Vars)
  // ---------------------------------------------------------------------------
  const globalCss = `
    .image-container { position: relative; display: inline-block; perspective: ${state.perspective !== "0" ? state.perspective + "px" : "none"}; width: ${widthVal}; height: ${heightVal}; }
    .image-wrapper { position: relative; display: inline-block; width: 100%; height: 100%; cursor: ${cursor}; overflow: hidden; border-radius: ${borderRadius}; clip-path: ${clipPath}; box-shadow: ${boxShadow}; border: ${state.borderWidth !== "0" ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}` : "none"}; }
    .main-image { display: block; width: 100%; height: 100%; object-fit: ${state.objectFit}; object-position: ${state.objectPositionX}% ${state.objectPositionY}%; aspect-ratio: ${aspectRatio}; transform-origin: ${state.transformOrigin}; transform: ${baseTransform}; filter: ${finalFilter}; mask-image: ${maskImage !== "none" ? maskImage : "none"}; -webkit-mask-image: ${maskImage !== "none" ? maskImage : "none"}; mix-blend-mode: ${state.mixBlendMode}; transition: ${transition}; 
      animation-name: ${state.entranceAnimation !== "none" ? `image-entrance-${state.entranceAnimation}` : "none"}; animation-duration: ${state.entranceDuration}ms; animation-delay: ${state.entranceDelay}ms; animation-fill-mode: both; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
    .image-wrapper:hover .main-image {
       ${state.hoverEffect === "zoom-in" || state.hoverEffect === "zoom-out" ? `transform: ${baseTransform === "none" ? "" : baseTransform} scale(${hoverZoom});` : ""}
       ${state.hoverEffect === "rotate" ? `transform: ${baseTransform === "none" ? "" : baseTransform} rotate(${hoverRotate}deg);` : ""}
       ${state.hoverEffect === "lift" ? `transform: ${baseTransform === "none" ? "" : baseTransform} translateY(${hoverLift}px);` : ""}
       ${state.hoverEffect === "tilt" ? `transform: ${baseTransform === "none" ? "" : baseTransform} rotateX(${hoverTilt}deg) rotateY(-${hoverTilt}deg);` : ""}
       ${state.hoverEffect === "brightness" ? `filter: ${finalFilter === "none" ? "" : finalFilter} brightness(${state.hoverIntensity}%);` : ""}
       ${state.hoverEffect === "grayscale" ? `filter: ${finalFilter === "none" ? "" : finalFilter} grayscale(100%);` : ""}
    }
    .duotone-shadows { position: absolute; inset: 0; pointer-events: none; background-color: ${state.duotoneColor1}; mix-blend-mode: multiply; }
    .duotone-highlights { position: absolute; inset: 0; pointer-events: none; background-color: ${state.duotoneColor2}; mix-blend-mode: screen; }
    .color-overlay { position: absolute; inset: 0; pointer-events: none; background-color: ${state.overlayColor}; opacity: ${parseInt(state.overlayOpacity) / 100}; mix-blend-mode: ${state.overlayBlendMode}; }
    .vignette-overlay { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, transparent ${state.vignetteSoftness}%, ${state.vignetteColor} 100%); opacity: ${parseInt(state.vignetteIntensity) / 100}; }
    @keyframes image-entrance-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes image-entrance-slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes image-entrance-zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    @keyframes image-entrance-blur-in { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }
    ${captionCss}
  `;

  // 3. Generators
  // ---------------------------------------------------------------------------

  if (downloadFormat === "html") {
    const content = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Exported Image</title><style>${globalCss}</style></head>
<body>${getHtmlStructure(state, "image-container", "image-wrapper", "main-image")}</body></html>`;
    return { content, filename: `${downloadName}.html` };
  }

  if (downloadFormat === "react") {
    const content = `import React from 'react';
export default function StyledImage() { return (<><style jsx>{\`${globalCss}\`}</style>${getJsxStructure(state, "image-container", "image-wrapper", "main-image")}</>); }`;
    return { content, filename: `${downloadName}.tsx` };
  }

  if (downloadFormat === "tailwind") {
    const tw = generateTailwindClasses(
      state,
      widthVal,
      heightVal,
      aspectRatio,
      borderRadius,
    );
    const content = `<!-- Tailwind Component -->
<div class="${tw.container}">
  <div class="${tw.wrapper}">
    <img src="${state.src}" alt="${state.alt}" loading="${state.loading}" class="${tw.image}" />
    ${state.duotoneEnabled ? `<div class="absolute inset-0 pointer-events-none mix-blend-multiply" style="background-color: ${state.duotoneColor1}"></div><div class="absolute inset-0 pointer-events-none mix-blend-screen" style="background-color: ${state.duotoneColor2}"></div>` : ""}
    ${state.overlayEnabled ? `<div class="absolute inset-0 pointer-events-none mix-blend-${state.overlayBlendMode}" style="background-color: ${state.overlayColor}; opacity: ${parseInt(state.overlayOpacity) / 100}"></div>` : ""}
    ${state.captionEnabled ? `<div class="${tw.captionContainer}"><div class="${tw.captionText}">${state.captionText}</div></div>` : ""}
  </div>
</div>`;
    return { content, filename: `${downloadName}.html` };
  }

  if (downloadFormat === "scss") {
    const scss = generateScss(
      state,
      widthVal,
      heightVal,
      borderRadius,
      boxShadow,
      clipPath,
      baseTransform,
      finalFilter,
      maskImage,
      transition,
      cursor,
    );
    const content = `<!-- SCSS Component -->
<div class="image-component"><div class="wrapper"><img src="${state.src}" class="main-img" />${state.captionEnabled ? `<div class="caption">${state.captionText}</div>` : ""}</div></div>
<style lang="scss">
${scss}
</style>`;
    return { content, filename: `${downloadName}.scss` };
  }

  if (downloadFormat === "css-vars") {
    const content = `<!DOCTYPE html><style>:root {
  --img-w: ${widthVal}; --img-h: ${heightVal}; --img-radius: ${borderRadius}; --img-shadow: ${boxShadow}; --img-transform: ${baseTransform}; --img-filter: ${finalFilter};
}
${globalCss.replace(widthVal, "var(--img-w)").replace(heightVal, "var(--img-h)")}
</style><body>${getHtmlStructure(state, "image-container", "image-wrapper", "main-image")}</body>`;
    return { content, filename: `${downloadName}-vars.html` };
  }

  if (downloadFormat === "figma-tokens") {
    const tokens = {
      name: "Image Component Tokens",
      values: {
        dimensions: {
          width: state.width,
          height: state.height,
          unit: state.widthUnit,
        },
        borderRadius:
          state.borderRadiusMode === "uniform"
            ? { value: state.borderRadiusUniform, unit: "px" }
            : {
                tl: state.borderRadiusTL,
                tr: state.borderRadiusTR,
                br: state.borderRadiusBR,
                bl: state.borderRadiusBL,
              },
        shadow: state.boxShadowEnabled
          ? {
              x: state.boxShadowX,
              y: state.boxShadowY,
              blur: state.boxShadowBlur,
              spread: state.boxShadowSpread,
              color: state.boxShadowColor,
            }
          : {},
        border:
          state.borderWidth !== "0"
            ? {
                width: state.borderWidth,
                style: state.borderStyle,
                color: state.borderColor,
              }
            : {},
      },
    };
    return {
      content: JSON.stringify(tokens, null, 2),
      filename: `${downloadName}-tokens.json`,
    };
  }

  if (downloadFormat === "tailwind-config") {
    const config = {
      theme: {
        extend: {
          boxShadow: {
            "image-custom": `${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${state.boxShadowColor}`,
          },
          borderRadius: { "image-custom": borderRadius },
        },
      },
    };
    return {
      content: JSON.stringify(config, null, 2),
      filename: `tailwind.config.js`,
    };
  }

  // Vue (Fallback)
  const content = `<template><div class="image-container"><div class="image-wrapper"><img src="${state.src}" alt="${state.alt}" class="main-image" />${state.captionEnabled ? `<div class="image-caption-container"><div class="image-caption-text">${state.captionText}</div></div>` : ""}</div></div></template><style scoped>${globalCss}</style>`;
  return { content, filename: `${downloadName}.vue` };
}

// Helpers
function getHtmlStructure(state: any, cont: string, wrap: string, img: string) {
  return `<div class="${cont}"><div class="${wrap}"><img src="${state.src}" alt="${state.alt}" loading="${state.loading}" class="${img}" />
    ${state.duotoneEnabled ? `<div class="duotone-shadows"></div><div class="duotone-highlights"></div>` : ""}
    ${state.overlayEnabled ? `<div class="color-overlay"></div>` : ""}
    ${state.vignetteEnabled && state.maskType === "none" ? `<div class="vignette-overlay"></div>` : ""}
    ${state.captionEnabled ? `<div class="image-caption-container"><div class="image-caption-text">${state.captionText}</div></div>` : ""}
  </div></div>`;
}
function getJsxStructure(state: any, cont: string, wrap: string, img: string) {
  return `<div className="${cont}"><div className="${wrap}"><img src="${state.src}" alt="${state.alt}" loading="${state.loading}" className="${img}" />
    ${state.duotoneEnabled ? `<div className="duotone-shadows" /><div className="duotone-highlights" />` : ""}
    ${state.overlayEnabled ? `<div className="color-overlay" />` : ""}
    ${state.vignetteEnabled && state.maskType === "none" ? `<div className="vignette-overlay" />` : ""}
    ${state.captionEnabled ? `<div className="image-caption-container"><div className="image-caption-text">${state.captionText}</div></div>` : ""}
  </div></div>`;
}
function generateTailwindClasses(
  state: any,
  w: string,
  h: string,
  ar: string,
  br: string,
) {
  // Using arbitrary values for exact fidelity
  const shadow = state.boxShadowEnabled
    ? `shadow-[${state.boxShadowX}px_${state.boxShadowY}px_${state.boxShadowBlur}px_${state.boxShadowSpread}px_${state.boxShadowColor.replace("#", "")}]`
    : "";
  const border =
    state.borderWidth !== "0"
      ? `border-[${state.borderWidth}px] border-[${state.borderColor}] border-${state.borderStyle}`
      : "";
  const capPos =
    state.captionPosition === "top"
      ? "top-0"
      : state.captionPosition === "bottom"
        ? "bottom-0"
        : "top-1/2 -translate-y-1/2";

  return {
    container: `relative inline-block w-[${state.width}${state.widthUnit}] h-[${state.height}${state.heightUnit}] perspective-[${state.perspective}px]`,
    wrapper: `relative w-full h-full inline-block overflow-hidden rounded-[${br}] ${shadow} ${border} group cursor-${state.hoverEffect !== "none" ? "pointer" : "default"}`,
    image: `block w-full h-full object-${state.objectFit} aspect-[${ar.replace(" ", "")}] transition-all duration-[${state.hoverDuration}ms] group-hover:scale-[${state.hoverEffect === "zoom-in" ? state.hoverZoomScale : "1"}]`,
    captionContainer: `absolute left-0 right-0 p-5 flex justify-center pointer-events-none ${capPos}`,
    captionText: `px-4 py-2 rounded-lg font-medium text-[${state.captionFontSize}px] text-[${state.captionTextColor}] ${state.captionBgStyle === "glass" ? "backdrop-blur-md bg-white/10" : `bg-[${state.captionBgColor}]`}`,
  };
}
function generateScss(
  state: any,
  w: string,
  h: string,
  br: string,
  bs: string,
  cp: string,
  tr: string,
  flt: string,
  msk: string,
  trans: string,
  cur: string,
) {
  return `.image-component {
  position: relative; display: inline-block; width: ${w}; height: ${h}; perspective: ${state.perspective}px;
  .wrapper {
    position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: ${br}; box-shadow: ${bs}; cursor: ${cur}; clip-path: ${cp};
    .main-img {
      display: block; width: 100%; height: 100%; object-fit: ${state.objectFit}; transform: ${tr}; filter: ${flt}; transition: ${trans};
      mask-image: ${msk};
    }
    &:hover .main-img {
       /* Hover effects */
       ${state.hoverEffect === "zoom-in" ? `transform: scale(${state.hoverZoomScale});` : ""}
    }
    .caption { position: absolute; /* ... */ }
  }
}`;
}
