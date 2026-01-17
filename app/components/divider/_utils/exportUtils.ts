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

  // Basics
  orientation: DividerOrientation;
  width: string;
  thickness: number;
  gap: number;
  color: string;
  variant: DividerVariant;
  borderRadius: number;

  // Content
  showLabel: boolean;
  labelText: string;
  labelPosition: DividerContentPosition;
  labelBackground: string;
  labelColor: string;
  labelPadding: number;

  // FX
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
    shimmerEnabled,
    shimmerSpeed,
    neonGlow,
    glowColor,
    glowBlur,
  } = params;

  let content = "";
  const ext = downloadFormat === "react" ? "jsx" : "html";
  const filename = `${downloadName}.${ext}`;
  const isHorizontal = orientation === "horizontal";

  // Shared CSS
  const containerCss = `
    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    align-items: center;
    justify-content: center;
    width: ${isHorizontal ? width : `${thickness}px`};
    height: ${isHorizontal ? `${thickness}px` : width};
    margin: ${gap}px;
    opacity: ${opacity};
    position: relative;
    ${
      neonGlow
        ? `box-shadow: 0 0 ${glowBlur}px ${glowColor}, 0 0 ${
            glowBlur * 2
          }px ${glowColor};`
        : ""
    }
  `;

  const lineBaseCss = `
    flex: 1;
    ${
      isHorizontal ? "height: 100%; width: 100%;" : "width: 100%; height: 100%;"
    }
    border-radius: ${borderRadius}px;
    position: relative;
    overflow: hidden;
  `;

  // Variant Logic
  let lineBackground = color;
  let lineBorder = "none";
  if (gradientEnabled) {
    lineBackground = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
  } else if (variant !== "solid") {
    lineBackground = "transparent";
    lineBorder = `${thickness}px ${variant} ${color}`;
  }

  // NOTE: For dashed/dotted borders, we typically apply border-top (horizontal) or border-left (vertical)
  // But to support "flex: 1" with label in middle, we might need real elements.
  // Simplifying for export: Use pseudo-elements or divs.

  const lineStyle = `
    ${lineBaseCss}
    background: ${lineBackground};
    ${
      variant !== "solid" && !gradientEnabled
        ? isHorizontal
          ? `border-top: ${lineBorder}; height: 0;`
          : `border-left: ${lineBorder}; width: 0;`
        : ""
    }
  `;

  const labelStyle = `
    padding: ${isHorizontal ? `0 ${labelPadding}px` : `${labelPadding}px 0`};
    color: ${labelColor};
    background: ${labelBackground};
    font-size: 0.85em; font-weight: 500; font-family: sans-serif;
    white-space: nowrap; z-index: 1;
  `;

  // Beam Animation CSS
  const beamKeyframes = `
    @keyframes beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
    @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  `;

  const beamEl = animateBeam
    ? `
    <div class="uf-beam"></div>
    <style>
    .uf-beam {
        position: absolute; inset: 0; 
        background: linear-gradient(90deg, transparent, ${beamColor}, transparent);
        opacity: 0.6;
        animation: beam ${beamSpeed}s linear infinite;
    }
    </style>
  `
    : "";

  // HTML Export
  if (downloadFormat === "html") {
    content = `
<div class="uf-divider">
    ${
      showLabel && labelPosition === "left"
        ? `<span class="uf-label">${labelText}</span>`
        : ""
    }
    <div class="uf-line">${beamEl}</div>
    ${
      showLabel && labelPosition === "center"
        ? `<span class="uf-label">${labelText}</span><div class="uf-line">${beamEl}</div>`
        : ""
    }
    ${
      showLabel && labelPosition === "right"
        ? `<span class="uf-label">${labelText}</span>`
        : ""
    }
</div>

<style>
.uf-divider { ${containerCss.replace(/\n/g, "").trim()} }
.uf-line { ${lineStyle.replace(/\n/g, "").trim()} }
.uf-label { ${labelStyle.replace(/\n/g, "").trim()} }
${beamKeyframes}
</style>
      `;
  }

  // React Export
  if (downloadFormat === "react") {
    content = `
import React from 'react';
/* 
  Make sure to add these keyframes to your global CSS:
  ${beamKeyframes.replace(/\n/g, "")}
*/

export default function Divider() {
    const containerStyle = {${containerCss
      .replace(/;/g, ",")
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}};
    const lineStyle = {${lineStyle
      .replace(/;/g, ",")
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}};
    const labelStyle = {${labelStyle
      .replace(/;/g, ",")
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}};

    return (
        <div style={containerStyle}>
             {/* Left/Start Line */}
             <div style={lineStyle}>
                ${
                  animateBeam
                    ? `<div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, transparent, ${beamColor}, transparent)', animation: 'beam ${beamSpeed}s linear infinite'}} />`
                    : ""
                }
             </div>
             
             {/* Label */}
             ${showLabel ? `<span style={labelStyle}>${labelText}</span>` : ""}

             {/* Right/End Line (if centered) */}
             ${
               showLabel && labelPosition === "center"
                 ? `
             <div style={lineStyle}>
                 ${
                   animateBeam
                     ? `<div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, transparent, ${beamColor}, transparent)', animation: 'beam ${beamSpeed}s linear infinite'}} />`
                     : ""
                 }
             </div>`
                 : ""
             }
        </div>
    );
}
      `;
  }

  return { content, filename };
}
