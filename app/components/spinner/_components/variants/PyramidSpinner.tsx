import React from "react";
import { type SpinnerState } from "../../types";

export function PyramidSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, perspective } = state;
  const halfSize = size / 2;

  const triangleStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    background: `linear-gradient(to top, ${color1}20, ${color1})`,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    transformOrigin: "bottom center",
    // Border trick for edges might be needed or just gradient
  };

  return (
    <div style={{ perspective: `${perspective}px`, width: size, height: size }}>
      <style>
        {`
          @keyframes rotate-y {
            from { transform: rotateY(0deg) rotateX(15deg); }
            to { transform: rotateY(360deg) rotateX(15deg); }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: `rotate-y ${speed}ms linear infinite`,
        }}
      >
        {/* We need 4 triangles tilted in.
            Base is at Y=height.
            Tilt angle approx 30deg from vertical?
        */}

        {/* Front */}
        <div
          style={{
            ...triangleStyle,
            transform: `translateZ(${halfSize}px) rotateX(30deg)`,
          }}
        />
        {/* Back */}
        <div
          style={{
            ...triangleStyle,
            transform: `rotateY(180deg) translateZ(${halfSize}px) rotateX(30deg)`,
          }}
        />
        {/* Right */}
        <div
          style={{
            ...triangleStyle,
            transform: `rotateY(90deg) translateZ(${halfSize}px) rotateX(30deg)`,
          }}
        />
        {/* Left */}
        <div
          style={{
            ...triangleStyle,
            transform: `rotateY(-90deg) translateZ(${halfSize}px) rotateX(30deg)`,
          }}
        />
      </div>
    </div>
  );
}
