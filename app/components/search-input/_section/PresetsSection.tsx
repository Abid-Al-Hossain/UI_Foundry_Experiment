"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { SEARCHINPUT_PRESETS } from "../_data/SearchInputPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={SEARCHINPUT_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
