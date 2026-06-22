import React from "react";
import { type TypographyState, type TypographyUpdater } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Metadata" subtitle="Optional accessibility naming for exported text systems.">
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
