"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { STATISTIC_PRESETS } from "../_data/StatisticPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={STATISTIC_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
