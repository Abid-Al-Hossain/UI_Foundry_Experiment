import React from "react";
import { type TypographyState, type TypographyUpdater } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function PreviewSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Preview Surface"
        subtitle="Specimen card colors for the in-editor reading environment."
      >
        <ControlGroup label="Preview Text Color">
          <ColorControl
            label="Preview Text"
            value={state.previewTextColor}
            onChange={(v: string) => update("previewTextColor", v)}
          />
        </ControlGroup>

        <ControlGroup label="Preview Surface">
          <ColorControl
            label="Surface"
            value={state.previewBgColor}
            onChange={(v: string) => update("previewBgColor", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
