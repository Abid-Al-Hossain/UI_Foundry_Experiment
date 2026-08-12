"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { SIDEBAR_PRESETS } from "../_data/SidebarPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={SIDEBAR_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
