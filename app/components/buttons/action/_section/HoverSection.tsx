"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import ColorControl from "./ColorControl";

export default function HoverSection(props: {
  PALETTE: readonly string[];

  hoverEnabled: boolean;
  setHoverEnabled: (v: boolean) => void;

  hoverBgMode: "auto" | "custom";
  setHoverBgMode: (v: "auto" | "custom") => void;
  hoverBgInput: string;
  setHoverBgInput: (v: string) => void;
  hoverBgOk: boolean;
  hoverBgHex: string;
  hoverBgRgb: string;

  hoverTextMode: "same" | "custom";
  setHoverTextMode: (v: "same" | "custom") => void;
  hoverTextInput: string;
  setHoverTextInput: (v: string) => void;
  hoverTextOk: boolean;
  hoverTextHex: string;
  hoverTextRgb: string;

  hoverBorderMode: "same" | "custom";
  setHoverBorderMode: (v: "same" | "custom") => void;
  hoverBorderInput: string;
  setHoverBorderInput: (v: string) => void;
  hoverBorderOk: boolean;
  hoverBorderHex: string;
  hoverBorderRgb: string;
}) {
  return (
    <SectionCard title="Hover" subtitle="Configure hover background, text, and border colors.">
      <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
        <input
          type="checkbox"
          checked={props.hoverEnabled}
          onChange={(e) => props.setHoverEnabled(e.target.checked)}
          className="uf-clickable"
        />
        Enable hover state
      </label>

      <div className="mt-4 space-y-5">
        <div>
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Hover background
          </div>
          <div className="mt-2">
            <Segmented
              value={props.hoverBgMode}
              onChange={(v) => props.setHoverBgMode(v as "auto" | "custom")}
              items={[
                { value: "auto", label: "Auto" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>

          {props.hoverBgMode === "custom" ? (
            <div className="mt-3">
              <ColorControl
                title="Custom hover background"
                palette={props.PALETTE}
                valueText={props.hoverBgInput}
                setValueText={props.setHoverBgInput}
                normalizedHex={props.hoverBgHex}
                normalizedRgb={props.hoverBgRgb}
                ok={props.hoverBgOk}
              />
            </div>
          ) : null}
        </div>

        <div>
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Hover text
          </div>
          <div className="mt-2">
            <Segmented
              value={props.hoverTextMode}
              onChange={(v) => props.setHoverTextMode(v as "same" | "custom")}
              items={[
                { value: "same", label: "Same" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>

          {props.hoverTextMode === "custom" ? (
            <div className="mt-3">
              <ColorControl
                title="Custom hover text"
                palette={props.PALETTE}
                valueText={props.hoverTextInput}
                setValueText={props.setHoverTextInput}
                normalizedHex={props.hoverTextHex}
                normalizedRgb={props.hoverTextRgb}
                ok={props.hoverTextOk}
              />
            </div>
          ) : null}
        </div>

        <div>
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Hover border
          </div>
          <div className="mt-2">
            <Segmented
              value={props.hoverBorderMode}
              onChange={(v) => props.setHoverBorderMode(v as "same" | "custom")}
              items={[
                { value: "same", label: "Same" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>

          {props.hoverBorderMode === "custom" ? (
            <div className="mt-3">
              <ColorControl
                title="Custom hover border"
                palette={props.PALETTE}
                valueText={props.hoverBorderInput}
                setValueText={props.setHoverBorderInput}
                normalizedHex={props.hoverBorderHex}
                normalizedRgb={props.hoverBorderRgb}
                ok={props.hoverBorderOk}
              />
            </div>
          ) : null}
        </div>
      </div>
    </SectionCard>
  );
}
