"use client";

import React, { useState } from "react";
import { ToggleState } from "../types";
import {
  getFocusOutline,
  getThumbBackground,
  getThumbBorderColor,
  getThumbPadding,
  getThumbScale,
  getThumbTranslateX,
  getToggleTransition,
  getTrackBackground,
  getTrackBorderColor,
  resolveThumbShadow,
  resolveToggleFontFamily,
  ThumbIconSVG,
} from "../_utils/toggleRuntime";
import { ensureReadable } from "@/app/components/controls/color/wcag";

export default function LivePreview({
  state,
  canvasBg = "#0b1220",
}: {
  state: ToggleState;
  resetKey?: number;
  canvasBg?: string;
}) {
  const [checked, setChecked] = useState(state.checked);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const descriptionId = state.descriptionText ? "toggle-preview-description" : undefined;
  const helperId = state.helperText ? "toggle-preview-helper" : undefined;
  const errorId = state.errorText ? "toggle-preview-error" : undefined;
  const successId = state.successText ? "toggle-preview-success" : undefined;
  const fontFamily = resolveToggleFontFamily(state);
  const thumbShadow = resolveThumbShadow(state);
  const transition = getToggleTransition(state);
  const padding = getThumbPadding(state);
  const thumbTranslateX = getThumbTranslateX(state, checked);
  const trackBackground = getTrackBackground(state, hovered, checked);
  const trackBorderColor = getTrackBorderColor(state, checked);
  const thumbBorderColor = getThumbBorderColor(state, checked);
  const thumbScale = getThumbScale(state, hovered, pressed);
  const focusOutline = focused ? getFocusOutline(state) : { outline: "none", outlineOffset: 0 };
  const isLoading = state.loadingEnabled;

  return (
    <div
      className="flex items-center justify-center p-8"
      style={{ minHeight: 300 }}
    >
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexDirection: state.labelPosition === "left" ? "row-reverse" : "row",
          gap: state.labelGap,
          cursor: state.disabled ? state.disabledCursor : "pointer",
          opacity: state.disabled ? state.disabledOpacity : 1,
        }}
        dir={state.dir}
        lang={state.lang || undefined}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            if (!state.disabled) setChecked(event.target.checked);
          }}
          disabled={state.disabled}
          id={state.id || undefined}
          name={state.name}
          value={state.value}
          dir={state.dir}
          lang={state.lang || undefined}
          title={state.title || undefined}
          tabIndex={state.tabIndex}
          aria-label={state.ariaLabel || state.labelText}
          aria-describedby={[
            descriptionId,
            helperId,
            errorId,
            successId,
            state.ariaDescribedBy,
          ]
            .filter(Boolean)
            .join(" ") || undefined}
          aria-required={state.ariaRequired || undefined}
          aria-invalid={Boolean(state.errorText) || undefined}
          required={state.ariaRequired || undefined}
          role={state.role || "switch"}
          aria-checked={checked}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        />
        <div
          style={{
            position: "relative",
            width: state.trackWidth,
            height: state.trackHeight,
            borderRadius: state.trackBorderRadius,
            background: trackBackground,
            border:
              state.trackBorderWidth > 0
                ? `${state.trackBorderWidth}px solid ${trackBorderColor}`
                : "none",
            transition,
            cursor: state.disabled ? state.disabledCursor : "pointer",
            flexShrink: 0,
            outline: focusOutline.outline,
            outlineOffset: focusOutline.outlineOffset,
          }}
          onPointerEnter={() => {
            if (!state.disabled) setHovered(true);
          }}
          onPointerLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onPointerDown={() => {
            if (!state.disabled) setPressed(true);
          }}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
        >
          <span
            className="toggle-thumb"
            style={{
              position: "absolute",
              top: `${padding}px`,
              left: 0,
              transform: `translateX(${thumbTranslateX}px) scale(${thumbScale})`,
              width: state.thumbSize,
              height: state.thumbSize,
              borderRadius: `${state.thumbBorderRadius}%`,
              background: getThumbBackground(state, checked),
              border:
                state.thumbBorderWidth > 0
                  ? `${state.thumbBorderWidth}px solid ${thumbBorderColor}`
                  : "none",
              boxShadow: thumbShadow,
              transition,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "manipulation",
            }}
          >
              {isLoading ? (
                <span
                  aria-hidden="true"
                  className={state.loadingAnimation === "spin" ? "animate-spin" : state.loadingAnimation === "pulse" ? "animate-pulse" : undefined}
                  style={{
                    display: "inline-block",
                    width: state.thumbIconSize,
                    height: state.thumbIconSize,
                    borderRadius: "50%",
                    border: `2px solid ${state.thumbIconColor}`,
                    borderTopColor: "transparent",
                  }}
                />
              ) : (
                state.thumbIcon !== "none" && (
                  <ThumbIconSVG
                    icon={state.thumbIcon}
                    checked={checked}
                    color={state.thumbIconColor}
                    size={state.thumbIconSize}
                  />
                )
              )}
          </span>
        </div>
        <span
          style={{
            fontFamily,
            fontSize: `${state.labelFontSize}${state.fontSizeUnit}`,
            fontWeight: state.labelFontWeight,
            color: state.disabled && state.disabledUseCustomColors ? state.disabledTextColor : ensureReadable(state.labelColor, canvasBg),
            letterSpacing: `${state.labelLetterSpacing}${state.letterSpacingUnit}`,
            lineHeight: state.labelLineHeight,
            fontStyle: state.labelFontStyle,
            textTransform: state.labelTextTransform,
            textDecoration: state.labelUnderline ? "underline" : "none",
          }}
        >
          {state.labelText}
        </span>
        <div className="space-y-1 px-1 text-center text-xs" style={{ maxWidth: 420 }}>
          {state.descriptionText ? (
            <p id={descriptionId} style={{ color: state.descriptionColor }}>
              {state.descriptionText}
            </p>
          ) : null}
          {state.helperText ? (
            <p id={helperId} style={{ color: state.helperColor }}>
              {state.helperText}
            </p>
          ) : null}
          {state.errorText ? (
            <p id={errorId} style={{ color: state.errorColor }}>
              {state.errorText}
            </p>
          ) : null}
          {state.successText ? (
            <p id={successId} style={{ color: state.successColor }}>
              {state.successText}
            </p>
          ) : null}
        </div>
      </label>
    </div>
  );
}
