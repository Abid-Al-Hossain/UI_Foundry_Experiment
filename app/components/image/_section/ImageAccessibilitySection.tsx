import React from "react";
import { type ImageState } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: ImageState;
  setState: React.Dispatch<React.SetStateAction<ImageState>>;
};

export default function ImageAccessibilitySection({ state, setState }: Props) {
  const update = (key: keyof ImageState, value: any) =>
    setState((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <Section title="ARIA Attributes" subtitle="Screen reader accessibility">
        <div className="space-y-4">
          <ControlGroup label="Alt Text">
            <InputControl
              value={state.alt}
              onChange={(v) =>
                update(
                  "alt",
                  typeof v === "string" ? v : (v as any).target.value,
                )
              }
              placeholder="Describe the image content"
            />
          </ControlGroup>

          <ControlGroup label="Role">
            <Select
              value={state.ariaRole}
              onChange={(v) => update("ariaRole", v)}
              options={[
                { value: "img", label: "img — Standard image" },
                { value: "presentation", label: "presentation — Decorative" },
                { value: "figure", label: "figure — Illustrative content" },
                { value: "none", label: "none — No semantic meaning" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Decorative Image">
            <Select
              value={state.ariaHidden ? "true" : "false"}
              onChange={(v) => update("ariaHidden", v === "true")}
              options={[
                { value: "false", label: "No — Image is meaningful" },
                { value: "true", label: "Yes — Hide from screen readers" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Loading Strategy">
            <Select
              value={state.loading}
              onChange={(v) => update("loading", v)}
              options={[
                { value: "lazy", label: "lazy — Load when visible" },
                { value: "eager", label: "eager — Load immediately" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>

      <Section title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={!!state.alt && state.alt.length > 0}
            label="Has descriptive alt text"
          />
          <AccessibilityCheck
            passed={state.ariaRole !== "none" || state.ariaHidden}
            label="Role or aria-hidden configured"
          />
          <AccessibilityCheck
            passed={!state.alt?.toLowerCase().startsWith("image of")}
            label="Alt text doesn't start with 'image of'"
          />
          <AccessibilityCheck
            passed={state.loading === "lazy"}
            label="Uses lazy loading for performance"
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
