"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { DROPDOWNMENU_PRESETS } from "../_data/DropdownMenuPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={DROPDOWNMENU_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
