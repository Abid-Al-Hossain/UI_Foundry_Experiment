"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import {
  TypographySpacingControl,
  TypographyStyleControl,
} from "@/app/components/controls/typography/TypographyControl";
import type { TextTransform } from "@/app/components/controls/typography/TextDecorationControl";

export default function BadgeTypographySection(props: {
  showIcon: boolean;
  fontSize: number;
  setFontSize: (v: number) => void;
  letterSpacing: number;
  setLetterSpacing: (v: number) => void;
  textTransform: TextTransform;
  setTextTransform: (v: TextTransform) => void;
  iconSize: number;
  setIconSize: (v: number) => void;
  iconGap: number;
  setIconGap: (v: number) => void;
}) {
  return (
    <SectionCard
      title="Typography"
      subtitle="Label scale and icon rhythm for the badge content."
    >
      <div className="space-y-4">
        <TypographyStyleControl
          fontSize={props.fontSize}
          setFontSize={props.setFontSize}
          fontSizeMin={8}
          fontSizeMax={48}
          textTransform={props.textTransform}
          setTextTransform={props.setTextTransform}
        />
        <TypographySpacingControl
          letterSpacing={props.letterSpacing}
          setLetterSpacing={props.setLetterSpacing}
        />

        <LabeledField label="Icon rhythm">
          <div className="grid grid-cols-2 gap-4">
            <SizeControl
              label="Icon Size (%)"
              value={props.iconSize}
              onChange={props.setIconSize}
              min={50}
              max={150}
              step={5}
            />
            <SizeControl
              label="Icon Gap (px)"
              value={props.iconGap}
              onChange={props.setIconGap}
              min={0}
              max={20}
              step={1}
            />
          </div>
        </LabeledField>

        {!props.showIcon && (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Icon size and gap are preserved so they are ready when icon display is enabled again.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
