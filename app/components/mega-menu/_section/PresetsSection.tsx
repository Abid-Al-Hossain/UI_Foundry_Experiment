"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { MEGAMENU_PRESETS } from "../_data/MegaMenuPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={MEGAMENU_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
