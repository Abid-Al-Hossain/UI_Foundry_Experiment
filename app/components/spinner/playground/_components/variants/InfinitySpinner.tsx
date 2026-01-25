import React from "react";
import { type SpinnerState } from "../../types";

export function InfinitySpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, thickness, linecap, glowIntensity } = state;

  // Infinity Symbol Path (approximate for viewBox 0 0 100 50)
  // Scale it to container logic if needed, or just use viewBox and scale via width/height

  const path =
    "M20,50 C20,33.3333333 33.3333333,20 50,20 C66.6666667,20 80,33.3333333 80,50 C80,66.6666667 66.6666667,80 50,80 C33.3333333,80 20,66.6666667 20,50 Z";
  // Wait, circular is boring. Let's do a real figure 8.
  // M 30 50 C 30 30 70 30 70 50 C 70 70 30 70 30 50
  // No, that's just an oval.
  // M 10 50 C 10 0 50 0 50 50 C 50 100 90 100 90 50 C 90 0 50 0 50 50 C 50 100 10 100 10 50

  // Refined path for 100x100 box
  const pathD =
    "M50,50 C30,20 0,20 0,50 C0,80 30,80 50,50 C70,20 100,20 100,50 C100,80 70,80 50,50";
  // The length of this path needs to be known for dasharray.
  // Approx length ~250?

  return (
    <div style={{ width: size, height: size / 2 }}>
      <style>
        {`
          @keyframes dash-infinity {
            to { stroke-dashoffset: -300; }
          }
        `}
      </style>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter:
            glowIntensity > 0
              ? `drop-shadow(0 0 ${glowIntensity}px ${color1})`
              : "none",
        }}
      >
        {/* Track */}
        <path
          d={pathD}
          stroke={state.trackColor}
          strokeOpacity={state.trackOpacity}
          strokeWidth={thickness}
          strokeLinecap={linecap}
        />

        {/* Animated Line */}
        <path
          d={pathD}
          stroke={color1}
          strokeWidth={thickness}
          strokeLinecap={linecap}
          strokeDasharray="300"
          strokeDashoffset="0"
          style={{
            animation: `dash-infinity ${speed}ms linear infinite`,
            strokeDasharray: "20 280", // Small dash, long gap
          }}
        />
      </svg>
    </div>
  );
}
