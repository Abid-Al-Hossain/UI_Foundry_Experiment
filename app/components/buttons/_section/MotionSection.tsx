"use client";

import React from "react";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { LabeledField, SectionCard, Segmented } from "./ui";

import {
  ActionButtonState,
  ActionButtonFieldSetter,
  TransitionEasing,
} from "../types";

export type AnimationPreset =
  | "none"
  | "breathe"
  | "soft-drift"
  | "soft-glow"
  | "sheen"
  | "aurora"
  | "neon-pulse"
  | "cyber-glitch";

export type TextMotionPreset =
  | "none"
  | "wave"
  | "bounce"
  | "flicker"
  | "shimmer"
  | "glitch";

export type DepthMotionPreset =
  | "none"
  | "rock"
  | "orbit"
  | "gyro"
  | "tilt-cycle";

export default function MotionSection({
  state,
  setKey,
}: {
  state: ActionButtonState;
  setKey: ActionButtonFieldSetter;
}) {
  const duration = Math.max(800, Number(state.animationDurationText) || 4200);
  const speed = Math.max(25, Number(state.animationSpeedText) || 100);
  const intensity = Math.max(0, Number(state.animationIntensityText) || 18);
  const stagger = Math.max(0, Number(state.textAnimationStaggerText) || 90);

  return (
    <SectionCard
      title="Motion"
      subtitle="Ambient button, text, and 3D shell animation controls."
    >
      <div className="space-y-5">
        <div className="space-y-4">
          <LabeledField
            label="Button animation"
            hint="Looping surface motion only"
          >
            <select
              value={state.animation}
              onChange={(e) =>
                setKey("animation")(e.target.value as AnimationPreset)
              }
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="breathe">Breathe</option>
              <option value="soft-drift">Soft Drift</option>
              <option value="soft-glow">Soft Glow</option>
              <option value="sheen">Sheen Sweep</option>
              <option value="aurora">Aurora Drift</option>
              <option value="neon-pulse">Neon Pulse</option>
              <option value="cyber-glitch">Cyberpunk Glitch</option>
            </select>
          </LabeledField>

          <SizeControl
            label={`Duration (${duration}ms)`}
            value={duration}
            onChange={(v) => setKey("animationDurationText")(String(v))}
            min={800}
            max={12000}
            step={50}
            unit="ms"
          />

          <SizeControl
            label={`Speed (${speed}%)`}
            value={speed}
            onChange={(v) => setKey("animationSpeedText")(String(v))}
            min={25}
            max={200}
            step={5}
            unit="%"
          />

          <SizeControl
            label={`Intensity (${intensity}%)`}
            value={intensity}
            onChange={(v) => setKey("animationIntensityText")(String(v))}
            min={0}
            max={100}
            step={1}
            unit="%"
          />

          <LabeledField label="Easing">
            <Segmented
              value={state.animationEasing}
              onChange={(value: TransitionEasing) =>
                setKey("animationEasing")(value)
              }
              items={[
                { value: "ease", label: "Ease" },
                { value: "ease-in", label: "Ease in" },
                { value: "ease-out", label: "Ease out" },
                { value: "ease-in-out", label: "Ease in/out" },
                { value: "linear", label: "Linear" },
              ]}
            />
          </LabeledField>
        </div>

        <div
          className="h-px"
          style={{ background: "color-mix(in oklab, var(--border) 80%, transparent)" }}
        />

        <div className="space-y-4">
          <LabeledField label="Text motion" hint="Animates the button label">
            <select
              value={state.textAnimation}
              onChange={(e) =>
                setKey("textAnimation")(e.target.value as TextMotionPreset)
              }
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="wave">Wave</option>
              <option value="bounce">Bounce</option>
              <option value="flicker">Flicker</option>
              <option value="shimmer">Shimmer</option>
              <option value="glitch">Glitch</option>
            </select>
          </LabeledField>

          <SizeControl
            label={`Text stagger (${stagger}ms)`}
            value={stagger}
            onChange={(v) => setKey("textAnimationStaggerText")(String(v))}
            min={0}
            max={320}
            step={5}
            unit="ms"
          />
        </div>

        <div
          className="h-px"
          style={{ background: "color-mix(in oklab, var(--border) 80%, transparent)" }}
        />

        <div className="space-y-4">
          <LabeledField
            label="3D button motion"
            hint="Loops the shell transform separately from Button animation"
          >
            <select
              value={state.depthAnimation}
              onChange={(e) =>
                setKey("depthAnimation")(e.target.value as DepthMotionPreset)
              }
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="none">None</option>
              <option value="rock">Rock</option>
              <option value="orbit">Orbit</option>
              <option value="gyro">Gyro</option>
              <option value="tilt-cycle">Tilt Cycle</option>
            </select>
          </LabeledField>

          <div className="text-xs leading-5" style={{ color: "var(--muted)" }}>
            Tilt Cycle gently sways the whole shell side to side. Use Button animation for
            surface motion and 3D button motion for shell rotation.
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
