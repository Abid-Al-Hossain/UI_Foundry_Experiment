"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { FOOTER_PRESETS } from "../_data/FooterPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={FOOTER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
