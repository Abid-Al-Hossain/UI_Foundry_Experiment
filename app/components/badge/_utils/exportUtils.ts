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
  label: string;
  count: string;
  showIcon: boolean;
  iconName: string;
  iconPosition: BadgeIconPosition;
  variant: BadgeVariant;
  shape: BadgeShape;
  size: BadgeSize;
  color: string;
  textColor: string;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  borderRadius: number;
  borderWidth: number;
  showDot: boolean;
  dotColor: string;
  dotPulse: boolean;
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  dropShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  use3D: boolean;
  depth: number;
  tiltEnabled: boolean;
  tiltMax: number;
  glareOpacity: number;
  icon3DEnabled: boolean;
  icon3DGeometry: string;
  icon3DSpinSpeed: number;
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
    interactive,
    hoverScale,
  } = params;

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

  // 1. Logic Helpers
  const getRadius = () => {
    if (shape === "pill") return "9999px";
    if (shape === "circle") return "50%";
    if (shape === "square") return "0px";
    return `${borderRadius}px`;
  };

  const css = {
    bg: color,
    txt: textColor,
    border: `${borderWidth}px solid ${color}`,
    shadow: "none",
  };

  if (variant === "outline") {
    css.bg = "transparent";
    css.txt = color;
  } else if (variant === "soft") {
    css.bg = `${color}33`;
    css.txt = color;
    css.border = "none";
  } else if (variant === "ghost") {
    css.bg = "transparent";
    css.txt = color;
    css.border = "none";
  } else if (variant === "neumorphic") {
    css.bg = "#e0e5ec";
    css.txt = "#4a5568";
    css.border = "none";
    if (dropShadow) css.shadow = "5px 5px 10px #bebebe, -5px -5px 10px #ffffff";
  } else if (variant === "glass") {
    css.bg = "rgba(255, 255, 255, 0.2)";
    css.border = "1px solid rgba(255,255,255,0.3)";
  } else if (gradientEnabled) {
    css.bg = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
    css.border = "none";
  }

  if (dropShadow && variant !== "neumorphic")
    css.shadow = `0 4px ${shadowBlur}px ${shadowColor}`;

  // 2. Formats

  if (downloadFormat === "react") {
    content = `import React${tiltEnabled ? ", { useRef }" : ""} from 'react';
${icon3DEnabled ? `import { Canvas } from '@react-three/fiber';\nimport { Float } from '@react-three/drei';` : ""}

export default function Badge() {
  ${
    tiltEnabled
      ? `
  const ref = useRef(null);
  const handleMove = (e) => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = \`perspective(1000px) rotateX(\${y * -${tiltMax}}deg) rotateY(\${x * ${tiltMax}}deg)\`;
  };
  const handleLeave = () => { if(ref.current) ref.current.style.transform = "none"; };`
      : ""
  }

  return (
    <div 
      ${tiltEnabled ? "ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}" : ""}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: '${paddingY}px ${paddingX}px', fontSize: '${fontSize}px', fontWeight: 600,
        borderRadius: '${getRadius()}', background: '${css.bg}', color: '${css.txt}',
        border: '${css.border}', boxShadow: '${css.shadow}', cursor: '${interactive ? "pointer" : "default"}',
        transition: 'transform 0.2s ease', position: 'relative', overflow: 'hidden'
        ${use3D ? `, transform: 'perspective(1000px) translateZ(${depth}px)', transformStyle: 'preserve-3d'` : ""}
        ${variant === "glass" ? `, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)'` : ""}
      }}
    >
      ${showDot ? `<span style={{width: 10, height: 10, borderRadius: '50%', background: '${dotColor}', ${dotPulse ? 'animation: "pulse 1.5s infinite"' : ""}}} />` : ""}
      ${showIcon && iconPosition === "left" ? `<span style={{fontSize: '1.2em'}}>${iconName}</span>` : ""}
      <span>${label}</span>
      ${count ? `<span style={{marginLeft: 4, padding: '2px 6px', fontSize: '0.8em', borderRadius: 99, background: 'rgba(255,255,255,0.2)'}}>${count}</span>` : ""}
       ${showIcon && iconPosition === "right" ? `<span style={{fontSize: '1.2em'}}>${iconName}</span>` : ""}
      ${icon3DEnabled ? `<div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}><Canvas><ambientLight /><pointLight position={[10,10,10]} /><Float><mesh><${icon3DGeometry}Geometry args={[0.5, 32, 32]} /><meshStandardMaterial color="${color}" /></mesh></Float></Canvas></div>` : ""}
      ${tiltEnabled ? `<div style={{position:'absolute', inset:0, background: 'linear-gradient(45deg, transparent, rgba(255,255,255,${glareOpacity}), transparent)', pointerEvents:'none'}} />` : ""}
    </div>
  );
}`;
  } else if (downloadFormat === "html") {
    content = `
