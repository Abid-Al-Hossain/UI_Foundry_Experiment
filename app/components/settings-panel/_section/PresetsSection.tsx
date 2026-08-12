"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { SETTINGSPANEL_PRESETS } from "../_data/SettingsPanelPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={SETTINGSPANEL_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
