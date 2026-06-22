"use client";

import {
  type DividerContentPosition,
  type DividerOrientation,
  type DividerVariant,
} from "../types";

export type DividerExportInput = {
  downloadName: string;
  orientation: DividerOrientation;
  width: string;
  thickness: number;
  gap: number;
  color: string;
  variant: DividerVariant;
  borderRadius: number;
  showLabel: boolean;
  labelText: string;
  labelPosition: DividerContentPosition;
  labelBackground: string;
  labelColor: string;
  labelPadding: number;
  contentType: "text" | "icon";
  iconName: string;
  iconSize: number;
  fontSize: number;
  fontWeight: string;
  labelTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  letterSpacing: number;
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  opacity: number;
  animateBeam: boolean;
  beamColor: string;
  beamSpeed: number;
  shimmerEnabled: boolean;
  shimmerSpeed: number;
  neonGlow: boolean;
  glowColor: string;
  glowBlur: number;
  interactiveResize: boolean;
  ariaRole: "separator" | "presentation" | "none";
  ariaLabel: string;
  gradientAngle: number;
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  shadowOpacity: number;
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingOffset: number;
  focusRingColor: string;
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  disabled: boolean;
  disabledOpacity: number;
  hoverColor: string;
  hoverOpacity: number;
  marginTop: number;
  marginBottom: number;
};

