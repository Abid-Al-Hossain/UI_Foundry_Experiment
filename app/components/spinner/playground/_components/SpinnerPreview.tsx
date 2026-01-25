import React from "react";
import { type SpinnerState } from "../../types";
import { CircularSpinner } from "./variants/CircularSpinner";
import { DotsSpinner } from "./variants/DotsSpinner";
import { BarsSpinner } from "./variants/BarsSpinner";
import { InfinitySpinner } from "./variants/InfinitySpinner";
import { CubeSpinner } from "./variants/CubeSpinner";
import { PyramidSpinner } from "./variants/PyramidSpinner";
import { SphereSpinner } from "./variants/SphereSpinner";
import { LiquidSpinner } from "./variants/LiquidSpinner";
import { GlitchSpinner } from "./variants/GlitchSpinner";
import { QuantumSpinner } from "./variants/QuantumSpinner";

export function SpinnerPreview({ state }: { state: SpinnerState }) {
  const renderVariant = () => {
    switch (state.variant) {
      case "circular":
        return <CircularSpinner state={state} />;
      case "dots":
        return <DotsSpinner state={state} />;
      case "bars":
        return <BarsSpinner state={state} />;
      case "infinity":
        return <InfinitySpinner state={state} />;
      case "cube":
        return <CubeSpinner state={state} />;
      case "pyramid":
        return <PyramidSpinner state={state} />;
      case "sphere":
        return <SphereSpinner state={state} />;
      case "liquid":
        return <LiquidSpinner state={state} />;
      case "glitch":
        return <GlitchSpinner state={state} />;
      case "quantum":
        return <QuantumSpinner state={state} />;
      default:
        return <div>Unknown Variant</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow effect behind spinner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {renderVariant()}
      </div>

      {/* Absolute Labels Overlay */}
      {state.labels?.map((label) => {
        // Positioning logic
        const posStyle: React.CSSProperties = {
          position: "absolute",
          pointerEvents: "none",
        };

        switch (label.position) {
          case "top-left":
            Object.assign(posStyle, { top: 20, left: 20 });
            break;
          case "top-center":
            Object.assign(posStyle, {
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
            });
            break;
          case "top-right":
            Object.assign(posStyle, { top: 20, right: 20 });
            break;
          case "center-left":
            Object.assign(posStyle, {
              top: "50%",
              left: 20,
              transform: "translateY(-50%)",
            });
            break;
          case "center":
            Object.assign(posStyle, {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            });
            break;
          case "center-right":
            Object.assign(posStyle, {
              top: "50%",
              right: 20,
              transform: "translateY(-50%)",
            });
            break;
          case "bottom-left":
            Object.assign(posStyle, { bottom: 20, left: 20 });
            break;
          case "bottom-center":
            Object.assign(posStyle, {
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
            });
            break;
          case "bottom-right":
            Object.assign(posStyle, { bottom: 20, right: 20 });
            break;
        }

        const content = () => {
          if (label.type === "text") return label.text;
          if (label.type === "icon") {
            // Render simple icon placeholder or real icon if we imported Lucide
            // For now, assuming "library" meant we should map name to Lucide.
            // For simplicity in this step, let's just render the name if icon system isn't fully wired or use a placeholder.
            return (
              <div
                style={{
                  width: label.size,
                  height: label.size,
                  background: "currentColor",
                  mask: `url(${label.customSvg})`,
                }}
              />
            );
          }
          if (label.type === "animated")
            return (
              <span>{label.animatedIndicator === "rocket" ? "🚀" : "⭐"}</span>
            );
          return null;
        };

        return (
          <div
            key={label.id}
            style={{
              ...posStyle,
              fontSize: label.size,
              color: label.color || "var(--text)",
            }}
            className="font-medium tracking-wide"
          >
            {label.text}
            {label.type === "animated" && (
              <span className="animate-bounce inline-block">
                {label.animatedIndicator === "rocket"
                  ? "🚀"
                  : label.animatedIndicator === "walking-person"
                    ? "🚶"
                    : "⭐"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
