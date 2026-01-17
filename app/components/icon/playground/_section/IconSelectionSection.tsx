"use client";

import React from "react";
import { type IconState } from "../types";
import IconPickerControl, {
  type IconSource,
} from "@/app/components/controls/layout/IconPickerControl";

export default function IconSelectionSection({
  state,
  setKey,
}: {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
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
    <div className="space-y-4">
      <IconPickerControl
        label="Select Icon"
        source={source}
        setSource={setSource}
        name={state.iconName}
        setName={setIconName}
        customSvg={state.customSvg}
        setCustomSvg={setCustomSvg}
        allowNone={false} // Icon playground usually needs an icon
      />
    </div>
  );
}
