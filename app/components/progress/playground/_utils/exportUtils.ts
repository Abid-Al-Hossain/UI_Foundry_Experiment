import { ProgressState, STATUS_COLOR_MAP } from "../../types";
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
    color3,
    trackColor,
    trackOpacity,
    effect,
    stripeColor,
    stripeSpeed,
    stripesAnimated,
    glowBlur,
    glitchIntensity,
    liquidViscosity,
    // showLabel, labelPosition, labelFormat, customLabel, hasParticles, particleType - Update legacy usage if needed
    hasParticles,
    particleType,
    downloadFormat,
    downloadName,
    // New properties
    direction,
    status,
    showStatusIcon,
    strokeLinecap,
    animationDuration,
    disableAnimation,
    successPercent,
    ariaLabel,
    ariaDescribedBy,
    sizePreset,
    timerDuration,
  } = params;

  // Calculate values
  const percent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100),
  );
  const bufferPercent = Math.min(
    100,
    Math.max(0, ((bufferValue - min) / (max - min)) * 100),
  );
  const isVertical = orientation === "vertical";
  const isRtl = direction === "rtl";

  // Status-aware color
  const primaryColor = status !== "normal" ? STATUS_COLOR_MAP[status] : color1;

  // Generate Code based on format
  if (downloadFormat === "react") {
    return generateReactCode(
      params,
      percent,
      bufferPercent,
      primaryColor,
      isVertical,
      isRtl,
    );
  } else if (downloadFormat === "html") {
    return generateHtmlCode(
      params,
      percent,
      bufferPercent,
      primaryColor,
      isVertical,
      isRtl,
    );
  } else if (downloadFormat === "tailwind") {
    return generateTailwindCode(params, percent, primaryColor, isVertical);
  }

  return {
    content: "// Format not supported",
    filename: `${downloadName}.txt`,
  };
}

