import React from "react";
import { type TypographyState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: (key: keyof TypographyState, value: any) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Text Color" subtitle="Preview and export color">
        <ControlGroup label="Color">
          <ColorControl
            label="Text Color"
            value={state.defaultTextColor}
            onChange={(v: string) => update("defaultTextColor", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="ARIA Label" subtitle="Screen reader text">
        <ControlGroup label="aria-label">
          <input
            type="text"
            value={state.ariaLabel}
            onChange={(e) => update("ariaLabel", e.target.value)}
            placeholder="Optional accessibility label..."
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--text)",
            }}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
