"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { DRAWER_PRESETS } from "../_data/DrawerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={DRAWER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
