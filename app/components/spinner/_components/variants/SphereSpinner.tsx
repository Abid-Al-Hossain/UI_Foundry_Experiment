import React, { useMemo } from "react";
import { type SpinnerState } from "../../types";

export function SphereSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, perspective } = state;
  const radius = size / 2;

  // Distribute dots on sphere (Fibonacci lattice or random)
  const dots = useMemo(() => {
    const points = [];
    const count = 40; // Fixed count for density
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push({ x: x * radius, y: y * radius, z: z * radius });
    }
    return points;
  }, [radius]);

  return (
    <div style={{ perspective: `${perspective}px`, width: size, height: size }}>
      <style>
        {`
          @keyframes rotate-sphere {
             0% { transform: rotateY(0deg) rotateX(0deg); }
             100% { transform: rotateY(360deg) rotateX(360deg); }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: `rotate-sphere ${speed}ms linear infinite`,
        }}
      >
        {dots.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: color1,
              transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
              // Optional: Make dots always face camera? (Billboard)
              // transform: ... + 'rotateX(-...)' hard to sync.
            }}
          />
        ))}
      </div>
    </div>
  );
}
