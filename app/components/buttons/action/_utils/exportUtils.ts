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
  clickParticleCount: string;
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
    clickParticleCount,
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
  const jsString = (value: string) => JSON.stringify(value);

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
  const hideSpinner = loadingSpinnerMode === "none";
  const resolvedAriaLabel = ariaLabel || label;
  const resolvedLoadingLabel = loadingLabel || label;
  const hasLoadingVisual = Boolean(loadingIconSvg) || !hideSpinner;
  const hasInteractiveIcon = Boolean(baseIconSvg || hoverIconSvg || activeIconSvg);
  const particleCount = Number(clickParticleCount) || 50;
  const fontImportRule =
    fontBucket === "google"
      ? `@import url("https://fonts.googleapis.com/css2?family=${encodeURIComponent(googleFontFamily || "Inter")}:wght@100..900&display=swap");`
      : "";
  const animationClassName =
    animation === "pulse"
      ? "uif-btn--pulse"
      : animation === "float"
        ? "uif-btn--float"
        : animation === "subtle-pop"
          ? "uif-btn--subtle-pop"
          : "";
  const animationCss = `
        @keyframes uif-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.98); }
        }
        @keyframes uif-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes uif-subtle-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .uif-btn--pulse { animation: uif-pulse 2s infinite; }
        .uif-btn--float { animation: uif-float 3s ease-in-out infinite; }
        .uif-btn--subtle-pop { animation: uif-subtle-pop 0.3s ease-out backwards; }
  `;

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
${fontImportRule}

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
${hoverEnabled ? `.uf-btn:hover:not(:disabled) {
  background: ${cssHoverBg}; color: ${cssHoverText};
  border-color: ${cssHoverBorder};
  box-shadow: ${exportHoverShadow};
  filter: ${cssHoverFilter || "none"};
  ${hoverTransform ? `transform: ${hoverTransform};` : ""}
}` : ""}

/* Active State */
${activeEnabled ? `.uf-btn:active:not(:disabled) {
  background: ${cssActiveBg}; color: ${cssActiveText};
  border-color: ${cssActiveBorder};
  box-shadow: ${exportActiveShadow};
  filter: ${cssActiveFilter || "none"};
  transform: translateY(${activeTranslateYText}px) scale(${activeScaleText});
}` : ""}

/* Focus State */
.uf-btn:focus-visible { outline: none; box-shadow: ${focusRing}; }

/* Icons & content z-index */
.uf-btn > * { position: relative; z-index: 1; pointer-events: none; }

/* Icon switching */
.uf-icon-hover, .uf-icon-active, .uf-icon-loading { display: none; }
${hoverEnabled ? `.uf-btn:hover:not(:disabled) .uf-icon-base { display: ${hasMultipleIcons ? "none" : "inline-flex"}; }
.uf-btn:hover:not(:disabled) .uf-icon-hover { display: inline-flex; }` : ""}
${activeEnabled ? `.uf-btn:active:not(:disabled) .uf-icon-base { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-hover { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-active { display: inline-flex; }` : ""}

/* Parallax Overlay */
.uf-btn::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(circle at var(--uf-highlight-x) var(--uf-highlight-y), rgba(255,255,255,var(--uf-highlight-op)), transparent 60%);
  border-radius: inherit;
}

