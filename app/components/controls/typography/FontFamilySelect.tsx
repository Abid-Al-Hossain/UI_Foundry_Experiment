"use client";

import React from "react";
import { LabeledField } from "@/app/components/controls/ui";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SegmentedControl } from "../input/SegmentedControl";
// Types extracted from Typography section
export type SystemFontItem = { label: string; css: string };

type FullFontFamilySelectProps = {
  fontBucket: "system" | "google";
  setFontBucket: (v: "system" | "google") => void;

  fontSearch: string;
  setFontSearch: (v: string) => void;

  systemFonts: SystemFontItem[];
  filteredSystemFonts: SystemFontItem[];
  systemFontIdx: number;
  setSystemFontIdx: (v: number) => void;

  googleFonts: string[];
  filteredGoogleFonts: string[];
  googleFontFamily: string;
  setGoogleFontFamily: (v: string) => void;
};

type SimpleFontFamilySelectProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const SIMPLE_FONT_OPTIONS = [
  { value: "sans-serif", label: "System Sans" },
  { value: "serif", label: "System Serif" },
  { value: "monospace", label: "System Mono" },
  { value: "ui-rounded, sans-serif", label: "System Rounded" },
  { value: "Inter", label: "Inter" },
  { value: "Geist", label: "Geist" },
  { value: "Manrope", label: "Manrope" },
  { value: "Sora", label: "Sora" },
  { value: "Space Grotesk", label: "Space Grotesk" },
  { value: "JetBrains Mono", label: "JetBrains Mono" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
] as const;

const isSimpleFontSelect = (
  props: FullFontFamilySelectProps | SimpleFontFamilySelectProps,
): props is SimpleFontFamilySelectProps => "value" in props;

export default function FontFamilySelect(
  props: FullFontFamilySelectProps | SimpleFontFamilySelectProps,
) {
  if (isSimpleFontSelect(props)) {
    return (
      <Select
        label={props.label ?? "Font family"}
        value={props.value}
        onChange={props.onChange}
        options={SIMPLE_FONT_OPTIONS}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="text-xs font-semibold tracking-wide"
        style={{ color: "var(--muted)" }}
      >
        FONT FAMILY
      </div>

      <SegmentedControl
        value={props.fontBucket}
        onChange={(v: string) => props.setFontBucket(v as "system" | "google")}
        items={[
          { value: "system", label: "System" },
          { value: "google", label: "Google" },
        ]}
      />

      <div className="grid gap-3">
        <LabeledField label="Search font">
          <Input
            value={props.fontSearch}
            onChange={props.setFontSearch}
            placeholder="Type to search (A-Z)"
          />
        </LabeledField>
        <LabeledField
          label="Font family (A-Z)"
          hint={
            props.fontBucket === "system"
              ? `${props.filteredSystemFonts.length} fonts`
              : `${props.filteredGoogleFonts.length} fonts`
          }
        >
          {props.fontBucket === "system" ? (
            <Select
              value={String(props.systemFontIdx)}
              onChange={(v) => props.setSystemFontIdx(Number(v))}
              options={[]} // We use children for custom mapping
            >
              {props.filteredSystemFonts.map((f) => {
                const idx = props.systemFonts.findIndex(
                  (x) => x.label === f.label,
                );
                return (
                  <option key={f.label} value={String(idx)}>
                    {f.label}
                  </option>
                );
              })}
            </Select>
          ) : (
            <Select
              value={props.googleFontFamily}
              onChange={props.setGoogleFontFamily}
              options={props.filteredGoogleFonts.map((f) => ({
                value: f,
                label: f,
              }))}
            />
          )}

          {props.fontBucket === "google" ? (
            <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
              Loads on-demand from Google Fonts (no downloads).
            </div>
          ) : null}
        </LabeledField>
      </div>
    </div>
  );
}

