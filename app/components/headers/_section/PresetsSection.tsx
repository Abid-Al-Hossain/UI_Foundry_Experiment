"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { HEADER_PRESETS } from "../_data/HeaderPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={HEADER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