/* Animations */
${animation === "pulse" ? "@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.98); } } .uf-btn { animation: pulse 2s infinite; }" : ""}
${animation === "float" ? "@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } } .uf-btn { animation: float 3s ease-in-out infinite; }" : ""}
${animation === "subtle-pop" ? "@keyframes subtle-pop { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } } .uf-btn { animation: subtle-pop 0.3s ease-out backwards; }" : ""}
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
    const imports = [
      "import React, { useRef, useState } from 'react';",
      use3DIcon && use3DIcon !== "none"
        ? "import { Canvas, useFrame } from '@react-three/fiber';\nimport { Float, MeshDistortMaterial } from '@react-three/drei';"
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const icon3D =
      use3DIcon && use3DIcon !== "none"
        ? `
function Icon3D() {
  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

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
  );
}
`
        : "";

    const content = `${imports}

${icon3D}

export default function ActionButton({
  onClick = () => {},
  disabled = ${disabled},
  loading = ${loading},
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const btnRef = useRef(null);
  const hoverStylesEnabled = ${hoverEnabled};
  const activeStylesEnabled = ${activeEnabled};
  const ariaPressed = ${jsString(ariaPressedMode)} === "true"
    ? true
    : ${jsString(ariaPressedMode)} === "false"
      ? false
      : undefined;
  const ariaBusy = ${jsString(ariaBusyMode)} === "auto"
    ? (loading ? true : undefined)
    : ${jsString(ariaBusyMode)} === "true"
      ? true
      : ${jsString(ariaBusyMode)} === "false"
        ? false
        : undefined;
  const baseIconSvg = ${jsString(baseIconSvg || "")};
  const hoverIconSvg = ${jsString(hoverIconSvg || "")};
  const activeIconSvg = ${jsString(activeIconSvg || "")};
  const loadingIconSvg = ${jsString(loadingIconSvg || "")};
  const resolvedSpinnerSvg = ${jsString(exportSpinnerSvg)};
  const isDisabled = disabled || loading;

  const handleMouseMove = (e) => {
    if (!btnRef.current || !${parallaxHighlightEnabled}) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty("--x", x + "px");
    btnRef.current.style.setProperty("--y", y + "px");
  };

  const getDynamicStyles = () => {
    if (isDisabled) {
      return {
        background: ${jsString(cssDisabledBg)},
        color: ${jsString(cssDisabledText)},
        borderColor: ${jsString(cssDisabledBorder)},
        borderWidth: "${disabledBorderWidthPx}px",
        boxShadow: ${jsString(exportShadow)},
        textShadow: ${jsString(disabledTextShadowCss)},
        transform: "none",
      };
    }

    if (activeStylesEnabled && isActive) {
      return {
        background: ${jsString(cssActiveBg)},
        color: ${jsString(cssActiveText)},
        borderColor: ${jsString(cssActiveBorder)},
        borderWidth: "${activeBorderWidthPx}px",
        boxShadow: ${jsString(exportActiveShadow)},
        textShadow: ${jsString(textShadowCss)},
        transform: "translateY(${activeTranslateYText}px) scale(${activeScaleText})",
      };
    }

    if (hoverStylesEnabled && isHovered) {
      return {
        background: ${jsString(cssHoverBg)},
        color: ${jsString(cssHoverText)},
        borderColor: ${jsString(cssHoverBorder)},
        borderWidth: "${hoverBorderWidthPx}px",
        boxShadow: ${jsString(exportHoverShadow)},
        textShadow: ${jsString(textShadowCss)},
        transform: ${jsString(hoverTransform || "none")},
      };
    }

    return {
      background: ${jsString(cssBg)},
      color: ${jsString(textInput)},
      borderColor: ${jsString(borderInput)},
      borderWidth: "${borderWidthPx}px",
      boxShadow: ${jsString(exportShadow)},
      textShadow: ${jsString(textShadowCss)},
      transform: "none",
    };
  };

  const triggerClickEffect = async (event) => {
    if (isDisabled || ${jsString(clickEffect)} === "none") return;

    if (${jsString(clickEffect)} === "ripple") {
      const node = btnRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "uif-ripple";
      ripple.style.left = event.clientX - rect.left + "px";
      ripple.style.top = event.clientY - rect.top + "px";
      node.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
      return;
    }

    if (${jsString(clickEffect)} === "confetti" || ${jsString(clickEffect)} === "explosion") {
      const { default: confetti } = await import("canvas-confetti");
      const rect = btnRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: ${particleCount},
        spread: ${jsString(clickEffect)} === "explosion" ? 160 : 70,
        startVelocity: ${jsString(clickEffect)} === "explosion" ? 60 : 30,
        origin: { x, y },
        gravity: ${jsString(clickEffect)} === "explosion" ? 1.2 : 0.6,
        scalar: ${jsString(clickEffect)} === "explosion" ? 1.2 : 1,
        drift: ${jsString(clickEffect)} === "explosion" ? 0.5 : 0,
        ticks: ${jsString(clickEffect)} === "explosion" ? 300 : 200,
        colors: ${jsString(clickEffect)} === "explosion"
          ? ["#FF0000", "#FFD700", "#FF4500", "#FFFFFF"]
          : undefined,
      });
    }
  };

  const baseStyle = {
    position: "relative",
    display: "inline-flex",
    alignItems: "${alignItems}",
    justifyContent: "${justify}",
    width: "${touchWidth}px",
    height: "${touchHeight}px",
    padding: "${padY}px ${padX}px",
    gap: "${spinnerGap}px",
    cursor: loading ? "wait" : disabled ? "${disabledCursor}" : "pointer",
    opacity: disabled ? ${disabledOpacity} : 1,
    outline: "none",
    borderStyle: "${borderStyle}",
    borderRadius: "${rCSS}",
    fontFamily: "${fontFamily}",
    fontSize: "${fontSizeCss}",
    fontWeight: ${fontWeight},
    fontStyle: "${fontStyle}",
    textTransform: "${textTransform}",
    textDecoration: "${underline ? "underline" : "none"}",
    letterSpacing: "${letterSpacingCss}",
    lineHeight: ${lHeight},
    transition: "${transitionCss}",
    overflow: "hidden",
    userSelect: "none",
    boxSizing: "border-box",
    backdropFilter: "${backdropFilterCss}",
    WebkitBackdropFilter: "${backdropFilterCss}",
  };

  const focusStyle = isFocused && ${focusRingEnabled} ? {
    boxShadow: getDynamicStyles().boxShadow + ", 0 0 0 ${focusRingOffsetText}px ${previewBgHex}, 0 0 0 calc(${focusRingOffsetText}px + ${focusRingWidthText}px) ${focusRingInput}"
  } : {};

  const combinedStyle = { ...baseStyle, ...getDynamicStyles(), ...focusStyle };

  return (
    <>
      <style>{\`
        ${fontImportRule}
        ${animationCss}
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.45; }
          100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        .uif-parallax-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,${parallaxOpacity}), transparent 40%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .uif-ripple {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: currentColor;
          opacity: 0.3;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: ripple 0.65s ease-out forwards;
        }
        .uif-btn:hover .uif-parallax-glow { opacity: 1; }
      \`}</style>

      <button
        ref={btnRef}
        className={\`uif-btn ${animationClassName} \${className}\`.trim()}
        style={combinedStyle}
        disabled={isDisabled}
        onMouseEnter={() => !isDisabled && hoverStylesEnabled && setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
        onMouseDown={() => !isDisabled && activeStylesEnabled && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          if (isDisabled) return;
          onClick(e);
          void triggerClickEffect(e);
        }}
        aria-label=${jsString(resolvedAriaLabel)}
        aria-pressed={ariaPressed}
        aria-busy={ariaBusy}
      >
        {${parallaxHighlightEnabled} && <div className="uif-parallax-glow" />}
        {${exportTopGradient !== "none"} && (
          <div style={{ position: "absolute", inset: 0, background: ${jsString(exportTopGradient)}, pointerEvents: "none", mixBlendMode: "overlay" }} />
        )}

        <div style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "inherit",
          flexDirection: "${(loading && !hideSpinner ? loadingSpinnerPosition : iconPosition) === "right" ? "row-reverse" : "row"}",
        }}>
          {(loading && ${hasLoadingVisual}) || ${hasInteractiveIcon} ? (
            <span style={{
              fontSize: "${spinnerSize}px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: ${jsString(iconEmbossCss)},
              width: "${spinnerSize}px",
              height: "${spinnerSize}px",
            }}>
              {loading ? (
                loadingIconSvg ? (
                  <span style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: loadingIconSvg }} />
                ) : ${hideSpinner} ? null : (
                  <span style={{ display: "flex", animation: "spin 1s linear infinite" }} dangerouslySetInnerHTML={{ __html: resolvedSpinnerSvg }} />
                )
              ) : (
                <span
                  style={{ display: "flex" }}
                  dangerouslySetInnerHTML={{
                    __html: activeStylesEnabled && isActive
                      ? (activeIconSvg || baseIconSvg)
                      : hoverStylesEnabled && isHovered
                        ? (hoverIconSvg || baseIconSvg)
                        : baseIconSvg,
                  }}
                />
              )}
            </span>
          ) : null}

          <span style={{ whiteSpace: "nowrap" }}>
            {loading ? ${jsString(resolvedLoadingLabel)} : ${jsString(label)}}
          </span>
        </div>

        ${use3DIcon && use3DIcon !== "none" ? `{<div style={{ position: "absolute", inset: 0, zIndex: 0 }}><Icon3D /></div>}` : ""}
      </button>
    </>
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
