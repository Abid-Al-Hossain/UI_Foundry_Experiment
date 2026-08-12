"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Switch from "@/app/components/controls/input/Switch";

export default function TextShadowSection(props: {
  PALETTE: readonly string[];

  textShadowEnabled: boolean;
  setTextShadowEnabled: (v: boolean) => void;

  tsColorMode: "custom" | "auto" | "contrast";
  setTsColorMode: (v: "custom" | "auto" | "contrast") => void;

  tsXText: string;
  setTsXText: (v: string) => void;

  tsYText: string;
  setTsYText: (v: string) => void;

  tsBlurText: string;
  setTsBlurText: (v: string) => void;

  tsOpacityText: string;
  setTsOpacityText: (v: string) => void;

  tsColorInput: string;
  setTsColorInput: (v: string) => void;

  tsColorOk: boolean;
  tsColorHex: string;
  tsColorRgb: string;
}) {
  return (
    <SectionCard
      title="Text shadow"
      subtitle="Add a shadow to the label for depth/contrast."
    >
      <Switch
        label={<>Enable text shadow</>}
        checked={props.textShadowEnabled}
        onChange={(checked) => props.setTextShadowEnabled(checked)}
      />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SizeControl
          label="X offset (px)"
          value={Number(props.tsXText) || 0}
          onChange={(v) => props.setTsXText(String(v))}
          min={-20}
          max={20}
          step={1}
        />
        <SizeControl
          label="Y offset (px)"
          value={Number(props.tsYText) || 0}
          onChange={(v) => props.setTsYText(String(v))}
          min={-20}
          max={20}
          step={1}
        />
        <SizeControl
          label="Blur (px)"
          value={Number(props.tsBlurText) || 0}
          onChange={(v) => props.setTsBlurText(String(v))}
          min={0}
          max={60}
          step={1}
        />
        <SizeControl
          label="Opacity (0–1)"
          value={Number(props.tsOpacityText) || 0}
          onChange={(v) => props.setTsOpacityText(String(v))}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <div className="mt-4 space-y-3">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Shadow color mode
        </div>
        <div className="flex flex-wrap gap-2">
          {(["custom", "auto", "contrast"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => props.setTsColorMode(mode)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  props.tsColorMode === mode ? "var(--primary)" : "transparent",
                color: props.tsColorMode === mode ? "white" : "var(--text)",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {props.tsColorMode === "custom" ? (
          <ColorControl
            label="Shadow color"
            palette={props.PALETTE}
            value={props.tsColorInput}
            onChange={props.setTsColorInput}
          />
        ) : (
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            {props.tsColorMode === "auto"
              ? "Auto uses the text color with the chosen opacity."
              : "Contrast uses black/white for maximum legibility."}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