function generateReactCode(
  params: ProgressExportParams,
  percent: number,
  bufferPercent: number,
  primaryColor: string,
  isVertical: boolean,
  isRtl: boolean,
) {
  const {
    effect,
    mode,
    color2,
    colorMode,
    glowBlur,
    stripeColor,
    stripeSpeed,
    stripesAnimated,
    disableAnimation,
    animationDuration,
    ariaLabel,
    ariaDescribedBy,
    trackColor,
    trackOpacity,
    successPercent,
    showStatusIcon,
    status,
    labels,
    // New Props
    enable3D,
    rotateX,
    rotateY,
    rotateZ,
    depth,
    hasParticles,
    particleType,
  } = params;

  // --- 3D Support Check ---
  if (enable3D) {
    return generateReact3DCode(params);
  }

  const barRadius =
    params.shape === "pill"
      ? 9999
      : params.shape === "square"
        ? 0
        : params.radius;

  const gradientDir = isVertical ? "to top" : isRtl ? "to left" : "to right";
  // Status-aware color already passed as primaryColor, but we need raw color1 for some effects if needed

  let backgroundStyle = primaryColor;
  if (colorMode === "gradient") {
    backgroundStyle = `linear-gradient(${gradientDir}, ${primaryColor}, ${color2})`;
  } else if (colorMode === "duotone") {
    backgroundStyle = `linear-gradient(${gradientDir}, ${primaryColor}, ${params.color3}, ${color2})`;
  }

  // Effect Styles
  let containerStyles = "";
  if (effect === "glow") {
    containerStyles += `boxShadow: '0 0 ${glowBlur}px ${primaryColor}',`;
  } else if (effect === "neon") {
    containerStyles += `boxShadow: '0 0 5px ${primaryColor}, 0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}',`;
  } else if (effect === "glass") {
    containerStyles += `background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)',`;
  }

  const content = `import React from 'react';
${!disableAnimation || hasParticles ? "import { motion } from 'framer-motion';" : ""}

interface ProgressBarProps {
  value?: number;
  max?: number;
  min?: number;
}

export default function ProgressBar({ value = ${params.value}, max = ${params.max}, min = ${params.min} }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  return (
    <div
      role="progressbar"
      aria-valuenow={${mode === "indeterminate" ? "undefined" : "value"}}
      aria-valuemin={min}
      aria-valuemax={max}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
      ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ""}
      style={{
        width: '${isVertical ? params.thickness : params.width}px',
        height: '${isVertical ? params.width : params.thickness}px',
        borderRadius: '${barRadius}px',
        position: 'relative',
        overflow: '${params.effect === "liquid" || hasParticles ? "visible" : "hidden"}',
        direction: '${isRtl ? "rtl" : "ltr"}',
        ${containerStyles}
      }}
    >
      {/* Track */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '${trackColor}',
        opacity: ${trackOpacity},
        borderRadius: '${barRadius}px',
      }} />
      
      ${
        mode === "buffer"
          ? `{/* Buffer Layer */}
      <div style={{
        position: 'absolute', ${isVertical ? "bottom" : "left"}: 0,
        ${isVertical ? "width" : "height"}: '100%',
        ${isVertical ? "height" : "width"}: '${bufferPercent}%',
        background: '${primaryColor}',
        opacity: 0.3,
        borderRadius: '${barRadius}px',
      }} />`
          : ""
      }
      
      {/* Fill Bar */}
      ${
        disableAnimation
          ? `<div`
          : `<motion.div
        initial={false}
        animate={{ ${isVertical ? "height" : "width"}: \`\${percent}%\` }}
        transition={{ duration: ${animationDuration}, ease: "easeOut" }}`
      }
        style={{
          position: 'absolute',
          ${isVertical ? "bottom" : isRtl ? "right" : "left"}: 0,
          ${isVertical ? "width" : "height"}: '100%',
          ${!disableAnimation ? "" : `${isVertical ? "height" : "width"}: \`\${percent}%\`,`}
          background: '${backgroundStyle}',
          borderRadius: '${barRadius}px',
          zIndex: 10,
        }}
      ${disableAnimation ? "/>" : ">"}
        ${
          effect === "stripes" && stripesAnimated
            ? `{/* Stripes Animation */}
        <div className="animate-stripes" style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(45deg, ${stripeColor} 25%, transparent 25%, transparent 50%, ${stripeColor} 50%, ${stripeColor} 75%, transparent 75%, transparent)',
            backgroundSize: '30px 30px',
            borderRadius: '${barRadius}px',
        }} />`
            : ""
        }
      ${!disableAnimation ? "</motion.div>" : ""}

      ${
        hasParticles
          ? `{/* Particles */}
      <div style={{
        position: 'absolute',
        ${isVertical ? "bottom" : isRtl ? "right" : "left"}: \`\${percent}%\`,
        width: 0, height: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}>
        {[...Array(24)].map((_, i) => {
          const baseDelay = (i % 5) * 0.1;
          const randomX = (i % 2 === 0 ? 1 : -1) * (Math.random() * 50 + 10);
          const randomY = -(Math.random() * 80 + 20);
          const duration = 0.8 + Math.random() * 0.6;
          const delay = Math.random() * 0.5;
          
          let particleClass = 'particle-sparks';
          let particleStyle = {};
          
          if ('${particleType}' === 'fire') {
            particleClass = 'particle-fire';
            particleStyle = { background: ["#ff9f43", "#ff6b6b", "#feca57", "#ff9ff3"][i % 4], width: 4+Math.random()*4, height: 4+Math.random()*4, borderRadius: '50%', boxShadow: '0 0 4px rgba(255,100,0,0.6)' };
          } else if ('${particleType}' === 'confetti') {
             particleClass = 'particle-confetti';
             particleStyle = { background: ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94"][i % 5], width: 6, height: 10, borderRadius: i%2===0 ? '0%' : '50%' };
          } else {
             particleStyle = { background: '#fff', width: 3, height: 3, borderRadius: '50%', boxShadow: '0 0 6px #fff, 0 0 12px #ffff00' };
          }

          return (
            <div key={i} className={particleClass} style={{
               ...particleStyle,
               position: 'absolute', top: 0, left: 0,
               '--tx': \`\${randomX}px\`,
               '--ty': \`\${randomY}px\`,
               '--r': \`\${Math.random() * 360}deg\`,
               '--dur': \`\${duration}s\`,
               '--del': \`\${delay}s\`,
               opacity: 0,
            } as React.CSSProperties} />
          );
        })}
      </div>`
          : ""
      }
      
      {/* Styles */}
      <style jsx global>{\`
        ${
          effect === "stripes"
            ? `
        @keyframes stripes { from { background-position: 0 0; } to { background-position: 60px 0; } }
        .animate-stripes { animation: stripes ${2 / (stripeSpeed || 1)}s linear infinite; }`
            : ""
        }
        ${
          hasParticles
            ? `
        .particle-fire { animation: particle-fire var(--dur) ease-out infinite; animation-delay: var(--del); opacity: 0; }
        .particle-confetti { animation: particle-confetti calc(var(--dur) * 1.5) ease-out infinite; animation-delay: var(--del); opacity: 0; }
        .particle-sparks { animation: particle-sparks calc(var(--dur) * 0.6) ease-out infinite; animation-delay: var(--del); opacity: 0; }
        @keyframes particle-fire { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }
        @keyframes particle-confetti { 0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0.5); } }
        @keyframes particle-sparks { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }`
            : ""
        }
      \`}</style>

       ${
         params.labels && params.labels.length > 0
           ? `{/* Labels */}
       ${params.labels
         .map((label: any) => {
           // Helper to get text content based on label format
           let textContent = "";
           if (label.type === "text") {
             if (label.format === "percent")
               textContent = `\`\${Math.round(percent)}%\``;
             else if (label.format === "fraction")
               textContent = `\`\${Math.round(value)}/\${max}\``;
             else if (label.format === "value") textContent = "value";
             else textContent = `"${label.customText}"`;
           }

           const isCenter =
             label.position === "center" || label.position === "inside";
           const posStyles = [];
           if (isCenter)
             posStyles.push(
               "inset: 0",
               "display: 'flex', alignItems: 'center', justifyContent: 'center'",
             );
           if (label.position === "top-center")
             posStyles.push(
               "top: '-24px', left: 0, right: 0, margin: 'auto', textAlign: 'center'",
             );
           if (label.position.includes("top")) posStyles.push("top: '-24px'");
           if (label.position.includes("bottom"))
             posStyles.push("bottom: '-24px'");
           if (label.position.includes("left")) posStyles.push("left: 0");
           if (label.position.includes("right")) posStyles.push("right: 0");

           return `<div style={{
        position: 'absolute',
        ${posStyles.join(",\n        ")},
        fontSize: '${label.size || 14}px',
        fontWeight: 500,
        zIndex: 20,
        color: ${isCenter ? "color1 === '#fff' ? '#000' : '#fff'" : "'var(--text)'"} 
      }}>
        ${
          label.type === "icon"
            ? `{/* Icon: ${label.iconName} */}`
            : label.type === "animated"
              ? `{/* Animated: ${label.animatedIndicator} */}`
              : `{${textContent}}`
        }
      </div>`;
         })
         .join("\n      ")}`
           : ""
       }
    </div>
  );
}
`;
  return { content, filename: `${params.downloadName}.tsx` };
}

