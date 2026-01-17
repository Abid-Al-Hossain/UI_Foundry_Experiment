"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import {
  type BadgeVariant,
  type BadgeShape,
  type BadgeSize,
  type BadgeIconPosition,
} from "../types";

export type BadgeExportInput = {
  downloadFormat: DownloadFormat;
  downloadName: string;

  // Content
  label: string;
  count: string;
  showIcon: boolean;
  iconName: string;
  iconPosition: BadgeIconPosition;

  // Appearance
  variant: BadgeVariant;
  shape: BadgeShape;
  size: BadgeSize;
  color: string;
  textColor: string;

  // Values
  paddingX: number;
  paddingY: number;
  fontSize: number;
  borderRadius: number;
  borderWidth: number;

  // Status
  showDot: boolean;
  dotColor: string;
  dotPulse: boolean;

  // FX
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  dropShadow: boolean;
  shadowColor: string;
  shadowBlur: number;

  // 3D
  use3D: boolean;
  depth: number;
  tiltEnabled: boolean;
  tiltMax: number;
  glareOpacity: number;
  icon3DEnabled: boolean;
  icon3DGeometry: string;
  icon3DSpinSpeed: number;

  // Interactive
  interactive: boolean;
  hoverScale: number;
  clickRipple: boolean;
};

