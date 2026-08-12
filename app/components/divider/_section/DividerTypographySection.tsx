"use client";
import React from "react";
import type { DividerState } from "../types";
import { SectionCard } from "@/app/components/controls/ui";
import {
  TypographySpacingControl,
  TypographyStyleControl,
} from "@/app/components/controls/typography/TypographyControl";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerTypographySection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  return (
    <SectionCard title="Typography" subtitle="Label text sizing and emphasis.">
      <div className="space-y-4">
        <TypographyStyleControl
          fontSize={state.fontSize}
          setFontSize={setKey("fontSize")}
          fontSizeMin={10}
          fontSizeMax={32}
          fontWeight={Number(state.fontWeight) || 400}
          setFontWeight={(value) => setKey("fontWeight")(String(value))}
          textTransform={state.labelTransform}
          setTextTransform={setKey("labelTransform")}
        />
        <TypographySpacingControl
          letterSpacing={state.letterSpacing}
          setLetterSpacing={setKey("letterSpacing")}
        />
      </div>
    </SectionCard>
  );
}
