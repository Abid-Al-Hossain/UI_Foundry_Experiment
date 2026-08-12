"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { CARD_PRESETS } from "../_data/CardPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={CARD_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
