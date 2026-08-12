"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { NAVBAR_PRESETS } from "../_data/NavbarPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={NAVBAR_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
