import React from "react";
import {
  type Direction,
  type TextOverflow,
  type TypographyState,
  type TypographyUpdater,
  type WhiteSpace,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

const OVERFLOW_OPTIONS: { label: string; value: TextOverflow }[] = [
  { label: "Clip", value: "clip" },
  { label: "Ellipsis", value: "ellipsis" },
];

const WHITESPACE_OPTIONS: { label: string; value: WhiteSpace }[] = [
  { label: "Normal", value: "normal" },
  { label: "No Wrap", value: "nowrap" },
  { label: "Pre", value: "pre" },
  { label: "Pre Wrap", value: "pre-wrap" },
  { label: "Pre Line", value: "pre-line" },
];

const DIRECTION_OPTIONS: { label: string; value: Direction }[] = [
  { label: "LTR", value: "ltr" },
  { label: "RTL", value: "rtl" },
];

export default function SemanticsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Semantics"
        subtitle="Reading flow, overflow, and whitespace behavior"
      >
        <ControlGroup label="Direction">
          <SelectControl
            value={state.direction}
            options={DIRECTION_OPTIONS}
            onChange={(value) => update("direction", value as Direction)}
          />
        </ControlGroup>

        <ControlGroup label="Overflow">
          <SelectControl
            value={state.textOverflow}
            options={OVERFLOW_OPTIONS}
            onChange={(value) => update("textOverflow", value as TextOverflow)}
          />
        </ControlGroup>

        <ControlGroup label="White Space">
          <SelectControl
            value={state.whiteSpace}
            options={WHITESPACE_OPTIONS}
            onChange={(value) => update("whiteSpace", value as WhiteSpace)}
          />
        </ControlGroup>

      </Section>
    </div>
  );
}
