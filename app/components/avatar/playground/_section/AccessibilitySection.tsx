import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  alt: string;
  setAlt: (v: any) => void;
  ariaLabel: string;
  setAriaLabel: (v: any) => void;
  ariaRole: string;
  setAriaRole: (v: any) => void;
};

export default function AccessibilitySection({
  alt,
  setAlt,
  ariaLabel,
  setAriaLabel,
  ariaRole,
  setAriaRole,
}: Props) {
  return (
    <div className="space-y-6">
      <Section title="ARIA Attributes" subtitle="Screen reader accessibility">
        <div className="space-y-4">
          <ControlGroup label="Alt Text">
            <InputControl
              value={alt}
              onChange={(v) =>
                setAlt(typeof v === "string" ? v : (v as any).target.value)
              }
              placeholder="Describe the avatar"
            />
          </ControlGroup>

          <ControlGroup label="ARIA Label">
            <InputControl
              value={ariaLabel}
              onChange={(v) =>
                setAriaLabel(
                  typeof v === "string" ? v : (v as any).target.value,
                )
              }
              placeholder="e.g. User profile picture"
            />
          </ControlGroup>

          <ControlGroup label="Role">
            <Select
              value={ariaRole}
              onChange={(v) => setAriaRole(v)}
              options={[
                { value: "img", label: "img — Profile image" },
                { value: "figure", label: "figure — Illustrative content" },
                { value: "presentation", label: "presentation — Decorative" },
                { value: "none", label: "none — No semantic meaning" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={!!alt && alt.length > 0}
            label="Has descriptive alt text"
          />
          <AccessibilityCheck
            passed={!!ariaLabel && ariaLabel.length > 0}
            label="Has aria-label for context"
          />
          <AccessibilityCheck
            passed={ariaRole === "img" || ariaRole === "figure"}
            label="Has semantic ARIA role"
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
