"use client";

import type { DownloadFormat } from "../_section/PreviewDownloadPanel";
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
};

export function buildExportPayload(params: ExportPayloadInput) {
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
  } = params;

  let content = "";
  const ext =
    downloadFormat === "react"
      ? "jsx"
      : downloadFormat === "css-vars"
      ? "css"
      : downloadFormat === "tailwind-config"
      ? "js"
      : downloadFormat === "figma-tokens"
      ? "json"
      : downloadFormat;
  const rawBase = sanitizeFilenameBase(downloadName);
  const base =
    rawBase.replace(/\.(html|jsx|tailwind|css|scss|js|json)$/i, "") || "button";
  const filename = `${base}.${ext}`;
  const exportWidth = touchWidth;
  const exportHeight = touchHeight;
  const fontSizeCss = `${fontSizeValue}${fontSizeUnit}`;
  const letterSpacingCss = `${letterSpacingValue}${letterSpacingUnit}`;
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
  const tsX = Number(tsXText) || 0;
  const tsY = Number(tsYText) || 0;
  const tsBlur = Number(tsBlurText) || 0;
  const textShadowCss = textShadowEnabled
    ? `${tsX}px ${tsY}px ${tsBlur}px ${tsColor}`
    : "none";
  const transitionCss = `background ${transitionColorMs}ms ${transitionColorEasing}, color ${transitionColorMs}ms ${transitionColorEasing}, border-color ${transitionColorMs}ms ${transitionColorEasing}, filter ${transitionColorMs}ms ${transitionColorEasing}, box-shadow ${transitionColorMs}ms ${transitionColorEasing}, transform ${transitionTransformMs}ms ${transitionTransformEasing}, border-width ${transitionTransformMs}ms ${transitionTransformEasing}`;
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
  const hoverTransform =
    hoverTiltX || hoverTiltY
      ? `perspective(${hoverPerspective}px) rotateX(${hoverTiltX}deg) rotateY(${hoverTiltY}deg)`
      : "";
  const exportTopGradient =
    topGradientCss && topGradientCss !== "none" ? topGradientCss : "none";
  const parallaxOpacity = parallaxHighlightEnabled
    ? Math.max(0, Math.min(1, Number(parallaxStrength) || 0))
    : 0;
  const iconEmbossCss = iconEmbossFilter || "none";
  const loadingLabelText = loadingLabel || "Loading...";
  const spinnerSize = Number(iconSizeText) || 18;
  const spinnerGap = Number(iconGapText) || 10;
  const defaultSpinnerSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  const exportSpinnerSvg =
    loadingSpinnerMode === "custom" && loadingSpinnerSvg
      ? loadingSpinnerSvg
      : loadingSpinnerMode === "none"
      ? ""
      : defaultSpinnerSvg;
  const spinnerWrap = exportSpinnerSvg
    ? `<span class="uf-spinner-wrap" style="width:${spinnerSize}px;height:${spinnerSize}px;${
        loadingSpinnerPosition === "left"
          ? `margin-right:${spinnerGap}px;`
          : `margin-left:${spinnerGap}px;`
      }">${exportSpinnerSvg}</span>`
    : "";
  const labelHtml = `<span class="uf-label">${
    loading ? loadingLabelText : label
  }</span>`;
  const exportBaseIconSvg = baseIconSvg;
  const exportHoverIconSvg = hoverIconSvg;
  const exportActiveIconSvg = activeIconSvg;
  const exportLoadingIconSvg = loadingIconSvg;
  const hasBaseIcon =
    iconSource === "custom"
      ? Boolean(exportBaseIconSvg.trim())
      : iconName !== "none";
  const hasHoverIcon = Boolean(exportHoverIconSvg && exportHoverIconSvg.trim());
  const hasActiveIcon = Boolean(
    exportActiveIconSvg && exportActiveIconSvg.trim()
  );
  const hasLoadingIcon = Boolean(
    exportLoadingIconSvg && exportLoadingIconSvg.trim()
  );
  const iconColor =
    iconColorMode === "custom" ? iconColorInput : "currentColor";
  const renderIconSpan = (
    state: string,
    svg: string,
    position: "left" | "right"
  ) =>
    svg
      ? `<span class="uf-icon-wrap uf-icon-${state} ${position}" style="width:${spinnerSize}px;height:${spinnerSize}px;${
          position === "left"
            ? `margin-right:${spinnerGap}px;`
            : `margin-left:${spinnerGap}px;`
        }color:${iconColor};">${svg}</span>`
      : "";
  const iconWrapLeft =
    iconPosition === "left"
      ? `${renderIconSpan("base", exportBaseIconSvg, "left")}${renderIconSpan(
          "hover",
          exportHoverIconSvg,
          "left"
        )}${renderIconSpan("active", exportActiveIconSvg, "left")}`
      : "";
  const iconWrapRight =
    iconPosition === "right"
      ? `${renderIconSpan("base", exportBaseIconSvg, "right")}${renderIconSpan(
          "hover",
          exportHoverIconSvg,
          "right"
        )}${renderIconSpan("active", exportActiveIconSvg, "right")}`
      : "";
  const loadingIconWrap = hasLoadingIcon
    ? renderIconSpan(
        "loading",
        exportLoadingIconSvg,
        iconPosition === "right" ? "right" : "left"
      )
    : "";
  const useLoadingIcon = loading && hasLoadingIcon;
  const buttonInnerHtml = loading
    ? useLoadingIcon
      ? iconPosition === "right"
        ? `${labelHtml}${loadingIconWrap}`
        : `${loadingIconWrap}${labelHtml}`
      : loadingSpinnerPosition === "right"
      ? `${labelHtml}${spinnerWrap}`
      : `${spinnerWrap}${labelHtml}`
    : `${iconWrapLeft}${labelHtml}${iconWrapRight}`;
  const exportDisabled = disabled || loading;
  const exportSpinnerSvgLiteral = JSON.stringify(exportSpinnerSvg);
  const exportLoadingLabelLiteral = JSON.stringify(loadingLabelText);
  const exportBaseIconSvgLiteral = JSON.stringify(exportBaseIconSvg);
  const exportHoverIconSvgLiteral = JSON.stringify(exportHoverIconSvg);
  const exportActiveIconSvgLiteral = JSON.stringify(exportActiveIconSvg);
  const exportLoadingIconSvgLiteral = JSON.stringify(exportLoadingIconSvg);
  const exportHasIconLiteral = JSON.stringify(hasBaseIcon);
  const exportHasHoverIconLiteral = JSON.stringify(hasHoverIcon);
  const exportHasActiveIconLiteral = JSON.stringify(hasActiveIcon);
  const exportHasLoadingIconLiteral = JSON.stringify(hasLoadingIcon);
  const exportIconColorLiteral = JSON.stringify(iconColor);
  const safeFontFamily =
    fontFamily || (fontBucket === "system" ? "sans-serif" : googleFontFamily);
  const googleFamilyParam = encodeURIComponent(googleFontFamily || "Inter");
  const fontImport =
    fontBucket === "system"
      ? ""
      : `@import url("https://fonts.googleapis.com/css2?family=${googleFamilyParam}:wght@100..900&display=swap");`;
  const focusRingWidth = focusRingEnabled ? focusRingWidthText : "0";
  const focusRingOffset = focusRingEnabled ? focusRingOffsetText : "0";
  const focusRingColor = focusRingEnabled ? focusRingInput : "transparent";
  const focusShadowBase = exportShadow === "none" ? "" : `${exportShadow}, `;
  const focusBoxShadow = `${focusShadowBase}0 0 0 ${focusRingOffset}px ${previewBgHex}, 0 0 0 calc(${focusRingOffset}px + ${focusRingWidth}px) ${focusRingColor}`;
  const focusCss = `
.uf-btn:focus-visible {
  outline: none;
  box-shadow: ${focusBoxShadow};
}`.trim();
  const hoverFilter = cssHoverFilter || "none";
  const hoverTransformCss = hoverTransform
    ? `\n  transform: ${hoverTransform};`
    : "";
  const animationValue =
    animation === "pulse"
      ? "pulse 2s infinite"
      : animation === "float"
      ? "float 3s ease-in-out infinite"
      : animation === "subtle-pop"
      ? "subtle-pop 0.3s ease-out backwards"
      : "";
  const animationCss = animationValue
    ? `
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; transform: scale(0.98); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
@keyframes subtle-pop { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
`.trim()
    : "";

  // Radius string for export
  const rCSS = `${rTL}px ${rTR}px ${rBR}px ${rBL}px`;

  const backdropFilterCss =
    backdropBlurEnabled && backdropBlurText
      ? `blur(${backdropBlurText}px)`
      : "none";

  // Map Alignment
  const exportMap: Record<string, [string, string]> = {
    "top-left": ["flex-end", "flex-start"],
    "top-center": ["flex-end", "center"],
    "top-right": ["flex-end", "flex-end"],
    "middle-left": ["center", "flex-start"],
    "middle-center": ["center", "center"],
    "middle-right": ["center", "flex-end"],
    "bottom-left": ["flex-start", "flex-start"],
    "bottom-center": ["flex-start", "center"],
    "bottom-right": ["flex-start", "flex-end"],
  };
  const [alignItems, justify] = exportMap[align] || ["center", "center"];

  // Construct Hover/Active CSS
  const hoverCSS = hoverEnabled
    ? `
.uf-btn:hover:not(:disabled) {
  background: ${cssHoverBg};
  color: ${cssHoverText};
  border-color: ${cssHoverBorder};
  border-width: ${hoverBorderWidthPx}px;
  filter: ${hoverFilter};
  box-shadow: ${exportHoverShadow};${hoverTransformCss}
}`.trim()
    : "";
  const activeCSS = activeEnabled
    ? `
.uf-btn:active:not(:disabled) {
  background: ${cssActiveBg};
  color: ${cssActiveText};
  border-color: ${cssActiveBorder};
  border-width: ${activeBorderWidthPx}px;
  filter: ${cssActiveFilter};
  transform: translateY(${activeTranslateYText}px) scale(${activeScaleText});
  box-shadow: ${exportActiveShadow};
}`.trim()
    : "";
  const disabledHoverCSS = disabledHoverSuppressed
    ? `
.uf-btn.suppress-hover:hover {
  background: ${cssDisabledBg};
  color: ${cssDisabledText};
  border-color: ${cssDisabledBorder};
  border-width: ${disabledBorderWidthPx}px;
  filter: none;
}`.trim()
    : "";
  const hoverIconCss = hoverEnabled
    ? `
.uf-btn:hover:not(:disabled) .uf-icon-base { display: none; }
.uf-btn:hover:not(:disabled) .uf-icon-hover { display: inline-flex; }
`
    : "";
  const activeIconCss = activeEnabled
    ? `
.uf-btn:active:not(:disabled) .uf-icon-hover { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-base { display: none; }
.uf-btn:active:not(:disabled) .uf-icon-active { display: inline-flex; }
`
    : "";
  const parallaxScript =
    parallaxOpacity > 0
      ? `
<script>
  (function() {
    const btn = document.querySelector('.uf-btn');
    if (!btn) return;
    const strength = ${parallaxOpacity};
    const reset = () => {
      btn.style.setProperty('--uf-btn-light-x', '0px');
      btn.style.setProperty('--uf-btn-light-y', '0px');
      btn.style.setProperty('--uf-btn-parallax-opacity', '0');
    };
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = e.clientX - rect.left - rect.width / 2;
      const ny = e.clientY - rect.top - rect.height / 2;
      const maxShift = Math.min(rect.width, rect.height) * 0.35 * strength;
      const shiftX = Math.max(-maxShift, Math.min(maxShift, nx));
      const shiftY = Math.max(-maxShift, Math.min(maxShift, ny));
      btn.style.setProperty('--uf-btn-light-x', Math.round(shiftX) + 'px');
      btn.style.setProperty('--uf-btn-light-y', Math.round(shiftY) + 'px');
      btn.style.setProperty('--uf-btn-parallax-opacity', String(strength));
    });
    btn.addEventListener('mouseleave', reset);
  })();
</script>
`
      : "";

  if (downloadFormat === "html") {
    content = `
<button class="uf-btn${useLoadingIcon ? " is-loading" : ""}${
      disabledHoverSuppressed && exportDisabled ? " suppress-hover" : ""
    }"${exportDisabled ? " disabled" : ""}${ariaAttr}>
  ${buttonInnerHtml}
</button>

<style>
${fontImport}
.uf-btn {
  width: ${exportWidth}px; height: ${exportHeight}px;
  padding: ${padY}px ${padX}px;
  border-radius: ${rCSS};
  display: inline-flex;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  --uf-btn-top-gradient: ${exportTopGradient};
  --uf-btn-parallax-opacity: 0;
  --uf-btn-light-x: 0px;
  --uf-btn-light-y: 0px;
  --uf-icon-emboss-filter: ${iconEmbossCss};
  align-items: ${alignItems}; justify-content: ${justify};
  background: ${cssBg};
  color: ${textInput};
  border: ${borderWidthPx}px ${borderStyle} ${borderInput};
  font-family: ${safeFontFamily};
  font-size: ${fontSizeCss};
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-transform: ${textTransform};
  letter-spacing: ${letterSpacingCss};
  line-height: ${lHeight};
  text-shadow: ${textShadowCss};
  box-shadow: ${exportShadow};
  transform-style: preserve-3d;
  backdrop-filter: ${backdropFilterCss};
  -webkit-backdrop-filter: ${backdropFilterCss};
  ${animationValue ? `animation: ${animationValue};` : ""}
  cursor: pointer;
  transition: ${transitionCss};
  text-decoration: ${underline ? "underline" : "none"};
}
.uf-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--uf-btn-top-gradient);
  pointer-events: none;
  z-index: 0;
}
.uf-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at calc(50% + var(--uf-btn-light-x)) calc(20% + var(--uf-btn-light-y)),
    rgba(255, 255, 255, var(--uf-btn-parallax-opacity)),
    rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
  z-index: 0;
}
.uf-btn > * {
  position: relative;
  z-index: 1;
}
.uf-icon-wrap { filter: var(--uf-icon-emboss-filter); }
.uf-spinner-wrap { filter: var(--uf-icon-emboss-filter); }
.uf-spinner-wrap { filter: var(--uf-icon-emboss-filter); }
${focusCss}
.uf-btn:disabled {
  background: ${cssDisabledBg};
  color: ${cssDisabledText};
  border-color: ${cssDisabledBorder};
  border-width: ${disabledBorderWidthPx}px;
  text-shadow: ${disabledTextShadowCss};
  opacity: ${disabledOpacity};
  cursor: ${disabledCursor};
}
.uf-spinner-wrap svg {
  display: block;
  width: 100%;
  height: 100%;
  animation: spin 0.8s linear infinite;
}
.uf-icon-wrap svg {
  display: block;
  width: 100%;
  height: 100%;
}
.uf-icon-hover,
.uf-icon-active,
.uf-icon-loading {
  display: none;
}
${hoverIconCss}
${activeIconCss}
.uf-btn.is-loading .uf-icon-base,
.uf-btn.is-loading .uf-icon-hover,
.uf-btn.is-loading .uf-icon-active { display: none; }
.uf-btn.is-loading .uf-icon-loading { display: inline-flex; }
@keyframes spin { to { transform: rotate(360deg); } }
${animationCss}
${hoverCSS}
${disabledHoverCSS}
${activeCSS}
</style>
${parallaxScript}`;
  } else if (downloadFormat === "react") {
    content = `
import React, { useState } from 'react';

export const CustomButton = ({ onClick, disabled = false, loading = false }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const isDisabled = disabled || loading;
  const defaultLabel = ${JSON.stringify(label)};
  const loadingLabel = ${exportLoadingLabelLiteral};
  const spinnerSvg = ${exportSpinnerSvgLiteral};
  const spinnerPosition = "${loadingSpinnerPosition}";
  const spinnerGap = ${spinnerGap};
  const spinnerSize = ${spinnerSize};
  const baseIconSvg = ${exportBaseIconSvgLiteral};
  const hoverIconSvg = ${exportHoverIconSvgLiteral};
  const activeIconSvg = ${exportActiveIconSvgLiteral};
  const loadingIconSvg = ${exportLoadingIconSvgLiteral};
  const iconPosition = "${iconPosition}";
  const iconColor = ${exportIconColorLiteral};
  const hasBaseIcon = ${exportHasIconLiteral};
  const hasHoverIcon = ${exportHasHoverIconLiteral};
  const hasActiveIcon = ${exportHasActiveIconLiteral};
  const hasLoadingIcon = ${exportHasLoadingIconLiteral};
  const ariaLabel = ${JSON.stringify(ariaLabel)};
  const ariaPressedMode = ${JSON.stringify(ariaPressedMode)};
  const ariaBusyMode = ${JSON.stringify(ariaBusyMode)};
  const hoverEnabled = ${JSON.stringify(hoverEnabled)};
  const activeEnabled = ${JSON.stringify(activeEnabled)};
  const hoverTransform = ${JSON.stringify(hoverTransform)};
  const parallaxStrength = ${parallaxOpacity};

  const updateParallax = (e) => {
    if (!parallaxStrength) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = e.clientX - rect.left - rect.width / 2;
    const ny = e.clientY - rect.top - rect.height / 2;
    const maxShift = Math.min(rect.width, rect.height) * 0.35 * parallaxStrength;
    const shiftX = Math.max(-maxShift, Math.min(maxShift, nx));
    const shiftY = Math.max(-maxShift, Math.min(maxShift, ny));
    e.currentTarget.style.setProperty('--uf-btn-light-x', Math.round(shiftX) + 'px');
    e.currentTarget.style.setProperty('--uf-btn-light-y', Math.round(shiftY) + 'px');
    e.currentTarget.style.setProperty('--uf-btn-parallax-opacity', String(parallaxStrength));
  };
  const resetParallax = (target) => {
    if (!target) return;
    target.style.setProperty('--uf-btn-light-x', '0px');
    target.style.setProperty('--uf-btn-light-y', '0px');
    target.style.setProperty('--uf-btn-parallax-opacity', '0');
  };

  const baseStyle = {
    width: '${exportWidth}px', height: '${exportHeight}px',
    padding: '${padY}px ${padX}px',
    borderRadius: '${rCSS}',
    position: 'relative',
    overflow: 'hidden',
    background: '${cssBg}',
    color: '${textInput}',
    border: '${borderWidthPx}px ${borderStyle} ${borderInput}',
    fontFamily: '${safeFontFamily}',
    fontSize: '${fontSizeCss}',
    fontWeight: ${fontWeight},
    fontStyle: '${fontStyle}',
    textTransform: '${textTransform}',
    letterSpacing: '${letterSpacingCss}',
    lineHeight: ${lHeight},
    textShadow: '${textShadowCss}',
    boxShadow: '${exportShadow}',
    animation: '${animationValue || "none"}',
    transformStyle: 'preserve-3d',
    textDecoration: '${underline ? "underline" : "none"}',
    ['--uf-btn-top-gradient']: '${exportTopGradient}',
    backdropFilter: '${backdropFilterCss}',
    WebkitBackdropFilter: '${backdropFilterCss}',
    ['--uf-btn-parallax-opacity']: 0,
    ['--uf-btn-light-x']: '0px',
    ['--uf-btn-light-y']: '0px',
    ['--uf-icon-emboss-filter']: '${iconEmbossCss}',
    display: 'inline-flex',
    alignItems: '${alignItems}',
    justifyContent: '${justify}',
    cursor: 'pointer',
    transition: '${transitionCss}',
  };

  const ariaPressedValue = ariaPressedMode !== 'off' ? ariaPressedMode : undefined;
  const ariaBusyValue = ariaBusyMode === 'auto'
    ? (loading ? 'true' : undefined)
    : (ariaBusyMode !== 'off' ? ariaBusyMode : undefined);

  const disabledStyle = {
    background: '${cssDisabledBg}',
    color: '${cssDisabledText}',
    borderColor: '${cssDisabledBorder}',
    borderWidth: '${disabledBorderWidthPx}px',
    textShadow: '${disabledTextShadowCss}',
    opacity: ${disabledOpacity},
    cursor: '${disabledCursor}',
    filter: 'none',
    transform: 'none',
  };

  const hoverStyle = {
    background: '${cssHoverBg}',
    color: '${cssHoverText}',
    borderColor: '${cssHoverBorder}',
    borderWidth: '${hoverBorderWidthPx}px',
    filter: '${hoverFilter}',
    boxShadow: '${exportHoverShadow}',
    ...(hoverTransform ? { transform: hoverTransform } : {}),
  };

  const activeStyle = {
    background: '${cssActiveBg}',
    color: '${cssActiveText}',
    borderColor: '${cssActiveBorder}',
    filter: '${cssActiveFilter}',
    transform: 'translateY(${activeTranslateYText}px) scale(${activeScaleText})',
    borderWidth: '${activeBorderWidthPx}px',
    boxShadow: '${exportActiveShadow}',
  };

  const spinnerWrapStyle = {
    width: spinnerSize,
    height: spinnerSize,
    display: 'inline-flex',
    ...(spinnerPosition === 'left' ? { marginRight: spinnerGap } : { marginLeft: spinnerGap }),
  };

  const useLoadingIcon = loading && hasLoadingIcon && loadingIconSvg;
  const spinnerNode = !useLoadingIcon && spinnerSvg ? (
    <span className="uf-spinner-wrap" style={spinnerWrapStyle} dangerouslySetInnerHTML={{ __html: spinnerSvg }} />
  ) : null;
  const labelNode = <span className="uf-label">{loading ? loadingLabel : defaultLabel}</span>;
  const iconWrapStyle = {
    width: spinnerSize,
    height: spinnerSize,
    display: 'inline-flex',
    color: iconColor,
    ...(iconPosition === 'left' ? { marginRight: spinnerGap } : { marginLeft: spinnerGap }),
  };
  const resolveIconSvg = () => {
    if (useLoadingIcon) return loadingIconSvg;
    if (active && hasActiveIcon && activeIconSvg) return activeIconSvg;
    if (hover && hasHoverIcon && hoverIconSvg) return hoverIconSvg;
    if (hasBaseIcon && baseIconSvg) return baseIconSvg;
    return "";
  };
  const resolvedIconSvg = resolveIconSvg();
  const iconNode = resolvedIconSvg ? (
    <span className="uf-icon-wrap" style={iconWrapStyle} dangerouslySetInnerHTML={{ __html: resolvedIconSvg }} />
  ) : null;

  return (
    <>
      <style>{\`
        ${fontImport}
        @keyframes spin { to { transform: rotate(360deg); } }
        .uf-spinner-wrap svg { display: block; width: 100%; height: 100%; animation: spin 0.8s linear infinite; }
        .uf-icon-wrap svg { display: block; width: 100%; height: 100%; }
        .uf-icon-wrap { filter: var(--uf-icon-emboss-filter); }
        .uf-spinner-wrap { filter: var(--uf-icon-emboss-filter); }
        .uf-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--uf-btn-top-gradient);
          pointer-events: none;
          z-index: 0;
        }
        .uf-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at calc(50% + var(--uf-btn-light-x)) calc(20% + var(--uf-btn-light-y)),
            rgba(255, 255, 255, var(--uf-btn-parallax-opacity)),
            rgba(255, 255, 255, 0) 60%
          );
          pointer-events: none;
          z-index: 0;
        }
        .uf-btn > * { position: relative; z-index: 1; }
        ${focusCss}
        ${animationCss}
      \`}</style>
      <button
      className="uf-btn"
      onClick={onClick}
      onMouseEnter={() => !isDisabled && hoverEnabled && setHover(true)}
      onMouseMove={updateParallax}
      onMouseLeave={(e) => { resetParallax(e.currentTarget); setHover(false); setActive(false); }}
      onMouseDown={() => !isDisabled && activeEnabled && setActive(true)}
      onMouseUp={() => setActive(false)}
      disabled={isDisabled}
      aria-label={ariaLabel || undefined}
      aria-pressed={ariaPressedValue}
      aria-busy={ariaBusyValue}
      style={{
        ...baseStyle,
        ...(hoverEnabled && hover ? hoverStyle : {}),
        ...(activeEnabled && active ? activeStyle : {}),
        ...(isDisabled ? disabledStyle : {}),
      }}
    >
      {loading ? (
        useLoadingIcon ? (
          iconPosition === 'right' ? (
            <>
              {labelNode}
              {iconNode}
            </>
          ) : (
            <>
              {iconNode}
              {labelNode}
            </>
          )
        ) : (
          spinnerPosition === 'right' ? (
            <>
              {labelNode}
              {spinnerNode}
            </>
          ) : (
            <>
              {spinnerNode}
              {labelNode}
            </>
          )
        )
      ) : (
        iconPosition === 'right' ? (
          <>
            {labelNode}
            {iconNode}
          </>
        ) : (
          <>
            {iconNode}
            {labelNode}
          </>
        )
      )}
    </button>
    </>
  );
};
`;
  } else if (downloadFormat === "tailwind") {
    const uniformRadius = rTL === rTR && rTR === rBR && rBR === rBL;
    const radiusClasses = uniformRadius
      ? [`rounded-[${rTL}px]`]
      : [
          `rounded-tl-[${rTL}px]`,
          `rounded-tr-[${rTR}px]`,
          `rounded-br-[${rBR}px]`,
          `rounded-bl-[${rBL}px]`,
        ];
    const borderStyleClass =
      borderStyle === "dashed"
        ? "border-dashed"
        : borderStyle === "dotted"
        ? "border-dotted"
        : borderStyle === "double"
        ? "border-double"
        : borderStyle === "none"
        ? "border-none"
        : "border-solid";
    const transformClasses = activeEnabled
      ? [
          `enabled:active:translate-y-[${activeTranslateYText}px]`,
          `enabled:active:scale-[${activeScaleText}]`,
          `enabled:active:border-[${activeBorderWidthPx}px]`,
          `enabled:active:bg-[${cssActiveBg}]`,
          `enabled:active:text-[${cssActiveText}]`,
          `enabled:active:border-[${cssActiveBorder}]`,
        ]
      : [];
    const hoverClasses = hoverEnabled
      ? [
          hoverBgMode === "auto"
            ? "enabled:hover:brightness-[0.92]"
            : `enabled:hover:bg-[${cssHoverBg}]`,
          hoverTextMode === "custom"
            ? `enabled:hover:text-[${hoverTextInput}]`
            : "",
          hoverBorderMode === "custom"
            ? `enabled:hover:border-[${hoverBorderInput}]`
            : "",
          `enabled:hover:border-[${hoverBorderWidthPx}px]`,
          exportHoverShadow !== "none"
            ? `enabled:hover:shadow-[${exportHoverShadow}]`
            : "",
          hoverTransform
            ? `enabled:hover:[transform:${hoverTransform.replace(/ /g, "_")}]`
            : "",
        ]
      : [];
    const focusClasses = focusRingEnabled
      ? [
          "focus-visible:outline-none",
          `focus-visible:ring-[${focusRingWidthText}px]`,
          `focus-visible:ring-offset-[${focusRingOffsetText}px]`,
          `focus-visible:ring-[${focusRingInput}]`,
        ]
      : ["focus-visible:outline-none"];

    const tailwindClasses = [
      "uf-btn",
      "inline-flex",
      "items-center",
      "justify-center",
      "relative",
      "overflow-hidden",
      "cursor-pointer",
      `w-[${exportWidth}px]`,
      `h-[${exportHeight}px]`,
      `px-[${padX}px]`,
      `py-[${padY}px]`,
      `border-[${borderWidthPx}px]`,
      borderStyleClass,
      `border-[${borderInput}]`,
      cssBg !== "transparent" ? `bg-[${cssBg}]` : "bg-transparent",
      `text-[${textInput}]`,
      `text-[${fontSizeCss}]`,
      `tracking-[${letterSpacingCss}]`,
      `leading-[${lHeight}]`,
      underline ? "underline" : "no-underline",
      fontStyle === "italic" ? "italic" : "",
      textTransform === "uppercase"
        ? "uppercase"
        : textTransform === "lowercase"
        ? "lowercase"
        : textTransform === "capitalize"
        ? "capitalize"
        : "normal-case",
      exportShadow !== "none" ? `shadow-[${exportShadow}]` : "shadow-none",
      `disabled:opacity-[${disabledOpacity}]`,
      `disabled:cursor-${disabledCursor}`,
      `disabled:bg-[${cssDisabledBg}]`,
      `disabled:text-[${cssDisabledText}]`,
      `disabled:border-[${cssDisabledBorder}]`,
      `disabled:border-[${disabledBorderWidthPx}px]`,
      ...radiusClasses,
      ...hoverClasses,
      ...(exportActiveShadow !== "none"
        ? [`enabled:active:shadow-[${exportActiveShadow}]`]
        : []),
      ...transformClasses,
      ...focusClasses,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyleParts = [
      `transition: ${transitionCss};`,
      `font-family: ${safeFontFamily};`,
      `font-weight: ${fontWeight};`,
      `font-style: ${fontStyle};`,
      `text-transform: ${textTransform};`,
      "transform-style: preserve-3d;",
      `--tw-ring-offset-color: ${previewBgHex};`,
      `--uf-btn-top-gradient: ${exportTopGradient};`,
      `--uf-btn-parallax-opacity: ${parallaxOpacity};`,
      "--uf-btn-light-x: 0px;",
      "--uf-btn-light-y: 0px;",
      `--uf-icon-emboss-filter: ${iconEmbossCss};`,
    ];
    if (animationValue) inlineStyleParts.push(`animation: ${animationValue};`);
    if (!uniformRadius) inlineStyleParts.push(`border-radius: ${rCSS};`);
    if (textShadowCss !== "none")
      inlineStyleParts.push(`text-shadow: ${textShadowCss};`);
    const inlineStyle = inlineStyleParts.join(" ");
    const pseudoCss = `
.uf-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--uf-btn-top-gradient);
  pointer-events: none;
  z-index: 0;
}
.uf-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at calc(50% + var(--uf-btn-light-x)) calc(20% + var(--uf-btn-light-y)),
    rgba(255, 255, 255, var(--uf-btn-parallax-opacity)),
    rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
  z-index: 0;
}
.uf-btn > * { position: relative; z-index: 1; }
.uf-icon-wrap { filter: var(--uf-icon-emboss-filter); }
.uf-spinner-wrap { filter: var(--uf-icon-emboss-filter); }
`.trim();
    const extraStyleContent = [fontImport, animationCss, pseudoCss]
      .filter(Boolean)
      .join("\n");
    const extraStyleTag = extraStyleContent
      ? `<style>${extraStyleContent}</style>\n`
      : "";

    content = `
${extraStyleTag}<button class="${tailwindClasses}"${ariaAttr}${
      inlineStyle ? ` style="${inlineStyle}"` : ""
    }>
  ${loading ? loadingLabelText : label}
</button>
`.trim();
  } else if (downloadFormat === "css-vars") {
    content = `
${fontImport}
:root {
  --uf-btn-bg: ${cssBg};
  --uf-btn-text: ${textInput};
  --uf-btn-border: ${borderInput};
  --uf-btn-radius: ${rCSS};
  --uf-btn-font-size: ${fontSizeCss};
  --uf-btn-letter-spacing: ${letterSpacingCss};
  --uf-btn-line-height: ${lHeight};
  --uf-btn-shadow: ${exportShadow};
  --uf-btn-shadow-hover: ${exportHoverShadow};
  --uf-btn-shadow-active: ${exportActiveShadow};
  --uf-btn-top-gradient: ${exportTopGradient};
  --uf-btn-parallax-opacity: ${parallaxOpacity};
  --uf-btn-light-x: 0px;
  --uf-btn-light-y: 0px;
  --uf-icon-emboss-filter: ${iconEmbossCss};
  --uf-btn-hover-bg: ${cssHoverBg};
  --uf-btn-hover-text: ${cssHoverText};
  --uf-btn-hover-border: ${cssHoverBorder};
  --uf-btn-active-bg: ${cssActiveBg};
  --uf-btn-active-text: ${cssActiveText};
  --uf-btn-active-border: ${cssActiveBorder};
  --uf-btn-disabled-bg: ${cssDisabledBg};
  --uf-btn-disabled-text: ${cssDisabledText};
  --uf-btn-disabled-border: ${cssDisabledBorder};
  --uf-btn-disabled-border-width: ${disabledBorderWidthPx}px;
  --uf-btn-disabled-text-shadow: ${disabledTextShadowCss};
}

.uf-btn {
  width: ${exportWidth}px; height: ${exportHeight}px;
  padding: ${padY}px ${padX}px;
  border-radius: var(--uf-btn-radius);
  display: inline-flex;
  position: relative;
  overflow: hidden;
  align-items: ${alignItems}; justify-content: ${justify};
  background: var(--uf-btn-bg);
  color: var(--uf-btn-text);
  border: ${borderWidthPx}px ${borderStyle} var(--uf-btn-border);
  font-family: ${safeFontFamily};
  font-size: var(--uf-btn-font-size);
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-transform: ${textTransform};
  text-decoration: ${underline ? "underline" : "none"};
  letter-spacing: var(--uf-btn-letter-spacing);
  line-height: var(--uf-btn-line-height);
  text-shadow: ${textShadowCss};
  ${animationValue ? `animation: ${animationValue};` : ""}
  box-shadow: var(--uf-btn-shadow);
  transform-style: preserve-3d;
  cursor: pointer;
  transition: ${transitionCss};
}
.uf-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--uf-btn-top-gradient);
  pointer-events: none;
  z-index: 0;
}
.uf-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at calc(50% + var(--uf-btn-light-x)) calc(20% + var(--uf-btn-light-y)),
    rgba(255, 255, 255, var(--uf-btn-parallax-opacity)),
    rgba(255, 255, 255, 0) 60%
  );
  pointer-events: none;
  z-index: 0;
}
.uf-btn > * { position: relative; z-index: 1; }
.uf-icon-wrap { filter: var(--uf-icon-emboss-filter); }
${focusCss}
${
  hoverEnabled
    ? `.uf-btn:hover:not(:disabled) {
  background: var(--uf-btn-hover-bg);
  color: var(--uf-btn-hover-text);
  border-color: var(--uf-btn-hover-border);
  border-width: ${hoverBorderWidthPx}px;
  filter: ${hoverFilter};
  box-shadow: var(--uf-btn-shadow-hover);${
    hoverTransform ? `\n  transform: ${hoverTransform};` : ""
  }
}`
    : ""
}
${
  activeEnabled
    ? `.uf-btn:active:not(:disabled) {
  background: var(--uf-btn-active-bg);
  color: var(--uf-btn-active-text);
  border-color: var(--uf-btn-active-border);
  border-width: ${activeBorderWidthPx}px;
  filter: ${cssActiveFilter};
  transform: translateY(${activeTranslateYText}px) scale(${activeScaleText});
  box-shadow: var(--uf-btn-shadow-active);
}`
    : ""
}
.uf-btn:disabled {
  background: var(--uf-btn-disabled-bg);
  color: var(--uf-btn-disabled-text);
  border-color: var(--uf-btn-disabled-border);
  border-width: var(--uf-btn-disabled-border-width);
  text-shadow: var(--uf-btn-disabled-text-shadow);
  opacity: ${disabledOpacity};
  cursor: ${disabledCursor};
}
${animationCss}
`.trim();
  } else if (downloadFormat === "scss") {
    content = `
${fontImport}
$uf-btn-bg: ${cssBg};
$uf-btn-text: ${textInput};
$uf-btn-border: ${borderInput};
$uf-btn-radius: ${rCSS};
$uf-btn-font-size: ${fontSizeCss};
$uf-btn-letter-spacing: ${letterSpacingCss};
$uf-btn-line-height: ${lHeight};
$uf-btn-shadow: ${exportShadow};
$uf-btn-shadow-hover: ${exportHoverShadow};
$uf-btn-shadow-active: ${exportActiveShadow};
$uf-btn-top-gradient: ${exportTopGradient};
$uf-btn-parallax-opacity: ${parallaxOpacity};
$uf-btn-light-x: 0px;
$uf-btn-light-y: 0px;
$uf-icon-emboss-filter: ${iconEmbossCss};
$uf-btn-hover-bg: ${cssHoverBg};
$uf-btn-hover-text: ${cssHoverText};
$uf-btn-hover-border: ${cssHoverBorder};
$uf-btn-active-bg: ${cssActiveBg};
$uf-btn-active-text: ${cssActiveText};
$uf-btn-active-border: ${cssActiveBorder};
$uf-btn-disabled-bg: ${cssDisabledBg};
$uf-btn-disabled-text: ${cssDisabledText};
$uf-btn-disabled-border: ${cssDisabledBorder};

@mixin uf-button {
  width: ${exportWidth}px; height: ${exportHeight}px;
  padding: ${padY}px ${padX}px;
  border-radius: $uf-btn-radius;
  display: inline-flex;
  align-items: ${alignItems}; justify-content: ${justify};
  background: $uf-btn-bg;
  color: $uf-btn-text;
  border: ${borderWidthPx}px ${borderStyle} $uf-btn-border;
  font-family: ${safeFontFamily};
  font-size: $uf-btn-font-size;
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-transform: ${textTransform};
  text-decoration: ${underline ? "underline" : "none"};
  letter-spacing: $uf-btn-letter-spacing;
  line-height: $uf-btn-line-height;
  text-shadow: ${textShadowCss};
  ${animationValue ? `animation: ${animationValue};` : ""}
  box-shadow: $uf-btn-shadow;
  position: relative;
  overflow: hidden;
  --uf-btn-top-gradient: #{$uf-btn-top-gradient};
  --uf-btn-parallax-opacity: #{$uf-btn-parallax-opacity};
  --uf-btn-light-x: #{$uf-btn-light-x};
  --uf-btn-light-y: #{$uf-btn-light-y};
  --uf-icon-emboss-filter: #{$uf-icon-emboss-filter};
  transform-style: preserve-3d;
  cursor: pointer;
  transition: ${transitionCss};

  &:focus-visible {
    outline: none;
    box-shadow: ${focusBoxShadow};
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--uf-btn-top-gradient);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at calc(50% + var(--uf-btn-light-x)) calc(20% + var(--uf-btn-light-y)),
      rgba(255, 255, 255, var(--uf-btn-parallax-opacity)),
      rgba(255, 255, 255, 0) 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  > * { position: relative; z-index: 1; }
  .uf-icon-wrap { filter: var(--uf-icon-emboss-filter); }
  .uf-spinner-wrap { filter: var(--uf-icon-emboss-filter); }

${
  hoverEnabled
    ? `  &:hover:not(:disabled) {
    background: $uf-btn-hover-bg;
    color: $uf-btn-hover-text;
    border-color: $uf-btn-hover-border;
    border-width: ${hoverBorderWidthPx}px;
    filter: ${hoverFilter};
    box-shadow: $uf-btn-shadow-hover;${
      hoverTransform ? `\n    transform: ${hoverTransform};` : ""
    }
  }`
    : ""
}

${
  activeEnabled
    ? `  &:active:not(:disabled) {
    background: $uf-btn-active-bg;
    color: $uf-btn-active-text;
    border-color: $uf-btn-active-border;
    border-width: ${activeBorderWidthPx}px;
    filter: ${cssActiveFilter};
    transform: translateY(${activeTranslateYText}px) scale(${activeScaleText});
    box-shadow: $uf-btn-shadow-active;
  }`
    : ""
}

  &:disabled {
    background: $uf-btn-disabled-bg;
    color: $uf-btn-disabled-text;
    border-color: $uf-btn-disabled-border;
    border-width: ${disabledBorderWidthPx}px;
    text-shadow: ${disabledTextShadowCss};
    opacity: ${disabledOpacity};
    cursor: ${disabledCursor};
  }
}
${animationCss}
`.trim();
  } else if (downloadFormat === "tailwind-config") {
    content = `
// tailwind.config.js (snippet)
module.exports = {
  theme: {
    extend: {
      colors: {
        "uf-btn-bg": "${cssBg}",
        "uf-btn-text": "${textInput}",
        "uf-btn-border": "${borderInput}",
      },
      borderRadius: {
        "uf-btn": "${rCSS}",
      },
      boxShadow: {
        "uf-btn": "${exportShadow}",
        "uf-btn-hover": "${exportHoverShadow}",
        "uf-btn-active": "${exportActiveShadow}",
      },
    },
  },
};
`.trim();
  } else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        button: {
          color: {
            background: { value: cssBg },
            text: { value: textInput },
            border: { value: borderInput },
          },
          size: {
            width: { value: exportWidth },
            height: { value: exportHeight },
            paddingX: { value: padX },
            paddingY: { value: padY },
            radius: { value: rCSS },
          },
          typography: {
            fontFamily: { value: safeFontFamily },
            fontSize: { value: fontSizeCss },
            fontWeight: { value: fontWeight },
            letterSpacing: { value: letterSpacingCss },
            lineHeight: { value: lHeight },
          },
          shadow: {
            base: { value: exportShadow },
          },
        },
      },
      null,
      2
    );
  } else {
    content = "// Tailwind export coming next iteration!";
  }

  return { filename, content };
}
