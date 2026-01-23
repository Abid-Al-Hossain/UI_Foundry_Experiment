"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import {
  type DividerOrientation,
  type DividerVariant,
  type DividerContentPosition,
} from "../types";

export type DividerExportInput = {
  downloadFormat: DownloadFormat;
  downloadName: string;
  orientation: DividerOrientation;
  width: string;
  thickness: number;
  gap: number;
  color: string;
  variant: DividerVariant;
  borderRadius: number;
  showLabel: boolean;
  labelText: string;
  labelPosition: DividerContentPosition;
  labelBackground: string;
  labelColor: string;
  labelPadding: number;
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  opacity: number;
  animateBeam: boolean;
  beamColor: string;
  beamSpeed: number;
  shimmerEnabled: boolean;
  shimmerSpeed: number;
  neonGlow: boolean;
  glowColor: string;
  glowBlur: number;
};

export function buildDividerExportPayload(params: DividerExportInput) {
  const {
    downloadFormat,
    downloadName,
    orientation,
    width,
    thickness,
    gap,
    color,
    variant,
    borderRadius,
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    opacity,
    animateBeam,
    beamColor,
    beamSpeed,
    neonGlow,
    glowColor,
    glowBlur,
  } = params;

  const isHorizontal = orientation === "horizontal";
  const ext =
    downloadFormat === "react"
      ? "jsx"
      : downloadFormat === "tailwind-config"
        ? "js"
        : downloadFormat === "figma-tokens"
          ? "json"
          : downloadFormat === "css-vars"
            ? "css"
            : downloadFormat === "scss"
              ? "scss"
              : "html";
  const filename = `${downloadName}.${ext}`;

  // 1. Logic Helpers
  const getSizeStyle = () =>
    isHorizontal
      ? { width: width, height: `${thickness}px` }
      : { width: `${thickness}px`, height: width };

  let bg = color;
  let border = "none";
  if (gradientEnabled) {
    bg = `linear-gradient(${isHorizontal ? "to right" : "to bottom"}, ${gradientStart}, ${gradientEnd})`;
  } else if (variant !== "solid") {
    if (isHorizontal) {
      border =
        "none"; /* Special handling below for dashed/dotted lines via border-top */
    } else {
      border = "none";
    }
    bg = "transparent";
  }

  const getBorderInfo = () => {
    if (variant === "solid" || gradientEnabled) return "";
    // For dashed/dotted, we usually use a border on one side
    if (isHorizontal)
      return `border-top: ${thickness}px ${variant} ${color}; height: 0;`;
    return `border-left: ${thickness}px ${variant} ${color}; width: 0;`;
  };

  const shadow = neonGlow
    ? `0 0 ${glowBlur}px ${glowColor}, 0 0 ${glowBlur * 2}px ${glowColor}`
    : "none";

  // 2. Formats
  let content = "";

  if (downloadFormat === "react") {
    content = `import React from 'react';

export default function Divider() {
  return (
    <div style={{
      display: 'flex', flexDirection: '${isHorizontal ? "row" : "column"}', alignItems: 'center', justifyContent: 'center',
      width: '${getSizeStyle().width}', height: '${getSizeStyle().height}', margin: '${gap}px', opacity: ${opacity},
      boxShadow: '${shadow}', position: 'relative'
    }}>
      ${showLabel && labelPosition === "left" ? `<span style={{padding: '${labelPadding}px', color: '${labelColor}', background: '${labelBackground}'}}>${labelText}</span>` : ""}
      
      <div style={{
         flex: 1, position: 'relative', borderRadius: ${borderRadius}, overflow: 'hidden',
         ${
           variant === "solid" || gradientEnabled
             ? `background: '${bg}', width: '100%', height: '100%'`
             : getBorderInfo()
                 .replace(/;/g, ",")
                 .replace(/:/g, ": ")
                 .replace(/-([a-z])/g, (m) => m[1].toUpperCase())
         }
      }}>
         ${
           animateBeam
             ? `<div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, ${beamColor}, transparent)',
            animation: 'beam ${beamSpeed}s linear infinite'
         }} />`
             : ""
         }
      </div>

      ${showLabel && labelPosition === "center" ? `<span style={{padding: '${labelPadding}px', color: '${labelColor}', background: '${labelBackground}'}}>${labelText}</span>` : ""}
      ${
        showLabel && labelPosition === "center"
          ? `<div style={{flex: 1, position: 'relative', borderRadius: ${borderRadius}, overflow: 'hidden', ${
              variant === "solid" || gradientEnabled
                ? `background: '${bg}', width: '100%', height: '100%'`
                : getBorderInfo()
                    .replace(/;/g, ",")
                    .replace(/:/g, ": ")
                    .replace(/-([a-z])/g, (m) => m[1].toUpperCase())
            }}>${animateBeam ? `<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, ${beamColor}, transparent)', animation: 'beam ${beamSpeed}s linear infinite'}} />` : ""}</div>`
          : ""
      }

      ${showLabel && labelPosition === "right" ? `<span style={{padding: '${labelPadding}px', color: '${labelColor}', background: '${labelBackground}'}}>${labelText}</span>` : ""}
      
      <style>{\`@keyframes beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }\`}</style>
    </div>
  );
}`;
  } else if (downloadFormat === "html") {
    content = `
<div class="divider">
   ${showLabel && labelPosition === "left" ? `<span class="label">${labelText}</span>` : ""}
   <div class="line">
      ${animateBeam ? `<div class="beam"></div>` : ""}
   </div>
   ${showLabel && labelPosition === "center" ? `<span class="label">${labelText}</span><div class="line">${animateBeam ? `<div class="beam"></div>` : ""}</div>` : ""}
   ${showLabel && labelPosition === "right" ? `<span class="label">${labelText}</span>` : ""}
</div>

<style>
.divider {
  display: flex; flex-direction: ${isHorizontal ? "row" : "column"}; align-items: center; justify-content: center;
  width: ${getSizeStyle().width}; height: ${getSizeStyle().height}; margin: ${gap}px; opacity: ${opacity};
  box-shadow: ${shadow};
}
.line {
  flex: 1; position: relative; border-radius: ${borderRadius}px; overflow: hidden;
  ${variant === "solid" || gradientEnabled ? `background: ${bg}; width: 100%; height: 100%;` : getBorderInfo()}
}
.label { padding: ${labelPadding}px; color: ${labelColor}; background: ${labelBackground}; font-size: 0.85em; white-space: nowrap; }
${
  animateBeam
    ? `
.beam {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, ${beamColor}, transparent);
  animation: beam ${beamSpeed}s linear infinite;
}
@keyframes beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
`
    : ""
}
</style>
`;
  } else if (downloadFormat === "tailwind") {
    const dim = isHorizontal
      ? `w-[${width}] h-[${thickness}px]`
      : `w-[${thickness}px] h-[${width}]`;
    const flexDir = isHorizontal ? "flex-row" : "flex-col";
    const bgClass = gradientEnabled
      ? `bg-gradient-to-${isHorizontal ? "r" : "b"} from-[${gradientStart}] to-[${gradientEnd}]`
      : variant === "solid"
        ? `bg-[${color}]`
        : "";
    const borderClass =
      variant !== "solid" && !gradientEnabled
        ? isHorizontal
          ? `border-t-[${thickness}px] border-${variant} border-[${color}]`
          : `border-l-[${thickness}px] border-${variant} border-[${color}]`
        : "";
    const shadowClass = neonGlow
      ? `shadow-[0_0_${glowBlur}px_${glowColor},0_0_${glowBlur * 2}px_${glowColor}]`
      : "";

    const lineEl = `
      <div class="flex-1 relative rounded-[${borderRadius}px] overflow-hidden ${bgClass} ${borderClass}">
        ${animateBeam ? `<div class="absolute inset-0 bg-gradient-to-r from-transparent via-[${beamColor}] to-transparent animate-[beam_${beamSpeed}s_linear_infinite]"></div>` : ""}
      </div>`;

    content = `
<div class="flex ${flexDir} items-center justify-center ${dim} opacity-[${opacity}] m-[${gap}px] ${shadowClass}">
  ${showLabel && labelPosition === "left" ? `<span class="px-[${labelPadding}px] text-[${labelColor}] bg-[${labelBackground}] text-sm">${labelText}</span>` : ""}
  ${lineEl}
  ${showLabel && labelPosition === "center" ? `<span class="px-[${labelPadding}px] text-[${labelColor}] bg-[${labelBackground}] text-sm">${labelText}</span>${lineEl}` : ""}
  ${showLabel && labelPosition === "right" ? `<span class="px-[${labelPadding}px] text-[${labelColor}] bg-[${labelBackground}] text-sm">${labelText}</span>` : ""}
</div>`;
  } else if (downloadFormat === "scss") {
    content = `.divider {
  display: flex; flex-direction: ${isHorizontal ? "row" : "column"}; align-items: center;
  width: ${getSizeStyle().width}; height: ${getSizeStyle().height}; margin: ${gap}px; opacity: ${opacity};
  box-shadow: ${shadow};
  .line { flex: 1; border-radius: ${borderRadius}px; overflow: hidden; background: ${bg}; ${getBorderInfo()} }
  .label { padding: ${labelPadding}px; color: ${labelColor}; background: ${labelBackground}; }
}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      { divider: { thickness: { value: thickness }, color: { value: color } } },
      null,
      2,
    );
  } else if (downloadFormat === "tailwind-config") {
    content = JSON.stringify(
      { theme: { extend: { colors: { divider: color } } } },
      null,
      2,
    );
  } else if (downloadFormat === "css-vars") {
    content = `:root { --div-thick: ${thickness}px; --div-col: ${color}; } .divider { width: ${width}; height: var(--div-thick); background: var(--div-col); }`;
  }

  return { content, filename };
}
