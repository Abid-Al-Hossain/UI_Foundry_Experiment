"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { FLEX_PRESETS } from "../_data/FlexPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  return (
    <PresetBrowser
      presets={FLEX_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
      onResetStudio={onReset}
    />
  );
}
