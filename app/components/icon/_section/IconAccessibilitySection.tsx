import React from "react";
import { type IconState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";

type Props = {
  state: IconState;
};

export default function IconAccessibilitySection({ state }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Accessibility Review" subtitle="Validate the metadata and sizing choices.">
        <div className="space-y-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <p>Meaningful icons should expose a clear aria-label and keep the default img role.</p>
          <p>Decorative icons should be hidden from assistive technologies instead of announcing redundant names.</p>
          <p>Increase size when the icon must work as a touch target, not just as decoration.</p>
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
            label="Minimum touch target (>= 24px)"
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
        {passed ? "OK" : "X"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
