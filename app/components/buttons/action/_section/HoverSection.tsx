"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export default function HoverSection(props: {
  PALETTE: readonly string[];

  hoverEnabled: boolean;
  setHoverEnabled: (v: boolean) => void;

  hoverBgMode: "auto" | "custom" | "gradient";
  setHoverBgMode: (v: "auto" | "custom" | "gradient") => void;
  hoverBgInput: string;
  setHoverBgInput: (v: string) => void;
  hoverBgOk: boolean;
  hoverBgHex: string;
  hoverBgRgb: string;
  hoverGradAngleText: string;
  setHoverGradAngleText: (v: string) => void;
  hoverGradStartInput: string;
  setHoverGradStartInput: (v: string) => void;
  hoverGradStartNorm: { ok: boolean; hex: string; rgb: string };
  hoverGradMidEnabled: boolean;
  setHoverGradMidEnabled: (v: boolean) => void;
  hoverGradMidInput: string;
  setHoverGradMidInput: (v: string) => void;
  hoverGradMidNorm: { ok: boolean; hex: string; rgb: string };
  hoverGradEndInput: string;
  setHoverGradEndInput: (v: string) => void;
  hoverGradEndNorm: { ok: boolean; hex: string; rgb: string };

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

  transitionColorDurationText: string;
  setTransitionColorDurationText: (v: string) => void;
  transitionColorMs: number;
  transitionColorEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  setTransitionColorEasing: (v: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear") => void;
}) {
  return (
    <SectionCard title="Hover" subtitle="Configure hover background, text, and border colors.">
      <div className="text-xs" style={{ color: "var(--muted)" }}>
        Tip: Use State Preview to force hover, and adjust color transition timing here.
      </div>

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
        <div className="space-y-3">
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Color transitions
          </div>
          <SizeControl
            label={`Color duration (${props.transitionColorMs}ms)`}
            valueText={props.transitionColorDurationText}
            setValueText={props.setTransitionColorDurationText}
            min={0}
            max={2000}
            step={10}
          />
          <Segmented
            value={props.transitionColorEasing}
            onChange={(v) => props.setTransitionColorEasing(v as "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear")}
            items={[
              { value: "ease", label: "Ease" },
              { value: "ease-in", label: "Ease in" },
              { value: "ease-out", label: "Ease out" },
              { value: "ease-in-out", label: "Ease in/out" },
              { value: "linear", label: "Linear" },
            ]}
          />
        </div>

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
                { value: "gradient", label: "Gradient" },
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

          {props.hoverBgMode === "gradient" ? (
            <div className="mt-3 space-y-4">
              <SizeControl
                label="Hover gradient angle (deg)"
                valueText={props.hoverGradAngleText}
                setValueText={props.setHoverGradAngleText}
                min={0}
                max={360}
              />

              <ColorControl
                title="Hover gradient start"
                palette={props.PALETTE}
                valueText={props.hoverGradStartInput}
                setValueText={props.setHoverGradStartInput}
                normalizedHex={props.hoverGradStartNorm.hex}
                normalizedRgb={props.hoverGradStartNorm.rgb}
                ok={props.hoverGradStartNorm.ok}
              />

              <div className="flex items-center gap-2">
                <input
                  id="hover-grad-mid-toggle"
                  type="checkbox"
                  checked={props.hoverGradMidEnabled}
                  onChange={(e) => props.setHoverGradMidEnabled(e.target.checked)}
                  className="uf-clickable"
                />
                <label htmlFor="hover-grad-mid-toggle" className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
                  Use middle stop
                </label>
              </div>

              {props.hoverGradMidEnabled ? (
                <ColorControl
                  title="Hover gradient middle"
                  palette={props.PALETTE}
                  valueText={props.hoverGradMidInput}
                  setValueText={props.setHoverGradMidInput}
                  normalizedHex={props.hoverGradMidNorm.hex}
                  normalizedRgb={props.hoverGradMidNorm.rgb}
                  ok={props.hoverGradMidNorm.ok}
                />
              ) : null}

              <ColorControl
                title="Hover gradient end"
                palette={props.PALETTE}
                valueText={props.hoverGradEndInput}
                setValueText={props.setHoverGradEndInput}
                normalizedHex={props.hoverGradEndNorm.hex}
                normalizedRgb={props.hoverGradEndNorm.rgb}
                ok={props.hoverGradEndNorm.ok}
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
