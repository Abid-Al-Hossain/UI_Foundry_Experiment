"use client";

import type { DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { sanitizeFilenameBase } from "./colorUtils";

type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export type ExportPayloadInput = {
  downloadFormat: DownloadFormat;
  downloadName: string;
  touchWidth: number;
  touchHeight: number;
  fontSizeValue: number;
  fontSizeUnit: string;
  letterSpacingValue: number;
  letterSpacingUnit: string;
  ariaLabel: string;
  ariaPressedMode: string;
  ariaBusyMode: string;
  loading: boolean;
  tsXText: string;
  tsYText: string;
  tsBlurText: string;
  textShadowEnabled: boolean;
  tsColor: string;
  transitionColorMs: number;
  transitionColorEasing: TransitionEasing;
  transitionTransformMs: number;
  transitionTransformEasing: TransitionEasing;
  boxShadowCss: string;
  boxShadowHoverCss: string;
  boxShadowActiveCss: string;
  topGradientCss: string;
  parallaxHighlightEnabled: boolean;
  parallaxStrength: number;
  iconEmbossFilter: string;
  hoverTiltX: number;
  hoverTiltY: number;
  hoverPerspective: number;
  loadingLabel: string;
  animation: string;
  iconSizeText: string;
  iconGapText: string;
  loadingSpinnerMode: string;
  loadingSpinnerSvg: string;
  loadingSpinnerPosition: string;
  label: string;
  baseIconSvg: string;
  hoverIconSvg: string;
  activeIconSvg: string;
  loadingIconSvg: string;
  iconSource: string;
  iconName: string;
  iconColorMode: string;
  iconColorInput: string;
  iconPosition: "left" | "right";
  disabled: boolean;
  hoverEnabled: boolean;
  hoverBgMode: string;
  hoverTextMode: string;
  hoverTextInput: string;
  hoverBorderMode: string;
  hoverBorderInput: string;
  hoverBorderWidthPx: number;
  activeEnabled: boolean;
  cssActiveBg: string;
  cssActiveText: string;
  cssActiveBorder: string;
  activeBorderWidthPx: number;
  cssActiveFilter: string;
  activeTranslateYText: string;
  activeScaleText: string;
  disabledHoverSuppressed: boolean;
  cssDisabledBg: string;
  cssDisabledText: string;
  cssDisabledBorder: string;
  disabledBorderWidthPx: number;
  disabledTextShadowCss: string;
  disabledOpacity: number;
  disabledCursor: string;
  align: string;
  cssBg: string;
  textInput: string;
  borderInput: string;
  cssHoverBg: string;
  cssHoverText: string;
  cssHoverBorder: string;
  cssHoverFilter: string;
  borderStyle: string;
  borderWidthPx: number;
  padX: number;
  padY: number;
  rTL: number;
  rTR: number;
  rBR: number;
  rBL: number;
  fontBucket: string;
  googleFontFamily: string;
  fontFamily: string;
  fontWeight: number;
  lHeight: number;
  underline: boolean;
  focusRingEnabled: boolean;
  focusRingWidthText: string;
  focusRingOffsetText: string;
  focusRingInput: string;
  previewBgHex: string;
  fontStyle: string;
  textTransform: string;
  backdropBlurEnabled: boolean;
  backdropBlurText: string;
  // 3D & Effects
  use3DIcon: string;
  icon3DAnimation: string;
  clickEffect: string;
  confetti: boolean;
  ripple: boolean;
};

export function buildExportPayload(params: ExportPayloadInput) {
  // Destructure everything again to ensure we have all vars available for the logic
  const {
    downloadFormat,
    downloadName,
    touchWidth,
    touchHeight,
    fontSizeValue,
    fontSizeUnit,
    letterSpacingValue,
    letterSpacingUnit,
    ariaLabel,
    ariaPressedMode,
    ariaBusyMode,
    loading,
    tsXText,
    tsYText,
    tsBlurText,
    textShadowEnabled,
    tsColor,
    transitionColorMs,
    transitionColorEasing,
    transitionTransformMs,
    transitionTransformEasing,
    boxShadowCss,
    boxShadowHoverCss,
    boxShadowActiveCss,
    topGradientCss,
    parallaxHighlightEnabled,
    parallaxStrength,
    iconEmbossFilter,
    hoverTiltX,
    hoverTiltY,
    hoverPerspective,
    loadingLabel,
    animation,
    iconSizeText,
    iconGapText,
    loadingSpinnerMode,
    loadingSpinnerSvg,
    loadingSpinnerPosition,
    label,
    baseIconSvg,
    hoverIconSvg,
    activeIconSvg,
    loadingIconSvg,
    iconSource,
    iconName,
    iconColorMode,
    iconColorInput,
    iconPosition,
    disabled,
    hoverEnabled,
    hoverBgMode,
    hoverTextMode,
    hoverTextInput,
    hoverBorderMode,
    hoverBorderInput,
    hoverBorderWidthPx,
    activeEnabled,
    cssActiveBg,
    cssActiveText,
    cssActiveBorder,
    activeBorderWidthPx,
    cssActiveFilter,
    activeTranslateYText,
    activeScaleText,
    disabledHoverSuppressed,
    cssDisabledBg,
    cssDisabledText,
    cssDisabledBorder,
    disabledBorderWidthPx,
    disabledTextShadowCss,
    disabledOpacity,
    disabledCursor,
    align,
    cssBg,
    textInput,
    borderInput,
    cssHoverBg,
    cssHoverText,
    cssHoverBorder,
    cssHoverFilter,
    borderStyle,
    borderWidthPx,
    padX,
    padY,
    rTL,
    rTR,
    rBR,
    rBL,
    fontBucket,
    googleFontFamily,
    fontFamily,
    fontWeight,
    lHeight,
    underline,
    focusRingEnabled,
    focusRingWidthText,
    focusRingOffsetText,
    focusRingInput,
    previewBgHex,
    fontStyle,
    textTransform,
    backdropBlurEnabled,
    backdropBlurText,
    use3DIcon,
    icon3DAnimation,
    clickEffect,
    confetti,
    ripple,
  } = params;

  // --- Logic Reconstruction (from original robust code) ---

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
  const rawBase = sanitizeFilenameBase(downloadName);
  const base =
    rawBase.replace(/\.(html|jsx|tailwind|css|scss|js|json)$/i, "") || "button";
  const filename = `${base}.${ext}`;

  // Dimensions & Typos
  const fontSizeCss = `${fontSizeValue}${fontSizeUnit}`;
  const letterSpacingCss = `${letterSpacingValue}${letterSpacingUnit}`;

  // Aria
  const ariaLabelAttr = ariaLabel
    ? ` aria-label="${ariaLabel.replace(/"/g, "&quot;")}"`
    : "";
  const ariaPressedAttr =
    ariaPressedMode !== "off" ? ` aria-pressed="${ariaPressedMode}"` : "";
  const ariaBusyAttr =
    ariaBusyMode === "auto"
      ? loading
        ? ` aria-busy="true"`
        : ""
      : ariaBusyMode !== "off"
        ? ` aria-busy="${ariaBusyMode}"`
        : "";
  const ariaAttr = `${ariaLabelAttr}${ariaPressedAttr}${ariaBusyAttr}`;

  // Text Shadow
  const tsX = Number(tsXText) || 0;
  const tsY = Number(tsYText) || 0;
  const tsBlur = Number(tsBlurText) || 0;
  const textShadowCss = textShadowEnabled
    ? `${tsX}px ${tsY}px ${tsBlur}px ${tsColor}`
    : "none";

  // Transitions
  const transitionCss = `background ${transitionColorMs}ms ${transitionColorEasing}, color ${transitionColorMs}ms ${transitionColorEasing}, border-color ${transitionColorMs}ms ${transitionColorEasing}, filter ${transitionColorMs}ms ${transitionColorEasing}, box-shadow ${transitionColorMs}ms ${transitionColorEasing}, transform ${transitionTransformMs}ms ${transitionTransformEasing}, border-width ${transitionTransformMs}ms ${transitionTransformEasing}`;

  // Box Shadows
  const exportShadow =
    boxShadowCss && boxShadowCss !== "none" ? boxShadowCss : "none";
  const exportHoverShadow =
    boxShadowHoverCss && boxShadowHoverCss !== "none"
      ? boxShadowHoverCss
      : exportShadow;
  const exportActiveShadow =
    boxShadowActiveCss && boxShadowActiveCss !== "none"
      ? boxShadowActiveCss
      : exportShadow;

  // 3D / Transform
  const hoverTransform =
    hoverTiltX || hoverTiltY
      ? `perspective(${hoverPerspective}px) rotateX(${hoverTiltX}deg) rotateY(${hoverTiltY}deg)`
      : "";

  // Gradients & Effects
  const exportTopGradient =
    topGradientCss && topGradientCss !== "none" ? topGradientCss : "none";
  const parallaxOpacity = parallaxHighlightEnabled
    ? Math.max(0, Math.min(1, Number(parallaxStrength) || 0))
    : 0;
  const iconEmbossCss = iconEmbossFilter || "none";
  const backdropFilterCss =
    backdropBlurEnabled && backdropBlurText
      ? `blur(${backdropBlurText}px)`
      : "none";

  // Icons
  const spinnerSize = Number(iconSizeText) || 18;
  const spinnerGap = Number(iconGapText) || 10;
  const defaultSpinnerSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  const exportSpinnerSvg =
    loadingSpinnerMode === "custom" && loadingSpinnerSvg
      ? loadingSpinnerSvg
      : loadingSpinnerMode === "none"
        ? ""
        : defaultSpinnerSvg;

  const iconColor =
    iconColorMode === "custom" ? iconColorInput : "currentColor";

  // Icon Wrappers HTML
  const renderIconHTML = (svg: string, cls: string) =>
    svg
      ? `<span class="uf-icon-wrap ${cls}" style="width:${spinnerSize}px;height:${spinnerSize}px;color:${iconColor}">${svg}</span>`
      : "";

  const baseIconHTML = renderIconHTML(baseIconSvg, "uf-icon-base");
  const hoverIconHTML = renderIconHTML(hoverIconSvg, "uf-icon-hover");
  const activeIconHTML = renderIconHTML(activeIconSvg, "uf-icon-active");
  const loadingIconHTML = renderIconHTML(loadingIconSvg, "uf-icon-loading");

  const hasMultipleIcons =
    (hoverEnabled && hoverIconSvg) || (activeEnabled && activeIconSvg);

  // Alignment
  const alignMap: Record<string, string> = {
    "top-left": "flex-start flex-start",
    "top-center": "flex-start center",
    "top-right": "flex-start flex-end",
    "middle-left": "center flex-start",
    "middle-center": "center center",
    "middle-right": "center flex-end",
    "bottom-left": "flex-end flex-start",
    "bottom-center": "flex-end center",
    "bottom-right": "flex-end flex-end",
  };
  const [alignItems, justify] = (alignMap[align] || "center center").split(" ");

  // Radius
  const rCSS = `${rTL}px ${rTR}px ${rBR}px ${rBL}px`;

  // Focus Ring
  const focusRing = focusRingEnabled
    ? `0 0 0 ${focusRingOffsetText}px ${previewBgHex}, 0 0 0 calc(${focusRingOffsetText}px + ${focusRingWidthText}px) ${focusRingInput}`
    : "none";

  // --- Output Generation ---

  if (downloadFormat === "html") {
    // Reconstructing the specific robust HTML format
    const spinnerHTML = exportSpinnerSvg
      ? `<span class="uf-spinner" style="width:${spinnerSize}px;height:${spinnerSize}px">${exportSpinnerSvg}</span>`
      : "";
    const labelHTML = `<span class="uf-label">${loading && loadingLabel ? loadingLabel : label}</span>`;

    // Icon Logic for HTML
    let leftIcon = "",
      rightIcon = "";
    if (iconPosition === "left") {
      if (loading && loadingSpinnerPosition === "left") leftIcon = spinnerHTML;
      else
        leftIcon = `${baseIconHTML}${hasMultipleIcons ? hoverIconHTML + activeIconHTML : ""}`;
    } else {
      if (loading && loadingSpinnerPosition === "right")
        rightIcon = spinnerHTML;
      else
        rightIcon = `${baseIconHTML}${hasMultipleIcons ? hoverIconHTML + activeIconHTML : ""}`;
    }

    const content = `
<button class="uf-btn ${loading ? "is-loading" : ""} ${disabled ? "is-disabled" : ""}" ${disabled ? "disabled" : ""} ${ariaAttr} onclick="handleClick(this)">
  ${leftIcon}
  ${labelHTML}
  ${rightIcon}
  ${use3DIcon && use3DIcon !== "none" ? `<div class="uf-3d-icon-container"></div>` : ""}
</button>

<style>
@import url("https://fonts.googleapis.com/css2?family=${encodeURIComponent(googleFontFamily || "Inter")}:wght@100..900&display=swap");

.uf-btn {
  /* Base */
  display: inline-flex;
  align-items: ${alignItems}; justify-content: ${justify};
  width: ${touchWidth}px; height: ${touchHeight}px;
  padding: ${padY}px ${padX}px; gap: ${iconGapText}px;
  
  /* Typography */
  font-family: ${fontFamily || googleFontFamily}, sans-serif;
  font-size: ${fontSizeCss}; font-weight: ${fontWeight};
  font-style: ${fontStyle}; text-transform: ${textTransform};
  letter-spacing: ${letterSpacingCss}; line-height: ${lHeight};
  text-decoration: ${underline ? "underline" : "none"};
  text-shadow: ${textShadowCss};
  
  /* Appearance */
  background: ${cssBg}; color: ${textInput};
  border: ${borderWidthPx}px ${borderStyle} ${borderInput};
  border-radius: ${rCSS};
  box-shadow: ${exportShadow};
  opacity: ${disabled ? disabledOpacity : 1};
  cursor: ${disabled ? disabledCursor : "pointer"};
  
  /* Effects */
  transform-style: preserve-3d;
  transition: ${transitionCss};
  backdrop-filter: ${backdropFilterCss};
  -webkit-backdrop-filter: ${backdropFilterCss};
  
  position: relative; overflow: hidden;
  --uf-highlight-x: 0px; --uf-highlight-y: 0px; --uf-highlight-op: 0;
}

/* Hover State */
.uf-btn:hover:not(:disabled) {
  background: ${cssHoverBg}; color: ${cssHoverText};
  border-color: ${cssHoverBorder};
  box-shadow: ${exportHoverShadow};
  filter: ${cssHoverFilter || "none"};
  ${hoverTransform ? `transform: ${hoverTransform};` : ""}
}

/* Active State */
.uf-btn:active:not(:disabled) {
  background: ${cssActiveBg}; color: ${cssActiveText};
  border-color: ${cssActiveBorder};
  box-shadow: ${exportActiveShadow};
  filter: ${cssActiveFilter || "none"};
  transform: translateY(${activeTranslateYText}px) scale(${activeScaleText});
}

/* Focus State */
.uf-btn:focus-visible { outline: none; box-shadow: ${focusRing}; }

/* Icons & content z-index */
.uf-btn > * { position: relative; z-index: 1; pointer-events: none; }

/* Icon switching */
.uf-icon-hover, .uf-icon-active, .uf-icon-loading { display: none; }
.uf-btn:hover:not(:disabled) .uf-icon-base { display: ${hasMultipleIcons ? "none" : "inline-flex"}; }
.uf-btn:hover:not(:disabled) .uf-icon-hover { display: inline-flex; }
.uf-btn:active:not(:disabled) .uf-icon-base { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-hover { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-active { display: inline-flex; }

/* Parallax Overlay */
.uf-btn::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(circle at var(--uf-highlight-x) var(--uf-highlight-y), rgba(255,255,255,var(--uf-highlight-op)), transparent 60%);
  border-radius: inherit;
}

/* Animations */
${animation === "pulse" ? "@keyframes pulse { 50% { opacity: 0.8; transform: scale(0.98); } } .uf-btn { animation: pulse 2s infinite; }" : ""}
${animation === "float" ? "@keyframes float { 50% { transform: translateY(-3px); } } .uf-btn { animation: float 3s ease-in-out infinite; }" : ""}
@keyframes spin { to { transform: rotate(360deg); } }
.uf-spinner svg { animation: spin 0.8s linear infinite; }

/* 3D Container */
.uf-3d-icon-container { position: absolute; inset: 0; z-index: 0; }
</style>

${
  parallaxHighlightEnabled
    ? `
<script>
const btn = document.querySelector('.uf-btn');
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  btn.style.setProperty('--uf-highlight-x', x + 'px');
  btn.style.setProperty('--uf-highlight-y', y + 'px');
  btn.style.setProperty('--uf-highlight-op', '${parallaxStrength}');
});
btn.addEventListener('mouseleave', () => btn.style.setProperty('--uf-highlight-op', '0'));
${
  confetti
    ? `
function handleClick(e) { /* Add Canvas Confetti library call here */ }
`
    : `function handleClick(e) {}`
}
</script>`
    : ""
}
`;
    return { content, filename: `${base}.html` };
  }

  // --- React Output (High Fidelity) ---
  if (downloadFormat === "react") {
    // Imports
    const imports = [
      "import React, { useRef, useState } from 'react';",
      use3DIcon && use3DIcon !== "none"
        ? "import { Canvas, useFrame } from '@react-three/fiber';\nimport { Float, MeshDistortMaterial } from '@react-three/drei';"
        : "",
      confetti ? "import confetti from 'canvas-confetti';" : "",
      animation !== "none" ? "import { motion } from 'framer-motion';" : "",
    ]
      .filter(Boolean)
      .join("\n");

    // 3D Component
    const icon3D =
      use3DIcon && use3DIcon !== "none"
        ? `
function Icon3D() {
  const ref = useRef()
  useFrame((state) => { 
    if(ref.current) { ref.current.rotation.x = state.clock.elapsedTime * 0.5; ref.current.rotation.y = state.clock.elapsedTime * 0.3; } 
  })
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={ref}>
          ${use3DIcon === "sphere" ? "<sphereGeometry args={[1, 32, 32]} />" : use3DIcon === "box" ? "<boxGeometry args={[1.5, 1.5, 1.5]} />" : "<torusGeometry args={[1, 0.4, 16, 100]} />"}
          <MeshDistortMaterial color="${iconColorInput}" speed={2} distort={0.4} radius={1} />
        </mesh>
      </Float>
    </Canvas>
  )
}`
        : "";

    const content = `
${imports}

${icon3D}

export default function ActionButton({ onClick = () => {}, disabled = false, loading = false }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    btnRef.current.style.setProperty('--x', x + 'px');
    btnRef.current.style.setProperty('--y', y + 'px');
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick(e);
    ${confetti ? `confetti({ origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });` : ""}
  };

  const combinedStyle = {
    // Dimensions
    width: '${touchWidth}px', height: '${touchHeight}px',
    padding: '${padY}px ${padX}px', gap: '${iconGapText}px',
    
    // Typography
    fontFamily: '${fontFamily}', fontSize: '${fontSizeCss}', fontWeight: ${fontWeight},
    letterSpacing: '${letterSpacingCss}', color: '${textInput}',
    
    // Appearance
    background: '${cssBg}', border: '${borderWidthPx}px ${borderStyle} ${borderInput}',
    borderRadius: '${rCSS}', boxShadow: '${exportShadow}',
    opacity: disabled ? ${disabledOpacity} : 1,
    cursor: disabled ? '${disabledCursor}' : 'pointer',
    
    // States (Simplified for export, real implementation would use separate state objects or CSS classes)
    ...(hover && !disabled ? {
       background: '${cssHoverBg}', color: '${cssHoverText}', borderColor: '${cssHoverBorder}',
       boxShadow: '${exportHoverShadow}', transform: '${hoverTransform}'
    } : {}),
    ...(active && !disabled ? {
       background: '${cssActiveBg}', color: '${cssActiveText}', transform: 'scale(${activeScaleText})'
    } : {}),
    
    // Transitions
    transition: '${transitionCss}',
    position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: '${alignItems}', justifyContent: '${justify}'
  };

  return (
    <button
      ref={btnRef}
      style={combinedStyle}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseMove={${parallaxHighlightEnabled ? "handleMouseMove" : "undefined"}}
    >
      ${
        parallaxHighlightEnabled
          ? `<div style={{
         position: 'absolute', inset: 0, pointerEvents: 'none',
         background: \`radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,${parallaxStrength}), transparent 60%)\`,
         opacity: hover ? 1 : 0, transition: 'opacity 0.2s'
      }} />`
          : ""
      }

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 'inherit' }}>
        ${iconPosition === "left" && baseIconSvg ? `<span dangerouslySetInnerHTML={{__html: '${baseIconSvg.replace(/'/g, "\\'")}'}} style={{width:${spinnerSize}, height:${spinnerSize}, fill:'currentColor'}} />` : ""}
        <span>{loading ? '${loadingLabel || label}' : '${label}'}</span>
        ${iconPosition === "right" && baseIconSvg ? `<span dangerouslySetInnerHTML={{__html: '${baseIconSvg.replace(/'/g, "\\'")}'}} style={{width:${spinnerSize}, height:${spinnerSize}, fill:'currentColor'}} />` : ""}
      </div>

      ${use3DIcon && use3DIcon !== "none" ? `<div style={{position:'absolute', inset:0, zIndex:1}}><Icon3D /></div>` : ""}
    </button>
  );
}
`;
    return { content, filename: `${base}.tsx` };
  }

  // --- Tailwind (Robust) ---
  if (downloadFormat === "tailwind") {
    // Generate an incredibly specific class string using arbitrary values to match the pixel-perfect design
    const cls = [
      `inline-flex items-${alignItems === "flex-start" ? "start" : alignItems === "flex-end" ? "end" : "center"} justify-${justify === "flex-start" ? "start" : justify === "flex-end" ? "end" : "center"}`,
      `w-[${touchWidth}px] h-[${touchHeight}px] px-[${padX}px] py-[${padY}px] gap-[${iconGapText}px]`,
      `font-['${fontFamily}'] text-[${fontSizeCss}] font-[${fontWeight}] tracking-[${letterSpacingCss}] text-[${textInput}]`,
      `bg-[${cssBg}] border-[${borderWidthPx}px] border-[${borderStyle}] border-[${borderInput}]`,
      `rounded-tl-[${rTL}px] rounded-tr-[${rTR}px] rounded-br-[${rBR}px] rounded-bl-[${rBL}px]`,
      `shadow-[${exportShadow.replace(/ /g, "_")}]`,
      backdropBlurEnabled ? `backdrop-blur-[${backdropBlurText}px]` : "",
      `transition-all duration-[${transitionColorMs}ms] ease-[${transitionColorEasing}]`,
      disabled
        ? `opacity-[${disabledOpacity}] cursor-${disabledCursor}`
        : "cursor-pointer",
      // Hover
      `hover:bg-[${cssHoverBg}] hover:text-[${cssHoverText}] hover:border-[${cssHoverBorder}] hover:shadow-[${exportHoverShadow.replace(/ /g, "_")}]`,
      hoverTransform
        ? `hover:[transform:${hoverTransform.replace(/ /g, "_")}]`
        : "",
      // Active
      `active:bg-[${cssActiveBg}] active:text-[${cssActiveText}] active:scale-[${activeScaleText}]`,
      // Focus
      focusRingEnabled
        ? `focus-visible:ring-[${focusRingWidthText}px] focus-visible:ring-offset-[${focusRingOffsetText}px] focus-visible:ring-[${focusRingInput}]`
        : "focus-visible:outline-none",
    ]
      .filter(Boolean)
      .join(" ");

    const content = `
