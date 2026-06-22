"use client";

import React from "react";
import { type DividerState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import SizeControl from "@/app/components/controls/input/SizeControl";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

type Props = {
  state: DividerState;
  setKey: DividerSetter;
};

export default function DividerStatesSection({ state, setKey }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Drop Shadow" subtitle="Shadow under the line, distinct from neon glow.">
        <SegmentedControl
          value={state.shadowEnabled ? "true" : "false"}
          onChange={(v) => setKey("shadowEnabled")(v === "true")}
          items={[{ value: "false", label: "Off" }, { value: "true", label: "On" }]}
        />
        <ColorControl label="Shadow Color" value={state.shadowColor} onChange={setKey("shadowColor")} />
        <SizeControl label="Shadow X" value={state.shadowX} onChange={setKey("shadowX")} min={-40} max={40} unit="px" />
        <SizeControl label="Shadow Y" value={state.shadowY} onChange={setKey("shadowY")} min={-40} max={40} unit="px" />
        <SizeControl label="Shadow Blur" value={state.shadowBlur} onChange={setKey("shadowBlur")} min={0} max={60} unit="px" />
        <SizeControl label="Shadow Spread" value={state.shadowSpread} onChange={setKey("shadowSpread")} min={-20} max={20} unit="px" />
        <SizeControl label="Shadow Opacity" value={state.shadowOpacity} onChange={setKey("shadowOpacity")} min={0} max={1} step={0.05} unit="" />
      </Section>

      <Section title="Focus Ring" subtitle="Keyboard focus indicator for interactive dividers (e.g. step wizards).">
        <SegmentedControl
          value={state.focusRingEnabled ? "true" : "false"}
          onChange={(v) => setKey("focusRingEnabled")(v === "true")}
          items={[{ value: "false", label: "Off" }, { value: "true", label: "On" }]}
        />
        <ColorControl label="Ring Color" value={state.focusRingColor} onChange={setKey("focusRingColor")} />
        <SizeControl label="Ring Width" value={state.focusRingWidth} onChange={setKey("focusRingWidth")} min={1} max={6} unit="px" />
        <SizeControl label="Ring Offset" value={state.focusRingOffset} onChange={setKey("focusRingOffset")} min={0} max={8} unit="px" />
      </Section>

      <Section title="Transitions" subtitle="Timing for hover/disabled/opacity changes.">
        <SegmentedControl
          value={state.transitionEasing}
          onChange={(v) => setKey("transitionEasing")(v as DividerState["transitionEasing"])}
          items={[
            { value: "ease", label: "Ease" },
            { value: "ease-in", label: "In" },
            { value: "ease-out", label: "Out" },
            { value: "ease-in-out", label: "In-Out" },
            { value: "linear", label: "Linear" },
          ]}
        />
        <SizeControl label="Duration" value={state.transitionDuration} onChange={setKey("transitionDuration")} min={0} max={1000} step={10} unit="ms" />
      </Section>

      <Section title="Disabled State" subtitle="Greyed-out, non-interactive divider (e.g. locked step).">
        <SegmentedControl
          value={state.disabled ? "true" : "false"}
          onChange={(v) => setKey("disabled")(v === "true")}
          items={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]}
        />
        <SizeControl label="Disabled Opacity" value={state.disabledOpacity} onChange={setKey("disabledOpacity")} min={0.1} max={1} step={0.05} unit="" />
      </Section>

      <Section title="Hover State" subtitle="Color/opacity swap on hover for interactive dividers.">
        <ColorControl label="Hover Color" value={state.hoverColor} onChange={setKey("hoverColor")} />
        <SizeControl label="Hover Opacity" value={state.hoverOpacity} onChange={setKey("hoverOpacity")} min={0.1} max={1} step={0.05} unit="" />
      </Section>

      <Section title="Spacing & Gradient" subtitle="Independent vertical margin and gradient direction.">
        <SizeControl label="Margin Top" value={state.marginTop} onChange={setKey("marginTop")} min={0} max={80} unit="px" />
        <SizeControl label="Margin Bottom" value={state.marginBottom} onChange={setKey("marginBottom")} min={0} max={80} unit="px" />
        <SizeControl label="Gradient Angle" value={state.gradientAngle} onChange={setKey("gradientAngle")} min={0} max={360} unit="deg" />
      </Section>
    </div>
  );
}
