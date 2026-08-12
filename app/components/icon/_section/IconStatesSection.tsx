"use client";

import React from "react";
import {
  type IconFloatSetter,
  type IconSetter,
  type IconState,
} from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import Switch from "@/app/components/controls/input/Switch";

export default function IconStatesSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: IconSetter;
  setFloat: IconFloatSetter;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Interaction" subtitle="Make the icon a clickable control.">
      <div className="space-y-4">
        <Switch
          label={<>Clickable (enables tabIndex, hover/active, focus ring)</>}
          id="icon-clickable-toggle"
          checked={state.clickable}
          onChange={(checked) => setKey("clickable")(checked)}
        />
        <SegmentedControl
          value={state.cursorType}
          onChange={(v) => setKey("cursorType")(v)}
          items={[
            { value: "default", label: "Default" },
            { value: "pointer", label: "Pointer" },
            { value: "not-allowed", label: "Not allowed" },
          ]}
        />
        <SizeControl label="Tab Index" value={state.tabIndex} onChange={setFloat("tabIndex")} min={-1} max={10} unit="" />
      </div>
    </SectionCard>

      <SectionCard title="Hover & Active Colors" subtitle="Explicit colors used when clickable is on.">
      <div className="space-y-4">
        <ColorControl label="Hover stroke" value={state.hoverColor} onChange={setKey("hoverColor")} />
        <ColorControl label="Hover fill" value={state.hoverFillColor} onChange={setKey("hoverFillColor")} />
        <SizeControl label="Hover scale" value={state.hoverScale} onChange={setFloat("hoverScale")} min={0.8} max={1.5} step={0.01} unit="x" />
        <ColorControl label="Active stroke" value={state.activeColor} onChange={setKey("activeColor")} />
        <SizeControl label="Active scale" value={state.activeScale} onChange={setFloat("activeScale")} min={0.7} max={1.2} step={0.01} unit="x" />
      </div>
    </SectionCard>

      <SectionCard title="Focus Ring" subtitle="Keyboard focus indicator for clickable icons.">
      <div className="space-y-4">
        <Switch
          label={<>Enable focus ring</>}
          id="icon-focusring-toggle"
          checked={state.focusRingEnabled}
          onChange={(checked) => setKey("focusRingEnabled")(checked)}
        />
        <SizeControl label="Ring width" value={state.focusRingWidth} onChange={setFloat("focusRingWidth")} min={1} max={6} unit="px" />
        <SizeControl label="Ring offset" value={state.focusRingOffset} onChange={setFloat("focusRingOffset")} min={0} max={8} unit="px" />
        <ColorControl label="Ring color" value={state.focusRingColor} onChange={setKey("focusRingColor")} />
      </div>
    </SectionCard>

      <SectionCard title="Transitions" subtitle="Animation timing for hover/active/disabled changes.">
      <div className="space-y-4">
        <SizeControl label="Duration" value={state.transitionDuration} onChange={setFloat("transitionDuration")} min={0} max={1000} step={10} unit="ms" />
        <SegmentedControl
          value={state.transitionEasing}
          onChange={(v) => setKey("transitionEasing")(v)}
          items={[
            { value: "ease", label: "Ease" },
            { value: "ease-in", label: "In" },
            { value: "ease-out", label: "Out" },
            { value: "ease-in-out", label: "In-Out" },
            { value: "linear", label: "Linear" },
          ]}
        />
      </div>
    </SectionCard>

      <SectionCard title="Disabled State" subtitle="Greyed-out, non-interactive icon.">
      <div className="space-y-4">
        <Switch
          label={<>Disabled</>}
          id="icon-disabled-toggle"
          checked={state.disabled}
          onChange={(checked) => setKey("disabled")(checked)}
        />
        <SizeControl label="Disabled opacity" value={state.disabledOpacity} onChange={setFloat("disabledOpacity")} min={0.1} max={1} step={0.05} unit="" />
        <ColorControl label="Disabled color" value={state.disabledColor} onChange={setKey("disabledColor")} />
        <SegmentedControl
          value={state.disabledCursor}
          onChange={(v) => setKey("disabledCursor")(v)}
          items={[
            { value: "not-allowed", label: "Not allowed" },
            { value: "default", label: "Default" },
            { value: "pointer", label: "Pointer" },
          ]}
        />
      </div>
    </SectionCard>
    </div>
  );
}
