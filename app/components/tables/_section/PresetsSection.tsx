"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { TABLE_PRESETS } from "../_data/TablePresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={TABLE_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
