import React from "react";
import { type TypographyState, SYSTEM_FONTS } from "../types";

type PreviewMode =
  | "scale"
  | "headings"
  | "body"
  | "font"
  | "metadata"
  | "colors"
  | "preview"
  | "spacing"
  | "layout"
  | "semantics"
  | "effects"
  | "decoration"
  | "shadow"
  | "accessibility";

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
  const textColor =
    state.previewTextColor || state.defaultTextColor || "#1e293b";
  const mutedColor = `color-mix(in oklab, ${textColor} 70%, gray)`;
  const previewSurface = state.previewBgColor || "#ffffff";

  const fontFamily =
    state.fontBucket === "google"
      ? `"${state.googleFontFamily}", sans-serif`
      : SYSTEM_FONTS[state.systemFontIdx]?.css || "system-ui, sans-serif";

  const textShadow = state.textShadowEnabled
    ? `${state.textShadowX}px ${state.textShadowY}px ${state.textShadowBlur}px ${state.textShadowColor}`
    : "none";

  const baseStyles: React.CSSProperties = {
    fontFamily,
    textAlign: state.textAlign,
    direction: state.direction,
    textShadow,
    textDecorationLine: state.textDecoration,
    textDecorationStyle: state.textDecorationStyle,
    textDecorationColor: state.textDecorationColor,
    textDecorationThickness: `${state.textDecorationThickness}px`,
    textTransform: state.textTransform,
    wordSpacing: `${state.defaultWordSpacing}${state.defaultWordSpacingUnit}`,
    whiteSpace: state.whiteSpace,
    textOverflow: state.textOverflow,
    overflow: state.textOverflow === "ellipsis" ? "hidden" : undefined,
    hyphens: state.hyphens,
    wordBreak: state.wordBreak,
    overflowWrap: state.overflowWrap,
    textIndent: state.textIndent,
    columnCount: state.columnCount > 1 ? state.columnCount : undefined,
    columnGap: state.columnCount > 1 ? state.columnGap : undefined,
    columnRule: state.columnCount > 1 && state.columnRule !== "none" ? state.columnRule : undefined,
    orphans: state.orphans,
    widows: state.widows,
    fontFeatureSettings: state.fontFeatureSettings,
  };

  const resolvePreviewColor = (value?: string) => {
    if (!value || value === "var(--text)") return textColor;
    if (value === "var(--muted)") return mutedColor;
    return value;
  };

  const currentHeading = state.headings.find((h) => h.level === selectedHeading);
  const currentBody = state[selectedBody];

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
    <div className="relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        className="relative z-10 flex w-full max-w-xl flex-col items-center justify-center border"
        style={{
          background: previewSurface,
          color: textColor,
          borderColor: "color-mix(in oklab, var(--border) 70%, transparent)",
          boxShadow: "0 24px 64px -36px rgba(15, 23, 42, 0.28)",
          borderRadius: state.previewRadius,
          padding: state.previewPadding,
        }}
      >
        {activeSection === "scale" && (
          <div className="w-full space-y-3 text-center">
            <div
              className="mb-4 text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              Type Scale Preview
            </div>
            {state.headings.slice(0, 4).map((heading) => (
              <div
                key={heading.level}
                style={{
                  ...baseStyles,
                fontSize: `${heading.fontSize}${heading.fontSizeUnit}`,
                fontWeight: heading.fontWeight,
                lineHeight: heading.lineHeight,
                letterSpacing: `${heading.letterSpacing}${heading.letterSpacingUnit}`,
                color: resolvePreviewColor(heading.color),
              }}
            >
                H{heading.level}:{" "}
                {sampleTexts[`h${heading.level}` as keyof typeof sampleTexts]}
              </div>
            ))}
          </div>
        )}

        {activeSection === "headings" && currentHeading && (
          <div className="w-full space-y-4 text-center">
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
                color: resolvePreviewColor(currentHeading.color),
              }}
            >
              {
                sampleTexts[
                  `h${currentHeading.level}` as keyof typeof sampleTexts
                ]
              }
            </div>
            <div
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {currentHeading.fontSize}
              {currentHeading.fontSizeUnit} / {currentHeading.fontWeight} /{" "}
              {currentHeading.lineHeight}lh
            </div>
          </div>
        )}

        {activeSection === "body" && currentBody && (
          <div className="w-full space-y-4 text-center">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {selectedBody.charAt(0).toUpperCase() + selectedBody.slice(1)} Text
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: `${currentBody.fontSize}${currentBody.fontSizeUnit}`,
                fontWeight: currentBody.fontWeight,
                lineHeight: currentBody.lineHeight,
                letterSpacing: `${currentBody.letterSpacing}${currentBody.letterSpacingUnit}`,
                color: resolvePreviewColor(currentBody.color),
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {sampleTexts[selectedBody]}
            </p>
            <div
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {currentBody.fontSize}
              {currentBody.fontSizeUnit} / {currentBody.fontWeight} /{" "}
              {currentBody.lineHeight}lh
            </div>
          </div>
        )}

        {activeSection === "font" && (
          <div className="w-full space-y-4 text-center">
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
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              {state.fontBucket === "google"
                ? state.googleFontFamily
                : SYSTEM_FONTS[state.systemFontIdx]?.label}
            </div>
          </div>
        )}

        {(activeSection === "colors" || activeSection === "preview") && (
          <div className="w-full space-y-5 text-center">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {activeSection === "preview"
                ? "Preview Surface"
                : "Color System Preview"}
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "2rem",
                fontWeight: 700,
                lineHeight: 1.2,
                color:
                  activeSection === "preview"
                    ? resolvePreviewColor(state.previewTextColor)
                    : resolvePreviewColor(state.defaultTextColor),
              }}
            >
              {activeSection === "preview"
                ? "Reading environment specimen"
                : "Brand-consistent type color"}
            </div>
            <div
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.7,
                color: resolvePreviewColor(state.previewTextColor),
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              {activeSection === "preview"
                ? "Use preview-only surface colors to evaluate readability without changing exported system tokens."
                : "Preview text color can differ from the exported default text color when the specimen card needs a different reading tone."}
            </div>
            <div
              className="mx-auto max-w-[420px] rounded-xl border p-4 text-left"
              style={{
                borderColor: `${textColor}20`,
                background: previewSurface,
                color: resolvePreviewColor(state.previewTextColor),
              }}
            >
              Surface preview using the current specimen palette.
            </div>
          </div>
        )}

        {activeSection === "spacing" && (
          <div className="w-full space-y-4 text-center">
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
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              Line: {state.defaultLineHeight} / Letter:{" "}
              {state.defaultLetterSpacing}
              {state.defaultLetterSpacingUnit} / Word:{" "}
              {state.defaultWordSpacing}
              {state.defaultWordSpacingUnit}
            </div>
          </div>
        )}

        {(activeSection === "layout" || activeSection === "semantics") && (
          <div className="w-full space-y-4 text-center">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {activeSection === "semantics" ? "Semantics Preview" : "Layout Preview"}
            </div>
            <p
              style={{
                ...baseStyles,
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                color: textColor,
                maxWidth: state.textOverflow === "ellipsis" ? "220px" : "360px",
                margin: "0 auto",
                border: `1px solid ${textColor}20`,
                padding: "0.75rem 1rem",
                borderRadius: "1rem",
              }}
            >
              Layout preview shows alignment, direction, and overflow handling for
              longer specimen text inside a constrained frame.
            </p>
            <div
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs space-x-2"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              <span>{state.textAlign}</span>
              <span>/</span>
              <span>{state.direction}</span>
              <span>/</span>
              <span>{state.whiteSpace}</span>
              <span>/</span>
              <span>{state.textOverflow}</span>
            </div>
          </div>
        )}

        {(activeSection === "effects" ||
          activeSection === "decoration" ||
          activeSection === "shadow") && (
          <div className="w-full space-y-4 text-center">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {activeSection === "effects"
                ? "Effects Preview"
                : activeSection === "decoration"
                  ? "Decoration Preview"
                  : "Shadow Preview"}
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
              Preview of
              {activeSection === "effects"
                ? " text transform"
                : activeSection === "decoration"
                  ? " underline and strike styling"
                  : " shadow depth and readability treatments"}{" "}
              applied to the specimen.
            </p>
            <div
              className="mt-4 inline-block rounded-lg px-3 py-2 text-xs space-x-2"
              style={{ background: `${textColor}10`, color: mutedColor }}
            >
              <span>{state.textAlign}</span>
              <span>/</span>
              <span>{state.textTransform}</span>
              <span>/</span>
              <span>{state.textDecoration}</span>
              {state.textShadowEnabled && <span>/ shadow</span>}
            </div>
          </div>
        )}

        {(activeSection === "metadata" || activeSection === "accessibility") && (
          <div className="w-full space-y-4 text-center">
            <div
              className="text-xs uppercase tracking-wide"
              style={{ color: mutedColor }}
            >
              {activeSection === "metadata" ? "Metadata Preview" : "Accessibility Preview"}
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
                className="mt-4 inline-block rounded-lg px-3 py-2 text-xs"
                style={{ background: `${textColor}10`, color: mutedColor }}
              >
                aria-label: &quot;{state.ariaLabel}&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
