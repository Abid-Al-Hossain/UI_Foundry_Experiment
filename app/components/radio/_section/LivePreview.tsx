import React, { useState } from "react";
import { RadioState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

export default function LivePreview({ state }: { state: RadioState }) {
  const [selected, setSelected] = useState(state.selectedValue);
  const transition = `all ${state.transitionDuration}ms ${state.transitionEasing}`;

  // Construct Font Family
  const fontFamily =
    state.fontBucket === "google"
      ? state.googleFontFamily
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "inherit";

  // Construct Shadow
  const boxShadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  const pseudoBase = "radio-preview";
  const cssString = state.options
    .map(
      (_, idx) => `
    #${pseudoBase}-${idx}:focus-visible + .radio-outer { box-shadow: 0 0 0 ${state.focusRingWidth}px ${state.focusRingColor} !important; }
    #${pseudoBase}-${idx}:not(:disabled):hover + .radio-outer { border-color: ${state.hoverBorderColor} !important; }
  `,
    )
    .join("");

  return (
    <div
      className="flex items-center justify-center p-8"
      style={{ minHeight: 300 }}
    >
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <div
        role={state.role || "radiogroup"}
        aria-label={state.ariaLabel || state.name}
        style={{
          display: "flex",
          flexDirection: state.orientation === "horizontal" ? "row" : "column",
          gap: state.gap,
        }}
      >
        {state.options.map((opt, idx) => {
          const isSelected = selected === opt.value;
          const dotAnim: React.CSSProperties =
            state.animationType === "scale"
              ? {
                  transform: isSelected ? "scale(1)" : "scale(0)",
                  opacity: isSelected ? 1 : 0,
                }
              : state.animationType === "fade"
                ? { opacity: isSelected ? 1 : 0 }
                : {};
          return (
            <label
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexDirection:
                  state.labelPosition === "left" ? "row-reverse" : "row",
                gap: state.labelGap,
                cursor: opt.disabled ? state.disabledCursor : "pointer",
                opacity: opt.disabled ? state.disabledOpacity : 1,
              }}
            >
              <input
                id={`${pseudoBase}-${idx}`}
                type="radio"
                name={state.name}
                value={opt.value}
                checked={isSelected}
                onChange={() => setSelected(opt.value)}
                disabled={opt.disabled}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <span
                className="radio-outer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: state.outerSize,
                  height: state.outerSize,
                  borderWidth: state.outerBorderWidth,
                  borderStyle: state.outerBorderStyle,
                  borderColor: isSelected
                    ? state.selectedOuterBorderColor
                    : state.outerBorderColor,
                  borderRadius: "50%",
                  backgroundColor: isSelected
                    ? state.selectedOuterBgColor
                    : state.outerBgColor,
                  boxShadow,
                  transition,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: state.dotSize,
                    height: state.dotSize,
                    borderRadius: "50%",
                    backgroundColor: state.dotColor,
                    transition,
                    ...dotAnim,
                  }}
                />
              </span>
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
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
