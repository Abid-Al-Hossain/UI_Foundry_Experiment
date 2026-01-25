import React from "react";
import { type SpinnerState } from "../../types";

export function LiquidSpinner({ state }: { state: SpinnerState }) {
  const { size, color1, speed, gooeyIntensity } = state;
  const filterId = "gooey-spinner-filter"; // Static for simple playground

  // Gooey Logic:
  // Blur strength around 10.
  // Alpha contrast around 18 -7.
  const blur = gooeyIntensity > 0 ? 5 + gooeyIntensity : 10;

  return (
    <div style={{ width: size, height: size, filter: `url(#${filterId})` }}>
      <style>
        {`
          @keyframes liquid-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
           @keyframes liquid-move {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25%); }
          }
        `}
      </style>

      {/* Filter Definition (Hidden SVG) */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blur}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Moving Blobs */}
      <div className="relative w-full h-full animate-[liquid-rotate_3s_linear_infinite]">
        {/* Blob 1 */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "35%",
            width: "30%",
            height: "30%",
            background: color1,
            borderRadius: "50%",
            transformOrigin: "center 150%",
            animation: `liquid-rotate ${speed}ms linear infinite`,
          }}
        />
        {/* Blob 2 */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "35%",
            width: "40%",
            height: "40%",
            background: color1,
            borderRadius: "50%",
            transformOrigin: "center -100%",
            animation: `liquid-rotate ${speed * 0.7}ms linear infinite reverse`,
          }}
        />
      </div>
    </div>
  );
}
