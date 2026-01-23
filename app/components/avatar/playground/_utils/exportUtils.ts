import { AvatarExportInput } from "./exportTypes";
import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

// Define input type locally if missing from import to ensure safety
type AvatarExportParams = AvatarExportInput & {
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export function buildAvatarExport(params: AvatarExportParams) {
  const {
    src,
    srcSet,
    alt,
    initials,
    objectFit,
    objectPosition,
    size,
    aspectRatio,
    radiusMode,
    radiusValue,
    borderWidth,
    borderColor,
    borderStyle,
    borderOffset,
    shadow,
    opacity,
    initialsBg,
    initialsColor,
    fontFamily,
    filterGrayscale,
    filterBlur,
    filterBrightness,
    filterContrast,
    filterSepia,
    status,
    statusPosition,
    statusAnimation,
    badgeCount,
    hoverZoom,
    hoverGrayscale,
    imageRotation,
    imageScale,
    effect3D,
    showGroup,
    groupSpacing,
    groupLimit,
    groupDirection,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    downloadFormat,
    downloadName,
  } = params;

  // 1. Logic & Helpers (Restored from previous version)
  const filenameBase = downloadName || "avatar";

  // Radius handling
  let radiusStyle = `${radiusValue}px`;
  if (radiusMode === "circle") radiusStyle = "9999px";
  if (radiusMode === "square") radiusStyle = "0px";

  // Status Colors
  const getStatusColor = (s: string) => {
    switch (s) {
      case "online":
        return "#22c55e";
      case "offline":
        return "#94a3b8";
      case "busy":
        return "#ef4444";
      case "away":
        return "#eab308";
      default:
        return "transparent";
    }
  };
  const statusColor = getStatusColor(status);
  const statusPosMap: Record<string, string> = {
    "top-right": "top: -2px; right: -2px;",
    "bottom-right": "bottom: -2px; right: -2px;",
    "bottom-left": "bottom: -2px; left: -2px;",
    "top-left": "top: -2px; left: -2px;",
  };
  const statusPos =
    statusPosMap[statusPosition] || statusPosMap["bottom-right"];

  // Filters
  const filters: string[] = [];
  if (filterGrayscale > 0) filters.push(`grayscale(${filterGrayscale}%)`);
  if (filterBlur > 0) filters.push(`blur(${filterBlur}px)`);
  if (filterBrightness !== 100)
    filters.push(`brightness(${filterBrightness}%)`);
  if (filterContrast !== 100) filters.push(`contrast(${filterContrast}%)`);
  if (filterSepia > 0) filters.push(`sepia(${filterSepia}%)`);
  const filterString = filters.join(" ") || "none";

  // Transform
  const transform =
    imageRotation || imageScale !== 1
      ? `rotate(${imageRotation}deg) scale(${imageScale})`
      : "none";

  // 2. Format Generation
  let content = "";
  const ext =
    downloadFormat === "react"
      ? "tsx"
      : downloadFormat === "tailwind-config"
        ? "js"
        : downloadFormat === "figma-tokens"
          ? "json"
          : downloadFormat === "css-vars"
            ? "css"
            : downloadFormat === "scss"
              ? "scss"
              : "html";
  const filename = `${filenameBase}.${ext}`;

  // --- HTML Format (Detailed) ---
  if (downloadFormat === "html") {
    // Keyframes for effects
    const keyframes = `
      ${statusAnimation === "pulse" ? "@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.7); } 70% { box-shadow: 0 0 0 6px rgba(0,0,0,0); } 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); } }" : ""}
      ${effect3D === "pulse" ? "@keyframes effect-pulse { 50% { transform: scale(1.05); } }" : ""}
    `;

    // Single Avatar HTML Builder
    const getSingleAvatarHTML = (isGroup = false) => {
      const imgHTML = src
        ? `<img src="${src}" alt="${alt}" class="avatar-img" />`
        : `<div class="avatar-initials">${initials}</div>`;

      const badgeHTML =
        status !== "none" || badgeCount
          ? `<span class="avatar-status">${badgeCount}</span>`
          : "";

      return `
<div class="avatar ${effect3D !== "none" ? `effect-${effect3D}` : ""} ${isGroup ? "group-item" : ""}">
  ${imgHTML}
  ${badgeHTML}
  ${accessoryType !== "none" ? '<div class="accessory-overlay"></div>' : ""}
</div>`;
    };

    let bodyHTML = "";
    if (showGroup) {
      bodyHTML = `<div class="avatar-group">\n`;
      for (let i = 0; i < groupLimit; i++)
        bodyHTML += getSingleAvatarHTML(true) + "\n";
      bodyHTML += `</div>`;
    } else {
      bodyHTML = getSingleAvatarHTML();
    }

    content = `
${bodyHTML}

<style>
/* Base */
.avatar {
  position: relative; display: inline-flex;
  width: ${size}; height: ${size};
  opacity: ${opacity / 100};
  ${transform !== "none" ? `transform: ${transform};` : ""}
  transition: all 0.3s ease;
}

/* Image/Initials */
.avatar-img, .avatar-initials {
  width: 100%; height: 100%; object-fit: ${objectFit};
  border-radius: ${radiusStyle};
  border: ${borderWidth}px ${borderStyle} ${borderColor};
  filter: ${filterString};
}
.avatar-initials {
  display: flex; align-items: center; justify-content: center;
  background: ${initialsBg}; color: ${initialsColor};
  font-family: ${fontFamily}; font-weight: 600;
  font-size: calc(${parseInt(size)}px * 0.4);
}

/* Status */
.avatar-status {
  position: absolute; ${statusPos}
  width: ${badgeCount ? "auto" : "25%"}; height: ${badgeCount ? "auto" : "25%"};
  min-width: 12px; min-height: 12px;
  background: ${statusColor}; color: white;
  border: 2px solid white; border-radius: ${badgeCount ? "999px" : "50%"};
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: bold; padding: 0 4px;
  box-sizing: border-box; z-index: 10;
  ${statusAnimation === "pulse" ? "animation: pulse 2s infinite;" : ""}
}

/* Group */
.avatar-group { display: flex; flex-direction: ${groupDirection}; align-items: center; }
.group-item:not(:first-child) { ${groupDirection === "column" ? `margin-top: ${groupSpacing}px` : `margin-left: ${groupSpacing}px`}; }

${keyframes}
</style>
`;
  }

  // --- React Format (Complex) ---
  else if (downloadFormat === "react") {
    const is3D =
      use3DBadge !== "none" ||
      use3DStatus !== "none" ||
      accessoryType !== "none";
    const imports = [
      `import React from 'react';`,
      is3D
        ? `import { Canvas } from '@react-three/fiber';\nimport { Float, MeshDistortMaterial } from '@react-three/drei';`
        : "",
      entranceAnimation !== "none" || hoverEffect !== "none"
        ? `import { motion } from 'framer-motion';`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    // 3D Accessory Component
    const accessoryComponent = is3D
      ? `
function Accessory3D({ type, color }) {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <mesh position={[1, 1, 0]}>
         {/* Simplified geometry for export */}
         <sphereGeometry args={[0.3, 32, 32]} />
         <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}`
      : "";

    const singleJsx = `
      <div className="avatar-container" style={{
         position: 'relative', width: '${size}', height: '${size}',
         opacity: ${opacity / 100}, ${transform !== "none" ? `transform: '${transform}'` : ""}
      }}>
         {/* Main Content */}
         ${
           src
             ? `<img src="${src}" alt="${alt}" style={{
             width: '100%', height: '100%', objectFit: '${objectFit}',
             borderRadius: '${radiusStyle}', border: '${borderWidth}px ${borderStyle} ${borderColor}',
             filter: '${filterString}'
         }} />`
             : `<div style={{
             width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
             background: '${initialsBg}', color: '${initialsColor}', borderRadius: '${radiusStyle}',
             fontWeight: 600, fontSize: 'calc(${parseInt(size)}px * 0.4)'
         }}>${initials}</div>`
         }

         {/* Status */}
         {(status !== 'none' || badgeCount) && (
           <span style={{
              position: 'absolute', ${statusPos
                .replace(/;/g, ",")
                .replace(/:/g, ": ")
                .replace(/-([a-z])/g, (m) => m[1].toUpperCase())}
              minWidth: 12, minHeight: 12, background: '${statusColor}', border: '2px solid white',
              borderRadius: badgeCount ? 999 : '50%', color: 'white', fontSize: 10, fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: badgeCount ? '0 4px' : 0
           }}>{badgeCount}</span>
         )}

         {/* 3D Layer */}
         ${is3D ? `<div style={{position:'absolute', inset:0, pointerEvents:'none'}}><Canvas><ambientLight intensity={0.5} /><pointLight position={[10,10,10]} /><Accessory3D type="${accessoryType}" color="${accessoryColor}" /></Canvas></div>` : ""}
      </div>`;

    if (showGroup) {
      content = `
${imports}

${accessoryComponent}

export default function AvatarGroup() {
  return (
    <div style={{ display: 'flex', flexDirection: '${groupDirection}', alignItems: 'center' }}>
      {[...Array(${groupLimit})].map((_, i) => (
        <div key={i} style={{ ${groupDirection === "column" ? "marginTop" : "marginLeft"}: i > 0 ? ${groupSpacing} : 0 }}>
          ${singleJsx}
        </div>
      ))}
    </div>
  );
}`;
    } else {
      content = `
${imports}

${accessoryComponent}

export default function Avatar() {
  return (
    ${singleJsx}
  );
}`;
    }
  }

  // --- Tailwind (Robust) ---
  else if (downloadFormat === "tailwind") {
    const clsContainer = `relative inline-flex w-[${size}] h-[${size}] opacity-[${opacity / 100}]`;
    const clsImg = `w-full h-full object-${objectFit} rounded-[${radiusMode === "circle" ? "9999px" : radiusValue + "px"}] border-[${borderWidth}px] border-[${borderColor}] border-${borderStyle}`;
    const clsStatus = `absolute ${statusPosition === "top-right" ? "-top-0.5 -right-0.5" : "-bottom-0.5 -right-0.5"} ${badgeCount ? "w-auto px-1.5" : "w-1/4 h-1/4"} min-w-[12px] min-h-[12px] bg-[${statusColor}] border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold`;

    const singleTw = `
<div class="${clsContainer}">
  ${src ? `<img src="${src}" class="${clsImg}" />` : `<div class="${clsImg} flex items-center justify-center bg-[${initialsBg}] text-[${initialsColor}] font-semibold text-sm">${initials}</div>`}
  ${status !== "none" || badgeCount ? `<span class="${clsStatus}">${badgeCount || ""}</span>` : ""}
</div>`;

    if (showGroup) {
      content = `<div class="flex ${groupDirection === "column" ? "flex-col space-y-[" + groupSpacing + "px]" : "space-x-[" + groupSpacing + "px]"} items-center">\n`;
      for (let i = 0; i < groupLimit; i++) content += singleTw + "\n";
      content += `</div>`;
    } else {
      content = singleTw;
    }
  }

  // --- SCSS ---
  else if (downloadFormat === "scss") {
    content = `
.avatar {
  position: relative; display: inline-flex;
  width: ${size}; height: ${size}; opacity: ${opacity / 100};
  
  .img {
    width: 100%; height: 100%; object-fit: ${objectFit};
    border-radius: ${radiusStyle}; border: ${borderWidth}px ${borderStyle} ${borderColor};
  }
  
  .status {
    position: absolute; background: ${statusColor};
    /* Pos logic omitted for brevity in SCSS mixin usually */
  }
}
${showGroup ? `.avatar-group { display: flex; .avatar + .avatar { margin-left: ${groupSpacing}px; } }` : ""}
`;
  }

  // --- Tokens/Config ---
  else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        avatar: {
          size: { value: size },
          radius: { value: radiusStyle },
          status: { color: { value: statusColor } },
        },
      },
      null,
      2,
    );
  } else if (downloadFormat === "tailwind-config") {
    content = JSON.stringify(
      { theme: { extend: { borderRadius: { avatar: radiusStyle } } } },
      null,
      2,
    );
  } else if (downloadFormat === "css-vars") {
    content = `:root { --av-size: ${size}; --av-radius: ${radiusStyle}; } .avatar { width: var(--av-size); }`;
  }

  return { content, filename };
}
