"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { RICHTEXT_PRESETS } from "../_data/RichTextPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={RICHTEXT_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
