"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckboxState } from "../types";

import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

function CheckmarkSVG({ style: s }: { style: CheckboxState }) {
  if (s.checkmarkStyle === "cross") {
    return (
      <svg
        width={s.checkmarkSize}
        height={s.checkmarkSize}
        viewBox="0 0 16 16"
        fill="none"
        stroke={s.checkmarkColor}
        strokeWidth={s.checkmarkStrokeWidth}
        strokeLinecap="round"
      >
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    );
  }
  if (s.checkmarkStyle === "dash") {
    return (
      <svg
        width={s.checkmarkSize}
        height={s.checkmarkSize}
        viewBox="0 0 16 16"
        fill="none"
        stroke={s.checkmarkColor}
        strokeWidth={s.checkmarkStrokeWidth}
        strokeLinecap="round"
      >
        <path d="M4 8 L12 8" />
      </svg>
    );
  }
  if (s.checkmarkStyle === "custom" && s.customCheckmarkSvg) {
    return <span dangerouslySetInnerHTML={{ __html: s.customCheckmarkSvg }} />;
  }
  // default check
  return (
    <svg
      width={s.checkmarkSize}
      height={s.checkmarkSize}
      viewBox="0 0 16 16"
      fill="none"
      stroke={s.checkmarkColor}
      strokeWidth={s.checkmarkStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8 L6.5 11.5 L13 4.5" />
    </svg>
  );
}

export default function LivePreview({ state }: { state: CheckboxState }) {
  const [checked, setChecked] = useState(state.checked);
  const cbRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(state.checked);
  }, [state.checked]);
  useEffect(() => {
    if (cbRef.current) cbRef.current.indeterminate = state.indeterminate;
  }, [state.indeterminate]);

  const isChecked = checked || state.indeterminate;
  const boxBg = isChecked
    ? state.indeterminate
      ? state.indeterminateBgColor
      : state.checkedBgColor
    : state.boxBgColor;
  const boxBorder = isChecked
    ? state.indeterminate
      ? state.indeterminateBorderColor
      : state.checkedBorderColor
    : state.boxBorderColor;
  const transition = `all ${state.transitionDuration}ms ${state.transitionEasing}`;

  const animStyle: React.CSSProperties =
    state.animationType === "scale" && isChecked
      ? { transform: "scale(1)", opacity: 1 }
      : state.animationType === "scale" && !isChecked
        ? { transform: "scale(0)", opacity: 0 }
        : state.animationType === "fade" && isChecked
          ? { opacity: 1 }
          : state.animationType === "fade" && !isChecked
            ? { opacity: 0 }
            : {};

  const pseudoId = "cb-preview";
  const cssString = `
    #${pseudoId}:focus-visible + .cb-box { box-shadow: 0 0 0 ${state.focusRingWidth}px ${state.focusRingColor} !important; }
    #${pseudoId}:not(:disabled):hover + .cb-box { border-color: ${state.hoverBorderColor} !important; background: ${isChecked ? state.hoverCheckedBgColor : state.hoverBgColor} !important; }
    #${pseudoId}:disabled + .cb-box { opacity: ${state.disabledOpacity} !important; cursor: ${state.disabledCursor} !important; }
    #${pseudoId}:disabled ~ .cb-label { opacity: ${state.disabledOpacity} !important; cursor: ${state.disabledCursor} !important; }
  `;

  // Construct Font Family
  const fontFamily =
    state.fontBucket === "google"
      ? state.googleFontFamily
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";

  // Construct Shadow
  const boxShadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  const labelEl = (
    <span
      className="cb-label"
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
        cursor: state.disabled ? state.disabledCursor : "pointer",
      }}
    >
      {state.labelText}
    </span>
  );

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
          gap: state.labelGap,
          flexDirection: state.labelPosition === "left" ? "row-reverse" : "row",
          cursor: state.disabled ? state.disabledCursor : "pointer",
        }}
      >
        <input
          ref={cbRef}
          id={pseudoId}
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          disabled={state.disabled}
          value={state.value}
          name={state.name}
          aria-label={state.ariaLabel || undefined}
          role={state.role || undefined}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        />
        <span
          className="cb-box"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: state.boxSize,
            height: state.boxSize,
            border: `${state.boxBorderWidth}px ${state.boxBorderStyle} ${boxBorder}`,
            borderRadius: state.boxBorderRadius,
            backgroundColor: boxBg,
            boxShadow,
            transition,
            flexShrink: 0,
          }}
        >
          <span style={{ display: "inline-flex", transition, ...animStyle }}>
            {isChecked &&
              (state.indeterminate ? (
                <svg
                  width={state.checkmarkSize}
                  height={state.checkmarkSize}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke={state.indeterminateIndicatorColor}
                  strokeWidth={state.checkmarkStrokeWidth}
                  strokeLinecap="round"
                >
                  <path d="M4 8 L12 8" />
                </svg>
              ) : (
                <CheckmarkSVG style={state} />
              ))}
          </span>
        </span>
        {labelEl}
      </label>
    </div>
  );
}
