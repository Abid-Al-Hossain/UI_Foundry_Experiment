"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export type IconName = "none" | "arrowRight" | "check" | "plus" | "x" | "info" | "star";
type IconPosition = "left" | "right";
export type IconSource = "library" | "custom";

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

  hoverIconEnabled: boolean;
  setHoverIconEnabled: (v: boolean) => void;
  hoverIconSource: IconSource;
  setHoverIconSource: (v: IconSource) => void;
  hoverIconName: IconName;
  setHoverIconName: (v: IconName) => void;
  hoverIconCustomSvg: string;
  setHoverIconCustomSvg: (v: string) => void;

  activeIconEnabled: boolean;
  setActiveIconEnabled: (v: boolean) => void;
  activeIconSource: IconSource;
  setActiveIconSource: (v: IconSource) => void;
  activeIconName: IconName;
  setActiveIconName: (v: IconName) => void;
  activeIconCustomSvg: string;
  setActiveIconCustomSvg: (v: string) => void;

  loadingIconEnabled: boolean;
  setLoadingIconEnabled: (v: boolean) => void;
  loadingIconSource: IconSource;
  setLoadingIconSource: (v: IconSource) => void;
  loadingIconName: IconName;
  setLoadingIconName: (v: IconName) => void;
  loadingIconCustomSvg: string;
  setLoadingIconCustomSvg: (v: string) => void;
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
    hoverIconEnabled,
    setHoverIconEnabled,
    hoverIconSource,
    setHoverIconSource,
    hoverIconName,
    setHoverIconName,
    hoverIconCustomSvg,
    setHoverIconCustomSvg,
    activeIconEnabled,
    setActiveIconEnabled,
    activeIconSource,
    setActiveIconSource,
    activeIconName,
    setActiveIconName,
    activeIconCustomSvg,
    setActiveIconCustomSvg,
    loadingIconEnabled,
    setLoadingIconEnabled,
    loadingIconSource,
    setLoadingIconSource,
    loadingIconName,
    setLoadingIconName,
    loadingIconCustomSvg,
    setLoadingIconCustomSvg,
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

  const handleStateSvgUpload = (file: File | null, setter: (v: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setter(text);
    };
    reader.readAsText(file);
  };

  const renderStateOverride = (
    label: string,
    enabled: boolean,
    setEnabled: (v: boolean) => void,
    source: IconSource,
    setSource: (v: IconSource) => void,
    name: IconName,
    setName: (v: IconName) => void,
    customSvg: string,
    setCustomSvg: (v: string) => void,
    note?: string
  ) => (
    <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
      <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="uf-clickable"
          aria-label={`${label} icon override`}
        />
        {label} icon override
      </label>
      {note ? (
        <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          {note}
        </div>
      ) : null}

      {enabled ? (
        <div className="mt-3 space-y-3">
          <LabeledField label="Icon source">
            <Segmented
              value={source}
              onChange={(v) => setSource(v as IconSource)}
              items={[
                { value: "library", label: "Library" },
                { value: "custom", label: "Custom SVG" },
              ]}
            />
          </LabeledField>

          {source === "library" ? (
            <LabeledField label="Icon">
              <select
                value={name}
                onChange={(e) => setName(e.target.value as IconName)}
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
                  value={customSvg}
                  onChange={(e) => setCustomSvg(e.target.value)}
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
                  onChange={(e) => handleStateSvgUpload(e.target.files?.[0] ?? null, setCustomSvg)}
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
        </div>
      ) : null}
    </div>
  );

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

        <div className="space-y-3">
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            State overrides
          </div>
          {renderStateOverride(
            "Hover",
            hoverIconEnabled,
            setHoverIconEnabled,
            hoverIconSource,
            setHoverIconSource,
            hoverIconName,
            setHoverIconName,
            hoverIconCustomSvg,
            setHoverIconCustomSvg,
          )}
          {renderStateOverride(
            "Active",
            activeIconEnabled,
            setActiveIconEnabled,
            activeIconSource,
            setActiveIconSource,
            activeIconName,
            setActiveIconName,
            activeIconCustomSvg,
            setActiveIconCustomSvg,
          )}
          {renderStateOverride(
            "Loading",
            loadingIconEnabled,
            setLoadingIconEnabled,
            loadingIconSource,
            setLoadingIconSource,
            loadingIconName,
            setLoadingIconName,
            loadingIconCustomSvg,
            setLoadingIconCustomSvg,
            "Overrides the spinner when enabled."
          )}
        </div>
      </div>
    </SectionCard>
  );
}
