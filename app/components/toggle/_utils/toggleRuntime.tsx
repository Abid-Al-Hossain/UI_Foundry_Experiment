"use client";

import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { type ToggleState, type ThumbIcon } from "../types";

export function resolveToggleFontFamily(state: ToggleState): string {
  if (state.fontBucket === "google") return state.googleFontFamily;
  return SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";
}

export function resolveThumbShadow(state: ToggleState): string {
  if (!state.shadowEnabled) return "none";
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${resolveShadowColor(state.shadowColor, state.shadowOpacity)}`;
}

export function resolveShadowColor(color: string, opacity: number): string {
  const hex = color.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    const r = Number.parseInt(hex[0] + hex[0], 16);
    const g = Number.parseInt(hex[1] + hex[1], 16);
    const b = Number.parseInt(hex[2] + hex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return `rgba(0, 0, 0, ${opacity})`;
}

export function getThumbPadding(state: ToggleState): number {
  return (state.trackHeight - state.thumbSize) / 2;
}

export function getThumbTranslateX(state: ToggleState, checked: boolean): number {
  const padding = getThumbPadding(state);
  return checked ? state.trackWidth - state.thumbSize - padding : padding;
}

export function getToggleTransition(state: ToggleState): string {
  return `all ${state.transitionDuration}ms ${state.transitionEasing}`;
}

export function getTrackBackground(
  state: ToggleState,
  hovered: boolean,
  checked: boolean,
): string {
  if (state.disabled && state.disabledUseCustomColors) return state.disabledTrackBg;
  if (state.errorText) return state.errorTrackBg;
  if (hovered) {
    return checked ? state.hoverTrackOnBg : state.hoverTrackOffBg;
  }
  return checked ? state.trackOnBg : state.trackOffBg;
}

export function getTrackBorderColor(state: ToggleState, checked: boolean): string {
  return checked ? state.trackOnBorder : state.trackOffBorder;
}

export function getThumbBackground(state: ToggleState, checked: boolean): string {
  if (state.disabled && state.disabledUseCustomColors) return state.disabledThumbBg;
  if (state.errorText) return state.errorThumbBg;
  return checked ? state.thumbOnBg : state.thumbOffBg;
}

export function getThumbBorderColor(state: ToggleState, checked: boolean): string {
  return checked ? state.thumbOnBorder : state.thumbOffBorder;
}

export function getThumbScale(
  state: ToggleState,
  hovered: boolean,
  pressed: boolean,
): number {
  if (pressed) return state.thumbScaleOnPress;
  if (hovered) return state.hoverThumbScale;
  return 1;
}

export function getFocusOutline(state: ToggleState): { outline: string; outlineOffset: number } {
  if (!state.focusRingEnabled) {
    return { outline: "none", outlineOffset: 0 };
  }
  return {
    outline: `${state.focusRingWidth}px solid ${state.focusRingColor}`,
    outlineOffset: state.focusRingOffset,
  };
}

export function ThumbIconSVG({
  icon,
  checked,
  color,
  size,
}: {
  icon: ThumbIcon;
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
        aria-hidden="true"
        focusable="false"
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
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    );
  }

  return null;
}
