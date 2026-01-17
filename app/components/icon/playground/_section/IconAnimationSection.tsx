"use client";

import React from "react";
import { type IconState } from "../types";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";

export default function IconAnimationSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
  setFloat: (key: keyof IconState) => (val: any) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Loop Animation" subtitle="Continuous motion.">
        <div className="space-y-4">
          <LabeledField label="Type">
            <Select
              value={state.animationType}
              onChange={(v) => setKey("animationType")(v)}
              options={[
                { value: "none", label: "None" },
                { value: "spin", label: "Spin" },
                { value: "pulse", label: "Pulse" },
                { value: "bounce", label: "Bounce" },
                { value: "wiggle", label: "Wiggle" },
              ]}
            />
          </LabeledField>
          // ...
          <LabeledField label="Effect">
            <Select
              value={state.hoverEffect}
              onChange={(v) => setKey("hoverEffect")(v)}
              options={[
                { value: "none", label: "None" },
                { value: "scale", label: "Scale Up" },
                { value: "rotate", label: "Rotate 180°" },
                { value: "shake", label: "Shake" },
                { value: "glow", label: "Glow Intensify" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