<button class="${cls}">
  ${iconPosition === "left" && baseIconSvg ? `<span class="w-[${spinnerSize}px] h-[${spinnerSize}px]">${baseIconSvg}</span>` : ""}
  <span>${label}</span>
  ${iconPosition === "right" && baseIconSvg ? `<span class="w-[${spinnerSize}px] h-[${spinnerSize}px]">${baseIconSvg}</span>` : ""}
</button>`;
    return { content, filename: `${base}.html` };
  }

  // --- SCSS ---
  if (downloadFormat === "scss") {
    const content = `
.btn-action {
  display: inline-flex;
  align-items: ${alignItems}; justify-content: ${justify};
  width: ${touchWidth}px; height: ${touchHeight}px;
  padding: ${padY}px ${padX}px; gap: ${iconGapText}px;
  
  font-family: '${fontFamily}'; font-size: ${fontSizeCss}; font-weight: ${fontWeight};
  letter-spacing: ${letterSpacingCss};
  
  background: ${cssBg}; color: ${textInput};
  border: ${borderWidthPx}px ${borderStyle} ${borderInput};
  border-radius: ${rCSS};
  box-shadow: ${exportShadow};
  
  transition: ${transitionCss};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: ${cssHoverBg}; color: ${cssHoverText};
    border-color: ${cssHoverBorder};
    box-shadow: ${exportHoverShadow};
    ${hoverTransform ? `transform: ${hoverTransform};` : ""}
  }
  
  &:active:not(:disabled) {
    background: ${cssActiveBg}; color: ${cssActiveText};
    transform: scale(${activeScaleText});
  }
  
  &:disabled {
    opacity: ${disabledOpacity};
    cursor: ${disabledCursor};
  }
  
  ${
    parallaxHighlightEnabled
      ? `
  &::after {
    /* Parallax effect implementation would require JS offset calc */
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,${parallaxStrength}), transparent 60%);
  }`
      : ""
  }
}
`;
    return { content, filename: `${base}.scss` };
  }

  // --- CSS Vars ---
  if (downloadFormat === "css-vars") {
    const content = `
