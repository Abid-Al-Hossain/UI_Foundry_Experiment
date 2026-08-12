"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { MODAL_PRESETS } from "../_data/ModalPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={MODAL_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
