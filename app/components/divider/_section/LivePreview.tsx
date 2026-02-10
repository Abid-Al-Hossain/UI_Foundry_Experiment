"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
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

export default function LivePreview({ state }: { state: any }) {
  const {
    orientation,
    width,
    thickness,
    gap, // Note: Gap is handled by the parent layout usually, but here we just render lines. The flex-gap handled in styling if specific.
    color,
    variant,
    borderRadius,
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
    gradientEnabled,
    gradientStart,
    gradientEnd,
    opacity,
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
    neonGlow,
    glowColor,
    glowBlur,
  } = state;

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
    opacity: opacity,
    gap: `${gap}px`, // Apply gap if label is present? Actually gap usually applies between items.
  };

  // Helper Component for Line Segment rendered via DividerLine

  return (
    <div className="overflow-hidden" style={containerStyle}>
      <div style={wrapperStyle}>
        <DividerLine {...state} />

        {showLabel && (
          <div
            className="z-10 flex items-center justify-center"
            style={{
              padding: isHorizontal
                ? `0 ${labelPadding}px`
                : `${labelPadding}px 0`,
              backgroundColor: labelBackground,
              order: 0,
            }}
          >
            {contentType === "text" ? (
              <span
                style={{
                  color: labelColor,
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight as any,
                  textTransform: labelTransform as any,
                  letterSpacing: `${letterSpacing}px`,
                  whiteSpace: "nowrap",
                }}
              >
                {labelText}
              </span>
            ) : (
              <div style={{ color: labelColor }}>
                {iconName === "star" && <Star size={iconSize} />}
                {iconName === "check" && <Check size={iconSize} />}
                {iconName === "heart" && <Heart size={iconSize} />}
                {iconName === "shield" && <Shield size={iconSize} />}
                {iconName === "zap" && <Zap size={iconSize} />}
                {iconName === "bell" && <Bell size={iconSize} />}
                {iconName === "alert" && <AlertCircle size={iconSize} />}
              </div>
            )}
          </div>
        )}

        {/* Right/Bottom Line only if center label */}
        {showLabel && labelPosition === "center" && <DividerLine {...state} />}

        {/* Correction: If label is LEFT, we only need Right line? 
            Original code logic:
            Line 1 is always rendered.
            Label is rendered.
            Line 2 is rendered IF labelPosition === "center".
            
            Order:
            labelPosition === "left": Label (order -1), Line 1 (order 0).
            labelPosition === "right": Line 1 (order 0), Label (order 1).
            labelPosition === "center": Line 1, Label, Line 2.
            
            We need to match this.
            The wrapper is flex row/column.
            If I render <LineSegment /> <Label /> <LineSegment />
            
            Case Left:
            <LineSegment /> (flex:1)
            <Label /> (order -1 -> moves to start)
            Result: Label, LineSegment. Correct.
            
            Case Right:
            <LineSegment />
            <Label /> (order 1 -> moves to end)
            Result: LineSegment, Label. Correct.
            
            Case Center:
            <LineSegment />
            <Label />
            <LineSegment /> (Only if center)
            Result: Line, Label, Line. Correct.
        */}
      </div>
    </div>
  );
}