:root {
  --btn-w: ${touchWidth}px; --btn-h: ${touchHeight}px;
  --btn-pad: ${padY}px ${padX}px; --btn-gap: ${iconGapText}px;
  --btn-bg: ${cssBg}; --btn-col: ${textInput};
  --btn-border: ${borderWidthPx}px ${borderStyle} ${borderInput};
  --btn-radius: ${rCSS};
  --btn-font: ${fontSizeCss} '${fontFamily}';
  --btn-shadow: ${exportShadow};
  
  /* Hover Vars */
  --btn-hover-bg: ${cssHoverBg}; --btn-hover-col: ${cssHoverText};
  /* ... etc ... */
}

.btn {
  width: var(--btn-w); height: var(--btn-h);
  padding: var(--btn-pad); gap: var(--btn-gap);
  background: var(--btn-bg); color: var(--btn-col);
  border: var(--btn-border); border-radius: var(--btn-radius);
  font: var(--btn-font); box-shadow: var(--btn-shadow);
}
`;
    return { content, filename: `${base}.css` };
  }

  // --- Tokens ---
  if (downloadFormat === "figma-tokens") {
    const tokens = {
      button: {
        size: { width: { value: touchWidth }, height: { value: touchHeight } },
        padding: {
          top: { value: padY },
          right: { value: padX },
          bottom: { value: padY },
          left: { value: padX },
        },
        colors: {
          background: { value: cssBg },
          text: { value: textInput },
          border: { value: borderInput },
        },
        border: {
          width: { value: borderWidthPx },
          style: { value: borderStyle },
          radius: { value: rCSS },
        }, // Simplified radius
        typography: {
          fontFamily: { value: fontFamily },
          fontSize: { value: fontSizeValue },
          fontWeight: { value: fontWeight },
        },
        shadow: { value: exportShadow },
      },
    };
    const content = JSON.stringify(tokens, null, 2);
    return {
      content,
      filename: `${base}.json`,
    };
  }

  // --- Tailwind Config ---
  if (downloadFormat === "tailwind-config") {
    const config = {
      theme: {
        extend: {
          colors: { "btn-primary": cssBg, "btn-hover": cssHoverBg },
          boxShadow: { btn: exportShadow, "btn-hover": exportHoverShadow },
          borderRadius: { btn: rCSS },
          spacing: { "btn-w": `${touchWidth}px`, "btn-h": `${touchHeight}px` },
        },
      },
    };
    return {
      content: JSON.stringify(config, null, 2),
      filename: `tailwind.config.js`,
    };
  }

  // Fallback
  return {
    content: "<!-- Error: Format not supported -->",
    filename: `${base}.txt`,
  };
}
