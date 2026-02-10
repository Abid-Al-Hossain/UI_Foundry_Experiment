import React from "react";
import { motion, type Variants } from "framer-motion";

export type DividerLineProps = {
  orientation: "horizontal" | "vertical";
  thickness: number;
  color: string;
  variant: "solid" | "dashed" | "dotted";
  borderRadius: number;
  // Glow
  neonGlow: boolean;
  glowColor: string;
  glowBlur: number;
  // Gradient
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  // Animation
  animateBeam: boolean;
  beamColor: string;
  beamSpeed: string;
  shimmerEnabled: boolean;
  shimmerSpeed: string;
};

// Beam Animation Variants
const beamVariants: Variants = {
  animate: {
    x: ["-100%", "300%"],
    transition: {
      repeat: Infinity,
      duration: 2, // Will be overridden
      ease: "linear",
    },
  },
};

export function DividerLine(props: DividerLineProps) {
  const {
    orientation,
    thickness,
    color,
    variant,
    borderRadius,
    neonGlow,
    glowColor,
    glowBlur,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
  } = props;

  const isHorizontal = orientation === "horizontal";
  const isSolid = variant === "solid";

  // Shadow style
  const shadowStyle = neonGlow
    ? `0 0 ${glowBlur}px ${glowColor}, 0 0 ${glowBlur * 2}px ${glowColor}`
    : "none";

  // Common Dimensions
  const style: React.CSSProperties = {
    flex: 1,
    position: "relative",
    [isHorizontal ? "height" : "width"]: `${thickness}px`,
    [isHorizontal ? "width" : "height"]: "100%",
    borderRadius: `${borderRadius}px`,
    boxShadow: isSolid ? shadowStyle : "none",
    overflow: "hidden", // For beam containment in solid mode
  };

  // Render Solid (Div implementation)
  if (isSolid) {
    style.backgroundColor = gradientEnabled ? undefined : color;
    style.backgroundImage = gradientEnabled
      ? `linear-gradient(to ${
          isHorizontal ? "right" : "bottom"
        }, ${gradientStart}, ${gradientEnd})`
      : undefined;

    return (
      <div style={style}>
        {animateBeam && (
          <motion.div
            variants={beamVariants}
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: parseFloat(beamSpeed) || 2,
              ease: "linear",
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 blend-overlay"
            style={{
              background: `linear-gradient(${
                isHorizontal ? 90 : 180
              }deg, transparent, ${beamColor}, transparent)`,
            }}
          />
        )}
        {shimmerEnabled && (
          <div
            className="absolute inset-0 animate-pulse bg-white/20"
            style={{ animationDuration: `${shimmerSpeed}s` }}
          />
        )}
      </div>
    );
  }

  // Render Dashed/Dotted (SVG implementation)
  const uniqueId = React.useId();
  const gradId = `grad-${uniqueId}`;

  const strokeWidth = thickness;
  const dashArray =
    variant === "dotted"
      ? `0 ${strokeWidth * 2}`
      : `${strokeWidth * 3} ${strokeWidth * 2}`;
  const lineCap = variant === "dotted" ? "round" : "butt";

  return (
    <div style={{ ...style, boxShadow: "none", overflow: "visible" }}>
      <svg
        width="100%"
        height="100%"
        style={{
          overflow: "visible",
          filter: neonGlow
            ? `drop-shadow(0 0 ${glowBlur}px ${glowColor})`
            : "none",
        }}
      >
        <defs>
          {gradientEnabled && (
            <linearGradient
              id={gradId}
              x1="0"
              y1="0"
              x2={isHorizontal ? "1" : "0"}
              y2={isHorizontal ? "0" : "1"}
            >
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
          )}
        </defs>
        <line
          x1={isHorizontal ? "0" : "50%"}
          y1={isHorizontal ? "50%" : "0"}
          x2={isHorizontal ? "100%" : "50%"}
          y2={isHorizontal ? "50%" : "100%"}
          stroke={gradientEnabled ? `url(#${gradId})` : color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap={lineCap}
        />
      </svg>

      {/* Beam for SVG - Layered on top */}
      {animateBeam && (
        <motion.div
          variants={beamVariants}
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: parseFloat(beamSpeed) || 2,
            ease: "linear",
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 blend-overlay pointer-events-none"
          style={{
            background: `linear-gradient(${
              isHorizontal ? 90 : 180
            }deg, transparent, ${beamColor}, transparent)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
      {shimmerEnabled && (
        <div
          className="absolute inset-0 animate-pulse bg-white/20 pointer-events-none"
          style={{ animationDuration: `${shimmerSpeed}s` }}
        />
      )}
    </div>
  );
}
