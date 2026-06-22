"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type TextInputSetter, type TextInputState } from "../types";

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
        <div className="flex items-center gap-2">
          <input
            id="input-icon-enabled"
            type="checkbox"
            checked={state.iconEnabled}
            onChange={(e) => setKey("iconEnabled")(e.target.checked)}
          />
          <label
            htmlFor="input-icon-enabled"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Show Inline Icon
          </label>
        </div>

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
              <textarea
                rows={4}
                value={state.iconSvg}
                onChange={(e) => setKey("iconSvg")(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none font-mono"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>
          </>
        )}

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Prefix Text">
            <input
              value={state.prefixText}
              onChange={(e) => setKey("prefixText")(e.target.value)}
              placeholder="https://"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
          <LabeledField label="Suffix Text">
            <input
              value={state.suffixText}
              onChange={(e) => setKey("suffixText")(e.target.value)}
              placeholder=".com"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
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
          <div className="flex items-center gap-2">
            <input
              id="input-clear-button"
              type="checkbox"
              checked={state.showClearButton}
              onChange={(e) => setKey("showClearButton")(e.target.checked)}
            />
            <label
              htmlFor="input-clear-button"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Show Clear Action
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="input-password-toggle"
              type="checkbox"
              checked={state.showPasswordToggle}
              onChange={(e) => setKey("showPasswordToggle")(e.target.checked)}
              disabled={state.inputType !== "password"}
            />
            <label
              htmlFor="input-password-toggle"
              className="text-sm uf-clickable"
              style={{
                color:
                  state.inputType === "password" ? "var(--text)" : "var(--muted)",
              }}
            >
              Show Password Reveal
            </label>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
