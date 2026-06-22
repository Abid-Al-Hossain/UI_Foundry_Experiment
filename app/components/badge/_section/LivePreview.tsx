"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  Star,
  Check,
  AlertTriangle,
  Bell,
  Heart,
  Shield,
  Zap,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import { type BadgeState } from "../types";

const BADGE_SIZE_SCALE: Record<BadgeState["size"], number> = {
  sm: 0.92,
  md: 1,
  lg: 1.1,
};

export default function LivePreview({ state }: { state: BadgeState }) {
  const {
    label,
    count,
    showIcon,
    iconName,
    iconPosition,
    iconGap,
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
    dismissible,
    interactive,
    hoverScale,
    clickRipple,
    icon3DSpinSpeed,
    ariaLabel,
    ariaRole,
    ariaLive,
    borderStyle,
    disabled,
    disabledOpacity,
    disabledCursor,
    transitionDuration,
    transitionEasing,
    focusRingEnabled,
    focusRingWidth,
    focusRingColor,
    hoverBgColor,
    hoverTextColor,
    letterSpacing,
    textTransform,
  } = state;

  const sizeScale = BADGE_SIZE_SCALE[size] ?? 1;
  const scaledFontSize = Math.max(10, Math.round(fontSize * sizeScale));
  const scaledPaddingX = Math.max(0, Math.round(paddingX * sizeScale));
  const scaledPaddingY = Math.max(0, Math.round(paddingY * sizeScale));
  const scaledIconGap = Math.max(0, Math.round(iconGap * sizeScale));
  const scaledIconSize = Math.max(
    12,
    Math.round((scaledFontSize * (iconSize || 100)) / 100),
  );
  const scaledBorderRadius =
    shape === "pill"
      ? "9999px"
      : shape === "circle"
        ? "50%"
        : shape === "square"
          ? "0px"
          : `${Math.max(0, Math.round(borderRadius * sizeScale))}px`;
  const scaledBorderWidth = Math.max(0.5, Number((borderWidth * sizeScale).toFixed(2)));
  const scaledShadowBlur = Math.max(0, Math.round(shadowBlur * sizeScale));
  const scaledDepth = Math.round(depth * sizeScale);
  const scaledTiltMax = Math.max(1, Math.round(tiltMax * sizeScale));

  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);
  const rippleIdRef = useRef(0);
  const rippleTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  const [isBadgeFocused, setIsBadgeFocused] = useState(false);

  useEffect(() => {
    return () => {
      rippleTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // --- Compute Styles ---
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          border: `${scaledBorderWidth}px ${borderStyle} ${color}`,
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
    return scaledBorderRadius;
  };
  const shapeRadius = getShapeRadius() as React.CSSProperties["borderRadius"];

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: `${scaledIconGap}px`,
    padding: `${scaledPaddingY}px ${scaledPaddingX}px`,
    fontSize: `${scaledFontSize}px`,
    fontWeight: 600,
    letterSpacing: `${letterSpacing}px`,
    textTransform,
    borderRadius: shapeRadius,
    fontFamily: "Inter, sans-serif",
    cursor: disabled ? disabledCursor : interactive ? "pointer" : "default",
    position: "relative",
    overflow: "hidden", // for ripple
    transition: transitionDuration > 0 ? `all ${transitionDuration}ms ${transitionEasing}` : "none",
    ...getVariantStyles(),
  };

  if (gradientEnabled && variant === "solid") {
    baseStyle.background = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
  }

  if (dropShadow && variant !== "neumorphic") {
    baseStyle.boxShadow = `0px 4px ${scaledShadowBlur}px ${shadowColor}`;
  }

  if (interactive && isBadgeHovered && !disabled) {
    baseStyle.background = hoverBgColor;
    baseStyle.color = hoverTextColor;
  }

  if (isBadgeFocused && focusRingEnabled) {
    baseStyle.outline = `${focusRingWidth}px solid ${focusRingColor}`;
    baseStyle.outlineOffset = 2;
  }

  if (disabled) {
    baseStyle.opacity = disabledOpacity;
    baseStyle.pointerEvents = "none";
  }

  // --- Tilt Logic (Simple CSS 3D) ---
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -scaledTiltMax, y: x * scaledTiltMax });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const triggerRipple = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!clickRipple) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.15;
    const id = rippleIdRef.current + 1;
    rippleIdRef.current = id;

    setRipples((current) => [
      ...current,
      {
        id,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ]);

    const timer = setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
      rippleTimersRef.current.delete(timer);
    }, 520);
    rippleTimersRef.current.add(timer);
  };

  const renderIcon = () => {
    if (!showIcon) return null;
    if (iconName === "star") return <Star size={scaledIconSize} />;
    if (iconName === "check") return <Check size={scaledIconSize} />;
    if (iconName === "alert") return <AlertTriangle size={scaledIconSize} />;
    if (iconName === "bell") return <Bell size={scaledIconSize} />;
    if (iconName === "heart") return <Heart size={scaledIconSize} />;
    if (iconName === "shield") return <Shield size={scaledIconSize} />;
    if (iconName === "zap") return <Zap size={scaledIconSize} />;
    return null;
  };

  const getGeometry = () => {
    if (icon3DGeometry === "cube") return <boxGeometry args={[0.8, 0.8, 0.8]} />;
    if (icon3DGeometry === "pyramid") return <coneGeometry args={[0.5, 0.9, 4]} />;
    if (icon3DGeometry === "torus") return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
    return <sphereGeometry args={[0.5, 32, 32]} />;
  };

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { handleMouseLeave(); setIsBadgeHovered(false); }}
        onMouseEnter={() => setIsBadgeHovered(true)}
        onFocus={() => setIsBadgeFocused(true)}
        onBlur={() => setIsBadgeFocused(false)}
        onPointerDown={triggerRipple}
        whileHover={interactive && !disabled ? { scale: hoverScale } : {}}
        whileTap={interactive && !disabled ? { scale: clickRipple ? 0.97 : 0.98 } : {}}
        tabIndex={disabled ? -1 : interactive || dismissible ? 0 : undefined}
        aria-disabled={disabled || undefined}
        role={ariaRole === "none" ? undefined : ariaRole}
        aria-label={ariaLabel || undefined}
        aria-live={ariaRole === "none" ? undefined : ariaLive}
        style={{
          ...baseStyle,
          transform: tiltEnabled
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${scaledDepth}px)`
            : use3D
              ? `perspective(1000px) translateZ(${scaledDepth}px)`
              : undefined,
          transformStyle: tiltEnabled || use3D ? "preserve-3d" : undefined,
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
        {showIcon && iconPosition === "left" && renderIcon()}

        {showIcon && iconPosition === "only" && renderIcon()}

        {/* Label */}
        {iconPosition !== "only" && <span>{label}</span>}

        {/* Count */}
        {count && iconPosition !== "only" && (
          <span className="ml-1 px-1.5 py-0.5 text-[0.8em] rounded-full bg-white/20">
            {count}
          </span>
        )}

        {/* Icon Right */}
        {showIcon && iconPosition === "right" && renderIcon()}

        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss badge"
            className="ml-1 inline-flex items-center justify-center rounded-full bg-black/10 p-1 text-current transition-colors hover:bg-black/20"
          >
            <X size={Math.max(12, Math.round(scaledIconSize * 0.72))} />
          </button>
        )}

        {clickRipple &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                background:
                  variant === "solid" ? "rgba(255,255,255,0.28)" : `${color}2E`,
                animation: "badge-ripple 520ms ease-out forwards",
              }}
            />
          ))}

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
            <Float speed={icon3DSpinSpeed} rotationIntensity={1} floatIntensity={1}>
              <mesh position={[0, 1.5, 0]}>
                {getGeometry()}
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

      <style>{`
        @keyframes badge-ripple {
          from {
            transform: scale(0.2);
            opacity: 0.45;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
