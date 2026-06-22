import React from "react";
import { type SpinnerState } from "../../types";

export function BarsSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, gap, particleCount, glowIntensity } = state;

  const count = Math.max(1, particleCount);
  const totalGapWidth = gap * (count - 1);
  const availableWidth = Math.max(0, size - totalGapWidth);
  const barWidth = availableWidth / count;

  // Height is largely aesthetic, let's say 1.5x width or fixed?
  // Use 'size' as visual bounding box.

  const bars = Array.from({ length: count });

  const style = {
    display: "flex",
    gap: `${gap}px`,
    alignItems: "center",
    justifyContent: "center",
    height: size,
    filter:
      glowIntensity > 0
        ? `drop-shadow(0 0 ${glowIntensity}px ${color1})`
        : "none",
  };

  return (
    <div style={style}>
      <style>
        {`
          @keyframes stretch {
            0%, 100% { height: 40%; opacity: 0.5; }
            50% { height: 100%; opacity: 1; }
          }
        `}
      </style>

      {bars.map((_, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            height: "100%",
            backgroundColor: color1,
            borderRadius: Math.min(barWidth, 4),
            animation: `stretch ${speed}ms ease-in-out infinite`,
            animationDelay: `${i * (speed / count / 2)}ms`,
          }}
        />
      ))}
    </div>
  );
}
