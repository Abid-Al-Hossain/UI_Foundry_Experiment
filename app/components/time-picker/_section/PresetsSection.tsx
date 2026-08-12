"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { TIMEPICKER_PRESETS } from "../_data/TimePickerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={TIMEPICKER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
