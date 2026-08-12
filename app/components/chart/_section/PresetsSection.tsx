"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { CHART_PRESETS } from "../_data/ChartPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  return (
    <PresetBrowser
      presets={CHART_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
      onResetStudio={onReset}
    />
  );
}
