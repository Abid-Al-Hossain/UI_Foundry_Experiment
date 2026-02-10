"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Float, Center } from "@react-three/drei";
import {
  Star,
  Check,
  AlertTriangle,
  Bell,
  Heart,
  Shield,
  Zap,
} from "lucide-react";
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
    iconSize,
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

  const iconSizePx = (fontSize * (iconSize || 100)) / 100;

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
        {showIcon && iconPosition === "left" && (
          <>
            {iconName === "star" && <Star size={iconSizePx} />}
            {iconName === "check" && <Check size={iconSizePx} />}
            {iconName === "alert" && <AlertTriangle size={iconSizePx} />}
            {iconName === "bell" && <Bell size={iconSizePx} />}
            {iconName === "heart" && <Heart size={iconSizePx} />}
            {iconName === "shield" && <Shield size={iconSizePx} />}
            {iconName === "zap" && <Zap size={iconSizePx} />}
          </>
        )}

        {/* Label */}
        <span>{label}</span>

        {/* Count */}
        {count && (
          <span className="ml-1 px-1.5 py-0.5 text-[0.8em] rounded-full bg-white/20">
            {count}
          </span>
        )}

        {/* Icon Right */}
        {showIcon && iconPosition === "right" && (
          <>
            {iconName === "star" && <Star size={iconSizePx} />}
            {iconName === "check" && <Check size={iconSizePx} />}
            {iconName === "alert" && <AlertTriangle size={iconSizePx} />}
            {iconName === "bell" && <Bell size={iconSizePx} />}
            {iconName === "heart" && <Heart size={iconSizePx} />}
            {iconName === "shield" && <Shield size={iconSizePx} />}
            {iconName === "zap" && <Zap size={iconSizePx} />}
          </>
        )}

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
