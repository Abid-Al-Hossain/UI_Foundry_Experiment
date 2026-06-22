import React from "react";
import { type DividerState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

type Props = {
  state: DividerState;
  setKey: DividerSetter;
};

export default function DividerAccessibilitySection({ state }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={state.ariaRole === "separator"}
            label="Uses semantic separator role"
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
            label="Sufficient visual contrast (opacity >= 50%)"
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
