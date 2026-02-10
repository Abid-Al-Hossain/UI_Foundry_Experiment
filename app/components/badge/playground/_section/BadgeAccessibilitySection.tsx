import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  ariaLabel: string;
  setAriaLabel: (v: any) => void;
  ariaRole: string;
  setAriaRole: (v: any) => void;
  ariaLive: string;
  setAriaLive: (v: any) => void;
  label: string;
  count: string;
};

export default function BadgeAccessibilitySection({
  ariaLabel,
  setAriaLabel,
  ariaRole,
  setAriaRole,
  ariaLive,
  setAriaLive,
  label,
  count,
}: Props) {
  return (
    <div className="space-y-6">
      <Section title="ARIA Attributes" subtitle="Screen reader accessibility">
        <div className="space-y-4">
          <ControlGroup label="ARIA Label">
            <InputControl
              value={ariaLabel}
              onChange={(v) =>
                setAriaLabel(
                  typeof v === "string" ? v : (v as any).target.value,
                )
              }
              placeholder="e.g. New notifications: 3"
            />
          </ControlGroup>

          <ControlGroup label="Role">
            <Select
              value={ariaRole}
              onChange={(v) => setAriaRole(v)}
              options={[
                { value: "status", label: "status — Live status update" },
                { value: "alert", label: "alert — Urgent notification" },
                { value: "none", label: "none — No semantic meaning" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Live Region">
            <Select
              value={ariaLive}
              onChange={(v) => setAriaLive(v)}
              options={[
                { value: "off", label: "off — No announcements" },
                { value: "polite", label: "polite — Announce when idle" },
                {
                  value: "assertive",
                  label: "assertive — Announce immediately",
                },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={!!ariaLabel && ariaLabel.length > 0}
            label="Has descriptive aria-label"
          />
          <AccessibilityCheck
            passed={ariaRole === "status" || ariaRole === "alert"}
            label="Has appropriate ARIA role"
          />
          <AccessibilityCheck
            passed={ariaLive !== "off"}
            label="Live region enabled for dynamic content"
          />
          <AccessibilityCheck
            passed={label.length > 0 || count.length > 0}
            label="Has visible text content"
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
