"use client";

import React from "react";
import { SectionCard } from "./ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import FontFamilySelect from "@/app/components/controls/typography/FontFamilySelect";

export default function TypographySection(props: {
  initialsBg: string;
  setInitialsBg: (v: string) => void;
  initialsColor: string;
  setInitialsColor: (v: string) => void;
  fontFamily: string;
  setFontFamily: (v: string) => void;
}) {
  return (
    <SectionCard
      title="Typography"
      subtitle="Fallback initials palette and type treatment."
    >
      <div className="space-y-4">
        <ColorControl
          label="Fallback Background"
          value={props.initialsBg}
          onChange={props.setInitialsBg}
        />
        <ColorControl
          label="Initials Color"
          value={props.initialsColor}
          onChange={props.setInitialsColor}
        />
        <FontFamilySelect
          value={props.fontFamily}
          onChange={props.setFontFamily}
        />
      </div>
    </SectionCard>
  );
}
