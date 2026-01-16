"use client";

import React from "react";
import { type IconState } from "../types";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";

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
            <select
              value={state.animationType}
              onChange={(e) => setKey("animationType")(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="spin">Spin</option>
              <option value="pulse">Pulse</option>
              <option value="bounce">Bounce</option>
              <option value="wiggle">Wiggle</option>
            </select>
          </LabeledField>

          {state.animationType !== "none" && (
            <SizeControl
              label="Duration"
              value={state.animationDuration}
              onChange={setFloat("animationDuration")}
              min={0.2}
              max={10}
              step={0.1}
              unit="s"
            />
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Hover Interaction"
        subtitle="Motion on pointer hover."
      >
        <LabeledField label="Effect">
          <select
            value={state.hoverEffect}
            onChange={(e) => setKey("hoverEffect")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            <option value="none">None</option>
            <option value="scale">Scale Up</option>
            <option value="rotate">Rotate 180°</option>
            <option value="shake">Shake</option>
            <option value="glow">Glow Intensify</option>
          </select>
        </LabeledField>
      </SectionCard>
    </div>
  );
}
