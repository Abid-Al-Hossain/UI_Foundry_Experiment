"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

type IconName = "none" | "arrowRight" | "check" | "plus" | "x" | "info" | "star";
type IconPosition = "left" | "right";
type IconSource = "library" | "custom";

export default function IconSection(props: {
  PALETTE: readonly string[];

  iconName: IconName;
  setIconName: (v: IconName) => void;

  iconSource: IconSource;
  setIconSource: (v: IconSource) => void;

  iconCustomSvg: string;
  setIconCustomSvg: (v: string) => void;

  iconPosition: IconPosition;
  setIconPosition: (v: IconPosition) => void;

  iconSizeText: string;
  setIconSizeText: (v: string) => void;
  iconSize: number;

  iconGapText: string;
  setIconGapText: (v: string) => void;
  iconGap: number;

  iconColorMode: "text" | "custom";
  setIconColorMode: (v: "text" | "custom") => void;

  iconColorInput: string;
  setIconColorInput: (v: string) => void;

  iconColorNorm: { ok: boolean; hex: string; rgb: string };
  baseTextHex: string;
}) {
  const {
    PALETTE,
    iconName,
    setIconName,
    iconSource,
    setIconSource,
    iconCustomSvg,
    setIconCustomSvg,
    iconPosition,
    setIconPosition,
    iconSizeText,
    setIconSizeText,
    iconSize,
    iconGapText,
    setIconGapText,
    iconGap,
    iconColorMode,
    setIconColorMode,
    iconColorInput,
    setIconColorInput,
    iconColorNorm,
    baseTextHex,
  } = props;

  const handleSvgUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setIconCustomSvg(text);
    };
    reader.readAsText(file);
  };

  return (
    <SectionCard title="Icon" subtitle="Built-in icons + position + size + color.">
      <div className="space-y-4">
        <LabeledField label="Icon source">
          <Segmented
            value={iconSource}
            onChange={(v) => setIconSource(v as IconSource)}
            items={[
              { value: "library", label: "Library" },
              { value: "custom", label: "Custom SVG" },
            ]}
          />
        </LabeledField>

        {iconSource === "library" ? (
          <LabeledField label="Icon">
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value as IconName)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="arrowRight">Arrow Right</option>
              <option value="check">Check</option>
              <option value="plus">Plus</option>
              <option value="x">X</option>
              <option value="info">Info</option>
              <option value="star">Star</option>
            </select>
          </LabeledField>
        ) : (
          <div className="space-y-3">
            <LabeledField label="Paste SVG">
              <textarea
                value={iconCustomSvg}
                onChange={(e) => setIconCustomSvg(e.target.value)}
                placeholder="<svg ...>...</svg>"
                rows={4}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>

            <LabeledField label="Upload SVG">
              <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={(e) => handleSvgUpload(e.target.files?.[0] ?? null)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>
          </div>
        )}

        {((iconSource === "library" && iconName !== "none") || (iconSource === "custom" && iconCustomSvg.trim())) ? (
          <>
            <LabeledField label="Icon position">
              <Segmented
                value={iconPosition}
                onChange={(v) => setIconPosition(v as IconPosition)}
                items={[
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                ]}
              />
            </LabeledField>

            <div className="grid grid-cols-2 gap-3">
              <SizeControl
                label={`Icon size (${iconSize}px)`}
                valueText={iconSizeText}
                setValueText={setIconSizeText}
                min={10}
                max={40}
              />
              <SizeControl
                label={`Icon gap (${iconGap}px)`}
                valueText={iconGapText}
                setValueText={setIconGapText}
                min={0}
                max={30}
              />
            </div>

            <LabeledField label="Icon color">
              <Segmented
                value={iconColorMode}
                onChange={(v) => setIconColorMode(v as "text" | "custom")}
                items={[
                  { value: "text", label: "Use text color" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            </LabeledField>

            {iconColorMode === "custom" ? (
              <ColorControl
                title="Icon Color"
                palette={PALETTE}
                valueText={iconColorInput}
                setValueText={setIconColorInput}
                normalizedHex={iconColorNorm.ok ? iconColorNorm.hex : baseTextHex}
                normalizedRgb={iconColorNorm.rgb}
                ok={iconColorNorm.ok}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </SectionCard>
  );
}
