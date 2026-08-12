"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { LIST_PRESETS } from "../_data/ListPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={LIST_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
