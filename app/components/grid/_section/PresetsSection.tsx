"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { GRID_PRESETS } from "../_data/GridPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={GRID_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
