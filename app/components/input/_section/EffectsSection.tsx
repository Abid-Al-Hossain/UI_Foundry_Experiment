"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import { type TextInputSetter, type TextInputState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Textarea from "@/app/components/controls/input/Textarea";
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

export default function EffectsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard title="Effects & Animation" subtitle="Shadow and transitions.">
      <div className="space-y-5">
        {/* Shadow */}
        <div className="space-y-3">
          <ShadowLayerControl
            label="Box Shadow"
            enabled={state.shadowEnabled}
            setEnabled={setKey("shadowEnabled")}
            x={state.shadowX}
            setX={(v) => setKey("shadowX")(v)}
            y={state.shadowY}
            setY={(v) => setKey("shadowY")(v)}
            blur={state.shadowBlur}
            setBlur={(v) => setKey("shadowBlur")(v)}
            spread={state.shadowSpread}
            setSpread={(v) => setKey("shadowSpread")(v)}
            opacity={state.shadowOpacity}
            setOpacity={(v) => setKey("shadowOpacity")(v)}
            color={state.shadowColor}
            setColor={setKey("shadowColor")}
          />
        </div>
        {/* Transition */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Transition
          </div>
          <SizeControl
            label="Duration (ms)"
            value={state.transitionDuration}
            onChange={(v) => setKey("transitionDuration")(v)}
            min={0}
            max={1000}
            step={50}
          />
          <LabeledField label="Easing">
            <Select
              value={state.transitionEasing}
              onChange={(v) =>
                setKey("transitionEasing")(
                  v as TextInputState["transitionEasing"],
                )
              }
              options={[
                { value: "ease", label: "Ease" },
                { value: "ease-in", label: "Ease In" },
                { value: "ease-out", label: "Ease Out" },
                { value: "ease-in-out", label: "Ease In Out" },
                { value: "linear", label: "Linear" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Property">
            <Input
              value={state.transitionProperty}
              onNativeChange={(e) => setKey("transitionProperty")(e.target.value)}
             />
          </LabeledField>
        </div>
        {/* Icon */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <Switch
            label={<>Icon / Adornment</>}
            id="icon-on"
            checked={state.iconEnabled}
            onChange={(checked) => setKey("iconEnabled")(checked)}
          />
          {state.iconEnabled && (
            <>
              <LabeledField label="Position">
                <Select
                  value={state.iconPosition}
                  onChange={(v) =>
                    setKey("iconPosition")(v as TextInputState["iconPosition"])
                  }
                  options={[
                    { value: "left", label: "Left" },
                    { value: "right", label: "Right" },
                  ]}
                />
              </LabeledField>
              <SizeControl
                label="Size (px)"
                value={state.iconSize}
                onChange={(v) => setKey("iconSize")(v)}
                min={12}
                max={32}
                step={1}
              />
              <ColorControl
                label="Color"
                palette={PRESET_COLORS}
                value={state.iconColor}
                onChange={setKey("iconColor")}
              />
              <LabeledField label="SVG">
                <Textarea
                  value={state.iconSvg}
                  onNativeChange={(e) => setKey("iconSvg")(e.target.value)}
                  rows={3}
                 />
              </LabeledField>
            </>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
