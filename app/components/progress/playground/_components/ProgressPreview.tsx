import React from "react";
import { type ProgressState } from "../../types";
import { motion } from "framer-motion";

export function ProgressPreview({ state }: { state: ProgressState }) {
  const {
    value,
    max,
    min,
    bufferValue,
    width,
    thickness,
    radius,
    shape,
    colorMode,
    color1,
    color2,
    trackColor,
    trackOpacity,
    effect,
    stripeColor,
    stripeSpeed,
    glowBlur,
    glitchIntensity,
    liquidViscosity,
    orientation,
    hasParticles,
    particleType,
  } = state;

  const percent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100),
  );
  const bufferPercent = Math.min(
    100,
    Math.max(0, ((bufferValue - min) / (max - min)) * 100),
  );
  const isVertical = orientation === "vertical";

  // Styles
  const barRadius = shape === "pill" ? 9999 : radius;
  const sizeStyle = isVertical
    ? { width: thickness, height: width }
    : { width: width, height: thickness };

  const fillBackground =
    colorMode === "gradient"
      ? `linear-gradient(${isVertical ? "to top" : "to right"}, ${color1}, ${color2})`
      : color1;

  // Effects Logic
  const isLiquid = effect === "liquid";
  const isGlitch = effect === "glitch";
  const isStripes = effect === "stripes";
  const isGlow = effect === "glow";

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Filters for Liquid Effect */}
      {isLiquid && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={liquidViscosity}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Main Container */}
      <div
        style={{
          ...sizeStyle,
          background: trackColor,
          opacity: trackOpacity < 1 ? 1 : undefined, // Handle opacity on track specifically if needed, but usually whole bar
          borderRadius: barRadius,
          overflow: isLiquid ? "visible" : "hidden", // Liquid needs overflow for droplets
          filter: isLiquid ? "url(#goo)" : "none",
          boxShadow: isGlow ? `0 0 ${glowBlur}px ${color1}` : "none",
          position: "relative",
        }}
      >
        {/* Track Background if separation needed, or assume container bg is track */}

        {/* Buffer Bar */}
        {state.mode === "buffer" && (
          <div
            style={{
              position: "absolute",
              [isVertical ? "bottom" : "left"]: 0,
              [isVertical ? "width" : "height"]: "100%",
              [isVertical ? "height" : "width"]: `${bufferPercent}%`,
              background: color1,
              opacity: 0.3,
              transition: "all 0.3s ease",
              borderRadius: barRadius,
            }}
          />
        )}

        {/* Glitch Layers (Underlay) */}
        {isGlitch && (
          <>
            <GlitchLayer
              state={state}
              percent={percent}
              color="red"
              offset={-2}
              opacity={0.7}
            />
            <GlitchLayer
              state={state}
              percent={percent}
              color="blue"
              offset={2}
              opacity={0.7}
            />
          </>
        )}

        {/* Primary Fill Bar */}
        <motion.div
          initial={false}
          animate={{
            [isVertical ? "height" : "width"]: `${percent}%`,
          }}
          transition={{
            type: isGlitch ? false : "spring",
            stiffness: 100,
            damping: 20,
          }}
          style={{
            position: "absolute",
            [isVertical ? "bottom" : "left"]: 0,
            [isVertical ? "width" : "height"]: "100%",
            background: fillBackground,
            borderRadius: barRadius,
            zIndex: 10,
          }}
        >
          {/* Stripes Overlay */}
          {isStripes && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(45deg, ${stripeColor} 25%, transparent 25%, transparent 50%, ${stripeColor} 50%, ${stripeColor} 75%, transparent 75%, transparent)`,
                backgroundSize: "30px 30px",
                borderRadius: barRadius,
              }}
              className="animate-stripes"
            />
          )}

          {/* Liquid Droplet Leading Edge */}
          {isLiquid && (
            <div
              style={{
                position: "absolute",
                [isVertical ? "top" : "right"]: 0,
                [isVertical ? "left" : "top"]: "50%",
                width: thickness * 0.8,
                height: thickness * 0.8,
                background: fillBackground,
                borderRadius: "50%",
                transform: `translate(${isVertical ? "-50%, -50%" : "50%, -50%"})`,
                boxShadow: `0 0 10px ${color1}`,
              }}
            />
          )}
        </motion.div>

        {/* Particles */}
        {hasParticles && (
          <div
            style={{
              position: "absolute",
              [isVertical ? "bottom" : "left"]: `${percent}%`,
              pointerEvents: "none",
            }}
          >
            {/* Simple particle placeholder - would need complex canvas/dom particles */}
            <div className="w-2 h-2 bg-white rounded-full animate-ping absolute" />
          </div>
        )}
      </div>

      {/* Style Injection for Animations */}
      <style jsx>{`
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 60px 0;
          }
        }
        .animate-stripes {
          animation: stripes ${2 / (stripeSpeed || 1)}s linear infinite;
        }
      `}</style>
    </div>
  );
}

function GlitchLayer({ state, percent, color, offset, opacity }: any) {
  const { orientation, width, thickness, radius, shape } = state;
  const isVertical = orientation === "vertical";
  const barRadius = shape === "pill" ? 9999 : radius;

  return (
    <div
      style={{
        position: "absolute",
        [isVertical ? "bottom" : "left"]: 0,
        [isVertical ? "width" : "height"]: "100%",
        [isVertical ? "height" : "width"]: `${percent}%`,
        background: color,
        opacity: opacity,
        borderRadius: barRadius,
        transform: `translate(${offset}px, ${offset}px)`,
        mixBlendMode: "screen",
        clipPath:
          "polygon(0 0, 100% 0, 100% 45%, 0 45%, 0 100%, 100% 100%, 100% 80%, 0 80%)",
        zIndex: 5,
      }}
    />
  );
}
