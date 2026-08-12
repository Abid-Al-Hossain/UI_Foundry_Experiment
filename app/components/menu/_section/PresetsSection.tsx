"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { MENU_PRESETS } from "../_data/MenuPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={MENU_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
