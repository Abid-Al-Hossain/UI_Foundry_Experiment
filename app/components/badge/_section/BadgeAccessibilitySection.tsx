import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import type { BadgeState } from "../types";

type Props = {
  ariaRole: BadgeState["ariaRole"];
  ariaLive: BadgeState["ariaLive"];
  ariaLabel: string;
  label: string;
  count: string;
};

export default function BadgeAccessibilitySection({
  ariaRole,
  ariaLive,
  ariaLabel,
  label,
  count,
}: Props) {
  return (
    <div className="space-y-6">
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
        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "OK" : "NO"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
