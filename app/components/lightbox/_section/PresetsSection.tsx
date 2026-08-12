"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { LIGHTBOX_PRESETS } from "../_data/LightboxPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={LIGHTBOX_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
