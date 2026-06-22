"use client";

import React from "react";
import { type IconSetter, type IconState } from "../types";
import IconPickerControl, {
  type IconSource,
} from "@/app/components/controls/layout/IconPickerControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";

export default function IconSelectionSection({
  state,
  setKey,
}: {
  state: IconState;
  setKey: IconSetter;
}) {
  const setLibrary = setKey("library");
  const setIconName = setKey("iconName");
  const setCustomSvg = setKey("customSvg");

  // Map "lucide" | "custom" to "library" | "custom"
  const source: IconSource = state.library === "lucide" ? "library" : "custom";
  const setSource = (s: IconSource) => {
    setLibrary(s === "library" ? "lucide" : "custom");
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Basics" subtitle="Choose the icon source and glyph.">
        <IconPickerControl
          label="Select Icon"
          source={source}
          setSource={setSource}
          name={state.iconName}
          setName={setIconName}
          customSvg={state.customSvg}
          setCustomSvg={setCustomSvg}
          allowNone={false}
        />
      </SectionCard>
    </div>
  );
}
