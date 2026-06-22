import React from "react";
import { type SpinnerState } from "../../types";

export function DotsSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, gap, particleCount, glowIntensity } = state;

  // Calculate individual dot size based on total width and gap
  // Total Width = (dotSize * count) + (gap * (count - 1))
  // We want the whole group to roughly fit 'size' width?
  // Or 'size' is dot size?
  // Let's treat 'size' as the total width of the container for consistency.

  const count = Math.max(1, particleCount);
  const totalGapWidth = gap * (count - 1);
  const availableWidth = Math.max(0, size - totalGapWidth);
  const dotSize = availableWidth / count;

  const dots = Array.from({ length: count });

  const style = {
    display: "flex",
    gap: `${gap}px`,
    alignItems: "center",
    justifyContent: "center",
    // Add glow if needed
    filter:
      glowIntensity > 0
        ? `drop-shadow(0 0 ${glowIntensity}px ${color1})`
        : "none",
  };

  return (
    <div style={style}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-${dotSize}px); }
          }
        `}
      </style>

      {dots.map((_, i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color1, // TODO: Support gradients via background-image?
            borderRadius: "50%",
            animation: `bounce ${speed}ms ease-in-out infinite`,
            animationDelay: `${(i * (speed / count)) / 2}ms`,
          }}
        />
      ))}
    </div>
  );
}
