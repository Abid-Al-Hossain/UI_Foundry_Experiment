"use client";

import React, { useCallback } from "react";
import { SectionCard, Segmented } from "./ui";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { ActionButtonState, ActionButtonFieldSetter } from "../types";
import { PALETTE } from "../_data/buttonConstants";

interface ShadowSectionProps {
  state: ActionButtonState;
  setKey: ActionButtonFieldSetter;
  updateState: (fn: (prev: ActionButtonState) => ActionButtonState) => void;
}

export default function ShadowSection({
  state,
  setKey,
  updateState,
}: ShadowSectionProps) {
  // Computed values
  const depthPx = Number(state.depthText) || 0;

  const applyElevationPreset = useCallback(
    (preset: "flat" | "raised" | "lifted" | "inset") => {
      updateState((s) => {
        const updates: Partial<ActionButtonState> = { elevationPreset: preset };
        if (preset === "flat") {
          updates.shadowEnabled = false;
          updates.depthText = "0";
          updates.shadowStackEnabled = false;
          updates.innerShadowEnabled = false;
          updates.glossEnabled = false;
          updates.bevelEnabled = false;
        } else if (preset === "raised") {
          updates.shadowEnabled = true;
          updates.depthText = "6";
          updates.shadowStackEnabled = false;
          updates.innerShadowEnabled = false;
          updates.glossEnabled = true;
          updates.glossSizeText = "6";
          updates.glossOpacityText = "0.2";
          updates.bevelEnabled = true;
          updates.bevelSizeText = "2";
          updates.bevelSoftnessText = "2";
        } else if (preset === "lifted") {
          updates.shadowEnabled = true;
          updates.depthText = "12";
          updates.shadowStackEnabled = false;
          updates.innerShadowEnabled = false;
          updates.glossEnabled = true;
          updates.glossSizeText = "8";
          updates.glossOpacityText = "0.25";
          updates.bevelEnabled = true;
          updates.bevelSizeText = "3";
          updates.bevelSoftnessText = "3";
        } else {
          updates.shadowEnabled = false;
          updates.depthText = "0";
          updates.shadowStackEnabled = false;
          updates.innerShadowEnabled = true;
          updates.glossEnabled = false;
          updates.bevelEnabled = false;
        }
        return { ...s, ...updates };
      });
    },
    [updateState],
  );

  const applyMaterialPreset = useCallback(
    (preset: "custom" | "plastic" | "matte" | "metal" | "glass") => {
      updateState((s) => {
        const updates: Partial<ActionButtonState> = { materialPreset: preset };
        if (preset === "custom") return { ...s, ...updates };

        if (preset === "plastic") {
          updates.glossEnabled = true;
          updates.glossSizeText = "10";
          updates.glossOpacityText = "0.35";
          updates.specularStrengthText = "0.9";
          updates.roughnessText = "0.25";
          updates.bevelEnabled = true;
          updates.bevelSizeText = "3";
          updates.bevelSoftnessText = "3";
          updates.edgeGradientEnabled = true;
          updates.edgeGradientSizeText = "2";
          updates.edgeGradientStrengthText = "0.3";
          updates.aoStrengthText = "0.2";
        } else if (preset === "matte") {
          updates.glossEnabled = false;
          updates.specularStrengthText = "0.2";
          updates.roughnessText = "0.8";
          updates.bevelEnabled = false;
          updates.edgeGradientEnabled = false;
          updates.aoStrengthText = "0.3";
        } else if (preset === "metal") {
          updates.glossEnabled = true;
          updates.glossSizeText = "6";
          updates.glossOpacityText = "0.28";
          updates.specularStrengthText = "1";
          updates.roughnessText = "0.15";
          updates.bevelEnabled = true;
          updates.bevelSizeText = "2";
          updates.bevelSoftnessText = "2";
          updates.edgeGradientEnabled = true;
          updates.edgeGradientSizeText = "2";
          updates.edgeGradientStrengthText = "0.4";
          updates.aoStrengthText = "0.35";
        } else if (preset === "glass") {
          updates.glossEnabled = true;
          updates.glossSizeText = "14";
          updates.glossOpacityText = "0.45";
          updates.specularStrengthText = "1";
          updates.roughnessText = "0.1";
          updates.bevelEnabled = true;
          updates.bevelSizeText = "2";
          updates.bevelSoftnessText = "4";
          updates.edgeGradientEnabled = true;
          updates.edgeGradientSizeText = "1";
          updates.edgeGradientStrengthText = "0.2";
          updates.aoStrengthText = "0.1";
        }
        return { ...s, ...updates };
      });
    },
    [updateState],
  );

  return (
    <SectionCard title="Shadow" subtitle="Box shadow plus 3D depth styling.">
      <ShadowLayerControl
        label="Main Shadow"
        enabled={state.shadowEnabled}
        setEnabled={setKey("shadowEnabled")}
        x={Number(state.shXText) || 0}
        setX={(v) => setKey("shXText")(String(v))}
        y={Number(state.shYText) || 0}
        setY={(v) => setKey("shYText")(String(v))}
        blur={Number(state.shBlurText) || 0}
        setBlur={(v) => setKey("shBlurText")(String(v))}
        spread={Number(state.shSpreadText) || 0}
        setSpread={(v) => setKey("shSpreadText")(String(v))}
        opacity={Number(state.shOpacityText) || 0}
        setOpacity={(v) => setKey("shOpacityText")(String(v))}
        palette={PALETTE}
        color={state.shColorInput}
        setColor={setKey("shColorInput")}
      />

      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Shadow temperature
        </div>
        <Segmented
          value={state.shadowTemp}
          onChange={(v) =>
            setKey("shadowTemp")(v as "neutral" | "warm" | "cool")
          }
          items={[
            { value: "neutral", label: "Neutral" },
            { value: "warm", label: "Warm" },
            { value: "cool", label: "Cool" },
          ]}
        />
      </div>

      <div
        className="mt-6 space-y-5 border-t pt-5"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="text-xs font-semibold"
          style={{ color: "var(--muted)" }}
        >
          3D & Depth
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Surface material
          </div>
          <Segmented
            value={state.materialPreset}
            onChange={(v) =>
              applyMaterialPreset(
                v as "custom" | "plastic" | "matte" | "metal" | "glass",
              )
            }
            items={[
              { value: "custom", label: "Custom" },
              { value: "plastic", label: "Plastic" },
              { value: "matte", label: "Matte" },
              { value: "metal", label: "Metal" },
              { value: "glass", label: "Glass" },
            ]}
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Elevation presets
          </div>
          <Segmented
            value={state.elevationPreset}
            onChange={(v) =>
              applyElevationPreset(v as "flat" | "raised" | "lifted" | "inset")
            }
            items={[
              { value: "flat", label: "Flat" },
              { value: "raised", label: "Raised" },
              { value: "lifted", label: "Lifted" },
              { value: "inset", label: "Inset" },
            ]}
          />
        </div>

        <SizeControl
          label={`Depth (z-height, ${depthPx}px)`}
          value={Number(state.depthText) || 0}
          onChange={(v) => setKey("depthText")(String(v))}
          min={0}
          max={40}
          step={1}
        />

        <SizeControl
          label="Edge thickness (px)"
          value={Number(state.edgeThicknessText) || 0}
          onChange={(v) => setKey("edgeThicknessText")(String(v))}
          min={0}
          max={20}
          step={1}
        />

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Light direction
          </div>
          <Segmented
            value={state.lightDirection}
            onChange={(v) =>
              setKey("lightDirection")(
                v as
                  | "top-left"
                  | "top-right"
                  | "bottom-left"
                  | "bottom-right"
                  | "custom",
              )
            }
            items={[
              { value: "top-left", label: "Top Left" },
              { value: "top-right", label: "Top Right" },
              { value: "bottom-left", label: "Bottom Left" },
              { value: "bottom-right", label: "Bottom Right" },
              { value: "custom", label: "Custom" },
            ]}
          />
          {state.lightDirection === "custom" ? (
            <SizeControl
              label="Light angle (deg)"
              value={Number(state.lightAngleText) || 0}
              onChange={(v) => setKey("lightAngleText")(String(v))}
              min={0}
              max={360}
              step={1}
            />
          ) : null}
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.edgeGradientEnabled}
              onChange={(e) => setKey("edgeGradientEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            3D border gradient
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Gradient size (px)"
              value={Number(state.edgeGradientSizeText) || 0}
              onChange={(v) => setKey("edgeGradientSizeText")(String(v))}
              min={0}
              max={12}
              step={1}
            />
            <SizeControl
              label="Gradient strength (0-1)"
              value={Number(state.edgeGradientStrengthText) || 0}
              onChange={(v) => setKey("edgeGradientStrengthText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.topGradientEnabled}
              onChange={(e) => setKey("topGradientEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            Top surface gradient
          </label>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <SizeControl
                label="Angle (deg)"
                value={Number(state.topGradAngleText) || 0}
                onChange={(v) => setKey("topGradAngleText")(String(v))}
                min={0}
                max={360}
                step={1}
              />
              <SizeControl
                label="Opacity (0-1)"
                value={Number(state.topGradOpacityText) || 0}
                onChange={(v) => setKey("topGradOpacityText")(String(v))}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <ColorControl
              label="Top gradient start"
              palette={PALETTE}
              value={state.topGradStartInput}
              onChange={setKey("topGradStartInput")}
            />
            <label
              className="flex items-center gap-2 text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              <input
                type="checkbox"
                checked={state.topGradMidEnabled}
                onChange={(e) => setKey("topGradMidEnabled")(e.target.checked)}
                className="uf-clickable"
              />
              Mid stop
            </label>
            {state.topGradMidEnabled ? (
              <ColorControl
                label="Top gradient middle"
                palette={PALETTE}
                value={state.topGradMidInput}
                onChange={setKey("topGradMidInput")}
              />
            ) : null}
            <ColorControl
              label="Top gradient end"
              palette={PALETTE}
              value={state.topGradEndInput}
              onChange={setKey("topGradEndInput")}
            />
          </div>
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.parallaxHighlightEnabled}
              onChange={(e) =>
                setKey("parallaxHighlightEnabled")(e.target.checked)
              }
              className="uf-clickable"
            />
            Parallax highlight
          </label>
          <div className="mt-3">
            <SizeControl
              label="Parallax strength (0-1)"
              value={Number(state.parallaxStrengthText) || 0}
              onChange={(v) => setKey("parallaxStrengthText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.rimLightEnabled}
              onChange={(e) => setKey("rimLightEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            Rim light
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Glow size (px)"
              value={Number(state.rimLightSizeText) || 0}
              onChange={(v) => setKey("rimLightSizeText")(String(v))}
              min={0}
              max={30}
              step={1}
            />
            <SizeControl
              label="Glow opacity (0-1)"
              value={Number(state.rimLightOpacityText) || 0}
              onChange={(v) => setKey("rimLightOpacityText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
          <div className="mt-3">
            <ColorControl
              label="Rim light color"
              palette={PALETTE}
              value={state.rimLightColorInput}
              onChange={setKey("rimLightColorInput")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Border depth
          </div>
          <Segmented
            value={state.borderDepthMode}
            onChange={(v) =>
              setKey("borderDepthMode")(v as "none" | "raised" | "inset")
            }
            items={[
              { value: "none", label: "None" },
              { value: "raised", label: "Raised" },
              { value: "inset", label: "Inset" },
            ]}
          />
          <SizeControl
            label="Border depth (px)"
            value={Number(state.borderDepthSizeText) || 0}
            onChange={(v) => setKey("borderDepthSizeText")(String(v))}
            min={0}
            max={8}
            step={1}
          />
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.baseShadowEnabled}
              onChange={(e) => setKey("baseShadowEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            Bottom edge shadow
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Base size (px)"
              value={Number(state.baseShadowSizeText) || 0}
              onChange={(v) => setKey("baseShadowSizeText")(String(v))}
              min={0}
              max={30}
              step={1}
            />
            <SizeControl
              label="Base opacity (0-1)"
              value={Number(state.baseShadowOpacityText) || 0}
              onChange={(v) => setKey("baseShadowOpacityText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        <label
          className="flex items-center gap-2 text-sm uf-clickable"
          style={{ color: "var(--text)" }}
        >
          <input
            type="checkbox"
            checked={state.shadowStackEnabled}
            onChange={(e) => setKey("shadowStackEnabled")(e.target.checked)}
            className="uf-clickable"
          />
          Shadow stack (multiple layers)
        </label>

        {state.shadowStackEnabled ? (
          <div className="space-y-4">
            {[
              {
                label: "Layer 1",
                enabled: state.stack1Enabled,
                setEnabled: setKey("stack1Enabled"),
                xText: state.stack1XText,
                setXText: setKey("stack1XText"),
                yText: state.stack1YText,
                setYText: setKey("stack1YText"),
                blurText: state.stack1BlurText,
                setBlurText: setKey("stack1BlurText"),
                spreadText: state.stack1SpreadText,
                setSpreadText: setKey("stack1SpreadText"),
                opacityText: state.stack1OpacityText,
                setOpacityText: setKey("stack1OpacityText"),
              },
              {
                label: "Layer 2",
                enabled: state.stack2Enabled,
                setEnabled: setKey("stack2Enabled"),
                xText: state.stack2XText,
                setXText: setKey("stack2XText"),
                yText: state.stack2YText,
                setYText: setKey("stack2YText"),
                blurText: state.stack2BlurText,
                setBlurText: setKey("stack2BlurText"),
                spreadText: state.stack2SpreadText,
                setSpreadText: setKey("stack2SpreadText"),
                opacityText: state.stack2OpacityText,
                setOpacityText: setKey("stack2OpacityText"),
              },
              {
                label: "Layer 3",
                enabled: state.stack3Enabled,
                setEnabled: setKey("stack3Enabled"),
                xText: state.stack3XText,
                setXText: setKey("stack3XText"),
                yText: state.stack3YText,
                setYText: setKey("stack3YText"),
                blurText: state.stack3BlurText,
                setBlurText: setKey("stack3BlurText"),
                spreadText: state.stack3SpreadText,
                setSpreadText: setKey("stack3SpreadText"),
                opacityText: state.stack3OpacityText,
                setOpacityText: setKey("stack3OpacityText"),
              },
            ].map((layer) => (
              <ShadowLayerControl
                key={layer.label}
                label={layer.label}
                enabled={layer.enabled}
                setEnabled={layer.setEnabled}
                x={Number(layer.xText) || 0}
                setX={(v) => layer.setXText(String(v))}
                y={Number(layer.yText) || 0}
                setY={(v) => layer.setYText(String(v))}
                blur={Number(layer.blurText) || 0}
                setBlur={(v) => layer.setBlurText(String(v))}
                spread={Number(layer.spreadText) || 0}
                setSpread={(v) => layer.setSpreadText(String(v))}
                opacity={Number(layer.opacityText) || 0}
                setOpacity={(v) => layer.setOpacityText(String(v))}
                palette={PALETTE}
                color={state.shColorInput}
                setColor={() => {}}
              />
            ))}
          </div>
        ) : null}

        <label
          className="flex items-center gap-2 text-sm uf-clickable"
          style={{ color: "var(--text)" }}
        >
          <input
            type="checkbox"
            checked={state.innerShadowEnabled}
            onChange={(e) => setKey("innerShadowEnabled")(e.target.checked)}
            className="uf-clickable"
          />
          Inner shadow (pressed feel)
        </label>

        <SizeControl
          label="Ambient occlusion strength (0-1)"
          value={Number(state.aoStrengthText) || 0}
          onChange={(v) => setKey("aoStrengthText")(String(v))}
          min={0}
          max={1}
          step={0.01}
        />

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.glossEnabled}
              onChange={(e) => setKey("glossEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            Highlight / gloss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Gloss size (px)"
              value={Number(state.glossSizeText) || 0}
              onChange={(v) => setKey("glossSizeText")(String(v))}
              min={0}
              max={40}
              step={1}
            />
            <SizeControl
              label="Gloss opacity (0-1)"
              value={Number(state.glossOpacityText) || 0}
              onChange={(v) => setKey("glossOpacityText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
            <SizeControl
              label="Specular strength (0-1)"
              value={Number(state.specularStrengthText) || 0}
              onChange={(v) => setKey("specularStrengthText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
            <SizeControl
              label="Surface roughness (0-1)"
              value={Number(state.roughnessText) || 0}
              onChange={(v) => setKey("roughnessText")(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={state.bevelEnabled}
              onChange={(e) => setKey("bevelEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            Bevel / emboss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Bevel size (px)"
              value={parseInt(state.bevelSizeText) || 0}
              onChange={(v) => setKey("bevelSizeText")(String(v))}
              min={0}
              max={24}
              step={1}
            />
            <SizeControl
              label="Bevel softness (px)"
              value={parseInt(state.bevelSoftnessText) || 0}
              onChange={(v) => setKey("bevelSoftnessText")(String(v))}
              min={0}
              max={24}
              step={1}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
