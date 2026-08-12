"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { TABS_PRESETS } from "../_data/TabsPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={TABS_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
