"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import BorderControl from "@/app/components/controls/layout/BorderControl";
import { type TextInputSetter, type TextInputState } from "../types";
import Switch from "@/app/components/controls/input/Switch";

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
  setKey: TextInputSetter;
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
          <Switch
            label={<>Link all corners</>}
            id="link-radius"
            checked={state.linkRadius}
            onChange={(checked) => setKey("linkRadius")(checked)}
          />
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
          <Switch
            label={<>Gradient</>}
            id="use-gradient"
            checked={state.useGradient}
            onChange={(checked) => setKey("useGradient")(checked)}
          />
          {state.useGradient && (
            <>
              <SizeControl
                label="Angle (deg)"
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
              onChange={(v) =>
                setKey("placeholderFontStyle")(
                  v as TextInputState["placeholderFontStyle"],
                )
              }
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
