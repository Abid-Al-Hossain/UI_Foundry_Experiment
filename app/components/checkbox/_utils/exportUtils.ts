"use client";
import { type CheckboxState } from "../types";
import {
  resolveCheckboxFontFamily,
  resolveCheckboxRgbaColor,
} from "./checkboxVisuals";

export type CheckboxExportInput = CheckboxState & {
  downloadName: string;
};

export function buildCheckboxExportPayload(params: CheckboxExportInput) {
  const filename = `${params.downloadName || "checkbox"}.tsx`;
  const config = {
    checked: params.checked,
    indeterminate: params.indeterminate,
    disabled: params.disabled,
    id: params.id,
    value: params.value,
    name: params.name,
    labelText: params.labelText,
    labelPosition: params.labelPosition,
    boxSize: params.boxSize,
    boxBorderWidth: params.boxBorderWidth,
    boxBorderStyle: params.boxBorderStyle,
    boxBorderColor: params.boxBorderColor,
    boxBorderRadius: params.boxBorderRadius,
    boxBgColor: params.boxBgColor,
    checkedBgColor: params.checkedBgColor,
    checkedBorderColor: params.checkedBorderColor,
    checkmarkColor: params.checkmarkColor,
    checkmarkStyle: params.checkmarkStyle,
    checkmarkSize: params.checkmarkSize,
    checkmarkStrokeWidth: params.checkmarkStrokeWidth,
    customCheckmarkSvg: params.customCheckmarkSvg,
    indeterminateBgColor: params.indeterminateBgColor,
    indeterminateBorderColor: params.indeterminateBorderColor,
    indeterminateIndicatorColor: params.indeterminateIndicatorColor,
    animationType: params.animationType,
    transitionDuration: params.transitionDuration,
    transitionEasing: params.transitionEasing,
    focusRingEnabled: params.focusRingEnabled,
    focusRingColor: params.focusRingColor,
    focusRingWidth: params.focusRingWidth,
    focusRingOffset: params.focusRingOffset,
    hoverBorderColor: params.hoverBorderColor,
    hoverBgColor: params.hoverBgColor,
    hoverCheckedBgColor: params.hoverCheckedBgColor,
    hoverCheckedBorderColor: params.hoverCheckedBorderColor,
    disabledOpacity: params.disabledOpacity,
    disabledCursor: params.disabledCursor,
    disabledUseCustomColors: params.disabledUseCustomColors,
    disabledBgColor: params.disabledBgColor,
    disabledTextColor: params.disabledTextColor,
    disabledBorderColor: params.disabledBorderColor,
    fontFamily: resolveCheckboxFontFamily(params),
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
    shadowColor: resolveCheckboxRgbaColor(params.shadowColor, params.shadowOpacity),
    ariaLabel: params.ariaLabel,
    ariaChecked: params.ariaChecked,
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
    errorBorderColor: params.errorBorderColor,
    errorBgColor: params.errorBgColor,
    ariaInvalid: params.ariaInvalid,
    successText: params.successText,
    successColor: params.successColor,
  };

  const content = `import React, { useEffect, useRef, useState } from "react";

const CONFIG = ${JSON.stringify(config, null, 2)};

function Checkmark() {
  if (CONFIG.checkmarkStyle === "cross") {
    return (
      <svg
        width={CONFIG.checkmarkSize}
        height={CONFIG.checkmarkSize}
        viewBox="0 0 16 16"
        fill="none"
        stroke={CONFIG.checkmarkColor}
        strokeWidth={CONFIG.checkmarkStrokeWidth}
        strokeLinecap="round"
      >
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    );
  }

  if (CONFIG.checkmarkStyle === "dash") {
    return (
      <svg
        width={CONFIG.checkmarkSize}
        height={CONFIG.checkmarkSize}
        viewBox="0 0 16 16"
        fill="none"
        stroke={CONFIG.checkmarkColor}
        strokeWidth={CONFIG.checkmarkStrokeWidth}
        strokeLinecap="round"
      >
        <path d="M4 8 L12 8" />
      </svg>
    );
  }

  if (CONFIG.checkmarkStyle === "custom" && CONFIG.customCheckmarkSvg) {
    return <span dangerouslySetInnerHTML={{ __html: CONFIG.customCheckmarkSvg }} />;
  }

  return (
    <svg
      width={CONFIG.checkmarkSize}
      height={CONFIG.checkmarkSize}
      viewBox="0 0 16 16"
      fill="none"
      stroke={CONFIG.checkmarkColor}
      strokeWidth={CONFIG.checkmarkStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8 L6.5 11.5 L13 4.5" />
    </svg>
  );
}

export default function CheckboxComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(CONFIG.checked);
  const [indeterminate, setIndeterminate] = useState(CONFIG.indeterminate);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const descriptionId = CONFIG.descriptionText ? "checkbox-preview-description" : undefined;
  const helperId = CONFIG.helperText ? "checkbox-preview-helper" : undefined;
  const errorId = CONFIG.errorText ? "checkbox-preview-error" : undefined;
  const successId = CONFIG.successText ? "checkbox-preview-success" : undefined;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const isOn = checked || indeterminate;
  const transition = "all " + CONFIG.transitionDuration + "ms " + CONFIG.transitionEasing;
  const boxShadow = CONFIG.shadowEnabled
    ? CONFIG.shadowX + "px " + CONFIG.shadowY + "px " + CONFIG.shadowBlur + "px " + CONFIG.shadowSpread + "px " + CONFIG.shadowColor
    : "none";

  const borderColor =
    CONFIG.disabled && CONFIG.disabledUseCustomColors
      ? CONFIG.disabledBorderColor
      : CONFIG.ariaInvalid
        ? CONFIG.errorBorderColor
        : hovered && !CONFIG.disabled
          ? (isOn ? CONFIG.hoverCheckedBorderColor : CONFIG.hoverBorderColor)
          : isOn
            ? indeterminate
              ? CONFIG.indeterminateBorderColor
              : CONFIG.checkedBorderColor
            : CONFIG.boxBorderColor;

  const backgroundColor =
    CONFIG.disabled && CONFIG.disabledUseCustomColors
      ? CONFIG.disabledBgColor
      : CONFIG.ariaInvalid
        ? CONFIG.errorBgColor
        : hovered && !CONFIG.disabled
          ? isOn
            ? CONFIG.hoverCheckedBgColor
            : CONFIG.hoverBgColor
          : isOn
            ? indeterminate
              ? CONFIG.indeterminateBgColor
              : CONFIG.checkedBgColor
            : CONFIG.boxBgColor;

  const iconStyle =
    CONFIG.animationType === "scale"
      ? { transform: isOn ? "scale(1)" : "scale(0)", opacity: isOn ? 1 : 0, transition }
      : CONFIG.animationType === "fade"
        ? { opacity: isOn ? 1 : 0, transition }
        : { transition };

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: CONFIG.labelGap,
        flexDirection: CONFIG.labelPosition === "left" ? "row-reverse" : "row",
        cursor: CONFIG.disabled ? CONFIG.disabledCursor : "pointer",
        opacity: CONFIG.disabled ? CONFIG.disabledOpacity : 1,
      }}
      dir={CONFIG.dir}
      lang={CONFIG.lang || undefined}
      onPointerEnter={() => {
        if (!CONFIG.disabled) setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={CONFIG.disabled}
        id={CONFIG.id || undefined}
        name={CONFIG.name || undefined}
        value={CONFIG.value || undefined}
        dir={CONFIG.dir}
        lang={CONFIG.lang || undefined}
        aria-label={CONFIG.ariaLabel || undefined}
        aria-describedby={[descriptionId, helperId, errorId, successId, CONFIG.ariaDescribedBy]
          .filter(Boolean)
          .join(" ") || undefined}
        aria-checked={CONFIG.ariaChecked || (indeterminate ? "mixed" : checked ? "true" : "false")}
        aria-required={CONFIG.ariaRequired || undefined}
        aria-invalid={CONFIG.ariaInvalid || undefined}
        required={CONFIG.ariaRequired || undefined}
        title={CONFIG.title || undefined}
        tabIndex={CONFIG.tabIndex}
        role={CONFIG.role || undefined}
        onChange={(event) => {
          if (CONFIG.disabled) return;
          if (indeterminate) {
            setIndeterminate(false);
            setChecked(true);
            return;
          }
          setChecked(event.target.checked);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: CONFIG.boxSize,
          height: CONFIG.boxSize,
          borderWidth: CONFIG.boxBorderWidth,
          borderStyle: CONFIG.boxBorderStyle,
          borderColor,
          borderRadius: CONFIG.boxBorderRadius,
          backgroundColor,
          boxShadow,
          outline: focused && !CONFIG.disabled && CONFIG.focusRingEnabled ? CONFIG.focusRingWidth + "px solid " + CONFIG.focusRingColor : "none",
          outlineOffset: focused && !CONFIG.disabled && CONFIG.focusRingEnabled ? CONFIG.focusRingOffset + "px" : "0px",
          transition,
          flexShrink: 0,
          touchAction: "manipulation",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...iconStyle }}>
          {isOn ? (
            indeterminate ? (
              <svg
                width={CONFIG.checkmarkSize}
                height={CONFIG.checkmarkSize}
                viewBox="0 0 16 16"
                fill="none"
                stroke={CONFIG.indeterminateIndicatorColor}
                strokeWidth={CONFIG.checkmarkStrokeWidth}
                strokeLinecap="round"
              >
                <path d="M4 8 L12 8" />
              </svg>
            ) : (
              <Checkmark />
            )
          ) : null}
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
      <div style={{ marginTop: 12, display: "grid", gap: 4, textAlign: "center", fontSize: 12, maxWidth: 420 }}>
        {CONFIG.descriptionText ? <p id={descriptionId} style={{ color: CONFIG.descriptionColor }}>{CONFIG.descriptionText}</p> : null}
        {CONFIG.helperText ? <p id={helperId} style={{ color: CONFIG.helperColor }}>{CONFIG.helperText}</p> : null}
        {CONFIG.errorText ? <p id={errorId} style={{ color: CONFIG.errorColor }}>{CONFIG.errorText}</p> : null}
        {CONFIG.successText ? <p id={successId} style={{ color: CONFIG.successColor }}>{CONFIG.successText}</p> : null}
      </div>
    </label>
  );
}
`;

  return { content, filename };
}
