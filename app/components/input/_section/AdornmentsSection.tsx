"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type TextInputSetter, type TextInputState } from "../types";
import Textarea from "@/app/components/controls/input/Textarea";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

const PRESET_COLORS = [
  "#334155",
  "#64748b",
  "#94a3b8",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#ffffff",
];

export default function AdornmentsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Adornments & Actions"
      subtitle="Icons, prefix and suffix content, clear action, and password reveal."
    >
      <div className="space-y-4">
        <Switch
          label={<>Show Inline Icon</>}
          id="input-icon-enabled"
          checked={state.iconEnabled}
          onChange={(checked) => setKey("iconEnabled")(checked)}
        />

        {state.iconEnabled && (
          <>
            <LabeledField label="Icon Position">
              <Segmented
                value={state.iconPosition}
                onChange={(v) =>
                  setKey("iconPosition")(v as TextInputState["iconPosition"])
                }
                items={[
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                ]}
              />
            </LabeledField>
            <SizeControl
              label="Icon Size (px)"
              value={state.iconSize}
              onChange={(v) => setKey("iconSize")(v)}
              min={12}
              max={28}
              step={1}
            />
            <ColorControl
              label="Icon Color"
              palette={PRESET_COLORS}
              value={state.iconColor}
              onChange={setKey("iconColor")}
            />
            <LabeledField label="Icon SVG">
              <Textarea
                rows={4}
                value={state.iconSvg}
                onNativeChange={(e) => setKey("iconSvg")(e.target.value)}
               />
            </LabeledField>
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Prefix Text">
            <Input
              value={state.prefixText}
              onNativeChange={(e) => setKey("prefixText")(e.target.value)}
              placeholder="https://"
             />
          </LabeledField>
          <LabeledField label="Suffix Text">
            <Input
              value={state.suffixText}
              onNativeChange={(e) => setKey("suffixText")(e.target.value)}
              placeholder=".com"
             />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ColorControl
            label="Prefix Color"
            palette={PRESET_COLORS}
            value={state.prefixColor}
            onChange={setKey("prefixColor")}
          />
          <ColorControl
            label="Suffix Color"
            palette={PRESET_COLORS}
            value={state.suffixColor}
            onChange={setKey("suffixColor")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Switch
            label={<>Show Clear Action</>}
            id="input-clear-button"
            checked={state.showClearButton}
            onChange={(checked) => setKey("showClearButton")(checked)}
          />
          <Switch
            label={<>Show Password Reveal</>}
            id="input-password-toggle"
            checked={state.showPasswordToggle}
            onChange={(checked) => setKey("showPasswordToggle")(checked)}
            disabled={state.inputType !== "password"}
          />
        </div>
      </div>
    </SectionCard>
  );
}
