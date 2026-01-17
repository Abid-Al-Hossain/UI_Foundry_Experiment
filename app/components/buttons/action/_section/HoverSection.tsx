"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import GradientControl from "@/app/components/controls/effects/GradientControl";

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
  transitionColorEasing:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear";
  setTransitionColorEasing: (
    v: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear",
  ) => void;
}) {
  return (
    <SectionCard
      title="Hover"
      subtitle="Configure hover background, text, and border colors."
    >
      <div className="text-xs" style={{ color: "var(--muted)" }}>
        Tip: Use State Preview to force hover, and adjust color transition
        timing here.
      </div>

      <label
        className="flex items-center gap-2 text-sm uf-clickable"
        style={{ color: "var(--text)" }}
      >
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
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Color transitions
          </div>
          <SizeControl
            label={`Color duration (${props.transitionColorMs}ms)`}
            value={Number(props.transitionColorDurationText) || 0}
            onChange={(v) => props.setTransitionColorDurationText(String(v))}
            min={0}
            max={2000}
            step={10}
          />
          <Segmented
            value={props.transitionColorEasing}
            onChange={(v) =>
              props.setTransitionColorEasing(
                v as "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear",
              )
            }
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
                label="Custom hover background"
                palette={props.PALETTE}
                value={props.hoverBgInput}
                onChange={props.setHoverBgInput}
              />
            </div>
          ) : null}

          {props.hoverBgMode === "gradient" ? (
            <div className="mt-3">
              <GradientControl
                label="Hover Gradient"
                angle={Number(props.hoverGradAngleText) || 0}
                setAngle={(v) => props.setHoverGradAngleText(String(v))}
                startColor={props.hoverGradStartInput}
                setStartColor={props.setHoverGradStartInput}
                endColor={props.hoverGradEndInput}
                setEndColor={props.setHoverGradEndInput}
                midEnabled={props.hoverGradMidEnabled}
                setMidEnabled={props.setHoverGradMidEnabled}
                midColor={props.hoverGradMidInput}
                setMidColor={props.setHoverGradMidInput}
                palette={props.PALETTE}
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
                label="Custom hover text"
                palette={props.PALETTE}
                value={props.hoverTextInput}
                onChange={props.setHoverTextInput}
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
                label="Custom hover border"
                palette={props.PALETTE}
                value={props.hoverBorderInput}
                onChange={props.setHoverBorderInput}
              />
            </div>
          ) : null}
        </div>
      </div>
    </SectionCard>
  );
}
