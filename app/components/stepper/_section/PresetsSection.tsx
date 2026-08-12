"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { STEPPER_PRESETS } from "../_data/StepperPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={STEPPER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
