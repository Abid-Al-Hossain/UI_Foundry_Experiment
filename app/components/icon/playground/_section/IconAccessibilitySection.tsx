import React from "react";
import { type IconState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
};

export default function IconAccessibilitySection({ state, setKey }: Props) {
  return (
    <div className="space-y-6">
      <Section title="ARIA Attributes" subtitle="Screen reader accessibility">
        <div className="space-y-4">
          <ControlGroup label="ARIA Label">
            <InputControl
              value={state.ariaLabel}
              onChange={(v) =>
                setKey("ariaLabel")(
                  typeof v === "string" ? v : (v as any).target.value,
                )
              }
              placeholder="e.g. Settings icon"
            />
          </ControlGroup>

          <ControlGroup label="Role">
            <Select
              value={state.ariaRole}
              onChange={(v) => setKey("ariaRole")(v)}
              options={[
                { value: "img", label: "img — Meaningful image" },
                { value: "presentation", label: "presentation — Decorative" },
                { value: "none", label: "none — No semantic meaning" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Decorative">
            <Select
              value={state.ariaHidden ? "true" : "false"}
              onChange={(v) => setKey("ariaHidden")(v === "true")}
              options={[
                { value: "false", label: "No — Icon is meaningful" },
                { value: "true", label: "Yes — Hide from screen readers" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={!!state.ariaLabel && state.ariaLabel.length > 0}
            label="Has descriptive aria-label"
          />
          <AccessibilityCheck
            passed={state.ariaRole === "img" || state.ariaHidden}
            label="Role or aria-hidden set correctly"
          />
          <AccessibilityCheck
            passed={state.size >= 24}
            label="Minimum touch target (≥ 24px)"
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
