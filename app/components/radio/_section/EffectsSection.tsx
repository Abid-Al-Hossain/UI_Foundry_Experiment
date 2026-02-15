"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { RadioState } from "../types";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";

export default function EffectsSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: (key: keyof RadioState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Effects" subtitle="Animation and shadows.">
      <div className="space-y-6">
        <div className="space-y-4">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Animation
          </div>
          <LabeledField label="Animation Type">
            <Segmented
              value={state.animationType}
              onChange={(v) => setKey("animationType")(v)}
              items={[
                { value: "scale", label: "Scale" },
                { value: "fade", label: "Fade" },
                { value: "none", label: "None" },
              ]}
            />
          </LabeledField>
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
              onChange={(v) => setKey("transitionEasing")(v)}
              options={[
                { value: "ease", label: "Ease" },
                { value: "ease-in", label: "Ease In" },
                { value: "ease-out", label: "Ease Out" },
                { value: "ease-in-out", label: "Ease In Out" },
                { value: "linear", label: "Linear" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <ShadowLayerControl
            label="Drop Shadow"
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
      </div>
    </SectionCard>
  );
}