export function buildBadgeExportPayload(params: BadgeExportInput) {
  const {
    downloadFormat,
    downloadName,
    label,
    count,
    showIcon,
    iconName,
    iconPosition,
    variant,
    shape,
    size,
    color,
    textColor,
    paddingX,
    paddingY,
    fontSize,
    borderRadius,
    borderWidth,
    showDot,
    dotColor,
    dotPulse,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    dropShadow,
    shadowColor,
    shadowBlur,
    use3D,
    depth,
    tiltEnabled,
    tiltMax,
    glareOpacity,
    icon3DEnabled,
    icon3DGeometry,
    icon3DSpinSpeed,
    interactive,
    hoverScale,
    clickRipple,
  } = params;

  let content = "";
  const ext = downloadFormat === "react" ? "jsx" : "html";
  const filename = `${downloadName}.${ext}`;

  // Helper: CSS Generation
  const getVariantStyles = () => {
    let bg = color;
    let txt = textColor;
    let border = "none";
    let shadow = "none";

    if (variant === "outline") {
      bg = "transparent";
      txt = color;
      border = `${borderWidth}px solid ${color}`;
    } else if (variant === "soft") {
      bg = `${color}20`; // 20 hex alpha
      txt = color;
    } else if (variant === "ghost") {
      bg = "transparent";
      txt = color;
    } else if (variant === "neumorphic") {
      bg = "#e0e5ec";
      txt = "#4a5568";
      if (dropShadow) shadow = "5px 5px 10px #bebebe, -5px -5px 10px #ffffff";
    } else if (variant === "glass") {
      bg = `rgba(255, 255, 255, 0.2)`;
      txt = textColor;
      border = "1px solid rgba(255,255,255,0.3)";
      // Should add backdrop-filter in main CSS
    } else {
      // Solid
      if (gradientEnabled) {
        bg = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
        border = "none"; // Gradient borders are tricky, keeping simple
      }
    }

    if (dropShadow && variant !== "neumorphic") {
      shadow = `0px 4px ${shadowBlur}px ${shadowColor}`;
    }

    return { bg, txt, border, shadow };
  };

  const css = getVariantStyles();
  const radius =
    shape === "pill"
      ? "9999px"
      : shape === "circle"
        ? "50%"
        : shape === "square"
          ? "0px"
          : `${borderRadius}px`;

  const baseCss = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: ${paddingY}px ${paddingX}px;
    font-size: ${fontSize}px;
    font-weight: 600;
    font-family: sans-serif;
    border-radius: ${radius};
    background: ${css.bg};
    color: ${css.txt};
    border: ${css.border};
    box-shadow: ${css.shadow};
    cursor: ${interactive ? "pointer" : "default"};
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;
    ${
      variant === "glass"
        ? "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);"
        : ""
    }
    ${
      use3D
        ? `transform: perspective(1000px) translateZ(${depth}px); transform-style: preserve-3d;`
        : ""
    }
  `;

  const dotCss = `
    width: 10px; height: 10px;
    border-radius: 50%;
    background-color: ${dotColor};
    display: inline-block;
    position: relative;
  `;

  // HTML Export
  if (downloadFormat === "html") {
    content = `
<!-- UI Foundry Badge -->
<div class="uf-badge">
    ${
      showDot
        ? `<span class="uf-dot">${
            dotPulse ? '<span class="uf-pulse"></span>' : ""
          }</span>`
        : ""
    }
    ${
      showIcon && iconPosition === "left"
        ? `<span class="uf-icon">${iconName}</span>`
        : ""
    }
    <span class="uf-label">${label}</span>
    ${count ? `<span class="uf-count">${count}</span>` : ""}
    ${
      showIcon && iconPosition === "right"
        ? `<span class="uf-icon">${iconName}</span>`
        : ""
    }
    ${tiltEnabled ? '<div class="uf-glare"></div>' : ""}
</div>

<style>
.uf-badge {
    ${baseCss.replace(/\n/g, "").replace(/\s+/g, " ").trim()}
}
.uf-badge:hover {
    ${interactive ? `transform: scale(${hoverScale});` : ""}
}
.uf-dot {
    ${dotCss.replace(/\n/g, "").replace(/\s+/g, " ").trim()}
}
${
  dotPulse
    ? `
.uf-pulse {
    position: absolute; inset: 0; border-radius: 50%; background: ${dotColor}; opacity: 0.7;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
`
    : ""
}
.uf-count {
    margin-left: 4px; padding: 2px 6px; font-size: 0.8em; border-radius: 99px; background: rgba(255,255,255,0.2);
}
.uf-glare {
    position: absolute; inset: 0; background: linear-gradient(45deg, transparent, rgba(255,255,255,${glareOpacity}), transparent); pointer-events: none;
}
</style>
${
  tiltEnabled
    ? `
<script>
(function(){
    const b = document.querySelector('.uf-badge');
    b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        b.style.transform = \`perspective(1000px) rotateX(\${y * -${tiltMax}}deg) rotateY(\${x * ${tiltMax}}deg)\`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = 'none'; });
})();
</script>`
    : ""
}
      `;
  }

  // React Export
  if (downloadFormat === "react") {
    content = `
import React, { useState } from 'react';
${
  icon3DEnabled
    ? "import { Canvas } from '@react-three/fiber';\nimport { Float } from '@react-three/drei';"
    : ""
}

export default function Badge() {
    ${
      tiltEnabled
        ? `
    const [tilt, setTilt] = useState({x: 0, y: 0});
    const handleMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTilt({x: y * -${tiltMax}, y: x * ${tiltMax}});
    };
    `
        : ""
    }

    const baseStyle = {
        ${baseCss
          .replace(/;/g, ",")
          .replace("background:", "background:")
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}
        ${
          tiltEnabled
            ? `transform: \`perspective(1000px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`,`
            : ""
        }
    };

    return (
        <div 
            style={baseStyle}
            ${
              tiltEnabled
                ? "onMouseMove={handleMove} onMouseLeave={() => setTilt({x:0, y:0})}"
                : ""
            }
        >
            {/* Dot */}
            ${
              showDot
                ? `<span style={{${dotCss
                    .replace(/;/g, ",")
                    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}}}></span>`
                : ""
            }
            
            {/* Label */}
            <span>${label}</span>
            {${count ? `<span>${count}</span>` : "null"}}

            {/* 3D Icon Overlay */}
            ${
              icon3DEnabled
                ? `
            <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10,10,10]} />
                    <Float speed={2}>
                        <mesh><${icon3DGeometry}Geometry args={[0.5, 32, 32]} /><meshStandardMaterial color="${color}" /></mesh>
                    </Float>
                </Canvas>
            </div>
            `
                : ""
            }
        </div>
    );
}
      `;
  }

  return { content, filename };
}
