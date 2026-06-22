"use client";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { type ToggleState } from "../types";

export type ToggleExportInput = ToggleState & {
  downloadName: string;
};

function resolveFontFamily(state: ToggleState): string {
  if (state.fontBucket === "google") return state.googleFontFamily;
  return SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit";
}

export function buildToggleExportPayload(params: ToggleExportInput) {
  const filename = `${params.downloadName || "toggle-switch"}.tsx`;
  const config = {
    checked: params.checked,
    disabled: params.disabled,
    labelText: params.labelText,
    labelPosition: params.labelPosition,
    id: params.id,
    name: params.name,
    value: params.value,
    trackWidth: params.trackWidth,
    trackHeight: params.trackHeight,
    trackBorderRadius: params.trackBorderRadius,
    trackOffBg: params.trackOffBg,
    trackOnBg: params.trackOnBg,
    trackOffBorder: params.trackOffBorder,
    trackOnBorder: params.trackOnBorder,
    trackBorderWidth: params.trackBorderWidth,
    thumbSize: params.thumbSize,
    thumbBorderRadius: params.thumbBorderRadius,
    thumbOffBg: params.thumbOffBg,
    thumbOnBg: params.thumbOnBg,
    thumbOffBorder: params.thumbOffBorder,
    thumbOnBorder: params.thumbOnBorder,
    thumbBorderWidth: params.thumbBorderWidth,
    thumbIcon: params.thumbIcon,
    thumbIconColor: params.thumbIconColor,
    thumbIconSize: params.thumbIconSize,
    thumbScaleOnPress: params.thumbScaleOnPress,
    transitionDuration: params.transitionDuration,
    transitionEasing: params.transitionEasing,
    focusRingEnabled: params.focusRingEnabled,
    focusRingColor: params.focusRingColor,
    focusRingWidth: params.focusRingWidth,
    focusRingOffset: params.focusRingOffset,
    hoverTrackOffBg: params.hoverTrackOffBg,
    hoverTrackOnBg: params.hoverTrackOnBg,
    hoverThumbScale: params.hoverThumbScale,
    disabledOpacity: params.disabledOpacity,
    disabledCursor: params.disabledCursor,
    disabledUseCustomColors: params.disabledUseCustomColors,
    disabledTrackBg: params.disabledTrackBg,
    disabledThumbBg: params.disabledThumbBg,
    disabledTextColor: params.disabledTextColor,
    loadingEnabled: params.loadingEnabled,
    loadingAnimation: params.loadingAnimation,
    fontFamily: resolveFontFamily(params),
    labelFontSize: params.labelFontSize,
    fontSizeUnit: params.fontSizeUnit,
    labelFontWeight: params.labelFontWeight,
    labelColor: params.labelColor,
    labelLetterSpacing: params.labelLetterSpacing,
    letterSpacingUnit: params.letterSpacingUnit,
    labelLineHeight: params.labelLineHeight,
    labelFontStyle: params.labelFontStyle,
    labelTextTransform: params.labelTextTransform,
    labelUnderline: params.labelUnderline,
    labelGap: params.labelGap,
    shadowEnabled: params.shadowEnabled,
    shadowX: params.shadowX,
    shadowY: params.shadowY,
    shadowBlur: params.shadowBlur,
    shadowSpread: params.shadowSpread,
    shadowOpacity: params.shadowOpacity,
    shadowColor: params.shadowColor,
    ariaLabel: params.ariaLabel,
    ariaDescribedBy: params.ariaDescribedBy,
    ariaRequired: params.ariaRequired,
    tabIndex: params.tabIndex,
    dir: params.dir,
    lang: params.lang,
    title: params.title,
    role: params.role,
    descriptionText: params.descriptionText,
    descriptionColor: params.descriptionColor,
    helperText: params.helperText,
    helperColor: params.helperColor,
    errorText: params.errorText,
    errorColor: params.errorColor,
    errorTrackBg: params.errorTrackBg,
    errorThumbBg: params.errorThumbBg,
    successText: params.successText,
    successColor: params.successColor,
  };

  const content = `import React, { useEffect, useState } from "react";

const CONFIG = ${JSON.stringify(config, null, 2)};

function resolveShadowColor(color: string, opacity: number) {
  const hex = color.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  }

  return "rgba(0, 0, 0, " + opacity + ")";
}

function ThumbIcon({ checked }: { checked: boolean }) {
  const icon = CONFIG.thumbIcon;
  const color = CONFIG.thumbIconColor;
  const size = CONFIG.thumbIconSize;

  if (icon === "check" || (icon === "both" && checked)) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8 L6.5 11.5 L13 4.5" />
      </svg>
    );
  }

  if (icon === "cross" || (icon === "both" && !checked)) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    );
  }

  return null;
}

export default function ToggleComponent() {
  const [checked, setChecked] = useState(CONFIG.checked);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const descriptionId = CONFIG.descriptionText ? "toggle-preview-description" : undefined;
  const helperId = CONFIG.helperText ? "toggle-preview-helper" : undefined;
  const errorId = CONFIG.errorText ? "toggle-preview-error" : undefined;
  const successId = CONFIG.successText ? "toggle-preview-success" : undefined;
  useEffect(() => {
    setChecked(CONFIG.checked);
  }, []);
  const transition = "all " + CONFIG.transitionDuration + "ms " + CONFIG.transitionEasing;

  const padding = (CONFIG.trackHeight - CONFIG.thumbSize) / 2;
  const baseX = checked ? CONFIG.trackWidth - CONFIG.thumbSize - padding : padding;
  const thumbShadow = CONFIG.shadowEnabled
    ? CONFIG.shadowX + "px " + CONFIG.shadowY + "px " + CONFIG.shadowBlur + "px " + CONFIG.shadowSpread + "px " + resolveShadowColor(CONFIG.shadowColor, CONFIG.shadowOpacity)
    : "none";

  const thumbScale = pressed
    ? CONFIG.thumbScaleOnPress
    : hovered
      ? CONFIG.hoverThumbScale
      : 1;

  const trackBackground = CONFIG.disabled && CONFIG.disabledUseCustomColors
    ? CONFIG.disabledTrackBg
    : CONFIG.errorText
    ? CONFIG.errorTrackBg
    : hovered
    ? checked
      ? CONFIG.hoverTrackOnBg
      : CONFIG.hoverTrackOffBg
    : checked
      ? CONFIG.trackOnBg
      : CONFIG.trackOffBg;

  const thumbBackground = CONFIG.disabled && CONFIG.disabledUseCustomColors
    ? CONFIG.disabledThumbBg
    : CONFIG.errorText
    ? CONFIG.errorThumbBg
    : checked ? CONFIG.thumbOnBg : CONFIG.thumbOffBg;

  const trackBorderColor = checked ? CONFIG.trackOnBorder : CONFIG.trackOffBorder;
  const thumbBorderColor = checked ? CONFIG.thumbOnBorder : CONFIG.thumbOffBorder;
  const focusOutline = focused && CONFIG.focusRingEnabled
    ? { outline: CONFIG.focusRingWidth + "px solid " + CONFIG.focusRingColor, outlineOffset: CONFIG.focusRingOffset }
    : { outline: "none", outlineOffset: 0 };
  const isLoading = CONFIG.loadingEnabled;

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexDirection: CONFIG.labelPosition === "left" ? "row-reverse" : "row",
        gap: CONFIG.labelGap,
        cursor: CONFIG.disabled ? CONFIG.disabledCursor : "pointer",
        opacity: CONFIG.disabled ? CONFIG.disabledOpacity : 1,
      }}
      dir={CONFIG.dir}
      lang={CONFIG.lang || undefined}
    >
      {isLoading && (
        <style>{"@keyframes toggle-spin { to { transform: rotate(360deg); } } @keyframes toggle-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }"}</style>
      )}
      <input
        type="checkbox"
        checked={checked}
        disabled={CONFIG.disabled}
        id={CONFIG.id || undefined}
        name={CONFIG.name || undefined}
        value={CONFIG.value || undefined}
        dir={CONFIG.dir}
        lang={CONFIG.lang || undefined}
        title={CONFIG.title || undefined}
        tabIndex={CONFIG.tabIndex}
        role={CONFIG.role || "switch"}
        aria-label={CONFIG.ariaLabel || CONFIG.labelText}
        aria-describedby={[descriptionId, helperId, errorId, successId, CONFIG.ariaDescribedBy]
          .filter(Boolean)
          .join(" ") || undefined}
        aria-required={CONFIG.ariaRequired || undefined}
        aria-invalid={Boolean(CONFIG.errorText) || undefined}
        required={CONFIG.ariaRequired || undefined}
        aria-checked={checked}
        onChange={(event) => {
          if (CONFIG.disabled) return;
          setChecked(event.target.checked);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        style={{
          position: "relative",
          width: CONFIG.trackWidth,
          height: CONFIG.trackHeight,
          borderRadius: CONFIG.trackBorderRadius,
          background: trackBackground,
          border:
            CONFIG.trackBorderWidth > 0
              ? CONFIG.trackBorderWidth + "px solid " + trackBorderColor
              : "none",
          transition,
          cursor: CONFIG.disabled ? CONFIG.disabledCursor : "pointer",
          outline: focusOutline.outline,
          outlineOffset: focusOutline.outlineOffset,
          flexShrink: 0,
          touchAction: "manipulation",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: padding,
            left: 0,
            transform: "translateX(" + baseX + "px) scale(" + thumbScale + ")",
            width: CONFIG.thumbSize,
            height: CONFIG.thumbSize,
            borderRadius: CONFIG.thumbBorderRadius + "%",
            background: thumbBackground,
            border:
              CONFIG.thumbBorderWidth > 0
                ? CONFIG.thumbBorderWidth + "px solid " + thumbBorderColor
                : "none",
            boxShadow: thumbShadow,
            transition,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <span
              style={{
                display: "inline-block",
                width: CONFIG.thumbIconSize,
                height: CONFIG.thumbIconSize,
                borderRadius: "50%",
                border: "2px solid " + CONFIG.thumbIconColor,
                borderTopColor: "transparent",
                animation: CONFIG.loadingAnimation === "spin" ? "toggle-spin 0.6s linear infinite" : CONFIG.loadingAnimation === "pulse" ? "toggle-pulse 1.2s ease-in-out infinite" : undefined,
              }}
            />
          ) : CONFIG.thumbIcon !== "none" ? <ThumbIcon checked={checked} /> : null}
        </span>
      </span>
      <span
        style={{
          fontFamily: CONFIG.fontFamily,
          fontSize: CONFIG.labelFontSize + CONFIG.fontSizeUnit,
          fontWeight: CONFIG.labelFontWeight,
          color: CONFIG.disabled && CONFIG.disabledUseCustomColors ? CONFIG.disabledTextColor : CONFIG.labelColor,
          letterSpacing: CONFIG.labelLetterSpacing + CONFIG.letterSpacingUnit,
          lineHeight: CONFIG.labelLineHeight,
          fontStyle: CONFIG.labelFontStyle,
          textTransform: CONFIG.labelTextTransform,
          textDecoration: CONFIG.labelUnderline ? "underline" : "none",
        }}
      >
        {CONFIG.labelText}
      </span>
      <div className="space-y-1 px-1 text-center text-xs" style={{ maxWidth: 420 }}>
        {CONFIG.descriptionText ? (
          <p id={descriptionId} style={{ color: CONFIG.descriptionColor }}>
            {CONFIG.descriptionText}
          </p>
        ) : null}
        {CONFIG.helperText ? (
          <p id={helperId} style={{ color: CONFIG.helperColor }}>
            {CONFIG.helperText}
          </p>
        ) : null}
        {CONFIG.errorText ? (
          <p id={errorId} style={{ color: CONFIG.errorColor }}>
            {CONFIG.errorText}
          </p>
        ) : null}
        {CONFIG.successText ? (
          <p id={successId} style={{ color: CONFIG.successColor }}>
            {CONFIG.successText}
          </p>
        ) : null}
      </div>
    </label>
  );
}
`;

  return { content, filename };
}
