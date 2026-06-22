import React from "react";
import { motion, type Variants } from "framer-motion";

export type DividerLineProps = {
  orientation: "horizontal" | "vertical";
  thickness: number;
  color: string;
  variant: "solid" | "dashed" | "dotted" | "double";
  borderRadius: number;
  // Glow
  neonGlow: boolean;
  glowColor: string;
  glowBlur: number;
  // Gradient
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  // Animation
  animateBeam: boolean;
  beamColor: string;
  beamSpeed: number;
  shimmerEnabled: boolean;
  shimmerSpeed: number;
  // Drop shadow
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  shadowOpacity: number;
  // Hover
  hoverColor: string;
  hoverOpacity: number;
  // Disabled / transitions
  disabled: boolean;
  disabledOpacity: number;
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
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
  const uniqueId = React.useId();
  const [isHovered, setIsHovered] = React.useState(false);
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
    gradientAngle,
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
    shadowEnabled,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowOpacity,
    hoverColor,
    hoverOpacity,
    disabled,
    disabledOpacity,
    transitionDuration,
    transitionEasing,
  } = props;

  const isHorizontal = orientation === "horizontal";
  const isSolid = variant === "solid";
  const isDouble = variant === "double";
  const doubleGap = Math.max(2, thickness);
  const axisSize = isDouble ? thickness * 2 + doubleGap : thickness;
  const interactive = !disabled && (hoverColor !== color || hoverOpacity !== 1);
  const lineColor = disabled ? color : interactive && isHovered ? hoverColor : color;
  const lineOpacity = disabled ? disabledOpacity : interactive && isHovered ? hoverOpacity : 1;
  const fillBackground = gradientEnabled
    ? `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`
    : lineColor;

  // Shadow style
  const dropShadowHex = Math.round(shadowOpacity * 255).toString(16).padStart(2, "0");
  const dropShadow = shadowEnabled
    ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${dropShadowHex}`
    : "";
  const glowShadow = neonGlow
    ? `0 0 ${glowBlur}px ${glowColor}, 0 0 ${glowBlur * 2}px ${glowColor}`
    : "";
  const shadowStyle = [dropShadow, glowShadow].filter(Boolean).join(", ") || "none";

  // Common Dimensions
  const style: React.CSSProperties = {
    flex: 1,
    position: "relative",
    [isHorizontal ? "height" : "width"]: `${axisSize}px`,
    [isHorizontal ? "width" : "height"]: "100%",
    borderRadius: `${borderRadius}px`,
    boxShadow: isSolid || isDouble ? shadowStyle : "none",
    overflow: "hidden", // For beam containment in solid/double mode
    opacity: lineOpacity,
    transition: transitionDuration > 0 ? `opacity ${transitionDuration}ms ${transitionEasing}, background-color ${transitionDuration}ms ${transitionEasing}` : undefined,
    pointerEvents: disabled ? "none" : undefined,
  };
  const hoverHandlers = interactive
    ? { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) }
    : {};

  // Render Solid / Double (Div implementation)
  if (isSolid || isDouble) {
    if (!isDouble) {
      style.backgroundColor = gradientEnabled ? undefined : lineColor;
      style.backgroundImage = gradientEnabled ? fillBackground : undefined;
    }

    return (
      <div style={style} {...hoverHandlers}>
        {isDouble ? (
          <>
            <div
              style={{
                position: "absolute",
                [isHorizontal ? "top" : "left"]: 0,
                [isHorizontal ? "left" : "top"]: 0,
                [isHorizontal ? "height" : "width"]: `${thickness}px`,
                [isHorizontal ? "width" : "height"]: "100%",
                borderRadius: `${borderRadius}px`,
                background: fillBackground,
              }}
            />
            <div
              style={{
                position: "absolute",
                [isHorizontal ? "bottom" : "right"]: 0,
                [isHorizontal ? "left" : "top"]: 0,
                [isHorizontal ? "height" : "width"]: `${thickness}px`,
                [isHorizontal ? "width" : "height"]: "100%",
                borderRadius: `${borderRadius}px`,
                background: fillBackground,
              }}
            />
          </>
        ) : null}
        {animateBeam && (
          <motion.div
            variants={beamVariants}
            animate="animate"
            transition={{
              repeat: Infinity,
              duration: beamSpeed || 2,
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
  const gradId = `grad-${uniqueId}`;

  const strokeWidth = thickness;
  const dashArray =
    variant === "dotted"
      ? `0 ${strokeWidth * 2}`
      : `${strokeWidth * 3} ${strokeWidth * 2}`;
  const lineCap = variant === "dotted" ? "round" : "butt";

  return (
    <div style={{ ...style, boxShadow: "none", overflow: "visible" }} {...hoverHandlers}>
      <svg
        width="100%"
        height="100%"
        style={{
          overflow: "visible",
          filter: [
            neonGlow ? `drop-shadow(0 0 ${glowBlur}px ${glowColor})` : "",
            shadowEnabled ? `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}${dropShadowHex})` : "",
          ].filter(Boolean).join(" ") || "none",
          transition: transitionDuration > 0 ? `filter ${transitionDuration}ms ${transitionEasing}` : undefined,
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
              gradientTransform={`rotate(${gradientAngle}, 0.5, 0.5)`}
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
          stroke={gradientEnabled ? `url(#${gradId})` : lineColor}
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
            duration: beamSpeed || 2,
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
