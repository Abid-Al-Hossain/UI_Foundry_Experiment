import { TooltipState, DownloadFormat } from "../../types";
import {
  getFontFamily,
  getGoogleFontLink,
  getTypographyCss,
} from "./typographyHelpers";

// =============================================================================
// EXPORT PAYLOAD BUILDER
// =============================================================================

export function buildExportPayload(
  state: TooltipState,
  format: DownloadFormat,
): { code: string; filename: string } {
  const baseName = state.downloadName || "tooltip";

  switch (format) {
    case "html":
      return {
        code: buildHtmlExport(state),
        filename: `${baseName}.html`,
      };
    case "react":
      return {
        code: buildReactExport(state),
        filename: `${baseName}.tsx`,
      };
    case "react-tailwind":
      return {
        code: buildReactTailwindExport(state),
        filename: `${baseName}.tsx`,
      };
    case "css-only":
      return {
        code: buildCssExport(state),
        filename: `${baseName}.css`,
      };
    default:
      return {
        code: buildHtmlExport(state),
        filename: `${baseName}.html`,
      };
  }
}

// =============================================================================
// HTML + CSS EXPORT
// =============================================================================

function buildHtmlExport(state: TooltipState): string {
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;
  const shadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tooltip Component</title>
  ${getGoogleFontLink(state)}
  <style>
    /* Tooltip Container */
    .tooltip-wrapper {
      position: relative;
      display: inline-block;
    }

    /* Trigger Button */
    .tooltip-trigger {
      padding: 12px 24px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .tooltip-trigger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      ${getPositionCss(state)}
      background: ${state.bgColor};
      color: ${state.textColor};
      padding: ${state.paddingY}px ${state.paddingX}px;
      border-radius: ${state.borderRadius}px;
      max-width: ${state.maxWidth}px;
      ${state.borderWidth > 0 ? `border: ${state.borderWidth}px solid ${state.borderColor};` : ""}
      box-shadow: ${shadow};
      ${state.backdropFilter !== "none" ? `backdrop-filter: ${state.backdropFilter};` : ""}
      opacity: 0;
      visibility: hidden;
      z-index: ${state.zIndex};
      ${getTypographyCss(state)}
      transition: opacity ${state.transitionDuration}ms ${state.transitionEasing},
                  transform ${state.transitionDuration}ms ${state.transitionEasing};
      ${getAnimationInitialCss(state)}
    }

    .tooltip-wrapper:hover .tooltip,
    .tooltip-wrapper:focus-within .tooltip {
      opacity: ${state.opacity / 100};
      visibility: visible;
      transform: translateX(-50%);
    }

    /* Arrow */
    ${state.showArrow ? buildArrowCss(state, arrowColor) : ""}
  </style>
</head>
<body style="display: grid; place-items: center; min-height: 100vh; margin: 0; font-family: system-ui;">
  <div class="tooltip-wrapper">
    <button class="tooltip-trigger">${state.triggerText}</button>
    <div class="tooltip" role="${state.role}"${state.ariaLabel ? ` aria-label="${state.ariaLabel}"` : ""}>
      ${state.content}
      ${state.showArrow ? '<div class="tooltip-arrow"></div>' : ""}
    </div>
  </div>
</body>
</html>`;
}

// =============================================================================
// REACT COMPONENT EXPORT
// =============================================================================

function buildReactExport(state: TooltipState): string {
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;
  const shadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  return `import React, { useState } from 'react';

interface TooltipProps {
  content?: string;
  children?: React.ReactNode;
  placement?: '${state.placement}';
}

export default function Tooltip({ 
  content = "${state.content}",
  children,
  placement = "${state.placement}"
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children || (
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          ${state.triggerText}
        </button>
      )}
      
      <div
        role="${state.role}"
        ${state.ariaLabel ? `aria-label="${state.ariaLabel}"` : ""}
        style={{
          position: 'absolute',
          ${getPositionJs(state)}
          background: '${state.bgColor}',
          color: '${state.textColor}',
          padding: '${state.paddingY}px ${state.paddingX}px',
          borderRadius: '${state.borderRadius}px',
          maxWidth: '${state.maxWidth}px',
          ${state.borderWidth > 0 ? `border: '${state.borderWidth}px solid ${state.borderColor}',` : ""}
          boxShadow: '${shadow}',
          ${state.backdropFilter !== "none" ? `backdropFilter: '${state.backdropFilter}',` : ""}
          opacity: isVisible ? ${state.opacity / 100} : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          zIndex: ${state.zIndex},
          fontFamily: '${getFontFamily(state)}',
          fontSize: '${state.fontSize || 14}${state.fontSizeUnit || "px"}',
          fontWeight: ${state.fontWeight || 500},
          fontStyle: '${state.fontStyle || "normal"}',
          textDecoration: '${state.textDecoration || "none"}',
          textTransform: '${state.textTransform || "none"}',
          letterSpacing: '${state.letterSpacing || 0}${state.letterSpacingUnit || "px"}',
          lineHeight: ${state.lineHeight || 1.4},
          textAlign: '${state.textAlign || "center"}',
          transition: 'opacity ${state.transitionDuration}ms ${state.transitionEasing}, transform ${state.transitionDuration}ms ${state.transitionEasing}',
          pointerEvents: ${state.interactive ? "'auto'" : "'none'"},
        }}
      >
        {content}
        ${
          state.showArrow
            ? `
        <div style={{
          position: 'absolute',
          ${getArrowPositionJs(state)}
          width: 0,
          height: 0,
          ${getArrowBorderJs(state, arrowColor)}
        }} />`
            : ""
        }
      </div>
    </div>
  );
}
`;
}

// =============================================================================
// REACT + TAILWIND EXPORT
// =============================================================================

function buildReactTailwindExport(state: TooltipState): string {
  return `import React, { useState } from 'react';

