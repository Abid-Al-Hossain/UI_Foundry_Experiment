import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Live Region" subtitle="How screen readers announce the loading state.">
        <ControlGroup label="Role">
          <SegmentedControl
            value={state.role}
            onChange={(v) => update("role", v as SpinnerState["role"])}
            items={[
              { value: "status", label: "status" },
              { value: "progressbar", label: "progressbar" },
              { value: "presentation", label: "presentation" },
            ]}
          />
        </ControlGroup>
        <ControlGroup label="Aria Live">
          <SegmentedControl
            value={state.ariaLive}
            onChange={(v) => update("ariaLive", v as SpinnerState["ariaLive"])}
            items={[
              { value: "polite", label: "polite" },
              { value: "assertive", label: "assertive" },
              { value: "off", label: "off" },
            ]}
          />
        </ControlGroup>
        <ControlGroup label="Aria Value Text" hint="Optional progress description, e.g. '40% complete'.">
          <InputControl
            value={state.ariaValueText}
            onChange={(e) => update("ariaValueText", e.target.value)}
            placeholder="e.g. 40% complete"
          />
        </ControlGroup>
        <ControlGroup label="Hide From Assistive Tech">
          <SegmentedControl
            value={state.ariaHidden ? "true" : "false"}
            onChange={(v) => update("ariaHidden", v === "true")}
            items={[
              { value: "false", label: "No" },
              { value: "true", label: "Yes" },
            ]}
          />
        </ControlGroup>
      </Section>

      <Section title="Guidance" subtitle="Loading-state best practices">
        <div className="text-xs text-slate-400 space-y-2">
          <p>
            - Use a concise loading label when the spinner runs without nearby
            visible text.
          </p>
          <p>
            - Add visible overlay labels when the loading state needs extra
            context for sighted users.
          </p>
          <p>
            - Prefer calmer motion settings for longer-running loading states.
          </p>
        </div>
      </Section>
    </div>
  );
}
