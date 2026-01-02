"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";

export type FontStyleKey = "normal" | "italic";
export type FontWeightKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TextTransformKey = "none" | "uppercase" | "lowercase" | "capitalize";

export type SystemFontItem = { label: string; css: string };

export default function TypographySection(props: {
  // state
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

  // style numbers
  fontSizeText: string;
  setFontSizeText: (v: string) => void;
  fontSizeDisplay: string;
  fontSizeUnit: "px" | "rem";
  setFontSizeUnit: (v: "px" | "rem") => void;
  fontSizeMin: number;
  fontSizeMax: number;
  fontSizeStep: number;

  fontWeight: FontWeightKey;
  setFontWeight: (v: FontWeightKey) => void;

  fontStyle: FontStyleKey;
  setFontStyle: (v: FontStyleKey) => void;

  underline: boolean;
  setUnderline: (v: boolean) => void;

  textTransform: TextTransformKey;
  setTextTransform: (v: TextTransformKey) => void;

  letterSpacingText: string;
  setLetterSpacingText: (v: string) => void;
  letterSpacingDisplay: string;
  letterSpacingUnit: "px" | "em";
  setLetterSpacingUnit: (v: "px" | "em") => void;
  letterSpacingMin: number;
  letterSpacingMax: number;
  letterSpacingStep: number;

  lineHeightText: string;
  setLineHeightText: (v: string) => void;
  lineHeight: number;

  // ids
  idItalic: string;
  idUnderline: string;
}) {
  return (
    <SectionCard title="Typography" subtitle="Font + spacing + decoration.">
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide" style={{ color: "var(--muted)" }}>
            FONT FAMILY
          </div>

          <Segmented
            value={props.fontBucket}
            onChange={(v) => props.setFontBucket(v as "system" | "google")}
            items={[
              { value: "system", label: "System" },
              { value: "google", label: "Google" },
            ]}
          />

          <div className="grid gap-3">
            <LabeledField label="Search font">
              <input
                value={props.fontSearch}
                onChange={(e) => props.setFontSearch(e.target.value)}
                placeholder="Type to search (A-Z)"
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>

            <LabeledField
              label="Font family (A–Z)"
              hint={
                props.fontBucket === "system"
                  ? `${props.filteredSystemFonts.length} fonts`
                  : `${props.filteredGoogleFonts.length} fonts`
              }
            >
              {props.fontBucket === "system" ? (
                <select
                  value={String(props.systemFontIdx)}
                  onChange={(e) => props.setSystemFontIdx(Number(e.target.value))}
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  {props.filteredSystemFonts.map((f) => {
                    const idx = props.systemFonts.findIndex((x) => x.label === f.label);
                    return (
                      <option key={f.label} value={String(idx)}>
                        {f.label}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <select
                  value={props.googleFontFamily}
                  onChange={(e) => props.setGoogleFontFamily(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  {props.filteredGoogleFonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              )}

              {props.fontBucket === "google" ? (
                <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  Loads on-demand from Google Fonts (no downloads).
                </div>
              ) : null}
            </LabeledField>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-wide" style={{ color: "var(--muted)" }}>
            FONT STYLE
          </div>

          <LabeledField label="Font size unit">
            <Segmented
              value={props.fontSizeUnit}
              onChange={(v) => props.setFontSizeUnit(v as "px" | "rem")}
              items={[
                { value: "px", label: "px" },
                { value: "rem", label: "rem" },
              ]}
            />
          </LabeledField>

          <SizeControl
            label={`Font size (${props.fontSizeDisplay})`}
            valueText={props.fontSizeText}
            setValueText={props.setFontSizeText}
            min={props.fontSizeMin}
            max={props.fontSizeMax}
            step={props.fontSizeStep}
          />

          <LabeledField label="Weight">
            <select
              value={String(props.fontWeight)}
              onChange={(e) => props.setFontWeight(Number(e.target.value) as FontWeightKey)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
                <option key={w} value={String(w)}>
                  {w}
                </option>
              ))}
            </select>
          </LabeledField>

          <div className="grid grid-cols-2 gap-3">
            <div className="inline-flex items-center gap-2">
              <input
                id={props.idItalic}
                type="checkbox"
                checked={props.fontStyle === "italic"}
                onChange={(e) => props.setFontStyle(e.target.checked ? "italic" : "normal")}
              />
              <label htmlFor={props.idItalic} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
                Italic
              </label>
            </div>

            <div className="inline-flex items-center gap-2">
              <input
                id={props.idUnderline}
                type="checkbox"
                checked={props.underline}
                onChange={(e) => props.setUnderline(e.target.checked)}
              />
              <label htmlFor={props.idUnderline} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
                Underline
              </label>
            </div>
          </div>

          <LabeledField label="Text transform">
            <select
              value={props.textTransform}
              onChange={(e) => props.setTextTransform(e.target.value as TextTransformKey)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </LabeledField>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-wide" style={{ color: "var(--muted)" }}>
            TEXT SPACING
          </div>

          <div className="space-y-4">
            <LabeledField label="Letter spacing unit">
              <Segmented
                value={props.letterSpacingUnit}
                onChange={(v) => props.setLetterSpacingUnit(v as "px" | "em")}
                items={[
                  { value: "px", label: "px" },
                  { value: "em", label: "em" },
                ]}
              />
            </LabeledField>

            <SizeControl
              label={`Letter spacing (${props.letterSpacingDisplay})`}
              valueText={props.letterSpacingText}
              setValueText={props.setLetterSpacingText}
              min={props.letterSpacingMin}
              max={props.letterSpacingMax}
              step={props.letterSpacingStep}
            />
            <SizeControl
              label={`Line height (${props.lineHeight})`}
              valueText={props.lineHeightText}
              setValueText={props.setLineHeightText}
              min={0.8}
              max={3}
              step={0.05}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
