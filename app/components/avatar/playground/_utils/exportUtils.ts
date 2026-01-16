export type AvatarExportInput = {
  // Basics
  src: string;
  srcSet: string;
  alt: string;
  initials: string;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition: string; // e.g. "center", "top left"

  // Sizing & Shape
  size: string; // px or rem or tailwind class logic handling
  aspectRatio: string; // "1/1", "4/3", etc.
  radiusMode: "circle" | "rounded" | "square" | "custom";
  radiusValue: number; // px

  // Styling
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted";
  borderOffset: number; // ring offset
  shadow: string; // class or value
  opacity: number;
  initialsBg: string;
  initialsColor: string;
  fontFamily: string;

  // Filters (0-100 or specific values)
  filterGrayscale: number;
  filterBlur: number; // px
  filterBrightness: number; // %
  filterContrast: number; // %
  filterSepia: number;

  // Status & Badge
  status: "none" | "online" | "offline" | "busy" | "away";
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  statusAnimation: "none" | "pulse";
  badgeCount: string; // "5", "99+", or empty

  // Interactions
  hoverZoom: boolean;
  hoverGrayscale: boolean; // toggle grayscale on hover

  // Adjustments & 3D
  imageRotation: number;
  imageScale: number;
  effect3D: "none" | "tilt" | "glitch" | "pulse";

  // Group
  showGroup: boolean;
  groupSpacing: number;
  groupLimit: number;
  groupDirection: "row" | "column";

  // 3D & Motion
  // 3D & Motion ("Presence" Engine)
  use3DBadge: string;
  badgeAnimate: boolean;
  use3DStatus: string;
  accessoryType: string;
  accessoryColor: string;
  orbitSpeed: string;
  entranceAnimation: string;
  hoverEffect: string;
  textureEffect: string;
  borderEffect: string;

  // Meta
  downloadFormat:
    | "html"
    | "react"
    | "tailwind"
    | "css-vars"
    | "scss"
    | "tailwind-config"
    | "figma-tokens";
  downloadName: string;
};