function generateReact3DCode(params: ProgressExportParams) {
  const content = `import React from 'react';

interface ProgressBarProps {
  value?: number;
  max?: number;
  min?: number;
}

export default function ThreeDProgressBar({ value = ${params.value}, max = ${params.max}, min = ${params.min} }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const w = ${params.orientation === "vertical" ? params.thickness : params.width};
  const h = ${params.orientation === "vertical" ? params.width : params.thickness};
  const depth = ${params.depth};
  const fillSize = (percent / 100) * ${params.orientation === "vertical" ? "h" : "w"};
  
  return (
    <div style={{ width: w, height: h, perspective: '1000px', position: 'relative' }}>
      <div style={{
        width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(${params.rotateX}deg) rotateY(${params.rotateY}deg) rotateZ(${params.rotateZ}deg)',
        transition: 'transform 0.1s linear'
      }}>
        {/* Track */}
        <Cuboid width={w} height={h} depth={depth} color="${params.trackColor}" opacity={0.3} />
        
        {/* Fill */}
        <div style={{
           position: 'absolute', top: 0, left: 0,
           width: ${params.orientation === "vertical" ? "w" : "`\${percent}%`"}, 
           height: ${params.orientation === "vertical" ? "`\${percent}%`" : "h"},
           transformStyle: 'preserve-3d',
           transition: 'width 0.3s, height 0.3s'
        }}>
           <Cuboid 
             width={${params.orientation === "vertical" ? "w" : "fillSize"}} 
             height={${params.orientation === "vertical" ? "fillSize" : "h"}} 
             depth={depth} 
             color="${params.color1}" 
             opacity={1} 
           />
        </div>
      </div>
    </div>
  );
}

function Cuboid({ width, height, depth, color, opacity }: any) {
  const halfDepth = depth / 2;
  const faceStyle: React.CSSProperties = {
     position: 'absolute', background: color, opacity: opacity,
     border: '1px solid rgba(255,255,255,0.1)', backfaceVisibility: 'visible' 
  };
  return (
    <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
      <div style={{ ...faceStyle, width: '100%', height: '100%', transform: \`translateZ(\${halfDepth}px)\` }} />
      <div style={{ ...faceStyle, width: '100%', height: '100%', transform: \`translateZ(-\${halfDepth}px) rotateY(180deg)\` }} />
      <div style={{ ...faceStyle, width: '100%', height: depth, transform: \`rotateX(90deg) translateZ(\${halfDepth}px)\`, top: -halfDepth }} />
      <div style={{ ...faceStyle, width: '100%', height: depth, transform: \`rotateX(-90deg) translateZ(\${height - halfDepth}px)\`, top: 'auto', bottom: -halfDepth }} />
      <div style={{ ...faceStyle, width: depth, height: '100%', transform: \`rotateY(-90deg) translateZ(\${halfDepth}px)\`, left: -halfDepth }} />
      <div style={{ ...faceStyle, width: depth, height: '100%', transform: \`rotateY(90deg) translateZ(\${width - halfDepth}px)\`, left: 'auto', right: -halfDepth }} />
    </div>
  );
}`;
  return { content, filename: `${params.downloadName}.tsx` };
}

