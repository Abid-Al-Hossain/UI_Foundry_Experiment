"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { CONTAINER_PRESETS } from "../_data/ContainerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  return (
    <PresetBrowser
      presets={CONTAINER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
      onResetStudio={onReset}
    />
  );
}