export function buildAvatarExport(params: AvatarExportInput) {
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
    downloadFormat,
    downloadName,
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
  } = params;

  let content = "";
  const filenameBase = downloadName || "avatar";

  // --- Helper: Radius ---
  let radiusStyle = "";
  let twRadius = "";
  if (radiusMode === "circle") {
    radiusStyle = "9999px";
    twRadius = "rounded-full";
  } else if (radiusMode === "square") {
    radiusStyle = "0px";
    twRadius = "rounded-none";
  } else {
    radiusStyle = `${radiusValue}px`;
    twRadius = `rounded-[${radiusValue}px]`;
  }

  // --- Helper: Status Indicator ---
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

  // Position logic
  const statusPosStyle =
    {
      "top-right": "top: -2px; right: -2px;",
      "bottom-right": "bottom: -2px; right: -2px;",
      "bottom-left": "bottom: -2px; left: -2px;",
      "top-left": "top: -2px; left: -2px;",
    }[statusPosition] || "bottom: -2px; right: -2px;";

  const twStatusPos =
    {
      "top-right": "-top-0.5 -right-0.5",
      "bottom-right": "-bottom-0.5 -right-0.5",
      "bottom-left": "-bottom-0.5 -left-0.5",
      "top-left": "-top-0.5 -left-0.5",
    }[statusPosition] || "-bottom-0.5 -right-0.5";

  // --- CSS Generation ---
  const filtersList = [];
  if (filterGrayscale > 0) filtersList.push(`grayscale(${filterGrayscale}%)`);
  if (filterBlur > 0) filtersList.push(`blur(${filterBlur}px)`);
  if (filterSepia > 0) filtersList.push(`sepia(${filterSepia}%)`);
  if (filterBrightness !== 100)
    filtersList.push(`brightness(${filterBrightness}%)`);
  if (filterContrast !== 100) filtersList.push(`contrast(${filterContrast}%)`);

  const filters = filtersList.join(" ");

  // Transform Logic
  // We use a CSS var approach in editor, but here we hardcode for export simplicity
  const transformBase = `rotate(${imageRotation || 0}deg) scale(${
    imageScale || 1
  })`;
  // Hover transform logic: usually managed by CSS classes if complex.
  // We'll export base transform on the element.

  const containerBaseStyle = [
    `width: ${size}; height: ${size};`,
    `position: relative;`,
    `display: inline-flex;`,
    `align-items: center; justify-content: center;`,
    `opacity: ${opacity / 100};`,
    !src ? `border-radius: ${radiusStyle};` : "",
    !src ? `background-color: ${initialsBg};` : "",

    // Transform
    imageRotation || imageScale !== 1 ? `transform: ${transformBase};` : "",
    `transition: all 0.3s ease;`,

    // Group overlap handling
    showGroup ? `flex-shrink: 0;` : "",
    showGroup ? `z-index: 1;` : "",
    showGroup ? `transition: transform 0.2s ease, z-index 0s;` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imgStyle = [
    `width: 100%; height: 100%;`,
    `object-fit: ${objectFit};`,
    `object-position: ${objectPosition};`,
    borderWidth > 0
      ? `border: ${borderWidth}px ${borderStyle} ${borderColor};`
      : "",
    `border-radius: ${radiusStyle};`,
    filters ? `filter: ${filters};` : "",
    `transition: all 0.3s ease;`,
  ].join(" ");

  // Status/Badge Styles
  const hasBadge = !!badgeCount;
  const badgeStyle = [
    `position: absolute;`,
    statusPosStyle,
    hasBadge
      ? `width: auto; height: auto; padding: 2px 6px;`
      : `width: 25%; height: 25%;`,
    `min-width: 12px; min-height: 12px;`,
    `background-color: ${
      status === "none" && hasBadge ? "#ef4444" : statusColor
    };`,
    `border: 2px solid white;`,
    `border-radius: ${hasBadge ? "9999px" : "50%"};`,
    statusAnimation === "pulse" ? "animation: pulse 2s infinite;" : "",
    `box-sizing: border-box;`,
    `z-index: 10;`,
    // Text styles
    `display: flex; align-items: center; justify-content: center;`,
    `font-size: 10px; font-weight: bold; color: white; line-height: 1;`,
  ].join(" ");

  const initialsStyle = [
    `width: 100%; height: 100%;`,
    `display: flex; align-items: center; justify-content: center;`,
    `color: ${initialsColor};`,
    `font-family: ${fontFamily};`,
    `font-size: calc(${parseInt(size) || 40}px * 0.4);`,
    `font-weight: 600;`,
    borderWidth > 0
      ? `border: ${borderWidth}px ${borderStyle} ${borderColor};`
      : "",
    `border-radius: ${radiusStyle};`,
  ].join(" ");

  // --- HTML Output Generator ---
  const generateSingleHTML = () => {
    let mainContent = src
      ? `<img src="${src}" alt="${alt}" style="${imgStyle}" />`
      : `<div style="${initialsStyle}">${initials}</div>`;

    let statusBadge = "";
    if (status !== "none" || hasBadge) {
      statusBadge = `<span style="${badgeStyle}">${badgeCount || ""}</span>`;
    }

    // Effect Classes handling (inline style fallback if complex)
    // For HTML export, we inject classes and a style block.
    // Base container needs class if effect is present.
    let effClass = "";
    if (effect3D === "tilt") effClass = " effect-tilt";
    if (effect3D === "glitch") effClass = " effect-glitch";
    if (effect3D === "pulse") effClass = " effect-pulse";

    return `<div class="avatar${effClass}" style="${containerBaseStyle}">
  ${mainContent}
  ${statusBadge}
</div>`;
  };

  // --- Tailwind Generator ---
  const twContainerClasses = [
    `w-[${size}] h-[${size}]`,
    "relative inline-flex items-center justify-center",
    `opacity-[${opacity / 100}]`,
    showGroup
      ? "shrink-0 transition-transform duration-200 hover:z-10 hover:scale-110"
      : "",
    hoverZoom && !showGroup && effect3D === "none"
      ? "hover:scale-110 transition-transform duration-300"
      : "",
    // Effects via arbitrary classes or plugins?
    // We'll leave placeholders or basic hover scale.
    // Tailwind doesn't standardly have tilt/glitch.
  ]
    .filter(Boolean)
    .join(" ");

  const twImgClasses = [
    "w-full h-full",
    `object-${objectFit}`,
    `object-[${objectPosition.replace(" ", "-")}]`,
    twRadius,
    borderWidth > 0
      ? `border-[${borderWidth}px] border-[${borderColor}] border-${borderStyle}`
      : "",
    filters ? `[filter:${filters.replace(/\s+/g, "_")}]` : "",
    imageRotation || imageScale !== 1
      ? `[transform:${transformBase.replace(/\s+/g, "_")}]`
      : "",
    "transition-all duration-300",
  ]
    .filter(Boolean)
    .join(" ");

  const generateSingleTailwind = () => {
    const mainContent = src
      ? `<img src="${src}" alt="${alt}" class="${twImgClasses}" />`
      : `<div class="${twImgClasses} flex items-center justify-center font-semibold bg-[${initialsBg}] text-[${initialsColor}] text-[length:calc(${
          parseInt(size) || 40
        }px*0.4)]">${initials}</div>`;

    let statusBadge = "";
    if (status !== "none" || hasBadge) {
      const badgeClasses = hasBadge
        ? `w-auto h-auto min-w-[12px] min-h-[12px] px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none flex items-center justify-center text-white`
        : `w-1/4 h-1/4 min-w-[12px] min-h-[12px] rounded-full`;

      const colorClass =
        status === "none" && hasBadge ? "bg-red-500" : `bg-[${statusColor}]`;

      statusBadge = `<span class="absolute ${twStatusPos} ${badgeClasses} border-2 border-white ${colorClass} ${
        statusAnimation === "pulse" ? "animate-pulse" : ""
      }">${badgeCount || ""}</span>`;
    }

    return `<div class="${twContainerClasses}">
  ${mainContent}
  ${statusBadge}
</div>`;
  };

  // --- Final Assembly ---

  if (downloadFormat === "html") {
    const pulseKeyframes =
      statusAnimation === "pulse"
        ? `<style>@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.7); } 70% { box-shadow: 0 0 0 6px rgba(0,0,0,0); } 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); } }</style>\n`
        : "";

    // Effect Styles
    const effectKeyframes = {
      pulse: `@keyframes effect-pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); } 50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(0,0,0,0.2); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); } } .effect-pulse { animation: effect-pulse 2s infinite ease-in-out; }`,
      glitch: `@keyframes effect-glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } } .effect-glitch:hover { animation: effect-glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }`,
      tilt: `.effect-tilt { transition: transform 0.2s; } .effect-tilt:hover { transform: perspective(500px) rotateX(15deg) rotateY(-15deg) scale3d(1.05, 1.05, 1.05); }`,
    };

    let effectCSS = "";
    if (effect3D !== "none") {
      effectCSS = `<style>${effectKeyframes[effect3D]}</style>\n`;
    }

    if (showGroup) {
      const groupStyle = `display: flex; flex-direction: ${groupDirection}; align-items: center;`;
      let avatars = "";
      for (let i = 0; i < groupLimit; i++) {
        let marginStyle = "";
        if (i > 0) {
          marginStyle =
            groupDirection === "column"
              ? `margin-top: ${groupSpacing}px;`
              : `margin-left: ${groupSpacing}px;`;
        }
        const single = generateSingleHTML().replace(
          containerBaseStyle,
          containerBaseStyle + marginStyle
        );
        avatars += single + "\n";
      }
      content = `${pulseKeyframes}${effectCSS}<div class="avatar-group" style="${groupStyle}">\n${avatars}</div>`;
    } else {
      content = pulseKeyframes + effectCSS + generateSingleHTML();
    }
  } else if (downloadFormat === "react") {
    const componentName = filenameBase
      .replace(/[^a-zA-Z]/g, "")
      .replace(/^./, (c) => c.toUpperCase());

    const twContainerClassesJSX = twContainerClasses.replace(
      /class="/g,
      'className="'
    );

    const is3D =
      (use3DBadge && use3DBadge !== "none") ||
      (use3DStatus && use3DStatus !== "none") ||
      (accessoryType && accessoryType !== "none");
    const isMotion =
      (entranceAnimation && entranceAnimation !== "none") ||
      (hoverEffect && hoverEffect !== "none") ||
      (textureEffect && textureEffect !== "none") ||
      (borderEffect && borderEffect !== "none");

    const imports = [
      `import React from 'react';`,
      is3D ? `import { Canvas } from '@react-three/fiber';` : "",
      is3D
        ? `import { Float, MeshDistortMaterial } from '@react-three/drei';`
        : "",
      isMotion ? `import { motion } from 'framer-motion';` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Helper Component Strings
    const badgeHelper = is3D
      ? `
function BadgeMesh({ type, animate }) {
  return (
    <Float speed={animate ? 4 : 2} rotationIntensity={animate ? 2 : 0.5} floatIntensity={1}>
        <mesh position={[1.2, 1.2, 0]}>
             {type === "sphere" && <sphereGeometry args={[0.4, 32, 32]} />}
             {type === "cube" && <boxGeometry args={[0.6, 0.6, 0.6]} />}
             {type === "star" && <octahedronGeometry args={[0.5]} />}
             <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>
    </Float>
  );
}

function StatusMesh({ type }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {type === "ring" && (
        <mesh>
          <torusGeometry args={[1.6, 0.1, 16, 100]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      )}
      {type === "halo" && (
        <mesh>
          <torusGeometry args={[1.8, 0.05, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function AccessoryMesh({ type, color, speed }) {
   if (type === "crown") {
       return (
           <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
              <group position={[0, 1.4, 0]} rotation={[0.2, 0, 0]}>
                 <mesh>
                    <cylinderGeometry args={[0.5, 0.5, 0.2, 5]} />
                    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.5} />
                 </mesh>
                 {[0, 1, 2, 3, 4].map((i) => (
                    <mesh key={i} position={[Math.sin(i * Math.PI * 0.4) * 0.5, 0.2, Math.cos(i * Math.PI * 0.4) * 0.5]}>
                        <coneGeometry args={[0.1, 0.3, 4]} />
                        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                    </mesh>
                 ))}
              </group>
           </Float>
       );
   }
   if (type === "halo-cyber") {
        return (
            <Float speed={speed * 2} rotationIntensity={0} floatIntensity={0.2}>
               <group rotation={[Math.PI / 3, 0, 0]}>
                   <mesh>
                       <torusGeometry args={[1.6, 0.02, 16, 100]} />
                       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
                   </mesh>
                    <mesh rotation={[0, Math.PI/2, 0]}>
                       <torusGeometry args={[1.8, 0.01, 16, 100]} />
                       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.5} />
                   </mesh>
               </group>
            </Float>
        );
   }
   if (type === "orb-float") {
       return (
           <group>
               <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={[1.5, 0.5, 0.5]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                         <MeshDistortMaterial color={color} speed={2} distort={0.6} radius={1} />
                    </mesh>
               </Float>
                <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={[-1.5, -0.5, 0.5]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                         <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                    </mesh>
               </Float>
           </group>
       );
   }
   return null;
}
`
      : "";

    const singleInner = `
      <${isMotion ? "motion.div" : "div"}
        className="${twContainerClassesJSX}" 
        style={{ width: '${size}', height: '${size}' }}
        ${
          isMotion
            ? `
        initial={${JSON.stringify({
          opacity: entranceAnimation === "fade" ? 0 : 1,
          scale: entranceAnimation === "scale" ? 0 : 1,
          x: entranceAnimation === "slide" ? -50 : 0,
        })}}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: ${hoverEffect === "scale" ? 1.1 : 1} }}
        layoutId=${hoverEffect === "layout" ? '"avatar"' : "undefined"}
        `
            : ""
        }
      >
        ${
          src
            ? `<img src="${src}" alt="${alt}" className="${twImgClasses}" />`
            : `<div className="${twImgClasses} flex items-center justify-center bg-[${initialsBg}] text-[${initialsColor}]">${initials}</div>`
        }
        ${
          !is3D && (status !== "none" || hasBadge)
            ? (() => {
                const bg =
                  status === "none" && hasBadge
                    ? "bg-red-500"
                    : `bg-[${statusColor}]`;
                const badgeCls = hasBadge
                  ? `absolute ${twStatusPos} w-auto h-auto min-w-[12px] min-h-[12px] px-1.5 py-0.5 rounded-full border-2 border-white ${bg} ${
                      statusAnimation === "pulse" ? "animate-pulse" : ""
                    } flex items-center justify-center text-[10px] font-bold leading-none text-white`
                  : `absolute ${twStatusPos} w-1/4 h-1/4 min-w-[12px] min-h-[12px] rounded-full border-2 border-white ${bg} ${
                      statusAnimation === "pulse" ? "animate-pulse" : ""
                    }`;
                return `<span className="${badgeCls}">${
                  badgeCount || ""
                }</span>`;
              })()
            : ""
        }
        ${
          is3D
            ? `
        <div style={{ position: "absolute", inset: -20, pointerEvents: "none" }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                {${
                  use3DBadge !== "none"
                } && <BadgeMesh type="${use3DBadge}" animate={${badgeAnimate}} />}
                {${
                  use3DStatus !== "none"
                } && <StatusMesh type="${use3DStatus}" />}
                {${
                  accessoryType !== "none"
                } && <AccessoryMesh type="${accessoryType}" color="${accessoryColor}" speed={${orbitSpeed}} />}
            </Canvas>
        </div>

        {/* Motion Textures */}
        {${textureEffect === "glitch"} && (
           <motion.div 
              className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
              animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              style={{ background: "linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)", backgroundSize: "100% 4px" }}
           />
        )}
        {${textureEffect === "fluid"} && (
           <motion.div 
              className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
           />
        )}

        {/* Border Effects */}
        {${borderEffect === "snake"} && (
           <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
              <motion.rect 
                 width="100%" height="100%" 
                 fill="none" 
                 stroke="${borderColor}" 
                 strokeWidth={${borderWidth || 2}}
                 rx={${radiusValue}}
                 initial={{ pathLength: 0, pathOffset: 0 }}
                 animate={{ pathLength: 0.4, pathOffset: 1 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
           </svg>
        )}
        {${borderEffect === "heartbeat"} && (
           <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{ borderRadius: '${radiusStyle}', border: '${
                borderWidth || 2
              }px solid ${borderColor}' }}
              animate={{ scale: [1, 1.05, 1], borderColor: ['${borderColor}', '#ef4444', '${borderColor}'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
           />
        )}
        `
            : ""
        }
      </${isMotion ? "motion.div" : "div"}>
    `;

    if (showGroup) {
      content = `
${imports}

${badgeHelper}

export default function ${componentName}Group() {
  const avatars = [1, 2, 3, 4, 5]; // Example data
  return (
    <div className="flex ${
      groupDirection === "column" ? "flex-col" : "flex-row"
    } items-center">
      {avatars.map((_, i) => (
        <div key={i} style={{ ${
          groupDirection === "column" ? "marginTop" : "marginLeft"
        }: i > 0 ? '${groupSpacing}px' : 0 }}>
          ${singleInner.trim().replace(/^/gm, "          ")}
        </div>
      ))}
    </div>
  );
}
`;
    } else {
      content = `
${imports}

${badgeHelper}

export default function ${componentName}() {
  return (
    ${singleInner.trim()}
  );
}
`;
    }
  } else if (downloadFormat === "tailwind") {
    if (showGroup) {
      const groupClass = `flex ${
        groupDirection === "column" ? "flex-col" : "flex-row"
      } items-center`;
      let avatars = "";
      for (let i = 0; i < groupLimit; i++) {
        let marginClass = "";
        if (i > 0) {
          marginClass =
            groupDirection === "column"
              ? `mt-[${groupSpacing}px]`
              : `ml-[${groupSpacing}px]`;
        }
        const single = generateSingleTailwind().replace(
          twContainerClasses,
          `${twContainerClasses} ${marginClass}`
        );
        avatars += single + "\n";
      }
      content = `<div class="${groupClass}">\n${avatars}</div>`;
    } else {
      content = generateSingleTailwind();
    }
  } else if (downloadFormat === "css-vars") {
    content = `:root {
  --avatar-size: ${size};
  --avatar-radius: ${radiusStyle};
  --avatar-border: ${borderWidth}px ${borderStyle} ${borderColor};
  --avatar-bg: ${initialsBg};
  --avatar-color: ${initialsColor};
  /* ... other vars ... */
  ${showGroup ? `--avatar-group-spacing: ${groupSpacing}px;` : ""}
}

.avatar {
  /* ... base styles ... */
  ${imageRotation || imageScale !== 1 ? `transform: ${transformBase};` : ""}
}
${
  showGroup
    ? `
.avatar-group {
  display: flex;
  flex-direction: ${groupDirection};
}
.avatar-group .avatar:not(:first-child) {
  ${
    groupDirection === "column" ? "margin-top" : "margin-left"
  }: var(--avatar-group-spacing);
}`
    : ""
}`;
  } else {
    content = `/* Format ${downloadFormat} implementation pending refactor */`;
  }

  let ext =
    downloadFormat === "react"
      ? "tsx"
      : downloadFormat === "tailwind-config"
      ? "js"
      : downloadFormat === "figma-tokens"
      ? "json"
      : downloadFormat === "scss"
      ? "scss"
      : downloadFormat === "css-vars"
      ? "css"
      : "html";
  if (downloadFormat === "tailwind") ext = "html";
  if (downloadFormat === "css-vars") ext = "css";

  return { filename: `${filenameBase}.${ext}`, content };
}
