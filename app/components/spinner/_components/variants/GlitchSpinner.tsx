import React from "react";
import { type SpinnerState } from "../../types";

export function GlitchSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, thickness } = state;

  // Create 3 layers: Base, Red offset, Blue offset
  const layerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: `${thickness}px solid transparent`,
    borderTopColor: color1, // Only part of it
    borderRightColor: color1,
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <style>
        {`
          @keyframes glitch-spin {
             0% { transform: rotate(0deg); }
             100% { transform: rotate(360deg); }
          }
          @keyframes glitch-skew {
            0% { transform: skew(0deg); clip-path: inset(0 0 0 0); }
            20% { transform: skew(-10deg); clip-path: inset(10% 0 40% 0); }
            40% { transform: skew(10deg); clip-path: inset(40% 0 10% 0); }
            60% { transform: skew(-5deg); clip-path: inset(0 0 0 0); }
            80% { transform: skew(5deg); clip-path: inset(50% 0 30% 0); }
            100% { transform: skew(0deg); clip-path: inset(0 0 0 0); }
          }
        `}
      </style>

      {/* Base */}
      <div
        style={{
          ...layerStyle,
          animation: `glitch-spin ${speed}ms linear infinite`,
        }}
      />

      {/* Red Glitch */}
      <div
        style={{
          ...layerStyle,
          borderTopColor: "red",
          borderRightColor: "transparent",
          opacity: 0.7,
          // Frequency of 0 means no glitch. 100 means constant.
          // We can modulate the 'steps' or duration.
          // Let's toggle the animation play state? No.
          // Let's simply scale the duration. Higher freq = shorter duration (faster).
          // Base duration = speed. Modifer = 100 / freq.
          // If freq is 0, duration is infinity.
          animation:
            state.glitchFrequency > 0
              ? `glitch-spin ${speed}ms linear infinite, glitch-skew ${speed * 0.5 * (100 / Math.max(1, state.glitchFrequency))}ms steps(2) infinite reverse`
              : `glitch-spin ${speed}ms linear infinite`,
        }}
      />

      {/* Blue Glitch */}
      <div
        style={{
          ...layerStyle,
          borderTopColor: "cyan",
          borderRightColor: "transparent",
          opacity: 0.7,
          animation:
            state.glitchFrequency > 0
              ? `glitch-spin ${speed}ms linear infinite, glitch-skew ${speed * 0.7 * (100 / Math.max(1, state.glitchFrequency))}ms steps(2) infinite`
              : `glitch-spin ${speed}ms linear infinite`,
        }}
      />
    </div>
  );
}
