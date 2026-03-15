"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import BorderControl from "@/app/components/controls/layout/BorderControl";
import { TextInputState } from "../types";

const PRESET_COLORS = [
  "#cbd5e1",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#000000",
  "#ffffff",
];

export default function StylingSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: (key: keyof TextInputState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Appearance" subtitle="Sizing, borders, and colors.">
      <div className="space-y-5">
        {/* Sizing */}
        <div className="space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Sizing
          </div>
          <SizeControl
            label="Height (px)"
            value={state.height}
            onChange={(v) => setKey("height")(v)}
            min={28}
            max={80}
            step={2}
          />
          <div className="grid grid-cols-2 gap-3">
            <SizeControl
              label="Padding X (px)"
              value={state.paddingX}
              onChange={(v) => setKey("paddingX")(v)}
              min={0}
              max={40}
              step={1}
            />
            <SizeControl
              label="Padding Y (px)"
              value={state.paddingY}
              onChange={(v) => setKey("paddingY")(v)}
              min={0}
              max={24}
              step={1}
            />
          </div>
        </div>

        {/* Border */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <BorderControl
            width={state.borderWidth}
            setWidth={(v) => setKey("borderWidth")(v)}
            style={state.borderStyle}
            setStyle={(v) => setKey("borderStyle")(v)}
            color={state.borderColor}
            setColor={setKey("borderColor")}
            palette={PRESET_COLORS}
          />

          <SizeControl
            label={state.linkRadius ? "Border Radius (px)" : "Top Left (px)"}
            value={state.linkRadius ? state.borderRadius : state.borderRadiusTL}
            onChange={(v) => {
              if (state.linkRadius) {
                setKey("borderRadius")(v);
                setKey("borderRadiusTL")(v);
                setKey("borderRadiusTR")(v);
                setKey("borderRadiusBR")(v);
                setKey("borderRadiusBL")(v);
              } else {
                setKey("borderRadiusTL")(v);
              }
            }}
            min={0}
            max={50}
            step={1}
          />
          <div className="flex items-center gap-2">
            <input
              id="link-radius"
              type="checkbox"
              checked={state.linkRadius}
              onChange={(e) => setKey("linkRadius")(e.target.checked)}
            />
            <label
              htmlFor="link-radius"
              className="text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              Link all corners
            </label>
          </div>
          {!state.linkRadius && (
            <div className="grid grid-cols-3 gap-2">
              <SizeControl
                label="TR (px)"
                value={state.borderRadiusTR}
                onChange={(v) => setKey("borderRadiusTR")(v)}
                min={0}
                max={50}
                step={1}
              />
              <SizeControl
                label="BR (px)"
                value={state.borderRadiusBR}
                onChange={(v) => setKey("borderRadiusBR")(v)}
                min={0}
                max={50}
                step={1}
              />
              <SizeControl
                label="BL (px)"
                value={state.borderRadiusBL}
                onChange={(v) => setKey("borderRadiusBL")(v)}
                min={0}
                max={50}
                step={1}
              />
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Colors
          </div>
          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.backgroundColor}
            onChange={setKey("backgroundColor")}
          />
          <div className="flex items-center gap-2">
            <input
              id="use-gradient"
              type="checkbox"
              checked={state.useGradient}
              onChange={(e) => setKey("useGradient")(e.target.checked)}
            />
            <label
              htmlFor="use-gradient"
              className="text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              Gradient
            </label>
          </div>
          {state.useGradient && (
            <>
              <SizeControl
                label="Angle (°)"
                value={state.gradientAngle}
                onChange={(v) => setKey("gradientAngle")(v)}
                min={0}
                max={360}
                step={5}
              />
              <ColorControl
                label="Start"
                palette={PRESET_COLORS}
                value={state.gradientStart}
                onChange={setKey("gradientStart")}
              />
              <ColorControl
                label="End"
                palette={PRESET_COLORS}
                value={state.gradientEnd}
                onChange={setKey("gradientEnd")}
              />
            </>
          )}
          <ColorControl
            label="Caret"
            palette={PRESET_COLORS}
            value={state.caretColor}
            onChange={setKey("caretColor")}
          />
          <ColorControl
            label="Selection BG"
            palette={PRESET_COLORS}
            value={state.selectionBg}
            onChange={setKey("selectionBg")}
          />
          <ColorControl
            label="Selection Text"
            palette={PRESET_COLORS}
            value={state.selectionColor}
            onChange={setKey("selectionColor")}
          />
        </div>

        {/* Placeholder styling moved to Typography or kept Separate? Input types had Placeholder Styling in Typography section, BUT types.ts has separate block.
             Wait, StylingSection had "Placeholder" block at the end (lines 346-378).
             I removed Typography block (lines 247-344).
             I kept Sizing, Border, Colors.
             Should I keep Placeholder block?
             The prompt said "remove Typography block".
             Placeholder block has Color, Opacity, Font Style.
             I can keep it here or move to Typography.
             Given TypographySection handles input text, maybe placeholder style belongs there too?
             But TypographySection is mainly TypographyControl.
             I'll keep Placeholder here for now, or just remove it if I assume it moved...
             Wait, I didn't verify where Placeholder went.
             If I remove it from here, where does it go?
             It's not in TypographySection I created.
             I should probably ADD it to TypographySection or keep it here.
             I'll keep it here for now to avoid losing controls.
        */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Placeholder
          </div>
          <ColorControl
            label="Color"
            palette={PRESET_COLORS}
            value={state.placeholderColor}
            onChange={setKey("placeholderColor")}
          />
          <SizeControl
            label="Opacity"
            value={state.placeholderOpacity}
            onChange={(v) => setKey("placeholderOpacity")(v)}
            min={0}
            max={1}
            step={0.05}
          />
          <LabeledField label="Font Style">
            <Segmented
              value={state.placeholderFontStyle}
              onChange={(v) => setKey("placeholderFontStyle")(v)}
              items={[
                { value: "normal", label: "Normal" },
                { value: "italic", label: "Italic" },
              ]}
            />
          </LabeledField>
        </div>
      </div>
    </SectionCard>
  );
}