function generateHtmlCode(
  params: ProgressExportParams,
  percent: number,
  bufferPercent: number,
  primaryColor: string,
  isVertical: boolean,
  isRtl: boolean,
) {
  const warnings = [];
  if (params.enable3D)
    warnings.push("3D Mode is not supported in HTML export (React only).");
  if (params.hasParticles)
    warnings.push(
      "Particle effects are not supported in HTML export (React only).",
    );

  const warningComment =
    warnings.length > 0
      ? `<!-- \nWARNING:\n${warnings.map((w) => ` - ${w}`).join("\n")}\n-->\n`
      : "";

  const barRadius =
    params.shape === "pill"
      ? 9999
      : params.shape === "square"
        ? 0
        : params.radius;

  // Effect CSS
  let effectCss = "";
  if (params.effect === "glow")
    effectCss = `box-shadow: 0 0 ${params.glowBlur}px ${primaryColor};`;
  if (params.effect === "neon")
    effectCss = `box-shadow: 0 0 5px ${primaryColor}, 0 0 10px ${primaryColor}, 0 0 20px ${primaryColor};`;
  if (params.effect === "glass")
    effectCss = `background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);`;

  const content = `${warningComment}<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .progress-container {
      width: ${isVertical ? params.thickness : params.width}px;
      height: ${isVertical ? params.width : params.thickness}px;
      border-radius: ${barRadius}px;
      position: relative;
      overflow: hidden;
      direction: ${isRtl ? "rtl" : "ltr"};
      ${effectCss}
    }
    .progress-track {
      position: absolute; inset: 0;
      background: ${params.trackColor};
      opacity: ${params.trackOpacity};
      border-radius: ${barRadius}px;
    }
    .progress-fill {
      position: absolute;
      ${isVertical ? "bottom" : isRtl ? "right" : "left"}: 0;
      ${isVertical ? "width" : "height"}: 100%;
      ${isVertical ? "height" : "width"}: ${percent}%;
      background: ${params.colorMode === "gradient" ? `linear-gradient(${isVertical ? "to top" : "to right"}, ${primaryColor}, ${params.color2})` : primaryColor};
      border-radius: ${barRadius}px;
      transition: ${isVertical ? "height" : "width"} ${params.animationDuration}s ease;
    }
  </style>
</head>
<body>
  <div class="progress-container" role="progressbar" aria-valuenow="${params.value}">
    <div class="progress-track"></div>
    <div class="progress-fill"></div>
    ${
      params.labels &&
      params.labels
        .map((label: any) => {
          let text = "";
          if (label.type === "text") {
            if (label.format === "percent") text = "${Math.round(percent)}%";
            else if (label.format === "fraction")
              text = "${params.value}/${params.max}";
            else if (label.format === "value") text = "${params.value}";
            else text = label.customText;
          } else {
            text = "(Icon/Anim)";
          }

          let styles = "position:absolute; font-size:12px; font-weight:bold;";
          if (label.position === "center" || label.position === "inside")
            styles +=
              " inset:0; display:flex; align-items:center; justify-content:center;";
          if (label.position.includes("top")) styles += " top:-24px;";
          if (label.position.includes("bottom")) styles += " bottom:-24px;";
          if (label.position.includes("left")) styles += " left:0;";
          if (label.position.includes("right")) styles += " right:0;";

          return `<div style="${styles}">${text}</div>`;
        })
        .join("\n    ")
    }
  </div>
</body>
</html>`;

  return { content, filename: `${params.downloadName}.html` };
}

