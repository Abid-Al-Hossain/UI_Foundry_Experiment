"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { TREEVIEW_PRESETS } from "../_data/TreeViewPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={TREEVIEW_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