interface TooltipProps {
  content?: string;
  children?: React.ReactNode;
}

export default function Tooltip({ 
  content = "${state.content}",
  children 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || (
        <button className="px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform">
          ${state.triggerText}
        </button>
      )}
      
      <div
        role="${state.role}"
        className={\`
          absolute ${getPlacementClasses(state.placement)}
          ${state.shadowEnabled ? "shadow-lg" : ""}
          transition-all
          \${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        \`}
        style={{
          background: '${state.bgColor}',
          color: '${state.textColor}',
          padding: '${state.paddingY}px ${state.paddingX}px',
          borderRadius: '${state.borderRadius}px',
          maxWidth: '${state.maxWidth}px',
          textAlign: '${state.textAlign || "center"}',
          transitionDuration: '${state.transitionDuration}ms',
          zIndex: ${state.zIndex},
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {content}
      </div>
    </div>
  );
}
`;
}

// =============================================================================
// CSS-ONLY EXPORT
// =============================================================================

function buildCssExport(state: TooltipState): string {
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;
  const shadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  return `/* Tooltip CSS */
/* Generated by UI Foundry - Tooltip Builder */

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  ${getPositionCss(state)}
  
  /* Colors */
  background: ${state.bgColor};
  color: ${state.textColor};
  
  /* Sizing */
  padding: ${state.paddingY}px ${state.paddingX}px;
  max-width: ${state.maxWidth}px;
  
  /* Border */
  border-radius: ${state.borderRadius}px;
  ${state.borderWidth > 0 ? `border: ${state.borderWidth}px solid ${state.borderColor};` : ""}
  
  /* Shadow */
  box-shadow: ${shadow};
  
  /* Effects */
  ${state.backdropFilter !== "none" ? `backdrop-filter: ${state.backdropFilter};` : ""}
  
  /* Typography */
  ${getTypographyCss(state)}
  
  /* Initial state (hidden) */
  opacity: 0;
  visibility: hidden;
  z-index: ${state.zIndex};
  
  /* Animation */
  transition: opacity ${state.transitionDuration}ms ${state.transitionEasing},
              transform ${state.transitionDuration}ms ${state.transitionEasing};
  ${getAnimationInitialCss(state)}
}

/* Show on hover/focus */
.tooltip-wrapper:hover .tooltip,
.tooltip-wrapper:focus-within .tooltip {
  opacity: ${state.opacity / 100};
  visibility: visible;
  transform: translateX(-50%);
}

${state.showArrow ? buildArrowCss(state, arrowColor) : ""}
`;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getPositionCss(state: TooltipState): string {
  const offset = state.offset;

  switch (true) {
    case state.placement.startsWith("top"):
      return `bottom: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%);`;
    case state.placement.startsWith("bottom"):
      return `top: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%);`;
    case state.placement.startsWith("left"):
      return `right: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%);`;
    case state.placement.startsWith("right"):
      return `left: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%);`;
    default:
      return `bottom: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%);`;
  }
}

function getPositionJs(state: TooltipState): string {
  const offset = state.offset;

  switch (true) {
    case state.placement.startsWith("top"):
      return `bottom: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("bottom"):
      return `top: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("left"):
      return `right: 'calc(100% + ${offset}px)', top: '50%', transform: 'translateY(-50%)',`;
    case state.placement.startsWith("right"):
      return `left: 'calc(100% + ${offset}px)', top: '50%', transform: 'translateY(-50%)',`;
    default:
      return `bottom: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
  }
}

function getAnimationInitialCss(state: TooltipState): string {
  switch (state.animationType) {
    case "scale":
      return "transform: translateX(-50%) scale(0.85);";
    case "shift-away":
      if (state.placement.startsWith("top"))
        return "transform: translateX(-50%) translateY(-10px);";
      if (state.placement.startsWith("bottom"))
        return "transform: translateX(-50%) translateY(10px);";
      return "";
    case "shift-toward":
      if (state.placement.startsWith("top"))
        return "transform: translateX(-50%) translateY(10px);";
      if (state.placement.startsWith("bottom"))
        return "transform: translateX(-50%) translateY(-10px);";
      return "";
    default:
      return "";
  }
}

function buildArrowCss(state: TooltipState, arrowColor: string): string {
  const size = state.arrowSize;

  switch (true) {
    case state.placement.startsWith("top"):
      return `
.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: ${size}px solid transparent;
  border-right: ${size}px solid transparent;
  border-top: ${size}px solid ${arrowColor};
}`;
    case state.placement.startsWith("bottom"):
      return `
.tooltip-arrow {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: ${size}px solid transparent;
  border-right: ${size}px solid transparent;
  border-bottom: ${size}px solid ${arrowColor};
}`;
    case state.placement.startsWith("left"):
      return `
.tooltip-arrow {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: ${size}px solid transparent;
  border-bottom: ${size}px solid transparent;
  border-left: ${size}px solid ${arrowColor};
}`;
    case state.placement.startsWith("right"):
      return `
.tooltip-arrow {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-top: ${size}px solid transparent;
  border-bottom: ${size}px solid transparent;
  border-right: ${size}px solid ${arrowColor};
}`;
    default:
      return "";
  }
}

function getArrowPositionJs(state: TooltipState): string {
  switch (true) {
    case state.placement.startsWith("top"):
      return `top: '100%', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("bottom"):
      return `bottom: '100%', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("left"):
      return `left: '100%', top: '50%', transform: 'translateY(-50%)',`;
    case state.placement.startsWith("right"):
      return `right: '100%', top: '50%', transform: 'translateY(-50%)',`;
    default:
      return "";
  }
}

function getArrowBorderJs(state: TooltipState, arrowColor: string): string {
  const size = state.arrowSize;

  switch (true) {
    case state.placement.startsWith("top"):
      return `borderLeft: '${size}px solid transparent', borderRight: '${size}px solid transparent', borderTop: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("bottom"):
      return `borderLeft: '${size}px solid transparent', borderRight: '${size}px solid transparent', borderBottom: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("left"):
      return `borderTop: '${size}px solid transparent', borderBottom: '${size}px solid transparent', borderLeft: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("right"):
      return `borderTop: '${size}px solid transparent', borderBottom: '${size}px solid transparent', borderRight: '${size}px solid ${arrowColor}',`;
    default:
      return "";
  }
}

function getPlacementClasses(placement: string): string {
  switch (true) {
    case placement.startsWith("top"):
      return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    case placement.startsWith("bottom"):
      return "top-full left-1/2 -translate-x-1/2 mt-2";
    case placement.startsWith("left"):
      return "right-full top-1/2 -translate-y-1/2 mr-2";
    case placement.startsWith("right"):
      return "left-full top-1/2 -translate-y-1/2 ml-2";
    default:
      return "bottom-full left-1/2 -translate-x-1/2 mb-2";
  }
}

function getRoundedClass(radius: number): string {
  if (radius <= 2) return "sm";
  if (radius <= 4) return "md";
  if (radius <= 8) return "lg";
  if (radius <= 12) return "xl";
  if (radius <= 16) return "2xl";
  return "3xl";
}
