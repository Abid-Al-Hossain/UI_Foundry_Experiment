import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="ARIA Labels" subtitle="Screen reader accessibility">
        <ControlGroup label="Aria Label">
          <InputControl
            value={state.ariaLabel}
            onChange={(v) => update("ariaLabel", v)}
            placeholder="e.g. File upload progress"
          />
        </ControlGroup>

        <ControlGroup label="Aria Described By (ID)">
          <InputControl
            value={state.ariaDescribedBy}
            onChange={(v) => update("ariaDescribedBy", v)}
            placeholder="e.g. progress-description"
          />
        </ControlGroup>
      </Section>

      <Section title="Tips" subtitle="Best practices">
        <div className="text-xs text-slate-400 space-y-2">
          <p>
            • <strong>aria-label</strong>: Describes what the progress bar
            represents (e.g., "Document upload progress")
          </p>
          <p>
            • <strong>aria-describedby</strong>: ID of an element that provides
            additional context
          </p>
          <p>
            • For indeterminate progress, use descriptive labels like "Loading
            content"
          </p>
          <p>
            • Value, min, max are automatically added to the progress element
          </p>
        </div>
      </Section>
    </div>
  );
}
