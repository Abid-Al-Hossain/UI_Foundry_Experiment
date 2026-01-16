"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

export default function LivePreview({ state }: { state: any }) {
  const {
    orientation,
    width,
    thickness,
    gap, // Note: Gap is handled by the parent layout usually, but here we just render lines. The flex-gap handled in styling if specific.
    color,
    variant,
    borderRadius,
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
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
  } = state;

  const isHorizontal = orientation === "horizontal";

  // --- Styles ---
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    position: "relative",
  };

  const wrapperStyle: React.CSSProperties = {
    width: isHorizontal ? width : undefined,
    height: !isHorizontal ? "300px" : undefined,
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    opacity: opacity,
    gap: `${gap}px`, // Apply gap if label is present? Actually gap usually applies between items.
  };

  // Beam Animation Variants
  const beamVariants: Variants = {
    animate: {
      x: ["-100%", "300%"],
      transition: {
        repeat: Infinity,
        duration: parseFloat(beamSpeed) || 2,
        ease: "linear",
      },
    },
  };

  // Helper Component for Line Segment
  const LineSegment = () => {
    // If Solid or using Div-based approach
    // We prefer SVG for Dashed/Dotted to support Gradients correctly.
    // We prefer Div for Solid to support CSS borderRadius/Shadows easily (though SVG can do it too).

    // For specific requirement: "dashed and dotted not working" usually implies with Gradient.
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
      boxShadow: isSolid ? shadowStyle : "none", // SVG handles filter for shadow if needed, or we wrap
      overflow: "hidden", // For beam containment
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
    // We need a unique ID for the gradient definition to avoid conflicts if multiple renders
    const gradId = `grad-${React.useId()}`;

    // Dash Array Calculation
    const strokeWidth = thickness;
    // Dotted: Standard CSS dotted is circles. SVG 'round' linecap with 0 2*width dasharray does circles.
    // Dashed: 3x width dash, 2x width gap?
    const dashArray =
      variant === "dotted"
        ? `0 ${strokeWidth * 2}`
        : `${strokeWidth * 3} ${strokeWidth * 2}`;

    const lineCap = variant === "dotted" ? "round" : "butt";

    return (
      <div style={{ ...style, boxShadow: "none", overflow: "visible" }}>
        {/* We strip overflow hidden to allow SVG shadow/glow if we added it, but let's keep it simple. 
            Actually, the beam needs to be INSIDE or layered. 
            If text variant is dashed, the beam should probably just wash over it.
        */}
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
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 blend-overlay pointer-events-none"
            style={{
              background: `linear-gradient(${
                isHorizontal ? 90 : 180
              }deg, transparent, ${beamColor}, transparent)`,
              mixBlendMode: "overlay", // Ensure it blends nicely
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
  };

  return (
    <div className="overflow-hidden" style={containerStyle}>
      <div style={wrapperStyle}>
        <LineSegment />

        {showLabel && (
          <span
            className="font-medium whitespace-nowrap z-10"
            style={{
              padding: isHorizontal
                ? `0 ${labelPadding}px`
                : `${labelPadding}px 0`,
              color: labelColor,
              backgroundColor: labelBackground,
              order: 0, // Flex order is controlled by structure, but here we can just sandwich if needed.
              // Actually, wrapper is flex. If we render: Line, Label, Line.
              // The original code used a single wrapper with absolute positioning or flex order.
              // Original code: [Line, Label, Line (conditionally)]
            }}
          >
            {labelText}
          </span>
        )}

        {/* Right/Bottom Line only if center label */}
        {showLabel && labelPosition === "center" && <LineSegment />}

        {/* Correction: If label is LEFT, we only need Right line? 
            Original code logic:
            Line 1 is always rendered.
            Label is rendered.
            Line 2 is rendered IF labelPosition === "center".
            
            Order:
            labelPosition === "left": Label (order -1), Line 1 (order 0).
            labelPosition === "right": Line 1 (order 0), Label (order 1).
            labelPosition === "center": Line 1, Label, Line 2.
            
            We need to match this.
            The wrapper is flex row/column.
            If I render <LineSegment /> <Label /> <LineSegment />
            
            Case Left:
            <LineSegment /> (flex:1)
            <Label /> (order -1 -> moves to start)
            Result: Label, LineSegment. Correct.
            
            Case Right:
            <LineSegment />
            <Label /> (order 1 -> moves to end)
            Result: LineSegment, Label. Correct.
            
            Case Center:
            <LineSegment />
            <Label />
            <LineSegment /> (Only if center)
            Result: Line, Label, Line. Correct.
        */}
      </div>
    </div>
  );
}
