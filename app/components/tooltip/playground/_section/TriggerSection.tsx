"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";

import {
  TooltipState,
  TRIGGER_EVENT_OPTIONS,
  HIDE_ON_CLICK_OPTIONS,
  TriggerEvent,
  HideOnClickMode,
} from "../../types";

interface TriggerSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function TriggerSection({ state, update }: TriggerSectionProps) {
  return (
    <div className="space-y-4">
      {/* Trigger Event */}
      <SectionCard
        title="Trigger Event"
        subtitle="How the tooltip is activated"
      >
        <LabeledField label="Trigger">
          <Select
            value={state.triggerEvent}
            onChange={(v) => update("triggerEvent", v as TriggerEvent)}
            options={TRIGGER_EVENT_OPTIONS}
          />
        </LabeledField>
      </SectionCard>

      {/* Interactive Behavior */}
      <SectionCard title="Interactive" subtitle="Allow hovering over tooltip">
        <div className="space-y-4">
          <Switch
            label="Interactive Mode"
            checked={state.interactive}
            onChange={(v) => update("interactive", v)}
          />

          {state.interactive && (
            <LabeledField
              label={`Interactive Border: ${state.interactiveBorder}px`}
            >
              <Slider
                value={state.interactiveBorder}
                onChange={(v) => update("interactiveBorder", Number(v))}
                min={0}
                max={20}
                step={1}
              />
            </LabeledField>
          )}
        </div>
      </SectionCard>

      {/* Hide Behaviors */}
      <SectionCard title="Hide Behavior" subtitle="When to hide the tooltip">
        <div className="space-y-4">
          <LabeledField label="Hide on Click">
            <Select
              value={String(state.hideOnClick)}
              onChange={(v) => {
                const val = v === "true" ? true : v === "false" ? false : v;
                update("hideOnClick", val as HideOnClickMode);
              }}
              options={HIDE_ON_CLICK_OPTIONS}
            />
          </LabeledField>

          <Switch
            label="Hide on Scroll"
            checked={state.hideOnScroll}
            onChange={(v) => update("hideOnScroll", v)}
          />

          <Switch
            label="Hide on Escape Key"
            checked={state.hideOnEscapeKey}
            onChange={(v) => update("hideOnEscapeKey", v)}
          />
        </div>
      </SectionCard>

      {/* Touch Support */}
      <SectionCard title="Touch Devices" subtitle="Mobile and touch behavior">
        <LabeledField label={`Touch Hold Delay: ${state.touchHoldDelay}ms`}>
          <Slider
            value={state.touchHoldDelay}
            onChange={(v) => update("touchHoldDelay", Number(v))}
            min={0}
            max={1000}
            step={50}
          />
        </LabeledField>
      </SectionCard>

      {/* Advanced */}
      <SectionCard title="Advanced" subtitle="Singleton and disable state">
        <div className="space-y-4">
          <Switch
            label="Singleton (Share across triggers)"
            checked={state.singleton}
            onChange={(v) => update("singleton", v)}
          />

          <Switch
            label="Disabled"
            checked={state.disabled}
            onChange={(v) => update("disabled", v)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
