"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export default function DisabledSection(props: {
  PALETTE: readonly string[];

  disabledOpacityText: string;
  setDisabledOpacityText: (v: string) => void;

  disabledCursor: "not-allowed" | "default" | "pointer";
  setDisabledCursor: (v: "not-allowed" | "default" | "pointer") => void;

  disabledUseCustomColors: boolean;
  setDisabledUseCustomColors: (v: boolean) => void;

  disabledBgInput: string;
  setDisabledBgInput: (v: string) => void;
  disabledBgNorm: { ok: boolean; hex: string; rgb: string };

  disabledTextInput: string;
  setDisabledTextInput: (v: string) => void;
  disabledTextNorm: { ok: boolean; hex: string; rgb: string };

  disabledBorderInput: string;
  setDisabledBorderInput: (v: string) => void;
  disabledBorderNorm: { ok: boolean; hex: string; rgb: string };

  disabledBorderWidthText: string;
  setDisabledBorderWidthText: (v: string) => void;
  disabledBorderWidthPx: number;

  disabledHoverSuppressed: boolean;
  setDisabledHoverSuppressed: (v: boolean) => void;

  disabledTextShadowEnabled: boolean;
  setDisabledTextShadowEnabled: (v: boolean) => void;
}) {
  return (
    <SectionCard title="Disabled" subtitle="Colors, opacity, and cursor.">
      <div className="space-y-4">
        <SizeControl
          label="Opacity"
          valueText={props.disabledOpacityText}
          setValueText={props.setDisabledOpacityText}
          min={0}
          max={1}
          step={0.05}
        />

        <div>
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Cursor
          </div>
          <div className="mt-2">
            <Segmented
              value={props.disabledCursor}
              onChange={(v) => props.setDisabledCursor(v as "not-allowed" | "default" | "pointer")}
              items={[
                { value: "not-allowed", label: "Not allowed" },
                { value: "default", label: "Default" },
                { value: "pointer", label: "Pointer" },
              ]}
            />
          </div>
        </div>

        <SizeControl
          label={`Border width (${props.disabledBorderWidthPx}px)`}
          valueText={props.disabledBorderWidthText}
          setValueText={props.setDisabledBorderWidthText}
          min={0}
          max={12}
          step={1}
        />

        <div className="flex items-center gap-2">
          <input
            id="disabled-colors"
            type="checkbox"
            checked={props.disabledUseCustomColors}
            onChange={(e) => props.setDisabledUseCustomColors(e.target.checked)}
            className="uf-clickable"
          />
          <label htmlFor="disabled-colors" className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
            Custom disabled colors
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.disabledHoverSuppressed}
            onChange={(e) => props.setDisabledHoverSuppressed(e.target.checked)}
            className="uf-clickable"
          />
          Suppress hover styles while disabled
        </label>

        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.disabledTextShadowEnabled}
            onChange={(e) => props.setDisabledTextShadowEnabled(e.target.checked)}
            className="uf-clickable"
          />
          Use text shadow when disabled
        </label>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Uses the Text Shadow section values.
        </div>

        {props.disabledUseCustomColors ? (
          <div className="space-y-5">
            <ColorControl
              title="Background"
              palette={props.PALETTE}
              valueText={props.disabledBgInput}
              setValueText={props.setDisabledBgInput}
              normalizedHex={props.disabledBgNorm.hex}
              normalizedRgb={props.disabledBgNorm.rgb}
              ok={props.disabledBgNorm.ok}
            />

            <ColorControl
              title="Text"
              palette={props.PALETTE}
              valueText={props.disabledTextInput}
              setValueText={props.setDisabledTextInput}
              normalizedHex={props.disabledTextNorm.hex}
              normalizedRgb={props.disabledTextNorm.rgb}
              ok={props.disabledTextNorm.ok}
            />

            <ColorControl
              title="Border"
              palette={props.PALETTE}
              valueText={props.disabledBorderInput}
              setValueText={props.setDisabledBorderInput}
              normalizedHex={props.disabledBorderNorm.hex}
              normalizedRgb={props.disabledBorderNorm.rgb}
              ok={props.disabledBorderNorm.ok}
            />
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
