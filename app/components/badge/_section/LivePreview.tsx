"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Float, Center } from "@react-three/drei";
import { motion } from "framer-motion";

// Types
import {
  type BadgeVariant,
  type BadgeShape,
  type BadgeSize,
  type BadgeIconPosition,
} from "../types";

export default function LivePreview({ state }: { state: any }) {
  const {
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
    icon3DSpinSpeed,
    interactive,
    hoverScale,
    clickRipple,
  } = state;

  // --- Compute Styles ---
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          border: `${borderWidth}px solid ${color}`,
          color: color,
          background: "transparent",
        };
      case "soft":
        return { background: `${color}20`, color: color };
      case "ghost":
        return { background: "transparent", color: color };
      case "neumorphic":
        return {
          background: "#e0e5ec",
          color: "#4a5568",
          boxShadow: dropShadow
            ? "5px 5px 10px #bebebe, -5px -5px 10px #ffffff"
            : "none",
        };
      case "glass":
        return {
          background: `${color}40`,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: textColor,
        };
      case "solid":
      default:
        return { background: color, color: textColor };
    }
  };

  const getShapeRadius = () => {
    if (shape === "pill") return 9999;
    if (shape === "circle") return "50%";
    if (shape === "square") return 0;
    return borderRadius;
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: `${paddingY}px ${paddingX}px`,
    fontSize: `${fontSize}px`,
    fontWeight: 600,
    borderRadius: getShapeRadius() as any,
    fontFamily: "Inter, sans-serif",
    cursor: interactive ? "pointer" : "default",
    position: "relative",
    overflow: "hidden", // for ripple
    transition: "all 0.2s ease",
    ...getVariantStyles(),
  };

  if (gradientEnabled && variant === "solid") {
    baseStyle.background = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
  }

  if (dropShadow && variant !== "neumorphic") {
    baseStyle.boxShadow = `0px 4px ${shadowBlur}px ${shadowColor}`;
  }

  // --- Tilt Logic (Simple CSS 3D) ---
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -tiltMax, y: x * tiltMax });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={interactive ? { scale: hoverScale } : {}}
        whileTap={interactive && clickRipple ? { scale: 0.95 } : {}}
        style={{
          ...baseStyle,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${depth}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Status Dot */}
        {showDot && (
          <span className="flex relative w-2.5 h-2.5 mr-1">
            {dotPulse && (
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: dotColor }}
              ></span>
            )}
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: dotColor }}
            ></span>
          </span>
        )}

        {/* Icon Left */}
        {showIcon && iconPosition === "left" && <Icon icon={iconName} />}

        {/* Label */}
        <span>{label}</span>

        {/* Count */}
        {count && (
          <span className="ml-1 px-1.5 py-0.5 text-[0.8em] rounded-full bg-white/20">
            {count}
          </span>
        )}

        {/* Icon Right */}
        {showIcon && iconPosition === "right" && <Icon icon={iconName} />}

        {/* Glare Effect */}
        {tiltEnabled && (
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
            style={{ opacity: glareOpacity, mixBlendMode: "overlay" }}
          />
        )}
      </motion.div>

      {/* 3D Object Overlay (For 'Over-the-top' 3D mode) */}
      {icon3DEnabled && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas gl={{ alpha: true }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <mesh position={[0, 1.5, 0]}>
                {icon3DGeometry === "sphere" && (
                  <sphereGeometry args={[0.5, 32, 32]} />
                )}
                {icon3DGeometry === "cube" && (
                  <boxGeometry args={[0.8, 0.8, 0.8]} />
                )}
                {icon3DGeometry === "torus" && (
                  <torusGeometry args={[0.4, 0.15, 16, 32]} />
                )}
                <meshStandardMaterial
                  color={color}
                  roughness={0.3}
                  metalness={0.8}
                />
              </mesh>
            </Float>
          </Canvas>
        </div>
      )}
    </div>
  );
}

// Simple Icon Map
function Icon({ icon }: { icon: string }) {
  // Just a placeholder SVG map
  const svgs: Record<string, React.ReactNode> = {
    star: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    check: (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    alert: (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    notification: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
      </svg>
    ),
  };
  return svgs[icon] || svgs.star;
}
