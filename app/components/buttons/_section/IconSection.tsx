"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";
import IconPickerControl, {
  IconName,
  IconSource,
} from "@/app/components/controls/layout/IconPickerControl";
import {
  type IconName as LocalIconName,
  type IconSource as LocalIconSource,
} from "../_data/buttonConstants";

// Re-export for compatibility if needed, or just align types
export type { IconName, IconSource };
type IconPosition = "left" | "right";

export default function IconSection(props: {
  PALETTE: readonly string[];

  iconName: LocalIconName;
  setIconName: (v: LocalIconName) => void;

  iconSource: LocalIconSource;
  setIconSource: (v: LocalIconSource) => void;

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
  hoverIconSource: LocalIconSource;
  setHoverIconSource: (v: LocalIconSource) => void;
  hoverIconName: LocalIconName;
  setHoverIconName: (v: LocalIconName) => void;
  hoverIconCustomSvg: string;
  setHoverIconCustomSvg: (v: string) => void;

  activeIconEnabled: boolean;
  setActiveIconEnabled: (v: boolean) => void;
  activeIconSource: LocalIconSource;
  setActiveIconSource: (v: LocalIconSource) => void;
  activeIconName: LocalIconName;
  setActiveIconName: (v: LocalIconName) => void;
  activeIconCustomSvg: string;
  setActiveIconCustomSvg: (v: string) => void;

  loadingIconEnabled: boolean;
  setLoadingIconEnabled: (v: boolean) => void;
  loadingIconSource: LocalIconSource;
  setLoadingIconSource: (v: LocalIconSource) => void;
  loadingIconName: LocalIconName;
  setLoadingIconName: (v: LocalIconName) => void;
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

  const renderStateOverride = (
    label: string,
    enabled: boolean,
    setEnabled: (v: boolean) => void,
    source: LocalIconSource,
    setSource: (v: LocalIconSource) => void,
    name: LocalIconName,
    setName: (v: LocalIconName) => void,
    customSvg: string,
    setCustomSvg: (v: string) => void,
    note?: string,
  ) => (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: "var(--border)" }}
    >
      <label
        className="flex items-center gap-2 text-sm uf-clickable"
        style={{ color: "var(--text)" }}
      >
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
          <IconPickerControl
            label="Override Icon"
            source={source}
            setSource={setSource}
            name={name}
            setName={setName}
            customSvg={customSvg}
            setCustomSvg={setCustomSvg}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <SectionCard
      title="Icon"
      subtitle="Built-in icons + position + size + color."
    >
      <div className="space-y-4">
        <IconPickerControl
          label="Base Icon"
          source={iconSource}
          setSource={setIconSource}
          name={iconName}
          setName={setIconName}
          customSvg={iconCustomSvg}
          setCustomSvg={setIconCustomSvg}
        />

        {(iconSource === "library" && iconName !== "none") ||
        (iconSource === "custom" && iconCustomSvg.trim()) ? (
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
                value={Number(iconSizeText) || 10}
                onChange={(v) => setIconSizeText(String(v))}
                min={10}
                max={40}
                step={1}
              />
              <SizeControl
                label={`Icon gap (${iconGap}px)`}
                value={Number(iconGapText) || 0}
                onChange={(v) => setIconGapText(String(v))}
                min={0}
                max={30}
                step={1}
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
                label="Icon Color"
                palette={PALETTE}
                value={iconColorInput}
                onChange={setIconColorInput}
              />
            ) : null}
          </>
        ) : null}

        <div className="space-y-3">
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
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
            "Overrides the spinner when enabled.",
          )}
        </div>
      </div>
    </SectionCard>
  );
}
