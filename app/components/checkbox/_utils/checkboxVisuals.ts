"use client";

import type { AriaAttributes } from "react";
import { clamp, norm } from "@/app/components/controls/color/colorUtils";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { type CheckboxState } from "../types";

export function resolveCheckboxFontFamily(state: CheckboxState): string {
  if (state.fontBucket === "google") return state.googleFontFamily;
  return SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";
}

export function resolveCheckboxRgbaColor(color: string, opacity: number): string {
  const parsed = norm(color);
  const alpha = clamp(opacity, 0, 1);

  if (!parsed.ok) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const match = parsed.rgb.match(/\d+/g);
  if (!match || match.length < 3) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
}

export function resolveCheckboxBoxShadow(state: CheckboxState): string {
  if (!state.shadowEnabled) return "none";
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${resolveCheckboxRgbaColor(state.shadowColor, state.shadowOpacity)}`;
}

export function resolveCheckboxBorderColor(
  state: CheckboxState,
  checked: boolean,
  indeterminate: boolean,
  hovered: boolean,
): string {
  if (state.disabled && state.disabledUseCustomColors) return state.disabledBorderColor;
  if (state.ariaInvalid) return state.errorBorderColor;
  if (hovered && !state.disabled) {
    return checked || indeterminate ? state.hoverCheckedBorderColor : state.hoverBorderColor;
  }
  if (indeterminate) return state.indeterminateBorderColor;
  if (checked) return state.checkedBorderColor;
  return state.boxBorderColor;
}

export function resolveCheckboxBackgroundColor(
  state: CheckboxState,
  checked: boolean,
  indeterminate: boolean,
  hovered: boolean,
): string {
  if (state.disabled && state.disabledUseCustomColors) return state.disabledBgColor;
  if (state.ariaInvalid) return state.errorBgColor;
  if (hovered && !state.disabled) {
    return checked || indeterminate
      ? state.hoverCheckedBgColor
      : state.hoverBgColor;
  }
  if (indeterminate) return state.indeterminateBgColor;
  if (checked) return state.checkedBgColor;
  return state.boxBgColor;
}

export function resolveCheckboxIndicatorStyle(
  state: CheckboxState,
  active: boolean,
): React.CSSProperties {
  const transition = `all ${state.transitionDuration}ms ${state.transitionEasing}`;

  if (state.animationType === "scale") {
    return {
      transform: active ? "scale(1)" : "scale(0)",
      opacity: active ? 1 : 0,
      transition,
    };
  }

  if (state.animationType === "fade") {
    return {
      opacity: active ? 1 : 0,
      transition,
    };
  }

  return { transition };
}

export function resolveCheckboxAriaChecked(
  state: Pick<CheckboxState, "ariaChecked">,
  checked: boolean,
  indeterminate: boolean,
): AriaAttributes["aria-checked"] {
  return (
    (state.ariaChecked || (indeterminate ? "mixed" : checked ? "true" : "false")) as AriaAttributes["aria-checked"]
  );
}
