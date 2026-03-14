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
  use3DIcon: string;
  icon3DAnimation: string;
  clickEffect: string;
  confetti: boolean;
  ripple: boolean;
};

export function buildExportPayload(payload: ExportPayloadInput) {
  const {
    downloadFormat,
    downloadName,
    label,
    loading,
    loadingLabel,
    loadingSpinnerSvg,
    loadingSpinnerPosition,
    loadingSpinnerMode,
    baseIconSvg,
    hoverIconSvg,
    activeIconSvg,
    loadingIconSvg,
    iconPosition,
    iconSizeText,
    iconGapText,
    cssBg,
    cssHoverBg,
    cssActiveBg,
    cssDisabledBg,
    textInput,
    cssHoverText,
    cssActiveText,
    cssDisabledText,
    borderInput,
    cssHoverBorder,
    cssActiveBorder,
    cssDisabledBorder,
    borderWidthPx,
    hoverBorderWidthPx,
    activeBorderWidthPx,
    disabledBorderWidthPx,
    borderStyle,
    rTL,
    rTR,
    rBR,
    rBL,
    padX,
    padY,
    fontSizeValue,
    fontSizeUnit,
    fontWeight,
    fontFamily,
    lHeight,
    letterSpacingValue,
    letterSpacingUnit,
    fontStyle,
    textTransform,
    underline,
    boxShadowCss,
    boxShadowHoverCss,
    boxShadowActiveCss,
    transitionColorMs,
    transitionColorEasing,
    transitionTransformMs,
    transitionTransformEasing,
    textShadowEnabled,
    tsXText,
    tsYText,
    tsBlurText,
    tsColor,
    disabledOpacity,
    disabledCursor,
    disabledTextShadowCss,
    disabledHoverSuppressed,
    focusRingEnabled,
    focusRingWidthText,
    focusRingOffsetText,
    focusRingInput,
    ariaLabel,
    topGradientCss,
    parallaxHighlightEnabled,
    parallaxStrength,
    iconEmbossFilter,
    hoverTiltX,
    hoverTiltY,
    hoverPerspective,
    backdropBlurEnabled,
    backdropBlurText,
    touchWidth,
    touchHeight,
    align,
    googleFontFamily,
    fontBucket,
    animation,
    clickEffect,
    activeTranslateYText,
    activeScaleText,
    disabled,
  } = payload;

  const base = sanitizeFilenameBase(downloadName || "action-button");
  const ext = downloadFormat === "react" ? "tsx" : "html";
  const filename = `${base}.${ext}`;

  // Helper values to avoid backtick nesting and complex logic in template
  const borderVal = borderStyle === "none" ? "none" : `${borderWidthPx}px ${borderStyle} ${borderInput}`;
  const alignH = align.includes("left") ? "flex-start" : align.includes("right") ? "flex-end" : "center";
  const alignV = align.startsWith("top") ? "flex-start" : align.startsWith("bottom") ? "flex-end" : "center";
  const textShadowVal = textShadowEnabled ? `${tsXText}px ${tsYText}px ${tsBlurText}px ${tsColor}` : "none";
  const fontImport = fontBucket === "google" 
    ? `@import url('https://fonts.googleapis.com/css2?family=${googleFontFamily.replace(/ /g, "+")}:wght@100..900&display=swap');` 
    : "";

  // Loader Logic
  const defaultSpinner = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  const resolvedSpinnerSvg = (loadingSpinnerMode === 'custom' && loadingSpinnerSvg) ? loadingSpinnerSvg : defaultSpinner;
  const hideSpinner = loadingSpinnerMode === 'none';
  const finalIconPosition = (loading && !hideSpinner) ? loadingSpinnerPosition : iconPosition;

  if (downloadFormat === "react") {
    const content = `import React, { useState, useRef } from 'react';

/**
 * ActionButton Component
 * Generated by UI Foundry
 */

${fontImport}

export default function ActionButton({ 
  onClick = () => {}, 
  disabled = ${disabled}, 
  loading = ${loading},
  className = "" 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current || !${parallaxHighlightEnabled}) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--x', x + 'px');
    btnRef.current.style.setProperty('--y', y + 'px');
  };

  const isDisabled = disabled || loading;

  const getDynamicStyles = () => {
    if (isDisabled) {
      return {
        background: '${cssDisabledBg}',
        color: '${cssDisabledText}',
        borderColor: '${cssDisabledBorder}',
        borderWidth: '${disabledBorderWidthPx}px',
        boxShadow: '${boxShadowCss}',
        textShadow: '${disabledTextShadowCss}',
        transform: 'none',
      };
    }

    if (isActive) {
      return {
        background: '${cssActiveBg}',
        color: '${cssActiveText}',
        borderColor: '${cssActiveBorder}',
        borderWidth: '${activeBorderWidthPx}px',
        boxShadow: '${boxShadowActiveCss}',
        textShadow: '${textShadowVal}',
        transform: 'translateY(${activeTranslateYText}px) scale(${activeScaleText})',
      };
    }

    if (isHovered) {
      return {
        background: '${cssHoverBg}',
        color: '${cssHoverText}',
        borderColor: '${cssHoverBorder}',
        borderWidth: '${hoverBorderWidthPx}px',
        boxShadow: '${boxShadowHoverCss}',
        textShadow: '${textShadowVal}',
        transform: 'perspective(${hoverPerspective}px) rotateX(' + (isHovered ? ${hoverTiltY} : 0) + 'deg) rotateY(' + (isHovered ? ${hoverTiltX} : 0) + 'deg)',
      };
    }

    return {
      background: '${cssBg}',
      color: '${textInput}',
      borderColor: '${borderInput}',
      borderWidth: '${borderWidthPx}px',
      boxShadow: '${boxShadowCss}',
      textShadow: '${textShadowVal}',
      transform: 'none',
    };
  };

  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: '${alignV}',
    justifyContent: '${alignH}',
    width: '${touchWidth}px',
    height: '${touchHeight}px',
    padding: '${padY}px ${padX}px',
    gap: '${iconGapText}px',
    cursor: loading ? 'wait' : disabled ? '${disabledCursor}' : 'pointer',
    opacity: disabled ? ${disabledOpacity} : 1,
    outline: 'none',
    borderStyle: '${borderStyle}',
    borderRadius: '${rTL}px ${rTR}px ${rBR}px ${rBL}px',
    fontFamily: '${fontFamily}',
    fontSize: '${fontSizeValue}${fontSizeUnit}',
    fontWeight: ${fontWeight},
    fontStyle: '${fontStyle}',
    textTransform: '${textTransform}',
    textDecoration: '${underline ? "underline" : "none"}',
    letterSpacing: '${letterSpacingValue}${letterSpacingUnit}',
    lineHeight: ${lHeight},
    transition: 'all ${transitionColorMs}ms ${transitionColorEasing}, transform ${transitionTransformMs}ms ${transitionTransformEasing}',
    overflow: 'hidden',
    userSelect: 'none',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
  };

  const focusStyle = isFocused && ${focusRingEnabled} ? {
    boxShadow: getDynamicStyles().boxShadow + ', 0 0 0 ${focusRingOffsetText}px #fff, 0 0 0 ' + (${Number(focusRingOffsetText)} + ${Number(focusRingWidthText)}) + 'px ${focusRingInput}'
  } : {};

  const combinedStyle = { ...baseStyle, ...getDynamicStyles(), ...focusStyle };

  return (
    <>
      <style>{\`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .uif-parallax-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,${parallaxStrength}), transparent 40%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .uif-btn:hover .uif-parallax-glow { opacity: 1; }
        \${${backdropBlurEnabled} ? \`.uif-btn { backdrop-filter: blur(${backdropBlurText}px); }\` : ''}
      \`}</style>
      
      <button
        ref={btnRef}
        className={\`uif-btn \${className}\`}
        style={combinedStyle}
        disabled={isDisabled}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
        onMouseDown={() => !isDisabled && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseMove={handleMouseMove}
        onClick={(e) => !isDisabled && onClick(e)}
        aria-label="${ariaLabel || label}"
      >
        {${parallaxHighlightEnabled} && <div className="uif-parallax-glow" />}
        {${topGradientCss !== "none"} && (
          <div style={{ position: 'absolute', inset: 0, background: '${topGradientCss}', pointerEvents: 'none', mixBlendMode: 'overlay' }} />
        )}

        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'inherit', 
          flexDirection: '${finalIconPosition === "right" ? "row-reverse" : "row"}' 
        }}>
          {/* Icon/Spinner Section */}
          {(loading && !${hideSpinner}) || ${!!(baseIconSvg || hoverIconSvg || activeIconSvg)} ? (
             <span style={{ 
               fontSize: '${iconSizeText}px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               filter: '${iconEmbossFilter}',
               width: '${iconSizeText}px',
               height: '${iconSizeText}px'
             }}>
               {loading ? (
                 <span style={{ display: 'flex', animation: 'spin 1s linear infinite' }} dangerouslySetInnerHTML={{ __html: \`${resolvedSpinnerSvg}\` }} />
               ) : (
                 <span style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: isActive ? \`${activeIconSvg || baseIconSvg}\` : isHovered ? \`${hoverIconSvg || baseIconSvg}\` : \`${baseIconSvg}\` }} />
               )}
             </span>
          ) : null}
          
          {/* Label Section */}
          <span style={{ whiteSpace: 'nowrap' }}>
            {loading ? '${loadingLabel || label}' : '${label}'}
          </span>
        </div>
      </button>
    </>
  );
}
`;
    return { content, filename };
  }

  // HTML/CSS Fallback
  const content = `<!DOCTYPE html>
<html>
<head>
  <style>
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .uif-btn {
      position: relative;
      display: inline-flex;
      align-items: ${alignV};
      justify-content: ${alignH};
      width: ${touchWidth}px;
      height: ${touchHeight}px;
      padding: ${padY}px ${padX}px;
      gap: ${iconGapText}px;
      cursor: ${disabled ? disabledCursor : "pointer"};
      opacity: ${disabled ? disabledOpacity : 1};
      border: ${borderVal};
      border-radius: ${rTL}px ${rTR}px ${rBR}px ${rBL}px;
      background: ${cssBg};
      color: ${textInput};
      font-family: '${fontFamily}', sans-serif;
      font-size: ${fontSizeValue}${fontSizeUnit};
      font-weight: ${fontWeight};
      transition: all ${transitionColorMs}ms ${transitionColorEasing};
      overflow: hidden;
    }
  </style>
</head>
<body>
  <button class="uif-btn">${label}</button>
</body>
</html>`;

  return { content, filename };
}
