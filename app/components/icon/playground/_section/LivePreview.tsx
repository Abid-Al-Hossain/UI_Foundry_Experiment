"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { type IconState } from "../types";

// Dynamic Icon Renderer
const IconRenderer = ({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) => {
  // @ts-ignore - Dynamic access to Lucide icons
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) return <LucideIcons.HelpCircle {...props} />;
  // @ts-ignore
  return <LucideIcon {...props} />;
};

export default function LivePreview({ state }: { state: IconState }) {
  const {
    iconName,
    size,
    strokeWidth,
    color,
    fillColor,
    fillOpacity,
    opacity,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    shape,
    containerSize,
    containerPadding,
    containerColor,
    containerOpacity,
    borderWidth,
    borderColor,
    borderStyle,
    borderRadius,
    glassBlur,
    glassOpacity,
    shadowEnabled,
    shadowColor,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    glowEnabled,
    glowColor,
    glowBlur,
    use3D,
    rotateX,
    rotateY,
    rotateZ,
    depth,
    perspective,
    animationType,
    animationDuration,
    hoverEffect,
  } = state;

  // --- Styles ---

  // 1. Container Style
  // If shape is 'none', we might still use container styles if selected, or just render icon.
  // But usually 'none' shape means transparent bg, 0 padding? Or literally no wrapper?
  // Let's assume wrapper always exists for positioning but might be invisible.

  const isGlass = glassBlur > 0;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: shape === "none" ? "auto" : `${containerSize}px`,
    height: shape === "none" ? "auto" : `${containerSize}px`,
    padding: shape === "none" ? 0 : `${containerPadding}px`, // Inner padding if we want icon smaller? Or just flex center.

    // Background
    backgroundColor: isGlass
      ? `rgba(255,255,255, ${glassOpacity})`
      : shape === "none"
        ? "transparent"
        : containerColor,

    // Border
    borderWidth: `${borderWidth}px`,
    borderStyle: borderStyle,
    borderColor: borderColor,

    // Radius
    borderRadius: shape === "circle" ? "50%" : `${borderRadius}px`,

    // Effects
    boxShadow: [
      shadowEnabled
        ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
        : "",
      glowEnabled ? `0 0 ${glowBlur}px ${glowColor}` : "",
    ]
      .filter(Boolean)
      .join(", "),

    backdropFilter: isGlass ? `blur(${glassBlur}px)` : undefined,
    WebkitBackdropFilter: isGlass ? `blur(${glassBlur}px)` : undefined,

    // 3D Wrapper
    transformStyle: "preserve-3d",
    transform: use3D
      ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : undefined,
  };

  // 2. Icon Style
  // Gradient Handling: We need SVG definitions for gradient strokes.
  // We can inject a unique ID.
  const uniqueId = React.useId();
  const gradId = `icon-grad-${uniqueId}`;

  // Framer Motion Variants
  const variants = {
    initial: { scale: 1, rotate: 0 },
    hover: (() => {
      switch (hoverEffect) {
        case "scale":
          return { scale: 1.2 };
        case "rotate":
          return { rotate: 180 };
        case "shake":
          return { x: [0, -5, 5, -5, 5, 0] };
        case "glow":
          return { filter: `drop-shadow(0 0 10px ${color})` };
        default:
          return {};
      }
    })(),
    animate: (() => {
      switch (animationType) {
        case "spin":
          return { rotate: 360 };
        case "pulse":
          return { scale: [1, 1.1, 1] };
        case "bounce":
          return { y: [0, -20, 0] };
        case "wiggle":
          return { rotate: [0, -10, 10, -10, 10, 0] };
        default:
          return {};
      }
    })(),
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] p-10">
      {/* 3D Scene Wrapper if needed for deep depth */}
      <div style={{ perspective: use3D ? `${perspective}px` : undefined }}>
        <motion.div
          style={containerStyle}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={variants}
          transition={{
            duration: animationDuration,
            repeat: animationType !== "none" ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {/* Gradient Defs */}
          {gradientEnabled && (
            <svg style={{ width: 0, height: 0, position: "absolute" }}>
              <defs>
                <linearGradient
                  id={gradId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  gradientTransform={`rotate(${gradientAngle})`}
                >
                  <stop offset="0%" stopColor={gradientStart} />
                  <stop offset="100%" stopColor={gradientEnd} />
                </linearGradient>
              </defs>
            </svg>
          )}

          <IconRenderer
            name={iconName}
            size={size}
            color={gradientEnabled ? `url(#${gradId})` : color}
            strokeWidth={strokeWidth}
            absoluteStrokeWidth // Ensures stroke doesn't scale weirdly if we scale SVG
            fill={fillColor}
            fillOpacity={fillOpacity}
            style={{ opacity }}
          />

          {/* Reflection / Gloss Overlay */}
          {/* Simple gloss effect */}
          {isGlass && (
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-br from-white/40 to-transparent opacity-50" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
