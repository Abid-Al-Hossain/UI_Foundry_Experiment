"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { DATE_PICKER_PRESETS } from "../_data/DatePickerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={DATE_PICKER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
