import React from "react";
import {
  type TypographyState,
  SYSTEM_FONTS,
  SCALE_RATIO_VALUES,
} from "../../types";

type PreviewMode =
  | "scale"
  | "headings"
  | "body"
  | "font"
  | "spacing"
  | "decoration"
  | "a11y";

export function TypographyPreview({
  state,
  activeSection = "scale",
  selectedHeading = 1,
  selectedBody = "body",
}: {
  state: TypographyState;
  activeSection?: PreviewMode;
  selectedHeading?: 1 | 2 | 3 | 4 | 5 | 6;
  selectedBody?: "body" | "lead" | "small" | "caption";
}) {
  // Single text color - used in both preview and export
  const textColor = state.defaultTextColor || "#1e293b";
  const mutedColor = `color-mix(in oklab, ${textColor} 70%, gray)`;

  // Compute font family
  const fontFamily =
    state.fontBucket === "google"
      ? `"${state.googleFontFamily}", sans-serif`
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "system-ui, sans-serif";

  // Text shadow CSS
  const textShadow = state.textShadowEnabled
    ? `${state.textShadowX}px ${state.textShadowY}px ${state.textShadowBlur}px ${state.textShadowColor}`
    : "none";

  // Text decoration CSS
  const textDecorationLine = state.textDecoration;
  const textDecorationStyle = state.textDecorationStyle;
  const textDecorationColor = state.textDecorationColor;
  const textDecorationThickness = `${state.textDecorationThickness}px`;

  // Base styles for all text
  const baseStyles: React.CSSProperties = {
    fontFamily,
    textAlign: state.textAlign,
    direction: state.direction,
    textShadow,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textDecorationThickness,
    textTransform: state.textTransform,
    wordSpacing: `${state.defaultWordSpacing}${state.defaultWordSpacingUnit}`,
  };

  // Get the heading being edited
  const currentHeading = state.headings.find(
    (h) => h.level === selectedHeading,
  );

  // Get the body style being edited
  const currentBody = state[selectedBody];

  // Sample text for preview
  const sampleTexts = {
    h1: "The quick brown fox",
    h2: "Jumps over the lazy dog",
    h3: "Pack my box with five dozen",
    h4: "How vexingly quick daft zebras",
    h5: "The five boxing wizards jump",
    h6: "Sphinx of black quartz judge my",
    body: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
    lead: "A lead paragraph introduces the main content with slightly larger text to capture attention.",
    small:
      "Small text is used for secondary information, footnotes, and supplementary content.",
    caption: "Caption text for images and figures.",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Background Grid - subtle, respects parent bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-xl px-8 py-6 flex flex-col items-center justify-center">
        {/* Scale Section - Show full hierarchy */}
        {activeSection === "scale" && (
          <div className="w-full space-y-3 text-center">
            <div
              className="text-xs uppercase tracking-wide mb-4"
              style={{ color: mutedColor }}
            >
              Type Scale Preview
            </div>
            {state.headings.slice(0, 4).map((h) => (
              <div
                key={h.level}
                style={{
                  ...baseStyles,
                  fontSize: `${h.fontSize}${h.fontSizeUnit}`,
                  fontWeight: h.fontWeight,
                  lineHeight: h.lineHeight,
                  letterSpacing: `${h.letterSpacing}${h.letterSpacingUnit}`,
                  color: textColor,
                }}
              >
                H{h.level}:{" "}
                {sampleTexts[`h${h.level}` as keyof typeof sampleTexts]}
              </div>
            ))}
          </div>
        )}

        {/* Headings Section - Show ONLY selected heading */}
        {activeSection === "headings" && currentHeading && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Heading {currentHeading.level}
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: `${currentHeading.fontSize}${currentHeading.fontSizeUnit}`,
                fontWeight: currentHeading.fontWeight,
                lineHeight: currentHeading.lineHeight,
                letterSpacing: `${currentHeading.letterSpacing}${currentHeading.letterSpacingUnit}`,
                textTransform: currentHeading.textTransform,
                color: textColor,
              }}
            >
              {
                sampleTexts[
                  `h${currentHeading.level}` as keyof typeof sampleTexts
                ]
              }
            </div>
            <div
              className="text-xs px-3 py-2 rounded-lg inline-block mt-4"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {currentHeading.fontSize}
              {currentHeading.fontSizeUnit} · {currentHeading.fontWeight} ·{" "}
              {currentHeading.lineHeight}lh
            </div>
          </div>
        )}

        {/* Body Section - Show ONLY selected body style */}
        {activeSection === "body" && currentBody && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {selectedBody.charAt(0).toUpperCase() + selectedBody.slice(1)}{" "}
              Text
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: `${currentBody.fontSize}${currentBody.fontSizeUnit}`,
                fontWeight: currentBody.fontWeight,
                lineHeight: currentBody.lineHeight,
                letterSpacing: `${currentBody.letterSpacing}${currentBody.letterSpacingUnit}`,
                color: textColor,
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {sampleTexts[selectedBody]}
            </p>
            <div
              className="text-xs px-3 py-2 rounded-lg inline-block mt-4"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {currentBody.fontSize}
              {currentBody.fontSizeUnit} · {currentBody.fontWeight} ·{" "}
              {currentBody.lineHeight}lh
            </div>
          </div>
        )}

        {/* Font Section - Show sample with current font */}
        {activeSection === "font" && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Font Family Preview
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "2.5rem",
                fontWeight: 700,
                lineHeight: 1.2,
                color: textColor,
              }}
            >
              Aa Bb Cc
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                color: textColor,
                maxWidth: "350px",
                margin: "0 auto",
              }}
            >
              The quick brown fox jumps over the lazy dog. 0123456789
            </div>
            <div
              className="text-xs px-3 py-2 rounded-lg inline-block mt-4"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {state.fontBucket === "google"
                ? state.googleFontFamily
                : SYSTEM_FONTS[state.systemFontIdx]?.label}
            </div>
          </div>
        )}

        {/* Spacing Section - Show line height and spacing demo */}
        {activeSection === "spacing" && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Spacing Preview
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: state.defaultLineHeight,
                letterSpacing: `${state.defaultLetterSpacing}${state.defaultLetterSpacingUnit}`,
                color: textColor,
                maxWidth: "380px",
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              The quick brown fox jumps over the lazy dog. Pack my box with five
              dozen liquor jugs. How vexingly quick daft zebras jump! Sphinx of
              black quartz, judge my vow.
            </p>
            <div
              className="text-xs px-3 py-2 rounded-lg inline-block mt-4"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              Line: {state.defaultLineHeight} · Letter:{" "}
              {state.defaultLetterSpacing}
              {state.defaultLetterSpacingUnit} · Word:{" "}
              {state.defaultWordSpacing}
              {state.defaultWordSpacingUnit}
            </div>
          </div>
        )}

        {/* Decoration Section - Show decoration effects */}
        {activeSection === "decoration" && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Decoration Preview
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                color: textColor,
              }}
            >
              Styled Text
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                color: textColor,
                maxWidth: "350px",
                margin: "0 auto",
              }}
            >
              Preview of text decoration, transform, and shadow effects applied.
            </p>
            <div
              className="text-xs px-3 py-2 rounded-lg inline-block mt-4 space-x-2"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              <span>{state.textAlign}</span>
              <span>·</span>
              <span>{state.textTransform}</span>
              <span>·</span>
              <span>{state.textDecoration}</span>
              {state.textShadowEnabled && <span>· shadow</span>}
            </div>
          </div>
        )}

        {/* A11y Section - Show accessibility info */}
        {activeSection === "a11y" && (
          <div className="w-full text-center space-y-4">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Accessibility Preview
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "1.5rem",
                fontWeight: 500,
                lineHeight: 1.4,
                color: textColor,
              }}
            >
              Sample Text Color
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                color: textColor,
                maxWidth: "350px",
                margin: "0 auto",
              }}
            >
              Ensure sufficient contrast between text and background for
              readability.
            </p>
            {state.ariaLabel && (
              <div
                className="text-xs px-3 py-2 rounded-lg inline-block mt-4"
                style={{ background: `${textColor}10`, color: mutedColor }}
              >
                aria-label: "{state.ariaLabel}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
