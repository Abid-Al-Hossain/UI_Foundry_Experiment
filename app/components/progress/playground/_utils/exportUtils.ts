import { ProgressState } from "../../types";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

type ProgressExportParams = ProgressState & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildProgressExport(params: ProgressExportParams) {
  const {
    value,
    min,
    max,
    bufferValue,
    mode,
    orientation,
    stepCount,
    width,
    thickness,
    radius,
    shape,
    colorMode,
    color1,
    color2,
    trackColor,
    trackOpacity,
    effect,
    stripeColor,
    stripeSpeed,
    glowBlur,
    glitchIntensity,
    liquidViscosity,
    showLabel,
    labelPosition,
    labelFormat,
    customLabel,
    hasParticles,
    particleType,
    downloadFormat,
    downloadName,
  } = params;

  let content = "";
  const filename = `${downloadName}.${downloadFormat === "react" ? "tsx" : "html"}`;

  // Helper: Calculate Percentage
  const percent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100),
  );
  const bufferPercent = Math.min(
    100,
    Math.max(0, ((bufferValue - min) / (max - min)) * 100),
  );

  // Helper: Styles
  const isVertical = orientation === "vertical";
  const mainStyle = {
    width: isVertical ? `${thickness}px` : `${width}px`,
    height: isVertical ? `${width}px` : `${thickness}px`,
    borderRadius: shape === "pill" ? "9999px" : `${radius}px`,
    background: trackColor,
    opacity: 1,
  };

  const barBackground =
    colorMode === "gradient"
      ? `linear-gradient(${isVertical ? "to top" : "to right"}, ${color1}, ${color2})`
      : color1;

  // Generate Code based on format
  if (downloadFormat === "react") {
    return generateReactCode(params, percent, bufferPercent);
  } else if (downloadFormat === "html") {
    return generateHtmlCode(params, percent, bufferPercent);
  } else if (downloadFormat === "tailwind") {
    return generateTailwindCode(params, percent);
  }

  return { content: "// Format not supported", filename };
}

function generateReactCode(
  params: ProgressExportParams,
  percent: number,
  bufferPercent: number,
) {
  const {
    effect,
    mode,
    orientation,
    color1,
    glowBlur,
    stripeColor,
    stripeSpeed,
  } = params;
  const isVertical = orientation === "vertical";

  const content = `import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  return (
    <div style={{
      width: '${isVertical ? params.thickness : params.width}px',
      height: '${isVertical ? params.width : params.thickness}px',
      background: '${params.trackColor}',
      borderRadius: '${params.shape === "pill" ? 9999 : params.radius}px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Buffer Layer */}
      ${
        mode === "buffer"
          ? `<div style={{
         position: 'absolute', ${isVertical ? "bottom" : "left"}: 0,
         ${isVertical ? "width" : "height"}: '100%',
         ${isVertical ? "height" : "width"}: '${bufferPercent}%',
         background: 'rgba(255,255,255,0.3)',
         transition: 'all 0.3s ease'
      }} />`
          : ""
      }

      {/* Main Bar */}
      <motion.div
        initial={{ ${isVertical ? "height" : "width"}: 0 }}
        animate={{ ${isVertical ? "height" : "width"}: '${percent}%' }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          height: '100%',
          background: '${params.colorMode === "gradient" ? `linear-gradient(to right, ${params.color1}, ${params.color2})` : params.color1}',
          position: 'relative',
          ${effect === "glow" ? `boxShadow: '0 0 ${glowBlur}px ${color1}'` : ""}
        }}
      >
        {/* Effects */}
        ${
          effect === "stripes"
            ? `<div style={{
           position: 'absolute', inset: 0,
           backgroundImage: 'linear-gradient(45deg, ${stripeColor} 25%, transparent 25%, transparent 50%, ${stripeColor} 50%, ${stripeColor} 75%, transparent 75%, transparent)',
           backgroundSize: '20px 20px',
           animation: 'progress-stripes ${2 / (stripeSpeed || 1)}s linear infinite'
        }} />`
            : ""
        }
        
        ${
          effect === "liquid"
            ? `<div style={{
           position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)',
           width: 20, height: 20, background: 'inherit', borderRadius: '50%', filter: 'blur(2px)'
        }} />`
            : ""
        }
      </motion.div>
      
      <style>{\`
        @keyframes progress-stripes { from { background-position: 0 0; } to { background-position: 40px 0; } }
      \`}</style>
    </div>
  );
}`;
  return { content, filename: `${params.downloadName}.tsx` };
}

function generateHtmlCode(
  params: ProgressExportParams,
  percent: number,
  bufferPercent: number,
) {
  const content = `
<div class="progress-bar">
  <div class="bar" style="width: ${percent}%"></div>
</div>
<style>
.progress-bar { width: ${params.width}px; height: ${params.thickness}px; background: ${params.trackColor}; border-radius: ${params.radius}px; overflow: hidden; }
.bar { height: 100%; background: ${params.color1}; transition: width 0.3s ease; }
</style>`;
  return { content, filename: `${params.downloadName}.html` };
}

function generateTailwindCode(params: ProgressExportParams, percent: number) {
  const content = `<div class="w-[${params.width}px] h-[${params.thickness}px] bg-[${params.trackColor}] rounded-[${params.radius}px] overflow-hidden">
  <div class="h-full bg-[${params.color1}]" style="width: ${percent}%"></div>
</div>`;
  return { content, filename: `${params.downloadName}.html` };
}
