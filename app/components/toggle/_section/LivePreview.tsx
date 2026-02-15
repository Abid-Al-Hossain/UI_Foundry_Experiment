"use client";

import React, { useState, useEffect } from "react";
import { ToggleState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

function ThumbIconSVG({
  icon,
  checked,
  color,
  size,
}: {
  icon: string;
  checked: boolean;
  color: string;
  size: number;
}) {
  if (icon === "check" || (icon === "both" && checked)) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8 L6.5 11.5 L13 4.5" />
      </svg>
    );
  }
  if (icon === "cross" || (icon === "both" && !checked)) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    );
  }
  return null;
}

export default function LivePreview({ state }: { state: ToggleState }) {
  const [checked, setChecked] = useState(state.checked);
  useEffect(() => {
    setChecked(state.checked);
  }, [state.checked]);

  // Construct Font Family
  const fontFamily =
    state.fontBucket === "google"
      ? state.googleFontFamily
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";

  // Construct Shadow
  const thumbShadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  const transition = `all ${state.transitionDuration}ms ${state.transitionEasing}`;
  const padding = (state.trackHeight - state.thumbSize) / 2;
  const thumbTranslateX = checked
    ? state.trackWidth - state.thumbSize - padding
    : padding;

  const toggleId = "toggle-preview";
  const cssString = `
    .toggle-track-${toggleId}:hover { background: ${checked ? state.hoverTrackOnBg : state.hoverTrackOffBg} !important; }
    .toggle-track-${toggleId}:hover .toggle-thumb { transform: translateX(${thumbTranslateX}px) scale(${state.hoverThumbScale}) !important; }
    .toggle-track-${toggleId}:active .toggle-thumb { transform: translateX(${thumbTranslateX}px) scale(${state.thumbScaleOnPress}) !important; }
    .toggle-track-${toggleId}:focus-within { box-shadow: 0 0 0 ${state.focusRingWidth}px ${state.focusRingColor} !important; }
  `;

  return (
    <div
      className="flex items-center justify-center p-8"
      style={{ minHeight: 300 }}
    >
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexDirection: state.labelPosition === "left" ? "row-reverse" : "row",
          gap: state.labelGap,
          cursor: state.disabled ? state.disabledCursor : "pointer",
          opacity: state.disabled ? state.disabledOpacity : 1,
        }}
      >
        <div
          className={`toggle-track-${toggleId}`}
          style={{
            position: "relative",
            width: state.trackWidth,
            height: state.trackHeight,
            borderRadius: state.trackBorderRadius,
            background: checked ? state.trackOnBg : state.trackOffBg,
            border:
              state.trackBorderWidth > 0
                ? `${state.trackBorderWidth}px solid ${checked ? state.trackOnBorder : state.trackOffBorder}`
                : "none",
            transition,
            cursor: state.disabled ? state.disabledCursor : "pointer",
            flexShrink: 0,
          }}
          onClick={() => {
            if (!state.disabled) setChecked(!checked);
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            disabled={state.disabled}
            name={state.name}
            value={state.value}
            aria-label={state.ariaLabel || state.labelText}
            role={state.role || "switch"}
            aria-checked={checked}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          <span
            className="toggle-thumb"
            style={{
              position: "absolute",
              top: `${padding}px`,
              left: 0,
              transform: `translateX(${thumbTranslateX}px)`,
              width: state.thumbSize,
              height: state.thumbSize,
              borderRadius: `${state.thumbBorderRadius}%`,
              background: checked ? state.thumbOnBg : state.thumbOffBg,
              border:
                state.thumbBorderWidth > 0
                  ? `${state.thumbBorderWidth}px solid ${checked ? state.thumbOnBorder : state.thumbOffBorder}`
                  : "none",
              boxShadow: thumbShadow,
              transition,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {state.thumbIcon !== "none" && (
              <ThumbIconSVG
                icon={state.thumbIcon}
                checked={checked}
                color={state.thumbIconColor}
                size={state.thumbIconSize}
              />
            )}
          </span>
        </div>
        <span
          style={{
            fontFamily,
            fontSize: `${state.labelFontSize}${state.fontSizeUnit}`,
            fontWeight: state.labelFontWeight,
            color: state.labelColor,
            letterSpacing: `${state.labelLetterSpacing}${state.letterSpacingUnit}`,
            lineHeight: state.labelLineHeight,
            fontStyle: state.labelFontStyle,
            textTransform: state.labelTextTransform as any,
            textDecoration: state.labelUnderline ? "underline" : "none",
          }}
        >
          {state.labelText}
        </span>
      </label>
    </div>
  );
}