export function buildDividerExportPayload(params: DividerExportInput) {
  const {
    downloadName,
    orientation,
    width,
    thickness,
    gap,
    color,
    variant,
    borderRadius,
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
    contentType,
    iconName,
    iconSize,
    fontSize,
    fontWeight,
    labelTransform,
    letterSpacing,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    opacity,
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
    neonGlow,
    glowColor,
    glowBlur,
    interactiveResize,
    ariaRole,
    ariaLabel,
    gradientAngle,
    shadowEnabled,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowOpacity,
    focusRingEnabled,
    focusRingWidth,
    focusRingOffset,
    focusRingColor,
    transitionDuration,
    transitionEasing,
    disabled,
    disabledOpacity,
    hoverColor,
    hoverOpacity,
    marginTop,
    marginBottom,
  } = params;

  const isHorizontal = orientation === "horizontal";
  const filename = `${downloadName}.tsx`;
  const doubleGap = Math.max(2, thickness);
  const lineAxisThickness =
    variant === "double" ? thickness * 2 + doubleGap : thickness;

  const getSizeStyle = () =>
    isHorizontal
      ? { width, height: `${lineAxisThickness}px` }
      : { width: `${lineAxisThickness}px`, height: width };

  const getLineFill = () =>
    gradientEnabled
      ? `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`
      : color;

  const getDoubleBackground = () =>
    isHorizontal
      ? `linear-gradient(to bottom, ${getLineFill()} 0 ${thickness}px, transparent ${thickness}px ${thickness + doubleGap}px, ${getLineFill()} ${thickness + doubleGap}px ${thickness * 2 + doubleGap}px)`
      : `linear-gradient(to right, ${getLineFill()} 0 ${thickness}px, transparent ${thickness}px ${thickness + doubleGap}px, ${getLineFill()} ${thickness + doubleGap}px ${thickness * 2 + doubleGap}px)`;

  const reactIconComponentMap: Record<string, string> = {
    star: "Star",
    check: "Check",
    heart: "Heart",
    shield: "Shield",
    zap: "Zap",
    bell: "Bell",
    alert: "AlertCircle",
  };
  const reactIconName = reactIconComponentMap[iconName] ?? "Star";
  const reactIconImport =
    contentType === "icon"
      ? `import { ${reactIconName} } from "lucide-react";\n`
      : "";

  const labelCommonStyle = `padding: '${isHorizontal ? `0 ${labelPadding}px` : `${labelPadding}px 0`}', color: '${labelColor}', background: '${labelBackground}'`;
  const reactLabelContent =
    contentType === "icon"
      ? `<${reactIconName} size={${iconSize}} />`
      : labelText;
  const reactLabelMarkup = showLabel
    ? `<div style={{ ${labelCommonStyle}, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>${contentType === "icon" ? reactLabelContent : `<span style={{ fontSize: '${fontSize}px', fontWeight: '${fontWeight}', textTransform: '${labelTransform}', letterSpacing: '${letterSpacing}px', whiteSpace: 'nowrap' }}>${reactLabelContent}</span>`}</div>`
    : "";

  let bg = color;
  if (variant === "double") {
    bg = getDoubleBackground();
  } else if (gradientEnabled) {
    bg = getLineFill();
  } else if (variant !== "solid") {
    bg = "transparent";
  }

  const getBorderInfo = () => {
    if (variant === "solid" || gradientEnabled || variant === "double") {
      return "";
    }
    const side = isHorizontal ? "borderTop" : "borderLeft";
    const crossAxis = isHorizontal ? "height" : "width";
    return `${side}: \`${thickness}px ${variant} \` + lineColor, ${crossAxis}: 0,`;
  };

  const glowShadow = neonGlow
    ? `0 0 ${glowBlur}px ${glowColor}, 0 0 ${glowBlur * 2}px ${glowColor}`
    : "";
  const dropShadowHex = Math.round(shadowOpacity * 255).toString(16).padStart(2, "0");
  const dropShadow = shadowEnabled
    ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${dropShadowHex}`
    : "";
  const shadow = [dropShadow, glowShadow].filter(Boolean).join(", ") || "none";
  const roleProp =
    ariaRole === "none" ? "" : `\n      role="${ariaRole}"`;
  const ariaLabelProp =
    ariaRole === "separator" && ariaLabel.trim()
      ? `\n      aria-label="${ariaLabel.trim()}"`
      : "";
  const interactive = !disabled && (hoverColor !== color || hoverOpacity !== 1);

  const content = `import React from 'react';
${reactIconImport}

export default function Divider() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const interactive = ${interactive};
  const lineColor = ${disabled} ? '${color}' : (interactive && isHovered ? '${hoverColor}' : '${color}');
  const lineOpacity = ${disabled} ? ${disabledOpacity} : (interactive && isHovered ? ${hoverOpacity} : 1);
  const lineStyle = {
    flex: 1,
    position: 'relative',
    borderRadius: ${borderRadius},
    overflow: 'hidden',
    opacity: lineOpacity,
    transition: ${transitionDuration} > 0 ? 'opacity ${transitionDuration}ms ${transitionEasing}, background-color ${transitionDuration}ms ${transitionEasing}' : undefined,
    ${
      variant === "solid" || gradientEnabled || variant === "double"
        ? `background: ${gradientEnabled || variant === "double" ? `'${bg}'` : "lineColor"}, width: '100%', height: '100%'`
        : getBorderInfo()
    }
  };

  return (
    <div${roleProp}${ariaLabelProp}
      aria-disabled={${disabled} || undefined}
      tabIndex={${focusRingEnabled} && !${disabled} ? 0 : undefined}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
      display: 'flex', flexDirection: '${isHorizontal ? "row" : "column"}', alignItems: 'center', justifyContent: 'center',
      width: '${getSizeStyle().width}', height: '${getSizeStyle().height}', margin: '${gap}px', marginTop: ${marginTop}, marginBottom: ${marginBottom},
      opacity: ${disabled} ? ${disabledOpacity} : ${opacity},
      boxShadow: '${shadow}', position: 'relative',
      pointerEvents: ${disabled} ? 'none' : undefined,
      outline: isFocused && ${focusRingEnabled} ? '${focusRingWidth}px solid ${focusRingColor}' : undefined,
      outlineOffset: isFocused && ${focusRingEnabled} ? ${focusRingOffset} : undefined,
      resize: '${interactiveResize ? (isHorizontal ? "horizontal" : "vertical") : "none"}', overflow: '${interactiveResize ? "auto" : "visible"}'
    }}>
      ${showLabel && labelPosition === "left" ? reactLabelMarkup : ""}

      <div style={lineStyle}>
         ${
           animateBeam
             ? `<div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, ${beamColor}, transparent)',
            animation: 'beam ${beamSpeed}s linear infinite'
         }} />`
             : ""
         }
         ${
           shimmerEnabled
             ? `<div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.18)', animation: 'pulse ${shimmerSpeed}s ease-in-out infinite' }} />`
             : ""
         }
      </div>

      ${showLabel && labelPosition === "center" ? reactLabelMarkup : ""}
      ${
        showLabel && labelPosition === "center"
          ? `<div style={lineStyle}>${animateBeam ? `<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, ${beamColor}, transparent)', animation: 'beam ${beamSpeed}s linear infinite'}} />` : ""}${shimmerEnabled ? `<div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.18)', animation: 'pulse ${shimmerSpeed}s ease-in-out infinite' }} />` : ""}</div>`
          : ""
      }

      ${showLabel && labelPosition === "right" ? reactLabelMarkup : ""}

      <style>{\`@keyframes beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } } @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }\`}</style>
    </div>
  );
}`;

  return { content, filename };
}
