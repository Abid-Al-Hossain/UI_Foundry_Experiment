import { IconState } from "../types";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

const generateCssVars = (state: IconState) => {
  const {
    size,
    strokeWidth,
    color,
    fillColor,
    fillOpacity,
    opacity,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    shape,
    containerSize,
    containerPadding,
    containerColor,
    borderWidth,
    borderColor,
    borderStyle,
    borderRadius,
    glassBlur,
    shadowEnabled,
    shadowColor,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    glowEnabled,
    glowColor,
    glowBlur,
    use3D,
    rotateX,
    rotateY,
    rotateZ,
    perspective,
  } = state;
  return {
    "--icon-size": `${size}px`,
    "--icon-stroke": `${strokeWidth}px`,
    "--icon-color": color,
    "--icon-fill": fillColor,
    "--icon-fill-opacity": fillOpacity,
    "--icon-opacity": opacity,
    "--icon-container-size": shape === "none" ? "auto" : `${containerSize}px`,
    "--icon-padding": shape === "none" ? "0" : `${containerPadding}px`,
    "--icon-bg": shape === "none" ? "transparent" : containerColor,
    "--icon-border": `${borderWidth}px ${borderStyle} ${borderColor}`,
    "--icon-radius": shape === "circle" ? "50%" : `${borderRadius}px`,
    "--icon-shadow": shadowEnabled
      ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${glowEnabled ? `, 0 0 ${glowBlur}px ${glowColor}` : ""}`
      : glowEnabled
        ? `0 0 ${glowBlur}px ${glowColor}`
        : "none",
    "--icon-backdrop": glassBlur > 0 ? `blur(${glassBlur}px)` : "none",
    "--icon-transform": use3D
      ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "none",
    ...(gradientEnabled
      ? {
          "--icon-grad-start": gradientStart,
          "--icon-grad-end": gradientEnd,
          "--icon-grad-angle": `${gradientAngle}deg`,
        }
      : {}),
  };
};

export const buildIconExportPayload = ({
  downloadFormat,
  downloadName,
  ...state
}: IconState & { downloadFormat: DownloadFormat; downloadName: string }) => {
  const { iconName, animationType, hoverEffect, animationDuration } = state;
  let content = "";
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

  if (downloadFormat === "react") {
    content = `import React from "react";
import { ${iconName} } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomIcon() {
  const variants = {
    initial: { scale: 1, rotate: 0, x: 0, y: 0, filter: "none" },
    hover: {
      ${hoverEffect === "scale" ? "scale: 1.2" : hoverEffect === "rotate" ? "rotate: 180" : hoverEffect === "shake" ? "x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 }" : hoverEffect === "glow" ? 'filter: "drop-shadow(0 0 8px var(--icon-color))"' : ""}
    },
    animate: {
      ${animationType === "spin" ? "rotate: 360" : animationType === "pulse" ? "scale: [1, 1.1, 1]" : animationType === "bounce" ? "y: [0, -10, 0]" : animationType === "wiggle" ? "rotate: [0, -10, 10, -10, 10, 0]" : ""}
    }
  };

  const style = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "var(--icon-container-size)", height: "var(--icon-container-size)",
    padding: "var(--icon-padding)", background: "var(--icon-bg)",
    border: "var(--icon-border)", borderRadius: "var(--icon-radius)",
    boxShadow: "var(--icon-shadow)", backdropFilter: "var(--icon-backdrop)",
    transform: "var(--icon-transform)", color: "${state.gradientEnabled ? "url(#grad)" : "var(--icon-color)"}",
    opacity: "var(--icon-opacity)", overflow: "hidden"
  };

  const vars = ${JSON.stringify(generateCssVars(state), null, 4).replace(/"/g, "'").replace(/,/g, ";").replace(/}/, "  }")};

  return (
    <motion.div style={{...style, ...vars}} initial="initial" whileHover="hover" animate="animate" variants={variants} transition={{ duration: ${animationDuration}, repeat: Infinity, ease: "linear" }}>
      ${state.gradientEnabled ? `<svg width="0" height="0" style={{position:'absolute'}}><defs><linearGradient id="grad" gradientTransform="rotate(${state.gradientAngle})"><stop offset="0%" stopColor="${state.gradientStart}" /><stop offset="100%" stopColor="${state.gradientEnd}" /></linearGradient></defs></svg>` : ""}
      <${iconName} size={${state.size}} strokeWidth={${state.strokeWidth}} fill="${state.fillColor}" fillOpacity={${state.fillOpacity}} />
    </motion.div>
  );
}`;
  } else if (downloadFormat === "html") {
    const vars = generateCssVars(state);
    const cssVarsString = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n      ");
    content = `
<div class="icon-wrapper">
  <svg class="lucide lucide-${iconName.toLowerCase()}" ...><!-- Lucide SVG --></svg>
</div>

<style>
  .icon-wrapper {
    display: flex; align-items: center; justify-content: center;
    ${cssVarsString}
    width: var(--icon-container-size); height: var(--icon-container-size);
    padding: var(--icon-padding); background: var(--icon-bg);
    border: var(--icon-border); border-radius: var(--icon-radius);
    box-shadow: var(--icon-shadow); backdrop-filter: var(--icon-backdrop);
    transform: var(--icon-transform); color: var(--icon-color);
    transition: all 0.3s ease;
  }
  
  /* Hover Effects */
  .icon-wrapper:hover {
     ${state.hoverEffect === "scale" ? "transform: scale(1.2);" : ""}
     ${state.hoverEffect === "rotate" ? "transform: rotate(180deg);" : ""}
     ${state.hoverEffect === "glow" ? "filter: drop-shadow(0 0 8px var(--icon-color));" : ""}
     ${state.hoverEffect === "shake" ? "animation: shake 0.4s ease-in-out;" : ""}
  }
  
  /* Constant Animations */
  ${animationType === "spin" ? "@keyframes spin { 100% { transform: rotate(360deg); } } .icon-wrapper svg { animation: spin 2s linear infinite; }" : ""}
  ${animationType === "pulse" ? "@keyframes pulse { 50% { transform: scale(1.1); } } .icon-wrapper svg { animation: pulse 2s infinite; }" : ""}
  ${animationType === "bounce" ? "@keyframes bounce { 50% { transform: translateY(-10px); } } .icon-wrapper svg { animation: bounce 2s infinite; }" : ""}
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
</style>`;
  } else if (downloadFormat === "tailwind") {
    // Advanced Tailwind with Arbitrary Values for animations
    const animClass =
      animationType === "spin"
        ? "animate-spin"
        : animationType === "pulse"
          ? "animate-pulse"
          : animationType === "bounce"
            ? "animate-bounce"
            : "";
    const hoverClass =
      hoverEffect === "scale"
        ? "hover:scale-125 transition-transform"
        : hoverEffect === "rotate"
          ? "hover:rotate-180 transition-transform"
          : "";

    content = `<div class="inline-flex items-center justify-center p-[${state.containerPadding}px] bg-[${state.containerColor}] rounded-[${state.borderRadius}px] border-[${state.borderWidth}px] border-[${state.borderColor}] border-[${state.borderStyle}] ${state.shadowEnabled ? `shadow-[${state.shadowX}px_${state.shadowY}px_${state.shadowBlur}px_${state.shadowSpread}px_${state.shadowColor}]` : ""} ${hoverClass}">
  <svg class="w-[${state.size}px] h-[${state.size}px] text-[${state.color}] ${animClass}" ...></svg>
</div>`;
  } else if (downloadFormat === "scss") {
    content = `.icon-wrapper {
  display: flex; align-items: center; justify-content: center;
  width: ${state.containerSize}px; height: ${state.containerSize}px;
  background: ${state.containerColor}; border-radius: ${state.borderRadius}px;
  svg { width: ${state.size}px; height: ${state.size}px; }
  
  &:hover {
    ${state.hoverEffect === "scale" ? "transform: scale(1.2);" : ""}
  }
}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      { icon: { size: { value: state.size }, color: { value: state.color } } },
      null,
      2,
    );
  } else if (downloadFormat === "tailwind-config") {
    content = JSON.stringify(
      { theme: { extend: { colors: { "icon-primary": state.color } } } },
      null,
      2,
    );
  } else if (downloadFormat === "css-vars") {
    const vars = generateCssVars(state);
    content = `:root {\n${Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n")}\n}`;
  }

  return { filename, content };
};
