"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckboxState } from "../types";
import { ensureReadable } from "@/app/components/controls/color/wcag";
import {
  resolveCheckboxAriaChecked,
  resolveCheckboxBackgroundColor,
  resolveCheckboxBorderColor,
  resolveCheckboxBoxShadow,
  resolveCheckboxFontFamily,
  resolveCheckboxIndicatorStyle,
} from "../_utils/checkboxVisuals";

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

export default function LivePreview({
  state,
  resetKey = 0,
  canvasBg = "#0b1220",
}: {
  state: CheckboxState;
  resetKey?: number;
  canvasBg?: string;
}) {
  const [checked, setChecked] = useState(state.checked);
  const [indeterminate, setIndeterminate] = useState(state.indeterminate);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const cbRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecked(state.checked);
  }, [state.checked]);

  useEffect(() => {
    setIndeterminate(state.indeterminate);
  }, [state.indeterminate]);

  useEffect(() => {
    if (cbRef.current) cbRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  useEffect(() => {
    setHovered(false);
    setFocused(false);
  }, [resetKey]);

  const isChecked = checked || indeterminate;
  const boxBg = resolveCheckboxBackgroundColor(
    state,
    checked,
    indeterminate,
    hovered,
  );
  const boxBorder = resolveCheckboxBorderColor(
    state,
    checked,
    indeterminate,
    hovered,
  );
  const transition = `all ${state.transitionDuration}ms ${state.transitionEasing}`;
  const fontFamily = resolveCheckboxFontFamily(state);
  const boxShadow = resolveCheckboxBoxShadow(state);
  const ariaChecked = resolveCheckboxAriaChecked(state, checked, indeterminate);
  const animStyle = resolveCheckboxIndicatorStyle(state, isChecked);
  const helperId = state.helperText ? "checkbox-preview-helper" : undefined;
  const errorId = state.errorText ? "checkbox-preview-error" : undefined;
  const successId = state.successText ? "checkbox-preview-success" : undefined;
  const descriptionId = state.descriptionText ? "checkbox-preview-description" : undefined;
  const describedBy = [
    descriptionId,
    helperId,
    errorId,
    successId,
    state.ariaDescribedBy,
  ]
    .filter(Boolean)
    .join(" ")
    || undefined;

  const labelEl = (
    <span
      className="cb-label"
      style={{
        fontFamily,
        fontSize: `${state.labelFontSize}${state.fontSizeUnit}`,
        fontWeight: state.labelFontWeight,
        letterSpacing: `${state.labelLetterSpacing}${state.letterSpacingUnit}`,
        lineHeight: state.labelLineHeight,
        fontStyle: state.labelFontStyle,
        textTransform: state.labelTextTransform,
        textDecoration: state.labelUnderline ? "underline" : "none",
        cursor: state.disabled ? state.disabledCursor : "pointer",
        color: state.disabled && state.disabledUseCustomColors ? state.disabledTextColor : ensureReadable(state.labelColor, canvasBg),
      }}
    >
      {state.labelText}
    </span>
  );

  return (
    <div className="flex items-center justify-center p-8" style={{ minHeight: 300 }}>
      <div className="flex flex-col items-center gap-3" dir={state.dir} lang={state.lang || undefined}>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: state.labelGap,
            flexDirection: state.labelPosition === "left" ? "row-reverse" : "row",
            cursor: state.disabled ? state.disabledCursor : "pointer",
            opacity: state.disabled ? state.disabledOpacity : 1,
          }}
          onPointerEnter={() => {
            if (!state.disabled) setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <input
            ref={cbRef}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              if (state.disabled) return;
              if (indeterminate) {
                setIndeterminate(false);
                setChecked(true);
                return;
              }
              setChecked(e.target.checked);
            }}
            disabled={state.disabled}
            id={state.id || undefined}
            value={state.value}
            name={state.name}
            dir={state.dir}
            lang={state.lang || undefined}
            aria-label={state.ariaLabel || undefined}
            aria-describedby={describedBy}
            aria-checked={ariaChecked}
            aria-required={state.ariaRequired || undefined}
            aria-invalid={state.ariaInvalid || undefined}
            required={state.ariaRequired || undefined}
            title={state.title || undefined}
            tabIndex={state.tabIndex}
            role={state.role || undefined}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          <span
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
              outline: focused && !state.disabled && state.focusRingEnabled ? `${state.focusRingWidth}px solid ${state.focusRingColor}` : "none",
              outlineOffset: focused && !state.disabled && state.focusRingEnabled ? `${state.focusRingOffset}px` : "0px",
              transition,
              flexShrink: 0,
              touchAction: "manipulation",
            }}
          >
            <span style={{ display: "inline-flex", transition, ...animStyle }}>
              {isChecked &&
                (indeterminate ? (
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
        <div className="space-y-1 text-center text-xs" style={{ maxWidth: 420 }}>
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
          {state.successText ? (
            <p id={successId} style={{ color: state.successColor }}>
              {state.successText}
            </p>
          ) : null}
          {state.errorText ? (
            <p id={errorId} style={{ color: state.errorColor }}>
              {state.errorText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
