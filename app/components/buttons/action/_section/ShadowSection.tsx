"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export default function ShadowSection(props: {
  PALETTE: readonly string[];

  shadowEnabled: boolean;
  setShadowEnabled: (v: boolean) => void;

  shXText: string;
  setShXText: (v: string) => void;

  shYText: string;
  setShYText: (v: string) => void;

  shBlurText: string;
  setShBlurText: (v: string) => void;

  shSpreadText: string;
  setShSpreadText: (v: string) => void;

  shOpacityText: string;
  setShOpacityText: (v: string) => void;

  shColorInput: string;
  setShColorInput: (v: string) => void;

  shColorOk: boolean;
  shColorHex: string;
  shColorRgb: string;

  shadowTemp: "neutral" | "warm" | "cool";
  setShadowTemp: (v: "neutral" | "warm" | "cool") => void;

  elevationPreset: "flat" | "raised" | "lifted" | "inset";
  setElevationPreset: (v: "flat" | "raised" | "lifted" | "inset") => void;
  onApplyElevationPreset: (v: "flat" | "raised" | "lifted" | "inset") => void;

  depthText: string;
  setDepthText: (v: string) => void;
  depthPx: number;

  lightDirection: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom";
  setLightDirection: (v: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom") => void;
  lightAngleText: string;
  setLightAngleText: (v: string) => void;

  shadowStackEnabled: boolean;
  setShadowStackEnabled: (v: boolean) => void;

  stack1Enabled: boolean;
  setStack1Enabled: (v: boolean) => void;
  stack1XText: string;
  setStack1XText: (v: string) => void;
  stack1YText: string;
  setStack1YText: (v: string) => void;
  stack1BlurText: string;
  setStack1BlurText: (v: string) => void;
  stack1SpreadText: string;
  setStack1SpreadText: (v: string) => void;
  stack1OpacityText: string;
  setStack1OpacityText: (v: string) => void;

  stack2Enabled: boolean;
  setStack2Enabled: (v: boolean) => void;
  stack2XText: string;
  setStack2XText: (v: string) => void;
  stack2YText: string;
  setStack2YText: (v: string) => void;
  stack2BlurText: string;
  setStack2BlurText: (v: string) => void;
  stack2SpreadText: string;
  setStack2SpreadText: (v: string) => void;
  stack2OpacityText: string;
  setStack2OpacityText: (v: string) => void;

  stack3Enabled: boolean;
  setStack3Enabled: (v: boolean) => void;
  stack3XText: string;
  setStack3XText: (v: string) => void;
  stack3YText: string;
  setStack3YText: (v: string) => void;
  stack3BlurText: string;
  setStack3BlurText: (v: string) => void;
  stack3SpreadText: string;
  setStack3SpreadText: (v: string) => void;
  stack3OpacityText: string;
  setStack3OpacityText: (v: string) => void;

  innerShadowEnabled: boolean;
  setInnerShadowEnabled: (v: boolean) => void;

  glossEnabled: boolean;
  setGlossEnabled: (v: boolean) => void;
  glossSizeText: string;
  setGlossSizeText: (v: string) => void;
  glossOpacityText: string;
  setGlossOpacityText: (v: string) => void;

  bevelEnabled: boolean;
  setBevelEnabled: (v: boolean) => void;
  bevelSizeText: string;
  setBevelSizeText: (v: string) => void;
  bevelSoftnessText: string;
  setBevelSoftnessText: (v: string) => void;

  materialPreset: "custom" | "plastic" | "matte" | "metal" | "glass";
  setMaterialPreset: (v: "custom" | "plastic" | "matte" | "metal" | "glass") => void;
  onApplyMaterialPreset: (v: "custom" | "plastic" | "matte" | "metal" | "glass") => void;

  edgeThicknessText: string;
  setEdgeThicknessText: (v: string) => void;
  edgeGradientEnabled: boolean;
  setEdgeGradientEnabled: (v: boolean) => void;
  edgeGradientSizeText: string;
  setEdgeGradientSizeText: (v: string) => void;
  edgeGradientStrengthText: string;
  setEdgeGradientStrengthText: (v: string) => void;

  topGradientEnabled: boolean;
  setTopGradientEnabled: (v: boolean) => void;
  topGradAngleText: string;
  setTopGradAngleText: (v: string) => void;
  topGradStartInput: string;
  setTopGradStartInput: (v: string) => void;
  topGradStartNorm: { ok: boolean; hex: string; rgb: string };
  topGradMidEnabled: boolean;
  setTopGradMidEnabled: (v: boolean) => void;
  topGradMidInput: string;
  setTopGradMidInput: (v: string) => void;
  topGradMidNorm: { ok: boolean; hex: string; rgb: string };
  topGradEndInput: string;
  setTopGradEndInput: (v: string) => void;
  topGradEndNorm: { ok: boolean; hex: string; rgb: string };
  topGradOpacityText: string;
  setTopGradOpacityText: (v: string) => void;

  parallaxHighlightEnabled: boolean;
  setParallaxHighlightEnabled: (v: boolean) => void;
  parallaxStrengthText: string;
  setParallaxStrengthText: (v: string) => void;

  rimLightEnabled: boolean;
  setRimLightEnabled: (v: boolean) => void;
  rimLightColorInput: string;
  setRimLightColorInput: (v: string) => void;
  rimLightOk: boolean;
  rimLightHex: string;
  rimLightRgb: string;
  rimLightSizeText: string;
  setRimLightSizeText: (v: string) => void;
  rimLightOpacityText: string;
  setRimLightOpacityText: (v: string) => void;

  iconEmbossMode: "off" | "raised" | "inset";
  setIconEmbossMode: (v: "off" | "raised" | "inset") => void;
  iconEmbossDepthText: string;
  setIconEmbossDepthText: (v: string) => void;
  iconEmbossStrengthText: string;
  setIconEmbossStrengthText: (v: string) => void;

  borderDepthMode: "none" | "raised" | "inset";
  setBorderDepthMode: (v: "none" | "raised" | "inset") => void;
  borderDepthSizeText: string;
  setBorderDepthSizeText: (v: string) => void;

  baseShadowEnabled: boolean;
  setBaseShadowEnabled: (v: boolean) => void;
  baseShadowSizeText: string;
  setBaseShadowSizeText: (v: string) => void;
  baseShadowOpacityText: string;
  setBaseShadowOpacityText: (v: string) => void;

  pressedDepthText: string;
  setPressedDepthText: (v: string) => void;
  pressedInsetEnabled: boolean;
  setPressedInsetEnabled: (v: boolean) => void;

  hoverLiftText: string;
  setHoverLiftText: (v: string) => void;

  specularStrengthText: string;
  setSpecularStrengthText: (v: string) => void;
  roughnessText: string;
  setRoughnessText: (v: string) => void;
  aoStrengthText: string;
  setAoStrengthText: (v: string) => void;

  hoverTiltXText: string;
  setHoverTiltXText: (v: string) => void;
  hoverTiltYText: string;
  setHoverTiltYText: (v: string) => void;
  hoverPerspectiveText: string;
  setHoverPerspectiveText: (v: string) => void;
}) {
  return (
    <SectionCard title="Shadow" subtitle="Box shadow plus 3D depth styling.">
      <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
        <input
          type="checkbox"
          checked={props.shadowEnabled}
          onChange={(e) => props.setShadowEnabled(e.target.checked)}
          className="uf-clickable"
        />
        Enable shadow
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SizeControl label="X offset (px)" valueText={props.shXText} setValueText={props.setShXText} min={-50} max={50} step={1} />
        <SizeControl label="Y offset (px)" valueText={props.shYText} setValueText={props.setShYText} min={-50} max={50} step={1} />
        <SizeControl label="Blur (px)" valueText={props.shBlurText} setValueText={props.setShBlurText} min={0} max={120} step={1} />
        <SizeControl label="Spread (px)" valueText={props.shSpreadText} setValueText={props.setShSpreadText} min={-40} max={40} step={1} />
        <SizeControl label="Opacity (0-1)" valueText={props.shOpacityText} setValueText={props.setShOpacityText} min={0} max={1} step={0.01} />
      </div>

      <div className="mt-4">
        <ColorControl
          title="Shadow color"
          palette={props.PALETTE}
          valueText={props.shColorInput}
          setValueText={props.setShColorInput}
          normalizedHex={props.shColorHex}
          normalizedRgb={props.shColorRgb}
          ok={props.shColorOk}
        />
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Shadow temperature
        </div>
        <Segmented
          value={props.shadowTemp}
          onChange={(v) => props.setShadowTemp(v as "neutral" | "warm" | "cool")}
          items={[
            { value: "neutral", label: "Neutral" },
            { value: "warm", label: "Warm" },
            { value: "cool", label: "Cool" },
          ]}
        />
      </div>

      <div className="mt-6 space-y-5 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
          3D & Depth
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Surface material
          </div>
          <Segmented
            value={props.materialPreset}
            onChange={(v) => props.onApplyMaterialPreset(v as "custom" | "plastic" | "matte" | "metal" | "glass")}
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
            value={props.elevationPreset}
            onChange={(v) => props.onApplyElevationPreset(v as "flat" | "raised" | "lifted" | "inset")}
            items={[
              { value: "flat", label: "Flat" },
              { value: "raised", label: "Raised" },
              { value: "lifted", label: "Lifted" },
              { value: "inset", label: "Inset" },
            ]}
          />
        </div>

        <SizeControl
          label={`Depth (z-height, ${props.depthPx}px)`}
          valueText={props.depthText}
          setValueText={props.setDepthText}
          min={0}
          max={40}
          step={1}
        />

        <SizeControl
          label="Edge thickness (px)"
          valueText={props.edgeThicknessText}
          setValueText={props.setEdgeThicknessText}
          min={0}
          max={20}
          step={1}
        />

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Light direction
          </div>
          <Segmented
            value={props.lightDirection}
            onChange={(v) => props.setLightDirection(v as "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom")}
            items={[
              { value: "top-left", label: "Top Left" },
              { value: "top-right", label: "Top Right" },
              { value: "bottom-left", label: "Bottom Left" },
              { value: "bottom-right", label: "Bottom Right" },
              { value: "custom", label: "Custom" },
            ]}
          />
          {props.lightDirection === "custom" ? (
            <SizeControl
              label="Light angle (deg)"
              valueText={props.lightAngleText}
              setValueText={props.setLightAngleText}
              min={0}
              max={360}
              step={1}
            />
          ) : null}
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.edgeGradientEnabled}
              onChange={(e) => props.setEdgeGradientEnabled(e.target.checked)}
              className="uf-clickable"
            />
            3D border gradient
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Gradient size (px)" valueText={props.edgeGradientSizeText} setValueText={props.setEdgeGradientSizeText} min={0} max={12} step={1} />
            <SizeControl label="Gradient strength (0-1)" valueText={props.edgeGradientStrengthText} setValueText={props.setEdgeGradientStrengthText} min={0} max={1} step={0.01} />
          </div>
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.topGradientEnabled}
              onChange={(e) => props.setTopGradientEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Top surface gradient
          </label>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <SizeControl label="Angle (deg)" valueText={props.topGradAngleText} setValueText={props.setTopGradAngleText} min={0} max={360} step={1} />
              <SizeControl label="Opacity (0-1)" valueText={props.topGradOpacityText} setValueText={props.setTopGradOpacityText} min={0} max={1} step={0.01} />
            </div>
            <ColorControl
              title="Top gradient start"
              palette={props.PALETTE}
              valueText={props.topGradStartInput}
              setValueText={props.setTopGradStartInput}
              normalizedHex={props.topGradStartNorm.hex}
              normalizedRgb={props.topGradStartNorm.rgb}
              ok={props.topGradStartNorm.ok}
            />
            <label className="flex items-center gap-2 text-xs uf-clickable" style={{ color: "var(--muted)" }}>
              <input
                type="checkbox"
                checked={props.topGradMidEnabled}
                onChange={(e) => props.setTopGradMidEnabled(e.target.checked)}
                className="uf-clickable"
              />
              Mid stop
            </label>
            {props.topGradMidEnabled ? (
              <ColorControl
                title="Top gradient middle"
                palette={props.PALETTE}
                valueText={props.topGradMidInput}
                setValueText={props.setTopGradMidInput}
                normalizedHex={props.topGradMidNorm.hex}
                normalizedRgb={props.topGradMidNorm.rgb}
                ok={props.topGradMidNorm.ok}
              />
            ) : null}
            <ColorControl
              title="Top gradient end"
              palette={props.PALETTE}
              valueText={props.topGradEndInput}
              setValueText={props.setTopGradEndInput}
              normalizedHex={props.topGradEndNorm.hex}
              normalizedRgb={props.topGradEndNorm.rgb}
              ok={props.topGradEndNorm.ok}
            />
          </div>
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.parallaxHighlightEnabled}
              onChange={(e) => props.setParallaxHighlightEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Parallax highlight
          </label>
          <div className="mt-3">
            <SizeControl label="Parallax strength (0-1)" valueText={props.parallaxStrengthText} setValueText={props.setParallaxStrengthText} min={0} max={1} step={0.01} />
          </div>
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.rimLightEnabled}
              onChange={(e) => props.setRimLightEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Rim light
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Glow size (px)" valueText={props.rimLightSizeText} setValueText={props.setRimLightSizeText} min={0} max={30} step={1} />
            <SizeControl label="Glow opacity (0-1)" valueText={props.rimLightOpacityText} setValueText={props.setRimLightOpacityText} min={0} max={1} step={0.01} />
          </div>
          <div className="mt-3">
            <ColorControl
              title="Rim light color"
              palette={props.PALETTE}
              valueText={props.rimLightColorInput}
              setValueText={props.setRimLightColorInput}
              normalizedHex={props.rimLightHex}
              normalizedRgb={props.rimLightRgb}
              ok={props.rimLightOk}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Border depth
          </div>
          <Segmented
            value={props.borderDepthMode}
            onChange={(v) => props.setBorderDepthMode(v as "none" | "raised" | "inset")}
            items={[
              { value: "none", label: "None" },
              { value: "raised", label: "Raised" },
              { value: "inset", label: "Inset" },
            ]}
          />
          <SizeControl label="Border depth (px)" valueText={props.borderDepthSizeText} setValueText={props.setBorderDepthSizeText} min={0} max={8} step={1} />
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.baseShadowEnabled}
              onChange={(e) => props.setBaseShadowEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Bottom edge shadow
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Base size (px)" valueText={props.baseShadowSizeText} setValueText={props.setBaseShadowSizeText} min={0} max={30} step={1} />
            <SizeControl label="Base opacity (0-1)" valueText={props.baseShadowOpacityText} setValueText={props.setBaseShadowOpacityText} min={0} max={1} step={0.01} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.shadowStackEnabled}
            onChange={(e) => props.setShadowStackEnabled(e.target.checked)}
            className="uf-clickable"
          />
          Shadow stack (multiple layers)
        </label>

        {props.shadowStackEnabled ? (
          <div className="space-y-4">
            {[
              {
                label: "Layer 1",
                enabled: props.stack1Enabled,
                setEnabled: props.setStack1Enabled,
                xText: props.stack1XText,
                setXText: props.setStack1XText,
                yText: props.stack1YText,
                setYText: props.setStack1YText,
                blurText: props.stack1BlurText,
                setBlurText: props.setStack1BlurText,
                spreadText: props.stack1SpreadText,
                setSpreadText: props.setStack1SpreadText,
                opacityText: props.stack1OpacityText,
                setOpacityText: props.setStack1OpacityText,
              },
              {
                label: "Layer 2",
                enabled: props.stack2Enabled,
                setEnabled: props.setStack2Enabled,
                xText: props.stack2XText,
                setXText: props.setStack2XText,
                yText: props.stack2YText,
                setYText: props.setStack2YText,
                blurText: props.stack2BlurText,
                setBlurText: props.setStack2BlurText,
                spreadText: props.stack2SpreadText,
                setSpreadText: props.setStack2SpreadText,
                opacityText: props.stack2OpacityText,
                setOpacityText: props.setStack2OpacityText,
              },
              {
                label: "Layer 3",
                enabled: props.stack3Enabled,
                setEnabled: props.setStack3Enabled,
                xText: props.stack3XText,
                setXText: props.setStack3XText,
                yText: props.stack3YText,
                setYText: props.setStack3YText,
                blurText: props.stack3BlurText,
                setBlurText: props.setStack3BlurText,
                spreadText: props.stack3SpreadText,
                setSpreadText: props.setStack3SpreadText,
                opacityText: props.stack3OpacityText,
                setOpacityText: props.setStack3OpacityText,
              },
            ].map((layer) => (
              <div
                key={layer.label}
                className="rounded-xl border p-3"
                style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {layer.label}
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs uf-clickable" style={{ color: "var(--muted)" }}>
                    <input
                      type="checkbox"
                      checked={layer.enabled}
                      onChange={(e) => layer.setEnabled(e.target.checked)}
                      className="uf-clickable"
                    />
                    Enabled
                  </label>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <SizeControl label="X offset (px)" valueText={layer.xText} setValueText={layer.setXText} min={-60} max={60} step={1} />
                  <SizeControl label="Y offset (px)" valueText={layer.yText} setValueText={layer.setYText} min={-60} max={60} step={1} />
                  <SizeControl label="Blur (px)" valueText={layer.blurText} setValueText={layer.setBlurText} min={0} max={120} step={1} />
                  <SizeControl label="Spread (px)" valueText={layer.spreadText} setValueText={layer.setSpreadText} min={-40} max={40} step={1} />
                  <SizeControl label="Opacity (0-1)" valueText={layer.opacityText} setValueText={layer.setOpacityText} min={0} max={1} step={0.01} />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.innerShadowEnabled}
            onChange={(e) => props.setInnerShadowEnabled(e.target.checked)}
            className="uf-clickable"
          />
          Inner shadow (pressed feel)
        </label>

        <SizeControl
          label="Ambient occlusion strength (0-1)"
          valueText={props.aoStrengthText}
          setValueText={props.setAoStrengthText}
          min={0}
          max={1}
          step={0.01}
        />

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.glossEnabled}
              onChange={(e) => props.setGlossEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Highlight / gloss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Gloss size (px)" valueText={props.glossSizeText} setValueText={props.setGlossSizeText} min={0} max={40} step={1} />
            <SizeControl label="Gloss opacity (0-1)" valueText={props.glossOpacityText} setValueText={props.setGlossOpacityText} min={0} max={1} step={0.01} />
            <SizeControl label="Specular strength (0-1)" valueText={props.specularStrengthText} setValueText={props.setSpecularStrengthText} min={0} max={1} step={0.01} />
            <SizeControl label="Surface roughness (0-1)" valueText={props.roughnessText} setValueText={props.setRoughnessText} min={0} max={1} step={0.01} />
          </div>
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.bevelEnabled}
              onChange={(e) => props.setBevelEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Bevel / emboss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Bevel size (px)" valueText={props.bevelSizeText} setValueText={props.setBevelSizeText} min={0} max={24} step={1} />
            <SizeControl label="Softness (px)" valueText={props.bevelSoftnessText} setValueText={props.setBevelSoftnessText} min={0} max={24} step={1} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Icon embossing
          </div>
          <Segmented
            value={props.iconEmbossMode}
            onChange={(v) => props.setIconEmbossMode(v as "off" | "raised" | "inset")}
            items={[
              { value: "off", label: "Off" },
              { value: "raised", label: "Raised" },
              { value: "inset", label: "Inset" },
            ]}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl label="Emboss depth (px)" valueText={props.iconEmbossDepthText} setValueText={props.setIconEmbossDepthText} min={0} max={8} step={1} />
            <SizeControl label="Emboss strength (0-1)" valueText={props.iconEmbossStrengthText} setValueText={props.setIconEmbossStrengthText} min={0} max={1} step={0.01} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Interaction depth
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl label="Hover lift (px)" valueText={props.hoverLiftText} setValueText={props.setHoverLiftText} min={0} max={24} step={1} />
            <SizeControl label="Pressed depth (px)" valueText={props.pressedDepthText} setValueText={props.setPressedDepthText} min={0} max={30} step={1} />
          </div>
          <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={props.pressedInsetEnabled}
              onChange={(e) => props.setPressedInsetEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Swap to inset shadow on active
          </label>
        </div>

        <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 70%, transparent)" }}>
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Perspective tilt (hover)
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl label="Tilt X (deg)" valueText={props.hoverTiltXText} setValueText={props.setHoverTiltXText} min={-20} max={20} step={1} />
            <SizeControl label="Tilt Y (deg)" valueText={props.hoverTiltYText} setValueText={props.setHoverTiltYText} min={-20} max={20} step={1} />
            <SizeControl label="Perspective (px)" valueText={props.hoverPerspectiveText} setValueText={props.setHoverPerspectiveText} min={200} max={2000} step={10} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
