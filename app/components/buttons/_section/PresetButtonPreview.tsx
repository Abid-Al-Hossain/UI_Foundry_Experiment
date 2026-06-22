import React from "react";

import { type ButtonPreset } from "../_data/buttonPresets";
import { resolveIconSvg } from "../_utils/iconMarkup";
import { buildPresetPreviewModel } from "../_utils/presetPreviewModel";

export default function PresetButtonPreview({ preset }: { preset: ButtonPreset }) {
  const model = buildPresetPreviewModel(preset.state);
  const baseIconSvg = resolveIconSvg(
    preset.state.iconSource,
    preset.state.iconName,
    preset.state.iconCustomSvg,
  );

  return (
    <div
      className="mt-3 rounded-2xl border p-4"
      data-audit="preset-preview-root"
      data-preset-id={preset.id}
      data-testid={`preset-preview-${preset.id}`}
      style={{
        borderColor: "color-mix(in oklab, var(--border) 80%, transparent)",
        background: model.canvas,
      }}
    >
      <div
        className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl border text-sm font-semibold"
        data-audit="preset-preview-button"
        data-preset-id={preset.id}
        data-testid={`preset-preview-button-${preset.id}`}
        style={{
          width: `min(100%, ${model.width})`,
          minHeight: model.minHeight,
          padding: model.padding,
          background: model.background,
          backgroundClip: "padding-box",
          WebkitBackgroundClip: "padding-box",
          backdropFilter: model.backdropFilter,
          WebkitBackdropFilter: model.backdropFilter,
          color: model.color,
          borderColor: model.borderColor,
          boxShadow: model.boxShadow,
          borderWidth: model.borderWidth,
          borderStyle: "solid",
          borderRadius: model.borderRadius,
          fontFamily: model.fontFamily,
          fontSize: model.fontSize,
          fontWeight: model.fontWeight,
          letterSpacing: model.letterSpacing,
          lineHeight: model.lineHeight,
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        {model.topGradient !== "none" ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            data-audit="preset-preview-top-gradient"
            data-preset-id={preset.id}
            style={{ background: model.topGradient, mixBlendMode: "overlay" }}
          />
        ) : null}
        <span
          className="relative z-[1] inline-flex items-center justify-center"
          data-audit="preset-preview-content"
          data-preset-id={preset.id}
          style={{
            gap: baseIconSvg ? model.iconGap : "0px",
            flexDirection: preset.state.iconPosition === "right" ? "row-reverse" : "row",
          }}
        >
          {baseIconSvg ? (
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
              data-audit="preset-preview-icon"
              data-preset-id={preset.id}
              data-testid={`preset-preview-icon-${preset.id}`}
              style={{
                width: model.iconSize,
                height: model.iconSize,
                fontSize: model.iconSize,
                color: model.iconColor,
              }}
              dangerouslySetInnerHTML={{ __html: baseIconSvg }}
            />
          ) : null}
          <span
            data-audit="preset-preview-label"
            data-preset-id={preset.id}
            data-testid={`preset-preview-label-${preset.id}`}
          >
            {preset.state.label}
          </span>
        </span>
      </div>
    </div>
  );
}
