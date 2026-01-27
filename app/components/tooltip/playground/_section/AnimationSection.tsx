"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";

import {
  TooltipState,
  ANIMATION_TYPE_OPTIONS,
  EASING_OPTIONS,
  AnimationType,
} from "../../types";

interface AnimationSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function AnimationSection({
  state,
  update,
}: AnimationSectionProps) {
  return (
    <div className="space-y-4">
      {/* Animation Type */}
      <SectionCard
        title="Animation Type"
        subtitle="Choose entrance and exit animation"
      >
        <LabeledField label="Animation">
          <Select
            value={state.animationType}
            onChange={(v) => update("animationType", v as AnimationType)}
            options={ANIMATION_TYPE_OPTIONS}
          />
        </LabeledField>
      </SectionCard>

      {/* Timing */}
      {state.animationType !== "none" && (
        <SectionCard title="Timing" subtitle="Control animation speed">
          <div className="space-y-4">
            <LabeledField label={`Duration: ${state.transitionDuration}ms`}>
              <Slider
                value={state.transitionDuration}
                onChange={(v) => update("transitionDuration", Number(v))}
                min={0}
                max={1000}
                step={25}
              />
            </LabeledField>

            <LabeledField label="Easing">
              <Select
                value={state.transitionEasing}
                onChange={(v) => update("transitionEasing", v)}
                options={EASING_OPTIONS}
              />
            </LabeledField>
          </div>
        </SectionCard>
      )}

      {/* Delays */}
      <SectionCard title="Delays" subtitle="Show and hide timing">
        <div className="space-y-4">
          <LabeledField label={`Show Delay: ${state.showDelay}ms`}>
            <Slider
              value={state.showDelay}
              onChange={(v) => update("showDelay", Number(v))}
              min={0}
              max={1000}
              step={50}
            />
          </LabeledField>

          <LabeledField label={`Hide Delay: ${state.hideDelay}ms`}>
            <Slider
              value={state.hideDelay}
              onChange={(v) => update("hideDelay", Number(v))}
              min={0}
              max={1000}
              step={50}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Advanced Animation */}
      <SectionCard title="Advanced" subtitle="Fine-tune animation behavior">
        <div className="space-y-4">
          <Switch
            label="Inertia (Physics-based)"
            checked={state.inertia}
            onChange={(v) => update("inertia", v)}
          />

          <Switch
            label="Mount Transition"
            checked={state.mountTransition}
            onChange={(v) => update("mountTransition", v)}
          />

          <Switch
            label="Unmount Transition"
            checked={state.unmountTransition}
            onChange={(v) => update("unmountTransition", v)}
          />
        </div>
      </SectionCard>

      {/* Animation Preview */}
      <SectionCard title="Preview" subtitle="Test current animation settings">
        <div
          className="flex items-center justify-center p-8 rounded-xl"
          style={{ background: "var(--surface)" }}
        >
          <AnimationPreviewBox state={state} />
        </div>
      </SectionCard>
    </div>
  );
}

// Mini component to preview the animation
function AnimationPreviewBox({ state }: { state: TooltipState }) {
  const [visible, setVisible] = React.useState(true);

  const toggleAnimation = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), state.transitionDuration + 100);
  };

  const getTransformStyle = () => {
    if (!visible) {
      switch (state.animationType) {
        case "scale":
          return "scale(0.85)";
        case "shift-away":
          return "translateY(-10px)";
        case "shift-toward":
          return "translateY(10px)";
        case "perspective":
          return "perspective(700px) rotateX(60deg)";
        default:
          return "none";
      }
    }
    return "none";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="px-4 py-2 rounded-lg text-sm font-medium"
        style={{
          background: state.bgColor,
          color: state.textColor,
          opacity: visible ? 1 : 0,
          transform: getTransformStyle(),
          transition:
            state.animationType !== "none"
              ? `opacity ${state.transitionDuration}ms ${state.transitionEasing}, transform ${state.transitionDuration}ms ${state.transitionEasing}`
              : "none",
        }}
      >
        Tooltip Preview
      </div>
      <button
        onClick={toggleAnimation}
        className="px-3 py-1.5 text-xs font-medium rounded-lg transition"
        style={{ background: "var(--primary)", color: "white" }}
      >
        Replay Animation
      </button>
    </div>
  );
}