<div class="badge">
  ${showDot ? `<span class="dot"></span>` : ""}
  ${showIcon && iconPosition === "left" ? `<span class="icon">${iconName}</span>` : ""}
  <span class="content">${label}</span>
  ${count ? `<span class="count">${count}</span>` : ""}
  ${showIcon && iconPosition === "right" ? `<span class="icon">${iconName}</span>` : ""}
  ${tiltEnabled ? '<div class="glare"></div>' : ""}
</div>

<style>
.badge {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: ${paddingY}px ${paddingX}px; fontSize: ${fontSize}px; fontWeight: 600;
  border-radius: ${getRadius()}; background: ${css.bg}; color: ${css.txt};
  border: ${css.border}; box-shadow: ${css.shadow}; cursor: ${interactive ? "pointer" : "default"};
  transition: transform 0.2s ease; position: relative; overflow: hidden;
  ${variant === "glass" ? "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);" : ""}
  ${use3D ? `transform: perspective(1000px) translateZ(${depth}px); transform-style: preserve-3d;` : ""}
}
.badge:hover { ${interactive ? `transform: scale(${hoverScale});` : ""} }
.dot { width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; ${dotPulse ? "animation: pulse 1.5s infinite;" : ""} }
.count { margin-left: 4px; padding: 2px 6px; font-size: 0.8em; border-radius: 99px; background: rgba(255,255,255,0.2); }
.glare { position: absolute; inset: 0; background: linear-gradient(45deg, transparent, rgba(255,255,255,${glareOpacity}), transparent); pointer-events: none; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
</style>

${
  tiltEnabled
    ? `
<script>
(function(){
  const b = document.querySelector('.badge');
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
}`;
  } else if (downloadFormat === "tailwind") {
    // Robust Tailwind
    const classes = [
      "inline-flex items-center justify-center gap-1.5 relative overflow-hidden",
      `px-[${paddingX}px] py-[${paddingY}px] text-[${fontSize}px] font-semibold text-[${textColor}]`,
      `rounded-[${getRadius()}]`,
      variant === "outline"
        ? `border-[${borderWidth}px] border-[${color}] bg-transparent`
        : variant === "soft"
          ? `bg-[${color}]/20`
          : variant === "glass"
            ? `bg-white/20 border border-white/30 backdrop-blur-md`
            : variant === "neumorphic"
              ? `bg-[#e0e5ec] ${dropShadow ? "shadow-[5px_5px_10px_#bebebe,_-5px_-5px_10px_#ffffff]" : ""}`
              : gradientEnabled
                ? `bg-gradient-to-r from-[${gradientStart}] to-[${gradientEnd}]`
                : `bg-[${color}]`,
      dropShadow && variant !== "neumorphic"
        ? `shadow-[0_4px_${shadowBlur}px_${shadowColor}]`
        : "",
      interactive
        ? "cursor-pointer hover:scale-105 transition-transform"
        : "cursor-default",
      tiltEnabled
        ? "hover:[transform:perspective(1000px)_rotateX(10deg)_rotateY(-10deg)]"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    content = `<div class="${classes}">
  ${showDot ? `<span class="w-2.5 h-2.5 rounded-full bg-[${dotColor}] ${dotPulse ? "animate-pulse" : ""}"></span>` : ""}
  ${showIcon && iconPosition === "left" ? `<span>${iconName}</span>` : ""}
  <span>${label}</span>
  ${count ? `<span class="ml-1 px-1.5 py-0.5 text-[0.8em] rounded-full bg-white/20">${count}</span>` : ""}
</div>`;
  } else if (downloadFormat === "scss") {
    content = `.badge {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: ${paddingY}px ${paddingX}px; font-size: ${fontSize}px; font-weight: 600;
  border-radius: ${getRadius()}; background: ${css.bg}; color: ${css.txt};
  border: ${css.border}; box-shadow: ${css.shadow};
  
  ${variant === "glass" ? "backdrop-filter: blur(12px);" : ""}
  
  .dot { width: 10px; height: 10px; background: ${dotColor}; border-radius: 50%; }
  .count { background: rgba(255,255,255,0.2); border-radius: 99px; padding: 2px 6px; font-size: 0.8em; }
  
  &:hover { ${interactive ? `transform: scale(${hoverScale});` : ""} }
}`;
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        badge: {
          color: { value: color },
          shadow: { value: css.shadow },
          radius: { value: getRadius() },
        },
      },
      null,
      2,
    );
  } else if (downloadFormat === "tailwind-config") {
    content = JSON.stringify(
      {
        theme: {
          extend: {
            borderRadius: { badge: getRadius() },
            colors: { badge: color },
          },
        },
      },
      null,
      2,
    );
  } else if (downloadFormat === "css-vars") {
    content = `:root { --badge-bg: ${css.bg}; --badge-radius: ${getRadius()}; } .badge { background: var(--badge-bg); }`;
  }

  return { content, filename };
}
