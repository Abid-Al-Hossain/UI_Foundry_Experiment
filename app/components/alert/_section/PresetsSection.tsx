"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { ALERT_PRESETS } from "../_data/AlertPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={ALERT_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
