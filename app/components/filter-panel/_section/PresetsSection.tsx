"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { FILTERPANEL_PRESETS } from "../_data/FilterPanelPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={FILTERPANEL_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
