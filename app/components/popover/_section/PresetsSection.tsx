"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { POPOVER_PRESETS } from "../_data/PopoverPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={POPOVER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
