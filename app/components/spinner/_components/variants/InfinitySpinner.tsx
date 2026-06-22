import React from "react";
import { type SpinnerState } from "../../types";

export function InfinitySpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, thickness, linecap, glowIntensity } = state;
  const pathD =
    "M50,50 C30,20 0,20 0,50 C0,80 30,80 50,50 C70,20 100,20 100,50 C100,80 70,80 50,50";

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
