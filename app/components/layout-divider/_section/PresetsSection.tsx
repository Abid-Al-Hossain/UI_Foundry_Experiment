"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { LAYOUTDIVIDER_PRESETS } from "../_data/LayoutDividerPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply, onReset }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void; onReset: () => void }) {
  return (
    <PresetBrowser
      presets={LAYOUTDIVIDER_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
      onResetStudio={onReset}
    />
  );
}
