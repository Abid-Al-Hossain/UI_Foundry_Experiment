import React from "react";
import { type DividerState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: DividerState;
  setKey: (key: keyof DividerState) => (val: any) => void;
  [key: string]: any; // Accept additional props passed by the dynamic renderer
};

export default function DividerAccessibilitySection({ state, setKey }: Props) {
  return (
    <div className="space-y-6">
      <Section title="ARIA Attributes" subtitle="Screen reader accessibility">
        <div className="space-y-4">
          <ControlGroup label="Role">
            <Select
              value={state.ariaRole}
              onChange={(v) => setKey("ariaRole")(v)}
              options={[
                { value: "separator", label: "separator — Content divider" },
                { value: "presentation", label: "presentation — Decorative" },
                { value: "none", label: "none — No semantic meaning" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="ARIA Label">
            <InputControl
              value={state.ariaLabel}
              onChange={(v) =>
                setKey("ariaLabel")(
                  typeof v === "string" ? v : (v as any).target.value,
                )
              }
              placeholder="e.g. Section divider"
            />
          </ControlGroup>

          <ControlGroup label="Orientation (ARIA)">
            <Select
              value={state.orientation}
              onChange={(v) => setKey("orientation")(v)}
              options={[
                { value: "horizontal", label: "Horizontal" },
                { value: "vertical", label: "Vertical" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={state.ariaRole === "separator"}
            label="Uses semantic 'separator' role"
          />
          <AccessibilityCheck
            passed={
              state.showLabel ||
              (!!state.ariaLabel && state.ariaLabel.length > 0)
            }
            label="Has visible label or aria-label"
          />
          <AccessibilityCheck
            passed={state.opacity >= 0.5}
            label="Sufficient visual contrast (opacity ≥ 50%)"
          />
        </div>
      </Section>
    </div>
  );
}

function AccessibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "✓" : "×"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
