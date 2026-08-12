"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { COMMANDPALETTE_PRESETS } from "../_data/CommandPalettePresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={COMMANDPALETTE_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
