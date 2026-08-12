"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { SKELETON_PRESETS } from "../_data/SkeletonPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={SKELETON_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
