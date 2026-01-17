"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";

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

  lightDirection:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "custom";
  setLightDirection: (
    v: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom",
  ) => void;
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
  setMaterialPreset: (
    v: "custom" | "plastic" | "matte" | "metal" | "glass",
  ) => void;
  onApplyMaterialPreset: (
    v: "custom" | "plastic" | "matte" | "metal" | "glass",
  ) => void;

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
      <ShadowLayerControl
        label="Main Shadow"
        enabled={props.shadowEnabled}
        setEnabled={props.setShadowEnabled}
        x={Number(props.shXText) || 0}
        setX={(v) => props.setShXText(String(v))}
        y={Number(props.shYText) || 0}
        setY={(v) => props.setShYText(String(v))}
        blur={Number(props.shBlurText) || 0}
        setBlur={(v) => props.setShBlurText(String(v))}
        spread={Number(props.shSpreadText) || 0}
        setSpread={(v) => props.setShSpreadText(String(v))}
        opacity={Number(props.shOpacityText) || 0}
        setOpacity={(v) => props.setShOpacityText(String(v))}
        palette={props.PALETTE}
        color={props.shColorInput}
        setColor={props.setShColorInput}
      />

      <div className="mt-4 space-y-2">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Shadow temperature
        </div>
        <Segmented
          value={props.shadowTemp}
          onChange={(v) =>
            props.setShadowTemp(v as "neutral" | "warm" | "cool")
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
            value={props.materialPreset}
            onChange={(v) =>
              props.onApplyMaterialPreset(
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
            value={props.elevationPreset}
            onChange={(v) =>
              props.onApplyElevationPreset(
                v as "flat" | "raised" | "lifted" | "inset",
              )
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
          label={`Depth (z-height, ${props.depthPx}px)`}
          value={Number(props.depthText) || 0}
          onChange={(v) => props.setDepthText(String(v))}
          min={0}
          max={40}
          step={1}
        />

        <SizeControl
          label="Edge thickness (px)"
          value={Number(props.edgeThicknessText) || 0}
          onChange={(v) => props.setEdgeThicknessText(String(v))}
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
            onChange={(v) =>
              props.setLightDirection(
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
          {props.lightDirection === "custom" ? (
            <SizeControl
              label="Light angle (deg)"
              value={Number(props.lightAngleText) || 0}
              onChange={(v) => props.setLightAngleText(String(v))}
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
              checked={props.edgeGradientEnabled}
              onChange={(e) => props.setEdgeGradientEnabled(e.target.checked)}
              className="uf-clickable"
            />
            3D border gradient
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Gradient size (px)"
              value={Number(props.edgeGradientSizeText) || 0}
              onChange={(v) => props.setEdgeGradientSizeText(String(v))}
              min={0}
              max={12}
              step={1}
            />
            <SizeControl
              label="Gradient strength (0-1)"
              value={Number(props.edgeGradientStrengthText) || 0}
              onChange={(v) => props.setEdgeGradientStrengthText(String(v))}
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
              checked={props.topGradientEnabled}
              onChange={(e) => props.setTopGradientEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Top surface gradient
          </label>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <SizeControl
                label="Angle (deg)"
                value={Number(props.topGradAngleText) || 0}
                onChange={(v) => props.setTopGradAngleText(String(v))}
                min={0}
                max={360}
                step={1}
              />
              <SizeControl
                label="Opacity (0-1)"
                value={Number(props.topGradOpacityText) || 0}
                onChange={(v) => props.setTopGradOpacityText(String(v))}
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <ColorControl
              label="Top gradient start"
              palette={props.PALETTE}
              value={props.topGradStartInput}
              onChange={props.setTopGradStartInput}
            />
            <label
              className="flex items-center gap-2 text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
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
                label="Top gradient middle"
                palette={props.PALETTE}
                value={props.topGradMidInput}
                onChange={props.setTopGradMidInput}
              />
            ) : null}
            <ColorControl
              label="Top gradient end"
              palette={props.PALETTE}
              value={props.topGradEndInput}
              onChange={props.setTopGradEndInput}
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
              checked={props.parallaxHighlightEnabled}
              onChange={(e) =>
                props.setParallaxHighlightEnabled(e.target.checked)
              }
              className="uf-clickable"
            />
            Parallax highlight
          </label>
          <div className="mt-3">
            <SizeControl
              label="Parallax strength (0-1)"
              value={Number(props.parallaxStrengthText) || 0}
              onChange={(v) => props.setParallaxStrengthText(String(v))}
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
              checked={props.rimLightEnabled}
              onChange={(e) => props.setRimLightEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Rim light
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Glow size (px)"
              value={Number(props.rimLightSizeText) || 0}
              onChange={(v) => props.setRimLightSizeText(String(v))}
              min={0}
              max={30}
              step={1}
            />
            <SizeControl
              label="Glow opacity (0-1)"
              value={Number(props.rimLightOpacityText) || 0}
              onChange={(v) => props.setRimLightOpacityText(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
          <div className="mt-3">
            <ColorControl
              label="Rim light color"
              palette={props.PALETTE}
              value={props.rimLightColorInput}
              onChange={props.setRimLightColorInput}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Border depth
          </div>
          <Segmented
            value={props.borderDepthMode}
            onChange={(v) =>
              props.setBorderDepthMode(v as "none" | "raised" | "inset")
            }
            items={[
              { value: "none", label: "None" },
              { value: "raised", label: "Raised" },
              { value: "inset", label: "Inset" },
            ]}
          />
          <SizeControl
            label="Border depth (px)"
            value={Number(props.borderDepthSizeText) || 0}
            onChange={(v) => props.setBorderDepthSizeText(String(v))}
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
              checked={props.baseShadowEnabled}
              onChange={(e) => props.setBaseShadowEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Bottom edge shadow
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Base size (px)"
              value={Number(props.baseShadowSizeText) || 0}
              onChange={(v) => props.setBaseShadowSizeText(String(v))}
              min={0}
              max={30}
              step={1}
            />
            <SizeControl
              label="Base opacity (0-1)"
              value={Number(props.baseShadowOpacityText) || 0}
              onChange={(v) => props.setBaseShadowOpacityText(String(v))}
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
                palette={props.PALETTE}
                color={props.shColorInput}
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
            checked={props.innerShadowEnabled}
            onChange={(e) => props.setInnerShadowEnabled(e.target.checked)}
            className="uf-clickable"
          />
          Inner shadow (pressed feel)
        </label>

        <SizeControl
          label="Ambient occlusion strength (0-1)"
          value={Number(props.aoStrengthText) || 0}
          onChange={(v) => props.setAoStrengthText(String(v))}
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
              checked={props.glossEnabled}
              onChange={(e) => props.setGlossEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Highlight / gloss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Gloss size (px)"
              value={Number(props.glossSizeText) || 0}
              onChange={(v) => props.setGlossSizeText(String(v))}
              min={0}
              max={40}
              step={1}
            />
            <SizeControl
              label="Gloss opacity (0-1)"
              value={Number(props.glossOpacityText) || 0}
              onChange={(v) => props.setGlossOpacityText(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
            <SizeControl
              label="Specular strength (0-1)"
              value={Number(props.specularStrengthText) || 0}
              onChange={(v) => props.setSpecularStrengthText(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
            <SizeControl
              label="Surface roughness (0-1)"
              value={Number(props.roughnessText) || 0}
              onChange={(v) => props.setRoughnessText(String(v))}
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
              checked={props.bevelEnabled}
              onChange={(e) => props.setBevelEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Bevel / emboss
          </label>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Bevel size (px)"
              value={parseInt(props.bevelSizeText) || 0}
              onChange={(v) => props.setBevelSizeText(String(v))}
              min={0}
              max={24}
              step={1}
            />
            <SizeControl
              label="Softness (px)"
              value={parseInt(props.bevelSoftnessText) || 0}
              onChange={(v) => props.setBevelSoftnessText(String(v))}
              min={0}
              max={24}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Icon embossing
          </div>
          <Segmented
            value={props.iconEmbossMode}
            onChange={(v) =>
              props.setIconEmbossMode(v as "off" | "raised" | "inset")
            }
            items={[
              { value: "off", label: "Off" },
              { value: "raised", label: "Raised" },
              { value: "inset", label: "Inset" },
            ]}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Emboss depth (px)"
              value={parseInt(props.iconEmbossDepthText) || 0}
              onChange={(v) => props.setIconEmbossDepthText(String(v))}
              min={0}
              max={8}
              step={1}
            />
            <SizeControl
              label="Emboss strength (0-1)"
              value={parseFloat(props.iconEmbossStrengthText) || 0}
              onChange={(v) => props.setIconEmbossStrengthText(String(v))}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Interaction depth
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Hover lift (px)"
              value={parseInt(props.hoverLiftText) || 0}
              onChange={(v) => props.setHoverLiftText(String(v))}
              min={0}
              max={24}
              step={1}
            />
            <SizeControl
              label="Pressed depth (px)"
              value={parseInt(props.pressedDepthText) || 0}
              onChange={(v) => props.setPressedDepthText(String(v))}
              min={0}
              max={30}
              step={1}
            />
          </div>
          <label
            className="flex items-center gap-2 text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            <input
              type="checkbox"
              checked={props.pressedInsetEnabled}
              onChange={(e) => props.setPressedInsetEnabled(e.target.checked)}
              className="uf-clickable"
            />
            Swap to inset shadow on active
          </label>
        </div>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          }}
        >
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Perspective tilt (hover)
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Tilt X (deg)"
              value={parseInt(props.hoverTiltXText) || 0}
              onChange={(v) => props.setHoverTiltXText(String(v))}
              min={-20}
              max={20}
              step={1}
            />
            <SizeControl
              label="Tilt Y (deg)"
              value={parseInt(props.hoverTiltYText) || 0}
              onChange={(v) => props.setHoverTiltYText(String(v))}
              min={-20}
              max={20}
              step={1}
            />
            <SizeControl
              label="Perspective (px)"
              value={parseInt(props.hoverPerspectiveText) || 200}
              onChange={(v) => props.setHoverPerspectiveText(String(v))}
              min={200}
              max={2000}
              step={10}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
