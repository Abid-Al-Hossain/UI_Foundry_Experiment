"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { CAROUSEL_PRESETS } from "../_data/CarouselPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  return (
    <PresetBrowser
      presets={CAROUSEL_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
      onResetStudio={onReset}
    />
  );
}
