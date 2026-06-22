import React from "react";
import {
  type TypographyState,
  type TextAlign,
  type TypographyUpdater,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Input from "@/app/components/controls/input/Input";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

const ALIGN_OPTIONS: { label: string; value: TextAlign }[] = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
  { label: "Justify", value: "justify" },
];

export default function LayoutSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Layout" subtitle="Alignment and overall composition.">
        <ControlGroup label="Text Align">
          <SelectControl
            value={state.textAlign}
            options={ALIGN_OPTIONS}
            onChange={(value) => update("textAlign", value as TextAlign)}
          />
        </ControlGroup>
      </Section>

      <Section title="Text Wrapping" subtitle="Hyphenation, breaking, and first-line indent.">
        <ControlGroup label="Hyphens">
          <SelectControl
            value={state.hyphens}
            options={[
              { label: "None", value: "none" },
              { label: "Manual", value: "manual" },
              { label: "Auto", value: "auto" },
            ]}
            onChange={(value) => update("hyphens", value as TypographyState["hyphens"])}
          />
        </ControlGroup>
        <ControlGroup label="Word Break">
          <SelectControl
            value={state.wordBreak}
            options={[
              { label: "Normal", value: "normal" },
              { label: "Break All", value: "break-all" },
              { label: "Break Word", value: "break-word" },
              { label: "Keep All", value: "keep-all" },
            ]}
            onChange={(value) => update("wordBreak", value as TypographyState["wordBreak"])}
          />
        </ControlGroup>
        <ControlGroup label="Overflow Wrap">
          <SelectControl
            value={state.overflowWrap}
            options={[
              { label: "Normal", value: "normal" },
              { label: "Break Word", value: "break-word" },
              { label: "Anywhere", value: "anywhere" },
            ]}
            onChange={(value) => update("overflowWrap", value as TypographyState["overflowWrap"])}
          />
        </ControlGroup>
        <SizeControl
          label="Text Indent (px)"
          value={state.textIndent}
          onChange={(v) => update("textIndent", v)}
          min={0}
          max={64}
          step={1}
        />
      </Section>

      <Section title="Multi-column Layout" subtitle="Newspaper-style columns for long-form body text.">
        <SizeControl
          label="Column Count"
          value={state.columnCount}
          onChange={(v) => update("columnCount", v)}
          min={1}
          max={4}
          step={1}
        />
        <SizeControl
          label="Column Gap (px)"
          value={state.columnGap}
          onChange={(v) => update("columnGap", v)}
          min={0}
          max={80}
          step={4}
        />
        <ControlGroup label="Column Rule">
          <Input
            value={state.columnRule}
            onChange={(e) => update("columnRule", e.target.value)}
            placeholder="e.g. 1px solid #e2e8f0, or none"
          />
        </ControlGroup>
      </Section>

      <Section title="Widows & Orphans" subtitle="Minimum lines left at the top/bottom of a column or page break.">
        <SizeControl
          label="Orphans"
          value={state.orphans}
          onChange={(v) => update("orphans", v)}
          min={1}
          max={6}
          step={1}
        />
        <SizeControl
          label="Widows"
          value={state.widows}
          onChange={(v) => update("widows", v)}
          min={1}
          max={6}
          step={1}
        />
      </Section>

      <Section title="OpenType Features" subtitle="Font feature settings (ligatures, kerning, swashes).">
        <ControlGroup label="font-feature-settings">
          <Input
            value={state.fontFeatureSettings}
            onChange={(e) => update("fontFeatureSettings", e.target.value)}
            placeholder='e.g. "liga" 1, "kern" 1'
          />
        </ControlGroup>
      </Section>

      <Section title="Preview Container" subtitle="Padding and corner radius of the studio preview card.">
        <SizeControl
          label="Padding (px)"
          value={state.previewPadding}
          onChange={(v) => update("previewPadding", v)}
          min={0}
          max={64}
          step={2}
        />
        <SizeControl
          label="Radius (px)"
          value={state.previewRadius}
          onChange={(v) => update("previewRadius", v)}
          min={0}
          max={48}
          step={2}
        />
      </Section>
    </div>
  );
}
