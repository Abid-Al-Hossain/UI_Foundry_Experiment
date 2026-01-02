"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

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
  transitionTransformEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  setTransitionTransformEasing: (v: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear") => void;
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
    <SectionCard title="Active State" subtitle="Press feedback, colors, and gradients.">
      <div className="space-y-4">
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Tip: Use State Preview to force active, and tune the transform timing here.
        </div>
        <div className="inline-flex items-center gap-2">
          <input
            id={idActive}
            type="checkbox"
            checked={activeEnabled}
            onChange={(e) => setActiveEnabled(e.target.checked)}
          />
          <label htmlFor={idActive} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
            Enable active press effect
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label={`Active translateY (${activeTranslateY}px)`}
            valueText={activeTranslateYText}
            setValueText={setActiveTranslateYText}
            min={-8}
            max={8}
          />
          <SizeControl
            label={`Active scale (${activeScale})`}
            valueText={activeScaleText}
            setValueText={setActiveScaleText}
            min={0.8}
            max={1.2}
            step={0.01}
          />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Transform transitions
          </div>
          <SizeControl
            label={`Transform duration (${transitionTransformMs}ms)`}
            valueText={transitionTransformDurationText}
            setValueText={setTransitionTransformDurationText}
            min={0}
            max={2000}
            step={10}
          />
          <Segmented
            value={transitionTransformEasing}
            onChange={(v) => setTransitionTransformEasing(v as "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear")}
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
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Active colors
          </div>

          <div>
            <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
              Active background
            </div>
            <div className="mt-2">
              <Segmented
                value={activeBgMode}
                onChange={(v) => setActiveBgMode(v as "same" | "custom" | "gradient")}
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
                  title="Active background"
                  palette={PALETTE}
                  valueText={activeBgInput}
                  setValueText={setActiveBgInput}
                  normalizedHex={activeBgNorm.hex}
                  normalizedRgb={activeBgNorm.rgb}
                  ok={activeBgNorm.ok}
                />
              </div>
            ) : null}

            {activeBgMode === "gradient" ? (
              <div className="mt-3 space-y-4">
                <SizeControl
                  label="Active gradient angle (deg)"
                  valueText={activeGradAngleText}
                  setValueText={setActiveGradAngleText}
                  min={0}
                  max={360}
                />

                <ColorControl
                  title="Active gradient start"
                  palette={PALETTE}
                  valueText={activeGradStartInput}
                  setValueText={setActiveGradStartInput}
                  normalizedHex={activeGradStartNorm.hex}
                  normalizedRgb={activeGradStartNorm.rgb}
                  ok={activeGradStartNorm.ok}
                />

                <div className="flex items-center gap-2">
                  <input
                    id="active-grad-mid-toggle"
                    type="checkbox"
                    checked={activeGradMidEnabled}
                    onChange={(e) => setActiveGradMidEnabled(e.target.checked)}
                    className="uf-clickable"
                  />
                  <label htmlFor="active-grad-mid-toggle" className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
                    Use middle stop
                  </label>
                </div>

                {activeGradMidEnabled ? (
                  <ColorControl
                    title="Active gradient middle"
                    palette={PALETTE}
                    valueText={activeGradMidInput}
                    setValueText={setActiveGradMidInput}
                    normalizedHex={activeGradMidNorm.hex}
                    normalizedRgb={activeGradMidNorm.rgb}
                    ok={activeGradMidNorm.ok}
                  />
                ) : null}

                <ColorControl
                  title="Active gradient end"
                  palette={PALETTE}
                  valueText={activeGradEndInput}
                  setValueText={setActiveGradEndInput}
                  normalizedHex={activeGradEndNorm.hex}
                  normalizedRgb={activeGradEndNorm.rgb}
                  ok={activeGradEndNorm.ok}
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
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
                  title="Active text"
                  palette={PALETTE}
                  valueText={activeTextInput}
                  setValueText={setActiveTextInput}
                  normalizedHex={activeTextNorm.hex}
                  normalizedRgb={activeTextNorm.rgb}
                  ok={activeTextNorm.ok}
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
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
                  title="Active border"
                  palette={PALETTE}
                  valueText={activeBorderInput}
                  setValueText={setActiveBorderInput}
                  normalizedHex={activeBorderNorm.hex}
                  normalizedRgb={activeBorderNorm.rgb}
                  ok={activeBorderNorm.ok}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