function generateTailwindCode(
  params: ProgressExportParams,
  percent: number,
  primaryColor: string,
  isVertical: boolean,
) {
  const warnings = [];
  if (params.enable3D)
    warnings.push("3D Mode is not supported in basic Tailwind export.");
  if (params.hasParticles)
    warnings.push(
      "Particle effects are not supported in basic Tailwind export.",
    );

  const warningComment =
    warnings.length > 0
      ? `<!-- \nWARNING:\n${warnings.map((w) => ` - ${w}`).join("\n")}\n-->\n`
      : "";

  const barRadius =
    params.shape === "pill"
      ? "full"
      : params.shape === "square"
        ? "none"
        : `[${params.radius}px]`;

  let layoutClasses = isVertical
    ? `w-[${params.thickness}px] h-[${params.width}px]`
    : `w-[${params.width}px] h-[${params.thickness}px]`;
  let effectClasses = "";
  if (params.effect === "glow")
    effectClasses = `shadow-[0_0_${params.glowBlur}px_${primaryColor.replace("#", "")}]`; // naive hex handling
  if (params.effect === "glass")
    effectClasses = "backdrop-blur-md bg-white/10 border border-white/20";

  const content = `${warningComment}<!-- Tailwind CSS Progress Bar -->
<div 
  class="${layoutClasses} bg-[${params.trackColor}]/${Math.round(params.trackOpacity * 100)} rounded-${barRadius} relative overflow-hidden ${effectClasses}"
  role="progressbar"
>
  <div 
    class="${isVertical ? "w-full" : "h-full"} bg-[${primaryColor}] rounded-${barRadius} transition-all duration-300"
    style="${isVertical ? "height" : "width"}: ${percent}%"
  ></div>
  ${
    params.labels &&
    params.labels
      .map((label: any) => {
        let text = "";
        if (label.type === "text") {
          if (label.format === "percent") text = "${Math.round(percent)}%";
          else if (label.format === "fraction")
            text = "${params.value}/${params.max}";
          else if (label.format === "value") text = "${params.value}";
          else text = label.customText;
        } else {
          text = "(Icon/Anim)";
        }

        let posClass = "";
        if (label.position === "center" || label.position === "inside")
          posClass = "inset-0 flex items-center justify-center";
        else {
          if (label.position.includes("top")) posClass += "-top-6 ";
          else if (label.position.includes("bottom")) posClass += "-bottom-6 ";
          else posClass += "top-1/2 -translate-y-1/2 "; // Default vertical center for side labels

          if (label.position.includes("left")) posClass += "left-0 ";
          else if (label.position.includes("right")) posClass += "right-0 ";
          else posClass += "left-1/2 -translate-x-1/2 "; // Center align
        }

        return `<span class="absolute ${posClass} text-xs font-bold">${text}</span>`;
      })
      .join("\n  ")
  }
</div>`;

  return { content, filename: `${params.downloadName}.html` };
}
