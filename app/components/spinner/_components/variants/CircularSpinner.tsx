import React from "react";
import { type SpinnerState } from "../../types";

export function CircularSpinner({ state }: { state: SpinnerState }) {
  const {
    size,
    thickness,
    trackColor,
    trackOpacity,
    color1,
    color2,
    speed,
    linecap,
    glowIntensity,
    easing,
  } = state;

  const center = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animation style
  const animationStyle = {
    animation: `spin ${speed}ms ${easing} infinite`,
  };

  // Glow style
  const filterStyle =
    glowIntensity > 0
      ? { filter: `drop-shadow(0 0 ${glowIntensity}px ${color1})` }
      : {};

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes dash {
            0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
            100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
          }
        `}
      </style>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={filterStyle}
      >
        <defs>
          <linearGradient
            id="spinner-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
          opacity={trackOpacity}
        />

        {/* Indicator */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={
            state.colorMode === "gradient" ? "url(#spinner-gradient)" : color1
          }
          strokeWidth={thickness}
          strokeLinecap={linecap}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25} // Static dash for simple rotate, or animate dash too
          style={{
            transformOrigin: "center",
            ...animationStyle,
          }}
        />
      </svg>
    </div>
  );
}
