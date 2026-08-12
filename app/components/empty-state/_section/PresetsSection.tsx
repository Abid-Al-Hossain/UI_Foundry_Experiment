"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { EMPTYSTATE_PRESETS } from "../_data/EmptyStatePresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={EMPTYSTATE_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
