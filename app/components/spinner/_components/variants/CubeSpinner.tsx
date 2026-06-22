import React from "react";
import { type SpinnerState } from "../../types";

export function CubeSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, perspective } = state;
  const halfSize = size / 2;

  // Create faces style
  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    border: `2px solid ${color1}`,
    background: `${color1}20`, // low opacity fill
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.4,
    color: color1,
  };

  return (
    <div style={{ perspective: `${perspective}px`, width: size, height: size }}>
      <style>
        {`
          @keyframes rotate-cube {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: `rotate-cube ${speed}ms linear infinite`,
        }}
      >
        {/* Front */}
        <div style={{ ...faceStyle, transform: `translateZ(${halfSize}px)` }} />
        {/* Back */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          }}
        />
        {/* Right */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
        />
        {/* Left */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
        />
        {/* Top */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          }}
        />
        {/* Bottom */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          }}
        />
      </div>
    </div>
  );
}
