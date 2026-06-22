import React from "react";
import { Footprints, Rocket, Star } from "lucide-react";
import { type SpinnerLabelConfig, type SpinnerState } from "../types";
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

function renderAnimatedIndicator(label: SpinnerLabelConfig) {
  const size = label.size || 24;

  switch (label.animatedIndicator) {
    case "rocket":
      return <Rocket size={size} strokeWidth={2.25} />;
    case "walking-person":
      return <Footprints size={size} strokeWidth={2.25} />;
    case "spinning-star":
    default:
      return <Star size={size} strokeWidth={2.25} />;
  }
}

function renderLabelContent(label: SpinnerLabelConfig) {
  if (label.type === "text") {
    return label.text || "";
  }

  if (label.type === "icon") {
    if (label.customSvg) {
      return (
        <span
          className="inline-flex items-center justify-center"
          style={{ width: label.size, height: label.size }}
          dangerouslySetInnerHTML={{ __html: label.customSvg }}
        />
      );
    }

    return (
      <span
        className="inline-flex rounded-md border border-current/20 px-2 py-1 text-[0.7em] uppercase tracking-[0.18em]"
        aria-hidden="true"
      >
        {label.iconName || "ICON"}
      </span>
    );
  }

  if (label.type === "animated") {
    return (
      <span className="inline-flex animate-bounce items-center justify-center">
        {renderAnimatedIndicator(label)}
      </span>
    );
  }

  return null;
}

function getLabelPositionStyle(position: SpinnerLabelConfig["position"]) {
  const style: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
  };

  switch (position) {
    case "top-left":
      return { ...style, top: 20, left: 20 };
    case "top-center":
      return { ...style, top: 20, left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { ...style, top: 20, right: 20 };
    case "center-left":
      return { ...style, top: "50%", left: 20, transform: "translateY(-50%)" };
    case "center":
      return {
        ...style,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    case "center-right":
      return { ...style, top: "50%", right: 20, transform: "translateY(-50%)" };
    case "bottom-left":
      return { ...style, bottom: 20, left: 20 };
    case "bottom-center":
      return {
        ...style,
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "bottom-right":
      return { ...style, bottom: 20, right: 20 };
    default:
      return style;
  }
}

export function SpinnerPreview({ state }: { state: SpinnerState }) {
  const [isFocused, setIsFocused] = React.useState(false);
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
    <div
      role={state.ariaHidden ? undefined : state.role}
      aria-live={state.ariaHidden ? undefined : state.ariaLive}
      aria-label={state.ariaHidden ? undefined : state.label || undefined}
      aria-valuetext={state.ariaHidden ? undefined : state.ariaValueText || undefined}
      aria-hidden={state.ariaHidden || undefined}
      tabIndex={state.focusRingEnabled && !state.disabled ? 0 : undefined}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-hidden"
      style={{
        opacity: state.disabled ? state.disabledOpacity : 1,
        pointerEvents: state.disabled ? "none" : undefined,
        transition: state.transitionDuration > 0 ? `opacity ${state.transitionDuration}ms ${state.transitionEasing}` : undefined,
        outline: isFocused && state.focusRingEnabled ? `${state.focusRingWidth}px solid ${state.focusRingColor}` : undefined,
        outlineOffset: isFocused && state.focusRingEnabled ? state.focusRingOffset : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {renderVariant()}
      </div>

      {(state.labels || []).map((label) => (
        <div
          key={label.id}
          style={{
            ...getLabelPositionStyle(label.position),
            fontSize: label.size,
            color: label.color || "var(--text)",
          }}
          className="font-medium tracking-wide"
        >
          {renderLabelContent(label)}
        </div>
      ))}
    </div>
  );
}
