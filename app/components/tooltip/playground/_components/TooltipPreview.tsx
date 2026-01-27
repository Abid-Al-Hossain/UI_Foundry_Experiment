"use client";

import React, { useState, useEffect, useRef } from "react";
import { TooltipState } from "../../types";

interface TooltipPreviewProps {
  state: TooltipState;
}

export default function TooltipPreview({ state }: TooltipPreviewProps) {
  const [isVisible, setIsVisible] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate arrow color
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;

  // Build shadow CSS
  const shadowCss = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  // Get animation styles
  const getAnimationStyles = () => {
    const visible = isVisible;
    const duration = `${state.transitionDuration}ms`;
    const easing = state.transitionEasing;

    let transform = "translateX(-50%)";
    let opacity = visible ? state.opacity / 100 : 0;

    if (!visible) {
      switch (state.animationType) {
        case "scale":
          transform += " scale(0.85)";
          break;
        case "shift-away":
          transform += getShiftAwayTransform(state.placement);
          break;
        case "shift-toward":
          transform += getShiftTowardTransform(state.placement);
          break;
        case "perspective":
          transform += " perspective(700px) rotateX(60deg)";
          break;
      }
    }

    return {
      opacity,
      transform,
      transition:
        state.animationType !== "none"
          ? `opacity ${duration} ${easing}, transform ${duration} ${easing}`
          : "none",
    };
  };

  // Helper for shift animations
  const getShiftAwayTransform = (placement: string) => {
    if (placement.startsWith("top")) return " translateY(-10px)";
    if (placement.startsWith("bottom")) return " translateY(10px)";
    if (placement.startsWith("left")) return " translateX(-10px)";
    if (placement.startsWith("right")) return " translateX(10px)";
    return "";
  };

  const getShiftTowardTransform = (placement: string) => {
    if (placement.startsWith("top")) return " translateY(10px)";
    if (placement.startsWith("bottom")) return " translateY(-10px)";
    if (placement.startsWith("left")) return " translateX(10px)";
    if (placement.startsWith("right")) return " translateX(-10px)";
    return "";
  };

  // Get tooltip position styles
  const getPositionStyles = (): React.CSSProperties => {
    const offset = state.offset;
    const base: React.CSSProperties = {
      position: "absolute",
      zIndex: state.zIndex,
    };

    // Main placement
    switch (true) {
      case state.placement.startsWith("top"):
        base.bottom = `calc(100% + ${offset}px)`;
        base.left = "50%";
        base.transform = "translateX(-50%)";
        break;
      case state.placement.startsWith("bottom"):
        base.top = `calc(100% + ${offset}px)`;
        base.left = "50%";
        base.transform = "translateX(-50%)";
        break;
      case state.placement.startsWith("left"):
        base.right = `calc(100% + ${offset}px)`;
        base.top = "50%";
        base.transform = "translateY(-50%)";
        break;
      case state.placement.startsWith("right"):
        base.left = `calc(100% + ${offset}px)`;
        base.top = "50%";
        base.transform = "translateY(-50%)";
        break;
    }

    // Alignment adjustments
    if (state.placement.includes("-start")) {
      if (
        state.placement.startsWith("top") ||
        state.placement.startsWith("bottom")
      ) {
        base.left = "0";
        base.transform = "none";
      } else {
        base.top = "0";
        base.transform = "none";
      }
    }
    if (state.placement.includes("-end")) {
      if (
        state.placement.startsWith("top") ||
        state.placement.startsWith("bottom")
      ) {
        base.left = "auto";
        base.right = "0";
        base.transform = "none";
      } else {
        base.top = "auto";
        base.bottom = "0";
        base.transform = "none";
      }
    }

    return base;
  };

  // Get arrow position styles
  const getArrowStyles = (): React.CSSProperties => {
    const size = state.arrowSize;
    const base: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
    };

    const borderSize = `${size}px`;
    const transparent = "transparent";

    switch (true) {
      case state.placement.startsWith("top"):
        base.top = "100%";
        base.left = "50%";
        base.transform = "translateX(-50%)";
        base.borderLeft = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${transparent}`;
        base.borderTop = `${borderSize} solid ${arrowColor}`;
        break;
      case state.placement.startsWith("bottom"):
        base.bottom = "100%";
        base.left = "50%";
        base.transform = "translateX(-50%)";
        base.borderLeft = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${arrowColor}`;
        break;
      case state.placement.startsWith("left"):
        base.left = "100%";
        base.top = "50%";
        base.transform = "translateY(-50%)";
        base.borderTop = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${transparent}`;
        base.borderLeft = `${borderSize} solid ${arrowColor}`;
        break;
      case state.placement.startsWith("right"):
        base.right = "100%";
        base.top = "50%";
        base.transform = "translateY(-50%)";
        base.borderTop = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${arrowColor}`;
        break;
    }

    return base;
  };

  // Handle trigger interactions
  const handleTriggerEnter = () => {
    if (state.disabled) return;
    if (state.triggerEvent.includes("mouseenter")) {
      setTimeout(() => setIsVisible(true), state.showDelay);
    }
  };

  const handleTriggerLeave = () => {
    if (state.disabled) return;
    if (state.triggerEvent.includes("mouseenter") && !state.interactive) {
      setTimeout(() => setIsVisible(false), state.hideDelay);
    }
  };

  const handleTriggerClick = () => {
    if (state.disabled) return;
    if (state.triggerEvent === "click") {
      setIsVisible(!isVisible);
    }
  };

  const handleTriggerFocus = () => {
    if (state.disabled) return;
    if (state.triggerEvent.includes("focus")) {
      setIsVisible(true);
    }
  };

  const handleTriggerBlur = () => {
    if (state.disabled) return;
    if (state.triggerEvent.includes("focus") && !state.interactive) {
      setIsVisible(false);
    }
  };

  // Always show tooltip in preview for visibility
  useEffect(() => {
    setIsVisible(true);
  }, [state]);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <div className="relative inline-block">
        {/* Trigger Element */}
        <button
          ref={triggerRef}
          onMouseEnter={handleTriggerEnter}
          onMouseLeave={handleTriggerLeave}
          onClick={handleTriggerClick}
          onFocus={handleTriggerFocus}
          onBlur={handleTriggerBlur}
          disabled={state.disabled}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
          }}
        >
          {state.triggerText}
        </button>

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          role={state.role}
          aria-label={state.ariaLabel || undefined}
          aria-describedby={state.ariaDescribedBy || undefined}
          style={{
            ...getPositionStyles(),
            ...getAnimationStyles(),
            background: state.bgColor,
            color: state.textColor,
            borderRadius: `${state.borderRadius}px`,
            padding: `${state.paddingY}px ${state.paddingX}px`,
            maxWidth: `${state.maxWidth}px`,
            border:
              state.borderWidth > 0
                ? `${state.borderWidth}px solid ${state.borderColor}`
                : "none",
            boxShadow: shadowCss,
            backdropFilter:
              state.backdropFilter !== "none"
                ? state.backdropFilter
                : undefined,
            fontFamily: state.fontFamily || "inherit",
            fontSize: `${state.fontSize || 14}px`,
            fontWeight: state.fontWeight || 500,
            textAlign: state.textAlign || "center",
            whiteSpace: "normal",
            wordBreak: "break-word",
            pointerEvents: state.interactive ? "auto" : "none",
          }}
        >
          {state.allowHTML ? (
            <div dangerouslySetInnerHTML={{ __html: state.content }} />
          ) : (
            <span>
              {state.truncationLimit > 0 &&
              state.content.length > state.truncationLimit
                ? `${state.content.slice(0, state.truncationLimit)}...`
                : state.content}
            </span>
          )}

          {/* Arrow */}
          {state.showArrow && <div style={getArrowStyles()} />}
        </div>
      </div>

      {/* Placement Indicator */}
      <div
        className="absolute bottom-4 left-4 text-xs font-medium px-2 py-1 rounded-md"
        style={{
          background: "var(--surface)",
          color: "var(--muted)",
          border: "1px solid var(--border)",
        }}
      >
        Placement: {state.placement}
      </div>
    </div>
  );
}
