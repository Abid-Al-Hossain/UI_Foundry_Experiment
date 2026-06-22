"use client";
import { clamp, norm } from "@/app/components/controls/color/colorUtils";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { type RadioState } from "../types";

export type RadioExportInput = RadioState & {
  downloadName: string;
};

function resolveFontFamily(state: RadioState): string {
  if (state.fontBucket === "google") return state.googleFontFamily;
  return SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit";
}

function resolveShadowColor(color: string, opacity: number): string {
  const parsed = norm(color);
  const match = parsed.ok ? parsed.rgb.match(/\d+/g) : null;
  const alpha = clamp(opacity, 0, 1);

  if (match && match.length >= 3) {
    return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
  }

  return `rgba(0, 0, 0, ${alpha})`;
}

export function buildRadioExportPayload(params: RadioExportInput) {
  const filename = `${params.downloadName || "radio-group"}.tsx`;
  const config = {
    id: params.id,
    name: params.name,
    selectedValue: params.selectedValue,
    orientation: params.orientation,
    gap: params.gap,
    options: params.options,
    outerSize: params.outerSize,
    outerBorderWidth: params.outerBorderWidth,
    outerBorderStyle: params.outerBorderStyle,
    outerBorderColor: params.outerBorderColor,
    outerBgColor: params.outerBgColor,
    selectedOuterBorderColor: params.selectedOuterBorderColor,
    selectedOuterBgColor: params.selectedOuterBgColor,
    dotSize: params.dotSize,
    dotColor: params.dotColor,
    animationType: params.animationType,
    transitionDuration: params.transitionDuration,
    transitionEasing: params.transitionEasing,
    focusRingEnabled: params.focusRingEnabled,
    focusRingColor: params.focusRingColor,
    focusRingWidth: params.focusRingWidth,
    focusRingOffset: params.focusRingOffset,
    hoverBorderColor: params.hoverBorderColor,
    hoverBgColor: params.hoverBgColor,
    hoverDotColor: params.hoverDotColor,
    disabledOpacity: params.disabledOpacity,
    disabledCursor: params.disabledCursor,
    disabledUseCustomColors: params.disabledUseCustomColors,
    disabledBgColor: params.disabledBgColor,
    disabledTextColor: params.disabledTextColor,
    disabledBorderColor: params.disabledBorderColor,
    disabledDotColor: params.disabledDotColor,
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
    labelPosition: params.labelPosition,
    shadowEnabled: params.shadowEnabled,
    shadowX: params.shadowX,
    shadowY: params.shadowY,
    shadowBlur: params.shadowBlur,
    shadowSpread: params.shadowSpread,
    shadowOpacity: params.shadowOpacity,
    shadowColor: resolveShadowColor(params.shadowColor, params.shadowOpacity),
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
    errorBorderColor: params.errorBorderColor,
    errorBgColor: params.errorBgColor,
    successText: params.successText,
    successColor: params.successColor,
  };

  const content = `import React, { useState } from "react";

const CONFIG = ${JSON.stringify(config, null, 2)};

export default function RadioGroupComponent() {
  const [selected, setSelected] = useState(CONFIG.selectedValue);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const descriptionId = CONFIG.descriptionText ? "radio-preview-description" : undefined;
  const helperId = CONFIG.helperText ? "radio-preview-helper" : undefined;
  const errorId = CONFIG.errorText ? "radio-preview-error" : undefined;
  const successId = CONFIG.successText ? "radio-preview-success" : undefined;
  const transition = "all " + CONFIG.transitionDuration + "ms " + CONFIG.transitionEasing;
  const boxShadow = CONFIG.shadowEnabled
    ? CONFIG.shadowX + "px " + CONFIG.shadowY + "px " + CONFIG.shadowBlur + "px " + CONFIG.shadowSpread + "px " + CONFIG.shadowColor
    : "none";

  return (
    <div
      role={CONFIG.role || "radiogroup"}
      aria-label={CONFIG.ariaLabel || CONFIG.name}
      aria-required={CONFIG.ariaRequired || undefined}
      aria-invalid={Boolean(CONFIG.errorText) || undefined}
      aria-describedby={[descriptionId, helperId, errorId, successId, CONFIG.ariaDescribedBy]
        .filter(Boolean)
        .join(" ") || undefined}
      style={{
        display: "flex",
        flexDirection: CONFIG.orientation === "horizontal" ? "row" : "column",
        gap: CONFIG.gap,
      }}
      dir={CONFIG.dir}
      lang={CONFIG.lang || undefined}
    >
      {CONFIG.options.map((option, index) => {
        const isSelected = selected === option.value;
        const isDisabled = Boolean(option.disabled);
        const isHovered = hoveredIndex === index && !isDisabled;
        const isFocused = focusedIndex === index && !isDisabled;
        const dotStyle =
          CONFIG.animationType === "scale"
            ? {
                transform: isSelected ? "scale(1)" : "scale(0)",
                opacity: isSelected ? 1 : 0,
                transition,
              }
            : CONFIG.animationType === "fade"
              ? {
                  opacity: isSelected ? 1 : 0,
                  transition,
                }
              : { transition };

        return (
          <label
            key={option.value + "-" + index}
            onPointerEnter={() => setHoveredIndex(index)}
            onPointerLeave={() => setHoveredIndex(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexDirection: CONFIG.labelPosition === "left" ? "row-reverse" : "row",
              gap: CONFIG.labelGap,
              cursor: isDisabled ? CONFIG.disabledCursor : "pointer",
              opacity: isDisabled ? CONFIG.disabledOpacity : 1,
            }}
          >
            <input
              id={(CONFIG.id || CONFIG.name) + "-" + option.value}
              type="radio"
              name={CONFIG.name}
              value={option.value}
              checked={isSelected}
              disabled={isDisabled}
              required={CONFIG.ariaRequired || undefined}
              dir={CONFIG.dir}
              lang={CONFIG.lang || undefined}
              title={CONFIG.title || undefined}
              tabIndex={CONFIG.tabIndex}
              onChange={() => {
                if (isDisabled) return;
                setSelected(option.value);
              }}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: CONFIG.outerSize,
                height: CONFIG.outerSize,
                borderWidth: CONFIG.outerBorderWidth,
                borderStyle: CONFIG.outerBorderStyle,
                borderColor: isDisabled && CONFIG.disabledUseCustomColors
                  ? CONFIG.disabledBorderColor
                  : CONFIG.errorText
                  ? CONFIG.errorBorderColor
                  : isHovered
                  ? CONFIG.hoverBorderColor
                  : isSelected
                    ? CONFIG.selectedOuterBorderColor
                    : CONFIG.outerBorderColor,
                borderRadius: "50%",
                backgroundColor: isDisabled && CONFIG.disabledUseCustomColors
                  ? CONFIG.disabledBgColor
                  : CONFIG.errorText
                  ? CONFIG.errorBgColor
                  : isHovered
                  ? CONFIG.hoverBgColor
                  : isSelected
                    ? CONFIG.selectedOuterBgColor
                    : CONFIG.outerBgColor,
                boxShadow: isFocused && CONFIG.focusRingEnabled ? "0 0 0 " + CONFIG.focusRingWidth + "px " + CONFIG.focusRingColor : boxShadow,
                outlineOffset: isFocused && CONFIG.focusRingEnabled ? CONFIG.focusRingOffset : undefined,
                transition,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: CONFIG.dotSize,
                  height: CONFIG.dotSize,
                  borderRadius: "50%",
                  backgroundColor: isDisabled && CONFIG.disabledUseCustomColors
                    ? CONFIG.disabledDotColor
                    : isHovered && !isSelected
                    ? CONFIG.hoverDotColor
                    : CONFIG.dotColor,
                  ...dotStyle,
                }}
              />
            </span>
            <span
              style={{
                fontFamily: CONFIG.fontFamily,
                fontSize: CONFIG.labelFontSize + CONFIG.fontSizeUnit,
                fontWeight: CONFIG.labelFontWeight,
                color: isDisabled && CONFIG.disabledUseCustomColors ? CONFIG.disabledTextColor : CONFIG.labelColor,
                letterSpacing: CONFIG.labelLetterSpacing + CONFIG.letterSpacingUnit,
                lineHeight: CONFIG.labelLineHeight,
                fontStyle: CONFIG.labelFontStyle,
                textTransform: CONFIG.labelTextTransform,
                textDecoration: CONFIG.labelUnderline ? "underline" : "none",
              }}
            >
              {option.label}
            </span>
          </label>
        );
      })}
      <div style={{ marginTop: 12, display: "grid", gap: 4, textAlign: "center", fontSize: 12, maxWidth: 420 }}>
        {CONFIG.descriptionText ? <p id={descriptionId} style={{ color: CONFIG.descriptionColor }}>{CONFIG.descriptionText}</p> : null}
        {CONFIG.helperText ? <p id={helperId} style={{ color: CONFIG.helperColor }}>{CONFIG.helperText}</p> : null}
        {CONFIG.errorText ? <p id={errorId} style={{ color: CONFIG.errorColor }}>{CONFIG.errorText}</p> : null}
        {CONFIG.successText ? <p id={successId} style={{ color: CONFIG.successColor }}>{CONFIG.successText}</p> : null}
      </div>
    </div>
  );
}
`;

  return { content, filename };
}
