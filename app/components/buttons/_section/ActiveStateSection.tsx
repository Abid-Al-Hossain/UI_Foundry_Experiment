"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import GradientControl from "@/app/components/controls/effects/GradientControl";

export default function ActiveStateSection(props: {
  idActive: string;

  activeEnabled: boolean;
  setActiveEnabled: (v: boolean) => void;

  activeTranslateYText: string;
  setActiveTranslateYText: (v: string) => void;
  activeTranslateY: number;

  activeScaleText: string;
  setActiveScaleText: (v: string) => void;
  activeScale: number;

  PALETTE: readonly string[];
  activeBgMode: "same" | "custom" | "gradient";
  setActiveBgMode: (v: "same" | "custom" | "gradient") => void;
  activeBgInput: string;
  setActiveBgInput: (v: string) => void;
  activeBgNorm: { ok: boolean; hex: string; rgb: string };
  activeGradAngleText: string;
  setActiveGradAngleText: (v: string) => void;
  activeGradStartInput: string;
  setActiveGradStartInput: (v: string) => void;
  activeGradStartNorm: { ok: boolean; hex: string; rgb: string };
  activeGradMidEnabled: boolean;
  setActiveGradMidEnabled: (v: boolean) => void;
  activeGradMidInput: string;
  setActiveGradMidInput: (v: string) => void;
  activeGradMidNorm: { ok: boolean; hex: string; rgb: string };
  activeGradEndInput: string;
  setActiveGradEndInput: (v: string) => void;
  activeGradEndNorm: { ok: boolean; hex: string; rgb: string };
  activeTextMode: "same" | "custom";
  setActiveTextMode: (v: "same" | "custom") => void;
  activeTextInput: string;
  setActiveTextInput: (v: string) => void;
  activeTextNorm: { ok: boolean; hex: string; rgb: string };
  activeBorderMode: "same" | "custom";
  setActiveBorderMode: (v: "same" | "custom") => void;
  activeBorderInput: string;
  setActiveBorderInput: (v: string) => void;
  activeBorderNorm: { ok: boolean; hex: string; rgb: string };

  transitionTransformDurationText: string;
  setTransitionTransformDurationText: (v: string) => void;
  transitionTransformMs: number;
  transitionTransformEasing:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear";
  setTransitionTransformEasing: (
    v: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear",
  ) => void;
}) {
  const {
    idActive,
    activeEnabled,
    setActiveEnabled,
    activeTranslateYText,
    setActiveTranslateYText,
    activeTranslateY,
    activeScaleText,
    setActiveScaleText,
    activeScale,
    PALETTE,
    activeBgMode,
    setActiveBgMode,
    activeBgInput,
    setActiveBgInput,
    activeBgNorm,
    activeGradAngleText,
    setActiveGradAngleText,
    activeGradStartInput,
    setActiveGradStartInput,
    activeGradStartNorm,
    activeGradMidEnabled,
    setActiveGradMidEnabled,
    activeGradMidInput,
    setActiveGradMidInput,
    activeGradMidNorm,
    activeGradEndInput,
    setActiveGradEndInput,
    activeGradEndNorm,
    activeTextMode,
    setActiveTextMode,
    activeTextInput,
    setActiveTextInput,
    activeTextNorm,
    activeBorderMode,
    setActiveBorderMode,
    activeBorderInput,
    setActiveBorderInput,
    activeBorderNorm,
    transitionTransformDurationText,
    setTransitionTransformDurationText,
    transitionTransformMs,
    transitionTransformEasing,
    setTransitionTransformEasing,
  } = props;

  return (
    <SectionCard
      title="Active State"
      subtitle="Press feedback, colors, and gradients."
    >
      <div className="space-y-4">
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Tip: Use State Preview to force active, and tune the transform timing
          here.
        </div>
        <div className="inline-flex items-center gap-2">
          <input
            id={idActive}
            type="checkbox"
            checked={activeEnabled}
            onChange={(e) => setActiveEnabled(e.target.checked)}
          />
          <label
            htmlFor={idActive}
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Enable active press effect
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label={`Active translateY (${props.activeTranslateY}px)`}
            value={Number(props.activeTranslateYText) || 0}
            onChange={(v) => props.setActiveTranslateYText(String(v))}
            min={-8}
            max={8}
            step={1}
          />
          <SizeControl
            label={`Active scale (${props.activeScale})`}
            value={Number(props.activeScaleText) || 1}
            onChange={(v) => props.setActiveScaleText(String(v))}
            min={0.8}
            max={1.2}
            step={0.01}
          />
        </div>

        <div className="space-y-3">
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Transform transitions
          </div>
          <SizeControl
            label={`Transform duration (${props.transitionTransformMs}ms)`}
            value={Number(props.transitionTransformDurationText) || 0}
            onChange={(v) =>
              props.setTransitionTransformDurationText(String(v))
            }
            min={0}
            max={2000}
            step={10}
          />
          <Segmented
            value={props.transitionTransformEasing}
            onChange={(v) =>
              props.setTransitionTransformEasing(
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

        <div className="space-y-4">
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Active colors
          </div>

          <div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Active background
            </div>
            <div className="mt-2">
              <Segmented
                value={activeBgMode}
                onChange={(v) =>
                  setActiveBgMode(v as "same" | "custom" | "gradient")
                }
                items={[
                  { value: "same", label: "Same" },
                  { value: "custom", label: "Custom" },
                  { value: "gradient", label: "Gradient" },
                ]}
              />
            </div>

            {activeBgMode === "custom" ? (
              <div className="mt-3">
                <ColorControl
                  label="Active background"
                  palette={PALETTE}
                  value={activeBgInput}
                  onChange={setActiveBgInput}
                />
              </div>
            ) : null}

            {activeBgMode === "gradient" ? (
              <div className="mt-3">
                <GradientControl
                  label="Active Gradient"
                  angle={Number(activeGradAngleText) || 0}
                  setAngle={(v) => setActiveGradAngleText(String(v))}
                  startColor={activeGradStartInput}
                  setStartColor={setActiveGradStartInput}
                  endColor={activeGradEndInput}
                  setEndColor={setActiveGradEndInput}
                  midEnabled={activeGradMidEnabled}
                  setMidEnabled={setActiveGradMidEnabled}
                  midColor={activeGradMidInput}
                  setMidColor={setActiveGradMidInput}
                  palette={PALETTE}
                />
              </div>
            ) : null}
          </div>

          <div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Active text
            </div>
            <div className="mt-2">
              <Segmented
                value={activeTextMode}
                onChange={(v) => setActiveTextMode(v as "same" | "custom")}
                items={[
                  { value: "same", label: "Same" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            </div>
            {activeTextMode === "custom" ? (
              <div className="mt-3">
                <ColorControl
                  label="Active text"
                  palette={PALETTE}
                  value={activeTextInput}
                  onChange={setActiveTextInput}
                />
              </div>
            ) : null}
          </div>

          <div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Active border
            </div>
            <div className="mt-2">
              <Segmented
                value={activeBorderMode}
                onChange={(v) => setActiveBorderMode(v as "same" | "custom")}
                items={[
                  { value: "same", label: "Same" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            </div>
            {activeBorderMode === "custom" ? (
              <div className="mt-3">
                <ColorControl
                  label="Active border"
                  palette={PALETTE}
                  value={activeBorderInput}
                  onChange={setActiveBorderInput}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
