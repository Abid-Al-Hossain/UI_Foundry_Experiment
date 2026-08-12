"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { VIDEOPLAYER_PRESETS } from "../_data/VideoPlayerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={VIDEOPLAYER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
