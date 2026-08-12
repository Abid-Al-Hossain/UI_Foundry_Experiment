"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Switch from "@/app/components/controls/input/Switch";

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
          label="Opacity (0-1)"
          value={Number(props.disabledOpacityText) || 1}
          onChange={(v) => props.setDisabledOpacityText(String(v))}
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
              onChange={(v) =>
                props.setDisabledCursor(
                  v as "not-allowed" | "default" | "pointer",
                )
              }
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
          value={Number(props.disabledBorderWidthText) || 0}
          onChange={(v) => props.setDisabledBorderWidthText(String(v))}
          min={0}
          max={12}
          step={1}
        />

        <Switch
          label={<>Custom disabled colors</>}
          id="disabled-colors"
          checked={props.disabledUseCustomColors}
          onChange={(checked) => props.setDisabledUseCustomColors(checked)}
        />

        <Switch
          label={<>Suppress hover styles while disabled</>}
          checked={props.disabledHoverSuppressed}
          onChange={(checked) => props.setDisabledHoverSuppressed(checked)}
        />

        <Switch
          label={<>Use text shadow when disabled</>}
          checked={props.disabledTextShadowEnabled}
          onChange={(checked) => props.setDisabledTextShadowEnabled(checked)}
        />
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Uses the Text Shadow section values.
        </div>

        {props.disabledUseCustomColors ? (
          <div className="space-y-5">
            <ColorControl
              label="Background"
              palette={props.PALETTE}
              value={props.disabledBgInput}
              onChange={props.setDisabledBgInput}
            />

            <ColorControl
              label="Text"
              palette={props.PALETTE}
              value={props.disabledTextInput}
              onChange={props.setDisabledTextInput}
            />

            <ColorControl
              label="Border"
              palette={props.PALETTE}
              value={props.disabledBorderInput}
              onChange={props.setDisabledBorderInput}
            />
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
