"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { BREADCRUMB_PRESETS } from "../_data/BreadcrumbPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={BREADCRUMB_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
