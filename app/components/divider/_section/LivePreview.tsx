"use client";

import React from "react";
import {
  Star,
  Check,
  Heart,
  Shield,
  Zap,
  Bell,
  AlertCircle,
} from "lucide-react";

import { DividerLine } from "./DividerLine";
import type { DividerState } from "../types";

function renderDividerIcon(iconName: string, iconSize: number) {
  switch (iconName) {
    case "check":
      return <Check size={iconSize} />;
    case "heart":
      return <Heart size={iconSize} />;
    case "shield":
      return <Shield size={iconSize} />;
    case "zap":
      return <Zap size={iconSize} />;
    case "bell":
      return <Bell size={iconSize} />;
    case "alert":
      return <AlertCircle size={iconSize} />;
    case "star":
    default:
      return <Star size={iconSize} />;
  }
}

export default function LivePreview({ state }: { state: DividerState }) {
  const {
    orientation,
    width,
    gap, // Note: Gap is handled by the parent layout usually, but here we just render lines. The flex-gap handled in styling if specific.
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
    contentType,
    iconName,
    iconSize,
    fontSize,
    fontWeight,
    labelTransform,
    letterSpacing,
    opacity,
    interactiveResize,
    ariaRole,
    ariaLabel,
    focusRingEnabled,
    focusRingWidth,
    focusRingOffset,
    focusRingColor,
    disabled,
    disabledOpacity,
    marginTop,
    marginBottom,
  } = state;
  const [isFocused, setIsFocused] = React.useState(false);

  const isHorizontal = orientation === "horizontal";

  // --- Styles ---
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    position: "relative",
  };

  const wrapperStyle: React.CSSProperties = {
    width: isHorizontal ? width : undefined,
    height: !isHorizontal ? "300px" : undefined,
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    opacity: disabled ? disabledOpacity : opacity,
    gap: `${gap}px`, // Apply gap if label is present? Actually gap usually applies between items.
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    resize: interactiveResize
      ? isHorizontal
        ? "horizontal"
        : "vertical"
      : "none",
    overflow: interactiveResize ? "auto" : "visible",
    pointerEvents: disabled ? "none" : undefined,
    outline: isFocused && focusRingEnabled ? `${focusRingWidth}px solid ${focusRingColor}` : undefined,
    outlineOffset: isFocused && focusRingEnabled ? focusRingOffset : undefined,
  };

  const labelOrder =
    labelPosition === "left" ? -1 : labelPosition === "right" ? 1 : 0;
  const labelPaddingStyle = isHorizontal
    ? `0 ${labelPadding}px`
    : `${labelPadding}px 0`;

  const labelNode = showLabel ? (
    <div
      className="z-10 flex items-center justify-center"
      style={{
        padding: labelPaddingStyle,
        backgroundColor: labelBackground,
        order: labelOrder,
      }}
    >
      {contentType === "text" ? (
        <span
          style={{
            color: labelColor,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight as React.CSSProperties["fontWeight"],
            textTransform: labelTransform as React.CSSProperties["textTransform"],
            letterSpacing: `${letterSpacing}px`,
            whiteSpace: "nowrap",
          }}
        >
          {labelText}
        </span>
      ) : (
        <div style={{ color: labelColor }}>
          {renderDividerIcon(iconName, iconSize)}
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className="overflow-hidden" style={containerStyle}>
      <div
        role={ariaRole === "none" ? undefined : ariaRole}
        aria-label={ariaRole === "none" ? undefined : ariaLabel || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={focusRingEnabled && !disabled ? 0 : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={wrapperStyle}
      >
        <DividerLine {...state} />

        {labelNode}
        {showLabel && labelPosition === "center" && <DividerLine {...state} />}
      </div>
    </div>
  );
}
