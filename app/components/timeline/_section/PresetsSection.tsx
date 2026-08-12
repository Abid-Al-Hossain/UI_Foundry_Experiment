"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { TIMELINE_PRESETS } from "../_data/TimelinePresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={TIMELINE_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
