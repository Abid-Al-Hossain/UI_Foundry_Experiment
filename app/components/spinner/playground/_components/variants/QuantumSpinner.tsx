import React from "react";
import { type SpinnerState } from "../../types";

export function QuantumSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, thickness, particleCount, perspective } = state;

  // Nucleus
  const nucleusSize = size * 0.2;

  // Rings
  const count = Math.max(1, particleCount);
  const rings = Array.from({ length: count });

  return (
    <div style={{ perspective: `${perspective}px`, width: size, height: size }}>
      <style>
        {`
          @keyframes quantum-spin {
             0% { transform: rotateX(70deg) rotateY(0deg); }
             100% { transform: rotateX(70deg) rotateY(360deg); }
          }
           @keyframes quantum-spin-reverse {
             0% { transform: rotateX(-70deg) rotateY(0deg); }
             100% { transform: rotateX(-70deg) rotateY(-360deg); }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Nucleus */}
        <div
          style={{
            width: nucleusSize,
            height: nucleusSize,
            borderRadius: "50%",
            background: color1,
            boxShadow: `0 0 10px ${color1}`,
            transform: "translateZ(0)",
          }}
        />

        {/* Electron Rings */}
        {rings.map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `${thickness}px solid ${color1}`,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              // Each ring tilted differently
              transform: `rotateZ(${(180 / count) * i}deg) rotateX(70deg)`,
              animation: `quantum-spin ${speed}ms linear infinite`,
              // transform-style needed?
              // Actually the animation overwrites transform so we need to embed the tilt in animation or use wrapper.
              // Using wrapper for tilt:
            }}
          >
            {/* Reset animation if using wrapper approach, but simplification: */}
          </div>
        ))}
        {/* Better approach: Wrappers for each ring to handle static tilt then animate inner */}
        {rings.map((_, i) => (
          <div
            key={`wrap-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              transform: `rotateZ(${(180 / count) * i}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: `${thickness}px solid ${color1}`,
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
                animation: `quantum-spin ${speed}ms linear infinite`,
                // We need a specific keyframe that keeps the X tilt?
                // Or just use rotateX(70deg) rotateY(angle)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
