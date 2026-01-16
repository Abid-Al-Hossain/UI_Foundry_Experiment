import { IconState } from "../types";

// Helper to generate CSS variables
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
    glassOpacity,
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
    "--icon-border-width": `${borderWidth}px`,
    "--icon-border-color": borderColor,
    "--icon-border-style": borderStyle,
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
}: IconState & { downloadFormat: string; downloadName: string }) => {
  const { iconName, animationType, hoverEffect } = state;

  let content = "";
  let filename = `${downloadName}.${downloadFormat === "react" ? "tsx" : "html"}`;

  if (downloadFormat === "react") {
    // React Export with Framer Motion
    content = `
import React from "react";
import { ${iconName} } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomIcon() {
  const variants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      ${
        hoverEffect === "scale"
          ? "scale: 1.2"
          : hoverEffect === "rotate"
            ? "rotate: 180"
            : hoverEffect === "shake"
              ? "x: [0, -5, 5, -5, 5, 0]"
              : hoverEffect === "glow"
                ? 'filter: "drop-shadow(0 0 10px var(--icon-color))"'
                : ""
      }
    },
    animate: {
      ${
        animationType === "spin"
          ? "rotate: 360"
          : animationType === "pulse"
            ? "scale: [1, 1.1, 1]"
            : animationType === "bounce"
              ? "y: [0, -10, 0]"
              : animationType === "wiggle"
                ? "rotate: [0, -10, 10, -10, 10, 0]"
                : ""
      }
    }
  };

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--icon-container-size)",
    height: "var(--icon-container-size)",
    padding: "var(--icon-padding)",
    background: "var(--icon-bg)",
    border: "var(--icon-border-width) var(--icon-border-style) var(--icon-border-color)",
    borderRadius: "var(--icon-radius)",
    boxShadow: "var(--icon-shadow)",
    backdropFilter: "var(--icon-backdrop)",
    transform: "var(--icon-transform)",
    color: "${state.gradientEnabled ? "url(#grad)" : "var(--icon-color)"}",
    opacity: "var(--icon-opacity)",
  } as React.CSSProperties;

  // Variables for easy customization
  // ${JSON.stringify(generateCssVars(state), null, 2)}

  return (
    <motion.div 
      style={style}
      initial="initial"
      whileHover="hover"
      animate="animate"
      variants={variants}
      transition={{ duration: ${state.animationDuration}, repeat: Infinity }}
    >
      ${
        state.gradientEnabled
          ? `
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="grad" gradientTransform="rotate(${state.gradientAngle})">
            <stop offset="0%" stopColor="${state.gradientStart}" />
            <stop offset="100%" stopColor="${state.gradientEnd}" />
          </linearGradient>
        </defs>
      </svg>`
          : ""
      }
      <${iconName} 
        size={${state.size}} 
        strokeWidth={${state.strokeWidth}}
        fill="${state.fillColor}"
        fillOpacity={${state.fillOpacity}}
      />
    </motion.div>
  );
}
`;
  } else {
    // HTML/CSS Export
    const vars = generateCssVars(state);
    const cssVarsString = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n      ");

    content = `
<!-- Icon HTML -->
<div class="custom-icon-wrapper">
  <!-- Requires Lucide Icon SVG content here, or use <i data-lucide="${iconName}"></i> if using lucide.js -->
  <svg xmlns="http://www.w3.org/2000/svg" width="${state.size}" height="${state.size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${state.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${iconName.toLowerCase()}">
    <!-- Icon paths would go here -->
  </svg>
</div>

<style>
  .custom-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    ${cssVarsString}
    
    width: var(--icon-container-size);
    height: var(--icon-container-size);
    padding: var(--icon-padding);
    background: var(--icon-bg);
    border: var(--icon-border-width) var(--icon-border-style) var(--icon-border-color);
    border-radius: var(--icon-radius);
    box-shadow: var(--icon-shadow);
    backdrop-filter: var(--icon-backdrop);
    -webkit-backdrop-filter: var(--icon-backdrop);
    transform: var(--icon-transform);
    color: var(--icon-color);
    opacity: var(--icon-opacity);
    transition: all 0.3s ease;
  }
  
  .custom-icon-wrapper:hover {
     /* Add hover styles here matching the effect */
     ${state.hoverEffect === "scale" ? "transform: scale(1.2);" : ""}
  }
  
  /* Animation Keyframes */
  ${state.animationType === "spin" ? "@keyframes spin { 100% { transform: rotate(360deg); } } .custom-icon-wrapper svg { animation: spin 2s linear infinite; }" : ""}
</style>
`;
  }

  return {
    filename,
    content: content.trim(),
  };
};
